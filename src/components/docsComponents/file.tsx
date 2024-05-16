import { type FC , useState} from 'react'

interface fileAbdullahProps {
    text : string ,
    isDocument : boolean,
    urlDocument? : string ,
    error? : boolean
}

const styles  = {
    title : "text-xl font-bold text-white ",
    text : ""
}

const FileDocs: FC<fileAbdullahProps> = ({text , error , isDocument , urlDocument }) => {

    const [isHover , setIsHover] = useState<boolean>(false)
  return <div 
  onMouseEnter={() => setIsHover(true)}
  onMouseLeave={() => setIsHover(false)}
  className='w-[200px] h-[200px]  bg-blue-500 hover:bg-blue-300 rounded-md  text-center '>
    {
        error ? 
        <h1 className={`text-lg font-bold text-white `}>there is an error </h1>
        : isDocument ? 
        <div className='w-full h-full flex justify-center rounded items-center '>
            <h1 className={`${styles.title}`}>
                {text}
            </h1>
        </div>
        : 
        <div className='w-full h-full flex justify-center relative   items-center'>
            <h1 className={`${styles.title}`} >{text}</h1>
            
            <div className={` ${isHover ? "absolute" : "hidden"} 
            inset-0 z-10 flex justify-center items-center bg-white border border-blue-600 
            cursor-pointer transition-all 
            `}>
                    <p className=' text-center text-xl mx-4 '>
                       click on this to  build it !
                    </p>
            </div>
        </div>
    }
  </div>
}

export default FileDocs