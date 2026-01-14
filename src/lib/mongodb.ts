import { MongoClient } from "mongodb";
import { env } from "./env";

// ১. চেক করা হচ্ছে .env ফাইলে MongoDB কানেকশন স্ট্রিং (URI) আছে কি না। না থাকলে এরর দেখাবে।
if (!env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// ২. MongoClient ক্লাসের একটি নতুন অবজেক্ট তৈরি করা হচ্ছে যা ডেটাবেসের সাথে যোগাযোগের টুল হিসেবে কাজ করবে।
const client = new MongoClient(env.MONGODB_URI);

// ৩. কানেকশন স্ট্রিং থেকে ডিফল্ট ডেটাবেসটিকে সিলেক্ট করা হচ্ছে। (এখান থেকেই ডেটা আদান-প্রদান হবে)
const db = client.db(); // আপনি চাইলে ব্র্যাকেটে নির্দিষ্ট ডেটাবেসের নামও দিতে পারেন

// ৪. client এবং db কে এক্সপোর্ট করা হচ্ছে যাতে অন্য ফাইল থেকে এগুলো ব্যবহার করে ডেটাবেসে কাজ করা যায়।
export { client, db };
