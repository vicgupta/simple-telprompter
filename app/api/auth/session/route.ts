import { NextResponse } from 'next/server';
import { getSessionData, getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const sessionData = await getSessionData();

    if (!sessionData.isLoggedIn) {
      return NextResponse.json(
        { isLoggedIn: false, user: null },
        { status: 200 }
      );
    }

    const user = await getCurrentUser();

    return NextResponse.json(
      {
        isLoggedIn: true,
        user: user ? {
          id: user.id,
          email: user.email,
          username: user.username,
        } : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
