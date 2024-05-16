export const get_risk_managment_plan = () => {


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
    <main class="w-[800px] mx-auto  p-[20px] ">
     
        <!-- introdection  -->
        <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
              <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class="text-base font-semibold leading-6 text-xl text-blue-500"> Risk managment plan</h1>
                        <h3 class="text-base  leading-6 text-sm text-gary-400" > prepared at 22/05/2018</h3> 
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">of control systems and re-instrumentation of 19 furnaces</span>  </p>   
              </div>
        </div>
        <!-- title description -->
          
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Methodology</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime architecto nostrum alias sint dolorum, repellat esse possimus, perspiciatis id hic, doloremque animi quaerat ea! Nemo quibusdam quaerat eligendi architecto perspiciatis?</p>
           </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Roles and Responsibilities</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, assumenda nesciunt fugit magnam vitae nulla ab eligendi non, velit praesentium harum consequatur rem temporibus deleniti et minima doloribus, ut eum.</p>
           </div>
              <!-- title description -->
        <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Risk Categories</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus porro saepe minima sapiente deleniti labore voluptatem molestiae quo, non nemo cum odit recusandae eaque velit beatae earum veritatis repellendus impedit!</p>
        </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Risk Management Funding</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et omnis tempora consequuntur dolorem at non nulla, optio quas, perferendis fugit nisi consectetur eveniet quos? Illum temporibus ipsam velit dolorem debitis.</p>
        </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Contingency Protocols</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam praesentium maiores atque et nobis dolores veniam, mollitia quasi obcaecati non temporibus quo numquam dolor quod voluptatum. Omnis excepturi debitis inventore.</p>
           </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Frequency and Timing</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis laboriosam doloremque, officiis eligendi dicta cum quidem ipsa porro totam eius sunt aliquid nulla quos. Odit, veniam modi? Enim, labore modi!</p>
           </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Stakeholder Risk Tolerances</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla officiis praesentium totam eum amet, quasi et esse eaque quia enim ad impedit doloribus dignissimos hic odit omnis perferendis numquam ex!</p>
           </div>
           <!-- title description -->
           <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Tracking and Audit</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi laboriosam incidunt eius alias, iusto perspiciatis quisquam officiis enim ea quae impedit totam ut dolorum consequuntur aspernatur nemo repellendus animi blanditiis.</p>
           </div>

           <!-- this is a title -->
          
           <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start"> Definitions of Probability</h2>
          </div>

          <!-- this is a table -->

           <div class="relative w-[97%] mx-auto  no-break-inside ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400"> <tr>   <th scope="col" class="px-6 py-3"></th> <th scope="col" class="px-6 py-3"></th> </tr></thead>
                <tbody>
                    <tr class=" border-b !bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Very high
                        </th>
                        <td class="px-6 py-4">
                        
                        </td>
                    </tr>
                    <tr class=" border-b !bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            High
                        </th>
                        <td class="px-6 py-4">
                        
                        </td>
                    </tr>
                    <tr class=" border-b !bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Medium
                        </th>
                        <td class="px-6 py-4">
                        
                        </td>
                    </tr>
                    <tr class=" border-b !bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Low
                        </th>
                        <td class="px-6 py-4">
                        
                        </td>
                    </tr>
                    <tr class=" border-b !bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Very low
                        </th>
                        <td class="px-6 py-4">
                        
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