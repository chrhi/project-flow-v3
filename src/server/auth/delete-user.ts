import { z } from "zod";
import { publicProcedure } from "../api/trpc";




export const deleteUser = publicProcedure
.input(z.object({ ID: z.string() }) )
.mutation( async ({ input , ctx }) => {
  const user = await ctx.prisma.user.delete({
    where : {
      id : input.ID
    },
    include: {Project : true  }, // Include the 'children' relation
  })
  return user
})