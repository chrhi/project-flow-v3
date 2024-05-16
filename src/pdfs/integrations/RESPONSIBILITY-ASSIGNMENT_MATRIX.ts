export const RESPONSIBILITY_ASSIGNMENT_MATRIX = () => {


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
    <main class="w-[800px] mx-auto   p-[20px] ">
     
        <!-- introdection  -->
        <div class="w-full min-h-[70px] h-fit pt-1 mb-4 flex justify-between  border-b ">
              <div class="w-[50%] flex items-start h-full flex-col justify-start p-4">
                        <h1 class="text-base font-semibold leading-6 text-xl text-blue-500"> RESPONSIBILITY ASSIGNMENT MATRIX</h1>
                        <h3 class="text-base  leading-6 text-sm text-gary-400" > prepared at 22/05/2018</h3> 
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">of control systems and re-instrumentation of 19 furnaces</span>  </p>   
              </div>
        </div>
        <!-- title description -->
        <div class="relative w-[97%] mx-auto  no-break-inside ">
            <table class="w-full text-sm text-left  text-gray-400">
                <thead class="text-xs  uppercase  bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            person 1
                        </th>
                        <th scope="col" class="px-6 py-3">
                           person 2
                        </th>
                        <th scope="col" class="px-6 py-3">
                            person 3
                        </th>
                        <th scope="col" class="px-6 py-3">
                            person 4
                        </th>
                      
                    </tr>
                </thead>
                <tbody>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Work package 1
                        </th>
                        <td class="px-6 py-4 font-medium  text-white">
                           R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          A
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            S
                          </td>
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Work package 2
                        </th>
                        <td class="px-6 py-4 font-medium  text-white ">
                           A
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            S
                          </td>
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Work package 3
                        </th>
                        <td class="px-6 py-4 font-medium  text-white ">
                           R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          A
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            S
                          </td>
                    </tr>
                    <tr class=" border-b bg-gray-800 border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium  text-white">
                            Work package 4
                        </th>
                        <td class="px-6 py-4 font-medium  text-white ">
                           R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          R
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                          S
                        </td>
                        <td class="px-6 py-4 font-medium  text-white ">
                            S
                          </td>
                    </tr>
                </tbody>
            </table>
        </div>
      
        <div class="w-full  min-h-[20px] mt-4  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base  leading-6 text-sm text-gray-400 text-start">  R = Responsible: The person performing the work.</h2>
        </div>
        <div class="w-full  min-h-[20px]  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base   leading-6 text-sm text-gray-400 text-start"> A = Accountable: The person who is answerable to the project manager that the work is done on time, 
                meets requirements, and is acceptable.
            </h2>
        </div>
        <div class="w-full  min-h-[20px]  pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base   leading-6 text-sm text-gray-400 text-start"> C = Consult: The person who has information necessary to complete the work.</h2>
        </div>
        <div class="w-full  min-h-[20px]   pt-1 flex justify-start items-start px-4  no-break-inside ">
            <h2 class="text-base  leading-6 text-sm text-gray-400 text-start">I = Inform:  This person should be notified when the work is complete.</h2>
        </div>
    </main>
</body>
</html>
    `
}