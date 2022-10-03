import "./styles.css";

export default function FreestreamControl(props) {
  return (
    <div>
      <p>
        {" "}
        u<sub>&infin;</sub>{" "}
        <input
          type="number"
          step={0.001}
          value={props.uv[0]}
          onChange={(event) => {
            const u = Math.max(0, Math.min(1, event.target.value));
            props.setuv([u, props.uv[1]]);
          }}
          min={0}
          max={1}
        />
        {"   "}v<sub>&infin;</sub>{" "}
        <input
          type="number"
          step={0.001}
          value={-props.uv[1]}
          onChange={(event) => {
            const v = Math.max(0, Math.min(1, event.target.value));
            props.setuv([props.uv[0], -v]);
          }}
          min={0}
          max={1}
        />{" "}
        {"   "}&delta;{" "}
        <input
          type="number"
          step={0.01}
          value={props.delta}
          onChange={(event) => {
            const d = Math.max(0, Math.min(1, event.target.value));
            props.setdelta(d);
          }}
          min={0}
          max={1}
        />
      </p>
      <p>
        {" naca "}
        <input
          type="text"
          value={props.airfoil}
          onChange={(event) => {
            props.setairfoil(event.target.value);
          }}
          min={0}
          max={1}
        />
      </p>
    </div>
  );
}
