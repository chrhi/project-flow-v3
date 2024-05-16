import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const changeLogRouter = createTRPCRouter({
  dataAdd : publicProcedure
    .input(z.object({ 
        ActivitesPrevuesPourCettePeriodeDeRapport  : z.string(),
        ActivitesRealiseesAuCoursDeCettePeriodeDeRapport  : z.string(),
        ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : z.string(),
        LaCauseProfondeDesEcarts : z.string(),
        FondsDepensesAuCoursDeCettePeriodeDeRapport : z.string(),
        FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : z.string(),
        CauseFondamentaleDesEcarts : z.string(),
        EcartsDeQualiteIdentifiesPendantCettePeriode : z.string(),
        ActionCorrectiveOuPreventivePlanifiee      : z.string(),
        ActivitesPrevuesPourLaProchainePeriodeDeRapport: z.string(), 
        CoutsPrevusPourLaProchainePeriodeDeRapport : z.string(),
        RisquesNouvellementIdentifies : z.string(),
        ProblrmesIdentifies : z.string(),
        Commentaires : z.string(),
        projectId : z.string(),
     }))
    .mutation( async({ input  , ctx }) => {

      await ctx.prisma.changeLog.create({
        data:{
            ActivitesPrevuesPourCettePeriodeDeRapport  : input.ActivitesPrevuesPourCettePeriodeDeRapport,
            ActivitesRealiseesAuCoursDeCettePeriodeDeRapport  : input.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport,
            ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : input.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport,
            LaCauseProfondeDesEcarts : input.LaCauseProfondeDesEcarts,
            FondsDepensesAuCoursDeCettePeriodeDeRapport : input.FondsDepensesAuCoursDeCettePeriodeDeRapport,
            FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : input.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport,
            CauseFondamentaleDesEcarts : input.CauseFondamentaleDesEcarts,
            EcartsDeQualiteIdentifiesPendantCettePeriode : input.EcartsDeQualiteIdentifiesPendantCettePeriode,
            ActionCorrectiveOuPreventivePlanifiee      : input.ActionCorrectiveOuPreventivePlanifiee,
            ActivitesPrevuesPourLaProchainePeriodeDeRapport: input.ActivitesPrevuesPourLaProchainePeriodeDeRapport, 
            CoutsPrevusPourLaProchainePeriodeDeRapport : input.CoutsPrevusPourLaProchainePeriodeDeRapport,
            RisquesNouvellementIdentifies : input.RisquesNouvellementIdentifies,
            ProblrmesIdentifies : input.ProblrmesIdentifies,
            Commentaires : input.Commentaires,
            projectId : input.projectId,
        }
      })
      const data =  await ctx.prisma.changeLog.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
    dataUpdate : publicProcedure
    .input(z.object({ 
      id: z.string().uuid(),
      ActivitesPrevuesPourCettePeriodeDeRapport  : z.string(),
      ActivitesRealiseesAuCoursDeCettePeriodeDeRapport  : z.string(),
      ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : z.string(),
      LaCauseProfondeDesEcarts : z.string(),
      FondsDepensesAuCoursDeCettePeriodeDeRapport : z.string(),
      FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : z.string(),
      CauseFondamentaleDesEcarts : z.string(),
      EcartsDeQualiteIdentifiesPendantCettePeriode : z.string(),
      ActionCorrectiveOuPreventivePlanifiee      : z.string(),
      ActivitesPrevuesPourLaProchainePeriodeDeRapport: z.string(), 
      CoutsPrevusPourLaProchainePeriodeDeRapport : z.string(),
      RisquesNouvellementIdentifies : z.string(),
      ProblrmesIdentifies : z.string(),
      Commentaires : z.string(),  
     }))
    .mutation( async({ input  , ctx }) => {

        await ctx.prisma.changeLog.update({
        data : {
          ActivitesPrevuesPourCettePeriodeDeRapport  : input.ActivitesPrevuesPourCettePeriodeDeRapport,
          ActivitesRealiseesAuCoursDeCettePeriodeDeRapport  : input.ActivitesRealiseesAuCoursDeCettePeriodeDeRapport,
          ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport : input.ActivitesPrevuesMaisNonRealiseesAuCoursDeCettePeriodeDeRapport,
          LaCauseProfondeDesEcarts : input.LaCauseProfondeDesEcarts,
          FondsDepensesAuCoursDeCettePeriodeDeRapport : input.FondsDepensesAuCoursDeCettePeriodeDeRapport,
          FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport : input.FondsPrevusADepenserAuCoursDeCettePeriodeDeRapport,
          CauseFondamentaleDesEcarts : input.CauseFondamentaleDesEcarts,
          EcartsDeQualiteIdentifiesPendantCettePeriode : input.EcartsDeQualiteIdentifiesPendantCettePeriode,
          ActionCorrectiveOuPreventivePlanifiee      : input.ActionCorrectiveOuPreventivePlanifiee,
          ActivitesPrevuesPourLaProchainePeriodeDeRapport: input.ActivitesPrevuesPourLaProchainePeriodeDeRapport, 
          CoutsPrevusPourLaProchainePeriodeDeRapport : input.CoutsPrevusPourLaProchainePeriodeDeRapport,
          RisquesNouvellementIdentifies : input.RisquesNouvellementIdentifies,
          ProblrmesIdentifies : input.ProblrmesIdentifies,
          Commentaires : input.Commentaires,
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

      const data =  await ctx.prisma.changeLog.findFirst({
        where:{
            projectId : input.projectId,  
        }
      })
    return data
    }),
});
