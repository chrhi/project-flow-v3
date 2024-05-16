/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { AbdullahEffectButton } from '../used/AbdullahEffectButton'
import { useRouter } from 'next/router'
import { buttonVariantsAbdullah } from '../used/AbdullahEffectButton'


export const NotAuth = () => {
    const router = useRouter()

    const handleClick =  (path : string ) => {
        router.push(path) as unknown
        
      }
  return (  <div className="w-[30%]  h-[60px] gap-x-4 flex justify-end items-center  ">
     <AbdullahEffectButton 
       className={`${buttonVariantsAbdullah({variant :'ghost'})}`}
       onClick={ () =>  handleClick("/auth/login" ) as unknown}
      >
                connexion
     </AbdullahEffectButton>
     <AbdullahEffectButton 
            className={`${buttonVariantsAbdullah({variant :'ghost'})}`}
            onClick={ () =>  handleClick("/auth/register" ) as unknown}
      >
                s'inscrire
      </AbdullahEffectButton>
</div> 
  )
}

