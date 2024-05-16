import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const changePlanningRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
      ChangeManagementApproach : z.string(),
      ScheduleChange : z.string(),
      BudgetChange : z.string(),
      ScopeChange : z.string(),
      ProjectDocumentChanges : z.string(),
      ChangeRequestSubmittal : z.string(),
      ChangeRequestTracking : z.string(),
      ChangeRequestReview : z.string(),
      ChangeRequestDisposition : z.string(),
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
      await ctx.prisma.changelManagementPlan.create({
        data:{
            PlanningId : planning?.id ,
            ChangeManagementApproach : input.ChangeManagementApproach,
            ScheduleChange : input.ScheduleChange,
            BudgetChange : input.BudgetChange,
            ScopeChange : input.ScopeChange,
            ProjectDocumentChanges : input.ProjectDocumentChanges,
            ChangeRequestSubmittal : input.ChangeRequestSubmittal,
            ChangeRequestTracking : input.ChangeRequestTracking,
            ChangeRequestReview : input.ChangeRequestReview,
            ChangeRequestDisposition : input.ChangeRequestDisposition,
        }
      })
      const data =  await ctx.prisma.changelManagementPlan.findFirst({
        where:{
          PlanningId : planning?.id ,  
        }
      })
    return data
    }),
 
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      ChangeManagementApproach : z.string(),
      ScheduleChange : z.string(),
      BudgetChange : z.string(),
      ScopeChange : z.string(),
      ProjectDocumentChanges : z.string(),
      ChangeRequestSubmittal : z.string(),
      ChangeRequestTracking : z.string(),
      ChangeRequestReview : z.string(),
      ChangeRequestDisposition : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {
    
      await ctx.prisma.changelManagementPlan.update({
        data:{
            ChangeManagementApproach : input.ChangeManagementApproach,
            ScheduleChange : input.ScheduleChange,
            BudgetChange : input.BudgetChange,
            ScopeChange : input.ScopeChange,
            ProjectDocumentChanges : input.ProjectDocumentChanges,
            ChangeRequestSubmittal : input.ChangeRequestSubmittal,
            ChangeRequestTracking : input.ChangeRequestTracking,
            ChangeRequestReview : input.ChangeRequestReview,
            ChangeRequestDisposition : input.ChangeRequestDisposition,
        },
        where :{
          id : input.id
        }
      })
      const data =  await ctx.prisma.changelManagementPlan.findFirst({
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
      const data =  await ctx.prisma.changelManagementPlan.findFirst({
        where:{
            PlanningId : planning.id,  
        }
      })
    return data
    }),
});
