import { useEffect, useRef } from "react";
import "./styles.css";

export default function FlowController(props) {
  const click = () => {
    props.setselected(props.selected + 1);
  };
  return <button onClick={click}> change </button>;
  /*
  return (
    <DataTable
      className="container"
      keys={["site"]}
      columns={columns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: "site", order: "desc" }}
      pageLengthOptions={[5, 20, 50]}
    />
  );*/
}
