import { Typography } from "@mui/material";
import Element from "../Elements/Elements";
import { useFlowContext } from "../../Context/FlowContext";

export default function Inspector() {
  const {inspectorElement} = useFlowContext()
  return (
    <div>
        <Typography sx={{p:1,textAlign:"center",fontWeight:"bold"}}>Inspector</Typography>
        <Element type={inspectorElement.type} id={inspectorElement.id}/>
    </div>
  )
}
