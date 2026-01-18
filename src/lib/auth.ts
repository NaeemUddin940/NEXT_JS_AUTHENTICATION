import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins"; // অ্যাডমিন প্লাগইন ইমপোর্ট করা হচ্ছে
import { db } from "./mongodb";

export const auth = betterAuth({
  // ১. ডেটাবেস কানেকশন: আপনার তৈরি করা MongoDB কানেকশনটি এখানে ব্যবহার করা হচ্ছে।
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    // ২. সেশন সেটিংস:
    expiresIn: 10, // এটি সেকেন্ড হিসেবে ধরা হয় (এখানে ১০ সেকেন্ড দেওয়া আছে, যা খুব কম। সাধারণত ৭ দিন হলে সেটা অনেক বড় সংখ্যা হয়)।
    updateAge: 20, // সেশন কতক্ষণ পর পর আপডেট হবে। ০ মানে প্রতিবার রিকোয়েস্টে আপডেট হতে পারে।
    cookieCache: {
      enabled: false, // ব্রাউজারে কুকি ক্যাশ বন্ধ রাখা হয়েছে যাতে টেস্টিং এর সময় লেটেস্ট ডাটা পাওয়া যায়।
    },
  },

  // ৩. প্লাগইনস: এখানে অ্যাডমিন প্লাগইনটি যুক্ত করা হয়েছে যা দিয়ে ইউজারদের রোল (Admin/User) কন্ট্রোল করা যাবে।
  plugins: [admin()],

  // ৪. সোশ্যাল লগইন: গুগল এবং ফেসবুক দিয়ে লগইন করার কনফিগারেশন।
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    },
  },

  // ৫. ইউজার ফিল্ডস: ইউজারের সাথে বাড়তি কিছু তথ্য সেভ করার জন্য।
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user", // নতুন কেউ সাইন-আপ করলে সে ডিফল্টভাবে 'user' রোল পাবে।
        input: false, // ইউজার নিজে থেকে সাইন-আপ করার সময় তার রোল পরিবর্তন করতে পারবে না (সিকিউরিটির জন্য)।
      },
    },
  },
});
