/* eslint-disable @typescript-eslint/ban-ts-comment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";





//update tasks 

//remoce tasks 

//store wbd json 

// get wbd json

export const tasksRouter = createTRPCRouter({
  createTask: publicProcedure
    .input(z.object({
        projectId : z.string().uuid(),
       title   : z.string(),
       description : z.string() , 
       startAt : z.date() ,
       endsAt : z.date(),
       cost : z.number() , 
       AssignTo : z.string().array(),
       AlocatedRessources : z.string().array(),
       Color : z.string(),
       priority : z.string(),
       imgUrl : z.string().optional()
         }))
    .mutation( async ({ input , ctx }) => {

        const AssignToJson = JSON.stringify(input.AssignTo)
        const AlocatedRessourcesJson = JSON.stringify(input.AssignTo)

        const task = await ctx.prisma.tasks.create({
            data :{
                projectId : input.projectId , 
                title : input.title , 
                description : input.description , 
                StartAt : input.startAt , 
                EndsAt : input.endsAt,
                cost : input.cost,
                AssignedTo : AssignToJson, 
                AlocatedRessources : AlocatedRessourcesJson,
                Status : "TODO",
                Color : input.Color,
                Priority : input.priority, 
                imgUrl : input.imgUrl || ""
                
            }
        })
        return task
    }),

    getTasks: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input , ctx }) => {
        const tasks = await  ctx.prisma.tasks.findMany({
            where:{
                projectId : input.projectId
            }
        })
        const stakeholders = await ctx.prisma.stakeHolder.findMany({
            where:{
                projectId : input.projectId
            }
        })
    const newPreparedArray = tasks.map(item => {
        if(!item?.AssignedTo){
            return item 
        }
        //@ts-ignore
        const prepare = JSON.parse(item?.AssignedTo).map(item => {
            const peaple = stakeholders.filter(haja => haja.id === item)
            return peaple[0]?.name
        })


        return{
            ...item , AssignedTo :prepare
        }
    })
        return newPreparedArray
    }),

    updateTask: publicProcedure
    .input(z.object({
       id : z.string().uuid(),
       title   : z.string(),
       description : z.string() , 
       startAt : z.date() ,
       endsAt : z.date(),
       cost : z.number() , 
       AssignTo : z.string().array(),
       color : z.string(),
       AlocatedRessources : z.string().array(),
       imgUrl : z.string().optional()
      
         }))
    .mutation( async ({ input , ctx }) => {

        const AssignToJson = JSON.stringify(input.AssignTo)
        const AlocatedRessourcesJson = JSON.stringify(input.AssignTo)

        await ctx.prisma.tasks.update({
            data :{
                title : input.title , 
                description : input.description , 
                StartAt : input.startAt , 
                EndsAt : input.endsAt,
                cost : input.cost,
                AssignedTo : AssignToJson, 
                AlocatedRessources : AlocatedRessourcesJson,
                Color : input.color,
                imgUrl : input.imgUrl || ""
            },
            where:{
                id : input.id
            }
        })
    }),
    updateOnlyDate: publicProcedure
    .input(z.object({
       id : z.string().uuid(),
        
       startAt : z.date() ,
       endsAt : z.date(),
      
      
         }))
    .mutation( async ({ input , ctx }) => {


        await ctx.prisma.tasks.update({
            data :{
              
                StartAt : input.startAt , 
                EndsAt : input.endsAt,
         
                
                
            },
            where:{
                id : input.id
            }
        })
    }),


    updateTaskStatus : publicProcedure
    .input(z.object({
       id : z.string().uuid(),
      
       Status : z.string(),
      
      
         }))
    .mutation( async ({ input , ctx }) => {

  
        await ctx.prisma.tasks.update({
            data :{
               
                Status : input.Status
            },
            where:{
                id : input.id
            }
        })
    }),


    completeTask : publicProcedure
    .input(z.object({
        id : z.string().uuid(),
       EndedAt : z.date() , 
       RealCost : z.number(),
       Status : z.string(),
         }))
    .mutation( async ({ input , ctx }) => {

 
        await ctx.prisma.tasks.update({
            data :{
             
                EndedAt : input.EndedAt , 
                RealCost : input.RealCost , 
                Status : input.Status
            },
            where:{
                id : input.id
            }
        })
    }),
    
  getTask : publicProcedure .input(z.object({ id : z.string()})).query(async ({input , ctx}) => {
    const task = await ctx.prisma.tasks.findUnique({
        where : {
            id : input.id
        }
    })



    return task 
  }),
  deleteTask : publicProcedure .input(z.object({ id : z.string()})).mutation(async ({input , ctx}) => {
    const task = await ctx.prisma.tasks.deleteMany({
        where : {
            id : input.id
        }
    })
    return task 
  })
});
