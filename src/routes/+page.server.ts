import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = async function ({ locals }) {
  if (locals.user) {
    return {
      loggedIn: true,
      username: locals.user.username,
      signProgresses: await prisma.userSignProgress.findMany({
				where: {
					user: {
						id: locals.user.id
					}
				}
			}) 
    }
  }

  return {
    loggedIn: false
  };
} satisfies PageServerLoad;