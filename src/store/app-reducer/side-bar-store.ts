import { NAVS_STARTUP , NAVS_CLOSING , NAVS_CONTROLLING , NAVS_EXECUTING , NAVS_PLANNING } from "~/types/navs-sidbars";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// start up phase side bar
type startup_Reducer_type ={
    current_page: NAVS_STARTUP,
    set_current_page : (input :{ payload:NAVS_STARTUP}) => void
}

export const startupSideBarReducer = create<startup_Reducer_type ,[["zustand/persist",unknown]]>(
    persist(
      (set) => ({
        current_page: NAVS_STARTUP.SETUP,
        set_current_page:(input :{ payload:NAVS_STARTUP}) => set({current_page : input.payload}),  
      }),
      {
        name: 'app-status-storage-sidebar-PAGE',     
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
  
// planning side bar phase 
type planning_Reducer_type ={
    current_page: NAVS_PLANNING,
    set_current_page : (input :{ payload:NAVS_PLANNING}) => void
}

export const planningSideBarReducer = create<planning_Reducer_type ,[["zustand/persist",unknown]]>(
  persist(
    (set) => ({
      current_page: NAVS_PLANNING.ONE,
      set_current_page:(input :{ payload:NAVS_PLANNING}) => set({current_page : input.payload}),
    }),
    {
      name: 'app-status-storage-PLANNING-sidebar-PAGE',     
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

// this is for the executing phase 
type executing_Reducer_type ={
    current_page: NAVS_EXECUTING,
    set_current_page : (input :{ payload:NAVS_EXECUTING}) => void
}

export const executingSideBarReducer = create<executing_Reducer_type ,[["zustand/persist",unknown]]>(
  persist(
    (set) => ({
      current_page: NAVS_EXECUTING.ONE,
      set_current_page:(input :{ payload:NAVS_EXECUTING}) => set({current_page : input.payload}),
    }),
    {
      name: 'app-status-storage-ExecutingSideBar-sidebar-PAGE',     
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

// this is the controlling phase 
type controlling_Reducer_type ={
    current_page: NAVS_CONTROLLING,
    set_current_page : (input :{ payload:NAVS_CONTROLLING}) => void
}

export const controllingSideBarReducer = create<controlling_Reducer_type ,[["zustand/persist",unknown]]>(
  persist(
    (set) => ({
      current_page: NAVS_CONTROLLING.ONE,
      set_current_page:(input :{ payload:NAVS_CONTROLLING}) => set({current_page : input.payload}),
    }),
    {
      name: 'app-status-storage-ControllingSideBar-sidebar-PAGE',     
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

// this is the colosing phase 
type colsing_Reducer_type ={
    current_page: NAVS_CLOSING,
    set_current_page : (input :{ payload:NAVS_CLOSING}) => void
}

export const closingSideBarReducer = create<colsing_Reducer_type ,[["zustand/persist",unknown]]>(
  persist(
    (set) => ({
      current_page: NAVS_CLOSING.ONE,
      set_current_page:(input :{ payload:NAVS_CLOSING}) => set({current_page : input.payload}),
    }),
    {
      name: 'app-status-storage-ClosingSideBar-sidebar-PAGE',     
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)

export  { NAVS_STARTUP , NAVS_CLOSING , NAVS_CONTROLLING , NAVS_EXECUTING , NAVS_PLANNING }