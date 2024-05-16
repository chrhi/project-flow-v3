import { TRPCError } from "@trpc/server"
import bcrypt from "bcrypt"
import {sign } from "jsonwebtoken"
import { z } from "zod";
import { publicProcedure } from "../api/trpc";




export const verifyUser = publicProcedure
.input(z.object({ email: z.string() , password : z.string() }) )
.mutation(async ({ input  , ctx}) => {
   //get the user from prisma

   const user = await ctx.prisma.user.findFirstOrThrow({
    where:{
      email : input.email
    }
  }).catch(error => {
    console.log(error)
    throw new Error("password or email are not currect")
  })
  if(!user.password) throw new Error("user dont have password")
  // see if user password is currect
  
  const response = await bcrypt.compare(input.password, user?.password)
  if(response){
    const jwt = sign({
      id : user?.id  , 
      email :  user?.email ,
     }, process.env.JWT_SECRET_KEY_SUPABASE!)
  
    return {...user , jwt} 
  }else{
    throw new TRPCError({code:"BAD_REQUEST" , message : "password or email are not currect"})
  }
  
 
})


