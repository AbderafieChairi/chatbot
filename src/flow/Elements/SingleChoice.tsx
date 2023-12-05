import { Box, Button, FormControl,InputLabel, MenuItem, Select, SxProps, Theme,Typography } from "@mui/material";
import "./Styles.css"
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useEffect, useState } from "react";
import { useFlowContext } from "../../Context/FlowContext";
export default function SignleChoice() {
    return (
        <Box sx={styles.container}>
          <RecordVoiceOverIcon/>
          <Typography>Signle Choice</Typography>
        </Box>
      )
    }
  
  
  export  function SignleChoiceInspector() {
    const [Question, setQuestion] = useState<string>('')
    const [storedVar, setStoredVar] = useState<string>('')
    const {inspectorElement,setNodeData,getNode} = useFlowContext();
    const onSave=()=>{
      setNodeData(inspectorElement.id,{id:inspectorElement.id,question:Question,storedVar:storedVar})
    }
    useEffect(() => {
      let node = getNode(inspectorElement.id)
      if (node){
        if (node.data?.question) setQuestion(node.data.question)
        if (node.data?.storedVar) setStoredVar(node.data.storedVar)
      }
    }, [])
      return (
        <div>
            <Box>
                <Button onClick={onSave}>save</Button>
            </Box>
            <div className="inp-text">Question to ask user</div>
            <div>
                <div className="inp-container">
                        <input className="inp" value={Question} onChange={e=>setQuestion(e.target.value)}/>
                    </div>
            </div>
            <div className="inp-text">Store result in </div>
            <div className="inp-container">
                <SelectItem label="Select Variable" elements={["a","b"]} value={storedVar} setValue={setStoredVar}/>
            </div>
        </div>
      )
    }
    

type SelectItemType = {
    label:string,
    elements:string[],
    value:string,
    setValue:React.Dispatch<React.SetStateAction<string>>
}

export const SelectItem=(props:SelectItemType)=>{



    
    return(
        <FormControl sx={{flex:1,width:'100%',borderColor:'white'}} size="small">
            <InputLabel id="demo-simple-select-label"  sx={{color:'white'}} >{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                label={props.label}
                onChange={e=>props.setValue(e.target.value)}
                sx={{color:'white',borderColor:'white'}} 
            >
                {/* <Input fullWidth sx={{m:1}}/> */}
                {props.elements.map((i,k)=><MenuItem value={i} key={k}>{i}</MenuItem>)}
            </Select>
        </FormControl>
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