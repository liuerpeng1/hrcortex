import { useState, useRef, useEffect } from 'react'

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

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: '邮箱',
    value: 'hello@hrcortex.com',
    href: 'mailto:hello@hrcortex.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: '电话',
    value: '+86 400-XXX-XXXX',
    href: 'tel:+86400XXXXXXX',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: '地址',
    value: '中国 · 上海',
    href: null,
  },
]

const Contact = () => {
  const [formRef, formInView] = useInView()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const inputCls =
    'w-full bg-white/5 border border-purple-glow/20 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 ' +
    'focus:outline-none focus:border-purple-vivid/60 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] ' +
    'transition-all duration-200'

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(124,58,237,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-4 inline-block">// Contact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
            开启
            <span className="purple-gradient-text"> 合作对话</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            告诉我们您的项目愿景，我们在 24 小时内回复
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact info cards */}
            {contactInfo.map((info) => (
              <div key={info.label} className="card-glass rounded-xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform">
                <div className="w-10 h-10 rounded-lg bg-purple-gradient/20 border border-purple-glow/30 flex items-center justify-center text-purple-light flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-sm text-slate-200 hover:text-purple-light transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-200">{info.value}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Response time promise */}
            <div className="card-glass rounded-xl p-6 border-purple-glow/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400">快速响应承诺</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                我们的团队在工作日全程在线，通常在 2 小时内初步回复，
                并在 24 小时内提供详细的项目评估方案。
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: '初步回复', val: '2h' },
                  { label: '方案评估', val: '24h' },
                  { label: '项目启动', val: '7d' },
                ].map(item => (
                  <div key={item.label} className="text-center bg-white/3 rounded-lg p-2">
                    <div className="text-lg font-black purple-gradient-text font-mono">{item.val}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 card-glass rounded-2xl p-8 transition-all duration-700 ${
              formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-gradient/20 border border-purple-glow/40 flex items-center justify-center mb-6 animate-glow-pulse">
                  <svg className="w-8 h-8 text-purple-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">消息已发送！</h3>
                <p className="text-slate-400 mb-6">感谢您的联系，我们会在 24 小时内回复您。</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', type: '', message: '' }) }}
                  className="btn-outline text-sm"
                >
                  再次发送
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-mono">姓名 *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="您的姓名"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-mono">公司 / 机构</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="所在单位（选填）"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-mono">邮箱 *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-mono">联系电话</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+86 138 0000 0000"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-mono">项目类型 *</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className={inputCls + ' bg-[#0d0d1a] cursor-pointer'}
                  >
                    <option value="" disabled>选择您的需求</option>
                    <option value="interactive">互动展厅 / 沉浸式体验</option>
                    <option value="ai-guide">AI 智能导览 / 数字人</option>
                    <option value="multimedia">多媒体内容制作</option>
                    <option value="enterprise">企业定制解决方案</option>
                    <option value="other">其他需求</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5 font-mono">项目描述 *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="简要描述您的项目需求、预期规模及时间计划..."
                    className={inputCls + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-base flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      发送中...
                    </>
                  ) : (
                    <>
                      发送消息
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-600 text-center">
                  提交即表示您同意我们的隐私政策。我们不会向第三方分享您的信息。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
