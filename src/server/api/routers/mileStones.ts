import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mileStoneRouter = createTRPCRouter({
  milestoneAdd : publicProcedure
    .input(z.object({ 
      project_id: z.string().uuid(),
      name : z.string(),
      description : z.string(),
      dueDate : z.date(),
     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.mileStones.create({
        data:{
            projectId : input.project_id,
            name : input.name , 
            description : input.description,
            dueDate : input.dueDate ,
            
        }
      })
    }),
    milestoneDelete : publicProcedure
    .input(z.object({ 
      id: z.string(),
     
     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.mileStones.delete({
        where : {
          id : input.id
        }
      })
    }),
    getMilestones : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {

      const resources =  await ctx.prisma.mileStones.findMany({
        where:{
            projectId : input.projectId,  
        }
      })
    return resources
    }),
});
