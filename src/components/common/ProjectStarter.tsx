import React, { useState } from 'react';
import { AbdullahButton, buttonVariants } from '../used/AbdullahButton';
import animatin from '~/assets/svg/94021-startup.gif';
import Image from 'next/image';
import { Input } from '../used/Input';
import { TextField } from '../used/TextField';
import NewTimePicker from '../used/NewTimePicker';
import toast from 'react-hot-toast';
import { api } from '~/utils/api';
import { DateRange } from "react-day-picker"
import { getUserMetadata } from '~/lib/MetaData';

import { DatePickerWithRange } from "~/components/ui/date-range-picker";
import { addDays, format } from "date-fns"

type Props = {
  refetch: () => Promise<any>;
};

export const ProjectStarter = ({ refetch }: Props) => {
  const [value, setValue] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  })
  const [data, setData] = useState({
    password: '',
    userId: '',
    title: '',
    description: '',
  });

  const mutation = api.projectRouter.create_project.useMutation({
    onSuccess: async (data) => {
      
      
      await refetch();
      toast('un nouveau projet a été lancé!', {
        icon: '🎉',
      });
    },
    onError: () => {
      toast.error("quelque chose s'est mal passé, veuillez réessayer");
    },
  });

  const handleSubmit = () => {
    if (!data.password || !data.title || !data.description) {
      toast.error('tous les champs sont requis');
      return;
    }
    mutation.mutate({
      title: data.title,
      endsAt: value?.to as Date,
      startAt: value?.from  as Date,
      user_id: getUserMetadata(),
    });
  };

  return (
    <div className="w-full max-w-4xl   bg-white dark:bg-black rounded-lg  flex h-[500px] shadow-xl border">
      <div className=" w-full lg:w-[50%] gird grid-cols-12 p-4 gap-y-4 h-full">
        <div className="col-span-12 my-4 h-[40px] flex items-center">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-white">Énoncer le projet </h1>
        </div>
        <Input
          lable="écrire le mot  CONFIRMER"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className='my-4'
        />
        <div className="col-span-12 my-4 ">
          <DatePickerWithRange label="sélectionner la plage de la date"  date={value} setDate={setValue} />
        </div>
        <Input
          className='my-4'
          lable="quel est le titre du projet ?"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextField
          className='my-4'
          lable="pouvez-vous décrire le projet ?"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
          <div className="col-span-12  flex lg:hidden justify-end items-center ">
          <AbdullahButton className={buttonVariants({ variant: 'primary' })} onClick={handleSubmit} isLoading={mutation.isLoading}>
            Démarrer le projet
          </AbdullahButton>
        </div>
      </div>
      <div className=" hidden w-[0] lg:w-[50%] h-full lg:flex flex-col justify-end items-center">
        <Image width={200} className="mb-24 " src={animatin} alt="starting up the project" />
        <div className="w-full flex justify-end items-center p-8 h-[50px]">
          <AbdullahButton className={buttonVariants({ variant: 'primary' })} onClick={handleSubmit} isLoading={mutation.isLoading}>
            Démarrer le projet
          </AbdullahButton>
        </div>
      </div>

    </div>
  );
};
