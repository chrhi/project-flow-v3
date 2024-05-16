import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ProjectObjectivesRouter = createTRPCRouter({
  objectiveAdd : publicProcedure
    .input(z.object({ 
      project_id: z.string().uuid(),
      type : z.string(),
      THE_PROJECTS_OBJECTIVES : z.string(),
      SUCCESS_CRITERIA :z.string(),
      APPROVAL : z.string(),

     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.projectObjectives.create({
        data:{
            projectId : input.project_id,
            Type : input.type , 
            THE_PROJECTS_OBJECTIVES : input.THE_PROJECTS_OBJECTIVES,
            SUCCESS_CRITERIA : input.SUCCESS_CRITERIA ,
            APPROVAL : input.APPROVAL ,
            
        }
      })
    }),
    objectiveDelete : publicProcedure
    .input(z.object({ 
      id: z.string(),
     
     
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.projectObjectives.delete({
        where : {
          id : input.id
        }
      })
    }),
    getObjectives : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {

      const objectives =  await ctx.prisma.projectObjectives.findMany({
        where:{
            projectId : input.projectId,  
        }
      })
    return objectives
    }),
});
