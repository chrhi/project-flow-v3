import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Create StakeHolderRouter using createTRPCRouter
export const StakeHolderRouter = createTRPCRouter({

  // Add stakeholder
  add_stakeholder: publicProcedure.input(z.object({
    project_id: z.string().uuid(),
    name: z.string(),
    type: z.string(),
    position: z.string(),
    impact: z.string(),
    role: z.string(),
    Requirements: z.string(),
    contact: z.string(),
    InvestmentAmount: z.string(),
    Expectations: z.string()
  }))
    .mutation(async ({ input, ctx }) => {

      const { name, type, position, impact, project_id, role, Requirements, contact, InvestmentAmount, Expectations } = input;

      // Create new stakeholder
      await ctx.prisma.stakeHolder.create({
        data: {
          projectId: project_id,
          name,
          type,
          position,
          impact,
          role,
          Requirements,
          contact,
          InvestmentAmount,
          Expectations
        }
      });
    }),

  // Remove stakeholder
  remove_stakeholder: publicProcedure.input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      // Delete stakeholder with provided ID
      await ctx.prisma.stakeHolder.delete({
        where: {
          id: input.id
        }
      });
    }),

  // Update stakeholder
  update_stakeholder: publicProcedure.input(z.object({
    id: z.string().uuid(),
    name: z.string(),
    type: z.string(),
    position: z.string(),
    impact: z.string(),
    role: z.string(),
    Requirements: z.string(),
    contact: z.string(),
    InvestmentAmount: z.string(),
    Expectations: z.string()
  }))
    .mutation(async ({ input, ctx }) => {

      const { name, type, position, impact, role, Requirements, contact, InvestmentAmount, Expectations } = input;

      // Update stakeholder with provided ID
     const data =  await ctx.prisma.stakeHolder.update({
        data: {
          name,
          type,
          position,
          impact,
          role,
          Requirements,
          contact,
          InvestmentAmount,
          Expectations
        },
        where: {
          id: input.id
        }
      });
      return data
    }),

  // Get one stakeholder
  get_one_stakeholder: publicProcedure.input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // Find and return stakeholder with provided ID
      const stakeholder = await ctx.prisma.stakeHolder.findUnique({
        where: {
          id: input.id
        }
      });
      return stakeholder;
    }),

  // Get stakeholders
  get_stakeholders: publicProcedure.input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      // Find and return stakeholders with provided project ID
      const stakeholders = await ctx.prisma.stakeHolder.findMany({
        where: {
          projectId: input.projectId
        }
      });
      return stakeholders;
    })

});