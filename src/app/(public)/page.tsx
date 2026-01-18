import AuthPage from "@/components/authentication";

export default function page() {
  return (
    <div className="h-120">
      <h1 className="text-5xl text-center font-bold text-cyan-500">
        This is home page Form All Users
      </h1>
      <div className="flex items-center justify-center h-110">
        <div>Home Page content</div>
      </div>
      <AuthPage />
    </div>
  );
}
