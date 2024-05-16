import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const resourcesRouter = createTRPCRouter({
  add_resource : publicProcedure
    .input(z.object({ 
      project_id: z.string().uuid(),
      name : z.string(),
      description : z.string(),
      cost : z.number(),
      quality : z.string(),
      imageUrl : z.string()
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.resources.create({
        data:{
            projectId : input.project_id,
            name : input.name , 
            description : input.description,
            cost : input.cost ,
            quality : input.quality,
            imageUrl : input.imageUrl
        }
      })
    }),
    objectivesDelete : publicProcedure
    .input(z.object({ 
      id: z.string(),
     
     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.resources.delete({
        where : {
          id : input.id
        }
      })
    }),
    getResources : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {

      const resources =  await ctx.prisma.resources.findMany({
        where:{
            projectId : input.projectId,  
        }
      })
    return resources
    }),
});
