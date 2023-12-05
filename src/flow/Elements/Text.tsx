import { Box, Button, SxProps, Theme, Typography } from "@mui/material"
import TextFormatIcon from '@mui/icons-material/TextFormat';
import "./Styles.css"
import { useEffect, useRef, useState } from "react";
import { useFlowContext } from "../../Context/FlowContext";
export default function Text({data}:any) {
  const ref = useRef();
  const {setNodeData,setHeightUpdate} = useFlowContext()
  useEffect(()=>{
      setNodeData(data.id,{...data,
          height:(ref.current as unknown as any)?.clientHeight
      })
      setHeightUpdate(u=>u+1)
  },[(ref.current as unknown as any)?.clientHeight])
    return (
      <Box sx={styles.container} ref={ref}>
        <TextFormatIcon/>
        <Typography>Text</Typography>
      </Box>
    )
  }
  
  
  
  
  export  function TextInspector() {
    const [text, setText] = useState("")
    const {inspectorElement,setNodeData,getNode} = useFlowContext();
    const onSave=()=>{
      setNodeData(inspectorElement.id,{id:inspectorElement.id,text:text})
    }
    useEffect(() => {
      let node = getNode(inspectorElement.id)
      if (node){
        if (node.data?.text) setText(node.data.text)
      }
    }, [])
    
      return (
        <div>
          <Box>
            <Button onClick={onSave}>save</Button>
          </Box>
            <div className="inp-text">Message to send</div>
            <div>
                <div className="inp-container">
                        <input className="inp" 
                          value={text} onChange={e=>setText(e.target.value)}
                        />
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