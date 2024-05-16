import { type NextPage } from "next";
import Head from "~/components/common/Head";
import { Header } from "~/components/header/Header";
import { AbdullahButton, buttonVariants } from "~/components/used/AbdullahButton";
import { api } from "~/utils/api";
import { useEffect , useState } from "react";
import { getUserMetadata } from "~/lib/MetaData";
import  toast  from "react-hot-toast";
import { Label } from "~/components/ui/label";

const Page: NextPage = () => {

  const [inputs , setInputs ] = useState({
    password : "",
    newPassword : "",
    confirmNewPassword : ""
  })
  
  const mutation = api.userRouter.updateUserPassword.useMutation({
    onSuccess(data) {
      toast.success("your password has been updated successfully")
    },
    onError(){
      toast.error("failed to update password")
    }
  })

  const handleSubmit = () => {
    if(inputs.newPassword !== inputs.confirmNewPassword){
      toast.error("passwords should match")
      return
    }
    if(getUserMetadata() === "73ceab8c-88ba-4150-be71-1654f3bd5e8e"){
      toast.error("sorry this is not going to work for this account")
      return
    }
    mutation.mutate({
      userId : getUserMetadata(),
      password : inputs.password , 
      newPassword : inputs.newPassword
    })
  }



  return (
    <>
      <Head />
    
      <Header />

      <main className=" custopn-page-height  items-center pt-8 flex flex-col w-full bg-gray-50 ">
        <div className="w-full h-[70px] flex justify-center items-start  flex-col px-8">
          <h1 className="text-3xl font-semibold text-gray-900 ">Paramètres de mot de passe</h1>
          <p className="text-lg  text-gray-700 " >En modifiant votre mot de passe, toutes vos sessions actives seront déconnectées </p>
        </div>

        <div className='  w-full max-w-5xl  p-4 mx-auto rounded-lg   h-fit min-h-[300px] flex flex-col  my-4   bg-white '>
        
        <div className="flex  w-full flex-col my-2 mt-4   p-4 items-start gap-x-2">
                   <Label>Mot de passe actuel</Label>
                   <input 
                   value={inputs.password} 
                   type="password"
                    onChange={({target}) => setInputs({...inputs , password : target.value })}
                   className="px-4 py-1.5 h-[40px] mt-1 rounded-lg outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
         </div>
         <div className="flex gap-x-4 w-full p-4 my-2 mb-2 h-[60px] items-center">

              <div className="flex  w-[50%] flex-col  justify-start  items-start gap-x-2">
                   <Label>Nouveau mot de passe</Label>
                   <input value={inputs.newPassword} type="password"
                    onChange={({target}) => setInputs({...inputs , newPassword : target.value })}
                   className="px-4 py-1.5 h-[40px] mt-1  rounded-lg outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
              </div>

               <div className="flex  w-[50%] flex-col  items-start gap-x-2">
                   <Label>Confirmez le nouveau mot de passe</Label>
                   <input value={inputs.confirmNewPassword} type="password"
                    onChange={({target}) => setInputs({...inputs , confirmNewPassword : target.value })}
                   className="px-4 py-1.5 h-[40px] mt-1  rounded-lg outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition ease-in  w-full" />
               </div>


         </div>
         
             <div className="w-full h-[50px] p-4 my-4 items-center justify-end flex ">
                 <AbdullahButton 
                 onClick={handleSubmit}
                 isLoading={mutation.isLoading}
                 className={`${buttonVariants({size:"sm", variant:'primary'})} font-semibold`}>
                      Enregistrer les modifications
                 </AbdullahButton>
             </div>
        </div>
      </main>
    </>
  );
};

export default Page;