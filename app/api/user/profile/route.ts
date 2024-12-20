import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { prisma } from '../../../../prisma/prisma'

export async function GET() {
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

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { preferences: true }
      })

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        )
      }

      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json(userWithoutPassword)
    } catch (verifyError) {
      console.error('JWT verification failed:', verifyError)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}