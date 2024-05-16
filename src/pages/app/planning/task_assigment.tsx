import { type NextPage } from "next";
import Head from "next/head";
import {  FormEvent, useState } from "react";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import { AbdullahTable, type ItemTable } from "~/components/used/AbdullahTable";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { RowGridText } from "~/components/typography/RowGridText";
import { TextField } from "~/components/used/TextField";
import { api } from "~/utils/api";
import  toast  from "react-hot-toast";
import { getProjectMetaData } from "~/lib/MetaData";
import { FormButton } from "~/components/used/FormButton";
import { ProjectLifeSCYcleAdd } from "~/components/popup/planning-phase/ProjectLifeSycle";
import { DataTable } from "~/components/common/constants/resource-table/data-table";



const Page: NextPage = () => {
  const [isOpen , setIsOpen] = useState<boolean>(true)

  const [formData , setFormData] = useState({
    id : "",
    IntegrationProcesses   : "",
    IntegrationTailoringDecisions : "",
    ScopeProcesses : "",
    ScopeTailoringDecisions : "",
    TimeProcesses : "",
    TimeTailoringDecisions : "",
    CostProcesses : "",
    CostTailoringDecisions   : "",
    QualityProcesses : "",
    QualityTailoringDecisions : "",
    HumanResourcesProcesses : "",
    HumanResourcesTailoringDecisions : "",
    CommunicationProcesses : "",
    CommunicationTailoringDecisions : "",
    RiskProcesses  : "",
    RiskTailoringDecisions : "",
    ProcurementProcesses : "",
    ProcurementTailoringDecisions : "",
    StakeholdersProcesses : "",
    StakeholdersTailoringDecisions : "",
    IntegrationToolsandTechniques : "",
    ScopeToolsAndTechniques   : "",
    TimeToolsAndTechniques : "",
    CostToolsandTechniques : "",
    QualityToolsAndTechniques : "",
    HumanResourcesToolsAndTechniques : "",
    CommunicationToolsAndTechniques : "",
    RiskToolsAndTechniques : "",
    ProcurementToolsAndTechniques : "",
    StakeholdersToolsAndTechniques : "",
    ProjectReviews : ""
  })
  const [didGetData , setDidGetData] = useState<boolean>(false)

  const [dataLifeCycle , setDataLifeCycle] = useState<ItemTable[]>([] as ItemTable[])

  const {refetch : AbdullahRefech , isLoading :  isAbdullahLoading} = api.ProjecrLifeCycleRouter.dataGet.useQuery({projectId : getProjectMetaData()},{
    onError : (err) => {
      toast.error(err.message)
    },
    onSuccess(data) {
      const PreparedArray = data.map((item) => {
        return {
          id : item.id , 
          properties : [item.Phase , item.KeyDeliverables],
          callback: (id: string) => console.log(id)
        }
      })
      
        setDataLifeCycle(PreparedArray as ItemTable[])
      
    },
  })

 

  const {isFetching , refetch} = api.projectManagmentPlanRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
    retryOnMount : false ,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    onSuccess(data) {
      if(data?.id ){
        setDidGetData(true)
      }
      setFormData({
            id : data?.id || "",
            IntegrationProcesses   : data?.IntegrationProcesses  || "",
            IntegrationTailoringDecisions : data?.IntegrationTailoringDecisions  || "",
            ScopeProcesses : data?.ScopeProcesses  || "",
            ScopeTailoringDecisions : data?.ScopeTailoringDecisions  || "",
            TimeProcesses :data?.TimeProcesses  || "",
            TimeTailoringDecisions : data?.TimeTailoringDecisions  || "",
            CostProcesses : data?.CostProcesses  || "",
            CostTailoringDecisions   : data?.CostTailoringDecisions  || "",
            QualityProcesses :data?.QualityProcesses  || "",
            QualityTailoringDecisions : data?.QualityTailoringDecisions  || "",
            HumanResourcesProcesses :data?.HumanResourcesProcesses  || "",
            HumanResourcesTailoringDecisions : data?.HumanResourcesTailoringDecisions  || "",
            CommunicationProcesses : data?.CommunicationProcesses  || "",
            CommunicationTailoringDecisions : data?.CommunicationTailoringDecisions  || "",
            RiskProcesses   : data?.RiskProcesses  || "",
            RiskTailoringDecisions : data?.RiskTailoringDecisions  || "",
            ProcurementProcesses : data?.ProcurementProcesses  || "",
            ProcurementTailoringDecisions : data?.ProcurementTailoringDecisions  || "",
            StakeholdersProcesses : data?.StakeholdersProcesses  || "",
            StakeholdersTailoringDecisions : data?.StakeholdersTailoringDecisions  || "",
            IntegrationToolsandTechniques : data?.IntegrationToolsandTechniques  || "",
            ScopeToolsAndTechniques   : data?.ScopeToolsAndTechniques  || "",
            TimeToolsAndTechniques :data?.TimeToolsAndTechniques  || "",
            CostToolsandTechniques :data?.CostToolsandTechniques  || "",
            QualityToolsAndTechniques : data?.QualityToolsAndTechniques  || "",
            HumanResourcesToolsAndTechniques :data?.HumanResourcesToolsAndTechniques  || "",
            CommunicationToolsAndTechniques : data?.CommunicationToolsAndTechniques  || "", 
            RiskToolsAndTechniques :data?.RiskToolsAndTechniques  || "", 
            ProcurementToolsAndTechniques : data?.ProcurementToolsAndTechniques  || "", 
            StakeholdersToolsAndTechniques : data?.StakeholdersToolsAndTechniques  || "",
            ProjectReviews : data?.ProjectReviews   || "",
      })
    },
    onError(err) {
    
      toast.error(err.message)
    },
  })
 const  post = api.projectManagmentPlanRouter.dataAdd.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
  
      toast.error(err.message)
    },
  })
  const  update = api.projectManagmentPlanRouter.dataUpdate.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
      console.log(err)
      toast.error("quelque chose s'est mal passé")
    },
  })

    const handleCreate = (event : FormEvent) => {
      //todo handle this later
      event.preventDefault()
     
      post.mutate({
        projectId : getProjectMetaData() ,
      
            IntegrationProcesses   : formData?.IntegrationProcesses  ,
            IntegrationTailoringDecisions : formData?.IntegrationTailoringDecisions  ,
            ScopeProcesses : formData?.ScopeProcesses  ,
            ScopeTailoringDecisions : formData?.ScopeTailoringDecisions  ,
            TimeProcesses :formData?.TimeProcesses  ,
            TimeTailoringDecisions : formData?.TimeTailoringDecisions  ,
            CostProcesses : formData?.CostProcesses  ,
            CostTailoringDecisions   : formData?.CostTailoringDecisions  ,
            QualityProcesses :formData?.QualityProcesses  ,
            QualityTailoringDecisions : formData?.QualityTailoringDecisions  ,
            HumanResourcesProcesses :formData?.HumanResourcesProcesses  ,
            HumanResourcesTailoringDecisions : formData?.HumanResourcesTailoringDecisions  ,
            CommunicationProcesses : formData?.CommunicationProcesses  ,
            CommunicationTailoringDecisions : formData?.CommunicationTailoringDecisions  ,
            RiskProcesses   : formData?.RiskProcesses  ,
            RiskTailoringDecisions : formData?.RiskTailoringDecisions ,
            ProcurementProcesses : formData?.ProcurementProcesses  ,
            ProcurementTailoringDecisions : formData?.ProcurementTailoringDecisions  ,
            StakeholdersProcesses : formData?.StakeholdersProcesses  ,
            StakeholdersTailoringDecisions : formData?.StakeholdersTailoringDecisions  ,
            IntegrationToolsandTechniques : formData?.IntegrationToolsandTechniques  ,
            ScopeToolsAndTechniques   : formData?.ScopeToolsAndTechniques  ,
            TimeToolsAndTechniques :formData?.TimeToolsAndTechniques  ,
            CostToolsandTechniques :formData?.CostToolsandTechniques ,
            QualityToolsAndTechniques : formData?.QualityToolsAndTechniques  ,
            HumanResourcesToolsAndTechniques :formData?.HumanResourcesToolsAndTechniques  ,
            CommunicationToolsAndTechniques : formData?.CommunicationToolsAndTechniques  , 
            RiskToolsAndTechniques :formData?.RiskToolsAndTechniques  , 
            ProcurementToolsAndTechniques : formData?.ProcurementToolsAndTechniques  , 
            StakeholdersToolsAndTechniques : formData?.StakeholdersToolsAndTechniques  ,
            ProjectReviews : formData?.ProjectReviews   ,
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
   
      update.mutate({
        id : formData.id ,
    
        IntegrationProcesses   : formData?.IntegrationProcesses  ,
            IntegrationTailoringDecisions : formData?.IntegrationTailoringDecisions  ,
            ScopeProcesses : formData?.ScopeProcesses  ,
            ScopeTailoringDecisions : formData?.ScopeTailoringDecisions  ,
            TimeProcesses :formData?.TimeProcesses  ,
            TimeTailoringDecisions : formData?.TimeTailoringDecisions  ,
            CostProcesses : formData?.CostProcesses  ,
            CostTailoringDecisions   : formData?.CostTailoringDecisions  ,
            QualityProcesses :formData?.QualityProcesses  ,
            QualityTailoringDecisions : formData?.QualityTailoringDecisions  ,
            HumanResourcesProcesses :formData?.HumanResourcesProcesses  ,
            HumanResourcesTailoringDecisions : formData?.HumanResourcesTailoringDecisions  ,
            CommunicationProcesses : formData?.CommunicationProcesses  ,
            CommunicationTailoringDecisions : formData?.CommunicationTailoringDecisions  ,
            RiskProcesses   : formData?.RiskProcesses  ,
            RiskTailoringDecisions : formData?.RiskTailoringDecisions ,
            ProcurementProcesses : formData?.ProcurementProcesses  ,
            ProcurementTailoringDecisions : formData?.ProcurementTailoringDecisions  ,
            StakeholdersProcesses : formData?.StakeholdersProcesses  ,
            StakeholdersTailoringDecisions : formData?.StakeholdersTailoringDecisions  ,
            IntegrationToolsandTechniques : formData?.IntegrationToolsandTechniques  ,
            ScopeToolsAndTechniques   : formData?.ScopeToolsAndTechniques  ,
            TimeToolsAndTechniques :formData?.TimeToolsAndTechniques  ,
            CostToolsandTechniques :formData?.CostToolsandTechniques ,
            QualityToolsAndTechniques : formData?.QualityToolsAndTechniques  ,
            HumanResourcesToolsAndTechniques :formData?.HumanResourcesToolsAndTechniques  ,
            CommunicationToolsAndTechniques : formData?.CommunicationToolsAndTechniques  , 
            RiskToolsAndTechniques :formData?.RiskToolsAndTechniques  , 
            ProcurementToolsAndTechniques : formData?.ProcurementToolsAndTechniques  , 
            StakeholdersToolsAndTechniques : formData?.StakeholdersToolsAndTechniques  ,
            ProjectReviews : formData?.ProjectReviews   ,
      })
    }
 

 
  return (
    <>
      <Head>
      <title>ProjectFlow</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      <main className=" custopn-page-height  flex w-full bg-gray-50 ">
      <PlanningSideBar setIsOpen ={setIsOpen} isOpen = {isOpen} />
       <FormContainer className ={` ${isOpen ? "ml-[20rem]" : "ml-[0]"}`}>
     
      <Form >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">
           <RowGridText text="Plan de gestion de projet " />
           <RowGridText small text="Créez un plan de gestion de projet complet qui intègre divers aspects de gestion, notamment la portée, le calendrier, le coût, la qualité, les ressources, la communication, les risques et les achats, en fournissant une feuille de route pour la réussite de l'exécution, du suivi et du contrôle du projet, du lancement à la clôture." />
         
          <div className="col-span-6 lg:col-span-12 ">
             <AbdullahTable
                    isLoading={isAbdullahLoading}
                    Action={false}
                    ActionName="Assign"
                    headers={["Phase" , "Key Deliverables" ]}
                    body={dataLifeCycle}
                    PlusButton={<ProjectLifeSCYcleAdd refetch={AbdullahRefech} />}
              />
           </div>
           <RowGridText text="Project Management Processes and Tailoring Decisions"/>
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Integration Processes" onChange={(e) => setFormData({...formData ,IntegrationProcesses : e.target.value })} value={formData.IntegrationProcesses} />
           <TextField isLoading={isFetching} lable="Integration Tailoring Decisions" onChange={(e) => setFormData({...formData ,IntegrationTailoringDecisions : e.target.value })}  value={formData.IntegrationTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Scope Processes" onChange={(e) => setFormData({...formData ,ScopeProcesses : e.target.value })} value={formData.ScopeProcesses} />
           <TextField isLoading={isFetching} lable="Scope Tailoring Decisions" onChange={(e) => setFormData({...formData ,ScopeTailoringDecisions : e.target.value })}  value={formData.ScopeTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Time Processes" onChange={(e) => setFormData({...formData ,TimeProcesses : e.target.value })} value={formData.TimeProcesses} />
           <TextField isLoading={isFetching} lable="Time Tailoring Decisions" onChange={(e) => setFormData({...formData ,TimeTailoringDecisions : e.target.value })}  value={formData.TimeTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Cost Processes" onChange={(e) => setFormData({...formData ,CostProcesses : e.target.value })} value={formData.CostProcesses} />
           <TextField isLoading={isFetching} lable="Cost Tailoring Decisions" onChange={(e) => setFormData({...formData ,CostTailoringDecisions : e.target.value })}  value={formData.CostTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Quality Processes" onChange={(e) => setFormData({...formData ,QualityProcesses : e.target.value })} value={formData.QualityProcesses} />
           <TextField isLoading={isFetching} lable="Quality Tailoring Decisions" onChange={(e) => setFormData({...formData ,QualityTailoringDecisions : e.target.value })}  value={formData.QualityTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Human Resources Processes" onChange={(e) => setFormData({...formData ,HumanResourcesProcesses : e.target.value })} value={formData.HumanResourcesProcesses} />
           <TextField isLoading={isFetching} lable="Human Resources Tailoring Decisions" onChange={(e) => setFormData({...formData ,HumanResourcesTailoringDecisions : e.target.value })}  value={formData.HumanResourcesTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Communication Processes" onChange={(e) => setFormData({...formData ,CommunicationProcesses : e.target.value })} value={formData.CommunicationProcesses} />
           <TextField isLoading={isFetching} lable="Communication Tailoring Decisions" onChange={(e) => setFormData({...formData ,CommunicationTailoringDecisions : e.target.value })}  value={formData.CommunicationTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Risk Processes" onChange={(e) => setFormData({...formData ,RiskProcesses : e.target.value })} value={formData.RiskProcesses} />
           <TextField isLoading={isFetching} lable="Risk Tailoring Decisions" onChange={(e) => setFormData({...formData ,RiskTailoringDecisions : e.target.value })}  value={formData.RiskTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Procurement Processes" onChange={(e) => setFormData({...formData ,ProcurementProcesses : e.target.value })} value={formData.ProcurementProcesses} />
           <TextField isLoading={isFetching} lable="Procurement Tailoring Decisions" onChange={(e) => setFormData({...formData ,ProcurementTailoringDecisions : e.target.value })}  value={formData.ProcurementTailoringDecisions} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Stakeholders Processes" onChange={(e) => setFormData({...formData ,StakeholdersProcesses : e.target.value })} value={formData.StakeholdersProcesses} />
           <TextField isLoading={isFetching} lable="Stakeholders Tailoring Decisions" onChange={(e) => setFormData({...formData ,StakeholdersTailoringDecisions : e.target.value })}  value={formData.StakeholdersTailoringDecisions} />

           <RowGridText text="Process Tools and Techniques"/>
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Integration Tools and Techniques" onChange={(e) => setFormData({...formData ,IntegrationToolsandTechniques : e.target.value })} value={formData.IntegrationToolsandTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Scope Tools and Techniques" onChange={(e) => setFormData({...formData ,ScopeToolsAndTechniques : e.target.value })} value={formData.ScopeToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Time Tools and Techniques" onChange={(e) => setFormData({...formData ,TimeToolsAndTechniques : e.target.value })} value={formData.TimeToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Cost Tools and Techniques" onChange={(e) => setFormData({...formData ,CostToolsandTechniques : e.target.value })} value={formData.CostToolsandTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Quality Tools and Techniques" onChange={(e) => setFormData({...formData ,QualityToolsAndTechniques : e.target.value })} value={formData.QualityToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Human Resources Tools and Techniques" onChange={(e) => setFormData({...formData ,HumanResourcesToolsAndTechniques : e.target.value })} value={formData.HumanResourcesToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Communication Tools and Techniques" onChange={(e) => setFormData({...formData ,CommunicationToolsAndTechniques : e.target.value })} value={formData.CommunicationToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Risk Tools and Techniques" onChange={(e) => setFormData({...formData ,RiskToolsAndTechniques : e.target.value })} value={formData.RiskToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Procurement Tools and Techniques" onChange={(e) => setFormData({...formData ,ProcurementToolsAndTechniques : e.target.value })} value={formData.ProcurementToolsAndTechniques} />
           {/* this is a row */}
           <TextField isLoading={isFetching} lable="Stakeholders Tools and Techniques" onChange={(e) => setFormData({...formData ,StakeholdersToolsAndTechniques : e.target.value })} value={formData.StakeholdersToolsAndTechniques} />
           
           {/* get out of the sequance  */}
           <TextField isLoading={isFetching} lable="Project Reviews" className="!col-span-12" onChange={(e) => setFormData({...formData ,ProjectReviews : e.target.value })} value={formData.ProjectReviews} />
       </div>
    </div>
    <FormButton
    state ={didGetData}
    isLoading ={post.isLoading || update.isLoading}
    create={handleCreate}
    update={handleUpdate}

    />
       </Form>
  </FormContainer>
      </main>
    </>
  );
};

export default Page;