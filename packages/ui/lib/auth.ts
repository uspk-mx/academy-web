export const requireAuth = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie") as string;
  const cookies = new URLSearchParams(cookieHeader);

  const sessionCookie = cookies.get("session_token");

  if (!sessionCookie) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return sessionCookie; // Or decode/validate if necessary
};

export const isAuthenticated = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie") as string;
  const cookies = new URLSearchParams(cookieHeader);

  const sessionCookie = cookies.get("session_token");
  return Boolean(sessionCookie);
};


type PublicRoles = 'business' | 'student';

const RoleMap: Record<PublicRoles, string> = {
  business: '/business',
  student: '/dashboard',
};

export function shouldRedirectBasedOnDifferentRole(userRole: string | undefined | null, roleToCompare: string): string | undefined {
  if (!userRole || !(userRole in RoleMap)) {
    return undefined; // Handle invalid or undefined roles gracefully
  }

  if (userRole !== roleToCompare) {
    return RoleMap[userRole as PublicRoles];
  }

  return undefined;
}