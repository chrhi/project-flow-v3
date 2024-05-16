import { z } from 'zod';
import { getProjectCharter } from '~/pdfs/integrations/paject-charter';
import { generatePdf } from '~/lib/puppeteer';
import { v4 as uuid } from 'uuid';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { get_Activity_list } from '~/pdfs/integrations/activity-list';
import { get_project_managment_plan } from '~/pdfs/integrations/get-project-management-plan';


export const integrationsRouter = createTRPCRouter({
  ProjectCharter: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const buffer = await generatePdf(await getProjectCharter({ projectId: input.projectId }));
      const fileName = uuid();
      const { error } = await ctx.supabase.storage.from('documents').upload(
        `${input.projectId}/${fileName}.pdf`,
        buffer,
        { contentType: 'application/pdf' }
      );
      const { data } = ctx.supabase.storage.from('documents').getPublicUrl(`${input.projectId}/${fileName}.pdf`);
      const decodedUrl = decodeURI(data.publicUrl);

     const document =  await ctx.prisma.document.create({
        data: {
          projectId : input.projectId , 
          path: `${input.projectId}/${fileName}.pdf`,
          status: 'build',
          name: 'project charter',
          url: decodedUrl,
        },
      }).catch(err => {
        throw new Error('failed to create  document row ') 
      })

      if (error) {
        throw new Error('failed to load the document');
      }

      return document
    }),

    Activity_list_create :  publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const buffer = await generatePdf(await get_Activity_list({ projectId: input.projectId }));
      const fileName = uuid();
      const { error } = await ctx.supabase.storage.from('documents').upload(
        `${input.projectId}/${fileName}.pdf`,
        buffer,
        { contentType: 'application/pdf' }
      );
      const { data } = ctx.supabase.storage.from('documents').getPublicUrl(`${input.projectId}/${fileName}.pdf`);
      const decodedUrl = decodeURI(data.publicUrl);

     const document =  await ctx.prisma.document.create({
        data: {
          projectId : input.projectId , 
          path: `${input.projectId}/${fileName}.pdf`,
          status: 'build',
          name: 'Activity_List',
          url: decodedUrl,
        },
      }).catch(err => {
        throw new Error('failed to create  document row ') 
      })

      if (error) {
        throw new Error('failed to load the document');
      }

      return document
    }),

    Projct_managmant_plan :  publicProcedure
    .input(z.object({ projectId: z.string() }))
    .mutation(async ({ input, ctx }) => {

      const pdfAsString = await get_project_managment_plan({ projectId: input.projectId })
      if(!pdfAsString) {
        throw new Error('failed to create  document row ') 
      }
      const buffer = await generatePdf(pdfAsString);
      const fileName = uuid();
      const { error } = await ctx.supabase.storage.from('documents').upload(
        `${input.projectId}/${fileName}.pdf`,
        buffer,
        { contentType: 'application/pdf' }
      );
      const { data } = ctx.supabase.storage.from('documents').getPublicUrl(`${input.projectId}/${fileName}.pdf`);
      const decodedUrl = decodeURI(data.publicUrl);

     const document =  await ctx.prisma.document.create({
        data: {
          projectId : input.projectId , 
          path: `${input.projectId}/${fileName}.pdf`,
          status: 'build',
          name: 'Activity_List',
          url: decodedUrl,
        },
      }).catch(err => {
        throw new Error('failed to create  document row ') 
      })

      if (error) {
        throw new Error('failed to load the document');
      }

      return document
    }),

});