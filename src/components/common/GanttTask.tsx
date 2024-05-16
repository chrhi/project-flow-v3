import { useState } from 'react';
import { Gantt, type  Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { getProjectMetaData } from '~/lib/MetaData';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Title } from '@tremor/react';
import { AbdullahButton , buttonVariants } from '../used/AbdullahButton';
import LoadingComponents from './loading-components';
import EmptyGanttChard from '../gantt-chard/empty';
import { Expand } from 'lucide-react';
import { openTasksShowUp } from '~/store/open-models';
import { TaskPopUpShowCase } from '../popup/task-pop-up';
import { debounce } from 'lodash';

const tasksStatic: Task[] = [
  {
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 2),
    name: '',
    id: 'Task 0',
    type:'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#fffff', progressSelectedColor: '#ffffff' },
  },
 
];


export const GanttTask = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksStatic);

  const [view, setView] = useState<ViewMode>(ViewMode.Day);

  const [showTaskList, setShowTaskList] = useState<boolean>(true);

  const [status , setSTatus] = useState("LOADING")

  const setIsOpen  = openTasksShowUp(state => state.setShowModel)
  const setId = openTasksShowUp(state => state.setId)

  const handleChange = () => {
    setShowTaskList(!showTaskList)
  }

  const {refetch} = api.tasksRouter.getTasks.useQuery(
    { projectId: getProjectMetaData() },
    {
      onSuccess: (data) => {
        const preparedTasks = data.map((item): Task => ({
          start: item.StartAt || new Date(),
          end: item.EndsAt || new Date(),
          name: item.title || '',
          id: item.id || '',
          type: 'task' || '',
          isDisabled: false,
          progress: 100,
          
          styles: {
            progressColor:  '#0794f3',
            progressSelectedColor:  '#0794f3',

          },
        }));
        if(data.length === 0){ 
          setSTatus("EMPTY")
          return
        }
        setTasks(preparedTasks);
        setSTatus("END")
      },
      onError: () => {
        toast.error('Something went wrong');
        setSTatus("EMPTY")
      },
    }
  );

  const mutation = api.tasksRouter.updateOnlyDate.useMutation({
    onSuccess : () => {
      toast.success("updated ")
    }
  })

  const handleDoubleClick = ({id } : {id : string}) => {
    setIsOpen(true)
    setId(id)
  }

  // Define the debounced version of the function with a desired delay (e.g., 300 milliseconds)
const debouncedMutation = debounce((event) => {
  mutation.mutate({
    endsAt: event?.end,
    startAt: event?.start,
    id: event.id,
  });
}, 300);

  return (
    <div className="w-full h-full flex pb-8 pt-4 flex-col  relative bg-white overflow-x-auto overflow-y-auto items-start">
      <TaskPopUpShowCase  refetch ={refetch} /> 
      <div className="w-full h-[100px] flex mb-4 flex-col items-start">
        <Title>Vue du diagramme de Gantt </Title>
       
        <div className="w-full h-[65px] gap-x-4 flex items-center justify-end px-4">
          {
            [
              {name : " Heure" , value : ViewMode.Hour},
              {name : "   Quart de journée" , value : ViewMode.QuarterDay},
              {name : "  Moitié de journée" , value : ViewMode.HalfDay},
              {name : "    Semaine" , value : ViewMode.Week},
              {name : "    Mois" , value : ViewMode.Month},
              {name : "   Année" , value : ViewMode.Year},
             
            ].map(item => (
              <AbdullahButton
              onClick={() => setView(item.value)}
              className={`${buttonVariants({variant : "secondary" ,size:"sm"})} ${view === item.value ? "bg-blue-500 text-white" : ""}`} >
                {item.name}
              </AbdullahButton>
            ))
          }
        
        <div className="flex items-center ml-4 space-x-2">
           <Switch checked={showTaskList} onCheckedChange={handleChange} id="tasklist-show" />
           <Label htmlFor="tasklist-show">Afficher la liste des tâches</Label>
        </div>
        <AbdullahButton
              onClick={() => console.log("")}
              className={`${buttonVariants({variant : "secondary" , size:"sm"})} `} >
               <Expand className='w-4 h-4' /> 
        </AbdullahButton>
        </div>
      </div>
      {
        status === "LOADING" ? 
        <LoadingComponents />
        : status === "EMPTY" ? 
       <EmptyGanttChard />
        :
        <Gantt
        viewMode={view || ViewMode.Week}
        columnWidth={50}
        TooltipContent={({task , fontFamily , fontSize }) => <div>  <h1>{task.name}</h1></div>}
        fontFamily="poppines"
        tasks={tasks }
       
          barCornerRadius={20}
          locale='fr'
          handleWidth={50}
         

        
        onDoubleClick={({id}) => handleDoubleClick({id })}
        listCellWidth={showTaskList ? undefined : ''}
        // onDateChange={(event) => debouncedMutation(event)}
        onProgressChange={(event => console.log(event ))}
        onExpanderClick = {(event => console.log(event ))}
        onDelete ={(event) => console.log(event)}
        fontSize="10"
      />
      }
    </div>
  );
};