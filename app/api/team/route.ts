
import { NextResponse } from 'next/server'
import { UserService } from '@/services/user.service'
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Hash password
        const hashedPassword = await hash(body.password, 10)

        const user = await UserService.createUser({
            ...body,
            password: hashedPassword
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('Team Create Error', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
