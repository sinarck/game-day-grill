import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from "bcrypt";
import * as z from 'zod';

// Schema validation throguh zod
const userSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have more than 8 characters'),
    });

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, username, password } = userSchema.parse(body);

        // check for duplicate emails
        const existingEmail = await db.user.findUnique({
            where: { email: email }
        });

        if (existingEmail) {
            return NextResponse.json({
                user: null,
                error: 'Email is already taken'
            }, {
                status: 409
            });
        }

        // check for duplicate usernames
        const existingUsername = await db.user.findUnique({
            where: { username: username }
        });

        if (existingUsername) {
            return NextResponse.json({
                user: null,
                message: 'Username is already taken'
            }, {
                status: 409
            });
        }

        // hash password
        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        // remove password from response
        const { password: _, ...user } = newUser;

        return NextResponse.json({
            user: user,
            message: 'User created successfully'
        }, {
            status: 201
        });

    } catch (e) {
        return NextResponse.json({
            message: 'Something went wrong'
        }, {
            status: 500
        });
    }
}