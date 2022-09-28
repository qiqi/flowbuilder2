import "./styles.css";

export default function FlowBuilder(props) {
  return (
    <div className="FlowBuilder">
        <h2>Start editing to see some magic happen!</h2>
      <canvas {...props}/>
      
    </div>
  );
}
