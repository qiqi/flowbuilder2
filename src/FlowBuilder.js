import { useState } from "react";
import FlowCanvas from "./FlowCanvas";
import VortexControl from "./VortexControl";
import FreestreamControl from "./FreestreamControl";
import "./styles.css";

export default function FlowBuilder() {
  const canvasSize = [1280, 720];
  const [vortices, setVortices] = useState([
    [canvasSize[0] / 2, canvasSize[1] / 2, 100, "vortex"],
  ]);
  const [selected, setSelected] = useState(0);
  const [uv, setuv] = useState([1.0, 0.0]);
  const [delta, setdelta] = useState(0.0);
  const [airfoil, setairfoil] = useState("");

  return (
    <div className="FlowBuilder">
      <table>
        <tbody>
          <tr>
            <td rowSpan={2}>
              <img src="qi.jpg" />
            </td>
            <td>
              <VortexControl
                vortices={vortices}
                selected={selected}
                setvortices={setVortices}
                setselected={setSelected}
                width={canvasSize[0]}
                height={canvasSize[1]}
              />
            </td>
            <td rowSpan={2}>
              <img src="qi.jpg" />
            </td>
          </tr>
          <tr>
            <td>
              <FreestreamControl
                uv={uv}
                setuv={setuv}
                delta={delta}
                setdelta={setdelta}
                airfoil={airfoil}
                setairfoil={setairfoil}
              />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <FlowCanvas
                width={canvasSize[0]}
                height={canvasSize[1]}
                uv={uv}
                spacing={20}
                u0={[1.0, 0.0]}
                vortices={vortices}
                iselect={selected}
                delta={delta}
                airfoil={airfoil}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
