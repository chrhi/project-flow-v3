import { FC } from 'react'
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton'
import { CreateDelevarble } from '../common/sheets/add-delevarable'


// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface toolsholderAbdullahProps {
 onAdd : ({ title, id, description, cost, level }: {
    title: string;
    description: string;
    cost: number;
    level: number;
    id : string
}) => void,
reSet : () => void , 
onSave : () => void , 

}

const ToolsHolder: FC<toolsholderAbdullahProps> = ({onAdd} ) => {
  return <div>
    <h1>this is true</h1>
  </div>
}

export default ToolsHolder