import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scheduelPlanningRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      ScheduleMethodology : z.string(),
      ScheduleTools : z.string(),
      LevelOfAccuracy : z.string(),
      UnitsOfMeasure : z.string(),
      VarianceThresholds : z.string(),
      ScheduleReportingAndFormat : z.string(),
      ProcessManagementActivitySequencing : z.string(),
      ProcessManagementEstimatingResources : z.string(),
      ProcessManagementEstimatingEffortAndDuration : z.string(),
      ProcessManagementUpdatingMonitoringAndControlling : z.string(),
      ProcessManagementActivityidentification : z.string(),
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
      await ctx.prisma.scheduelManagementPlan.create({
        data:{
            PlanningId : planning?.id ,
            ScheduleMethodology : input.ScheduleMethodology,
            ScheduleTools : input.ScheduleTools,
            LevelOfAccuracy :  input.LevelOfAccuracy,
            UnitsOfMeasure : input.UnitsOfMeasure,
            VarianceThresholds :  input.VarianceThresholds,
            ScheduleReportingAndFormat :  input.ScheduleReportingAndFormat,
            ProcessManagementActivitySequencing :  input.ProcessManagementActivitySequencing,
            ProcessManagementEstimatingResources :  input.ProcessManagementEstimatingResources,
            ProcessManagementEstimatingEffortAndDuration :  input.ProcessManagementEstimatingEffortAndDuration,
            ProcessManagementUpdatingMonitoringAndControlling :  input.ProcessManagementUpdatingMonitoringAndControlling,
            ProcessManagementActivityidentification :  input.ProcessManagementActivityidentification,
        }
      })
      const data =  await ctx.prisma.scheduelManagementPlan.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      ScheduleMethodology : z.string(),
      ScheduleTools : z.string(),
      LevelOfAccuracy : z.string(),
      UnitsOfMeasure : z.string(),
      VarianceThresholds : z.string(),
      ScheduleReportingAndFormat : z.string(),
      ProcessManagementActivitySequencing : z.string(),
      ProcessManagementEstimatingResources : z.string(),
      ProcessManagementEstimatingEffortAndDuration : z.string(),
      ProcessManagementUpdatingMonitoringAndControlling : z.string(),
      ProcessManagementActivityidentification : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.scheduelManagementPlan.update({
        data:{
            
            ScheduleMethodology : input.ScheduleMethodology,
            ScheduleTools : input.ScheduleTools,
            LevelOfAccuracy :  input.LevelOfAccuracy,
            UnitsOfMeasure : input.UnitsOfMeasure,
            VarianceThresholds :  input.VarianceThresholds,
            ScheduleReportingAndFormat :  input.ScheduleReportingAndFormat,
            ProcessManagementActivitySequencing :  input.ProcessManagementActivitySequencing,
            ProcessManagementEstimatingResources :  input.ProcessManagementEstimatingResources,
            ProcessManagementEstimatingEffortAndDuration :  input.ProcessManagementEstimatingEffortAndDuration,
            ProcessManagementUpdatingMonitoringAndControlling :  input.ProcessManagementUpdatingMonitoringAndControlling,
            ProcessManagementActivityidentification :  input.ProcessManagementActivityidentification,
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.scheduelManagementPlan.findFirst({
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
      const data =  await ctx.prisma.scheduelManagementPlan.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
