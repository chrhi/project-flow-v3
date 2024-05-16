import { create } from 'zustand'


type OpenModelType ={
    id : string,
    showModel: boolean,
    setShowModel : (input :boolean) => void,
    setId : (input:string) => void
}

export const OpenStakeHolderOpoUpShowCase = create<OpenModelType>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)

export const OpenDeteRisksDeleteModel = create<OpenModelType>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)


export const openTasksShowUp = create<OpenModelType>(

    (set) => ({
        id : "",
        showModel:false,
        setShowModel:(input :boolean ) => set({showModel : input}),
        setId : (input : string) => set({id : input})
    }),
)


type TaksDoneModelType ={
    id : string,
    endedAt : Date , 
    startAt : Date ,
    showModel: boolean,
    setShowModel : (input :boolean) => void,
    setId : (input:string) => void,
    setEveryThing : ({id , endedAt , startAt} : {id : string , endedAt : Date , startAt : Date  }) => void
}

export const openTasksDonePanle = create<TaksDoneModelType>(

    (set) => ({
        id : "",
        endedAt : new Date() , 
        startAt : new Date (),
        showModel:false,
        setShowModel:(input :boolean ) => set({showModel : input}),
        setId : (input : string) => set({id : input}),
        setEveryThing : ({id , endedAt , startAt} : {id : string , endedAt : Date , startAt : Date  }) =>  set({id ,  endedAt , startAt , showModel : true  }),
    }),
)

type DelerableModelType ={
    id : string , 
    title : string , 
    description : string , 
    cost : number , 
    showModel: boolean,
    setShowModel : (input :boolean) => void,
  
    setEveryThing : ({
        id,
        title , 
        description , 
        cost , 
       
    }: 
    {
        id : string , 
        title : string , 
        description : string , 
        cost : number , 

    }) => void
}

export const OpenDelevaribleUpdateModel = create<DelerableModelType>(

    (set) => ({
        id : "",
        title : "" , 
        description : "" , 
        cost : 0 , 
        showModel:false,
        setShowModel:(input :boolean) => set({showModel : input}),
        setEveryThing : ({id, title ,  description ,  cost , }:  { id : string , title : string ,  description : string , cost : number , }) => set({id , title , description , cost})
    }),
)
