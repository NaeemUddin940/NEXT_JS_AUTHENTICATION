import { auth } from "@/lib/auth"; // আপনার আগের তৈরি করা সেই মেইন auth কনফিগারেশন ফাইলটি ইমপোর্ট করা হচ্ছে।
import { toNextJsHandler } from "better-auth/next-js"; // এটি Better-Auth এর একটি ফাংশন যা Next.js এর সাথে মানানসই API হ্যান্ডলার তৈরি করে।

// ১. GET এবং POST মেথড এক্সপোর্ট করা হচ্ছে:
// Better-Auth এর সব কাজ (যেমন: লগইন, সাইন-আপ, সোশ্যাল লগইন, সেশন চেক) করার জন্য
// যে API এন্ডপয়েন্টগুলো দরকার, সেগুলো এই একটি লাইনের মাধ্যমেই অটোমেটিক তৈরি হয়ে যায়।
export const { GET, POST } = toNextJsHandler(auth);
