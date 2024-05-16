/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState ,useRef ,  useCallback } from 'react';
import { FormContainer } from '~/components/used/FormContainer';
import { FormHead } from '~/components/used/FormHead';
import { Treepopup } from '~/components/popup/Treepopup';
import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import DownloadButton from '~/components/react-flow/download-btn';
import ReactFlow , {
  MiniMap,
  Controls,
  Background,
  useReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import { AbdullahButton  , buttonVariants} from '~/components/used/AbdullahButton';
import { api } from '~/utils/api';
import { getProjectMetaData, getUserMetadata } from '~/lib/MetaData';
import toast  from 'react-hot-toast';
import { TaskPopUpShowCase } from '~/components/popup/task-pop-up';
import { openTasksShowUp } from '~/store/open-models';
import { AddMagicNode } from '~/components/popup/addMagicNode';
import { Plus } from 'lucide-react';

const initialNodes = [
 
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;



const Page: NextPage = () => {


  const edgeUpdateSuccessful = useRef(true);
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const [isOpenMagic , setIsOpenMagic] = useState<boolean>(false)
  const [isOpenAlert , setIsOpenAlert] = useState<boolean>(true)
  const [isPopUpOpen , setIsPopUpOpen ] = useState<boolean>(false)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edgeOptions , setEdgeOption] = useState( {
    animated: true,
    type: 'smoothstep',
  })
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const opemModelShowCase = openTasksShowUp(state => state.setShowModel)
  const setIdOfOpemModel = openTasksShowUp(state => state.setId)

  const handleNodeClicked = ({target}) => {
    setIdOfOpemModel(target.dataset.id)
    opemModelShowCase(true)
  }
  
  const {isFetching , refetch} = api.projectRouter.get_project.useQuery({user_id : getUserMetadata()},{
    onSuccess : (data) => {
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


  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onSave = useCallback(() => {
    // if (rfInstance) {
    //   const flow = rfInstance.toObject();
    //   localStorage.setItem(flowKey, JSON.stringify(flow));
    // }
    if (rfInstance) {
    const flow = rfInstance.toObject();
    SaveToDataBase.mutate({
      project_id : getProjectMetaData(),
      projectWorkBreakDown : flow
    })
  }
  }, [rfInstance , SaveToDataBase]);

  const onRestore = useCallback(() => {
    const restoreFlow =  () => {
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

  const reSet = () => {
  
    setNodes([]);
    setEdges([]);
    setViewport({ x : 0, y : 0, zoom : 1 });
  }


  const onAdd = useCallback(({title , id   } : {title: string  }) => {
    //in here we have to make a pop up
    const newNode = {
      id: id,
      data: {
         label: title,
         value : id,
         },

      position: {
        x: 10,
        y: 10,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);
   
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
//   className="inline-flex justify-center rounded-md bg-blue-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"

  return (
 <>
    
      <Header />
      <main className={` custopn-page-height  flex w-full   ${isOpenAlert ? "bg-gray-50" : "bg-white"}`} >
        <TaskPopUpShowCase />
       <PlanningSideBar setIsOpen ={setIsOpenAlert} isOpen = {isOpenAlert} />
       <FormContainer className ={` ${isOpenAlert ? "ml-[20rem]" : "m-[0]"}`}>
      {/* <Treepopup setIsOpen ={setIsOpen} isOpen ={isOpen} refetch={() => {console.log("")}} parent_id={233}/> */}
     <div className='w-[95%] mx-auto h-[70px] bg-white pl-4'>

       <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-white  " role="alert">
          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
       <div>
       <span class="font-medium">Alerte d'information! </span> Les livrables dans la structure de découpage du travail (WBS) ne sont pas liés aux tâches dans notre outil
       </div>
       </div>

     </div>
   
      <div className='w-[95%] mx-auto h-[50px] bg-white gap-x-4 py-4 flex justify-end px-4 items-center '>
     
        {/* first button */}
        <AbdullahButton 
       onClick={reSet}
       className={buttonVariants({variant:"secondary" , size:"sm"})}>
     Commencer à partir de zéro
      </AbdullahButton>
      
    <AbdullahButton 
       onClick={onSave}
       isLoading={SaveToDataBase.isLoading}
       className={buttonVariants({variant:"secondary" , size:"sm" })}>
      sauvegarder
      </AbdullahButton>
        {/* second button */}
      <AbdullahButton 
      isLoading={isFetching}
      onClick={onRestore}
      className={buttonVariants({variant:"secondary" , size:"sm" })}>
      {isFetching ? "chargement" : "statut"}
      </AbdullahButton>

      <AbdullahButton 
      isLoading={isFetching}
      onClick={async () => await refetch()}
      className={buttonVariants({variant:"secondary" , size:"sm" })}>
      recharger
      </AbdullahButton>
    
      <AbdullahButton 
      onClick={() => setIsPopUpOpen(true)}
      className={buttonVariants({variant:"primary" , size:"sm"})}>
        <Plus className="w-4 h-4 mr-2 " />
        créer une nouvelle tâche
      </AbdullahButton>
      <AbdullahButton 
      onClick={() => setIsOpenMagic(true)}
      className={`${buttonVariants({variant:"primary", size:"sm" })} bg-gradient-to-r from-pink-400 to-pink-500`}>
        <Plus className="w-4 h-4 mr-2 " />
        Ajouter des livrables
      </AbdullahButton>
      </div>
    <div id="treeWrapper" className='mx-auto bg-white ' style={{ width: '95%', height: '100%' }}>

    
    <Treepopup
      isOpen = {isPopUpOpen}
      setIsOpen={setIsPopUpOpen} 
      onAdd={onAdd}
      />
    <AddMagicNode
     setIsOpen ={setIsOpenMagic} 
     isOpen ={isOpenMagic}   
     onAdd={onAdd}  
     />
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}
      defaultEdgeOptions={edgeOptions}
      // onNodeClick={(node) => handleNodeClicked(node)}
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onNodesDelete={(nodes) => { console.log("delete node")}}
    >

      <div className="save__controls">
     
      </div>
      <MiniMap  zoomable pannable  />
      <Controls />
      <Background color="#aaa" gap={16} />
       <DownloadButton />
    </ReactFlow>
   
    </div>
    </FormContainer>
      </main>
      </>
  );
};

export default Page;