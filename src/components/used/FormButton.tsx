import React, { FormEvent } from 'react'
import { AbdullahButton, buttonVariants } from './AbdullahButton'

interface FromButtonprops extends  React.HTMLAttributes<HTMLButtonElement>{
    create : (e : FormEvent) => void ,
    update : (e : FormEvent) => void ,
    state : boolean ,
    isLoading : boolean
}


export  function FormButton({create , update , state ,isLoading ,  ...props } : FromButtonprops) {
  return (
    <div className="bg-white dark:bg-neutral-900  py-3 col-span-6 lg:col-span-12 text-right ">
    {
      state ? 
      
      <AbdullahButton
      type="submit"
      onClick={(e) => update(e)}
      className={buttonVariants({size:"sm", variant:'primary'})}
      isLoading ={isLoading}
      {...props}
      >
             mise à jour
      </AbdullahButton>
      :
      <AbdullahButton
      type="submit"
      onClick={(e) => create(e)}
      className={buttonVariants({size:"sm", variant:'primary'})}
      isLoading ={isLoading}
      {...props}
      >
        enregistrer 
      </AbdullahButton>
     
    }
   </div>
  )
}

