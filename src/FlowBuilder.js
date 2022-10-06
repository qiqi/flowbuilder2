import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FlowCanvas from "./FlowCanvas";
import VortexControl from "./VortexControl";
import FreestreamControl from "./FreestreamControl";
import FlowDisplay from "./FlowDisplay";
import "./styles.css";

export default function FlowBuilder() {
  const canvasSize = [1280, 720];
  const [selected, setSelected] = useState(0);
  const [uv, setuv] = useState([1.0, 0.0]);
  const [delta, setdelta] = useState(0.0);
  const [airfoil, setairfoil] = useState("");
  const [mousestate, setmousestate] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const parseVorticesStr = (str) => {
    if (str == null) return [[500, 0, 100, "vortex"]];
    else
      return str.split("~").map((vortex) => {
        const parts = vortex.split("_");
        return [
          parseFloat(parts[0]),
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parts[3],
        ];
      });
  };

  let vorticesStr = searchParams.get("v");
  const [vortices, setVortices] = useState(parseVorticesStr(vorticesStr));
  const setVorticesAndUrl = (vortices) => {
    setVortices(vortices);
    const vortexToStr = (v) =>
      v[0].toString() +
      "_" +
      v[1].toString() +
      "_" +
      v[2].toString() +
      "_" +
      v[3];
    let str = vortexToStr(vortices[0]);
    for (let i = 1; i < vortices.length; ++i) {
      str += "~";
      str += vortexToStr(vortices[i]);
    }
    setSearchParams({ v: str });
  };

  return (
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
              setvortices={setVorticesAndUrl}
              setselected={setSelected}
              width={canvasSize[0]}
              height={canvasSize[1]}
            />
          </td>
          <td rowSpan={2} width="100px" valign="bottom">
            <FlowDisplay mousestate={mousestate} />
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
          <td colSpan={4}>
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
              setmousestate={setmousestate}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
