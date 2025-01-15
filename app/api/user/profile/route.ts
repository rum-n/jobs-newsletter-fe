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
      const decoded = verify(token, process.env.JWT_SECRET) as {
        userId: string
        email: string
        iat: number
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          keywords: true
        }
      })

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(user)
    } catch (verifyError) {
      console.error('JWT verification failed:', verifyError)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
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
      const decoded = verify(token, process.env.JWT_SECRET) as {
        userId: string
        email: string
        iat: number
      }

      const data = await request.json()

      const user = await prisma.user.update({
        where: { id: decoded.userId },
        data: {
          name: data.name,
          keywords: Array.isArray(data.keywords) ? data.keywords : []
        },
        select: {
          id: true,
          email: true,
          name: true,
          keywords: true
        }
      })

      return NextResponse.json(user)
    } catch (verifyError) {
      console.error('JWT verification failed:', verifyError)
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 }
    )
  }
}