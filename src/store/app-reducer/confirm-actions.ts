import { create } from 'zustand'


type ReducerUserDelete ={
    id : string,
    showModel: boolean,
    setShowModel : (input :boolean) => void,
    setId : (input:string) => void
}

export const confirmDeleteUser = create<ReducerUserDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)


type ReducerStakeholder ={
    id : string,
    showModel: boolean,
    setShowModel : (input :boolean) => void,
    setId : (input:string) => void
}

export const confirmDeleteStakeholder = create<ReducerStakeholder>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)


type ReducerTasksDelete ={
    id : string,
    showModel: boolean,
    setShowModel : (input :boolean) => void,
    setId : (input:string) => void
}

export const confirmDeleteTask = create<ReducerTasksDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)



export const confirmDelevarebleTask = create<ReducerTasksDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)

export const confirmObjectiveDelete = create<ReducerTasksDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)

export const confirmMilestoneDelete = create<ReducerTasksDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)

export const confirmResourceDelete = create<ReducerTasksDelete>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)
