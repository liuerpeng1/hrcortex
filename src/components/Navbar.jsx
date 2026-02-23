import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: '业务', href: '#services' },
    { label: '技术栈', href: '#tech' },
    { label: '案例', href: '#cases' },
    { label: '联系我们', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08080f]/90 backdrop-blur-xl border-b border-purple-glow/20 shadow-lg shadow-purple-glow/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-lg bg-purple-gradient opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
            <div className="relative w-full h-full rounded-lg border border-purple-glow/50 flex items-center justify-center bg-[#0d0d1a]">
              {/* Neural node icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
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
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="purple-gradient-text">HR</span>
            <span className="text-white">Cortex</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-purple-light transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-vivid group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-sm py-2 px-5"
          >
            立即咨询
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-purple-light transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-purple-light transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-purple-light transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-purple-glow/20 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-purple-light transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm text-center">
            立即咨询
          </a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
