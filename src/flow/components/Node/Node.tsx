import { Box, SxProps, Theme, Typography} from "@mui/material";
import { Handle, Position } from "reactflow";
import { useEffect, useState } from "react";
import { useFlowContext } from "../../../Context/FlowContext";



export default function Node({data}:{data:any}) {
    const [elements,setElements] = useState<any[]>([])
    const {setNodes} = useFlowContext()
    useEffect(() => {
      console.log(data)
    }, [])
    
    const onDrop=(e:any,index:number) => {
        const i = {name:e.dataTransfer.getData('type')}
        // if (i.name=='Intent'){
        setNodes(ns=>[...ns,{
            id:`${data.id}-${elements.length}`,
            data:{id:`${data.id}-${elements.length}`},
            type:i.name,
            position:{x:5,y:40*elements.length+70},
            parentNode:data.id,
            draggable: false
        }]);
            // return;
        // }
        console.log(i)
        if (index===-1){
            setElements([...elements,i]);return;
        }
        const j =[...elements.slice(0,index+1),i,...elements.slice(index,-1)]
        console.log(j)
        setElements(j)
        // add i in index of elements

    }

    return (
        <Box sx={styles.box(data.height+80)}>
            <Typography sx={styles.header}>
                test header
            </Typography>
            <div
                onDrop={e=>onDrop(e,-1)}
                onDragOver={(e:any) => e.preventDefault()}
                style={{backgroundColor:'#ccc',opacity:0.3}}
            >
                <Box  sx={styles.boxAdd}/>
            </div>
            <Handle type="target" position={Position.Left} id="a" style={{top:25}}/>

            {/* {elements.map((el,index)=>(
                <div key={index} 
                onClick={()=>{setInspectorElement({type:el.name,id:`${index}`})}}
                >
                    <Box sx={styles.row}>
                        <NodeElement type={el.name} id={"index"} />
                    </Box>
                        <div onDrop={e=>onDrop(e,index)} style={{height:"7px"}} onDragOver={(e:any) => e.preventDefault()}>
                        </div>
                </div>
            ))} */}

        </Box>
    )
}







const styles={
    box:(h:number)=>({
        borderRadius:1,
        bgcolor:'#081120',
        borderColor:"white",
        width:'200px',
        minHeight:h
    } as SxProps<Theme>),
    header:{
        p:2,
    } as SxProps<Theme>,
    row:{
        columnGap:1,
        border:'dashed 2px #373c3e',
        ml:0.5,
        mr:0.5,
        borderRadius:1,
        cursor:'pointer',
        ':hover':{
            borderColor:t=>t.palette.primary.main,
        }
    } as SxProps<Theme>,
    boxAdd:{
        p:0.5,
        height:"3px",

    } as SxProps<Theme>
}