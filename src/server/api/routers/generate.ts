import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from '~/env.mjs';

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: env.DALLE_API_KEY, 
})

const openai = new OpenAIApi(configuration); 

export const generateRouter = createTRPCRouter({
    generateCover: protectedProcedure.input(z.object({
        prompt: z.string(),
    })).mutation(async ({ctx, input}) => {

        const { count } = await ctx.prisma.user.updateMany({
            where: {
                id: ctx.session.user.id,
                credits: {
                    gte: 1,
                },
            },
            data: {
                credits: {
                    decrement: 1
                }
            }
        })

        if (count <= 0) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Not enough credits baby'
            })
        }

        const response = await openai.createImage({
            prompt: input.prompt,
            n: 1,
            size: "1024x1024", 
        });

        const url = response.data.data[0]?.url

        return {
            imageUrl: url, 
        }
    })
});
