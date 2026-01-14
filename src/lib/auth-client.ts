import { adminClient } from "better-auth/client/plugins"; // ক্লায়েন্ট সাইডের জন্য অ্যাডমিন প্লাগইন ইমপোর্ট করা হচ্ছে
import { createAuthClient } from "better-auth/react";
import { env } from "./env";

// ১. authClient তৈরি করা হচ্ছে: এটি আপনার ফ্রন্টএন্ড থেকে লগইন, লগআউট বা সেশন চেক করার জন্য ব্যবহার হবে।
export const authClient = createAuthClient({
  // ২. বেস ইউআরএল: আপনার অ্যাপের মেইন ইউআরএল (যেমন: http://localhost:3000) যা env ফাইল থেকে আসছে।
  baseURL: env.BETTER_AUTH_URL,

  // ৩. প্লাগইনস: ক্লায়েন্ট সাইডে অ্যাডমিন সংক্রান্ত কাজগুলো (যেমন: ইউজারের রোল চেক করা) করার জন্য এটি প্রয়োজন।
  plugins: [adminClient()],
});