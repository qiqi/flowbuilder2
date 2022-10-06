import { useEffect, useRef } from "react";
import "./styles.css";

export default function VortexControl(props) {
  const changeVortexFloat = (event, callback) => {
    let vortices = [...props.vortices];
    const newVal = parseFloat(event.target.value);
    if (!isNaN(newVal)) {
      callback(vortices[props.selected], newVal);
      props.setvortices(vortices);
    }
  };

  const changex = (event) =>
    changeVortexFloat(event, (vortex, val) => {
      vortex[0] = val;
    });

  const changey = (event) =>
    changeVortexFloat(event, (vortex, val) => {
      vortex[1] = val;
    });

  const changeStrength = (event) =>
    changeVortexFloat(event, (vortex, val) => {
      vortex[2] = val;
    });

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
                  min={-500}
                  max={1500}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={vortex[1]}
                  onChange={changey}
                  min={-500}
                  max={500}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={vortex[2]}
                  onChange={changeStrength}
                  min={-100}
                  max={100}
                  readOnly={iVortex != props.selected}
                />
              </td>
              <td>
                <select value={vortex[3]} onChange={changeType}>
                  <option value="vortex">vortex</option>
                  <option value="source">source</option>
                </select>
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
