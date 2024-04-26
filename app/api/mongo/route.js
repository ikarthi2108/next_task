import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';

export async function POST(request){
    let body = await request.json();

    const uri = "mongodb+srv://karthicloud6:karthicloud6@cluster0.rcyerif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('users');
        const userData = database.collection('userdata');

        // Check if email or mobile number already exists
        const existingUser = await userData.findOne({
            $or: [
                { email: body.email },
                { mobileNo: body.mobileNo }
            ]
        });

        if (existingUser) {
            console.log('Email or mobile number already exists.');
            return NextResponse.json({ ok: false, error: 'Email or mobile number already exists.' });
        }

        // If email and mobile number are unique, insert new user data
        const data = await userData.insertOne(body);
        return NextResponse.json({ ok: true, data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', { status: 500 });
    } finally {
        await client.close();
    }
}
