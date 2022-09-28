import { useEffect, useRef } from "react";
import "./styles.css";

export default function FlowCanvas(props) {
  let particles = [[100, 100]];
  const canvasRef = useRef(null);

  const addParticle = (xy, delta) => {
    particles.push([
      xy[0] + delta * (Math.random() - 0.5),
      xy[1] + delta * (Math.random() - 0.5),
    ]);
  };

  const ddt = (xy) => {
    let dxdt = props.u0[0];
    let dydt = props.u0[1];
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
    const dt = 2.5;
    var ddt0 = ddt(xy);
    var ddt1 = ddt([xy[0] + (ddt0[0] * dt) / 2, xy[1] + (ddt0[1] * dt) / 2]);
    xy[0] += ddt1[0] * dt;
    xy[1] += ddt1[1] * dt;
  };

  const computeMain = () => {
    for (var i = 0; i < particles.length; ++i) {
      advance(particles[i]);
    }
    particles = particles.filter(
      (xy, i, arr) =>
        isFinite(xy[0]) &&
        isFinite(xy[1]) &&
        xy[0] > -props.width * 0.2 &&
        xy[0] < props.width * 1.2 &&
        xy[1] > -props.height * 0.2 &&
        xy[1] < props.height * 1.2
    );
    for (var i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] < 0) {
        particles = particles.filter((xy, j, arr) => {
          var dx = xy[0] - props.vortices[i][0];
          var dy = xy[1] - props.vortices[i][1];
          return dx * dx + dy * dy > -150 * dt * props.vortices[i][2];
        });
      }
    }
    for (
      var y = -props.height * 0.2;
      y < props.height * 1.2;
      y += props.spacing
    ) {
      addParticle([0, y], 1.0);
    }
    for (var i = 0; i < props.vortices.length; ++i) {
      if (props.vortices[i][3] == "source" && props.vortices[i][2] > 0) {
        var nj = Math.ceil((props.vortices[i][2] * 207) / props.spacing) * 3;
        var rad0 = props.vortices[i][2] * 10 * dt;
        for (var j = 0; j < nj; ++j) {
          var rad = rad0 + (Math.random() - 0.5) * dt * 4;
          var x = props.vortices[i][0] + rad * Math.cos((j * 2 * Math.PI) / nj);
          var y = props.vortices[i][1] + rad * Math.sin((j * 2 * Math.PI) / nj);
          addParticle([x, y], (0.5 * props.vortices[i][2]) / 10);
        }
      }
    }
  };

  let canvas2 = document.createElement("canvas");
  canvas2.width = props.width;
  canvas2.height = props.height;

  const drawMain = () => {
    var ctx = canvas2.getContext("2d");
    ctx.clearRect(0, 0, props.width, props.height);
    ctx.fillStyle = "#000000";
    for (var i = 0; i < particles.length; ++i) {
      let xy = particles[i];
      ctx.fillRect(xy[0], xy[1], 1, 1);
    }
    ctx.fillStyle = "#FF0000";
    for (var i = 0; i < props.vortices.length; ++i) {
      let xy = props.vortices[i];
      ctx.fillRect(xy[0] - 1, xy[1] - 1, 3, 3);
    }
    ctx.fillStyle = "#00FF00";
    /*let xy = props.vortices[iSelect];
    ctx.fillRect(xy[0] - 2, xy[1] - 2, 5, 5);
    */
    const canvas = canvasRef.current;
    const ctx1 = canvas.getContext("2d");
    ctx1.clearRect(0, 0, props.width, props.height);
    ctx1.drawImage(canvas2, 0, 0);
  };

  useEffect(() => {
    setInterval(() => {
      computeMain();
      drawMain();
    }, 40);
  });

  return <canvas ref={canvasRef} {...props} />;
}
