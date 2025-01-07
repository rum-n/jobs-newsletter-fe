import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/prisma/prisma'

export async function DELETE() {
  try {
    const token = (await cookies()).get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined')
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as { userId: string }
      // Delete user and their preferences (will cascade due to Prisma relations)
      await prisma.user.delete({
        where: { id: decoded.userId },
      });

      // Clear the auth cookie
      (await cookies()).delete('auth-token');

      return NextResponse.json({ success: true })
    } catch (verifyError) {
      console.error('JWT verification failed:', verifyError)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}