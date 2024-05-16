import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export enum PAGES {
    DASHBORD,
    STARTUP,
    PLANNING ,
    EXECUTING ,
    CONTROLLING,
    CLOSING ,
    DOCS,
    PROFILE ,
    PASSWORD ,
    TEAM,
    INVATE ,
    SETTINGS
}


type Reducer ={
    current_page: PAGES,
    set_current_page : (input :{ payload:PAGES}) => void
}

export const header_page_Reducer = create<Reducer ,[["zustand/persist",unknown]]>(
  persist(
    (set) => ({
      
      current_page: PAGES.DASHBORD,
     
      set_current_page:(input :{ payload:PAGES}) => set({current_page : input.payload}),
      
     
    }),
    {
      name: 'app-status-storage-HOME-header-openFlows', 
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
