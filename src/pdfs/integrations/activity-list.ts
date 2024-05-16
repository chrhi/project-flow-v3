/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { prisma } from "~/lib/prisma"
import { formatDate } from "~/utils/current-day"

export const get_Activity_list = async ({projectId} : {projectId : string}) => {

    const tasks = await prisma.tasks.findMany({where :{projectId}})

    const stakeholders = await prisma.stakeHolder.findMany({where :{ projectId } })
   
    const project = await prisma.project.findFirst({where :{id : projectId }})

   


    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous" defer></script>
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
        <main class="w-[800px] mx-auto   p-[20px] ">
        
        <!-- introdection  -->
        <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
              <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class=" font-semibold leading-6 text-xl text-blue-500"> Activity List</h1>
                        <h3 class=" leading-6 text-sm text-gary-700" > prepared at ${formatDate(new Date())}</h3> 
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class=" font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">${project?.title}</span>  </p>   
              </div>
        </div>
        <!-- title description -->
        <div class="relative w-[97%]  mx-auto   ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                       
                        <th scope="col" class="px-6 py-3">
                           Id
                        </th>
                        <th scope="col" class="px-6 py-3">
                             Activity 
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Description of Work
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
               
                         ${
                            tasks.map((item , index ) => {
                                return `
                                <tr class=" border-b bg-gray-800 border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium  text-white">
                                    ${index}
                                </th>
                                <td class="px-6 py-4 font-medium  text-white" >
                                 ${item.title}
                                </td>
                                <td  class="px-6 py-4 font-medium  text-white">
                                  ${item.description}
                                </td>
                             
                            </tr>
                                `
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </main>
    </body>
    </html>
    `
}