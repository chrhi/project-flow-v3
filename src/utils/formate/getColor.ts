
export const getColor = ({text } : {text : string}) => {
    if(text === "low"){
        return "green"
    }
    if(text === "medium"){
        return "yellow"
    }
    if(text === "heigh"){
        return "orange"
    }
    if(text === "very height"){
        return "red"
    }
    return "blue"
}