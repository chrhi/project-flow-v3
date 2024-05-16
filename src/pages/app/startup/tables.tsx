import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { useState } from "react";
import { Sidebar } from "~/components/sideBars/StaringUpSidebar";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { RowGridText } from "~/components/typography/RowGridText";
import { DataTable } from "~/components/common/constants/project-objectives-table/data-table";
import { columns , type  Objectives } from "~/components/common/constants/project-objectives-table/column";
import { api } from "~/utils/api";
import { getProjectMetaData } from "~/lib/MetaData";
import { toast } from "react-hot-toast";

const Page: NextPage = () => {

  const [isOpen , setIsOpen] = useState<boolean>(false)

  const [data , setData] = useState<Objectives[]>([] as Objectives[])

  const {refetch } = api.ProjectObjectivesRouter.getObjectives.useQuery({projectId : getProjectMetaData()}, {
    onSuccess : (data) => {
      const prepare =  data.map((item) :Objectives => {
        return {
          APPROVAL : item.APPROVAL || "", 
          id : item.id || "", 
          SUCCESS_CRITERIA : item.SUCCESS_CRITERIA || "", 
          THE_PROJECTS_OBJECTIVES : item.THE_PROJECTS_OBJECTIVES || "", 
          type : item.Type || ""
        }
      }  )
      setData(prepare)
    },
    onError : () => {
      toast.error("there is a error ")
    }
  })


 
  return (
    <>
    
      <Header />
      <main className=" scrollbar-hide  flex w-full bg-gray-50 ">
      <Sidebar setIsOpen ={setIsOpen} isOpen = {isOpen} />
      <FormContainer className ={` ${isOpen ? "lg:ml-[20rem]" : "ml-[0]"}`}>
    
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 lg:grid-cols-12  gap-6">
       <div className="col-span-6 lg:col-span-12 ">
       <RowGridText text="fixer les objectifs du projet " />
            <RowGridText small text=" Définir des objectifs de projet spécifiques, mesurables, réalisables, pertinents et limités dans le temps (SMART) qui énoncent clairement les résultats et les livrables souhaités, fournissant une direction et une orientation claires pour le projet" />
     
      <div   className="col-span-6 lg:col-span-12 ">
        <DataTable  columns={columns} data={data} refetch={refetch}  />
        </div>
        
        

    
        
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