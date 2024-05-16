import React from 'react'
import { AbdullahButton , buttonVariants} from '../used/AbdullahButton'
import { useState } from 'react'
import { ConfirmePopUp } from '../popup/ConfirmePopUp'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import { openNewTap } from '~/utils/pdf/openNewTap'
import { getProjectMetaData } from '~/lib/MetaData'
import { saveAs } from 'file-saver';
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { FRAMER_MOTION_LIST_ITEM_VARIANTS } from '~/lib/constants'

type DocumentBuilderProps = {
    title : string ,
    description : string , 
    url : string
}




export function DommyDocument({title , description , url}  : DocumentBuilderProps) {

    const x = useMotionValue(0);
    const controls = useAnimation();
    const [constrained, setConstrained] = useState(true);

    const [velocity, setVelocity] = useState<number>(0);


  return (
    <motion.div 
    animate={controls}
    drag="x"
    dragConstraints={constrained && { left: 0, right: 0 }}
    dragElastic={1}
   
    style={{ x }}
    onDrag={() => setVelocity(x.getVelocity())}

    whileTap={{ scale: 1.05 }}
    className="flex w-[90%] gap-y-4  items-start  max-w-sm  rounded-md border flex-col  border-gray-200 bg-white p-3 shadow-lg transition-[border-color] hover:border-black "
   >
        <h3 className='text-xl font-bold text-gray-800 '>📙 {title} </h3>
        <p className='text-md text-gray-500 '>
        {description}
        </p>
        { 
              <div className='w-full h-[70px] flex justify-end gap-x-4 items-center'>  
                 <ConfirmePopUp />
                  <AbdullahButton
                  onClick={() => openNewTap(url)}
                  className={buttonVariants({variant : "primary"})} >
                      view the document
                  </AbdullahButton>  
              </div>
        }
    
    </motion.div>
  )
}

  