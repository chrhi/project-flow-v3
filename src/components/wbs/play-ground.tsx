/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useCallback , useRef, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge,    Background, MiniMap, Controls, type Connection, type Edge, updateEdge } from 'reactflow';
import 'reactflow/dist/base.css';
import  { useReactFlow} from 'reactflow';
import { FC } from 'react'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'
import { CreateDelevarble } from '../common/sheets/add-delevarable'
import DownloadButton from '~/components/react-flow/download-btn';
import { api } from '~/utils/api';
import toast  from 'react-hot-toast';
import CustomNode from './custom-node';
import { ConfirmDeleteDelevarble } from './delete-popup';
import { DelevarableUpdate } from './update-button';
import { getProjectMetaData, getUserMetadata } from '~/lib/MetaData';
import { Plus } from 'lucide-react';
import { Treepopup } from '../popup/Treepopup';

const flowKey = 'example-flow';

const nodeTypes = {
  custom: CustomNode,
};

//@ts-ignore
const initialNodes = [
 
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const Flow = () => {
  const edgeUpdateSuccessful = useRef(true);
  //@ts-ignore
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPopUpOpen , setIsPopUpOpen ] = useState<boolean>(false)
  const [edgeOptions , setEdgeOption] = useState( {
    animated: true,
    type: 'smoothstep',
  })

  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const {isFetching , refetch} = api.projectRouter.get_project.useQuery({user_id : getUserMetadata()},{
    onSuccess : (data) => {
      //@ts-ignore
      const flow = JSON.parse(data?.WorkBreakDownStorage);
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
   
    }, 
  
    onError : () => {
      toast.error("failed to fetch the data")
    },
    retryOnMount : false ,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

  const SaveToDataBase = api.projectRouter.setProjectBreakDown.useMutation({
    onSuccess : (data) => {
      toast.success("changes saved successfully")
    }, 
  
    onError : () => {
      toast.error("failed to fetch the data")
    }
  })


 
  const onSave = useCallback(() => {
    // if (rfInstance) {
    //   const flow = rfInstance.toObject();
    //   localStorage.setItem(flowKey, JSON.stringify(flow));
    // }
    if (rfInstance) {
         //@ts-ignore
    const flow = rfInstance.toObject();
    SaveToDataBase.mutate({
      project_id : getProjectMetaData(),
      projectWorkBreakDown : flow
    })
  }
  }, [rfInstance , SaveToDataBase]);

  const onRestore = useCallback(() => {
    const restoreFlow =  () => {
         //@ts-ignore
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(({ 
     id ,
     description ,
     title ,
     cost , 
     level 
     } : {title: string ,  description : string , cost : number , level : number , id : string }) => {
    //in here we have to make a pop up
    const newNode = {
      id: id,
      data: { 
             title,
             description,
             cost ,
             level  , 
            },

      type: 'custom',
      position: {
        x:  10,
        y: 10,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onDelete = ({id} : {id : string}) => {
   
    setNodes(prev => {
     const newArray =  prev.filter(item => item.id !== id)
     console.log(newArray)
     return newArray
    })
  }

  const onUpdate = ({id , cost , description , title } : {id : string , cost : number , title : string , description : string}) => {
    
    setNodes((nds) =>
    nds.map((node) => {
      if (node.id === id) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
       node.data.cost = cost 
       node.data.description = description 
       node.data.title = title 
      }

      return node;
    })
  );
  }

  
  const reSet = () => {
  
    setNodes([]);
    setEdges([]);
    setViewport({ x : 0, y : 0, zoom : 1 });
  }


  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
     //@ts-ignore
  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);
     //@ts-ignore
  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);



  return (
    <div className='w-full h-full flex flex-col '>
      <ConfirmDeleteDelevarble onDelete={onDelete} />
      
        <DelevarableUpdate onUpdate ={onUpdate}  />
         
    <Treepopup
    
        isOpen={isPopUpOpen}
        setIsOpen={setIsPopUpOpen}
        onAdd={onAdd} refetch={function (): Promise<any> {
          throw new Error('Function not implemented.');
        } }      />
        <div className='w-full h-[50px] flex justify-end gap-x-2 items-center'>

        <AbdullahButton 
       onClick={reSet}
       className={buttonVariants({variant:"secondary" , size:"sm"})}>
     start from zero
      </AbdullahButton>
      
    <AbdullahButton 
       onClick={onSave}
       isLoading={SaveToDataBase.isLoading}
       className={buttonVariants({variant:"secondary" , size:"sm" })}>
      save
      </AbdullahButton>
        {/* second button */}
      <AbdullahButton 
      isLoading={isFetching}
      onClick={onRestore}
      className={buttonVariants({variant:"secondary" , size:"sm" })}>
      {isFetching ? "loading" : "status"}
      </AbdullahButton>

      <AbdullahButton 
      isLoading={isFetching}
      onClick={async () => await refetch()}
      className={buttonVariants({variant:"secondary" , size:"sm" })}>
      reLoad
      </AbdullahButton>
    
      <AbdullahButton 
      onClick={() => setIsPopUpOpen(true)}
      className={buttonVariants({variant:"primary" , size:"sm"})}>
        <Plus className="w-4 h-4 mr-2 " />
        create new task
      </AbdullahButton>
     
      
        <CreateDelevarble  onAdd={onAdd}/>
  </div>
        <div   style={{ height: 530 }}>
     <ReactFlow
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       //@ts-ignore
       onInit={setRfInstance}
       defaultEdgeOptions={edgeOptions}



      nodeTypes={nodeTypes}
    

      fitView

      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      
    >
         <Background color="#aaa" gap={16} />
      <MiniMap />
      <Controls />
      <DownloadButton />
    </ReactFlow>
   </div>
    </div>
   
  );
};

export default Flow;