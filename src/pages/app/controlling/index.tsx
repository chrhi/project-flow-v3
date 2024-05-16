import { type NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Header } from "~/components/header/Header";
import { ControllingSidebar } from "~/components/sideBars/ControllingSidebar";
import { RowGridText } from "~/components/typography/RowGridText";
import { AbdullahTable,type ItemTable } from "~/components/used/AbdullahTable";
import { Form } from "~/components/used/Form";
import { FormButton } from "~/components/used/FormButton";
import { FormContainer } from "~/components/used/FormContainer";
import { Input } from "~/components/used/Input";
import { TextField } from "~/components/used/TextField";
import { getProjectMetaData } from "~/lib/MetaData";
import { api } from "~/utils/api";


const Page: NextPage = () => {
  const [isOpen , setIsOpen] = useState<boolean>(true)
  const [formData , setFormData] = useState({
    id : "",
    ActivitesPrevuesPourCettePeriodeDeRapport  : "",
    ActivitesRealiseesAuCoursDeCettePeriodeDeRapport : "",
    ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : "",
    LaCauseProfondeDesEcarts: "",
    FondsDepensesAuCoursDeCettePeriodeDeRapport : "",
    FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : "",
    CauseFondamentaleDesEcarts : "",
    EcartsDeQualiteIdentifiesPendantCettePeriode : "",
    ActionCorrectiveOuPreventivePlanifiee     : "",
    ActivitesPrevuesPourLaProchainePeriodeDeRapport: "",
    CoutsPrevusPourLaProchainePeriodeDeRapport : "",
    RisquesNouvellementIdentifies : "",
    ProblrmesIdentifies: "",
    Commentaires : "",
  })
  const [didGetData , setDidGetData] = useState<boolean>(false)

  const {isLoading , refetch} = api.changeLogRouter.dataGet.useQuery({projectId : getProjectMetaData()}, {
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
        ActivitesPrevuesPourCettePeriodeDeRapport  : data?.ActivitesPrevuesPourCettePeriodeDeRapport || "", 
        ActivitesRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport || "",
        ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport|| "",
        LaCauseProfondeDesEcarts:  data?.LaCauseProfondeDesEcarts || "",
        FondsDepensesAuCoursDeCettePeriodeDeRapport :  data?.FondsDepensesAuCoursDeCettePeriodeDeRapport || "",
        FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport :  data?.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport || "",
        CauseFondamentaleDesEcarts :  data?.CauseFondamentaleDesEcarts || "",
        EcartsDeQualiteIdentifiesPendantCettePeriode :  data?.EcartsDeQualiteIdentifiesPendantCettePeriode || "",
        ActionCorrectiveOuPreventivePlanifiee     :  data?.ActionCorrectiveOuPreventivePlanifiee || "",
        ActivitesPrevuesPourLaProchainePeriodeDeRapport:  data?.ActivitesPrevuesPourLaProchainePeriodeDeRapport || "",
        CoutsPrevusPourLaProchainePeriodeDeRapport :  data?.CoutsPrevusPourLaProchainePeriodeDeRapport || "",
        RisquesNouvellementIdentifies :  data?.RisquesNouvellementIdentifies || "",
        ProblrmesIdentifies:  data?.ProblrmesIdentifies || "",
        Commentaires :  data?.Commentaires || ""
      })
    
    },
    onError(err) {
      console.log(err)
      toast.error("something went wrong")
    },
  })
 const  post = api.changeLogRouter.dataAdd.useMutation( {
    onSuccess : async (data) =>  {
      setFormData({
        id : data?.id || "",
        ActivitesPrevuesPourCettePeriodeDeRapport  : data?.ActivitesPrevuesPourCettePeriodeDeRapport || "", 
        ActivitesRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport || "",
        ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport|| "",
        LaCauseProfondeDesEcarts:  data?.LaCauseProfondeDesEcarts || "",
        FondsDepensesAuCoursDeCettePeriodeDeRapport :  data?.FondsDepensesAuCoursDeCettePeriodeDeRapport || "",
        FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport :  data?.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport || "",
        CauseFondamentaleDesEcarts :  data?.CauseFondamentaleDesEcarts || "",
        EcartsDeQualiteIdentifiesPendantCettePeriode :  data?.EcartsDeQualiteIdentifiesPendantCettePeriode || "",
        ActionCorrectiveOuPreventivePlanifiee     :  data?.ActionCorrectiveOuPreventivePlanifiee || "",
        ActivitesPrevuesPourLaProchainePeriodeDeRapport:  data?.ActivitesPrevuesPourLaProchainePeriodeDeRapport || "",
        CoutsPrevusPourLaProchainePeriodeDeRapport :  data?.CoutsPrevusPourLaProchainePeriodeDeRapport || "",
        RisquesNouvellementIdentifies :  data?.RisquesNouvellementIdentifies || "",
        ProblrmesIdentifies:  data?.ProblrmesIdentifies || "",
        Commentaires :  data?.Commentaires || ""
      })
      toast.success("mise à jour réussie")
      await refetch()
    },
    onError(err) {
    
      toast.error("quelque chose s'est mal passé")
    },
  })
  const  update = api.changeLogRouter.dataUpdate.useMutation( {
    onSuccess : async (data) =>  {
      setFormData({
        id : data?.id || "",
        ActivitesPrevuesPourCettePeriodeDeRapport  : data?.ActivitesPrevuesPourCettePeriodeDeRapport || "", 
        ActivitesRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport || "",
        ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport :  data?.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport|| "",
        LaCauseProfondeDesEcarts:  data?.LaCauseProfondeDesEcarts || "",
        FondsDepensesAuCoursDeCettePeriodeDeRapport :  data?.FondsDepensesAuCoursDeCettePeriodeDeRapport || "",
        FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport :  data?.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport || "",
        CauseFondamentaleDesEcarts :  data?.CauseFondamentaleDesEcarts || "",
        EcartsDeQualiteIdentifiesPendantCettePeriode :  data?.EcartsDeQualiteIdentifiesPendantCettePeriode || "",
        ActionCorrectiveOuPreventivePlanifiee     :  data?.ActionCorrectiveOuPreventivePlanifiee || "",
        ActivitesPrevuesPourLaProchainePeriodeDeRapport:  data?.ActivitesPrevuesPourLaProchainePeriodeDeRapport || "",
        CoutsPrevusPourLaProchainePeriodeDeRapport :  data?.CoutsPrevusPourLaProchainePeriodeDeRapport || "",
        RisquesNouvellementIdentifies :  data?.RisquesNouvellementIdentifies || "",
        ProblrmesIdentifies:  data?.ProblrmesIdentifies || "",
        Commentaires :  data?.Commentaires || ""
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
      if(!formData.id || !formData.ActivitesPrevuesPourCettePeriodeDeRapport || !formData.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport || !formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport || !formData.FondsDepensesAuCoursDeCettePeriodeDeRapport || !formData.EcartsDeQualiteIdentifiesPendantCettePeriode || !formData.Commentaires ){
        toast("certains champs sont videssome fields are empty ")
      }
      post.mutate({
        projectId : getProjectMetaData() ,
         ActivitesPrevuesPourCettePeriodeDeRapport  : formData.ActivitesPrevuesPourCettePeriodeDeRapport,
         ActivitesRealiseesAuCoursDeCettePeriodeDeRapport : formData.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport,
         ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport,
         LaCauseProfondeDesEcarts: formData.LaCauseProfondeDesEcarts,
         FondsDepensesAuCoursDeCettePeriodeDeRapport : formData.FondsDepensesAuCoursDeCettePeriodeDeRapport,
         FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : formData.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport,
         CauseFondamentaleDesEcarts : formData.CauseFondamentaleDesEcarts,
         EcartsDeQualiteIdentifiesPendantCettePeriode : formData.EcartsDeQualiteIdentifiesPendantCettePeriode,
         ActionCorrectiveOuPreventivePlanifiee     : formData.ActionCorrectiveOuPreventivePlanifiee,
         ActivitesPrevuesPourLaProchainePeriodeDeRapport: formData.ActivitesPrevuesPourLaProchainePeriodeDeRapport,
         CoutsPrevusPourLaProchainePeriodeDeRapport : formData.CoutsPrevusPourLaProchainePeriodeDeRapport,
         RisquesNouvellementIdentifies : formData.RisquesNouvellementIdentifies,
         ProblrmesIdentifies: formData.ProblrmesIdentifies,
         Commentaires : formData.Commentaires,
      })
    }
    const handleUpdate = (event : FormEvent) => {
      //todo handle later
      event.preventDefault()
      if(!formData.id || !formData.ActivitesPrevuesPourCettePeriodeDeRapport || !formData.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport || !formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport || !formData.FondsDepensesAuCoursDeCettePeriodeDeRapport || !formData.EcartsDeQualiteIdentifiesPendantCettePeriode || !formData.Commentaires ){
        toast("certains champs sont videssome fields are empty ")
      }
      update.mutate({
      id: formData.id,
      ActivitesPrevuesPourCettePeriodeDeRapport  : formData.ActivitesPrevuesPourCettePeriodeDeRapport,
      ActivitesRealiseesAuCoursDeCettePeriodeDeRapport  : formData.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport,
      ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport,
      LaCauseProfondeDesEcarts : formData.LaCauseProfondeDesEcarts,
      FondsDepensesAuCoursDeCettePeriodeDeRapport : formData.FondsDepensesAuCoursDeCettePeriodeDeRapport,
      FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport :formData.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport,
      CauseFondamentaleDesEcarts : formData.CauseFondamentaleDesEcarts,
      EcartsDeQualiteIdentifiesPendantCettePeriode : formData.EcartsDeQualiteIdentifiesPendantCettePeriode,
      ActionCorrectiveOuPreventivePlanifiee      : formData.ActionCorrectiveOuPreventivePlanifiee,
      ActivitesPrevuesPourLaProchainePeriodeDeRapport: formData.ActivitesPrevuesPourLaProchainePeriodeDeRapport,
      CoutsPrevusPourLaProchainePeriodeDeRapport : formData.CoutsPrevusPourLaProchainePeriodeDeRapport,
      RisquesNouvellementIdentifies : formData.RisquesNouvellementIdentifies,
      ProblrmesIdentifies : formData.ProblrmesIdentifies,
      Commentaires : formData.Commentaires,
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
       <ControllingSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
       <FormContainer className ={` ${isOpen ? "ml-[20rem]" : "ml-[5rem]"}`}>
       {/* TEAM MEMBER STATUS REPORT */}
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-6">
            <RowGridText text="Journal des modifications" />
            <RowGridText small text="Le journal des modifications est un document utilisé pour suivre et gérer les changements survenant pendant le cycle de vie d'un projet" />
            <TextField
                lable="Activités prévues pour cette période de rapport."
                value={formData.ActionCorrectiveOuPreventivePlanifiee}
                onChange={(e) => setFormData({...formData , ActionCorrectiveOuPreventivePlanifiee : e.target.value})}
                isLoading={false}
            />
            <TextField
                isLoading={false}
                lable="Activités réalisées au cours de cette période de rapport."
                value={formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : e.target.value})}
            />
            <TextField
                isLoading={false}
                lable="Activités prévues mais non réalisées au cours de cette période de rapport"
                value={formData.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : e.target.value})}
            />
              <TextField
                isLoading={false}
                lable="La cause profonde des écarts"
                value={formData.LaCauseProfondeDesEcarts}
                onChange={(e) => setFormData({...formData , LaCauseProfondeDesEcarts : e.target.value})}
            />
             <TextField
                isLoading={false}
                lable="Fonds dépensés au cours de cette période de rapport"
                value={formData.FondsDepensesAuCoursDeCettePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , FondsDepensesAuCoursDeCettePeriodeDeRapport : e.target.value})}
            />
               <TextField
                isLoading={false}
                lable="Fonds prévus à dépenser au cours de cette période de rapport"
                value={formData.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Cause fondamentale des écarts"
                value={formData.LaCauseProfondeDesEcarts}
                onChange={(e) => setFormData({...formData , LaCauseProfondeDesEcarts : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Écarts de qualité identifiés pendant cette période"
                value={formData.EcartsDeQualiteIdentifiesPendantCettePeriode}
                onChange={(e) => setFormData({...formData , EcartsDeQualiteIdentifiesPendantCettePeriode : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Action corrective ou préventive planifiée"
                value={formData.ActionCorrectiveOuPreventivePlanifiee}
                onChange={(e) => setFormData({...formData , ActionCorrectiveOuPreventivePlanifiee : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Activités prévues pour la prochaine période de rapport"
                value={formData.ActivitesPrevuesPourLaProchainePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , ActivitesPrevuesPourLaProchainePeriodeDeRapport : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Coûts prévus pour la prochaine période de rapport"
                value={formData.CoutsPrevusPourLaProchainePeriodeDeRapport}
                onChange={(e) => setFormData({...formData , CoutsPrevusPourLaProchainePeriodeDeRapport : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Risques nouvellement identifiés"
                value={formData.RisquesNouvellementIdentifies}
                onChange={(e) => setFormData({...formData , RisquesNouvellementIdentifies : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Problèmes identifiés"
                value={formData.ProblrmesIdentifies}
                onChange={(e) => setFormData({...formData , ProblrmesIdentifies : e.target.value})}
               />
                <TextField
                isLoading={false}
                lable="Commentaires"
                value={formData.Commentaires}
                onChange={(e) => setFormData({...formData , Commentaires : e.target.value})}
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