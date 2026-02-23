const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-purple-glow/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg border border-purple-glow/40 flex items-center justify-center bg-[#0d0d1a]">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <circle cx="12" cy="12" r="4" fill="#8b5cf6" />
              <circle cx="12" cy="4" r="2" fill="#7c3aed" />
              <circle cx="12" cy="20" r="2" fill="#7c3aed" />
              <circle cx="4" cy="12" r="2" fill="#7c3aed" />
              <circle cx="20" cy="12" r="2" fill="#7c3aed" />
              <line x1="12" y1="6" x2="12" y2="8" stroke="#a78bfa" strokeWidth="1.5" />
              <line x1="12" y1="16" x2="12" y2="18" stroke="#a78bfa" strokeWidth="1.5" />
              <line x1="6" y1="12" x2="8" y2="12" stroke="#a78bfa" strokeWidth="1.5" />
              <line x1="16" y1="12" x2="18" y2="12" stroke="#a78bfa" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="font-bold text-base">
            <span className="purple-gradient-text">HR</span>
            <span className="text-white">Cortex</span>
          </span>
        </div>

        {/* Links */}
        <nav className="flex gap-6 text-sm text-slate-500">
          {['业务', '技术栈', '联系我们'].map((item, i) => (
            <a
              key={item}
              href={['#services', '#tech', '#contact'][i]}
              className="hover:text-purple-light transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-slate-600 font-mono">
          © {year} HRCortex. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
