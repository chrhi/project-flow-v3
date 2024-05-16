import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const changeLogRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
        tabel1  : z.any().array(),
        table2  : z.any().array(),
        projectId : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {

        const controlling =  await ctx.prisma.controlling.findFirst({
            where :{
              projectId : input.projectId
            }
          })
          if(!controlling || !controlling.id){
            throw new TRPCError({code: 'UNAUTHORIZED',message: "controlling dost have id "})
          }

        

      await ctx.prisma.issueLog.create({
        data:{
            FirstTable : JSON.stringify(input.tabel1),
            SecondTable : JSON.stringify(input.table2),
            ControllingId : controlling.id
        }
      })
      const data =  await ctx.prisma.issueLog.findFirst({
        where:{
            ControllingId : controlling.id
            
        }
      })
       if(!data?.FirstTable  || !data?.SecondTable) return data
     const prepareData = {
        ...data , FirstTable : JSON.parse(data.FirstTable as string ) ,   SecondTable : JSON.stringify(data.SecondTable ),
     }
     return prepareData
    }),
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
     
     }))
    .mutation( async({ input  , ctx }) => {

        await ctx.prisma.changeLog.update({
        data : {
        
        },
        where:{
            id : input.id,  
        }
      })
      const data =  await ctx.prisma.changeLog.findFirst({
        where:{
            id : input.id,  
        }
      })
      return data
    
    }),
    dataGet : publicProcedure
    .input(z.object({ 
      projectId: z.string().uuid(),
     
     }))
    .query( async({ input  , ctx }) => {
        const controlling =  await ctx.prisma.controlling.findFirst({
            where :{
              projectId : input.projectId
            }
          })
          if(!controlling || !controlling.id){
            throw new TRPCError({code: 'UNAUTHORIZED',message: "controlling dost have id "})
          }

      const data =  await ctx.prisma.issueLog.findFirst({
        where:{
            ControllingId :controlling.id
        }
      })
     const prepareData = {
        ...data , FirstTable : JSON.parse(data?.FirstTable as string ) ,   SecondTable : JSON.stringify(data?.SecondTable ),
     }
     return prepareData
    }),
});
