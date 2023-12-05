import { Box, Button, SxProps, Theme, Typography } from '@mui/material'
import './Styles.css'
import StartIcon from '@mui/icons-material/Start';
import { useEffect, useState,useRef } from 'react';
import { SelectItem } from './SingleChoice';
import { Handle, Position } from 'reactflow';
import { useFlowContext } from '../../Context/FlowContext';
export default function Intent({data}:any) {
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
      <StartIcon/>
:any      <Typography>Intent is :</Typography>
      <Handle type="source" position={Position.Right} id="a" />
    </Box>
  )
}

export  function IntentInspector() {
  const [intent, setIntent] = useState<string>("")
  const {inspectorElement,setNodeData,getNode} = useFlowContext();

  const onSave=()=>{
    setNodeData(inspectorElement.id,{id:inspectorElement.id,intent:intent})
  }
  useEffect(() => {
    let node = getNode(inspectorElement.id)
    if (node){
      if (node.data?.intent) setIntent(node.data.intent)
    }
  }, [])

    return (
      <div>
          <Box>
            <Button onClick={onSave}>save</Button>
          </Box>
          <div className="inp-text">Intent is :</div>
          <div className='inp-container'>
            <SelectItem label='select Intent' elements={["yes",'no',"ask for device"]} value={intent} setValue={setIntent}/>
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