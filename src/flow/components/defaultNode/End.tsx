import { Box, SxProps, Theme} from "@mui/material";
import { Handle, Position } from "reactflow";
import PauseIcon from '@mui/icons-material/Pause';


export default function End() {
  return (
    <Box sx={styles.box}>
        <Box sx={styles.row}>
            <PauseIcon/> End
        </Box>
        <Handle type="target" position={Position.Left} id="a" style={{top:'50%'}}/>
    </Box>
  )
}





const styles={
    box:{
        borderRadius:1,
        bgcolor:'#081120',
        borderColor:"white",
        width:'100px'
    } as SxProps<Theme>,
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        columnGap:1,
        p:0.5,
        borderRadius:1,
    } as SxProps<Theme>,
}