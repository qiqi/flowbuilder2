import { useEffect, useRef } from "react";
import "./styles.css";

export default function VortexControl(props) {
  const changex = (event) => {
    let vortices = [...props.vortices];
    vortices[props.selected][0] = event.target.value;
    props.setvortices(vortices);
  };

  const changey = (event) => {
    let vortices = [...props.vortices];
    vortices[props.selected][1] = props.height - event.target.value;
    props.setvortices(vortices);
  };

  const changeStrength = (event) => {
    let vortices = [...props.vortices];
    vortices[props.selected][2] = Math.max(-1, Math.min(1, event.target.value));
    props.setvortices(vortices);
  };

  const changeType = (event) => {
    let vortices = [...props.vortices];
    vortices[props.selected][3] = event.target.value;
    props.setvortices(vortices);
  };

  const duplicate = () => {
    let vortices = [...props.vortices];
    vortices.splice(props.selected, 0, [...vortices[props.selected]]);
    props.setvortices(vortices);
  };

  const remove = () => {
    let vortices = [...props.vortices];
    vortices.splice(props.selected, 1);
    console.log(props.selected, vortices.length);
    props.setvortices(vortices);
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>x</th>
            <th>y</th>
            <th>strength</th>
          </tr>

          {props.vortices.map((vortex, iVortex) => (
            <tr
              key={iVortex}
              onFocus={() => {
                props.setselected(iVortex);
              }}
              onClick={() => {
                props.setselected(iVortex);
              }}
              onTouchStart={() => {
                props.setselected(iVortex);
              }}
            >
              <td>
                <input
                  type="number"
                  value={vortex[0]}
                  onChange={changex}
                  min={0}
                  max={props.width}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={props.height - vortex[1]}
                  onChange={changey}
                  min={0}
                  max={props.height}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                <input
                  type="number"
                  step={0.001}
                  value={vortex[2]}
                  onChange={changeStrength}
                  min={-1}
                  max={1}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                {vortex[3] == "vortex" ? (
                  <select onChange={changeType}>
                    <option value="vortex">vortex</option>
                    <option value="source">source</option>
                  </select>
                ) : (
                  <select onChange={changeType}>
                    <option value="source">source</option>
                    <option value="vortex">vortex</option>
                  </select>
                )}
              </td>
              <td>
                {" "}
                {iVortex == props.selected ? (
                  <button onClick={duplicate}>duplicate</button>
                ) : (
                  <span />
                )}
              </td>
              <td>
                {" "}
                {iVortex == props.selected ? (
                  <button
                    disabled={props.vortices.length <= 1}
                    onClick={remove}
                  >
                    remove
                  </button>
                ) : (
                  <span />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
