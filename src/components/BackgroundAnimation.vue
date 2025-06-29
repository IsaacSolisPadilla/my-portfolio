<template>
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10"></canvas>
</template>

<script>
export default {
  name: 'BackgroundAnimation',
  data() {
    return {
      particles: [],
      ctx: null,
      width: window.innerWidth,
      height: window.innerHeight,
      mouse: { x: null, y: null, radius: 150 },
      animationId: null,
      waveOffset: 0,
    }
  },
  mounted() {
    this.initCanvas()
    window.addEventListener('resize', this.resize)
    window.addEventListener('mousemove', this.handleMouseMove)
    this.createParticles(80)
    this.animate()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('mousemove', this.handleMouseMove)
    cancelAnimationFrame(this.animationId)
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      this.resize()
    },
    resize() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.$refs.canvas.width = this.width
      this.$refs.canvas.height = this.height
    },
    handleMouseMove(event) {
      this.mouse.x = event.clientX
      this.mouse.y = event.clientY
    },
    createParticles(count) {
      this.particles = []
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: 2 + Math.random() * 2,
          baseX: 0,
          baseY: 0,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.01 + Math.random() * 0.02,
          alpha: 0.12 + Math.random() * 0.15,
        })
        // Set base position to initial to use in wave calc
        this.particles[i].baseX = this.particles[i].x
        this.particles[i].baseY = this.particles[i].y
      }
    },
    drawParticle(p) {
      const ctx = this.ctx
      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
      ctx.shadowColor = `rgba(173, 216, 230, 0.3)`
      ctx.shadowBlur = 20
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    },
    connectParticles() {
      const ctx = this.ctx
      const maxDist = 140
      for (let a = 0; a < this.particles.length; a++) {
        for (let b = a + 1; b < this.particles.length; b++) {
          const dx = this.particles[a].x - this.particles[b].x
          const dy = this.particles[a].y - this.particles[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const opacity = 0.15 * (1 - dist / maxDist)
            ctx.strokeStyle = `rgba(173, 216, 255, ${opacity})` // azul claro neón
            ctx.lineWidth = 1.5 // un poco más gruesas
            ctx.beginPath()
            ctx.moveTo(this.particles[a].x, this.particles[a].y)
            ctx.lineTo(this.particles[b].x, this.particles[b].y)
            ctx.stroke()
          }
        }
      }
    },
    animate() {
      const ctx = this.ctx
      ctx.clearRect(0, 0, this.width, this.height)

      // Fondo degradado con wave
      const gradient = ctx.createLinearGradient(0, 0, this.width, this.height)
      const waveIntensity = Math.sin(this.waveOffset) * 0.1 + 0.4
      gradient.addColorStop(0, `rgba(0, 0, 0, ${waveIntensity})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, ${waveIntensity})`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, this.width, this.height)

      this.particles.forEach((p) => {
        // Movimiento base
        p.x += p.speedX
        p.y += p.speedY
        p.size = 2 + Math.sin(p.angle) * 2

        // Vuelven a rebotar en bordes
        if (p.x < 0 || p.x > this.width) p.speedX *= -1
        if (p.y < 0 || p.y > this.height) p.speedY *= -1

        // Efecto onda vertical (wave) sobre baseY
        p.y = p.baseY + Math.sin(this.waveOffset + p.x * 0.02) * 10

        // Interacción con mouse: repelen si están dentro del radio
        if (this.mouse.x && this.mouse.y) {
          const dx = p.x - this.mouse.x
          const dy = p.y - this.mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < this.mouse.radius) {
            // Fuerza inversa proporcional a distancia
            const force = (this.mouse.radius - dist) / this.mouse.radius
            p.x += dx / dist * force * 10
            p.y += dy / dist * force * 10
          }
        }

        this.drawParticle(p)
      })

      this.connectParticles()

      this.waveOffset += 0.02
      this.animationId = requestAnimationFrame(this.animate)
    },
  },
}
</script>

<style scoped>
canvas {
  pointer-events: none; /* Para que no interfiera con clicks ni scroll */
}
</style>
