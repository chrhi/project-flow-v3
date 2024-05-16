import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Create TRPC router for project
export const projectRouter = createTRPCRouter({

  // Define create_project procedure
  create_project: publicProcedure
    .input(z.object({
      user_id: z.string(),
      title: z.string(),
      startAt: z.date(),
      endsAt: z.date()
    }))
    .mutation(async ({ input, ctx }) => {
      // Create a new project using Prisma
     await ctx.prisma.project.create({
        data: {
          userId: input.user_id,
          title: input.title,
          startAt: input.startAt,
          endsAt: input.endsAt,
          currentPhase : "STARTUP",
        }
      }).catch(err => { throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: err,}) })
      //to get the project is 
      const project = await ctx.prisma.project.findFirst({
        where: {
          userId: input.user_id,
        }
      });

      if(!project || !project.id) throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: "there is no project id abdullah"}) 

      await ctx.prisma.planning.create({
        data: {
          projectId: project?.id,
        }
      }).catch(err => { throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: err,}) })
      
      await ctx.prisma.executing.create({
        data: {
          projectId: project?.id,
        }
      }).catch(err => { throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: err,}) })

        await ctx.prisma.controlling.create({
        data: {
          projectId: project?.id,
        }
      }).catch(err => { throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: err,}) })

        await ctx.prisma.closing.create({
        data: {
          projectId: project?.id,
        }
      }).catch(err => { throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: err,}) })

      return project
    }),

  // Define get_project procedure
  get_project: publicProcedure
    .input(z.object({
      user_id: z.string()
    }))
    .query(async ({ input, ctx }) => {
      // Find the first project matching the user ID using Prisma
      const project = await ctx.prisma.project.findFirst({
        where: {
          userId: input.user_id,
        }
      });
      return project;
    }),

  // Define delete_project procedure
  delete_project: publicProcedure
    .input(z.object({
      project_id: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Delete a project with the given project ID using Prisma
      await ctx.prisma.project.delete({
        where: {
          id: input.project_id,
        },
        include: { Closing : true ,  Comunications : true , Controlling : true , Executing : true , MileStones : true , StakHolder : true , Planning : true , Resource : true , Risk : true , Startup : true , Tasks : true }, // Include the 'children' relation
      });
    }),

  // Define update_project procedure
  update_project: publicProcedure
    .input(z.object({
      project_id: z.string(),
      title: z.string(),
      startAt: z.string(),
      endsAt: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Update a project with the given project ID using Prisma
      await ctx.prisma.project.update({
        data: {
          title: input.title,
          startAt: input.startAt,
          endsAt: input.endsAt
        },
        where: {
          id: input.project_id
        }
      });
    }),
    geoNextPhase: publicProcedure
    .input(z.object({
      project_id: z.string(),
      Phase : z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Update a project with the given project ID using Prisma
     const project =   await ctx.prisma.project.update({
        data: {
          currentPhase: input.Phase,
        },
        where: {
          id: input.project_id
        }
      });

      return project
    }),
    setProjectBreakDown : publicProcedure
    .input(z.object({
      project_id: z.string(),
      projectWorkBreakDown : z.any()
    }))
    .mutation(async ({ input, ctx }) => {
      // Update a project with the given project ID using Prisma
     const project =   await ctx.prisma.project.update({
        data: {
         WorkBreakDownStorage : JSON.stringify(input.projectWorkBreakDown)
        },
        where: {
          id: input.project_id
        }
      });

      return project
    }),

});
