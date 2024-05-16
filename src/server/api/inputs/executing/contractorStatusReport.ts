import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const contractStatusReport = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
    projectId: z.string().uuid(),
  
    ScopePerformanceThisReportingPeriod : z.string() ,
    QualityPerformanceThisReportingPeriod  : z.string() ,
    SchedulePerformanceThisReportingPeriod : z.string() ,
    PlannedCorrectiveOrPreventiveAction : z.string() ,
    CostPerformanceThisReportingPeriod : z.string() ,
    ForecastPerformanceForFutureReportingPeriods : z.string() ,
    ClaimsOrDisputes : z.string() ,
    Risks : z.string() ,
    Issues : z.string() ,
    Comments: z.string() ,
     }))
    .mutation( async({ input  , ctx }) => {
     const controlling =  await ctx.prisma.controlling.findFirst({
        where :{
          projectId : input.projectId
        }
      })
      if(!controlling || !controlling.id){
        throw new TRPCError({code: 'UNAUTHORIZED',message: "planning dost have id "})
      }
      await ctx.prisma.contractorStatusReport.create({
        data:{
          ControllingId :controlling.id, 
          ScopePerformanceThisReportingPeriod :  input.ScopePerformanceThisReportingPeriod , 
          QualityPerformanceThisReportingPeriod  : input.QualityPerformanceThisReportingPeriod , 
          SchedulePerformanceThisReportingPeriod : input.SchedulePerformanceThisReportingPeriod , 
          PlannedCorrectiveOrPreventiveAction :  input.PlannedCorrectiveOrPreventiveAction , 
          CostPerformanceThisReportingPeriod :  input.CostPerformanceThisReportingPeriod , 
          ForecastPerformanceForFutureReportingPeriods :  input.ForecastPerformanceForFutureReportingPeriods , 
          ClaimsOrDisputes :  input.ClaimsOrDisputes , 
          Risks :  input.Risks , 
          Issues :  input.Issues , 
          Comments:  input.Comments , 
        }
      })
      const data =  await ctx.prisma.contractorStatusReport.findFirst({
        where:{
          ControllingId : controlling?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
     
    ControllingId : z.string() , 
    ScopePerformanceThisReportingPeriod : z.string() ,
    QualityPerformanceThisReportingPeriod  : z.string() ,
    SchedulePerformanceThisReportingPeriod : z.string() ,
    PlannedCorrectiveOrPreventiveAction : z.string() ,
    CostPerformanceThisReportingPeriod : z.string() ,
    ForecastPerformanceForFutureReportingPeriods : z.string() ,
    ClaimsOrDisputes : z.string() ,
    Risks : z.string() ,
    Issues : z.string() ,
    Comments: z.string() ,
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.contractorStatusReport.update({
        data:{
          ScopePerformanceThisReportingPeriod :  input.ScopePerformanceThisReportingPeriod , 
          QualityPerformanceThisReportingPeriod  : input.QualityPerformanceThisReportingPeriod , 
          SchedulePerformanceThisReportingPeriod : input.SchedulePerformanceThisReportingPeriod , 
          PlannedCorrectiveOrPreventiveAction :  input.PlannedCorrectiveOrPreventiveAction , 
          CostPerformanceThisReportingPeriod :  input.CostPerformanceThisReportingPeriod , 
          ForecastPerformanceForFutureReportingPeriods :  input.ForecastPerformanceForFutureReportingPeriods , 
          ClaimsOrDisputes :  input.ClaimsOrDisputes , 
          Risks :  input.Risks , 
          Issues :  input.Issues , 
          Comments:  input.Comments , 
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.contractorStatusReport.findFirst({
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
      const controlling =  await ctx.prisma.controlling.findFirst({
        where :{
          projectId : input.projectId
        }
      })
      if(!controlling || !controlling.id){
        throw new TRPCError({code: 'UNAUTHORIZED',message: "controlling dost have id "})
      }
      const data =  await ctx.prisma.contractorStatusReport.findFirst({
        where:{
          ControllingId : controlling?.id ,   
        }
      })
    return data
    }),
});
