/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-unescaped-entities */
import { FormEvent, useState} from "react"
import { TextField } from "~/components/used/TextField";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { FormHead } from "~/components/used/FormHead";
import { AbdullahTable } from "~/components/used/AbdullahTable";
import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import { RowGridText } from "~/components/typography/RowGridText";
import { getProjectMetaData } from "~/lib/MetaData";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { FormButton } from "~/components/used/FormButton";



const Page: NextPage = () => {
  const [didGetData , setDidGetData] = useState<boolean>(false)
  const [isOpen , setIsOpen] = useState<boolean>(true)


  const [formData , setFormData] = useState({
    id : "",
    Methodology : "",
    RolesAndResponsibilities : "",
    RiskCategories : "",
    RiskManagementFunding : "",
    ContingencyProtocols : "",
    FrequencyAndTiming :"",
    StakeholderRiskTolerances : "",
    TrackingAndAudit : "",
  })


  const {isLoading  , refetch} = api.riskPlanningRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
        Methodology : data?.Methodology  || "", 
        RolesAndResponsibilities : data?.RolesAndResponsibilities  || "", 
        RiskManagementFunding : data?.RiskManagementFunding || "" , 
        RiskCategories : data?.RiskCategories || "" , 
        ContingencyProtocols : data?.ContingencyProtocols || "",
        FrequencyAndTiming :data?.FrequencyAndTiming || "",
        StakeholderRiskTolerances : data?.StakeholderRiskTolerances || "",
        TrackingAndAudit : data?.TrackingAndAudit || "",
      })
    },
    onError(err) {
      toast.error("something went wrong")
    },
  })
 const  post = api.riskPlanningRouter.dataAdd.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
     
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.riskPlanningRouter.dataUpdate.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
      
      toast.error("quelque chose s'est mal passé")
    },
  })

    const handleCreate = (event : FormEvent) => {
      //todo handle this later
      event.preventDefault()
    
      post.mutate({
        projectId : getProjectMetaData() ,
        Methodology : formData?.Methodology  || "", 
        RolesAndResponsibilities : formData?.RolesAndResponsibilities  || "", 
        RiskManagementFunding : formData?.RiskManagementFunding || "" , 
        RiskCategories : formData?.RiskCategories || "" , 
        ContingencyProtocols : formData?.ContingencyProtocols || "",
        FrequencyAndTiming :formData?.FrequencyAndTiming || "",
        StakeholderRiskTolerances : formData?.StakeholderRiskTolerances || "",
        TrackingAndAudit : formData?.TrackingAndAudit || "",
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
     
      update.mutate({
        id : formData.id ,
        Methodology : formData?.Methodology  || "", 
        RolesAndResponsibilities : formData?.RolesAndResponsibilities  || "", 
        RiskManagementFunding : formData?.RiskManagementFunding || "" , 
        RiskCategories : formData?.RiskCategories || "" , 
        ContingencyProtocols : formData?.ContingencyProtocols || "",
        FrequencyAndTiming :formData?.FrequencyAndTiming || "",
        StakeholderRiskTolerances : formData?.StakeholderRiskTolerances || "",
        TrackingAndAudit : formData?.TrackingAndAudit || "",
      })
    }
  return (
    <>
    
      <Header />
      <main className=" custopn-page-height  flex w-full bg-gray-50 ">
      <PlanningSideBar setIsOpen ={setIsOpen} isOpen = {isOpen} />
       <FormContainer className ={` ${isOpen ? "ml-[20rem]" : "ml-[0]"}`}>
    
      <Form >
      <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">
         <RowGridText text="Plan de gestion des risques " />
         <RowGridText small text="Créer un plan de gestion des risques solide qui englobe l'identification, l'évaluation, la hiérarchisation, l'atténuation et la surveillance des risques du projet, en fournissant une approche structurée pour traiter et minimiser de manière proactive les menaces potentielles et capitaliser sur les opportunités pour assurer le succès du projet" />
         
          <TextField 
          lable="Methodology"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />
          <TextField 
          lable="Roles and Responsibilities"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />
          <TextField 
          lable="Risk Categories"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />
          <TextField 
          lable="Risk Management Funding"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />

          <TextField 
          lable="Contingency Protocols"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />

          <TextField 
          lable="Frequency and Timing"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />

        <TextField 
          lable="Stakeholder Risk Tolerances"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />

        <TextField 
          lable="Tracking and Audit"
          onChange={(e) => setFormData({...formData , Methodology : e.target.value})} 
          value={formData.Methodology}
          />

        <FormButton
                         isLoading={update.isLoading || post.isLoading}
                         state={didGetData}
                         create={handleCreate}
                         update={handleUpdate}
        />     
        </div>
      </div>
      
       </Form>
  </FormContainer>
      </main>
    </>
  );
};

export default Page;