import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "../auth";
import { StakeHolderRouter } from "./routers/stakeholders";
import { projectRouter } from "./routers/project";
import { resourcesRouter } from "./routers/Resources";
import { riskRouter } from "./routers/risk";
import { startupRouter } from "./inputs/startup";
import { projectManagmentPlanRouter } from "./inputs/management-plan/projectManagmentPlan";
import { scopePlanningRouter } from "./inputs/management-plan/scope";
import { riskPlanningRouter } from "./inputs/management-plan/risk-managment-plan";
import { changePlanningRouter } from "./inputs/management-plan/change-managment";
import { scheduelPlanningRouter } from "./inputs/management-plan/scheduel-management";
import { integrationsRouter } from "./pdf-generater/integrations";
import { tasksRouter } from "./routers/tasks-route";
import { mileStoneRouter } from "./routers/mileStones";
import { ProjectObjectivesRouter } from "./routers/project-objectives";
import { changeLogRouter } from "./inputs/controlling/change-log";
import { projectCloseOutRouter } from "./inputs/close/project-close-out";
import { costPlanningRouter } from "./inputs/management-plan/cost-managment";
import { ProjecrLifeCycleRouter } from "./inputs/management-plan/project-life-cycle";
import { comunicationsRouter } from "./routers/comunications";



export const appRouter = createTRPCRouter({
    userRouter,
    StakeHolderRouter,
    projectRouter,
    resourcesRouter,
    riskRouter,
    startupRouter, 
    projectManagmentPlanRouter,
    scopePlanningRouter,
    riskPlanningRouter,
    changePlanningRouter,
    scheduelPlanningRouter,
    integrationsRouter,
    tasksRouter,
    mileStoneRouter,
    ProjectObjectivesRouter,
    changeLogRouter,
    projectCloseOutRouter,
    costPlanningRouter,
    ProjecrLifeCycleRouter,
    comunicationsRouter
    
});

// export type definition of API
export type AppRouter = typeof appRouter;
