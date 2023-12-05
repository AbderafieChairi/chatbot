import { Box, SxProps, Theme, Typography } from "@mui/material"
import { etype } from "../Elements/Elements"

// export type etype = 'text' | 'signleChoice'|'code'|'MultipleChoice'|'Intent'|'expression'|'SubFlow'|'';


const elements=[
    {
        name:'Send Messages',
        values:[
            {
                name:'text',
                type:'text'
            }
        ]
    },
    {
        name:'Capture Informations',
        values:[
            {
                name:'Signle Choice',
                type:'signleChoice'
            },
            {
                name:'Multiple Choice',
                type:'MultipleChoice'
            }
        ]
    },
    {
        name:'Execute',
        values:[
            {
                name:'Execute code',
                type:'code'
            }
        ]
    },
    {
        name:'Flow Logic',
        values:[
            {
                name:'Intent',
                type:'Intent'
            },
            {
                name:'Expression',
                type:'expression'
            },
            {
                name:'Sub Flow',
                type:'SubFlow'
            },
            
        ]
    },

]


export default function Elements() {
  return (
    <Box sx={styles.div}>
        {elements.map((el,k)=>{
            return(
                <Box sx={styles.container} key={k}>
                    <div>{el.name}</div>
                    {el.values.map((val,kk)=><NodeElement key={kk} name={val.name} type={val.type as etype}/>)}
                </Box>
            )
        })}
    </Box>
  )
}

interface NodeElementType{
    name:string,
    type:etype
}

const NodeElement=({name,type}:NodeElementType)=>{
    const onDragStart = (e:any) => {
        e.dataTransfer.setData('type', type);
      };
    
      const onDragOver = (e:any) => {
        e.preventDefault();
      };
    
    return(
        <div draggable={true} onDragOver={onDragOver}  onDragStart={(e:any) => onDragStart(e)}>
            <Box sx={styles.box}>
                <Typography>
                    {name}
                </Typography>
            </Box>
        </div>

    )
}



const styles={
    box:{
        borderRadius:1,
        bgcolor:'#081120',
        borderWidth:'1px',
        borderColor:"white",
        width:'100px',
        p:1,
        m:1,
        cursor:'pointer'
    } as SxProps<Theme>,
    container:{
        p:1,
    } as SxProps<Theme>,
    div:{
        // overflowY:'scroll',
    } as SxProps<Theme>,
    
}