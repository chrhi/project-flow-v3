import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ProjecrLifeCycleRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      Phase : z.string(),
      KeyDeliverables : z.string(),
      
     }))
    .mutation( async({ input  , ctx }) => {
     const planning =  await ctx.prisma.planning.findFirst({
        where :{
          projectId : input.projectId
        }
      })
      if(!planning || !planning.id){
        throw new TRPCError({code: 'UNAUTHORIZED',message: "planning dost have id "})
      }
      await ctx.prisma.projectLifeCycle.create({
        data:{
            PlanningId : planning?.id ,
            Phase : input.Phase , 
            KeyDeliverables : input.KeyDeliverables
        }
      })
      const data =  await ctx.prisma.projectLifeCycle.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    delete : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
     
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.projectLifeCycle.delete({
       
        where :{
          id : input.id
        }
      })
    }),
    dataGet : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {
      const planning =  await ctx.prisma.planning.findFirst({
        where :{
          projectId : input.projectId
        }
      })
      if(!planning || !planning.id){
        throw new TRPCError({code: 'UNAUTHORIZED',message: "planning dost have id "})
      }
      const data =  await ctx.prisma.projectLifeCycle.findMany({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
