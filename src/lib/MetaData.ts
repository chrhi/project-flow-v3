import Cookies from "js-cookie"

export const setoreProjectMetaData = ({
    project_id  
}:{project_id : string }) => {
    Cookies?.set("abdullah-project-id" , project_id)
}

export const getProjectMetaData= () : string => {
  const projec_id : string | undefined =   Cookies.get('abdullah-project-id') // => 'value'
  return projec_id || ""
}

export const getUserMetadata = () : string => {
    const user_id : string | undefined =   Cookies.get('abdullah-user-id') // => 'value'
    return user_id || ""
}

export const storeUserMetadata = ({
    user_id  
}:{user_id : string }) => {
    Cookies?.set("abdullah-user-id" , user_id)
}

export const SetAsProjectManager = () => {
    Cookies?.set("abdullah-project-Manager" , getProjectMetaData())
}

export const RemoveProjectManager = () => {
    Cookies?.remove("abdullah-project-Manager")
}

export const IsProjectManager = () : boolean => {
    const token = Cookies.get('abdullah-project-Manager')
    if(token){
        return true 
    }
    return false
}

export const storeProjectCurrentPhaseAbdullah = (text : string)  => {
    Cookies?.set("abdullah-project-cuurent-phase" , text)
}

export const getProjectCurrentPhaseAbdullah = ()  => {
    const PHASE : string | undefined =   Cookies.get('abdullah-project-cuurent-phase') // => 'value'
    return PHASE || ""
}

export const deteProjectMetaData = () => {
    Cookies?.remove('abdullah-project-cuurent-phase')
    Cookies?.remove('abdullah-project-id')
}

export const removeAll = () => {
    Cookies?.remove('abdullah-project-cuurent-phase')
    Cookies?.remove('abdullah-project-id')
    Cookies?.remove("abdullah-project-Manager")
    Cookies?.remove("abdullah-user-id")
}