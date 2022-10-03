import { useEffect, useRef } from "react";
import Airfoil from "./Airfoil";
import "./styles.css";

let loop = null;
let particles = [[100, 100]];

export default function FlowCanvas(props) {
  const canvasRef = useRef(null);
  const dt = 1.5;

  const addParticle = (xy, delta) => {
    particles.push([
      xy[0] + delta * (Math.random() - 0.5),
      xy[1] + delta * (Math.random() - 0.5),
    ]);
  };

  const ddt = (xy) => {
    let dxdt = props.uv[0];
    let dydt = props.uv[1];
    for (let i = 0; i < props.vortices.length; ++i) {
      let vort = props.vortices[i];
      let dx = (xy[0] - vort[0]) / 100;
      let dy = (xy[1] - vort[1]) / 100;
      let r2 = dx * dx + dy * dy;
      if (vort[3] == "source") {
        dxdt += (vort[2] * dx) / 100 / r2;
        dydt += (vort[2] * dy) / 100 / r2;
      } else {
        dxdt += (vort[2] * dy) / 100 / r2;
        dydt -= (vort[2] * dx) / 100 / r2;
      }
    }
    return [dxdt, dydt];
  };

  const advance = (xy) => {
    let ddt0 = ddt(xy);
    let ddt1 = ddt([xy[0] + (ddt0[0] * dt) / 2, xy[1] + (ddt0[1] * dt) / 2]);
    xy[0] += ddt1[0] * dt;
    xy[1] += ddt1[1] * dt;
  };

  const computeMain = () => {
    for (let i = 0; i < particles.length; ++i) {
      advance(particles[i]);
    }
    particles = particles.filter(
      (xy) =>
        Math.random() > 0.001 &&
        isFinite(xy[0]) &&
        isFinite(xy[1]) &&
        xy[0] > -props.width * 0.2 &&
        xy[0] < props.width * 1.2 &&
        xy[1] > -props.height * 0.2 &&
        xy[1] < props.height * 1.2
    );
    for (let i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] < 0) {
        const x0 = parseInt(props.vortices[i][0]);
        const y0 = parseInt(props.vortices[i][1]);
        particles = particles.filter((xy) => {
          let dx = xy[0] - x0;
          let dy = xy[1] - y0;
          return dx * dx + dy * dy > -0.15 * dt * props.vortices[i][2];
        });
      }
    }
    let u0 = Math.max(0.01, props.uv[0]);
    let v0 = Math.max(0.01, -props.uv[1]);
    let noise = 3.0 / Math.sqrt(u0 * u0 + v0 * v0);
    for (
      let y = props.height - (props.spacing / u0) * props.delta;
      y > -props.height * 0.2;
      y -= props.spacing / u0
    ) {
      addParticle([0, y], noise);
    }
    for (
      let x = (props.spacing / v0) * (1 - props.delta);
      x < props.width * 1.2;
      x += props.spacing / v0
    ) {
      addParticle([x, props.height], noise);
    }
    for (let i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] > 0) {
        const x0 = parseInt(props.vortices[i][0]);
        const y0 = parseInt(props.vortices[i][1]);
        let nj = Math.ceil((props.vortices[i][2] * 2.07) / props.spacing) * 3;
        let rad0 = props.vortices[i][2] * 0.1 * dt;
        for (let j = 0; j < nj; ++j) {
          let rad = rad0 + (Math.random() - 0.5) * dt * 4;
          let x = x0 + rad * Math.cos((j * 2 * Math.PI) / nj);
          let y = y0 + rad * Math.sin((j * 2 * Math.PI) / nj);
          console.log(x, y);
          addParticle([x, y], (0.5 * props.vortices[i][2]) / 1000);
        }
      }
    }
  };

  let canvas2 = document.createElement("canvas");
  canvas2.width = props.width;
  canvas2.height = props.height;

  const drawVortices = (ctx) => {
    for (let i = 0; i < props.vortices.length; ++i) {
      const xy = [
        parseInt(props.vortices[i][0]),
        parseInt(props.vortices[i][1]),
      ];
      if (props.iselect == i) {
        ctx.strokeStyle = "#880000";

        ctx.beginPath();
        ctx.moveTo(xy[0], Math.max(1, xy[1] - 15));
        ctx.lineTo(xy[0], Math.min(props.height, xy[1] + 15));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(Math.max(1, xy[0] - 15), xy[1]);
        ctx.lineTo(Math.min(props.width, xy[0] + 15), xy[1]);
        ctx.stroke();

        ctx.fillStyle = "#880000";
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 3, 0, 2 * Math.PI);
      } else {
        ctx.fillStyle = "#008800";
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], 3, 0, 2 * Math.PI);
      }
      ctx.fill();
    }
  };

  const airfoil = Airfoil(props.airfoil);

  const drawAirfoil = (ctx) => {
    if (airfoil == null) return;
    const scale = props.width * 0.7;
    ctx.strokeStyle = "#888888";
    ctx.beginPath();
    ctx.moveTo(
      props.width * 0.15 + airfoil[0][0] * scale,
      props.height / 2 - airfoil[0][1] * scale
    );
    for (let i = 1; i < airfoil.length; ++i) {
      ctx.lineTo(
        props.width * 0.15 + airfoil[i][0] * scale,
        props.height / 2 - airfoil[i][1] * scale
      );
    }
    ctx.stroke();
  };

  const drawMain = () => {
    let ctx = canvas2.getContext("2d");
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.fillStyle = "#000000";
    for (let i = 0; i < particles.length; ++i) {
      let xy = particles[i];
      ctx.fillRect(xy[0], xy[1], 1, 1);
    }

    drawVortices(ctx);
    drawAirfoil(ctx);

    const canvas = canvasRef.current;
    const ctx1 = canvas.getContext("2d");
    ctx1.clearRect(0, 0, props.width, props.height);
    ctx1.drawImage(canvas2, 0, 0);
  };

  useEffect(() => {
    if (loop != null) clearInterval(loop);
    loop = setInterval(() => {
      computeMain();
      drawMain();
    }, 30);
  }, [props]);

  const mousemove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
    const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    const [u, v] = ddt([x, y]);
    const p =
      0.5 *
      (props.uv[0] * props.uv[0] + props.uv[1] * props.uv[1] - u * u - v * v);
    props.setmousestate([x, y, u, v, p]);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={mousemove}
      onMouseLeave={() => {
        props.setmousestate([]);
      }}
      width={props.width}
      height={props.height}
    />
  );
}
