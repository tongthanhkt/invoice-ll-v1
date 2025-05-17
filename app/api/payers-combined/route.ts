import connectDB from '@/app/lib/mongodb';
import { UserPayer } from '@/app/models/UserPayer';
import { UserPayerAddress } from '@/app/models/UserPayerAddress';
import { UserPayerEmail } from '@/app/models/UserPayerEmail';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const token = request.headers
      .get('cookie')
      ?.split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };

    await connectDB();

    // Get all data for the current user
    const [payers, addresses, emails] = await Promise.all([
      UserPayer.find({ user_id: decoded.userId }),
      UserPayerAddress.find({ user_id: decoded.userId }),
      UserPayerEmail.find({ user_id: decoded.userId }),
    ]);

    // Combine all data
    const combinedData = {
      payers,
      addresses,
      emails,
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error('Error fetching combined payer data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Get token from cookies
    const token = request.headers
      .get('cookie')
      ?.split(';')
      .find((c) => c.trim().startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { userId: string };

    const { name, address, email } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await connectDB();

    // Create records in each collection
    const newPayer = await UserPayer.create({
      user_id: decoded.userId,
      name,
    });

    // Only create address if provided
    let newAddress = null;
    if (address) {
      newAddress = await UserPayerAddress.create({
        user_id: decoded.userId,
        address,
      });
    }

    // Only create email if provided
    let newEmail = null;
    if (email) {
      newEmail = await UserPayerEmail.create({
        user_id: decoded.userId,
        email,
      });
    }

    return NextResponse.json({
      payer: newPayer,
      address: newAddress,
      email: newEmail,
    });
  } catch (error) {
    console.error('Error creating combined payer data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
