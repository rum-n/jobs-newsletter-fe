import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '@/prisma/prisma'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: '',
      },
    })

    // Create JWT token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined')
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }

    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET
    )

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user', details: error },
      { status: 500 }
    )
  }
}