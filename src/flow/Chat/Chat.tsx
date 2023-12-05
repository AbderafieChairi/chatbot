import { Button } from "@mui/material";
import { useFlowContext } from "../../Context/FlowContext";

export default function Chat() {
  const {nodes} = useFlowContext()
  return (
    <div>
      <Button onClick={()=>console.log(nodes)}>nodes</Button>
    </div>
  )
}
