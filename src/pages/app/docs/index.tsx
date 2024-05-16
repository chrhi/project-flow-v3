import { type NextPage } from "next";
import { Header } from "~/components/header/Header";
import DocsSideBar from "~/components/docsComponents/DocsSideBar";
import Head from "~/components/common/Head";
import { GeneraleBuilder } from "~/components/docsComponents/generale-builder";
import { ProjectCharterBuilder } from "~/components/docsComponents/builders/ProjectCharterBuilder";
import { ProjectManagmentBuilder } from "~/components/docsComponents/builders/projectManagmentPlanBuilder";

const Page: NextPage = () => {
  
  
 
  return (
    <>
     <Head />
      <Header />
      <main className=" custopn-page-height flex w-full justify-center items-center container  bg-white ">
        <DocsSideBar  />
       <div
        className="ml-[20rem] w-[80%]  grid grid-cols-1 lg:grid-cols-2  h-full gap-4 pt-8 pb-8 "
       >
       {/* build the pdf builder component */}
        
        <ProjectCharterBuilder
title="Charte de projet"
color=""
description="Document formalisant les objectifs, le périmètre, les livrables et les parties prenantes d'un projet, établissant ainsi les bases pour sa planification et son exécution. "
phase="Démarrage "
          />

      
        <ProjectManagmentBuilder 

      title="Plan de gestion de projet"
      color="fill-yellow-400 text-yellow-400"
      description="Document détaillant les approches, les processus, les activités, les ressources et les calendriers nécessaires à la gestion et à l'exécution d'un projet." 
      phase="Planification"

        />

        <GeneraleBuilder 
          title="Demande de modification"
          color="fill-gray-900 text-black "
          description="
          Demande de modification - Proposition de modifier un aspect du projet, évaluée et décidée pour approbation, rejet ou report.."
          phase="Exécution"
        />


        <GeneraleBuilder 
          title="Journal des modifications"
          color="fill-green-400 text-green-400"
          description="Journal des modifications - Document enregistrant systématiquement les modifications d'un projet avec date, description, responsable et résultats, assurant traçabilité et visibilité des évolutions."
          phase="Contrôle"
        />


        <GeneraleBuilder 
          title="Journal des décisions"
          color="fill-green-400 text-green-400"
          description="Journal des décisions - Document enregistrant décisions du projet avec date, description, parties prenantes et justifications, assurant transparence et traçabilité des choix tout au long du projet"
          phase="Contrôle"
        />

        <GeneraleBuilder 
          title="Plan d'amélioration des processus"
          color="fill-yellow-400 text-yellow-400"
          description="Plan d'amélioration des processus - Définit actions pour améliorer l'efficacité, qualité et efficience des processus, favorise l'innovation continue dans les opérations de l'entreprise."
          phase="Planification"
        />


        <GeneraleBuilder 
          title="Leçons apprises"
          color="fill-red-400 text-red-400"
          description="Leçons apprises - Enseignements passés, positifs ou négatifs, documentés et utilisés pour améliorer la gestion des projets."
          phase="Clôture "
        />
       
       </div>
      </main>
    </>
  );
};

export default Page;