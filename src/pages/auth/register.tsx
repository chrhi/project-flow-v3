/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import { type   FormEvent,  useState } from "react";
import Link from "next/link";
import { AbdullahButton, buttonVariants } from "~/components/used/AbdullahButton";
import { NotAuthHeader } from "~/components/header/NotAuthHeader";
import toast from 'react-hot-toast';
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const Page: NextPage = () => {


  const router = useRouter();


  const [formData , setFormData] = useState({
    password : "",
    email : "",
    confirmPassword : "",
    userName : ""
  })
  

  const mutation = api.userRouter.createUser.useMutation({
    onSuccess(data) {
      toast.success(`new user has been created`)
      router.push("/")
    },
    onError(error){
      toast.error("something went wrong")
      console.log(error)
    }
  })

  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()
    if(formData.email === "" ||formData.password === "" ){
      toast.error("both email and password are required")
       return
    }
    if(formData.password !== formData.confirmPassword){
      toast.error("passwords should match")
       return
    }
  
    mutation.mutate({
      email : formData.email,
      password  : formData.password,
      username : formData.userName
    })
  }

  return (
    <>
     
      <NotAuthHeader  />
      <main className=" w-full custom-hieght-navbar bg-white flex justify-center pl-16 items-center  ">
        
      <div className="w-[50%] max-w-md p-4 bg-white border shadow-2xl border-gray-200 rounded-md  sm:p-6 md:p-8 ">
    <form className="space-y-6" action="#">
        <h5 className="text-xl font-medium text-gray-900 ">S'inscrire. </h5>
        <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Votre nom d'utilisateur.</label>
            <input
            onChange={(e) => setFormData({...formData , userName : e.target.value})}
            type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="nom" required />
        </div>
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Votre adresse e-mail.</label>
            <input
            onChange={(e) => setFormData({...formData , email : e.target.value})}
            type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
        </div>
        <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Votre mot de passe.</label>
            <input  
            onChange={(e) => setFormData({...formData , password : e.target.value})}
            type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
        </div>
        <div>
            <label htmlFor="Confirmpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmez votre mot de passe.</label>
            <input  
             onChange={(e) => setFormData({...formData , confirmPassword : e.target.value})}
            type="password" name="Confirmpassword" id="Confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
        </div>
      
      
          <AbdullahButton
           className={buttonVariants({size :'lg' , variant :'rukia'})}
           isLoading ={mutation.isLoading}
          onClick={(e :FormEvent) => handleSubmit(e)}
      >
       create my account
      </AbdullahButton>
        <div className="text-sm font-medium text-gray-500 ">
        Have an account? <Link href="/" className="text-blue-500 hover:underline ">log in</Link>
        </div>
    </form>
</div>

      </main>
    </>
  );
};

export default Page;