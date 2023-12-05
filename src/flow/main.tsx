import { useCallback, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, EdgeChange, Edge, addEdge, useReactFlow, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import Node_ from './components/Node/Node';
import Start from './components/defaultNode/Start';
import End from './components/defaultNode/End';
import { useFlowContext } from '../Context/FlowContext';
import Intent from './Elements/Intent';
import Text from './Elements/Text';
import { Box } from '@mui/material';
import SignleChoice from './Elements/SingleChoice';
import Expression from './Elements/Expression';
import MultipleChoice from './Elements/MultipleChoice';
import Code from './Elements/Code';




const nodeTypes = {
    defaultNode:Node_,
    start:Start,
    end:End,
    Intent:Intent,
    text:Text,
    signleChoice:SignleChoice,
    expression:Expression,
    MultipleChoice:MultipleChoice,
    code:Code
};


function Flow() {
  const { onNodeClick,nodes, edges, setNodes, setEdges } =useFlowContext()
  const reactFlowWrapper = useRef(null);
  const [menu, setMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({x:0,y:0})
  const { project } = useReactFlow();
  const onNodesChange = useCallback(
  (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),
  []
  );
  const onEdgesChange = useCallback(
  (changes:EdgeChange[]) => setEdges((eds:Edge<any>[]) => applyEdgeChanges(changes, eds)),
  []
  );
  const onConnect = useCallback((params:any) => setEdges((eds:any) => addEdge(params, eds)), []);
  const onContextMenu=useCallback((event:any)=>{
    event.preventDefault()
    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane && reactFlowWrapper?.current)
    {
      const { top, left } = (reactFlowWrapper?.current as any).getBoundingClientRect();
      // setBankPos(project({ x: event.clientX - left , y: event.clientY - top}))
      const p = project({ x: event.clientX - left , y: event.clientY - top})
      console.log(p)
      setMenuPos(p)
      setMenu(true)
    }
  },[])

  return (

      <div style={{ height: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onContextMenu={onContextMenu}
          onClick={()=>{setMenu(false)}}
          onNodeClick={onNodeClick}
        >
          <Background />
          <Controls />
          {menu&&<FlowMenu 
            setMenu={setMenu} 
            menuPos={menuPos} 
            />}
        </ReactFlow>
      </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);




function FlowMenu(props:any){
  const {addNode} = useFlowContext()
  return (
    <Box  style={{position:"absolute",top:`${props.menuPos.y}px`,left:`${props.menuPos.x}px`,backgroundColor:"#333",minWidth:'150px',zIndex:998}}>
      <Box
        sx={{
          cursor:'pointer',
          ":hover":{
            backgroundColor:"#444"
          },
          zIndex:999,
          p:1
        }}
        onClick={()=>{addNode({x:props.menuPos.x,y:props.menuPos.y})}}
      >add Node</Box>
    </Box>
  )
}