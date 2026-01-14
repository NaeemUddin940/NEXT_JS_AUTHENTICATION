"use client";
import { authClient } from "@/lib/auth-client"; // আপনার auth-client ফাইলটি ইমপোর্ট করুন
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();

  // ১. better-auth থেকে ইউজারের সেশন ডাটা নেওয়া হচ্ছে
  const { data: session, isPending } = authClient.useSession();

  // ২. লগআউট ফাংশন
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // লগআউট হলে লগইন পেইজে পাঠিয়ে দিবে
        },
      },
    });
  };

  // ডাটা লোড হওয়ার সময় একটি সিম্পল লোডিং স্টেট
  if (isPending) return <div className="text-center mt-20">Loading...</div>;

  // যদি সেশন না থাকে (ইউজার লগইন না থাকে)
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">আপনি লগইন করা নেই</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* উপরের ডিজাইন পার্ট */}
        <div className="h-32 bg-linear-to-r from-blue-500 to-purple-600"></div>

        <div className="px-6 pb-8">
          <div className="relative">
            {/* ইউজারের প্রোফাইল ইমেজ */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={200}
                    height={200}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-3xl font-bold text-gray-400">
                    {session.user.name?.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            {/* ইউজারের নাম এবং ইমেইল */}
            <h2 className="text-2xl font-bold text-gray-800">
              {session.user.name}
            </h2>
            <p className="text-gray-500 mb-2">{session.user.email}</p>

            {/* রোল ব্যাজ (যদি থাকে) */}
            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full uppercase">
              {session.user.role || "User"}
            </span>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col gap-3">
              {/* এডমিন হলে ড্যাশবোর্ড বাটন দেখাবে */}
              {session.user.role === "admin" && (
                <button
                  onClick={() => router.push("/admin/dashboard")}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition"
                >
                  Admin Dashboard
                </button>
              )}

              {/* লগআউট বাটন */}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
