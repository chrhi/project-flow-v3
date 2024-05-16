import { Title } from '@tremor/react'
import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { api } from '~/utils/api'
import { getProjectMetaData } from '~/lib/MetaData'
import { toast } from 'react-hot-toast'
import type { StakeHolder } from '@prisma/client'
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton'
import { Loader2 } from 'lucide-react'

function RecentStakHolder() {

  const [stakeHolders , setStakeholders] = useState<StakeHolder[]>([] as StakeHolder[])

  const [loadingState , setLoadingState] = useState('LOADING')

  api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()},{
    onSuccess : (data) => {
      if(data.length === 0){
        setLoadingState("NOSTAKEHOLDER")
      }
      setStakeholders(data )
      setLoadingState("DONE")
    },
    onError : () => {
      toast.error("error while retrieving stakeholders may be your internet connection?")
      setLoadingState("DONE")
    }
  })

  return (
    <div className=" w-full lg:w-[25%] h-full duration-500 flex flex-col p-4   bg-white rounded-lg">
      

       {
        loadingState === "LOADING" ? 
       
          <div className='w-full h-full flex justify-center items-center'>
            <Loader2 className='mr-2 h-12 w-12 font-bold text-blue-500  animate-spin' />
          </div>
     
        : loadingState === "NOSTAKEHOLDER" ? 
        <div>
          <AbdullahButton className={`${buttonVariants({variant : "primary"})}`}>Add new stakeholder</AbdullahButton>
        </div>
        :   
        <ScrollArea className="mt-4 ">
             <Title className="font-semibold text-xl mb-4"> Recent stakeholders </Title>
          {

            stakeHolders.map(item =>(
              <div className="w-full h-[40px]  flex justify-start cursor-pointer hover:bg-gray-50  px-4">
                <p className="text-md text-gray-500 font-semibold  "> 👨‍💼 {item.name}</p>
              </div>
            ) )
          }
          </ScrollArea>
       }
     
 
    </div>
  )
}

export default RecentStakHolder


