import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    // Update user verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null
      }
    })

    // Redirect to login page with success parameter
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('verified', 'true')
    return NextResponse.redirect(loginUrl)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify email', details: error },
      { status: 500 }
    )
  }
}