import { hash } from 'bcryptjs'
import { prisma } from '@/prisma/prisma'
import { randomBytes } from 'crypto'
import sgMail from '@sendgrid/mail'
import { z } from 'zod'
import { NextResponse } from 'next/server'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.error('❌ SENDGRID_API_KEY is not configured')
}

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    let body
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json({ error: 'Invalid request body', details: e }, { status: 400 })
    }

    // 2. Validate input
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input', details: result.error.errors }, { status: 400 })
    }

    const { email, password } = result.data

    // 3. Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // 4. Hash password
    const hashedPassword = await hash(password, 12)
    const verificationToken = randomBytes(32).toString('hex')

    // 5. Create user
    let user
    try {
      user = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: '',
          keywords: [],
          isVerified: false,
          verificationToken: verificationToken,
          verificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
          resetToken: null,
          resetTokenExpiry: null
        },
      })
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error'
      return NextResponse.json({ error: 'Failed to create user in database', details: errorMessage }, { status: 500 })
    }

    // 6. Send verification email
    if (!process.env.SENDGRID_API_KEY) {
      await prisma.user.delete({ where: { id: user.id } })
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${verificationToken}`

    try {
      if (!process.env.SENDGRID_FROM_EMAIL) {
        throw new Error('SENDGRID_FROM_EMAIL not configured')
      }

      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Verify your email address',
        text: `Please verify your email address by clicking the following link: ${verificationUrl}`,
        html: `
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${verificationUrl}">Verify Email Address</a></p>
        `,
      })

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Please check your email to verify your account'
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )

    } catch (emailError) {
      const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email error'
      await prisma.user.delete({ where: { id: user.id } })
      return NextResponse.json({ error: 'Failed to send verification email', details: errorMessage }, { status: 500 })
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'Failed to process request', details: errorMessage }, { status: 500 })
  }
}
