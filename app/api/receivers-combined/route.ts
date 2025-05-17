import connectDB from '@/app/lib/mongodb';
import { UserReceiver } from '@/app/models/UserReceiver';
import { UserReceiverAddress } from '@/app/models/UserReceiverAddress';
import { UserReceiverEmail } from '@/app/models/UserReceiverEmail';
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

    // Get all receivers for the current user
    const receivers = await UserReceiver.find({ user_id: decoded.userId });

    // Get all emails and addresses for the user
    const emails = await UserReceiverEmail.find({ user_id: decoded.userId });
    const addresses = await UserReceiverAddress.find({
      user_id: decoded.userId,
    });

    // Combine all data
    const receiverData = {
      receivers: receivers.map((receiver) => ({
        id: receiver._id,
        name: receiver.name,
      })),
      emails: emails.map((email) => ({
        id: email._id,
        email: email.email,
      })),
      addresses: addresses.map((address) => ({
        id: address._id,
        address: address.address,
      })),
    };

    return NextResponse.json(receiverData);
  } catch (error) {
    console.error('Error fetching combined receiver data:', error);
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

    const { name, email, address } = await request.json();
    await connectDB();

    // Create new entries based on provided data
    const result: any = { success: true };

    if (name) {
      const newReceiver = await UserReceiver.create({
        user_id: decoded.userId,
        name,
      });
      result.receiver = {
        id: newReceiver._id,
        name: newReceiver.name,
      };
    }

    if (email) {
      const newEmail = await UserReceiverEmail.create({
        user_id: decoded.userId,
        email,
      });
      result.email = {
        id: newEmail._id,
        email: newEmail.email,
      };
    }

    if (address) {
      const newAddress = await UserReceiverAddress.create({
        user_id: decoded.userId,
        address,
      });
      result.address = {
        id: newAddress._id,
        address: newAddress.address,
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating receiver data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
