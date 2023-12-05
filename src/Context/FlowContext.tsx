import { createContext, useContext, useEffect, useState } from 'react';
import { ElementType, etype } from '../flow/Elements/Elements';
import {Node,Edge} from 'reactflow';

type FlowContextType = {
  inspectorElement: ElementType,
  setInspectorElement:  React.Dispatch<React.SetStateAction<ElementType>>,
  nodes: Node<any>[],
  edges: Edge<any>[],
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>,
  getChildNodes: (id:string) => Node<any>[],
  getParentNode: (id:string) => Node<any> | undefined,
  addNode: (position:{x:number,y:number}) => void,
  onNodeClick :(e:React.MouseEvent<Element, MouseEvent>,node:Node<any, string | undefined>)=>void,
  setNodeData: (id:string, data:any) => void,
  getNode: (id:string) => Node<any> | undefined,
  heightUpdate: number,
  setHeightUpdate: React.Dispatch<React.SetStateAction<number>>,

};
export const useFlowContext = () => {
    return useContext(FlowContext);
}



export const FlowContext = createContext<FlowContextType>({} as FlowContextType);

const initialNodes:Node<any>[] = [
  {
      id: 'node-0',
      data: { label: 'node-0',id:"node-0" },
      position: { x: 150, y: 150 },
      type: 'defaultNode',
    },
    {
      id: 'start',
      data: { label: 'Hello' },
      position: { x: 20, y: 300 },
      type: 'start',
    },
    {
      id: 'end',
      data: { label: 'Hello' },
      position: { x: 700, y: 300 },
      type: 'end',
    },
  ];




export const FlowProvider= ({ children }: any) => {
  const [inspectorElement, setInspectorElement] = useState<ElementType>({type:""} as ElementType)
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge<any>[]>([]);
  const [heightUpdate, setHeightUpdate] = useState<number>(0)



  useEffect(()=>{
    for (let node of nodes){
      const ns = getChildNodes(node.id)
      if (ns.length>0) {
        let h = 0;
        let hs=[]
        for (let n of ns.sort(i=>i.id.localeCompare(node.id))){
          console.log(n.id)
          updateHeight(n.id,h+70)
          if (n.data.height) {h += n.data.height+10;hs.push(h)}
        }
        console.log(h,hs)
        setNodeData(node.id,{...node.data,height:h,hs:hs})
      }

    }
  },[heightUpdate])
  const updateHeight = (id:string,h:number) => {
    const node = nodes.find(n=>n.id===id)
    if(node){
      node.position.y=h;
      setNodes((nds) => nds.map(n => n.id === id ? node : n));
    }
  }

  const getChildNodes =(id:string):Node<any>[]=>{
    return nodes.filter(n=>n.parentNode===id)
  }
  const getParentNode=(id:string):Node<any>| undefined=>{
    const node = nodes.find(n=>n.id===id)
    return nodes.find(n=>n.id===node?.parentNode)
  }

  const addNode = (position:{x:number,y:number})=>{
    const id = 'node-'+Math.floor(Math.random()*1000+1).toString();
    const newNode = {
      id:id,
      data: { label: 'New Node', id:id},
      position,
      type: 'defaultNode',
    };
    setNodes((nds) => [...nds, newNode]);
  }

  const onNodeClick =(e:React.MouseEvent<Element, MouseEvent>,node:Node<any, string | undefined>)=>{
    e;
    setInspectorElement({
      type:node.type as etype || "signleChoice",
      id:node.id
    })
  }
  const setNodeData=(id:string,data:any)=>{
    const node = nodes.find(n=>n.id===id)
    if (node)
    {node.data = data;
      setNodes((nds) => nds.map(n => n.id === id ? node : n));
    }
  }
  const getNode=(id:string)=>{
    return nodes.find(n=>n.id===id)
  }

  const values: FlowContextType = {
    inspectorElement,
    setInspectorElement,
    nodes,
    edges,
    setNodes,
    setEdges,
    getChildNodes,
    getParentNode,
    addNode,
    onNodeClick,
    setNodeData,
    getNode,
    heightUpdate,
    setHeightUpdate
  }


  return (
    <FlowContext.Provider value={values}>
        {children}
    </FlowContext.Provider>

  )
};