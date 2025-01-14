import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/prisma/prisma'
import { sign } from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  let body
  try {
    body = await request.json()
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  try {
    const { email } = forgotPasswordSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true }
    })

    if (!user || !user.id) {
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive password reset instructions.'
      }, { status: 200 })
    }

    const resetToken = sign(
      { sub: user.id, type: 'password-reset' },
      process.env.JWT_SECRET || 'fallback-secret-for-development',
      { expiresIn: '1h' }
    )

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000)
      }
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    try {
      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
        subject: 'Reset Your Password',
        text: `Click the following link to reset your password: ${resetUrl}`,
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
    }

    return NextResponse.json({
      message: 'If an account exists with this email, you will receive password reset instructions.'
    }, { status: 200 })

  } catch (error) {
    console.error('Password reset error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: 'Invalid email format'
      }, { status: 400 })
    }
    return NextResponse.json({
      message: 'Failed to process request'
    }, { status: 500 })
  }
}