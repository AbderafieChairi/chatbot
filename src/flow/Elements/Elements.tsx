import { Typography } from "@mui/material";
import Intent, { IntentInspector } from "./Intent";
import SignleChoice, { SignleChoiceInspector } from "./SingleChoice";
import Text, { TextInspector } from "./Text";
import MultipleChoice, { MultipleChoiceInspector } from "./MultipleChoice";
import Code, { CodeInspector } from "./Code";
import Expression, { ExpressionInspector } from "./Expression";


export type etype = 'text' | 'signleChoice'|'code'|'MultipleChoice'|'Intent'|'expression'|'SubFlow'|'';

export interface ElementType{
    type:etype
    id:string
}

export default function Element(props:ElementType){ 
    if (props.type === 'text') return <TextInspector />
    if (props.type === 'signleChoice') return <SignleChoiceInspector />
    if (props.type === 'MultipleChoice') return <MultipleChoiceInspector />
    if (props.type === 'code') return <CodeInspector />
    if (props.type === 'expression') return <ExpressionInspector />
    if (props.type === 'Intent') return <IntentInspector />
    return (
        <Typography sx={{m:1,userSelect:"none"}}>tap a element to inspect</Typography>
    )
}


export function NodeElement(props:ElementType){
    if (props.type === 'text') return <Text />
    if (props.type === 'signleChoice') return <SignleChoice />
    if (props.type === 'MultipleChoice') return <MultipleChoice />
    if (props.type === 'code') return <Code />
    if (props.type === 'expression') return <Expression />
    if (props.type === 'Intent') return <Intent />
    return (
        <Typography sx={{m:1,userSelect:"none"}}>not implemented</Typography>
    )
}