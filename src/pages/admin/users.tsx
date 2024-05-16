import { type NextPage } from "next";
import { HeaderAdmin } from "~/components/header/admin-header/HeaderAdmin";
import { DataTable } from "~/components/common/constants/users-table/data-table";
import { columns } from "~/components/common/constants/users-table/column";
import { api } from "~/utils/api";
import toast from "react-hot-toast"
import MaxWidthWrapper from "~/components/layout/MaxWidthWrapper";
import { useState } from "react";
import { formatDateAlgeria } from "~/lib/utils";
import { PlaceHolderTbale } from "~/components/common/table-place-holder";

import { ConfirmePopUpDeleteUser } from "~/components/popup/table-confirm/delete-user-pop-up";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";


const Page: NextPage = () => {

  const [users , setUsers] = useState<any[]>([])

  const {isLoading , refetch} = api.userRouter.getAllUser.useQuery(undefined ,  {
      onSuccess(data){
      const ModifiedArray =   data.map(item => {
        return {
          id : item.id , 
          firstName: item.name,
          email: item.email,
          LastName : item.lastName ,
          // type :   item.type ,
          // street : item.location , 
          // phone : item.phone , 
          // zipCode : item.zipCode , 
          // createdAt : formatDateAlgeria(item.createdAt) , 
          status :   item.status || "not provided" ,
          // password : item.passwordForAdmin
        }
        })
        setUsers(ModifiedArray)
        toast.success("we have get all the users")
      },
      onError(){
        toast.error("failed to fetch the users")
      }
  })

  return (
    <>
    <HeaderAdmin />
      <main className=" w-full custom-hieght-navbar bg-stone-50   ">
       
        <MaxWidthWrapper className="flex flex-col  p-8">
        <ConfirmePopUpDeleteUser refetch={refetch} />
         
          
        <Card className="mt-4">
      <CardHeader>
        <CardTitle>Tableau de gestion des utilisateurs</CardTitle>
        <CardDescription>
        Le tableau de gestion des utilisateurs est crucial pour offrir un service client personnalisé, prendre des décisions éclairées en marketing et renforcer la fidélisation des clients.
        </CardDescription>
      </CardHeader>
    
          <CardContent>
        
          {isLoading ? <PlaceHolderTbale /> :  <DataTable columns={columns} data={users} refetch={refetch}/> }
          </CardContent>
      
     
    </Card>
      
           
        </MaxWidthWrapper>
        
      </main>
    </>
  );
};

export default Page;