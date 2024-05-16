/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { buttonVariantsAbdullah } from '../used/AbdullahEffectButton'
import { useRouter } from 'next/router'
import { getProjectCurrentPhaseAbdullah, getProjectMetaData } from '~/lib/MetaData'
import { ErrorNoteReducer } from '~/store/app-reducer/errorReducer'
import { header_page_Reducer , PAGES } from '~/store/app-reducer/headerReducer'
import { IsPhaseLocked } from '~/utils/access/IsPhaseLocked'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'


export function PagesNav() {

  const current_page = header_page_Reducer(state => state.current_page)
  const set_current_page = header_page_Reducer(state => state.set_current_page)
  const set_access_error = ErrorNoteReducer(state => state.setIsOpen)
  
  const router = useRouter()

 async function handleRouting (path : string , page : PAGES , INDEX : number) {
   const available = IsPhaseLocked({current_phase : getProjectCurrentPhaseAbdullah(), projectID : getProjectMetaData() , thisPhaseIndex : INDEX})
   if(page === PAGES.DASHBORD  ){
    set_current_page({payload : page})
    await router.push(path)
    return 
   }
   
   if(page === PAGES.DOCS && getProjectMetaData() !== "" ){
    set_current_page({payload : page})
    await router.push(path)
    return 
   }
   if(!available){
    set_access_error({payload : true})
    return 
   }
   set_current_page({payload : page})
   await router.push(path)

  }

  const LIST = [
    {
      name : "Accueil" , path : "/app" , page : PAGES.DASHBORD
    },
    {
      name : "Démarage" , path : "/app/startup", page : PAGES.STARTUP
    },
    {
      name : "Planification" , path : "/app/planning" , page : PAGES.PLANNING
    },
    {
      name : "Exécution" , path : "/app/executing" , page : PAGES.EXECUTING
    },
    {
      name : "Contrôler" , path : "/app/controlling" , page : PAGES.CONTROLLING
    },
    {
      name : "Clôture " , path : "/app/close" , page : PAGES.CLOSING
    },
    {
      name : "Mes documents " , path : "/app/docs" , page : PAGES.DOCS
    },
  ]

  return (
    <div className='w-[70%]  h-full hidden lg:flex  justify-start items-center gap-x-6 '>
      {LIST.map((item , index ) => {
       
          return (
            <>
            <Button 
           
           variant="ghost"
           key={item.name}
            onClick={() => handleRouting(item.path , item.page , index - 1 )}
                className={`

                ${buttonVariantsAbdullah({variant :'ghost' , size:"sm" })} text-gray-500 dark:text-gray-100 ${current_page === item.page ? ' text-slate-900 dark:text-white' : null}  font-semibold text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-stone-800 dark:active:bg-stone-700  
                ${IsPhaseLocked({current_phase : getProjectCurrentPhaseAbdullah() ,projectID : getProjectMetaData() , thisPhaseIndex : index - 1}) || item.page === PAGES.DOCS || item.page === PAGES.DASHBORD ? "" : "text-gray-200"}
                `}
           >   {item.name}
     
           </Button>
          {(index === 0 || index === 5) && <Separator orientation="vertical" className='h-[60%] ' />}
           </>
          )
         
      }
      )}
        
    </div>
  )
}

