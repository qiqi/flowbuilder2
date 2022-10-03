import "./styles.css";

export default function FlowDisplay(props) {
  if (props.mousestate.length == 0) return <div></div>;
  return (
    <div>
      <p>x={props.mousestate[0].toFixed(0)}</p>
      <p>y={props.mousestate[1].toFixed(0)}</p>
      <p>u={props.mousestate[2].toFixed(2)}</p>
      <p>v={props.mousestate[3].toFixed(2)}</p>
      <p>p={props.mousestate[4].toFixed(2)}</p>
    </div>
  );
}
