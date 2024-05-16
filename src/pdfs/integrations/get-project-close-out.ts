export const get_project_close_out = () => {
    return  `
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
    <main class="w-[800px] mx-auto   p-[20px] ">
     
        <!-- introdection  -->
        <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
              <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class="text-base font-semibold leading-6 text-xl text-blue-500"> project close out</h1>
                        <h3 class="text-base  leading-6 text-sm text-gary-400" > prepared at 22/05/2018</h3> 
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">of control systems and re-instrumentation of 19 furnaces</span>  </p>
                <h3  class="text-base font-semibold leading-6 text-sm text-gray-900" > project Manager :<span class="font-normal"> abdullah chehri</span> </h3>   
              </div>
        </div>
        <!-- title description -->
          <!-- title description -->
          <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Project Description</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati natus beatae, veritatis tempore repellendus consectetur iusto rem, libero quas totam iste eius repellat dolorum quidem, accusantium inventore laborum laboriosam dolore!</p>
        </div>
        
        <!-- this is a title -->
          
        <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start"> Performance Summary</h2>
        </div>

         <!-- title description -->
         <div class="relative w-[97%] mx-auto  no-break-inside ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Project Objectives
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Completion Criteria
                        </th>
                        <th scope="col" class="px-6 py-3">
                            How Met
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Scope
                        </th>
                        <td class="px-6 py-4 font-medium  text-white">
                           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                       
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Quality
                        </th>
                        <td class="px-6 py-4 font-medium  text-white">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                       
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Time
                        </th>
                        <td class="px-6 py-4 font-medium  text-white">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                       
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Cost
                        </th>
                        <td class="px-6 py-4 font-medium  text-white">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi necessitatibus hic perferendis, expedita minus facere dolorem distinctio odit quaerat, in 
                        </td>
                       
                    </tr>
                </tbody>
            </table>
        </div>

        
    </main>
</body>
</html>
    `
}