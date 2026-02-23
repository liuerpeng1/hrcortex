import { useEffect, useRef, useState } from 'react'

const useInView = (threshold = 0.15) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

const services = [
  {
    id: '01',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="4" y="4" width="40" height="30" rx="4" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M14 34l-4 8h28l-4-8H14z" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="24" cy="19" r="6" stroke="#a78bfa" strokeWidth="2" />
        <path d="M18 19l6-6 6 6" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="13" x2="24" y2="25" stroke="#c4b5fd" strokeWidth="1.5" />
      </svg>
    ),
    title: '互动展厅 / 沉浸式体验',
    subtitle: 'Interactive Exhibition',
    description:
      '基于 UE5 实时渲染引擎构建的高保真展厅环境。支持多点触控、体感交互、实时物理模拟，让每一位参观者成为展览叙事的主角。',
    features: ['UE5 实时光追渲染', '多通道同步显示', '体感交互系统', 'AR/VR 融合展示'],
    gradient: 'from-purple-900/30 to-violet-900/10',
    accent: '#7c3aed',
  },
  {
    id: '02',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="16" r="8" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="20" r="4" stroke="#a78bfa" strokeWidth="1.5" />
        <path d="M32 20h-4" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 16v-2M36 26v-2" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="36" cy="20" r="1.5" fill="#8b5cf6" />
      </svg>
    ),
    title: 'AI 智能导览 / 数字人',
    subtitle: 'AI Guide & Digital Human',
    description:
      '以大语言模型为核心，结合实时语音合成与 3D 面部驱动技术，打造真实可感的数字人讲解员。支持多语言、情感表达与个性化互动。',
    features: ['LLM 智能对话引擎', '实时面部动作捕捉', '多语言 TTS/ASR', '知识库定制训练'],
    gradient: 'from-violet-900/30 to-indigo-900/10',
    accent: '#8b5cf6',
  },
  {
    id: '03',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="8" y="8" width="14" height="14" rx="2" stroke="#8b5cf6" strokeWidth="2" />
        <rect x="26" y="8" width="14" height="14" rx="2" stroke="#7c3aed" strokeWidth="2" />
        <rect x="8" y="26" width="14" height="14" rx="2" stroke="#7c3aed" strokeWidth="2" />
        <rect x="26" y="26" width="14" height="14" rx="2" stroke="#a78bfa" strokeWidth="2" />
        <circle cx="15" cy="15" r="3" fill="#8b5cf6" opacity="0.6" />
        <circle cx="33" cy="15" r="3" fill="#7c3aed" opacity="0.6" />
        <circle cx="15" cy="33" r="3" fill="#7c3aed" opacity="0.6" />
        <path d="M26 26l-4-4" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: '多媒体内容制作',
    subtitle: 'Multimedia Production',
    description:
      '影视级 3D 动画、实时可视化大屏、互动装置内容全链路制作。从概念设计到最终交付，我们提供完整的多媒体内容解决方案。',
    features: ['影视级 3D 动画', '大屏可视化系统', '互动装置内容', '品牌视觉创意'],
    gradient: 'from-indigo-900/30 to-purple-900/10',
    accent: '#a78bfa',
  },
  {
    id: '04',
    icon: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path d="M24 4l16 8v12c0 8-6.4 15.4-16 20C14.4 39.4 8 32 8 24V12L24 4z" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M17 24l5 5 9-9" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="10" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    ),
    title: '企业定制解决方案',
    subtitle: 'Enterprise Solutions',
    description:
      '深度理解客户品牌调性与业务目标，从策展逻辑、空间规划到技术落地，为企业和博物馆提供端到端的数字展示定制服务。',
    features: ['全流程项目管理', '空间数字化规划', '系统集成部署', '长期运维支持'],
    gradient: 'from-purple-900/30 to-fuchsia-900/10',
    accent: '#c4b5fd',
  },
]

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`card-glass rounded-2xl p-7 transition-all duration-700 cursor-default group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${service.gradient} border border-purple-glow/20 transition-all duration-300 ${hovered ? 'scale-110' : ''}`}>
          {service.icon}
        </div>
        <span
          className="font-mono text-4xl font-black opacity-10 group-hover:opacity-20 transition-opacity"
          style={{ color: service.accent }}
        >
          {service.id}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
      <p className="text-xs font-mono text-purple-light/60 mb-4 tracking-widest uppercase">
        {service.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: service.accent, boxShadow: `0 0 6px ${service.accent}` }}
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Hover accent line */}
      <div
        className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
      />
    </div>
  )
}

const Business = () => {
  const [titleRef, titleInView] = useInView()

  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4 inline-block">// Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
            核心业务
            <span className="purple-gradient-text"> 板块</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            四大专业方向，覆盖展览数字化全场景需求
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Business
