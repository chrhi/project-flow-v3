import { type FormEvent, useState} from "react"
import { TextField } from "~/components/used/TextField";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { FormButton } from "~/components/used/FormButton";
import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { PlanningSideBar } from "~/components/sideBars/PlanningSideBar";
import { RowGridText } from "~/components/typography/RowGridText";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { getProjectMetaData } from "~/lib/MetaData";



const Page: NextPage = () => {
  const [isOpen , setIsOpen] = useState<boolean>(true)

  const [formData , setFormData] = useState({
    id : "",
    WBSStructure :"",
    ScopeStatementDevelopment :"",
    WBSDictionary : "",
    ScopeBaselineMaintenance : "",
    ScopeChange : "",
    DeliverableAcceptance : "",
    ScopeandRequirementsIntegration : ""
  })
  const [didGetData , setDidGetData] = useState<boolean>(false)

  const {isLoading : isFetching , refetch} = api.scopePlanningRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
        WBSStructure : data?.WBSStructure  || "", 
        ScopeStatementDevelopment : data?.ScopeStatementDevelopment  || "", 
        WBSDictionary : data?.WBSDictionary || "" , 
        ScopeBaselineMaintenance : data?.ScopeBaselineMaintenance || "" , 
        ScopeChange : data?.ScopeChange || "",
        DeliverableAcceptance :data?.DeliverableAcceptance || "",
        ScopeandRequirementsIntegration : data?.DeliverableAcceptance || ""
      })
    },
    onError(err) {
      console.log(err)
      toast.error("something went wrong")
    },
  })
 const  post = api.scopePlanningRouter.dataAdd.useMutation( {
    onSuccess : async () =>  {
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
      console.log(err)
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.scopePlanningRouter.dataUpdate.useMutation( {
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
      if(!formData.id || !formData.WBSStructure || !formData.ScopeStatementDevelopment || !formData.WBSDictionary || !formData.ScopeBaselineMaintenance || !formData.ScopeChange || !formData.DeliverableAcceptance ){
        toast("certains champs sont videssome fields are empty ")
      }
      post.mutate({
        projectId : getProjectMetaData() ,
        WBSStructure : formData.WBSStructure,
        ScopeStatementDevelopment : formData.ScopeStatementDevelopment , 
        WBSDictionary : formData.WBSDictionary , 
        ScopeBaselineMaintenance : formData.ScopeBaselineMaintenance,
        ScopeChange : formData.ScopeChange , 
        DeliverableAcceptance : formData.DeliverableAcceptance,
        ScopeandRequirementsIntegration : formData.ScopeandRequirementsIntegration 
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
      event.preventDefault()
      if(!formData.id || !formData.WBSStructure || !formData.ScopeStatementDevelopment || !formData.WBSDictionary || !formData.ScopeBaselineMaintenance || !formData.ScopeChange || !formData.DeliverableAcceptance ){
        toast("certains champs sont videssome fields are empty ")
      }
      update.mutate({
        id : formData.id ,
    
        WBSStructure : formData.WBSStructure,
        ScopeStatementDevelopment : formData.ScopeStatementDevelopment , 
        WBSDictionary : formData.WBSDictionary , 
        ScopeBaselineMaintenance : formData.ScopeBaselineMaintenance,
        ScopeChange : formData.ScopeChange , 
        DeliverableAcceptance : formData.DeliverableAcceptance,
        ScopeandRequirementsIntegration : formData.ScopeandRequirementsIntegration 
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
          <RowGridText text="Énoncé de la portée du projet " />
          <RowGridText small text="Gérer efficacement la portée du projet en définissant clairement les limites, les livrables et les exigences du projet, et en veillant à ce que toute modification de la portée soit correctement documentée, évaluée et contrôlée pour éviter une dérive de la portée et maintenir l'alignement du projet sur les objectifs" />
         
          <TextField 
           isLoading={isFetching }
          lable=" Scope Statement Development"
          onChange={({target}) => setFormData({...formData , ScopeStatementDevelopment : target.value})} 
          value={formData.ScopeStatementDevelopment}
          />
          <TextField 
          isLoading={isFetching }
          lable=" WBS Structure"
          onChange={({target}) => setFormData({...formData , WBSStructure : target.value})} 
          value={formData.WBSStructure}
          />
          <TextField 
         isLoading={isFetching }
          lable=" WBS Dictionary"
          onChange={({target}) => setFormData({...formData , WBSDictionary : target.value})} 
          value={formData.WBSDictionary}
          />
          <TextField 
          isLoading={isFetching }
          lable=" Scope Baseline Maintenance"
          onChange={({target}) => setFormData({...formData , ScopeBaselineMaintenance : target.value})} 
          value={formData.ScopeBaselineMaintenance}
          />

          <TextField 
               isLoading={isFetching }
          lable=" Scope Change"
          onChange={({target}) => setFormData({...formData , ScopeChange : target.value})} 
          value={formData.ScopeChange}
          />

          <TextField 
               isLoading={isFetching }
          lable=" Deliverable Acceptance"
          onChange={({target}) => setFormData({...formData , DeliverableAcceptance : target.value})} 
          value={formData.DeliverableAcceptance}
          />

        <TextField 
          isLoading={isFetching }
          lable=" Scope and Requirements Integration"
          onChange={({target}) => setFormData({...formData , ScopeandRequirementsIntegration : target.value})} 
          value={formData.ScopeandRequirementsIntegration}
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