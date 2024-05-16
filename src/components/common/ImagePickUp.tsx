import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'


const Galory = [
    {
        url : "https://i.pinimg.com/originals/85/bd/d1/85bdd1c465ac4422c217ca5456998c88.jpg"
    },
    {
        url : "https://i.pinimg.com/474x/73/4e/51/734e515cd773648598ce19ae30153f5f.jpg"
    },
    {
        url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZF205-Z6KcpXDT3xvyE8iYQsOZ7DWmUjg6fusgTF5qpMfqgKotzf2luIJyX59xZTkyNE&usqp=CAU"
    },
    {
        url : "https://preview.redd.it/how-do-you-get-this-specific-summoner-icon-viking-poro-v0-91hq6enggf6a1.jpg?width=300&format=pjpg&auto=webp&s=cd8c7bda94da856c9e1a49879d8774964e921df8"
    },
    {
        url : "https://i.pinimg.com/originals/20/62/f2/2062f2b8c7ca2988cb24824eb00b1221.jpg"
    },
    {
        url : "https://preview.redd.it/h3dm0wjv89m91.jpg?width=600&format=pjpg&auto=webp&s=1bf60f9668a0969bb491ea97daba15b264af0c45"
    },
    {
        url : "https://avatarfiles.alphacoders.com/313/313956.jpg"
    },
    {
        url : "https://static-cdn.jtvnw.net/jtv_user_pictures/fgh1108-profile_image-eb93bc3797dd13c3-300x300.jpeg"
    },
    {
        url : "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt120105349c8e60d4/609ae487ea72f24924be0b05/WRSapphirePoro_512.jpg"
    }
]


interface Props {
   
    setPhoto: Dispatch<SetStateAction<string>>
}



export  function ImagePickUp ({ setPhoto} : Props) {
  const [isOpen, setIsOpen] = useState(false)

 

 
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
     
     <button
     onClick={openModal}
           className="inline-block bg-white rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
           >
            change
    </button>
     

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
            <div className="fixed inset-0  bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0  overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[400px] h-[400px] flex flex-wrap gap-8  z-[100]  transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                {Galory.map(item => (
                   <div
                   
                   className='w-fit h-fit cursor-pointer ' key={item.url} onClick={() => {
                    setPhoto(item.url)
                    closeModal()
                   }} >
                     <img src={item.url} alt="select imahe "  className="w-[90px] h-[90px] "  />
                   </div>
                ))}
                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
