"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Sparkles, PartyPopper, Crown, Info, Mic2, Disc, Radio } from "lucide-react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen energy-bg text-purple-900 font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white flex flex-col relative">
      <AnimatePresence>
        {showIntro ? (
          <IntroAnimation key="intro" />
        ) : (
          <div className="flex-grow pb-16 flex flex-col items-center w-full z-10 relative">
            <BackgroundIcons />
            <RegistrationForm key="form" />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

function BackgroundIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-pink-400/40"
      >
        <Mic2 className="w-24 h-24" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 40, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-60 right-10 text-blue-400/40"
      >
        <Disc className="w-32 h-32" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-20 text-purple-400/40"
      >
        <Radio className="w-20 h-20" />
      </motion.div>
    </div>
  );
}

function IntroAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(15px)" }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center energy-bg z-50 flex-col p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 10, stiffness: 50, delay: 0.2 }}
        className="text-center relative w-full"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-space-grotesk font-black party-title tracking-wider animate-bounce break-words">
          SHUBHARAMBH 2.0
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-xl sm:text-3xl md:text-4xl text-pink-600 font-black drop-shadow-md uppercase tracking-wide"
        >
          No Curfew. No Limits. Pure Euphoria. 🔥
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-4 text-lg sm:text-2xl text-purple-700 font-bold"
        >
          🎤 OWN THE STAGE. 🕺💃
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-8 text-sm sm:text-lg text-purple-900 font-bold animate-pulse"
        >
          Tuning the mics... dropping the bass... igniting the day!
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    batch: "",
    program: "",
    activities: [] as string[],
    mrMissFreshers: false,
    passType: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const activitiesList = [
    "Girls Group Dance",
    "Boys Group Dance",
    "Couple dance",
    "ramp walk",
    "group song",
    "solo dance",
    "solo song",
  ];

  const handleCheckboxChange = (activity: string) => {
    setFormData((prev) => {
      const isSelected = prev.activities.includes(activity);
      if (isSelected) {
        return { ...prev, activities: prev.activities.filter((a) => a !== activity) };
      } else {
        return { ...prev, activities: [...prev.activities, activity] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("System Error: Failed to submit registration.");
      }
    } catch (err) {
      alert("System Error: Network failure.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[70vh] flex items-center justify-center p-4 z-10"
      >
        <div className="glass-panel p-6 sm:p-10 rounded-3xl text-center max-w-lg w-full animate-float shadow-2xl">
          <PartyPopper className="w-20 h-20 text-pink-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-space-grotesk font-black mb-2 party-title">YOU'RE ON THE LIST! 🎉</h2>
          <p className="text-purple-900 text-lg font-bold">Your response for Shubharambh 2.0 has been recorded successfully!</p>
          
          <div className="bg-white/70 border-2 border-purple-200 rounded-2xl p-5 my-5 text-left shadow-sm">
            <p className="text-pink-600 font-black text-sm uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Important Note
            </p>
            <p className="text-purple-900 font-medium text-sm leading-relaxed">
              This form is for <strong>enquiry & interest collection</strong> purpose only.
            </p>
            <p className="text-purple-800 text-sm mt-2 leading-relaxed">
              Our organizing team will reach out to you shortly with official <strong>passes, payment collection details, and the event schedule</strong>.
            </p>
          </div>

          <p className="text-pink-600 font-black text-lg">Dress to kill, ready to thrill! See you on the dance floor! 🎤✨</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="max-w-4xl mx-auto p-4 md:p-8 w-full"
      style={{ perspective: 1200 }}
    >
      <header className="mb-10 text-center relative w-full overflow-hidden p-2">
        <motion.div whileHover={{ scale: 1.05, rotateZ: -2 }} className="inline-block w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-space-grotesk font-black party-title mb-2 animate-float drop-shadow-xl break-words whitespace-normal">
            SHUBHARAMBH 2.0
          </h1>
        </motion.div>
        
        <h2 className="text-xl md:text-2xl font-bold text-pink-600 mt-2 tracking-wide uppercase drop-shadow-sm">
          Exclusively for ITS, ICFAI University Jharkhand
        </h2>
        
        <div className="glass-panel p-6 rounded-2xl mt-6 mb-8 inline-block text-center relative group hover:scale-[1.02] transition-transform duration-300 w-full">
          <p className="text-pink-600 font-black text-xl md:text-2xl mb-3 uppercase tracking-wide">
            The Most Anticipated Day of the Year! 🌟
          </p>
          <p className="text-purple-900 font-bold text-base md:text-lg mb-4">
            Unlimited Feast 🍕 | Electrifying DJ Beats 🎧 | Unforgettable Memories ✨
          </p>
          <p className="text-purple-800 italic font-medium text-sm md:text-base leading-relaxed">
            Prepare for epic karaoke battles, fierce dance-offs, and non-stop entertainment. Leave your limits at the door and dive into pure, unadulterated energy. Secure your VIP pass before we sell out! 🎫
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-red-600 font-bold bg-white/60 backdrop-blur-md p-4 rounded-xl border-2 border-red-400/50 shadow-lg mx-auto max-w-2xl text-left">
          <Info className="w-8 h-8 md:w-6 md:h-6 animate-pulse shrink-0 text-red-500" />
          <div className="text-xs md:text-sm tracking-wide text-red-700 leading-relaxed font-semibold">
            <p className="font-black uppercase tracking-wider text-red-600 mb-0.5">Disclaimer & Event Notice:</p>
            <p>This event is independently organized by your seniors for tech students. There is no role, affiliation, or involvement of the university. The party will be held entirely outside the campus premises.</p>
          </div>
        </div>
      </header>

      <motion.form 
        whileHover={{ rotateX: 2, rotateY: -1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onSubmit={handleSubmit} 
        className="space-y-8 glass-panel p-8 md:p-10 rounded-3xl relative overflow-visible transform-style-3d"
      >
        
        <Sparkles className="absolute -top-6 -left-6 w-16 h-16 text-pink-500 animate-spin-slow opacity-80" style={{ animationDuration: '3s' }} />
        <Music className="absolute -bottom-6 -right-6 w-16 h-16 text-blue-500 animate-bounce opacity-80" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Sparkles className="w-5 h-5" /> Name
            </label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold placeholder-purple-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner" placeholder="Enter your name" />
          </div>

          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Sparkles className="w-5 h-5" /> Phone No
            </label>
            <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold placeholder-purple-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner" placeholder="Enter phone number" />
          </div>

          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Sparkles className="w-5 h-5" /> Email
            </label>
            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold placeholder-purple-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner" placeholder="Enter email address" />
          </div>

          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Sparkles className="w-5 h-5" /> Batch
            </label>
            <input required type="text" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold placeholder-purple-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner" placeholder="e.g. 2024-2028" />
          </div>

          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Sparkles className="w-5 h-5" /> Program
            </label>
            <select required value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner">
              <option value="" disabled>Select program...</option>
              <option value="BTech">BTech</option>
              <option value="Diploma">Diploma</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          <div className="space-y-2 group">
            <label className="flex items-center gap-2 text-sm text-pink-700 uppercase font-black tracking-wider group-hover:text-pink-600 transition-colors">
              <Crown className="w-6 h-6 text-amber-500" /> Pass Type
            </label>
            <select required value={formData.passType} onChange={e => setFormData({...formData, passType: e.target.value})} className="w-full bg-white/70 border-2 border-purple-200 rounded-xl p-4 text-purple-900 font-bold focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/30 transition-all shadow-inner">
              <option value="" disabled>Select pass...</option>
              <option value="Fresher">Fresher (₹500)</option>
              <option value="2nd Year">2nd Year (₹600)</option>
              <option value="3rd/4th Year">3rd & 4th Year (₹1000)</option>
            </select>
          </div>
        </div>

        <div className="border-t-2 border-purple-200/50 pt-8 relative z-10">
          <h3 className="text-2xl font-space-grotesk mb-6 text-purple-900 font-black">🎤 Select Your Activities:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {activitiesList.map((activity) => (
              <label key={activity} className="flex items-center gap-4 cursor-pointer group p-2 hover:bg-white/40 rounded-xl transition-colors">
                <div className="relative flex items-center justify-center w-7 h-7 shrink-0 border-2 border-pink-500 rounded-lg group-hover:scale-110 transition-transform">
                  <input
                    type="checkbox"
                    className="absolute opacity-0 cursor-pointer"
                    checked={formData.activities.includes(activity)}
                    onChange={() => handleCheckboxChange(activity)}
                  />
                  {formData.activities.includes(activity) && <div className="w-4 h-4 bg-pink-500 rounded-md"></div>}
                </div>
                <span className="text-base capitalize text-purple-800 font-bold group-hover:text-pink-600 transition-colors leading-tight">{activity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t-2 border-purple-200/50 pt-8 mt-6 relative z-10">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-200 p-6 rounded-2xl border-2 border-amber-300 shadow-lg transform hover:-translate-y-1 transition-transform">
            <h3 className="text-2xl font-space-grotesk text-amber-700 mb-4 flex items-center gap-3 font-black"><Crown className="w-7 h-7 shrink-0"/> Special Event:</h3>
            <label className="flex items-center gap-5 cursor-pointer group">
              <div className="relative flex items-center justify-center w-10 h-10 shrink-0 border-4 border-amber-500 rounded-full group-hover:scale-110 transition-transform bg-white">
                <input
                  type="checkbox"
                  className="absolute opacity-0 cursor-pointer"
                  checked={formData.mrMissFreshers}
                  onChange={(e) => setFormData({...formData, mrMissFreshers: e.target.checked})}
                />
                {formData.mrMissFreshers && <div className="w-5 h-5 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>}
              </div>
              <span className="font-black text-amber-800 text-xl md:text-2xl drop-shadow-sm leading-tight">Register for Mr. & Miss Freshers</span>
            </label>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full font-space-grotesk py-5 mt-10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-black text-2xl uppercase tracking-widest rounded-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20"
        >
          {loading ? "TUNING THE MIC..." : "GRAB YOUR TICKET"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
