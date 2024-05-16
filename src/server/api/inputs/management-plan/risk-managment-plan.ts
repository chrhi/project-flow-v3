import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const riskPlanningRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      Methodology : z.string(),
      RolesAndResponsibilities : z.string(),
      RiskCategories : z.string(),
      RiskManagementFunding : z.string(),
      ContingencyProtocols : z.string(),
      FrequencyAndTiming : z.string(),
      StakeholderRiskTolerances : z.string(),
      TrackingAndAudit : z.string(),
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
      await ctx.prisma.risklManagementPlan.create({
        data:{
            PlanningId : planning?.id ,
            Methodology : input.Methodology,
            RolesAndResponsibilities :input.RolesAndResponsibilities,
            RiskCategories :input.RiskCategories,
            RiskManagementFunding :input.RiskManagementFunding,
            ContingencyProtocols : input.ContingencyProtocols,
            FrequencyAndTiming : input.FrequencyAndTiming,
            StakeholderRiskTolerances : input.StakeholderRiskTolerances,
            TrackingAndAudit :input.TrackingAndAudit,
        }
      })
      const data =  await ctx.prisma.risklManagementPlan.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      Methodology : z.string(),
      RolesAndResponsibilities : z.string(),
      RiskCategories : z.string(),
      RiskManagementFunding : z.string(),
      ContingencyProtocols : z.string(),
      FrequencyAndTiming : z.string(),
      StakeholderRiskTolerances : z.string(),
      TrackingAndAudit : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.risklManagementPlan.update({
        data:{
            
            Methodology : input.Methodology,
            RolesAndResponsibilities :input.RolesAndResponsibilities,
            RiskCategories :input.RiskCategories,
            RiskManagementFunding :input.RiskManagementFunding,
            ContingencyProtocols : input.ContingencyProtocols,
            FrequencyAndTiming : input.FrequencyAndTiming,
            StakeholderRiskTolerances : input.StakeholderRiskTolerances,
            TrackingAndAudit :input.TrackingAndAudit,
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.risklManagementPlan.findFirst({
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
      const data =  await ctx.prisma.risklManagementPlan.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
