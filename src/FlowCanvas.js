import { useEffect, useRef } from "react";
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
        dxdt += (vort[2] * dx) / r2;
        dydt += (vort[2] * dy) / r2;
      } else {
        dxdt += (vort[2] * dy) / r2;
        dydt -= (vort[2] * dx) / r2;
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
        isFinite(xy[0]) &&
        isFinite(xy[1]) &&
        xy[0] > -props.width * 0.2 &&
        xy[0] < props.width * 1.2 &&
        xy[1] > -props.height * 0.2 &&
        xy[1] < props.height * 1.2
    );
    for (let i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] < 0) {
        particles = particles.filter((xy) => {
          let dx = xy[0] - props.vortices[i][0];
          let dy = xy[1] - props.vortices[i][1];
          return dx * dx + dy * dy > -150 * dt * props.vortices[i][2];
        });
      }
    }
    let u0 = Math.max(0.01, props.uv[0]);
    let v0 = Math.max(0.01, -props.uv[1]);
    let noise = 3.0 / Math.sqrt(u0 * u0 + v0 * v0);
    for (
      let y = props.height * 1.1 + (props.spacing / u0) * props.delta;
      y > -props.height * 0.1;
      y -= props.spacing / u0
    ) {
      addParticle([-props.width * 0.1, y], noise);
    }
    for (
      let x = -props.width * 0.1 + (props.spacing / v0) * (1 - props.delta);
      x < props.width * 1.1;
      x += props.spacing / v0
    ) {
      addParticle([x, props.height * 1.1], noise);
    }
    for (let i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] > 0) {
        let nj = Math.ceil((props.vortices[i][2] * 207) / props.spacing) * 3;
        let rad0 = props.vortices[i][2] * 10 * dt;
        for (let j = 0; j < nj; ++j) {
          let rad = rad0 + (Math.random() - 0.5) * dt * 4;
          let x = props.vortices[i][0] + rad * Math.cos((j * 2 * Math.PI) / nj);
          let y = props.vortices[i][1] + rad * Math.sin((j * 2 * Math.PI) / nj);
          addParticle([x, y], (0.5 * props.vortices[i][2]) / 10);
        }
      }
    }
  };

  let canvas2 = document.createElement("canvas");
  canvas2.width = props.width;
  canvas2.height = props.height;

  const drawMain = () => {
    let ctx = canvas2.getContext("2d");
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.fillStyle = "#000000";
    for (let i = 0; i < particles.length; ++i) {
      let xy = particles[i];
      ctx.fillRect(xy[0], xy[1], 1, 1);
    }
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
        console.log(xy[0], xy[0] + 1);
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
    }, 40);
  }, [props]);

  return <canvas ref={canvasRef} {...props} />;
}
