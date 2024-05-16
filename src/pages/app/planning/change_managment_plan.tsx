import {  FormEvent, useState} from "react"
import { TextField } from "~/components/used/TextField";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { AbdullahTable } from "~/components/used/AbdullahTable";
import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import { RowGridText } from "~/components/typography/RowGridText";
import { api } from "~/utils/api";
import  toast  from "react-hot-toast";
import { getProjectMetaData } from "~/lib/MetaData";
import { FormButton } from "~/components/used/FormButton";


const Page: NextPage = () => {
  const [isOpen , setIsOpen] = useState<boolean>(true)

  const [formData , setFormData] = useState({
    id : "",
    ChangeManagementApproach : "",
    ScheduleChange :  "",
    BudgetChange :"",
    ScopeChange : "",
    ProjectDocumentChanges :"",
    ChangeRequestSubmittal : "",
    ChangeRequestTracking : "",
    ChangeRequestReview :"",
    ChangeRequestDisposition : "",
  })
  const [didGetData , setDidGetData] = useState<boolean>(false)

  const {isLoading : isFetching , refetch} = api.changePlanningRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
        ChangeManagementApproach : data?.ChangeManagementApproach || "",
        ScheduleChange : data?.ScheduleChange || "",
        BudgetChange : data?.BudgetChange || "",
        ScopeChange : data?.ScopeChange || "",
        ProjectDocumentChanges : data?.ProjectDocumentChanges || "",
        ChangeRequestSubmittal : data?.ChangeRequestSubmittal || "",
        ChangeRequestTracking : data?.ChangeRequestTracking || "",
        ChangeRequestReview : data?.ChangeRequestReview || "",
        ChangeRequestDisposition : data?.ChangeRequestDisposition || "",
      })
    },
    onError(err) {
      console.log(err)
      toast.error("something went wrong")
    },
  })
 const  post = api.changePlanningRouter.dataAdd.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
      console.log(err)
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.changePlanningRouter.dataUpdate.useMutation( {
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
      if(!formData.id || !formData.ChangeManagementApproach || !formData.ScheduleChange || !formData.BudgetChange || !formData.ScopeChange || !formData.ProjectDocumentChanges || !formData.ChangeRequestSubmittal ){
        toast("certains champs sont videssome fields are empty ")
      }
      post.mutate({
        projectId : getProjectMetaData() ,
        ChangeManagementApproach : formData.ChangeManagementApproach ,
        ScheduleChange : formData.ScheduleChange,
        BudgetChange : formData.BudgetChange ,
        ScopeChange : formData.ScopeChange ,
        ProjectDocumentChanges : formData.ProjectDocumentChanges ,
        ChangeRequestSubmittal : formData.ChangeRequestSubmittal ,
        ChangeRequestTracking : formData.ChangeRequestTracking ,
        ChangeRequestReview : formData.ChangeRequestReview ,
        ChangeRequestDisposition : formData.ChangeRequestDisposition ,
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
      event.preventDefault()
      if(!formData.id || !formData.ChangeManagementApproach || !formData.ScheduleChange || !formData.BudgetChange || !formData.ScopeChange || !formData.ProjectDocumentChanges || !formData.ChangeRequestSubmittal ){
        toast("certains champs sont videssome fields are empty ")
      }
      update.mutate({
        id : formData.id ,
        ChangeManagementApproach : formData.ChangeManagementApproach ,
        ScheduleChange : formData.ScheduleChange,
        BudgetChange : formData.BudgetChange ,
        ScopeChange : formData.ScopeChange ,
        ProjectDocumentChanges : formData.ProjectDocumentChanges ,
        ChangeRequestSubmittal : formData.ChangeRequestSubmittal ,
        ChangeRequestTracking : formData.ChangeRequestTracking ,
        ChangeRequestReview : formData.ChangeRequestReview ,
        ChangeRequestDisposition : formData.ChangeRequestDisposition , 
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

      <RowGridText text="Plan de gestion du changement" />
          <RowGridText small text=" Le plan de gestion des changements est un document qui établit une approche structurée pour gérer les modifications au sein d'un projet, comprenant des procédures de contrôle des changements, des critères d'évaluation, un comité de revue des changements et un processus de mise en œuvret. Deserunt ex ad dicta animi soluta deleniti a distinctio quo. Non tempore numquam odio sequi iste adipisci laudantium aperiam, eius quas quidem." />
         
        
          <TextField 
          className="!col-span-12"
          isLoading={isFetching}
          lable=" Change Management Approach:"
          onChange={(e) =>setFormData({...formData , ChangeManagementApproach : e.target.value})} 
          value={formData.ChangeManagementApproach }
          />
           <RowGridText text="Definitions of Change" />
         
          <TextField 

          isLoading={isFetching}
          lable="Schedule change:"
           onChange={(e) =>setFormData({...formData , ScheduleChange : e.target.value})} 
          value={formData.ScheduleChange }
          />
          <TextField 
          isLoading={isFetching}
          lable=" Budget change"
          onChange={(e) =>setFormData({...formData , BudgetChange : e.target.value})} 
          value={formData.BudgetChange}
          />
          <TextField 
          isLoading={isFetching}
          lable=" Scope change"
          onChange={(e) =>setFormData({...formData , ScopeChange : e.target.value})} 
          value={formData.ScopeChange}
          />

          <TextField 
          isLoading={isFetching}
          lable="Project document changes"
          onChange={(e) =>setFormData({...formData , ProjectDocumentChanges : e.target.value})} 
          value={formData.ProjectDocumentChanges}
          />
          <RowGridText text="Change Control Process" />
          <TextField 
          isLoading={isFetching}
          lable="Change request submittal "
          onChange={(e) =>setFormData({...formData , ChangeRequestSubmittal : e.target.value})}  
          value={formData.ChangeRequestSubmittal}
          />

        <TextField 
        isLoading={isFetching}
          lable="Change request tracking"
          onChange={(e) =>setFormData({...formData , ChangeRequestTracking : e.target.value})} 
          value={formData.ChangeRequestTracking }
          />
          <TextField 
          isLoading={isFetching}
          lable="Change request review"
          onChange={(e) =>setFormData({...formData , ChangeRequestReview : e.target.value})} 
          value={formData.ChangeRequestReview }
          />
             <TextField
             isLoading={isFetching} 
          lable="Change request disposition"
          onChange={(e) =>setFormData({...formData , ChangeRequestDisposition : e.target.value})} 
          value={formData.ChangeRequestDisposition}
          />
           <FormButton
                state ={didGetData}
                isLoading ={post.isLoading || update.isLoading}
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