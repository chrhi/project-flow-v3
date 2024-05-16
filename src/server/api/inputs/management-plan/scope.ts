import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scopePlanningRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      ScopeStatementDevelopment : z.string(),
      WBSStructure : z.string(),
      WBSDictionary : z.string(),
      ScopeBaselineMaintenance : z.string(),
      ScopeChange : z.string(),
      DeliverableAcceptance : z.string(),
      ScopeandRequirementsIntegration : z.string(),
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
      await ctx.prisma.scope.create({
        data:{
            PlanningId : planning?.id ,
            ScopeStatementDevelopment : input.ScopeStatementDevelopment , 
            WBSStructure : input.WBSStructure,
            ScopeBaselineMaintenance : input.ScopeBaselineMaintenance ,
            ScopeChange : input.ScopeChange,
            DeliverableAcceptance : input.DeliverableAcceptance,
            ScopeandRequirementsIntegration : input.ScopeandRequirementsIntegration
        }
      })
      const data =  await ctx.prisma.scope.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      ScopeStatementDevelopment : z.string(),
      WBSStructure : z.string(),
      WBSDictionary : z.string(),
      ScopeBaselineMaintenance : z.string(),
      ScopeChange : z.string(),
      DeliverableAcceptance : z.string(),
      ScopeandRequirementsIntegration : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.scope.update({
        data:{
            
            ScopeStatementDevelopment : input.ScopeStatementDevelopment , 
            WBSStructure : input.WBSStructure,
            ScopeBaselineMaintenance : input.ScopeBaselineMaintenance ,
            ScopeChange : input.ScopeChange,
            DeliverableAcceptance : input.DeliverableAcceptance,
            ScopeandRequirementsIntegration : input.ScopeandRequirementsIntegration
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.scope.findFirst({
        where:{
          id : input?.id ,  
        }
      })
    return data
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
      const data =  await ctx.prisma.scope.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
