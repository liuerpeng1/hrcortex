import { useEffect, useRef, useState } from 'react'

const TypewriterText = ({ texts, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), speed)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), speed / 2)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex(i => (i + 1) % texts.length)
    }

    setDisplayText(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed])

  return (
    <span>
      {displayText}
      <span className="inline-block w-0.5 h-8 bg-purple-vivid ml-1 animate-pulse" />
    </span>
  )
}

const CountUp = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const observed = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true
        const start = Date.now()
        const animate = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(target * eased))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_70%_70%,rgba(76,29,149,0.08),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-8 animate-fade-in">
          <span className="section-tag">// Neural Exhibition Technology</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400/80 font-mono">ONLINE</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="block text-white mb-2">重新定义</span>
          <span className="block purple-gradient-text glow-text">
            <TypewriterText
              texts={['展厅体验', '沉浸叙事', '智能交互', '数字未来']}
              speed={100}
            />
          </span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          融合 <span className="text-purple-light font-semibold">AI 智能</span> 与{' '}
          <span className="text-purple-light font-semibold">UE5 实时渲染</span>，
          为展览空间注入前所未有的数字生命力。
          从互动展厅到沉浸式数字人，我们构建下一代展示体验。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <a href="#services" className="btn-primary text-base group">
            <span className="flex items-center gap-2">
              探索解决方案
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a href="#contact" className="btn-outline text-base">
            预约演示
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: 50, suffix: '+', label: '交付项目' },
            { value: 100, suffix: '%', label: 'UE5 实时渲染' },
            { value: 15, suffix: '+', label: '行业覆盖' },
            { value: 24, suffix: '/7', label: '技术支持' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-glass rounded-xl p-5 text-center transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-black purple-gradient-text mb-1 font-mono">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-xs text-slate-500 font-mono tracking-widest">SCROLL</span>
        <svg className="w-4 h-4 text-purple-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
