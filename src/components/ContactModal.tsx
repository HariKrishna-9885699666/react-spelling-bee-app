import React, { useState } from "react";

export default function ContactModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed top-6 left-6 z-50 bg-cyan-600 hover:bg-cyan-800 text-white rounded-full p-2 shadow-lg transition-all"
        aria-label="Contact Info"
        onClick={() => setOpen(true)}
      >
        {/* User Icon SVG */}
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#22d3ee" strokeWidth="2" fill="#22d3ee" />
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white" />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-gradient-to-br from-cyan-700 via-cyan-500 to-cyan-300 rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md border-4 border-white/30 animate-popIn">
            <button
              className="absolute top-4 right-4 text-white bg-cyan-700 hover:bg-cyan-900 rounded-full p-2 shadow"
              aria-label="Close modal"
              onClick={() => setOpen(false)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-extrabold text-white shadow-lg border-4 border-white/50 animate-bounceIn">HK</div>
            <div className="text-2xl font-extrabold text-white text-center mb-1 drop-shadow">Hari Krishna Anem</div>
            <div className="text-base text-cyan-100 font-mono text-center mb-1">+91 9885699666</div>
            <div className="text-base text-cyan-100 font-mono text-center mb-4">anemharikrishna@gmail.com</div>
            <div className="flex flex-col gap-2 w-full mb-2">
              <a href="https://www.linkedin.com/in/anemharikrishna" target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200"><span>🔗</span> LinkedIn</a>
              <a href="https://github.com/HariKrishna-9885699666/" target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200"><span>🐙</span> Github</a>
              <a href="https://harikrishna.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-900 bg-white/80 hover:bg-white text-lg font-bold rounded-full px-4 py-2 flex items-center gap-2 justify-center shadow transition-all duration-200"><span>🌐</span> Portfolio</a>
            </div>
            <div className="text-center mt-4"><span className="text-xs text-white/70 font-mono">Made with ❤️ by Hari Krishna</span></div>
          </div>
        </div>
      )}
    </>
  );
}
