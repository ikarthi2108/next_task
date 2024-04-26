import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    let body = await request.json();

    const uri = "mongodb+srv://karthicloud6:karthicloud6@cluster0.rcyerif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('users');
        const userData = database.collection('userdata');

        // Find user by email
        const user = await userData.findOne({ email: body.email });

        if (!user) {
            console.log('User not found.');
            return NextResponse.json({ ok: false, error: 'Invalid email or password.' });
        }

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(body.password, user.password);

        if (!passwordMatch) {
            console.log('Incorrect password.');
            return NextResponse.json({ ok: false, error: 'Invalid email or password.' });
        }

        console.log('User logged in successfully!');
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', { status: 500 });
    } finally {
        await client.close();
    }
}
