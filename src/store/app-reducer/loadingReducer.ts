import { create } from 'zustand'
type Reducer ={
    is_loading: boolean,
    fullWight : boolean ,
    set_isLoading : (input :boolean) => void,
    set_isLoadingFully :(input: {is_loading : boolean  ,fullWight : boolean  })  => void
}

export const loading_Reducer = create<Reducer>(

    (set) => ({
        is_loading:false,
        fullWight : false,
        set_isLoading:(input :boolean) => set({is_loading : input}),
        set_isLoadingFully : (input: {is_loading : boolean  ,fullWight : boolean  })  => set({is_loading : input.is_loading , fullWight: input.fullWight}),
    }),
)
