import { type AppType } from 'next/app';
import Providers from '~/components/layout/Providers';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import { getUserMetadata, setoreProjectMetaData, storeProjectCurrentPhaseAbdullah } from '~/lib/MetaData';
import { ProjectReduer } from "~/store/project-reducer";
import { userReducer } from '~/store/userReducer';
import { BlockedPopUp as ABDULLAH } from '~/store/app-reducer/errorReducer'

const MyApp: AppType = ({ Component, pageProps }) => {

  const setUser = userReducer(state => state.set_user)
  const setProject = ProjectReduer(state => state.set_project)

  const set_isOpen = ABDULLAH(state => state.setIsOpen)

  api.userRouter.getUser.useQuery({ id : getUserMetadata() } , {
    onSuccess(data) {
      if(data?.id && data?.email){
        //handle if user is blocked 
        setUser({
          email : data.email || "error" , 
          photo : data.photo || "error" , 
          lastName : data.lastName || "error" , 
          name : data.name || "error" 
        })
        
        
      }
      if(data.status === "BLOCKED"){
        set_isOpen({payload : true})
      }
    },
  })
   api.projectRouter.get_project.useQuery({user_id : getUserMetadata() || ""} , {      
    retryOnMount : false ,
    onSuccess(data) {
      if (data?.id &&  data?.currentPhase){
       
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
      }
    },
   
})

  return (
   <Providers>
      <Component {...pageProps} />
   </Providers>     
  );
};

export default api.withTRPC(MyApp);
