import { NextResponse } from 'next/server';
import { UserPayerAddress } from '@/app/models/UserPayerAddress';
import connectDB from '@/app/lib/mongodb';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
    try {
        // Get token from cookies
        const token = request.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

        await connectDB();
        const addresses = await UserPayerAddress.find({
            user_id: decoded.userId
        });

        return NextResponse.json(addresses);
    } catch (error) {
        console.error('Error fetching payer addresses:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // Get token from cookies
        const token = request.headers.get('cookie')?.split(';')
            .find(c => c.trim().startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };

        const { address } = await request.json();

        if (!address) {
            return NextResponse.json({ error: 'Address is required' }, { status: 400 });
        }

        await connectDB();
        const newAddress = await UserPayerAddress.create({
            user_id: decoded.userId,
            address
        });

        return NextResponse.json(newAddress);
    } catch (error) {
        console.error('Error creating payer address:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 