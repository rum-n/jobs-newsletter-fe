import { NextResponse } from 'next/server'

import { hash } from 'bcryptjs'
import { prisma } from '@/prisma/prisma'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: '',
      },
    })

    const { password: _, ...result } = user

    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}