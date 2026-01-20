import { OptimizedImage } from "@/components/common/OptimizedImage";

export default function page() {
  return (
    <div className="h-120">
      <h1 className="text-5xl text-center font-bold text-cyan-500">
        This is home page Form All Users
      </h1>
      <div className="flex items-center justify-center h-screen">
        <div>Home Page content</div>
      </div>
      <div className="w-100 space-y-40">
        <OptimizedImage src={"/pllenpop.png"} alt={"kajsdk"} />
      </div>
    </div>
  );
}
