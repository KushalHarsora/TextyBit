import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import prisma from "@/db/client";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token");

        if (!token) {
            return NextResponse.json({ message: "Token not Found" }, { status: 400 });
        }

        const { id } = jwt.verify(token?.value, process.env.JWT_SECRET_KEY!) as { id: string };

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return NextResponse.json({ message: "User not Found" }, { status: 400 });
        }

        return NextResponse.json({ username: user.username, email: user.email }, { status: 200 });
    } catch (error) {
        console.error(error); // Log the actual error for debugging
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

// export async function POST(request: NextRequest) {
//     try {
//         const { values, email } = await request.json();

//         // Check If user exists or not
//         const user = await User.findOne({ email: email })

//         if(!user) {
//             return NextResponse.json({ message: "User Not Found" }, { status: 404 });
//         } else {
//             const updatedUser = await User.updateOne(
//                 { email: email },
//                 { $set: { username: values?.username } }
//             );
//             if(!updatedUser) {
//                 return NextResponse.json({ message: "Some error occured when updating" }, { status: 409 })
//             }
//         }
//         return NextResponse.json({ message: "Updated Successfully", username: values?.username }, { status: 200 });

//     } catch (error) {
//         console.error(error); // Log the actual error for debugging
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }