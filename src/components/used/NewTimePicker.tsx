import type { FC, Dispatch, SetStateAction } from 'react'; // Importing necessary types from 'react'
import { DateRangePicker, type DateRangePickerValue } from "@tremor/react"; // Importing DateRangePicker and DateRangePickerValue from "@tremor/react"
import { fr } from "date-fns/locale"; // Importing the 'fr' locale from date-fns library

// Defining the interface for NewTimePickerAbdullahProps
interface NewTimePickerAbdullahProps {
  text: string; // A string prop called 'text'
  value: DateRangePickerValue; // A prop of type DateRangePickerValue called 'value'
  setValue: Dispatch<SetStateAction<DateRangePickerValue>>; // A prop of type Dispatch<SetStateAction<DateRangePickerValue>> called 'setValue'
}

// Defining the NewTimePicker component
const NewTimePicker: FC<NewTimePickerAbdullahProps> = ({ text, value, setValue }) => {
  return (
    <div className='col-span-6 flex flex-col items-start h-full gap-y-4 justify-center'>
      <div className='w-full h-[20px] flex justify-start items-center'>
        <p className="block text-sm font-medium leading-6 !font-poppins text-gray-700 truncate dark:text-white">{text}</p>
      </div>
      <DateRangePicker className="w-full h-[30px] mx-auto dark:text-white dark:bg-stone-900" value={value} onValueChange={setValue} locale={fr}  selectPlaceholder="Seleccionar" />
    </div>
  );
};

export default NewTimePicker; // Exporting the NewTimePicker component