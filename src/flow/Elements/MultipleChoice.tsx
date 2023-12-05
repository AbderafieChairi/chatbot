import { Box, Button, FormControl,IconButton,InputLabel, MenuItem, Select, SxProps, Theme,Typography } from "@mui/material";
import "./Styles.css"
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useEffect, useRef, useState } from "react";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFlowContext } from "../../Context/FlowContext";
import { Handle, Position } from "reactflow";
export default function MultipleChoice({data}:any) {
    const ref = useRef();
    const {setNodeData,setHeightUpdate} = useFlowContext()
    React.useEffect(()=>{
        setNodeData(data.id,{...data,
            height:(ref.current as unknown as any)?.clientHeight
        });
        setHeightUpdate(u=>u+1)
    },[(ref.current as unknown as any)?.clientHeight])
    return (
        <Box sx={styles.container} ref = {ref}>
            <Box sx={styles.row}>
            <RecordVoiceOverIcon/>
            <Typography>Multiple Choice</Typography>

            </Box>
            {data?.choices?.map((item:any,k:number)=>(
                <Typography key={k} sx={styles.choice}>{item.value}</Typography>
            ))
            }
            {data?.choices?.map((i:string,k:number)=>(
                <Handle type="source" position={Position.Right} id={k.toString()} style={{top:`${45+k*30}px`,}} />
            ))}
        </Box>
      )
    }
  
  
  export  function MultipleChoiceInspector() {
    const [question, setQuestion] = useState<string>('')
    const [storedVar, setStoredVar] = useState<string>('')
    const [choices, setChoices] = useState<{id:number,value:string}[]>([])
    const {inspectorElement,setNodeData,getNode} = useFlowContext();
    const onSave=()=>{
      setNodeData(inspectorElement.id,{id:inspectorElement.id,
        question:question,
        storedVar:storedVar,
        choices:choices
    })
    }
    useEffect(() => {
      let node = getNode(inspectorElement.id)
      if (node){
        if (node.data?.question) setQuestion(node.data.question)
        if (node.data?.storedVar) setStoredVar(node.data.storedVar)
        if (node.data?.choices) setChoices(node.data.choices)
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
                        <input className="inp" value={question} onChange={e=>setQuestion(e.target.value)}/>
                    </div>
            </div>
            <div className="inp-text">Store result in </div>
            <div className="inp-container">
                <SelectItem label="Select Variable" elements={["a","b"]} value={storedVar} setValue={setStoredVar}/>
            </div>
            <div className="inp-text">Choices </div>
            {choices.map((i,k)=>(
                <div className="inp-container row" key={k}>
                    <input className="inp" value={i.value} onChange={e=>{
                        setChoices(
                            cs=>cs.map(c=>c.id===i.id?{id:k,value:e.target.value}:c)
                        )
                    }}/>
                    <IconButton onClick={()=>{
                        setChoices(cs=>cs.filter(c=>c.id!==k))
                    }}>
                        <RemoveIcon sx={{color:'white'}}/>
                    </IconButton>
                </div>
            ))}
            <Box sx={{p:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{
                        setChoices(c=>[...c,{id:Math.floor(Math.random()*10000000),value:""}])
                    }}>
                    <AddIcon sx={{color:'white'}} />
                </IconButton>
            </Box>
        </div>
      )
    }
    

type SelectItemType = {
    label:string,
    elements:string[],
    value:string,
    setValue:React.Dispatch<React.SetStateAction<string>>
}

const SelectItem=(props:SelectItemType)=>{
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
        width:'178px',
        border:'dashed 2px #373c3e',
        borderRadius:1,
        cursor:'pointer',
        ':hover':{
            borderColor:t=>t.palette.primary.main,
        },
        backgroundColor:'#081120'
    } as SxProps<Theme>,
    choice:{
        textAlign:'right',
        m:1
    } as SxProps<Theme>,
    row:{
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        columnGap:1,
        
    } as SxProps<Theme>,
  }