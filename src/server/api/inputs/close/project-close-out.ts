import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectCloseOutRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
        ObjectDuProjet     : z.string(),
        CritereDeRealisationDeLaPorteeDuProjet: z.string(),
        ObjectifsDeLaPorteeOntEteAttents : z.string(),
        ObjectifsDeQualiteDuProjet : z.string(),
        CriteresDeRealisationDeLaQualite : z.string(),
        CommentLaQualiteAEteAtteinte : z.string(),
        ObjectifsDeTempsDuProjet : z.string(),
        CriteresDeRealisationDesDelais : z.string(),
        CommentLesObjectifsDeDelaisOntEteAtteints     : z.string(),
        ObjectifsDeCoutDuProjet : z.string(),
        CriteresDeRealisationDesCouts : z.string(),
        CommentLesObjectifsDeCoutsOntEteAtteints : z.string(),
        projectId : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.projectCloseOut.create({
        data:{
            ObjectDuProjet     : input.ObjectDuProjet,
            CritereDeRealisationDeLaPorteeDuProjet: input.CritereDeRealisationDeLaPorteeDuProjet,
            ObjectifsDeLaPorteeOntEteAttents : input.ObjectifsDeLaPorteeOntEteAttents,
            ObjectifsDeQualiteDuProjet : input.ObjectifsDeQualiteDuProjet,
            CriteresDeRealisationDeLaQualite :input.CriteresDeRealisationDeLaQualite ,
            CommentLaQualiteAEteAtteinte :input.CommentLaQualiteAEteAtteinte,
            ObjectifsDeTempsDuProjet :input.ObjectifsDeTempsDuProjet,
            CriteresDeRealisationDesDelais :input.CriteresDeRealisationDesDelais,
            CommentLesObjectifsDeDelaisOntEteAtteints     : input.CommentLesObjectifsDeDelaisOntEteAtteints,
            ObjectifsDeCoutDuProjet : input.ObjectifsDeCoutDuProjet,
            CriteresDeRealisationDesCouts : input.CriteresDeRealisationDesCouts,
            CommentLesObjectifsDeCoutsOntEteAtteints : input.CommentLesObjectifsDeCoutsOntEteAtteints,
            projectId : input.projectId,
        }
      })
      const data =  await ctx.prisma.projectCloseOut.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
       ObjectDuProjet     : z.string(),
        CritereDeRealisationDeLaPorteeDuProjet: z.string(),
        ObjectifsDeLaPorteeOntEteAttents : z.string(),
        ObjectifsDeQualiteDuProjet : z.string(),
        CriteresDeRealisationDeLaQualite : z.string(),
        CommentLaQualiteAEteAtteinte : z.string(),
        ObjectifsDeTempsDuProjet : z.string(),
        CriteresDeRealisationDesDelais : z.string(),
        CommentLesObjectifsDeDelaisOntEteAtteints     : z.string(),
        ObjectifsDeCoutDuProjet : z.string(),
        CriteresDeRealisationDesCouts : z.string(),
        CommentLesObjectifsDeCoutsOntEteAtteints : z.string(),
       
     
     }))
    .mutation( async({ input  , ctx }) => {

        const data =    await ctx.prisma.projectCloseOut.update({
        data : {
            ObjectDuProjet     : input.ObjectDuProjet,
            CritereDeRealisationDeLaPorteeDuProjet: input.CritereDeRealisationDeLaPorteeDuProjet,
            ObjectifsDeLaPorteeOntEteAttents : input.ObjectifsDeLaPorteeOntEteAttents,
            ObjectifsDeQualiteDuProjet : input.ObjectifsDeQualiteDuProjet,
            CriteresDeRealisationDeLaQualite :input.CriteresDeRealisationDeLaQualite ,
            CommentLaQualiteAEteAtteinte :input.CommentLaQualiteAEteAtteinte,
            ObjectifsDeTempsDuProjet :input.ObjectifsDeTempsDuProjet,
            CriteresDeRealisationDesDelais :input.CriteresDeRealisationDesDelais,
            CommentLesObjectifsDeDelaisOntEteAtteints     : input.CommentLesObjectifsDeDelaisOntEteAtteints,
            ObjectifsDeCoutDuProjet : input.ObjectifsDeCoutDuProjet,
            CriteresDeRealisationDesCouts : input.CriteresDeRealisationDesCouts,
            CommentLesObjectifsDeCoutsOntEteAtteints : input.CommentLesObjectifsDeCoutsOntEteAtteints,
        },
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

      const data =  await ctx.prisma.projectCloseOut.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
});
