"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Download, PartyPopper } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("ACCESS DENIED: Invalid password.");
        } else {
          setError("SYSTEM ERROR: Failed to fetch data.");
        }
        setLoading(false);
        return;
      }

      // Handle file download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Shubharambh2_Registrations.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("NETWORK ERROR: Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-fuchsia-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-fuchsia-500/50 p-8 shadow-[0_0_30px_rgba(217,70,239,0.2)] relative rounded-2xl"
      >
        <div className="text-center mb-8">
          <PartyPopper className="w-12 h-12 mx-auto text-fuchsia-500 mb-4 animate-bounce" />
          <h1 className="text-3xl font-space-grotesk font-bold uppercase tracking-widest party-title">Admin VIP Lounge</h1>
          <p className="text-sm text-fuchsia-300 mt-2 font-medium">Restricted Event Access</p>
        </div>

        <form onSubmit={handleDownload} className="space-y-6">
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fuchsia-500/50" />
              <input
                type="password"
                placeholder="Enter VIP Passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-fuchsia-500/50 pl-10 p-3 text-center tracking-widest text-fuchsia-100 placeholder-fuchsia-800 rounded-xl focus:outline-none focus:border-fuchsia-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-300 text-sm text-center font-bold uppercase bg-red-950/40 p-3 rounded-lg border border-red-900/50">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
          >
            {loading ? (
              "Extracting Guest List..."
            ) : (
              <>
                <Download className="w-5 h-5" /> Download Database
              </>
            )}
          </button>
        </form>
      </motion.div>
    </main>
  );
}
