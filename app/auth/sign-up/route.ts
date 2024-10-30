import prisma from '@/app/db/client';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { values } = await request.json();

        // Check If user exists or not
        const user = await prisma.user.findUnique({
            where: {
                email: values.email
            }
        })

        if (user) {
            return NextResponse.json({ error: "User Already Exists" }, { status: 409 });
        } else {
            // Hash Password
            const salt = await bcryptjs.genSalt(10);
            const hashPassword = await bcryptjs.hash(values.password, salt);

            const savedUser = await prisma.user.create({
                data: {
                    username: values.username,
                    email: values.email,
                    password: hashPassword
                }
            });

            if (savedUser) {
                return NextResponse.json({ message: "User Created Successfully" }, { status: 201 });
            }
        }


    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}