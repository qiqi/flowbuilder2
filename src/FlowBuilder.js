import { useState } from "react";
import FlowCanvas from "./FlowCanvas";
import FlowController from "./FlowController";
import "./styles.css";

export default function FlowBuilder() {
  const [vortices, setVortices] = useState([[500, 400, 1, "vortex"]]);
  const [selected, setSelected] = useState(0);
  const canvasSize = [1080, 800];

  return (
    <div className="FlowBuilder">
      <table>
        <tbody>
          <tr>
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
          </tr>
          <tr>
            <td>
              <FlowCanvas
                width={canvasSize[0]}
                height={canvasSize[1]}
                spacing={20}
                u0={[1.0, 0.0]}
                vortices={vortices}
                iselect={selected}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
