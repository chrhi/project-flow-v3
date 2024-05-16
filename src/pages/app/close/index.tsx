import { type NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Header } from "~/components/header/Header";
import { CloseSideBar } from "~/components/sideBars/CloseSideBar";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { RowGridText } from "~/components/typography/RowGridText";
import { TextField } from "~/components/used/TextField";
import { getProjectMetaData } from "~/lib/MetaData";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { FormButton } from "~/components/used/FormButton";

const Page: NextPage = () => {
  const [isOpen , setIsOpen] = useState<boolean>(true)
  const [formData , setFormData] = useState({
        id : "",
        ObjectDuProjet : "",
        CritereDeRealisationDeLaPorteeDuProjet:   "",
        ObjectifsDeLaPorteeOntEteAttents   : "",
        ObjectifsDeQualiteDuProjet   : "",
        CriteresDeRealisationDeLaQualite :  "",
        CommentLaQualiteAEteAtteinte :  "",
        ObjectifsDeTempsDuProjet :  "",
        CriteresDeRealisationDesDelais :  "",
        CommentLesObjectifsDeDelaisOntEteAtteints     :  "",
        ObjectifsDeCoutDuProjet :  "",
        CriteresDeRealisationDesCouts :  "",
        CommentLesObjectifsDeCoutsOntEteAtteints :  "",
  })
  const [didGetData , setDidGetData] = useState<boolean>(false)

  const {isLoading , refetch} = api.projectCloseOutRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
        ObjectDuProjet  : data?.ObjectDuProjet || "", 
        CritereDeRealisationDeLaPorteeDuProjet :  data?.CritereDeRealisationDeLaPorteeDuProjet || "",
        ObjectifsDeLaPorteeOntEteAttents :  data?.ObjectifsDeLaPorteeOntEteAttents|| "",
        ObjectifsDeQualiteDuProjet:  data?.ObjectifsDeQualiteDuProjet || "",
        CriteresDeRealisationDeLaQualite :  data?.CriteresDeRealisationDeLaQualite || "",
        CommentLaQualiteAEteAtteinte :  data?.CommentLaQualiteAEteAtteinte || "",
        ObjectifsDeTempsDuProjet :  data?.ObjectifsDeTempsDuProjet || "",
        CriteresDeRealisationDesDelais :  data?.CriteresDeRealisationDesDelais || "",
        CommentLesObjectifsDeDelaisOntEteAtteints     :  data?.CommentLesObjectifsDeDelaisOntEteAtteints || "",
        ObjectifsDeCoutDuProjet:  data?.ObjectifsDeCoutDuProjet || "",
        CriteresDeRealisationDesCouts :  data?.CriteresDeRealisationDesCouts || "",
        CommentLesObjectifsDeCoutsOntEteAtteints :  data?.CommentLesObjectifsDeCoutsOntEteAtteints || "",
      })
    
    },
    onError(err) {
      console.log(err)
      toast.error("something went wrong")
    },
  })
 const  post = api.projectCloseOutRouter.dataAdd.useMutation( {
    onSuccess : async (data) =>  {
      setFormData({
        id : data?.id || "",
       
        ObjectDuProjet  : data?.ObjectDuProjet || "", 
        CritereDeRealisationDeLaPorteeDuProjet :  data?.CritereDeRealisationDeLaPorteeDuProjet || "",
        ObjectifsDeLaPorteeOntEteAttents :  data?.ObjectifsDeLaPorteeOntEteAttents|| "",
        ObjectifsDeQualiteDuProjet:  data?.ObjectifsDeQualiteDuProjet || "",
        CriteresDeRealisationDeLaQualite :  data?.CriteresDeRealisationDeLaQualite || "",
        CommentLaQualiteAEteAtteinte :  data?.CommentLaQualiteAEteAtteinte || "",
        ObjectifsDeTempsDuProjet :  data?.ObjectifsDeTempsDuProjet || "",
        CriteresDeRealisationDesDelais :  data?.CriteresDeRealisationDesDelais || "",
        CommentLesObjectifsDeDelaisOntEteAtteints     :  data?.CommentLesObjectifsDeDelaisOntEteAtteints || "",
        ObjectifsDeCoutDuProjet:  data?.ObjectifsDeCoutDuProjet || "",
        CriteresDeRealisationDesCouts :  data?.CriteresDeRealisationDesCouts || "",
        CommentLesObjectifsDeCoutsOntEteAtteints :  data?.CommentLesObjectifsDeCoutsOntEteAtteints || "",
      })
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
    
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.projectCloseOutRouter.dataUpdate.useMutation( {
    onSuccess : async (data) =>  {
      setFormData({
        id : data?.id || "",
        ObjectDuProjet  : data?.ObjectDuProjet || "", 
        CritereDeRealisationDeLaPorteeDuProjet :  data?.CritereDeRealisationDeLaPorteeDuProjet || "",
        ObjectifsDeLaPorteeOntEteAttents :  data?.ObjectifsDeLaPorteeOntEteAttents|| "",
        ObjectifsDeQualiteDuProjet:  data?.ObjectifsDeQualiteDuProjet || "",
        CriteresDeRealisationDeLaQualite :  data?.CriteresDeRealisationDeLaQualite || "",
        CommentLaQualiteAEteAtteinte :  data?.CommentLaQualiteAEteAtteinte || "",
        ObjectifsDeTempsDuProjet :  data?.ObjectifsDeTempsDuProjet || "",
        CriteresDeRealisationDesDelais :  data?.CriteresDeRealisationDesDelais || "",
        CommentLesObjectifsDeDelaisOntEteAtteints     :  data?.CommentLesObjectifsDeDelaisOntEteAtteints || "",
        ObjectifsDeCoutDuProjet:  data?.ObjectifsDeCoutDuProjet || "",
        CriteresDeRealisationDesCouts :  data?.CriteresDeRealisationDesCouts || "",
        CommentLesObjectifsDeCoutsOntEteAtteints :  data?.CommentLesObjectifsDeCoutsOntEteAtteints || "",
      })
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
        ObjectDuProjet  : formData.ObjectDuProjet,
        CritereDeRealisationDeLaPorteeDuProjet : formData.CritereDeRealisationDeLaPorteeDuProjet,
        ObjectifsDeLaPorteeOntEteAttents : formData.ObjectifsDeLaPorteeOntEteAttents,
        ObjectifsDeQualiteDuProjet: formData.ObjectifsDeQualiteDuProjet,
        CriteresDeRealisationDeLaQualite : formData.CriteresDeRealisationDeLaQualite,
        CommentLaQualiteAEteAtteinte : formData.CommentLaQualiteAEteAtteinte,
        ObjectifsDeTempsDuProjet : formData.ObjectifsDeTempsDuProjet,
        CriteresDeRealisationDesDelais : formData.CriteresDeRealisationDesDelais,
        CommentLesObjectifsDeDelaisOntEteAtteints     : formData.CommentLesObjectifsDeDelaisOntEteAtteints,
        ObjectifsDeCoutDuProjet: formData.ObjectifsDeCoutDuProjet,
        CriteresDeRealisationDesCouts : formData.CriteresDeRealisationDesCouts,
        CommentLesObjectifsDeCoutsOntEteAtteints : formData.CommentLesObjectifsDeCoutsOntEteAtteints,
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
      event.preventDefault()
     
      update.mutate({
        id: formData.id,
        ObjectDuProjet  : formData.ObjectDuProjet,
        CritereDeRealisationDeLaPorteeDuProjet : formData.CritereDeRealisationDeLaPorteeDuProjet,
        ObjectifsDeLaPorteeOntEteAttents : formData.ObjectifsDeLaPorteeOntEteAttents,
        ObjectifsDeQualiteDuProjet: formData.ObjectifsDeQualiteDuProjet,
        CriteresDeRealisationDeLaQualite : formData.CriteresDeRealisationDeLaQualite,
        CommentLaQualiteAEteAtteinte : formData.CommentLaQualiteAEteAtteinte,
        ObjectifsDeTempsDuProjet : formData.ObjectifsDeTempsDuProjet,
        CriteresDeRealisationDesDelais : formData.CriteresDeRealisationDesDelais,
        CommentLesObjectifsDeDelaisOntEteAtteints     : formData.CommentLesObjectifsDeDelaisOntEteAtteints,
        ObjectifsDeCoutDuProjet: formData.ObjectifsDeCoutDuProjet,
        CriteresDeRealisationDesCouts : formData.CriteresDeRealisationDesCouts,
        CommentLesObjectifsDeCoutsOntEteAtteints : formData.CommentLesObjectifsDeCoutsOntEteAtteints,
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
       <CloseSideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
       <FormContainer className ={` ${isOpen ? "ml-[20rem]" : "ml-[5rem]"}`}>
     
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">
         
          
            <RowGridText text="Résumé des performances" />
            <RowGridText text="La clôture de projet est la phase finale où toutes les activités, les livrables et les objectifs sont terminés, et le projet est officiellement clôturé, visant à valider le succès du projet et faciliter la transition vers les opérations en cours ou les projets ultérieurs" small />

            {/* this is a row */}
            <TextField
                isLoading={false}
                lable=" Objectifs du projet (Portée)"
                onChange={(e) => setFormData({...formData , ObjectDuProjet : e.target.value})}
                value={formData.ObjectDuProjet}
            />
             <TextField
                isLoading={false}
                lable="Critères de réalisation de la portée du projet"
                onChange={(e) => setFormData({...formData , CritereDeRealisationDeLaPorteeDuProjet : e.target.value})}
                value={formData.CritereDeRealisationDeLaPorteeDuProjet}
            />
             <TextField
                isLoading={false}
                lable="Les objectifs de la portée ont été atteints."
                onChange={(e) => setFormData({...formData , ObjectifsDeLaPorteeOntEteAttents : e.target.value})}
                value={formData.ObjectifsDeLaPorteeOntEteAttents}
            />
            {/* this is another row  */}
            <TextField
                isLoading={false}
                lable="Objectifs de qualité du projet"
                onChange={(e) => setFormData({...formData , ObjectifsDeQualiteDuProjet : e.target.value})}
                value={formData.ObjectifsDeQualiteDuProjet}
            />
             <TextField
                isLoading={false}
                lable="Critères de réalisation de la qualité"
                onChange={(e) => setFormData({...formData , CriteresDeRealisationDeLaQualite : e.target.value})}
                value={formData.CriteresDeRealisationDeLaQualite}
            />
             <TextField
                isLoading={false}
                lable="Comment la qualité a été atteinte"
                onChange={(e) => setFormData({...formData , CommentLaQualiteAEteAtteinte : e.target.value})}
                value={formData.CommentLaQualiteAEteAtteinte}
            />
              {/* this is another row  */}
              <TextField
                isLoading={false}
                lable="Objectifs de temps du projet"
                onChange={(e) => setFormData({...formData , ObjectifsDeTempsDuProjet : e.target.value})}
                value={formData.ObjectifsDeTempsDuProjet}
            />
             <TextField
                isLoading={false}
                lable="Critères de réalisation des délais"
                onChange={(e) => setFormData({...formData , CriteresDeRealisationDesDelais : e.target.value})}
                value={formData.CriteresDeRealisationDesDelais}
            />
             <TextField
                isLoading={false}
                lable="Comment les objectifs de délais ont été atteints"
                onChange={(e) => setFormData({...formData , CommentLesObjectifsDeDelaisOntEteAtteints : e.target.value})}
                value={formData.CommentLesObjectifsDeDelaisOntEteAtteints}
            />
              {/* this is another row  */}
              <TextField
                isLoading={false}
                lable="Objectifs de coût du projet"
                onChange={(e) => setFormData({...formData , ObjectifsDeCoutDuProjet : e.target.value})}
                value={formData.ObjectifsDeCoutDuProjet}
            />
             <TextField
                isLoading={false}
                lable="Critères de réalisation des coûts"
                onChange={(e) => setFormData({...formData , CriteresDeRealisationDeLaQualite : e.target.value})}
                value={formData.CriteresDeRealisationDeLaQualite}
            />
             <TextField
                isLoading={false}
                lable="Comment les objectifs de coûts ont été atteints"
                onChange={(e) => setFormData({...formData , CommentLesObjectifsDeCoutsOntEteAtteints : e.target.value})}
                value={formData.CommentLesObjectifsDeCoutsOntEteAtteints}
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