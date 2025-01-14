import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { prisma } from '@/prisma/prisma'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret-for-development'
    ) as { email: string, type: string }

    if (decoded.type !== 'email-verification') {
      return NextResponse.json({ error: 'Invalid token type' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        email: decoded.email,
        verifyToken: token,
        verifyTokenExpiry: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      return NextResponse.json({
        error: 'Invalid or expired verification token'
      }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiry: null
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully'
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to verify email'
    }, { status: 500 })
  }
}