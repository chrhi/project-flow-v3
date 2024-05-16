import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { useState } from "react";
import { Sidebar } from "~/components/sideBars/StaringUpSidebar";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { RowGridText } from "~/components/typography/RowGridText";
import { DataTable } from "~/components/common/constants/mile-stone-table/data-table";
import { api } from "~/utils/api";
import { columns ,type MileStone } from "~/components/common/constants/mile-stone-table/column";
import { getProjectMetaData } from "~/lib/MetaData";
import { toast } from "react-hot-toast";


const Page: NextPage = () => {

  const [data , setData] = useState<MileStone[]>([] as MileStone[])

  const {refetch} = api.mileStoneRouter.getMilestones.useQuery({ projectId : getProjectMetaData()} , {
    onSuccess(data) {
      const prepare = data.map((item ): MileStone  => {
        return {
            date : item.dueDate || new Date() , 
            description : item.description || "", 
            id : item.id  || "", 
            mileStone : item.name || "", 
           
        }
      })
      setData(prepare  )
    },
    onError: () => {
      toast.error("failed to fetch the milestones")
    }
  })
 
  

  const [isOpen , setIsOpen] = useState<boolean>(false)

 

 
    


  return (
    <>  
      <Header />
      <main className="   flex w-full bg-gray-50 ">
      <Sidebar setIsOpen ={setIsOpen} isOpen = {isOpen} />
       <FormContainer className ={` ${isOpen ? "lg:ml-[20rem]" : "ml-[0]"}`}>
     
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 lg:grid-cols-12  gap-6">
            <div className="col-span-6 lg:col-span-12 ">
            <RowGridText text="gestion des jalons " />
            <RowGridText small text="Un jalon dans la gestion de projet est un événement ou un point significatif qui marque l'achèvement d'un livrable ou d'une étape majeur, servant de référence pour suivre les progrès et communiquer les avancées du projet." />

            </div>
            <div  className="col-span-6 lg:col-span-12  ">
            <DataTable columns={columns} data={data} refetch={refetch} />
            </div>
        </div>
      </div>
   
       </Form>
  </FormContainer>
      </main>
    </>
  );
};

export default Page;