import Skeleton from "react-loading-skeleton"


export const PlaceHolderTbale = () => {
    return (
        <table className="w-full my-4 ">
       
        <thead className={` bg-gray-50  `}>
             <tr>
            {[1,2,3,4 , 5].map(item => (
                    <th key={item} scope="col" className="px-6 py-3">
                  <Skeleton /> 
                    </th>
            ))}
           
        </tr>
       </thead>

          <tbody>
            {["one", "two", "tree"].map((item) => (
              <tr key={item}>
                {[1,2,3,4, 5].map((item) => (
                  <td
                    key={item}
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900`}
                  >
                    <Skeleton style={{ width: "100%" }} count={2} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
   </table>
    )
}