import { useEffect, useRef } from 'react'

const NeuralBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // Node configuration
    const NODE_COUNT = Math.floor((window.innerWidth * window.innerHeight) / 12000)
    const MAX_DIST = 160
    const MOUSE_DIST = 200

    // Color palette
    const COLORS = [
      'rgba(124, 58, 237,',   // purple-glow
      'rgba(139, 92, 246,',   // purple-vivid
      'rgba(167, 139, 250,',  // purple-light
      'rgba(76, 29, 149,',    // purple-dim
      'rgba(196, 181, 253,',  // purple-pale
    ]

    class Node {
      constructor() {
        this.reset(true)
      }

      reset(initial = false) {
        this.x = Math.random() * canvas.width
        this.y = initial
          ? Math.random() * canvas.height
          : (Math.random() < 0.5 ? -20 : canvas.height + 20)
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2.5 + 1
        this.colorBase = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.alpha = Math.random() * 0.6 + 0.4
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
      }

      update(t) {
        // Gentle mouse attraction
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.002
          this.vx += dx * force
          this.vy += dy * force
        }

        // Dampen velocity
        this.vx *= 0.99
        this.vy *= 0.99

        // Clamp velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 1.5) {
          this.vx = (this.vx / speed) * 1.5
          this.vy = (this.vy / speed) * 1.5
        }

        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Clamp position
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))

        // Pulse alpha
        this.currentAlpha = this.alpha * (0.7 + 0.3 * Math.sin(t * this.pulseSpeed + this.pulseOffset))
      }

      draw(t) {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        )
        gradient.addColorStop(0, `${this.colorBase}${this.currentAlpha})`)
        gradient.addColorStop(1, `${this.colorBase}0)`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${this.colorBase}${this.currentAlpha})`
        ctx.fill()
      }
    }

    const nodes = Array.from({ length: NODE_COUNT }, () => new Node())

    let t = 0
    const draw = () => {
      t++

      // Clear with fade trail effect
      ctx.fillStyle = 'rgba(8, 8, 15, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(t)

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.5
            const pulse = 0.7 + 0.3 * Math.sin(t * 0.02 + i * 0.5)

            // Draw connection line
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)

            const grad = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            )
            grad.addColorStop(0, `${nodes[i].colorBase}${opacity * pulse})`)
            grad.addColorStop(1, `${nodes[j].colorBase}${opacity * pulse})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = opacity * 1.2
            ctx.stroke()

            // Data packet animation
            if (dist < MAX_DIST * 0.6 && Math.random() < 0.002) {
              const progress = (t % 100) / 100
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * progress
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * progress
              ctx.beginPath()
              ctx.arc(px, py, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(196, 181, 253, ${opacity * 2})`
              ctx.fill()
            }
          }
        }
      }

      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].draw(t)
      }

      // Mouse interaction highlight
      if (mouse.x > 0) {
        const mouseGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_DIST
        )
        mouseGrad.addColorStop(0, 'rgba(124, 58, 237, 0.04)')
        mouseGrad.addColorStop(1, 'rgba(124, 58, 237, 0)')
        ctx.fillStyle = mouseGrad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}

export default NeuralBackground
