import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const costPlanningRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      LevelOfAccuracy : z.string(),
      UnitsOfMeasure : z.string(),
      ControlThresholds : z.string(),
      RulesForPerformanceMeasurement : z.string(),
      CostReportingAndFormat : z.string(),
      EstimatingCosts : z.string(),
      DevelopingTheBudget : z.string(),
      UpdatingMonitoringAndControlling : z.string(),
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
      await ctx.prisma.costlManagementPlan.create({
        data:{
            PlanningId : planning?.id ,
            LevelOfAccuracy : input.LevelOfAccuracy,
            UnitsOfMeasure : input.UnitsOfMeasure,
            ControlThresholds : input.ControlThresholds,
            RulesForPerformanceMeasurement : input.RulesForPerformanceMeasurement,
            CostReportingAndFormat : input.CostReportingAndFormat,
            EstimatingCosts : input.EstimatingCosts,
            DevelopingTheBudget : input.DevelopingTheBudget,
            UpdatingMonitoringAndControlling : input.UpdatingMonitoringAndControlling,
        }
      })
      const data =  await ctx.prisma.costlManagementPlan.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      LevelOfAccuracy : z.string(),
      UnitsOfMeasure : z.string(),
      ControlThresholds : z.string(),
      RulesForPerformanceMeasurement : z.string(),
      CostReportingAndFormat : z.string(),
      EstimatingCosts : z.string(),
      DevelopingTheBudget : z.string(),
      UpdatingMonitoringAndControlling : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.costlManagementPlan.update({
        data:{
            LevelOfAccuracy : input.LevelOfAccuracy,
            UnitsOfMeasure : input.UnitsOfMeasure,
            ControlThresholds : input.ControlThresholds,
            RulesForPerformanceMeasurement : input.RulesForPerformanceMeasurement,
            CostReportingAndFormat : input.CostReportingAndFormat,
            EstimatingCosts : input.EstimatingCosts,
            DevelopingTheBudget : input.DevelopingTheBudget,
            UpdatingMonitoringAndControlling : input.UpdatingMonitoringAndControlling,
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.costlManagementPlan.findFirst({
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
      const data =  await ctx.prisma.costlManagementPlan.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
