import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import { useState } from "react";
import { Sidebar } from "~/components/sideBars/StaringUpSidebar";
import { Form } from "~/components/used/Form";
import { FormContainer } from "~/components/used/FormContainer";
import { loading_Reducer } from "~/store/app-reducer/loadingReducer";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { getProjectMetaData } from "~/lib/MetaData";
import { getColor } from "~/utils/formate/getColor";
import { ConfirmePopUpDeleteStakeHolder } from "~/components/popup/table-confirm/delete-stakeholder-con";
import { Badge } from "@tremor/react";
import { DataTable } from "~/components/common/constants/stakholder-table/data-table";
import { Stakholder , columns } from "~/components/common/constants/stakholder-table/column";
import { PlaceHolderTbale } from "~/components/common/table-place-holder";
import { StakeHolder } from "~/components/popup/StakeHolder";
import { RowGridText } from "~/components/typography/RowGridText";


const Page: NextPage = () => {

  const [isOpen , setIsOpen] = useState<boolean>(false)
  const [stakeholders , setStakeHolders] = useState<Stakholder[]>([] as Stakholder[])


  const {isFetching , refetch} = api.StakeHolderRouter.get_stakeholders.useQuery({projectId : getProjectMetaData()}, {
    onSuccess(data) {
      const AbdullahData  = data.map(item =>{
        return {
          id : item.id,
          name : item.name,
          email:  item.contact,
          impact:  item.impact?.toLowerCase(),
          type : item.type,
        }
      })
    setStakeHolders( AbdullahData as Stakholder[] )
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
        <StakeHolder refetch={refetch} />
      <ConfirmePopUpDeleteStakeHolder refetch={refetch} />
      <Form  >
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6  lg:grid-cols-12 gap-6">
            <div className="col-span-6 lg:col-span-12">
            <RowGridText text=" Gestion des parties prenantes " />
            <RowGridText small text="Gérer efficacement les parties prenantes en identifiant leurs besoins, leurs attentes et leurs impacts potentiels sur le projet, et les impliquer tout au long du cycle de vie du projet" />
            {false ? <PlaceHolderTbale /> :    <DataTable refetch={refetch} columns={columns} data={stakeholders} />  }
         
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