import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '../../../../prisma/prisma'
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional()
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received login request:', { email: body.email, hasPassword: !!body.password })

    const { email, password } = loginSchema.parse(body)

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          password: true
        }
      })

      if (!user || !user.id) {
        console.log('User not found:', email)
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      console.log('Password validation result:', { isValid: isPasswordValid })

      if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
      }

      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined')
        return NextResponse.json({ message: 'Server configuration error' }, { status: 500 })
      }

      // Ensure we have a valid payload for JWT
      const tokenPayload = {
        userId: user.id,
        email: email,
        iat: Math.floor(Date.now() / 1000)
      }

      console.log('Creating token with payload:', { userId: tokenPayload.userId }) // Log payload

      const token = sign(tokenPayload, process.env.JWT_SECRET)

      const cookieStore = await cookies()
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      })

      return NextResponse.json({ success: true })
    } catch (dbError) {
      console.error('Database operation failed:', dbError)
      return NextResponse.json(
        { message: 'Database error', error: String(dbError) },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Login error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: 'Invalid input',
        details: error.errors
      }, { status: 400 })
    }

    return NextResponse.json(
      {
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}