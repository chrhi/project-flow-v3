import { type NextPage } from "next";
import Head from "~/components/common/Head";
import { Header } from "~/components/header/Header";
import { AbdullahButton, buttonVariants } from "~/components/used/AbdullahButton";
import { api } from "~/utils/api";
import { useEffect , useState } from "react";
import { getUserMetadata } from "~/lib/MetaData";
import { ImagePickUp } from "~/components/common/ImagePickUp";
import toast from "react-hot-toast";
import { userReducer } from "~/store/userReducer";

const Page: NextPage = () => {

  const [inputs , setInputs ] = useState({
    name : "",
    lastName : "",
    phone : "",
    email : "",
    AccountType : "" ,
    zipCode : "",
    location : "",
    id : ""
  })
  const [photo , setPhoto ] = useState("")

  const setUser = userReducer(state => state.set_user)

  const {isLoading , refetch} = api.userRouter.getUser.useQuery({id : getUserMetadata()}, {
    onSuccess : (data) => {
        if(!data.id){
          toast.error("user do not have an id")
          return
        }
        setInputs({
          id : data?.id || "",
          name : data?.name || "" ,
          lastName : data?.lastName || "",
          phone : data?.phone || "",
          email : data?.email || "" , 
          AccountType : data?.type || "",
          zipCode : data?.zipCode || "",
          location : data?.location || ""
        })
        setPhoto(data.photo || "")

    }, 
    onError : () => {
      toast.error("there is an error somewhere")
    }
  })

  const mutation = api.userRouter.updateUser.useMutation({
     onSuccess : async (data) => {
      toast.success("yout account has been updated")
      if(!data?.email || !data.name || !data?.photo || !data?.lastName ) {
        return
      }
      setUser({
          email : data?.email  ,  
          name : data.name ,
          photo : data?.photo , 
          lastName : data?.lastName

      })
      await refetch()
      
    }, 
    onError : () => {
      toast.error("there is an error somewhere")
    }
  })

  const handleSubmit = () => {
    mutation.mutate({
      name : inputs.name , 
      lastName : inputs.lastName , 
      location : inputs.location , 
      phone : inputs.phone , 
      photo : photo , 
      userId : getUserMetadata() , 
      zipCode : inputs.zipCode 
    })
  }


  return (
    <>
      <Head />
    
      <Header />

      <main className=" custopn-page-height   items-center pt-8 flex flex-col w-full bg-gray-50 ">
        <div className="w-full h-[70px] flex justify-center items-start  flex-col px-8">
          <h1 className="text-3xl font-semibold text-gray-900 ">Profile's informations</h1>
          <p className="text-lg  text-gray-700 " >this is a dommy data this is going to be displayed in here </p>
        </div>
      <div className=' max-w-5xl w-full mx-auto rounded-lg  h-fit min-h-[300px] flex my-4   bg-white '>
          
          <div className='lg:w-[20%] w-full h-full flex flex-col items-center px-4 gap-y-4 pt-4'>
            <p className='text-gray-400 text-lg  '>photo profile</p>
            <img  src={photo} alt="picture photo" className="w-[80px] h-[80px] rounded-[50%] "/>
          <ImagePickUp setPhoto={setPhoto} />
        </div>
       
          <div className="w-[80%] h-full flex gap-y-4 flex-col p-4 ">
            {/* this is the second div */}
          <div className="w-full h-[50px] flex gap-x-4  items-center justify-between ">
          <div className="flex w-[50%] justify-between  items-center gap-x-2">
                <p>First name :</p>
                <input value={inputs.name } onChange={({target}) => setInputs({...inputs , name : target.value })} className="px-4 py-1.5 h-[40px] max-w-[70%] rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
            </div>
            <div className="flex  w-[50%] justify-between items-center gap-x-2">
                <p>last name :</p>
                <input value={inputs.lastName } 
                 onChange={({target}) => setInputs({...inputs , lastName : target.value })}
                className="px-4 py-1.5 h-[40px] max-w-[70%] rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
            </div>
          </div>
          {/* this is the second div */}
           <div className="w-full flex h-[50px] gap-x-4 items-center justify-between ">
              <div className="flex  w-[50%] justify-between  items-center gap-x-2">
                   <p>phone:</p>
                   <input value={inputs.phone} 
                    onChange={({target}) => setInputs({...inputs , phone : target.value })}
                   className="px-4 py-1.5 h-[40px] max-w-[70%] rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
              </div>
              <div className="flex  w-[50%] justify-between items-center gap-x-2">
                  <p>email :</p>
                  <input disabled value={inputs.email} 
                  
                  className="px-4 py-1.5 text-gray-700  h-[40px] max-w-[70%] rounded-lg outline-none border   transition ease-in shadow-sm w-full" />
               </div>
           </div>
           {/* this is the divided section */}
           <div className="w-full flex  items-center  h-[40px] justify-between ">
            <p className="font-semibold ">OTHER INFORMATION</p>
            <div className="w-[70%]  border-b h-[5px]" />
           </div>
           {/* this is the rest of the Profile */}
           <div className="w-full  flex flex-col gap-y-4 ">
               <div className="flex  w-full justify-between  items-center gap-x-2">
                   <p>Job title</p>
                   <input 
                   value={inputs?.id}
                   disabled className="px-4 py-1.5 h-[40px]  rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-[80%]" />
                </div>
                <div className="flex   w-full justify-between  items-center gap-x-2">
                   <p>Department or team</p>
                   <input disabled value={inputs?.AccountType} className="px-4 py-1.5 h-[40px]  rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in w-[80%]" />
                </div>
                <div className="flex  w-full justify-between  items-center gap-x-2">
                   <p>About me</p>
                   <textarea value={inputs?.zipCode}   onChange={({target}) => setInputs({...inputs , zipCode : target.value })}  className="px-4 py-1.5 h-[40px]  rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-[80%]" />
                </div>
                <div className="flex  w-full justify-between  items-center gap-x-2">
                   <p>location</p>
                   <input value={inputs?.location}
                   onChange={({target}) => setInputs({...inputs , location : target.value })}
                   className="px-4 py-1.5 h-[40px]  rounded-lg outline-none border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-[80%]" />
                 </div>
                
           </div>
           <div className="w-full h-[50px] items-center justify-start flex ">
             <AbdullahButton
             onClick={handleSubmit}
             isLoading={mutation.isLoading}
               className={`${buttonVariants({size:"sm", variant:'primary'})} font-semibold`}
               >
                        save changes
              </AbdullahButton>
           </div>
          </div>
       </div>
      </main>
    </>
  );
};

export default Page;