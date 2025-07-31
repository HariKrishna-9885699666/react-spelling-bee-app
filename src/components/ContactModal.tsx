import React, { useState } from "react";

export default function ContactModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed top-6 left-6 z-50 bg-gradient-to-br from-cyan-400 via-cyan-600 to-blue-500 text-white rounded-full p-3 shadow-xl border-2 border-white/40 hover:scale-110 transition-all duration-200"
        aria-label="Contact Info"
        onClick={() => setOpen(true)}
      >
        {/* Animated User Icon */}
        <span className="block animate-spin-slow">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" fill="#22d3ee" />
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white" />
          </svg>
        </span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md border-4 border-transparent animate-popIn"
            style={{
              background: 'rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: '2px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none border-4 border-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 animate-gradientMove" style={{zIndex:0, opacity:0.7}}></div>
            <button
              className="absolute top-4 right-4 text-white bg-cyan-700 hover:bg-cyan-900 rounded-full p-2 shadow"
              aria-label="Close modal"
              onClick={() => setOpen(false)}
              style={{zIndex:2}}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            {/* Avatar with glow */}
            <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-blue-400 to-pink-400 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-white/50 animate-bounceIn" style={{boxShadow:'0 0 32px 8px #22d3ee88'}}>
              HK
            </div>
            <div className="text-2xl font-extrabold text-white text-center mb-1 drop-shadow-lg tracking-wide">Hari Krishna Anem</div>
            <div className="text-base text-cyan-100 font-mono text-center mb-1">+91 9885699666</div>
            <div className="text-base text-cyan-100 font-mono text-center mb-4">anemharikrishna@gmail.com</div>
            <div className="flex flex-col gap-3 w-full mb-2">
              <a href="https://www.linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105">
                <span className="text-xl">🔗</span> LinkedIn
              </a>
              <a href="https://github.com/HariKrishna-9885699666/" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105">
                <span className="text-xl">🐙</span> Github
              </a>
              <a href="https://harikrishna.netlify.app/" target="_blank" rel="noopener noreferrer" className="bg-white/80 hover:bg-white text-cyan-900 text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200 border-2 border-cyan-200 hover:scale-105">
                <span className="text-xl">🌐</span> Portfolio
              </a>
            </div>
            <div className="text-center mt-4"><span className="text-xs text-white/70 font-mono">Made with <span className="animate-pulse">❤️</span> by Hari Krishna</span></div>
          </div>
        </div>
      )}
    </>
  );
}
