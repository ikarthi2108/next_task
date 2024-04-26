import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';

export async function PUT(request){
  let client;

  try {
    const requestData = await request.json();
    const { productId, updatedProductData } = requestData;

    console.log("Received data:", productId, updatedProductData);

    const uri = "mongodb+srv://karthicloud6:karthicloud6@cluster0.rcyerif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    client = new MongoClient(uri);
    await client.connect();
    const database = client.db('products');
    const productsCollection = database.collection('items');

    const existingProduct = await productsCollection.findOne({ productid: productId });

    if (!existingProduct) {
      console.log('Product not found.');
      return NextResponse.json({ ok: false, error: 'Product not found.' });
    }

    const updatedProduct = await productsCollection.findOneAndUpdate(
      { productid: productId },
      { $set: updatedProductData },
      { returnDocument: 'after' }
    );

    return NextResponse.json({ ok: true, data: updatedProduct });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error('Internal Server Error', { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
