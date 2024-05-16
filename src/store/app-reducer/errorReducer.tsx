import { create } from 'zustand'



type Reducer ={
    isOpen: boolean,
    setIsOpen : (input :{ payload:boolean}) => void
}

export const ErrorNoteReducer = create<Reducer >(
    (set) => ({
        isOpen: false,
        setIsOpen:(input :{ payload:boolean}) => set({isOpen : input.payload}),
    })
)

export const BlockedPopUp = create<Reducer >(
    (set) => ({
        isOpen: false,
        setIsOpen:(input :{ payload:boolean}) => set({isOpen : input.payload}),
    })
)

