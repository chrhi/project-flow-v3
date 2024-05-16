export const getPdfHeader =  () =>  {
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
          
    `
}