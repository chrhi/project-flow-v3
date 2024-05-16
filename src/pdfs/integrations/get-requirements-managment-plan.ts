export const get_reuirement_managment_plan = () => {
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
                        <h1 class="text-base font-semibold leading-6 text-xl text-blue-500"> Requirements managment plan</h1>
                        <h3 class="text-base  leading-6 text-sm text-gary-400" > prepared at 22/05/2018</h3> 
              </div>
              <div class="w-[50%] flex items-start flex-col h-full justify-start p-4">
                <p class="text-base font-semibold leading-6 text-sm text-gray-900" >Project Title: <span class="font-normal">of control systems and re-instrumentation of 19 furnaces</span>  </p>   
              </div>
        </div>
        <!-- title description -->
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Collection</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. A odit, sint magnam soluta id suscipit. Placeat quaerat alias qui, quod excepturi est maxime assumenda necessitatibus voluptatum beatae quam veniam natus.</p>
        </div>
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Analysis</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus molestias aperiam vero aliquid explicabo sit non, fugit placeat delectus quo odio unde asperiores? Quasi dolorem molestias asperiores, explicabo vel veniam.</p>
        </div>
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Categories</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem voluptatum hic officia? Blanditiis provident odio quis unde, ducimus ea fugiat. Fuga quos pariatur, incidunt repudiandae iusto veniam commodi velit voluptatibus?</p>
        </div>
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Documentation</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, sed quaerat! Corporis, assumenda est aliquam vero vitae eum ad facere veniam sequi pariatur rerum? Saepe debitis adipisci esse tempora reprehenderit?</p>
        </div>
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Prioritization</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum nisi nulla in id obcaecati sequi eum ab ea. Explicabo quisquam repellat a doloribus inventore recusandae accusamus maiores sequi nisi delectus.</p>
        </div>
         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Metrics</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, in molestias voluptatum consequatur sit ipsum impedit error pariatur eos sed optio suscipit officiis id, harum illum at reprehenderit fugiat debitis?</p>
        </div>

          <!-- title description -->
          <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Traceability Structure</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum suscipit modi, nobis officia quibusdam fugiat fuga molestias culpa alias facilis doloribus optio perspiciatis, impedit eius esse quod porro exercitationem dolor?</p>
        </div>

          <!-- title description -->
          <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Tracking</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nulla consequuntur molestiae, modi perspiciatis, veritatis accusamus delectus quis obcaecati vero harum provident cumque consectetur ratione repudiandae explicabo asperiores iste placeat!</p>
        </div>

          <!-- title description -->
          <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Reporting</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quasi error voluptates quaerat, eveniet animi at earum est rem ab labore minus veritatis odit fuga reiciendis voluptas. Iure, voluptate dolorem?</p>
        </div>

         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Validation</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut sunt doloribus totam. Dignissimos ducimus quo nam odio tempore laboriosam perspiciatis autem placeat praesentium? Excepturi ex quis animi delectus quae?</p>
        </div>

         <!-- title description -->
         <div class="w-full  min-h-[70px] h-fit pt-1 flex flex-col  justify-start items-start px-4 no-break-inside ">
            <h2 class="text-base font-semibold leading-6 text-md text-gray-900 text-start">Configuration Management</h2>
            <p class="text-base leading-6 text-sm text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente architecto dolorum, odio, esse beatae aspernatur facilis iusto ullam iste dolorem illum dolores excepturi ipsa omnis, nesciunt quae? Reiciendis, asperiores quos.</p>
        </div>

    </main>
</body>
</html>
    `
}