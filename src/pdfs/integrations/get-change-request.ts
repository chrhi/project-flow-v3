export const get_change_request = () => {

    return `
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
                            <h1 class="text-base font-semibold leading-6 text-xl text-blue-500"> Change Request</h1>
                            <h3 class="text-base  leading-6 text-sm text-gary-400" > prepared at 22/05/2018</h3> 
                            <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Person Requesting Change: <span class="font-normal">Chehri abdullah</span>  </p>   
                  </div>
                  <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                    <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">of control systems and re-instrumentation of 19 furnaces</span>  </p> 
                    <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Change Number: <span class="font-normal">#09876</span>  </p>     
                  </div>
            </div>
            <!-- title description -->
            <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
                <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Category of Change: </h2>
                <div class="w-full h-[60px] flex justify-start gap-x-4 py-4">
    
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Scope</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value=""class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Cost</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Quality</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Schedule</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Requirements</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Documents</label>
                    </div>
                </div>
            </div>
            <!-- this is an input -->
            <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
                <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Detailed Description of Proposed Change</h2>
                <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita at odit aliquam soluta dolores rerum! Iure libero explicabo eum aliquam voluptate debitis laboriosam suscipit provident perspiciatis. Blanditiis quas libero voluptatibus.</p>
            </div>
    
            <!-- this is another input -->
            <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
                <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Justification for Proposed Change</h2>
                <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero explicabo dicta rem ex reprehenderit nesciunt aspernatur dolore, nisi culpa, aperiam modi maiores eveniet eos dolor nobis eum tempore beatae nemo.</p>
            </div>
    
            <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
                <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start">Impacts of Change</h2>
            </div>
    
            <div class="w-full  min-h-[70px] h-fit pt-1 border flex flex-col  justify-start items-start p-4 no-break-inside ">
                <div class="flex gap-x-4">
                    <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Scope</h2>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Increase</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value=""class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Decrease</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Modify</label>
                    </div>
                </div>
                <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start  no-break-inside ">
                    <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Description:</h2>
                    <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam autem minus maxime iure consequatur ad earum a reprehenderit repudiandae sit eum praesentium, ducimus nulla sequi ut totam repellat et veniam.</p>
                </div>
            </div>
             <!-- this is another input -->
             <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
                <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Comments</h2>
                <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta fugiat vitae id laborum, est, in repudiandae maiores aperiam harum quas eius dolor quos ipsam mollitia minus, perspiciatis veritatis velit eveniet!</p>
            </div>
    
            <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
                <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Disposition </h2>
                <div class="w-full h-[60px] flex justify-start gap-x-4 py-4">
    
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Aproval</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value=""class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Defer</label>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 ">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 ">Reject</label>
                    </div>
                </div>
            </div>
            <!-- this is a title  -->
            <div class="w-full  min-h-[20px] my-2  pt-1 flex justify-start items-start px-4  no-break-inside ">
                <h2 class="text-base font-bold  leading-6 text-lg text-gray-900 text-start">Change Control Board Signatures</h2>
            </div>
            <!-- this is a table -->
            <div class="relative w-[97%] mx-auto  no-break-inside ">
                <table class="w-full text-sm text-left  text-gray-900">
                    <thead class="text-xs  uppercase  bg-blue-200 text-black">
                        <tr>   
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Signature
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class=" border-b bg-white border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium  text-black">
                               chehri abdullah
                            </th>
                            <td class="px-6 py-4">
                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, omnis. Sint praesentium minus autem voluptatum commodi distinctio, voluptatibus repudiandae magni nulla sapiente sequi fugiat velit culpa accusantium architecto officia impedit!
                            </td>
                            <td class="px-6 py-4">
                            khe373j
                               </td>
                        </tr>
                        <th scope="row" class="px-6 py-4 font-medium  text-black">
                            chehri abdullah
                         </th>
                         <td class="px-6 py-4">
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, omnis. Sint praesentium minus autem voluptatum commodi distinctio, voluptatibus repudiandae magni nulla sapiente sequi fugiat velit culpa accusantium architecto officia impedit!
                         </td>
                         <td class="px-6 py-4">
                         khe373j
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