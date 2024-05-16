/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { prisma } from "~/lib/prisma"
import { STAKHOLDER_TYPES } from "~/types/static/STATICDATA"
import { formatDate } from "~/utils/current-day"



export const getProjectCharter = async  ({projectId  } : {projectId : string }) => {

    const stakeholders = await prisma.stakeHolder.findMany({where :{ projectId } })
    const startup = await prisma.startup.findFirst({where :{ projectId }})
    const project = await prisma.project.findFirst({where :{id : projectId }})

    const objectives = await prisma.projectObjectives.findMany({where : { projectId }})

    const milestone = await prisma.mileStones.findMany({where : { projectId }})

 

    //get the project customer and sponser adn manager
    const projectManager = stakeholders.filter(item => item.type === "PROJECT_MANAGER")
    const projectCustomer = stakeholders.filter(item => item.type === "PROJECT_CUSTOMER")
    const projectScponser = stakeholders.filter(item => item.type === "PROJECT_SPONSER")

    // filter the project objectives 
    // const objectives_Perimeter = objectives.filter(item => item.Type === "Perimeter")
    // const objectives_Schedule = objectives.filter(item => item.Type === "Schedule")
    // const objectives_cost = objectives.filter(item => item.Type === "cost")

    const budget =   stakeholders.reduce((total , item ) => {
        if(item.type === STAKHOLDER_TYPES[0]?.value) {
         return total + Number(item.InvestmentAmount)
          }
        return total
       } , 0) 
   

    return (
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
          
            <title>Document</title>
        </head>
        
        <body>
            <style>
                @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap");
                * {
                   font-family: "Poppins", "sans-serif" !important ;
                 }
                 html {
                    -webkit-print-color-adjust: exact;
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
    <main class="w-[800px] mx-auto  p-[20px] ">
     
        <!-- introdection  -->
        <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
              <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class=" font-semibold leading-6 text-xl text-blue-500">Project charter</h1>
                        <h3 class="  leading-6 text-sm text-gray-900" > prepared at ${formatDate(new Date())}</h3>
                        <h3  class=" font-semibold leading-6 text-sm text-gray-900" > project customer : <span class="font-normal"> ${projectCustomer[0]?.name || " Direction Exploitation"}</span> </h3>
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class=" font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">${project?.title || "project without title"}</span>  </p>
    
                    <h3  class="  font-semibold leading-6 text-sm text-gray-900" > project Scponser :<span class="font-normal"> ${projectScponser[0]?.name || "multinational"}</span> </h3>
                    <h3  class="  font-semibold leading-6 text-sm text-gray-900" > project Manager :<span class="font-normal"> ${projectManager[0]?.name || "provide project manager"} </span> </h3>
                    
              </div>
        </div>
      
          <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="  font-semibold leading-6 text-md text-gray-900 text-start">Project Description</h2>
            <p class="  leading-6 text-sm text-gray-500">${startup?.ProjectDescription || "provide description"}</p>
        </div>
          <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="  font-semibold leading-6 text-md text-gray-900 text-start">High-Level Requirements</h2>
            <p class="  leading-6 text-sm text-gray-500">${startup?.HighLevelRequirements || "not provided"}</p>
        </div>
          <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="  font-semibold leading-6 text-md text-gray-900 text-start">High-Level Risks</h2>
            <p class="  leading-6 text-sm text-gray-500">${startup?.HighLevelRisks || "not provided" }</p>
        </div>
        
       
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4   ">
            <h2 class="  font-bold  leading-6 text-lg text-gray-900 text-start">Project objectives</h2>
        </div>
        
 <div class="relative w-[97%] mx-auto   ">
    <table class="w-full text-sm text-left  text-gray-400 ">
        <thead class="text-xs  uppercase  !bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                  
                </th>
                <th scope="col" class="px-6 py-3">
                    Project Objectives
                </th>
                <th scope="col" class="px-6 py-3">
                    Success Criteria
                </th>
                <th scope="col" class="px-6 py-3">
                    Person Approving
                </th>
              
            </tr>
        </thead>
        <tbody>
        ${
            objectives.map(item => {
                return `
                <tr class=" border-b !bg-gray-800 border-gray-700 no-break-inside ">
                <th scope="row" class="px-6 py-4 font-medium  text-white">
                    ${item.Type}
                </th>
                <td class="px-6 py-4">
                 ${item.THE_PROJECTS_OBJECTIVES}
                </td>
                <td class="px-6 py-4">
                 ${item.SUCCESS_CRITERIA}
                </td>
                <td class="px-6 py-4">
                  ${item.APPROVAL}
                </td>
            </tr>
                `
            })
        }
           
        </tbody>
    </table>
</div>

<div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
    <h2 class="  font-bold  leading-6 text-lg text-gray-900 text-start">Project Mile stones</h2>
</div>

<div class="relative w-[97%] mx-auto  ">
    <table class="w-full text-sm text-left  text-gray-400">
        <thead class="text-xs  uppercase  !bg-gray-700 text-gray-400">
            <tr>   
                <th scope="col" class="px-6 py-3">
                    Summary Milestones
                </th>
                <th scope="col" class="px-6 py-3">
                    Due Date
                </th>
            </tr>
        </thead>
        <tbody>
            ${
                milestone.map(item => {
                    return`
                    <tr class=" border-b !bg-gray-800 border-gray-700 no-break-inside ">
                    <th scope="row" class="px-6 py-4 font-medium  text-white">
                       ${item.name}
                    </th>
                    <td class="px-6 py-4">
                    ${formatDate(item?.dueDate || new Date())}
                    </td>
                </tr>
                    `
                })
            }
          
        </tbody>
    </table>
</div>


<div class="w-[97%] mx-auto  min-h-[20px] my-4  pt-1 flex justify-between items-start px-4 border no-break-inside ">
    <h2 class="  font-bold  leading-6 text-lg text-gray-900 text-start">Estimated Budget: €${ budget} </h2>
    <p class="  font-bold  leading-6 text-md text-gray-400 text-start" >${projectScponser[0]?.InvestmentAmount || ""}</p>
</div>

<div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
    <h2 class="  font-bold  leading-6 text-lg text-gray-900 text-start">stakeholders :</h2>
</div>

<div class="relative w-[97%] mx-auto   ">
    <table class="w-full text-sm text-left  text-gray-400">
        <thead class="text-xs  uppercase  !bg-gray-700 text-gray-400">
           
            <tr>   
                <th scope="col" class="px-6 py-3">
                    Stakeholder(s)
                </th>
                <th scope="col" class="px-6 py-3">
                    Role
                </th>
            </tr>
        </thead>
        <tbody>
         
            ${
                stakeholders.map(item => {
                    const row =   `
                        <tr class=" border-b !bg-gray-800 border-gray-700 no-break-inside ">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            ${item.name || ""}
                        </th>
                        <td class="px-6 py-4">
                         ${item.role || ""}
                        </td>
                    </tr>
                        `
                    return row
                })
            }
           
        </tbody>
    </table>
</div>

    </main>
</body>
<script src="https://cdn.tailwindcss.com" ></script>

</html>
        `
    )
}