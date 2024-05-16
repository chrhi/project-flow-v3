import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { useState } from "react";
import { Sidebar } from "~/components/sideBars/StaringUpSidebar";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { DataTable } from "~/components/common/constants/risks-table/data-table"
import { RiskType , columns } from "~/components/common/constants/risks-table/column";
import { RowGridText } from "~/components/typography/RowGridText";
import { api } from "~/utils/api";
import { getProjectMetaData } from "~/lib/MetaData";
import toast from "react-hot-toast";
import { ConfirmDeletePopUpRisks } from "~/components/popup/table-confirm/delete-risk-popup";




const Page: NextPage = () => {

  const [isOpen , setIsOpen] = useState<boolean>(false)

  const [risks , setRisks ] = useState<any[]>([])

  const { refetch} = api.riskRouter.getRisks.useQuery({projectId : getProjectMetaData()}, {
    onSuccess(data) {
      const AbdullahData  = data.map(item =>{
        return {
          id : item.id,
          title : item.name,
          discreption : item.description,
          solution : item.solutions,
          status : item.levelOfDanger,
          cost : Number(item.cost)
        }
      })
      setRisks( AbdullahData  )
    },
    onError(){
      toast.error("error fetching the data")
    },
    retryOnMount : false 
  })
    
  

   
  return (
    <>
    
      <Header />
      <main className="   flex w-full bg-gray-50 ">
      <Sidebar setIsOpen ={setIsOpen} isOpen = {isOpen} />
       <FormContainer className ={` ${isOpen ? "lg:ml-[20rem]" : "ml-[0]"}`}>
     
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 lg:grid-cols-12  gap-6">
            <div className="col-span-6 lg:col-span-12">
            <RowGridText text=" Gestion des risques" />
            <RowGridText small text="Gérer de manière proactive les risques du projet en identifiant, évaluant et hiérarchisant les risques potentiels, en élaborant des stratégies d'atténuation et en surveillant et contrôlant régulièrement les risques tout au long du cycle de vie du projet afin de minimiser leur impact sur les objectifs du projet" />
            <ConfirmDeletePopUpRisks  refetch={refetch} />
            <DataTable refetch={refetch} columns={columns} data={risks} /> 
       
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