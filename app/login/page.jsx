// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const login = async () => {
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//     });
//     if (res.ok) router.push("/admin");
//   };

//   return (
//     <div>
//       <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, Loader2 } from "lucide-react"; // Optional: lucide-react for icons

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) {
        router.push("/admin");
      } else {
        alert("Invalid credentials"); // Replace with a nice toast notification later
      }
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 shadow-blue-200 shadow-lg">
            <LockKeyhole className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in</p>
        </div>

        <form onSubmit={login} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email"
                required
                placeholder="name@company.com" 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Forgot?</a>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password"
                required
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg shadow-lg shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign in to Dashboard"
            )}
          </button>
        </form>
        
      </div>
    </div>
  );
}