import Skeleton from 'react-loading-skeleton';

  export default function HomePageLoader() {
  
    return (
  
      <div className="w-full max-w-7xl min-h-[600px] mt-[50px] h-fit sm:px-8 my-8 gap-y-4  flex flex-col  items-center">
       
       <div className="w-full h-[50px] flex items-center justify-start ">
            <Skeleton style={{width : "100%"}} />
       </div>

       <div className="w-full h-[600px]  gap-x-4 justify-start   flex ">
                <div className="w-[65%] h-[80%] ">
                <Skeleton style={{width : "100%" , height:"400px"}} />
                </div>
                <div className="w-[25%]  h-[80%] duration-500 flex flex-col gap-y-4  rounded-lg">
                <Skeleton style={{width : "100%" }} className='dark:!bg-neutral-800' />
                <Skeleton style={{width : "100%" }} />
                <Skeleton style={{width : "100%" }} />
                <Skeleton style={{width : "100%" }} />
                </div>
       </div>
       <div className="w-full h-[50px] flex items-center justify-start ">
           <Skeleton style={{width : "100%"}} />
       </div>
       <div className="w-full flex  gap-x-4 h-60 mb-4 items-center justify-start">
            
              {[1,2,3,4,5].map(() => {
                return (
                  <Skeleton style={{width : "192px" , height:"224px"}} />
                )
              })}
       </div>
      </div>
    )
  }
  