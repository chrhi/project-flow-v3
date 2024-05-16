import { type NextPage } from "next";
import { useState  } from "react";
import { ProjectStarter } from "~/components/common/ProjectStarter";
import { api } from "~/utils/api";
import AppLayout from "~/components/layout/AppLayout";
import HomePageLoader from "~/components/common/placeholders-skelatones/home-page";
import HomePage from "~/components/dashboard/home-page";
import { getUserMetadata, setoreProjectMetaData, storeProjectCurrentPhaseAbdullah } from "~/lib/MetaData";
import { toast } from "react-hot-toast";
import { ProjectReduer } from "~/store/project-reducer";

enum PROJECT_STATUS {
  LOADING,
  NO_PROJECT,
  PROJECT
}

const Page: NextPage = () => {

  const [hasProjectStart , setHasProjectStart] = useState<PROJECT_STATUS>(PROJECT_STATUS.LOADING)

  const setProject = ProjectReduer(state => state.set_project)

    const {refetch} = api.projectRouter.get_project.useQuery({user_id : getUserMetadata() || ""} , {      
           retryOnMount : false ,
           onSuccess(data) {
             if (data && data?.id &&  data?.currentPhase){
              setHasProjectStart(PROJECT_STATUS.PROJECT)
              setoreProjectMetaData({project_id  : data.id})
              storeProjectCurrentPhaseAbdullah(data?.currentPhase)
              setProject({
                currentPhase : data.currentPhase , 
                projectDescription : "", 
                projectEndsAt : data.endsAt || new Date() , 
                projectStartAt : data.startAt  || new Date() , 
                projectId : data.id , 
                projectTitle : data.title || ""
              })
              return
             }
             setHasProjectStart(PROJECT_STATUS.NO_PROJECT)
             return
           },
           onError(){
            toast.error("somethign went wrong")
            setHasProjectStart(PROJECT_STATUS.NO_PROJECT)
           }
    })



  return (
    <>
     <AppLayout>
      {
        hasProjectStart === PROJECT_STATUS.LOADING ? 
        <HomePageLoader /> :    
         hasProjectStart === PROJECT_STATUS.PROJECT ?
         <HomePage />
         :
         <ProjectStarter refetch={refetch}  /> 
        }   
      </AppLayout>
    </>
  );

};

export default Page;