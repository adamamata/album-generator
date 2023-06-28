import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

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

        return {
            message: 'yay it works'
        }
    })
});
