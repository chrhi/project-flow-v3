import { z } from "zod";
import { publicProcedure } from "../api/trpc";




export const BlockUser = publicProcedure
.input(z.object({ ID: z.string() }) )
.mutation( async ({ input , ctx }) => {
  const user = await ctx.prisma.user.update({
    data : {
        status : "BLOCKED"
    },
    where : {
      id : input.ID
    },
    include: {Project : true  }, // Include the 'children' relation
  })
  return user
})

export const UnBlockUser = publicProcedure
.input(z.object({ ID: z.string() }) )
.mutation( async ({ input , ctx }) => {
  const user = await ctx.prisma.user.update({
    data : {
        status : "Active"
    },
    where : {
      id : input.ID
    },
    include: {Project : true  }, // Include the 'children' relation
  })
  return user
})