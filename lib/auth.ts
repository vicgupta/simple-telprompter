import { getSession, SessionData } from './session';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Get the current user from session
 */
export async function getCurrentUser() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    return null;
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      username: users.username,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return user || null;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session.isLoggedIn === true && !!session.userId;
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    throw new Error('Authentication required');
  }
  return true;
}

/**
 * Get session data
 */
export async function getSessionData(): Promise<SessionData> {
  const session = await getSession();
  return {
    userId: session.userId,
    email: session.email,
    username: session.username,
    isLoggedIn: session.isLoggedIn || false,
  };
}
