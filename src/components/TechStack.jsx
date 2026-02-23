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

const techs = [
  {
    category: 'AI / Machine Learning',
    color: '#8b5cf6',
    items: [
      { name: 'LLM / GPT', desc: '大语言模型集成', level: 95 },
      { name: 'TTS / ASR', desc: '语音合成与识别', level: 90 },
      { name: 'Computer Vision', desc: '计算机视觉系统', level: 85 },
      { name: 'Motion Capture', desc: '动作捕捉驱动', level: 88 },
    ],
  },
  {
    category: 'Unreal Engine 5',
    color: '#a78bfa',
    items: [
      { name: 'Nanite', desc: '微多边形几何', level: 92 },
      { name: 'Lumen', desc: '全局光照系统', level: 90 },
      { name: 'MetaHuman', desc: '数字人创建', level: 88 },
      { name: 'Blueprint / C++', desc: '交互逻辑开发', level: 93 },
    ],
  },
  {
    category: '前端 / 可视化',
    color: '#c4b5fd',
    items: [
      { name: 'React / Three.js', desc: '实时 Web 渲染', level: 95 },
      { name: 'WebGL / GLSL', desc: '着色器编程', level: 80 },
      { name: 'TouchDesigner', desc: '互动装置', level: 85 },
      { name: 'DataV / ECharts', desc: '数据可视化', level: 90 },
    ],
  },
  {
    category: '基础设施',
    color: '#7c3aed',
    items: [
      { name: 'Cloudflare', desc: '边缘计算部署', level: 88 },
      { name: 'Docker / K8s', desc: '容器化运维', level: 82 },
      { name: 'CUDA / GPU', desc: '高性能计算', level: 85 },
      { name: 'Real-time API', desc: '实时数据接口', level: 90 },
    ],
  },
]

const SkillBar = ({ name, desc, level, color, delay }) => {
  const [ref, inView] = useInView(0.1)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setWidth(level), delay)
      return () => clearTimeout(timer)
    }
  }, [inView, level, delay])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <div>
          <span className="text-sm font-semibold text-slate-200 font-mono">{name}</span>
          <span className="text-xs text-slate-500 ml-2">{desc}</span>
        </div>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  )
}

const techFeatures = [
  {
    icon: '⚡',
    title: '实时渲染',
    desc: 'UE5 Lumen + Nanite 保证影视级画质与互动流畅度并存',
  },
  {
    icon: '🧠',
    title: 'AI 原生',
    desc: '每个项目内建 AI 层，从内容生成到智能交互无缝整合',
  },
  {
    icon: '🔗',
    title: '云边协同',
    desc: 'Cloudflare 边缘 + 本地 GPU 集群，零延迟响应',
  },
  {
    icon: '🛡️',
    title: '企业级稳定',
    desc: '7×24 小时运维监控，SLA 99.9% 可用性保障',
  },
]

const TechStack = () => {
  const [titleRef, titleInView] = useInView()

  return (
    <section id="tech" className="relative py-28 px-6">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(76,29,149,0.08),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-tag mb-4 inline-block">// Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
            技术
            <span className="purple-gradient-text"> 能力矩阵</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            以 AI 与 UE5 为双核，构建完整的展览数字化技术栈
          </p>
        </div>

        {/* Tech Bars Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {techs.map((cat, ci) => (
            <div key={cat.category} className="card-glass rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-6 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
                />
                <h3 className="font-bold text-white">{cat.category}</h3>
              </div>
              <div className="space-y-5">
                {cat.items.map((item, ii) => (
                  <SkillBar
                    key={item.name}
                    {...item}
                    color={cat.color}
                    delay={ci * 100 + ii * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {techFeatures.map((f, i) => (
            <div
              key={f.title}
              className="card-glass rounded-xl p-5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-glow/10 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
              <div className="text-sm font-bold text-white mb-2">{f.title}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* UE5 + AI Visual Banner */}
        <div className="mt-12 card-glass rounded-2xl p-8 md:p-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(124,58,237,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-xs font-mono text-purple-light/60 tracking-widest mb-2 uppercase">Core Technology</div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-3">
                <span className="purple-gradient-text">UE5</span>
                {' + '}
                <span className="text-purple-pale">AI</span>
                {' = ∞'}
              </h3>
              <p className="text-slate-400 max-w-lg">
                虚幻引擎 5 的影视级渲染与人工智能的无限可能，相乘产生的不是叠加，而是一个全新维度的数字体验空间。
              </p>
            </div>
            <div className="flex gap-6 flex-shrink-0">
              {[
                { label: 'UE5', value: '5.4', unit: 'version' },
                { label: 'AI Model', value: 'GPT-4o', unit: 'powered' },
                { label: 'Render', value: '4K+', unit: 'real-time' },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <div className="text-xs text-slate-500 font-mono mb-1">{badge.label}</div>
                  <div className="text-xl font-black purple-gradient-text font-mono">{badge.value}</div>
                  <div className="text-xs text-purple-light/60 font-mono">{badge.unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechStack
