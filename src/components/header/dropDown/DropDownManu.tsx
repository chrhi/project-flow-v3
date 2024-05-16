/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import {userReducer} from "~/store/userReducer"
import { ProjectReduer } from '~/store/project-reducer'
import Cookies from 'js-cookie';
import { header_page_Reducer , PAGES } from '~/store/app-reducer/headerReducer'
import { RemoveProjectManager , removeAll } from '~/lib/MetaData';
import { Settings, ShieldAlert } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  LogOut,
  Lock,
  User,
} from "lucide-react"
import { AbdullahButton , buttonVariants } from '~/components/used/AbdullahButton'


export default function DropDowsMenu() {
  //initializes hooks
   const router = useRouter()
  const {email , first_name , last_name , photo   } = userReducer()
  const { currentPhase , projectTitle } = ProjectReduer()
  const current_page = header_page_Reducer(state => state.current_page)
  const set_current_page = header_page_Reducer(state => state.set_current_page)
 
  const handleLogout = () => {
    Cookies.remove("abdullah-access-token")
    RemoveProjectManager()
    removeAll()
    window.location.reload()
  }

  return (
    <div className=" text-right z-[100]">
    <Menu as="div" className="relative z-[100]  inline-block text-left">
      <div className='h-[60px] w-[20px] flex justify-center items-center'>
          <Menu.Button className={`${buttonVariants({variant : "ghost" , size : "sm"})}`} >
           <Settings  className='w-5 h-5 text-neutral-800' />
          </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-[100]  right-0 top-12  w-[250px] origin-top-right divide-y divide-gray-100  bg-white dark:bg-black shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1  z-[100] ">
          <Menu.Item>
              {({ active }) => (
                <div
                 className={`
                ${ active ? 'bg-gray-50 ' : ""}
                w-full min-h-[30px] h-fit border-b cursor-pointer flex overflow-x-hidden items-center gap-x-1`}
                onClick={() => {
                  router.push("/app/user/profile")
                  set_current_page({payload:PAGES.PROFILE})
                }  }
                >
                 <Avatar>
                  <AvatarImage src={photo} alt="@abdullah" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                  <div className='w-[80%] min-h-[45px] h-fit   flex flex-col justify-center p-4 gap-y-1 '>
                  <h3 className='truncate text-sm text-gray-600 dark:text-white'>{email }</h3>
                  <h3 className='truncate text-sm text-gray-600  dark:text-white '>{ first_name + " " + last_name || "unknown"}</h3>
                </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className='w-full min-h-[30px] h-fit border-b bg-gradient-to-br mb-3 from-emerald-800 to-green-500 flex flex-col justify-center p-4 gap-y-1 '>
                   <h3 className='truncate text-md font-bold text-white '>{ "Titre du projet  "}</h3>
                  <h3 className='truncate text-sm text-white '>{projectTitle}</h3>
                  <h3 className='truncate text-sm font-semibold  text-white '>{ "phase actuelle  "}</h3>
                  <h3 className='truncate text-sm text-white'>{ currentPhase}</h3>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={() => {
                  router.push("/app/user/profile")
                  set_current_page({payload:PAGES.PROFILE})
                }  }
                  className={`
                  ${ active ? 'bg-gray-50 dark:bg-stone-800 dark:text-white text-gray-900' : 'text-gray-900 dark:text-white'}
                  ${
                    current_page === PAGES.PROFILE ? 'bg-blue-200 text-gray-900 font-semibold ' : ' '  
                  } group flex w-full gap-x-4 items-center rounded-md px-2 py-2 text-sm`}
                >
                     <User className="mr-2 h-4 w-4" />
              
                     Mon profil
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={() =>{
                  set_current_page({payload:PAGES.PASSWORD})
                  router.push("/app/user/password_settings")  }}
                  className={`
                  ${ active ? 'bg-gray-50 dark:bg-stone-800 dark:text-white text-gray-900' : 'text-gray-900 dark:text-white'}
                  ${
                    current_page === PAGES.PASSWORD ? 'bg-blue-200 text-gray-900 font-semibold ' : ''  
                  } group flex w-full gap-x-4 items-center rounded-md px-2 py-2 text-sm`}
                >
               
               <Lock className="mr-2 h-4 w-4" />

              
               mot de passe
                </button>
              )}
            </Menu.Item>           
           <Menu.Item>
              {({ active }) => (
                <button
                onClick={() => {
                  set_current_page({payload:PAGES.SETTINGS})
                  router.push("/app/user/settings") } }
                  className={
                 `     ${ active ? 'bg-gray-50 dark:bg-stone-800 dark:text-white text-gray-900' : 'text-gray-900 dark:text-white'}
                    ${
                    current_page === PAGES.SETTINGS ? 'bg-blue-200 text-gray-900 font-semibold ' : ''  
                  }  group flex w-full gap-x-4 items-center rounded-md px-2 py-2 text-sm`
                }
                >
                   <Settings className="mr-2 h-4 w-4" />
           

                   Paramètres
                </button>
              )}
            </Menu.Item>
            {
              email === "mahdi.chahri55@gmail.com" ? 
              <Menu.Item>
              {({ active }) => (
                <button
                onClick={() => {
                  set_current_page({payload:PAGES.SETTINGS})
                  router.push("/admin") } }
                  className={
                 `     ${ active ? 'bg-gray-50 dark:bg-stone-800 dark:text-white text-gray-900' : 'text-gray-900 dark:text-white'}
                    ${
                    current_page === PAGES.SETTINGS ? 'bg-blue-200 text-gray-900 font-semibold ' : ''  
                  }  group flex w-full gap-x-4 items-center rounded-md px-2 py-2 text-sm`
                }
                >
                   <ShieldAlert className="mr-2 h-4 w-4" />
                   Accès administrateur
                </button>
              )}
            </Menu.Item>
            : null
            }
            <Menu.Item>
              {({ active }) => (
                <button
                onClick={handleLogout}
                  className={`  ${ active ? 'bg-gray-50 dark:bg-stone-800 dark:text-white text-gray-900' : 'text-gray-900 dark:text-white'} group flex w-full  gap-x-4 items-center rounded-md px-2 py-2 text-sm`}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    se déconnecter
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    </div>
  )
                }