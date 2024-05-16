import { z } from "zod";
import { publicProcedure } from "../api/trpc";




export const updateUser = publicProcedure
.input(z.object({ 
  userId : z.string().uuid(),
  name: z.string() ,
  lastName : z.string(),
  phone : z.string(),
  zipCode : z.string(),
  location : z.string(),
  photo : z.string()
}) )
.mutation( async ({ input , ctx  }) => {

 const user =  await ctx.prisma.user.update({
    data: {
      lastName : input.lastName , 
      location : input.location , 
      name : input.name , 
      photo : input.photo , 
      zipCode : input.zipCode
    },
    where : {
      id : input.userId
    }
  })
  return user
})