import { NextResponse } from 'next/server'

import { hash } from 'bcryptjs'
import { prisma } from '@/app/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    
    const hashedPassword = await hash(password, 12)
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
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