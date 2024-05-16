import { Dialog, Transition } from '@headlessui/react'
import { type Dispatch, Fragment, type SetStateAction, useState } from 'react'
import {  DateRangePicker, type RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { AbdullahButton, buttonVariants } from './AbdullahButton';
import { AlgeriaformatDate } from '~/utils/formate/AlgeriaFormate';



interface TimePickerProps {
  startDate : Date 
  endDate : Date 
  lable? : string 
  setStartDate :  Dispatch<SetStateAction<Date>> ,
  setEndDate : Dispatch<SetStateAction<Date>>,
  onlyIcon? :boolean,
  callBack? : (start : Date , end : Date) => void,
  isLoading? : boolean
}



export  function TimePicker ({startDate , endDate , lable = "", isLoading = false ,  callBack , setStartDate , setEndDate , onlyIcon }:TimePickerProps) {
  
    const [isOpen, setIsOpen] = useState(false)
     
    function openModal() {
      setIsOpen(true)
    }
    function closeModal(){
      setIsOpen(false)
    }
    
    const handleSelect = (ranges:RangeKeyDict) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setStartDate(ranges?.selection?.startDate as Date)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setEndDate(ranges?.selection?.endDate as Date)
    }
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }
  
    function fireCallBack (){
      if(callBack){
        callBack( startDate , endDate)
      }
      closeModal()
    }

  return (
    <>
   
    {onlyIcon ? 
     
   <button 
    onClick={openModal}
    className="w-[50px] h-[40px] rounded-lg border flex items-center justify-between p-1 px-4 shadow-sm text-gray-400 "
>
 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
</svg>

</button>
: 
<div>
<label htmlFor={lable} className={`block text-sm font-medium leading-6 text-gray-900 `}>
{lable}
</label>
<button 
onClick={openModal}
className="w-full h-[40px] rounded-lg border flex items-center justify-between p-1 px-4 shadow-sm text-gray-400 "
>
from     {AlgeriaformatDate(startDate)}   to    {AlgeriaformatDate(endDate)}
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
</svg>

</button>
</div>

    }
  
  
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
               
              >
                <Dialog.Panel className="  min-w-[600px] h-fit w-fit transform overflow-hidden  bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl my-4 font-medium leading-6 text-gray-900"
                  >
                   select the date 
                  </Dialog.Title>
                  <div className="w-full h-full mt-1 flex flex-col  ">
                  <DateRangePicker  
                    ranges={[selectionRange]}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    minDate={new Date()} onChange={handleSelect} 
                    direction="horizontal"
                    />
                    <div className='w-full h-[50px] flex items-center justify-end p-4'>
                      <AbdullahButton
                      onClick={fireCallBack}
                      isLoading={isLoading}
                      className={buttonVariants({size:"sm", variant:'primary'})}
                      >
                         close and save
                      </AbdullahButton>
                   
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      </>
  )
}
