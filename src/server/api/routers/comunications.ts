import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const comunicationsRouter = createTRPCRouter({
  comunicationAdd : publicProcedure
    .input(z.object({ 
      project_id: z.string().uuid(),
      stakeholder : z.string().array(),
      description : z.string(),
      time : z.date(),
      method : z.string(),
      Sender : z.string()
     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.comunications.create({
        data:{
            projectId : input.project_id,
            description : input.description , 
            method : input.method , 
            Sender : input.Sender , 
            stakeholder : JSON.stringify(input.stakeholder),
            time : input.time ,  
        }
      })
    }),
    getComunications : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {

      const resources =  await ctx.prisma.comunications.findMany({
        where:{
            projectId : input.projectId,  
        }
      })
      
    return resources
    }),
});
