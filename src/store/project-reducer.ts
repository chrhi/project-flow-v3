import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { getProjectMetaData } from '~/lib/MetaData'
type Reducer ={
   
    projectId : string , 
    projectTitle : string , 
    projectStartAt : Date , 
    projectEndsAt : Date , 
    projectDescription : string , 
    currentPhase : string , 
    set_project : (input : { 
    projectId : string , 
    projectTitle : string ,
    projectStartAt : Date , 
    projectEndsAt : Date , 
    projectDescription : string , 
    currentPhase : string , 
 }) => void ,

}

export const ProjectReduer = create<Reducer ,[["zustand/persist",unknown]]>(
    persist(
    (set) => ({
      
        projectId : getProjectMetaData() , 
        projectTitle : "" , 
        projectStartAt : new Date() , 
        projectEndsAt : new Date() , 
        projectDescription : "" , 
        currentPhase : "" , 
        set_project : (input : { 
            projectId : string , 
            projectTitle : string ,
            projectStartAt : Date , 
            projectEndsAt : Date , 
            projectDescription : string , 
            currentPhase : string , 
         }) => set({
             projectId: input.projectId ,
             projectTitle : input.projectTitle , 
             projectStartAt : input.projectStartAt , 
             projectEndsAt : input.projectEndsAt , 
             projectDescription : input.projectDescription , 
             currentPhase : input.currentPhase
        }) 
       
    }),
    {
        name: 'app-project-storage-project-user-project-informations', 
        storage: createJSONStorage(() => sessionStorage)
      }
    )
)
