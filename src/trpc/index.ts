import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from "@/db"

type User = {
  id: String
  email: String
}

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser() as User;

    if(!user?.id || !user?.email) throw new TRPCError({code: "UNAUTHORIZED"});

    const userId = user.id.toString();
    const userEmail = user.email.toString();

    // check user in database
    const dbUser = await db.user.findFirst({
      where: {
        id: userId
      }
    });

    if(!dbUser) {
      // user does not exists
      await db.user.create({
        data: {
          id: userId,
          email: userEmail,
        }
      })
    }

    return { success: true }
  })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;