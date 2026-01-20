"use client";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="p-6 text-center border-b border-gray-400">
      <ul className="flex gap-10 justify-center">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/user/profile">Profile</Link>
        </li>

        <li>
          <Link href="/authentication">Authentication</Link>
        </li>
      </ul>
    </div>
  );
}
