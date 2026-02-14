export const requireAuth = async (request: Request) => {
  const cookieHeader = request.headers.get("Cookie") as string;
  const cookies = new URLSearchParams(cookieHeader);

  const sessionCookie = cookies.get("session_token");

  if (!sessionCookie) {
    throw new Response("Unauthorized", { status: 401 });
  }

  return sessionCookie; 
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

const ME_QUERY = `query Me {
  me {
    customerId
    fullName
    userName
    email
    role
    authProvider
    socialId
    phoneNumber
    isVerified
    profilePicture
    interests
    major
    occupation
    isActive
    stripeId
    updatedAt
    createdAt
    company {
      id
      name
      email
      isActive
      taxId
      taxName
      stripeId
      setupIntentClientSecret
      address
    }
  }
}`;

export type RequireRoleUser = {
  customerId: string;
  fullName: string;
  userName: string;
  email: string;
  role?: string | null;
  authProvider?: string | null;
  socialId?: string | null;
  phoneNumber?: string | null;
  isVerified?: boolean | null;
  profilePicture?: string | null;
  interests?: Array<string | null> | null;
  major?: string | null;
  occupation?: string | null;
  isActive?: boolean | null;
  stripeId?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
  company?: {
    id: string;
    name: string;
    email: string;
    isActive?: boolean | null;
    taxId?: string | null;
    taxName?: string | null;
    stripeId?: string | null;
    setupIntentClientSecret?: string | null;
    address?: string | null;
  } | null;
};

/**
 * Server-side role guard for use in route loaders.
 * Fetches the current user and throws a redirect if their role
 * is not in the list of allowed roles.
 */
export async function requireRole(
  sessionToken: string,
  apiTarget: string,
  allowedRoles: string[],
): Promise<RequireRoleUser> {
  const response = await fetch(`${apiTarget}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session_token=${sessionToken}`,
    },
    body: JSON.stringify({ query: ME_QUERY }),
  });

  if (!response.ok) {
    const { redirect } = await import("react-router");
    throw redirect("/login");
  }

  const { data } = await response.json();

  if (!data?.me?.role || !allowedRoles.includes(data.me.role)) {
    const { redirect } = await import("react-router");
    throw redirect("/login");
  }

  return data.me;
}