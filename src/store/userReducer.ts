import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
type Reducer ={
   
   email : string ,
   id: string ,
   project_id : string ,
   photo : string 
   first_name : string ,
   last_name : string 
   set_project_id : (input : { project_id : string }) => void ,
   set_user: (input : { email: string , photo: string , name : string , lastName : string}) => void 
}

export const userReducer = create<Reducer ,[["zustand/persist",unknown]]>(
    persist(
    (set) => ({
      
        email : "",
        photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8lgurxzZwpkDpQRks2gA5dSCJyoIzGrCyLQ&usqp=CAU" ,
        first_name : "" ,
        last_name : "",
        id: "",
        project_id : "" ,
        set_project_id : (input :{ project_id: string}) => set({ project_id: input.project_id}) ,
        set_user:(input :{ email: string , photo: string , name : string , lastName : string}) => set({ 
             email : input.email , photo: input.photo , first_name : input.name , last_name : input.lastName
            }),
    }),
    {
        name: 'app-projext-storage-HOME-user-needed-informations', 
        storage: createJSONStorage(() => sessionStorage)
      }
    )
)
