"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navigation() {
  const role = "user"; // এটি আপনার ডাটাবেস বা অথ থেকে আসবে
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    // লুপ বন্ধ করার জন্য কন্ডিশন:
    // যদি সে অ্যাডমিন না হয় এবং বর্তমানে অ্যাডমিন পেইজে থাকার চেষ্টা করে, তবেই রিডাইরেক্ট হবে
    if (role !== "admin" && pathname.startsWith("/admin")) {
      router.push("/user/profile");
    }
  }, [role, pathname, router]);

  return (
    <div className="p-6 text-center border-b border-gray-400">
      <ul className="flex gap-10 justify-center">
        {role === "admin" ? (
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
        ) : (
          <li>
            <Link href="/user/profile">Profile</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
