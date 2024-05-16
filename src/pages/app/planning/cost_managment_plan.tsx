import { FormEvent, useRef  , useEffect, useState} from "react"
import { TextField } from "~/components/used/TextField";
import { Input } from "~/components/used/Input";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { FormHead } from "~/components/used/FormHead";
import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import { RowGridText } from "~/components/typography/RowGridText";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { getProjectMetaData } from "~/lib/MetaData";
import { FormButton } from "~/components/used/FormButton";


const Page: NextPage = () => {
  const [didGetData , setDidGetData] = useState<boolean>(false)
  const [isOpen , setIsOpen] = useState<boolean>(true)


  const [formData , setFormData] = useState({
    id : "",
    LevelOfAccuracy : "",
    UnitsOfMeasure : "",
    ControlThresholds :"",
    RulesForPerformanceMeasurement : "",
    CostReportingAndFormat :"",
    EstimatingCosts : "",
    DevelopingTheBudget : "",
    UpdatingMonitoringAndControlling : "",
  })


  const {isLoading  , refetch} = api.costPlanningRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
    retryOnMount : false ,
    onSuccess(data) {
      if(data?.id ){
        setDidGetData(true)
      }
      setFormData({
        id : data?.id || "",
        LevelOfAccuracy : data?.LevelOfAccuracy  || "", 
        UnitsOfMeasure : data?.UnitsOfMeasure  || "", 
        ControlThresholds : data?.ControlThresholds || "" , 
        RulesForPerformanceMeasurement : data?.RulesForPerformanceMeasurement || "" , 
        CostReportingAndFormat : data?.CostReportingAndFormat || "",
        EstimatingCosts :data?.EstimatingCosts || "",
        DevelopingTheBudget : data?.DevelopingTheBudget || "",
        UpdatingMonitoringAndControlling : data?.UpdatingMonitoringAndControlling || "",
      })
    },
    onError(err) {
      console.log(err)
      toast.error("something went wrong")
    },
  })
 const  post = api.costPlanningRouter.dataAdd.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
      console.log(err)
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.costPlanningRouter.dataUpdate.useMutation( {
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
        LevelOfAccuracy : formData?.LevelOfAccuracy  || "", 
        UnitsOfMeasure : formData?.UnitsOfMeasure  || "", 
        ControlThresholds : formData?.ControlThresholds || "" , 
        RulesForPerformanceMeasurement : formData?.RulesForPerformanceMeasurement || "" , 
        CostReportingAndFormat : formData?.CostReportingAndFormat || "",
        EstimatingCosts :formData?.EstimatingCosts || "",
        DevelopingTheBudget : formData?.DevelopingTheBudget || "",
        UpdatingMonitoringAndControlling : formData?.UpdatingMonitoringAndControlling || "",
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
     
      update.mutate({
        id : formData.id ,
        LevelOfAccuracy : formData?.LevelOfAccuracy  || "", 
        UnitsOfMeasure : formData?.UnitsOfMeasure  || "", 
        ControlThresholds : formData?.ControlThresholds || "" , 
        RulesForPerformanceMeasurement : formData?.RulesForPerformanceMeasurement || "" , 
        CostReportingAndFormat : formData?.CostReportingAndFormat || "",
        EstimatingCosts :formData?.EstimatingCosts || "",
        DevelopingTheBudget : formData?.DevelopingTheBudget || "",
        UpdatingMonitoringAndControlling : formData?.UpdatingMonitoringAndControlling || "",
      })
    }
    
  return (
    <>
    
      <Header />
      <main className=" custopn-page-height  flex w-full bg-gray-50 ">
      <PlanningSideBar setIsOpen ={setIsOpen} isOpen = {isOpen} />
       <FormContainer className ={` ${isOpen ? "ml-[20rem]" : "ml-[5rem]"}`}>
     
      <Form >
      <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">

          <RowGridText text="Plan de gestion des coûts" />
          <RowGridText small text="Élaborer un plan complet de gestion des coûts qui comprend une estimation précise des coûts du projet, l'établissement d'un budget, le suivi et le contrôle des dépenses, le suivi des écarts et la mise en œuvre de mesures rentables pour s'assurer que le projet est achevé dans le budget alloué" />
         

          <TextField 
          isLoading={isLoading}
          lable=" Level of Accuracy"
          onChange={(e) => setFormData({...formData , LevelOfAccuracy : e.target.value})} 
          value={formData.LevelOfAccuracy}
          />
          <TextField 
          isLoading={isLoading}
          lable="Units of Measure"
          onChange={(e) => setFormData({...formData , UnitsOfMeasure : e.target.value})} 
          value={formData.UnitsOfMeasure}
          />
          <TextField 
          isLoading={isLoading}
          lable=" Control Thresholds"
          onChange={(e) => setFormData({...formData , ControlThresholds : e.target.value})} 
          value={formData.ControlThresholds}
          />
          <TextField 
          isLoading={isLoading}
          lable=" Rules for Performance Measurement"
          onChange={(e) => setFormData({...formData , RulesForPerformanceMeasurement : e.target.value})} 
          value={formData.RulesForPerformanceMeasurement}
          />

          <TextField 
          isLoading={isLoading}
          lable=" Cost Reporting and Format"
          onChange={(e) => setFormData({...formData , CostReportingAndFormat : e.target.value})} 
          value={formData.CostReportingAndFormat}
          />

          <TextField 
          isLoading={isLoading}
          lable=" Estimating costs"
          onChange={(e) => setFormData({...formData , EstimatingCosts : e.target.value})} 
          value={formData.EstimatingCosts}
          />

        <TextField 
          isLoading={isLoading}
          lable=" Developing the budget"
          onChange={(e) => setFormData({...formData , DevelopingTheBudget : e.target.value})} 
          value={formData.DevelopingTheBudget}
          />
          <TextField 
          isLoading={isLoading}
          lable=" Updating, monitoring and controlling"
          onChange={(e) => setFormData({...formData , UpdatingMonitoringAndControlling : e.target.value})} 
          value={formData.UpdatingMonitoringAndControlling}
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