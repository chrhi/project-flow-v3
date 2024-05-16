/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { useTypewriter  } from 'react-simple-typewriter'
import { SettingsReminder } from './SettingsReminder';

function Reminder() {

  const [text] = useTypewriter({
    words:['Far better to dare mighty things, to win glorious triumphs,','even though checkered by failure, than to take rank with those poor spirits ' , 'even though checked by failed ', ' who neither enjoy much nor suffer much . . . in the grey twilight that knows not victory nor defeat.'],
    loop:true,
  });


  return (
  <div className='w-[50%]  bg-white rounded-2xl p-4 h-[200px]'>
     <div className="w-full h-[40px] flex justify-between items-center pr-2">
           <h1 className='text-xl font-poppins text-black font-semibold'>
           A daily reminder to your future self:
           </h1>
           <SettingsReminder />
     </div>
     <div>
           <p className='!bg-clip-text !bg-gradient-to-r !from-sky-500 !to-indigo-600 !text-transparent text-lg my-8'>
               {text}
           </p>
      </div>
  </div>
  )
}

export default Reminder