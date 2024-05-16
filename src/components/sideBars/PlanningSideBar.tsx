import { useRouter } from 'next/router'
import {planningSideBarReducer as PlanningSideBarReducer , NAVS_PLANNING as NAVS } from '~/store/app-reducer/side-bar-store';
import { AbdullahEffectButton, buttonVariantsAbdullah } from '../used/AbdullahEffectButton'
import type { Dispatch, SetStateAction } from 'react'
import NextSwitch from '../common/NextSwitch'
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { ArrowRightIcon } from 'lucide-react';

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
  exit: { x: '100%', transition: { duration: 0.3 } },
};



type Props ={
  isOpen? : boolean , 
  setIsOpen?: Dispatch<SetStateAction<boolean>>

}

export const List = [
  {name : "Plan de Portée du Projet" , path : "/app/planning" , navs : NAVS.ONE},
  {name : " WBS  " , path : "/app/planning/adbullah" , navs : NAVS.TWO},
  // {name : " OBS  " , path : "/app/planning/adbullah" , navs : NAVS.TWO},
  // {name : " RBS  " , path : "/app/planning/adbullah" , navs : NAVS.TWO},
  // {name : " CBS  " , path : "/app/planning/adbullah" , navs : NAVS.TWO},
  // {name : " OHC  " , path : "/app/planning/adbullah" , navs : NAVS.TWO},

  {name : "Gestion des tâches" , path : "/app/planning/tasks_hub" , navs : NAVS.TASKS},
  {name : " Plan de gestion de projet " , path : "/app/planning/task_assigment" , navs : NAVS.THREE},
  {name : "Planification du calendrier du projet" , path : "/app/planning/Project_Scheduler" , navs : NAVS.FOUR},
  {name : "Plan de gestion des communications" , path : "/app/planning/comminucation_plan" , navs : NAVS.SIX},
  {name : "Plan de gestion des coûts" , path : "/app/planning/cost_managment_plan" , navs : NAVS.SEVEN},
  {name : "Plan de gestion du changement" , path : "/app/planning/change_managment_plan" , navs : NAVS.EIGHT},
  {name : "Plan de gestion des risques" , path : "/app/planning/risk_management_plan" , navs : NAVS.NIGHT},
  {name : "Plan d'amélioration des processus" , path : "/app/planning/Process_involving_plan" , navs : NAVS.TEN},
  {name : "Plan de gestion des parties prenantes" , path : "/app/planning/stakholder_managment_plan" , navs : NAVS.A},
  {name : "Plan de gestion des exigences" , path : "/app/planning/requirement_managment_plan" , navs : NAVS.ELEVEN},
] 



export  const PlanningSideBar = ({isOpen , setIsOpen} : Props) => {
  const router = useRouter()
  const current_page = PlanningSideBarReducer(state => state.current_page)
  const set_current_page = PlanningSideBarReducer(state => state.set_current_page)

  const handleClick = (path:string , selected : NAVS) => {
    router.push(path) as unknown
    set_current_page({payload: selected})
  }

  const Link = (current_page: NAVS, Nav: NAVS, path: string, name: string) => (
    <Button
      onClick={() => handleClick(path, Nav)}
      className={`rounded-lg w-[90%] mx-auto p-4 border ${buttonVariantsAbdullah({ variant: 'ghost', size: 'lg' })} h-14 flex items-center justify-start
        ${current_page === Nav ? ' !text-gray-800 font-bold bg-sky-50 border border-blue-500 ' : '!text-gray-600'} text-sm shadow-sm`}
    >
      {name}
    </Button>
  );


 
  return (
    <>
      <div className={`${isOpen ? "hidden" : ""} z-[9999] absolute top-[40%] left-[-30px] rounded-[50%] mt-[50px]`}>
        <button
          onClick={() => {
            if (setIsOpen) setIsOpen(true);
          }}
          className={`w-[70px] h-[70px]  transition duration-500 transform hover:translate-x-1 rounded-full bg-white shadow-xl flex items-center justify-end p-4 text-white`}
        >
         <ArrowRightIcon className='text-gray-900 w-5 h-5 ' />
        </button>
      </div>
     
        <motion.div
          variants={sidebarVariants}
          initial={isOpen ? "open" : "closed"}
          animate={isOpen ? "open" : "closed"}
          exit="exit"
          className={`fixed flex flex-col m-4 mt-0 top-[2rem] left-[0px] ${isOpen ? "w-[20rem]" : "w-[0]"} bg-gray-50 custopn-page-height rounded-lg border-gray-[100px]`}
        >
          <div className={`${isOpen ? "flex" : "hidden"} items-center justify-end h-12 bg-white w-full mx-auto mt-[55px] p-4 pr-0`}>
          <button
              onClick={() => {
                if (setIsOpen) setIsOpen(false);
              }}
              className={` hover:bg-gray-50 p-2 rounded-full`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ScrollArea className={` flex-grow w-full mx-auto bg-white ${isOpen ? "" : "hidden"}`}>
            <div className="flex flex-col py-4 gap-y-3 items-center space-y-1">
              {List.map((item) => Link(current_page, item.navs, item.path, item.name))}
              <NextSwitch indexThisPhase={1} />
            </div>
          </ScrollArea>
        </motion.div>
     
    </>
  )
 }