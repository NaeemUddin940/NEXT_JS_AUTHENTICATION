// // app/(public)/login/page.tsx
// "use client";

// import { authenticate } from "@/actions/register";
// import InputField from "@/components/common/InputField";
// import { ThemeToggle } from "@/components/ui/toggle-theme";

// import { useActionState } from "react";

// export default function RegisterPage() {
//   const [state, formAction, isPending] = useActionState(authenticate, {
//     success: false,
//     errors: {},
//     message: "",
//     fields: {}, // Server theke asha typed data
//   });
//   console.log(state.errors);
//   return (
//     <div className="max-w-md mx-auto mt-10 p-8 border rounded-xl shadow-sm bg-background">
//       <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
//       <ThemeToggle />
//       <form action={formAction} className="flex flex-col gap-4">
//         <InputField
//           label="Full Name"
//           name="name"
//           placeholder="John Doe"
//           errors={state.errors?.name}
//           defaultValue={state.fields?.name} // Value persistence
//         />

//         <InputField
//           label="Email Address"
//           name="email"
//           type="email"
//           placeholder="john@example.com"
//           errors={state.errors?.email}
//           defaultValue={state.fields?.email}
//         />

//         <InputField
//           label="Password"
//           name="password"
//           type="password"
//           placeholder="••••••••"
//           errors={state.errors}
//         />

//         <button
//           type="submit"
//           disabled={isPending}
//           className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-all font-semibold"
//         >
//           {isPending ? "Signing Up..." : "Sign Up"}
//         </button>

//         {state.message && (
//           <p
//             className={`text-center text-sm mt-2 ${state.success ? "text-green-600" : "text-red-600"}`}
//           >
//             {state.message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

export default function page() {
  return <div>Login</div>;
}
