/* eslint-disable @typescript-eslint/no-unsafe-return */

import { TaskType } from "~/components/board/Task"

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const OrderArrayTodo = ({data } : {data : TaskType[]}) => {
    //@ts-ignore
    const arrayIdsOrder = JSON.parse(localStorage.getItem('taskOrderTodo'))

    if (!arrayIdsOrder && data?.length) {
        //@ts-ignore
        const idsOrderArray = data.map(task => task?.id)
        localStorage.setItem('taskOrderTodo', JSON.stringify(idsOrderArray))
    }

    let myArray
    if (arrayIdsOrder?.length && data?.length) {
        //@ts-ignore
        myArray = arrayIdsOrder.map(id => {
            //@ts-ignore
            return data.find(el => el.id === id)
        })
        const newItems = data.filter(el => {
            return !arrayIdsOrder.includes(el.id)
        })

        if (newItems?.length) myArray = [...newItems, ...myArray]
         
    }
    if(myArray) return myArray

    return data
   
    
}

export const updateToDoOrderArray = ({data } : {data : TaskType[]}) => {
    if(data.length === 0 ) {
        localStorage.setItem('taskOrder', JSON.stringify([]))
        return
    }
    
    const idsOrderArray = data?.map(task => task?.id)
        localStorage.setItem('taskOrder', JSON.stringify(idsOrderArray))
}

export const handleDeleteOrder = (id : string) => {
    //@ts-ignore
    const arrayIdsOrder = JSON.parse(localStorage.getItem('taskOrder'))
    if (arrayIdsOrder?.length) {
        //@ts-ignore
        const newIdsOrderArray = arrayIdsOrder.filter(num => num !== id)
        localStorage.setItem('taskOrder', JSON.stringify(newIdsOrderArray))
    }
}