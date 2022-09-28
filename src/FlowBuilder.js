import { useState } from "react";
import FlowCanvas from "./FlowCanvas"
import "./styles.css";

export default function FlowBuilder(props) {
    const [vortices, setVortices] = useState([]);
    const canvasSize = [1080, 800];
    return (
        <div className="FlowBuilder">
            <h2>Start editing to see some magic happen!</h2>
            <FlowCanvas width={canvasSize[0]} height={canvasSize[1]}/>
        </div>
    );
}
