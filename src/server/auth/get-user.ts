import { z } from "zod";
import { publicProcedure } from "../api/trpc";
import { TRPCError } from "@trpc/server";




export const getUser = publicProcedure
.input(z.object({ id: z.string() }) )
.query( async ({ input , ctx }) => {

  const user = await ctx.prisma.user.findUniqueOrThrow({
    where : {
      id : input.id
    }
  }).catch(error => {
    throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: error,})
  })

  return user
})