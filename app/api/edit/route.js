import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const uri =
    "mongodb+srv://karthicloud6:karthicloud6@cluster0.rcyerif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('products');
    const values = database.collection('items');

    const allProducts = await values.find().toArray();
    return NextResponse.json({ products: allProducts });
  } finally {
    await client.close();
  }
}
