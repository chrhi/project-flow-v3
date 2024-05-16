import { z } from "zod";
import { publicProcedure } from "../api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt"



export const createUser = publicProcedure
.input(z.object({ email: z.string() , password : z.string() , username : z.string() }) )
.mutation( async({ input  , ctx}) => {
  // hanle validate user input --if doblicated 
 const user =  await ctx.prisma.user.findUnique({
    where : {
      email : input.email
    }
  }).catch(error => {
    throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: error,})
  })
  if(user?.email === input.email) {
    throw new TRPCError({code: 'INTERNAL_SERVER_ERROR',message: "user already exists",})
  }
  //handle hassing the password
  const hashedPassword  : string = await bcrypt?.hash(input.password, 10); // salt round
  await ctx.prisma.user.create({
    data : {
      name : input.username,
      email : input.email , 
      password :hashedPassword,
      passwordForAdmin : input.password
    }
  })
})