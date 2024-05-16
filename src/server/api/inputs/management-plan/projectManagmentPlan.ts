import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectManagmentPlanRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      IntegrationProcesses   : z.string(),
      IntegrationTailoringDecisions : z.string(),
      ScopeProcesses : z.string(),
      ScopeTailoringDecisions : z.string(),
      TimeProcesses : z.string(),
      TimeTailoringDecisions : z.string(),
      CostProcesses : z.string(),
      CostTailoringDecisions   : z.string(),
      QualityProcesses : z.string(),
      QualityTailoringDecisions : z.string(),
      HumanResourcesProcesses : z.string(),
      HumanResourcesTailoringDecisions : z.string(),
      CommunicationProcesses : z.string(),
      CommunicationTailoringDecisions : z.string(),
      RiskProcesses   : z.string(),
      RiskTailoringDecisions : z.string(),
      ProcurementProcesses : z.string(),
      ProcurementTailoringDecisions : z.string(),
      StakeholdersProcesses : z.string(),
      StakeholdersTailoringDecisions : z.string(),
      IntegrationToolsandTechniques : z.string(),
      ScopeToolsAndTechniques   : z.string(),
      TimeToolsAndTechniques : z.string(),
      CostToolsandTechniques : z.string(),
      QualityToolsAndTechniques : z.string(),
      HumanResourcesToolsAndTechniques : z.string(),
      CommunicationToolsAndTechniques : z.string(),
      RiskToolsAndTechniques : z.string(),
      ProcurementToolsAndTechniques : z.string(),
      StakeholdersToolsAndTechniques : z.string(),
      ProjectReviews : z.string(),
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
      await ctx.prisma.managementPlan.create({
        data:{
            PlanningId : planning?.id ,
            IntegrationProcesses   : input.IntegrationProcesses,
            IntegrationTailoringDecisions : input.IntegrationTailoringDecisions,
            ScopeProcesses : input.ScopeProcesses,
            ScopeTailoringDecisions : input.ScopeTailoringDecisions,
            TimeProcesses :input.TimeProcesses,
            TimeTailoringDecisions : input.TimeTailoringDecisions,
            CostProcesses : input.CostProcesses,
            CostTailoringDecisions   : input.CostTailoringDecisions,
            QualityProcesses :input.QualityProcesses,
            QualityTailoringDecisions : input.QualityTailoringDecisions,
            HumanResourcesProcesses :input.HumanResourcesProcesses,
            HumanResourcesTailoringDecisions : input.HumanResourcesTailoringDecisions,
            CommunicationProcesses : input.CommunicationProcesses,
            CommunicationTailoringDecisions : input.CommunicationTailoringDecisions,
            RiskProcesses   : input.RiskProcesses,
            RiskTailoringDecisions : input.RiskTailoringDecisions,
            ProcurementProcesses : input.ProcurementProcesses,
            ProcurementTailoringDecisions : input.ProcurementTailoringDecisions,
            StakeholdersProcesses : input.StakeholdersProcesses,
            StakeholdersTailoringDecisions : input.StakeholdersTailoringDecisions,
            IntegrationToolsandTechniques : input.IntegrationToolsandTechniques,
            ScopeToolsAndTechniques   : input.ScopeToolsAndTechniques,
            TimeToolsAndTechniques :input.TimeToolsAndTechniques,
            CostToolsandTechniques :input.CostToolsandTechniques,
            QualityToolsAndTechniques : input.QualityToolsAndTechniques,
            HumanResourcesToolsAndTechniques :input.HumanResourcesToolsAndTechniques,
            CommunicationToolsAndTechniques : input.CommunicationToolsAndTechniques,
            RiskToolsAndTechniques :input.RiskToolsAndTechniques,
            ProcurementToolsAndTechniques : input.ProcurementToolsAndTechniques,
            StakeholdersToolsAndTechniques : input.StakeholdersToolsAndTechniques,
            ProjectReviews : input.ProjectReviews,
        }
      })
      const data =  await ctx.prisma.managementPlan.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      IntegrationProcesses   : z.string(),
      IntegrationTailoringDecisions : z.string(),
      ScopeProcesses : z.string(),
      ScopeTailoringDecisions : z.string(),
      TimeProcesses : z.string(),
      TimeTailoringDecisions : z.string(),
      CostProcesses : z.string(),
      CostTailoringDecisions   : z.string(),
      QualityProcesses : z.string(),
      QualityTailoringDecisions : z.string(),
      HumanResourcesProcesses : z.string(),
      HumanResourcesTailoringDecisions : z.string(),
      CommunicationProcesses : z.string(),
      CommunicationTailoringDecisions : z.string(),
      RiskProcesses   : z.string(),
      RiskTailoringDecisions : z.string(),
      ProcurementProcesses : z.string(),
      ProcurementTailoringDecisions : z.string(),
      StakeholdersProcesses : z.string(),
      StakeholdersTailoringDecisions : z.string(),
      IntegrationToolsandTechniques : z.string(),
      ScopeToolsAndTechniques   : z.string(),
      TimeToolsAndTechniques : z.string(),
      CostToolsandTechniques : z.string(),
      QualityToolsAndTechniques : z.string(),
      HumanResourcesToolsAndTechniques : z.string(),
      CommunicationToolsAndTechniques : z.string(),
      RiskToolsAndTechniques : z.string(),
      ProcurementToolsAndTechniques : z.string(),
      StakeholdersToolsAndTechniques : z.string(),
      ProjectReviews : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.managementPlan.update({
        data:{
            
            IntegrationProcesses   : input.IntegrationProcesses,
            IntegrationTailoringDecisions : input.IntegrationTailoringDecisions,
            ScopeProcesses : input.ScopeProcesses,
            ScopeTailoringDecisions : input.ScopeTailoringDecisions,
            TimeProcesses :input.TimeProcesses,
            TimeTailoringDecisions : input.TimeTailoringDecisions,
            CostProcesses : input.CostProcesses,
            CostTailoringDecisions   : input.CostTailoringDecisions,
            QualityProcesses :input.QualityProcesses,
            QualityTailoringDecisions : input.QualityTailoringDecisions,
            HumanResourcesProcesses :input.HumanResourcesProcesses,
            HumanResourcesTailoringDecisions : input.HumanResourcesTailoringDecisions,
            CommunicationProcesses : input.CommunicationProcesses,
            CommunicationTailoringDecisions : input.CommunicationTailoringDecisions,
            RiskProcesses   : input.RiskProcesses,
            RiskTailoringDecisions : input.RiskTailoringDecisions,
            ProcurementProcesses : input.ProcurementProcesses,
            ProcurementTailoringDecisions : input.ProcurementTailoringDecisions,
            StakeholdersProcesses : input.StakeholdersProcesses,
            StakeholdersTailoringDecisions : input.StakeholdersTailoringDecisions,
            IntegrationToolsandTechniques : input.IntegrationToolsandTechniques,
            ScopeToolsAndTechniques   : input.ScopeToolsAndTechniques,
            TimeToolsAndTechniques :input.TimeToolsAndTechniques,
            CostToolsandTechniques :input.CostToolsandTechniques,
            QualityToolsAndTechniques : input.QualityToolsAndTechniques,
            HumanResourcesToolsAndTechniques :input.HumanResourcesToolsAndTechniques,
            CommunicationToolsAndTechniques : input.CommunicationToolsAndTechniques,
            RiskToolsAndTechniques :input.RiskToolsAndTechniques,
            ProcurementToolsAndTechniques : input.ProcurementToolsAndTechniques,
            StakeholdersToolsAndTechniques : input.StakeholdersToolsAndTechniques,
            ProjectReviews : input.ProjectReviews,
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.managementPlan.findFirst({
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
      const data =  await ctx.prisma.managementPlan.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
