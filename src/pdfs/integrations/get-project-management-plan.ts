/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { prisma } from "~/lib/prisma"
import { formatDate } from "~/utils/current-day"

export const get_project_managment_plan = async ({projectId} : {projectId : string}) => {
    const project = await prisma.project.findFirst({where :{id : projectId }})
    const planning =  await prisma.planning.findFirst({
        where :{
          projectId : projectId
        }
      })
    
    if(!planning ) return

    const formData = await  prisma.managementPlan.findFirst({
        where : {
            PlanningId :  planning.id
        }
    })

    const projectLifeCycle = await  prisma.projectLifeCycle.findMany({
        where : {
            PlanningId :  planning.id
        }
    })

    return`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <title>Document</title>
</head>

<body>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");
        * {
           font-family: "Poppins", "sans-serif" !important ;
         }
         @media print {
             body {
               font-size: 16px;
                color: lightgrey;
             }

              .no-break-inside {
                  /* apply this class to every component that shouldn't be cut off between two pages of your PDF */
                  break-inside: avoid;
             }

            .break-before {
            /* apply this class to every component that should always display on the next page */
            break-before: always;
  }
}
      
    </style>
    <main class="w-[800px] mx-auto flex flex-col items-start  p-[20px] ">
     
    <!-- introdection  -->
    <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
          <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                    <h1 class=" font-semibold leading-6 text-xl text-blue-500"> Project Managment Plan</h1>
                    <h3 class=" leading-6 text-sm text-gray-900 " > prepared at ${formatDate(new Date())}</h3> 
          </div>
          <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
            <p class=" font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">${project?.title}</span>  </p>   
          </div>
    </div>
        
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start">Project Life Cycle</h2>
        </div>
        
        <div class="relative w-[97%]  mx-auto   ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                       
                        <th scope="col" class="px-6 py-3">
                           PHASE
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Key Deliverables
                        </th>
                    </tr>
                </thead>
                <tbody>  
                 
                    ${
                        projectLifeCycle.map(item => (
                            `
                        <tr class=" border-b no-break-inside bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                          ${item.Phase}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${item.KeyDeliverables}
                        </td>
                     
                        </tr>
                     `
                        )) 
                    }
                 
                </tbody>
            </table>
        </div>
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start">Project Management Processes and Tailoring Decisions</h2>
        </div>
       
       
        <div class="relative w-[97%]  mx-auto  no-break-inside ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                       
                        <th scope="col" class="px-6 py-3">
                            Knowledge Area
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Processes
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tailoring Decisions
                        </th>
                    </tr>
                </thead>
                <tbody>  
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Integration
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                         ${formData?.IntegrationProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.IntegrationProcesses}
                        </td>
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Scope
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                              Time
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.TimeProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.TimeTailoringDecisions}
                        </td>
                    </tr>
                  
                    
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Cost
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.CostProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.CostTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Quality
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.QualityProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.QualityTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Human Resources
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.HumanResourcesProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.HumanResourcesTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Communication
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.CommunicationProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.CommunicationTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Risk
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.RiskProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.RiskTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Procurement
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ProcurementProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ProcurementTailoringDecisions}
                        </td>
                    </tr>
                         
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Stakeholders
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.StakeholdersProcesses}
                        </td>
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.StakeholdersTailoringDecisions}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start"> Process Tools and Techniques</h2>
        </div>
        <div class="relative w-[97%]  mx-auto  no-break-inside ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                       
                        <th scope="col" class="px-6 py-3">
                            Knowledge Area
                        </th>
                       
                        <th scope="col" class="px-6 py-3">
                            Tailoring Decisions
                        </th>
                    </tr>
                </thead>
                <tbody>  
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Integration
                        </td>
                      
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeTailoringDecisions}
                        </td>
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Scope
                        </td>
                
                    
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                              Time
                        </td>
                     
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeTailoringDecisions}
                        </td>
                    </tr>
                  
                    
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Cost
                        </td>
                     
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.CostProcesses}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Quality
                        </td>
                      
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.QualityProcesses}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Human Resources
                        </td>
                       
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.HumanResourcesProcesses}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Communication
                        </td>
                       
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ScopeTailoringDecisions}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Risk
                        </td>
                       
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.RiskProcesses}
                        </td>
                    </tr>

                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Procurement
                        </td>
                      
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.ProcurementProcesses}
                        </td>
                    </tr>
                         
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4  font-medium  text-white ">
                            Stakeholders
                        </td>
                      
                        <td class="px-6 py-4  font-medium  text-white ">
                        ${formData?.StakeholdersProcesses}
                    </tr>
                </tbody>
            </table>
        </div>

       
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start">  Variances and Baseline Management</h2>
        </div>
      
        <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Scope Variance (Écart de périmètre)</h2>
            <p class="text-base leading-6 text-sm text-gray-500">
            Le schedule variance mesure l'écart entre le calendrier réel du projet et le calendrier prévu dans la ligne de base du calendrier. Il indique si le projet est en retard ou en avance par rapport à la planification initiale. Un écart positif indique un retard, tandis qu'un écart négatif indique une avance par rapport au calendrier prévu. La gestion de la ligne de base du calendrier implique le suivi des activités, la mise à jour du calendrier, l'identification des retards potentiels et la mise en œuvre de mesures correctives pour respecter les échéances établies.
            </p>
        </div>

        <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Cost Variance (Écart de coût) </h2>
            <p class="text-base leading-6 text-sm text-gray-500">Le cost variance mesure l'écart entre les coûts réels du projet et les coûts prévus dans la ligne de base des coûts. Il indique si le projet est en train de respecter le budget établi. Un écart positif indique des dépassements de coûts, tandis qu'un écart négatif indique des économies réalisées par rapport au budget prévu. La gestion de la ligne de base des coûts implique le suivi des dépenses, l'identification des écarts de coûts, l'analyse des raisons des écarts et la prise de mesures correctives pour maîtriser les coûts du projet.</p>
        </div>

        <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Baseline Management (Gestion des références)</h2>
            <p class="text-base leading-6 text-sm text-gray-500">La gestion des références consiste à maintenir, surveiller et contrôler les différentes lignes de base établies pour le périmètre, le calendrier et les coûts du projet. Cela implique de documenter et de mettre à jour les références initiales, de suivre les variations par rapport à ces références, de prendre des mesures correctives lorsque des écarts sont identifiés, et de s'assurer que toutes les modifications apportées aux références sont dûment évaluées et approuvées. La gestion des références garantit la cohérence et le contrôle des objectifs du projet tout au long de sa réalisation.</p>
        </div>








        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Project Reviews</h2>
            <p class="text-base leading-6 text-sm text-gray-500">${formData?.ProjectReviews}</p>
        </div>
        
        
    </main>
</body>
</html>
    
    `




}