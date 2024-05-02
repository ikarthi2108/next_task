import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export default function handler(req, res) {
  const { productId } = req.query;
   
  if (req.method === 'DELETE') {
     // Handle the DELETE request here
     // Your deletion logic goes here
     res.status(200).json({ message: 'Product deleted successfully' });
  } else {
     res.status(405).json({ message: 'Only DELETE requests are allowed' });
  }
 }
