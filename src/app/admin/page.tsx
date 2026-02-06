"use client";
import { useState } from "react";
import { login } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[320px] px-6">
        <div className="text-center mb-12">
          <h1 className="text-sm font-serif tracking-[0.4em] uppercase mb-2">Internal Access</h1>
          <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-light italic">
            Desa Pabean Udik
          </p>
        </div>

        <form action={handleSubmit} className="space-y-8">
          <div className="group">
            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-focus-within:text-black transition-colors">Username</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full border-b border-neutral-100 py-3 focus:border-black outline-none transition-all text-sm font-light"
            />
          </div>

          <div className="group">
            <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-focus-within:text-black transition-colors">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full border-b border-neutral-100 py-3 focus:border-black outline-none transition-all text-sm"
            />
          </div>

          {error && <p className="text-[10px] text-red-500 uppercase tracking-widest text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2C1810] text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}