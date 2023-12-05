import { Box, Button, SxProps, Theme,Typography } from "@mui/material";
import "./Styles.css"
import StartIcon from '@mui/icons-material/Start';

import { useEffect, useState } from "react";
import { useFlowContext } from "../../Context/FlowContext";
export default function Expression() {
    return (
        <Box sx={styles.container}>
          <StartIcon/>
          <Typography>Expression</Typography>
        </Box>
      )
    }
  
  
  export  function ExpressionInspector() {
    const [expr, setExpr] = useState<string>('')
    const {inspectorElement,setNodeData,getNode} = useFlowContext();
    const onSave=()=>{
      setNodeData(inspectorElement.id,{id:inspectorElement.id,expr:expr})
    }
    useEffect(() => {
      let node = getNode(inspectorElement.id)
      if (node){
        if (node.data?.expr) setExpr(node.data.expr)
      }
    }, [])
      return (
        <div>
          <Box>
            <Button onClick={onSave}>save</Button>
          </Box>
            <div className="inp-text">Expression</div>
            <div>
                <div className="inp-container">
                        <input className="inp" value={expr} onChange={e=>setExpr(e.target.value)}/>
                    </div>
            </div>
        </div>
      )
    }
    


const styles={
  container:{
    p:0.5,
    display:"flex",
    alignItems:"center",
    flexDirection:"row",
    columnGap:1,
    width:'178px',
    border:'dashed 2px #373c3e',
    borderRadius:1,
    cursor:'pointer',
    ':hover':{
        borderColor:t=>t.palette.primary.main,
    }
} as SxProps<Theme>,
  }