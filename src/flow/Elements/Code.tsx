import { Box,SxProps, Theme,Typography,Button } from "@mui/material";
import "./Styles.css"
import BoltIcon from '@mui/icons-material/Bolt';
import { useState,useEffect } from "react";
import { useFlowContext } from "../../Context/FlowContext";
export default function Code() {
    return (
        <Box sx={styles.container}>
          <BoltIcon/>
          <Typography>Execute Code</Typography>
        </Box>
      )
    }
  
  
  export  function CodeInspector() {
    const [code, setCode] = useState<string>('')
    const {inspectorElement,setNodeData,getNode} = useFlowContext();
    const onSave=()=>{
      setNodeData(inspectorElement.id,{id:inspectorElement.id,code:code})
    }
    useEffect(() => {
      let node = getNode(inspectorElement.id)
      if (node){
        if (node.data?.code) setCode(node.data.code)
      }
    }, [])
      return (
        <div>
          <Box>
            <Button onClick={onSave}>save</Button>
          </Box>
            <div className="inp-text">Code</div>
            <div>
                <div className="inp-container">
                        <input className="inp" value={code} onChange={e=>setCode(e.target.value)}/>
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
    },
    backgroundColor:'#081120'
  } as SxProps<Theme>,
  }