import { z } from "zod";
import { publicProcedure } from "../api/trpc";




export const getAllUser = publicProcedure

.query(({ ctx }) => {
 const users = ctx.prisma.user.findMany()
 return users
})