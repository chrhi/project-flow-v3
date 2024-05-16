import { useRouter } from 'next/router';
import { startupSideBarReducer ,NAVS_STARTUP } from '~/store/app-reducer/side-bar-store';
import {  buttonVariantsAbdullah } from '../used/AbdullahEffectButton';
import type { Dispatch, SetStateAction } from 'react';
import NextSwitch from '../common/NextSwitch';
import { motion } from 'framer-motion';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';



const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
  exit: { x: '100%', transition: { duration: 0.3 } },
};

type Props = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

const List = [
  { name: 'Initialisation', path:'/app/startup', navs: NAVS_STARTUP.SETUP },
  { name: 'Parties prenantes', path: '/app/startup/stakeholders', navs: NAVS_STARTUP.STAKEHOLDER },
  { name: 'Objectives du projet', path: '/app/startup/tables', navs: NAVS_STARTUP.TABLE },
  { name: 'Déclaration de ressources', path:'/app/startup/resource', navs: NAVS_STARTUP.STARTUP },
  { name: 'Jalons', path: '/app/startup/milestones', navs: NAVS_STARTUP.MILESTONES },
  { name: 'Des risques', path: '/app/startup/risks', navs: NAVS_STARTUP.SECONDFORM },
];

export const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  const router = useRouter();
  const current_page = startupSideBarReducer((state) => state.current_page);
  const set_current_page = startupSideBarReducer((state) => state.set_current_page);

  const handleClick = (path: string, selected: NAVS_STARTUP) => {
    router.push(path) as unknown;
    set_current_page({ payload: selected });
  };

  const Link = (current_page: NAVS_STARTUP, Nav: NAVS_STARTUP, path: string, name: string) => (
    <Button
    onClick={() => handleClick(path, Nav)}
    className={`rounded-lg w-[90%] mx-auto p-4 border dark:border-white ${buttonVariantsAbdullah({ variant: 'ghost', size: 'lg' })} h-14 flex items-center justify-start
      ${current_page === Nav ? ' !text-gray-800 dark:!text-white  font-bold bg-sky-50 dark:bg-neutral-800 border border-blue-500 ' : '!text-gray-600 dark:bg-neutral-900 dark:!text-white'} text-sm shadow-sm  `}
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
          className={`w-[70px] h-[70px]  transition duration-500 transform hover:translate-x-1 rounded-full bg-white dark:bg-neutral-800 shadow-xl flex items-center justify-end p-4 text-white`}
        >
         <ArrowRightIcon className='text-gray-900 w-5 h-5 ' />
        </button>
      </div>
     
        <motion.div
          variants={sidebarVariants}
          initial={isOpen ? "open" : "closed"}
          animate={isOpen ? "open" : "closed"}
          exit="exit"
          className={`fixed flex flex-col m-4 mt-0 top-[2rem] left-[0px] shadow-lg lg:shadow-none  z-[9] ${isOpen ? " w-full pr-4 md:pr-0  md:w-[20rem]" : " w-[0] "}  bg-white lg:bg-gray-50  dark:bg-neutral-800 custopn-page-height rounded-lg border-gray-[100px]`}
        >
          <div className={`${isOpen ? "flex" : "hidden"} items-center justify-end h-12  bg-white dark:bg-neutral-900 w-full mx-auto mt-[55px] p-4 pr-0`}>
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
          <ScrollArea className={`  w-full mx-auto bg-white dark:bg-neutral-900 ${isOpen ? "" : "hidden"}`}>
            <div className="flex flex-col py-4 gap-y-3 items-center space-y-1">
              {List.map((item) => Link(current_page, item.navs, item.path, item.name))}
              <NextSwitch indexThisPhase={0} />
            </div>
          </ScrollArea>
        </motion.div>
      
    </>
  )
 }