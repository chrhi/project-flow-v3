import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import {FormEvent, useState} from 'react'
import { FormContainer } from "~/components/used/FormContainer"; 
import { Form } from "~/components/used/Form";
import { TextField } from "~/components/used/TextField";
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
          ScheduleMethodology : "",
          ScheduleTools : "",
          LevelOfAccuracy : "",
          UnitsOfMeasure : "",
          VarianceThresholds : "",
          ScheduleReportingAndFormat : "",
          ProcessManagementActivitySequencing : "",
          ProcessManagementEstimatingResources : "",
          ProcessManagementEstimatingEffortAndDuration : "",
          ProcessManagementUpdatingMonitoringAndControlling : "",
          ProcessManagementActivityidentification : "",
        })
      
      
        const {isLoading  , refetch} = api.scheduelPlanningRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
              LevelOfAccuracy : data?.LevelOfAccuracy  || "", 
              UnitsOfMeasure : data?.UnitsOfMeasure  || "", 
              ScheduleMethodology : data?.ScheduleMethodology || "" , 
              ScheduleTools : data?.ScheduleTools || "" , 
              VarianceThresholds : data?.VarianceThresholds || "",
              ScheduleReportingAndFormat :data?.ScheduleReportingAndFormat || "",
              ProcessManagementActivitySequencing : data?.ProcessManagementActivitySequencing || "",
              ProcessManagementEstimatingResources : data?.ProcessManagementEstimatingResources || "",
              ProcessManagementEstimatingEffortAndDuration : data?.ProcessManagementEstimatingEffortAndDuration || "",
              ProcessManagementUpdatingMonitoringAndControlling : data?.ProcessManagementUpdatingMonitoringAndControlling || "",
              ProcessManagementActivityidentification : data?.ProcessManagementActivityidentification || ""
            })
          },
          onError(err) {
            console.log(err)
            toast.error("something went wrong")
          },
        })
       const  post = api.scheduelPlanningRouter.dataAdd.useMutation( {
          onSuccess : async () =>  {
            toast.success("mise à jour réussie")
            await refetch()
          },
          onError(err) {
            console.log(err)
            toast.error("quelque chose s'est mal passé")
          },
        })
        const  update = api.scheduelPlanningRouter.dataUpdate.useMutation( {
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
              ScheduleMethodology : formData?.ScheduleMethodology || "" , 
              ScheduleTools : formData?.ScheduleTools || "" , 
              VarianceThresholds : formData?.VarianceThresholds || "",
              ScheduleReportingAndFormat :formData?.ScheduleReportingAndFormat || "",
              ProcessManagementActivitySequencing : formData?.ProcessManagementActivitySequencing || "",
              ProcessManagementEstimatingResources : formData?.ProcessManagementEstimatingResources || "",
              ProcessManagementEstimatingEffortAndDuration : formData?.ProcessManagementEstimatingEffortAndDuration || "",
              ProcessManagementUpdatingMonitoringAndControlling : formData?.ProcessManagementUpdatingMonitoringAndControlling || "",
              ProcessManagementActivityidentification : formData?.ProcessManagementActivityidentification || ""
            })
          }
          const handleUpdate = (event : FormEvent) => {
            //todo handle later
           
            update.mutate({
              id : formData.id ,
              LevelOfAccuracy : formData?.LevelOfAccuracy  || "", 
              UnitsOfMeasure : formData?.UnitsOfMeasure  || "", 
              ScheduleMethodology : formData?.ScheduleMethodology || "" , 
              ScheduleTools : formData?.ScheduleTools || "" , 
              VarianceThresholds : formData?.VarianceThresholds || "",
              ScheduleReportingAndFormat :formData?.ScheduleReportingAndFormat || "",
              ProcessManagementActivitySequencing : formData?.ProcessManagementActivitySequencing || "",
              ProcessManagementEstimatingResources : formData?.ProcessManagementEstimatingResources || "",
              ProcessManagementEstimatingEffortAndDuration : formData?.ProcessManagementEstimatingEffortAndDuration || "",
              ProcessManagementUpdatingMonitoringAndControlling : formData?.ProcessManagementUpdatingMonitoringAndControlling || "",
              ProcessManagementActivityidentification : formData?.ProcessManagementActivityidentification || ""
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
            <RowGridText text="Plan de gestion du calendrier du projet" />
              <RowGridText small text=" Créer un plan détaillé de gestion du calendrier du projet qui comprend les activités, les dépendances, les jalons et l'allocation des ressources, afin de planifier, d'exécuter, de surveiller et de contrôler efficacement le calendrier du projet, en garantissant l'achèvement des tâches dans les délais et la réussite de la livraison du projet" />
         
              <TextField
                      lable="Schedule Methodology"
                      onChange={(e ) => setFormData({...formData , ScheduleMethodology : e.target.value})} 
                      value={formData.ScheduleMethodology}
              />
              <TextField
                      lable="Schedule Tools"
                      onChange={(e ) => setFormData({...formData , ScheduleTools : e.target.value})} 
                      value={formData.ScheduleTools}
              />
              <TextField
                      lable="Level of Accuracy"
                      onChange={(e ) => setFormData({...formData , LevelOfAccuracy : e.target.value})} 
                      value={formData.LevelOfAccuracy}
              />
                <TextField
                      lable="Units of Measure"
                      onChange={(e ) => setFormData({...formData , UnitsOfMeasure : e.target.value})} 
                      value={formData.UnitsOfMeasure}
              />
              <TextField
                      lable="Variance Thresholds"
                      onChange={(e ) => setFormData({...formData , VarianceThresholds : e.target.value})} 
                      value={formData.VarianceThresholds}
              />
                <TextField
                      lable="Schedule Reporting and Format"
                      onChange={(e ) => setFormData({...formData , ScheduleReportingAndFormat : e.target.value})} 
                      value={formData.ScheduleReportingAndFormat}
              />

              {/* this is another section */}
              <TextField
                      lable="Process Management Activity identification "
                      onChange={(e ) => setFormData({...formData , ProcessManagementActivityidentification : e.target.value})} 
                      value={formData.ProcessManagementActivityidentification}
              />
              <TextField
                      lable="Process Management Activity sequencing "
                      onChange={(e ) => setFormData({...formData , ProcessManagementActivitySequencing : e.target.value})} 
                      value={formData.ProcessManagementActivitySequencing}
              />
                <TextField
                      lable="Process Management Estimating resources "
                      onChange={(e ) => setFormData({...formData , ProcessManagementEstimatingResources : e.target.value})} 
                      value={formData.ProcessManagementEstimatingResources}
              />
              <TextField
                      lable="Process Management Estimating effort and duration "
                      onChange={(e ) => setFormData({...formData , ProcessManagementEstimatingResources : e.target.value})} 
                      value={formData.ProcessManagementEstimatingResources}
              />
                <TextField
                      lable="Process Management Updating, monitoring, and controlling "
                      onChange={(e ) => setFormData({...formData , ProcessManagementUpdatingMonitoringAndControlling : e.target.value})} 
                      value={formData.ProcessManagementUpdatingMonitoringAndControlling}
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