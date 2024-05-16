import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const startupRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      Title : z.string(),
      ProjectObjectiveAndOpportunity : z.string(),
      ProjectDescription : z.string(),
      HighLevelRequirements : z.string(),
      HighLevelRisks : z.string()
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.startup.create({
        data:{
            projectId : input.projectId,
            Title : input.Title , 
            ProjectObjectiveAndOpportunity : input.ProjectObjectiveAndOpportunity,
            ProjectDescription : input.ProjectDescription ,
            HighLevelRequirements : input.HighLevelRequirements,
            HighLevelRisks : input.HighLevelRisks
        }
      })
      const data =  await ctx.prisma.startup.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      Title : z.string(),
      ProjectObjectiveAndOpportunity : z.string(),
      ProjectDescription : z.string(),
      HighLevelRequirements : z.string(),
      HighLevelRisks : z.string()
     
     }))
    .mutation( async({ input  , ctx }) => {

        await ctx.prisma.startup.update({
        data : {
          Title : input.Title , 
          ProjectObjectiveAndOpportunity : input.ProjectObjectiveAndOpportunity,
          ProjectDescription : input.ProjectDescription ,
          HighLevelRequirements : input.HighLevelRequirements,
          HighLevelRisks : input.HighLevelRisks
        },
        where:{
            id : input.id,  
        }
      })
      const data =  await ctx.prisma.startup.findFirst({
        where:{
            id : input.id,  
        }
      })
      return data
    
    }),
    dataGet : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {

      const data =  await ctx.prisma.startup.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
});
