import { useState } from "react";
import FlowCanvas from "./FlowCanvas";
import FlowController from "./FlowController";
import "./styles.css";

export default function FlowBuilder() {
  const [vortices, setVortices] = useState([
    [500, 400, 2, "vortex"],
    [500, 200, 1, "source"],
    [500, 600, -1, "source"],
  ]);
  const [selected, setSelected] = useState(0);
  const canvasSize = [1080, 800];

  return (
    <div className="FlowBuilder">
      <table>
        <tbody>
          <tr>
            <td>
              <h2>Start editing to see some magic happen!</h2>
              <FlowCanvas
                width={canvasSize[0]}
                height={canvasSize[1]}
                spacing={20}
                u0={[1.0, 0.0]}
                vortices={vortices}
                iselect={selected}
              />
            </td>
            <td>
              <FlowController
                vortices={vortices}
                selected={selected}
                setvortices={setVortices}
                setselected={setSelected}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
