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
  const [mousestate, setmousestate] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const parseVorticesStr = (str) => {
    if (str == null || str.toString().split("~").length == 0)
      return [[500, 0, 100, "source"]];
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

  let urlParams = searchParams.get("v");
  const [vortices, setVortices] = useState(parseVorticesStr(urlParams));

  const uv0 = searchParams.get("uv");
  const [uv, setuv] = useState(
    uv0 == null ? [1.0, 0.0] : uv0.split("_").map(parseFloat)
  );

  const delta0 = parseFloat(searchParams.get("delta"));
  const [delta, setdelta] = useState(isNaN(delta0) ? 0.0 : delta0);

  const airfoil0 = searchParams.get("airfoil");
  const [airfoil, setairfoil] = useState(
    airfoil0 == null ? "" : airfoil0.toString()
  );

  const setUvUrl = (val) => {
    searchParams.set("uv", val[0].toString() + "_" + val[1].toString());
    setSearchParams(searchParams);
  };

  const setDeltaUrl = (val) => {
    searchParams.set("delta", val.toString());
    setSearchParams(searchParams);
  };

  const setAirfoilUrl = (val) => {
    searchParams.set("airfoil", val.toString());
    setSearchParams(searchParams);
  };

  const setVorticesUrl = (val) => {
    const vortexToStr = (v) =>
      v[0].toString() +
      "_" +
      v[1].toString() +
      "_" +
      v[2].toString() +
      "_" +
      v[3].toString();
    let str = vortexToStr(val[0]);
    for (let i = 1; i < val.length; ++i) {
      str += "~";
      str += vortexToStr(val[i]);
    }
    searchParams.set("v", str);
    setSearchParams(searchParams);
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
              setvortices={(v) => {
                setVortices(v);
                setVorticesUrl(v);
              }}
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
              setuv={(val) => {
                setuv(val);
                setUvUrl(val);
              }}
              delta={delta}
              setdelta={(val) => {
                setdelta(val);
                setDeltaUrl(val);
              }}
              airfoil={airfoil}
              setairfoil={(val) => {
                setairfoil(val);
                setAirfoilUrl(val);
              }}
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
