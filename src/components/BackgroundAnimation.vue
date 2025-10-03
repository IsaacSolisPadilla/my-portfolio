<template>
  <!-- Canvas transparente encima de un fondo por CSS -->
  <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-10"></canvas>
</template>

<script>
export default {
  name: 'BackgroundAnimation',
  data() {
    return {
      ctx: null,
      width: 0,
      height: 0,
      dpr: 1,
      particles: [],
      cellSize: 120,          // tamaño de celda para el grid (aprox. connectDist)
      connectDist: 140,       // distancia máx de conexión (se reduce en móvil)
      mouse: { x: null, y: null, radius: 120 },
      animationId: null,
      waveOffset: 0,
      enabled: true,
      _onResize: null,
      _onPointerMove: null,
      _everyOtherFrame: false, // en móvil conectamos líneas un frame sí/uno no
    }
  },
  mounted() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    // Si el usuario prefiere menos movimiento, no animamos
    if (prefersReduced) {
      this.enabled = false
      this.applyGradientBackground()
      return
    }

    this.applyGradientBackground()

    // Limita DPR para no multiplicar píxeles reales
    this.dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5)

    const canvas = this.$refs.canvas
    // Contexto con sugerencias de rendimiento
    this.ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })

    // Config responsive
    this.connectDist = isMobile ? 105 : 140
    this.cellSize = this.connectDist
    this.mouse.radius = isMobile ? 90 : 140

    this.resize() // define width/height y escala por DPR

    // Partículas según dispositivo
    const count = isMobile ? 26 : (window.innerWidth < 1200 ? 44 : 72)
    this.createParticles(count)

    // Listeners optimizados
    this._onResize = this.rafThrottle(this.resize)
    window.addEventListener('resize', this._onResize, { passive: true })

    this._onPointerMove = this.rafThrottle((e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })
    window.addEventListener('pointermove', this._onPointerMove, { passive: true })

    document.addEventListener('visibilitychange', this.handleVisibility, { passive: true })

    // Start
    this.animationId = requestAnimationFrame(this.animate)
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animationId)
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('pointermove', this._onPointerMove)
    document.removeEventListener('visibilitychange', this.handleVisibility)
  },
  methods: {
    applyGradientBackground() {
      // Fondo por CSS (no se repinta cada frame)
      // Nota: si usas modo oscuro, cámbialo a media queries o variables
      this.$refs?.canvas?.style && (this.$refs.canvas.style.background =
        'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(224,242,254,0.96) 100%)')
    },
    handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      } else if (this.enabled && !this.animationId) {
        this.animationId = requestAnimationFrame(this.animate)
      }
    },
    rafThrottle(fn) {
      let ticking = false
      return (...args) => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => { fn.apply(this, args); ticking = false })
      }
    },
    resize() {
      const canvas = this.$refs.canvas
      const w = window.innerWidth
      const h = window.innerHeight
      this.width = w
      this.height = h
      // Tamaño real del lienzo en píxeles (escalado por DPR)
      canvas.width = Math.floor(w * this.dpr)
      canvas.height = Math.floor(h * this.dpr)
      // Escalado del contexto para dibujar en unidades CSS
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
      // Ajustes finos por viewport
      const isMobile = w <= 768
      this.connectDist = isMobile ? 105 : 140
      this.cellSize = this.connectDist
      this.mouse.radius = isMobile ? 90 : 140
    },
    createParticles(count) {
      this.particles = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * this.width
        const y = Math.random() * this.height
        this.particles.push({
          x,
          y,
          baseY: y,
          size: 1.6 + Math.random() * 1.6,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.008 + Math.random() * 0.015,
          alpha: 0.35 + Math.random() * 0.25,
          glow: i % 4 === 0, // solo algunas partículas tienen glow
        })
      }
    },
    drawParticle(p) {
      const ctx = this.ctx
      ctx.save()
      // Un fillStyle fijo + alpha dinámica es más barato que recomponer rgba por partícula
      ctx.fillStyle = 'rgb(100,116,139)' // slate-500
      ctx.globalAlpha = p.alpha
      if (p.glow) {
        ctx.shadowColor = 'rgba(56,189,248,0.6)' // sky-400
        ctx.shadowBlur = 10
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    },
    // Grid para limitar vecinos (acelera conexiones)
    buildGrid() {
      const cols = Math.ceil(this.width / this.cellSize)
      const rows = Math.ceil(this.height / this.cellSize)
      const grid = new Array(cols * rows)
      for (let i = 0; i < grid.length; i++) grid[i] = []
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i]
        const cx = Math.max(0, Math.min(cols - 1, Math.floor(p.x / this.cellSize)))
        const cy = Math.max(0, Math.min(rows - 1, Math.floor(p.y / this.cellSize)))
        grid[cy * cols + cx].push(i)
      }
      return { grid, cols, rows }
    },
    connectParticles() {
      const ctx = this.ctx
      const maxDist = this.connectDist
      const { grid, cols, rows } = this.buildGrid()

      ctx.lineWidth = 1
      // Usamos globalAlpha además de strokeStyle simple para evitar strings por trazo
      ctx.strokeStyle = 'rgb(56,189,248)' // sky-400

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i]
        const cx = Math.floor(p.x / this.cellSize)
        const cy = Math.floor(p.y / this.cellSize)

        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const nx = cx + ox
            const ny = cy + oy
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
            const cell = grid[ny * cols + nx]
            for (let idx = 0; idx < cell.length; idx++) {
              const j = cell[idx]
              if (j <= i) continue // evita duplicados
              const q = this.particles[j]
              const dx = p.x - q.x
              const dy = p.y - q.y
              const dist2 = dx * dx + dy * dy
              if (dist2 < maxDist * maxDist) {
                // Opacidad en función de distancia (sin sqrt)
                const dist = Math.sqrt(dist2)
                const alpha = 0.22 * (1 - dist / maxDist)
                ctx.save()
                ctx.globalAlpha = alpha
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(q.x, q.y)
                ctx.stroke()
                ctx.restore()
              }
            }
          }
        }
      }
    },
    animate: function () {
      const ctx = this.ctx
      // Limpiamos solo el canvas (fondo es CSS)
      ctx.clearRect(0, 0, this.width, this.height)

      // Update
      const w = this.width
      const h = this.height
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.angle += p.angleSpeed
        // tamaño oscila levemente
        p.size = 1.6 + Math.sin(p.angle) * 1.2
        // rebote simple
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        // ola suave en Y
        p.y = p.baseY + Math.sin(this.waveOffset + p.x * 0.02) * 8

        // repulsión al ratón (si existe)
        if (this.mouse.x != null && this.mouse.y != null) {
          const dx = p.x - this.mouse.x
          const dy = p.y - this.mouse.y
          const dist2 = dx * dx + dy * dy
          const r2 = this.mouse.radius * this.mouse.radius
          if (dist2 < r2 && dist2 > 0.0001) {
            const force = (this.mouse.radius - Math.sqrt(dist2)) / this.mouse.radius
            p.x += (dx / Math.sqrt(dist2)) * force * 8
            p.y += (dy / Math.sqrt(dist2)) * force * 8
          }
        }

        this.drawParticle(p)
      }

      // Conexiones (en móvil cada 2 frames para ahorrar GPU)
      if (this.width <= 768) {
        if (this._everyOtherFrame) this.connectParticles()
        this._everyOtherFrame = !this._everyOtherFrame
      } else {
        this.connectParticles()
      }

      this.waveOffset += 0.016 // un poco más suave

      this.animationId = requestAnimationFrame(this.animate)
    },
  },
}
</script>

<style scoped>
/* el gradiente ahora lo pone el CSS, el canvas es transparente */
canvas {
  pointer-events: none;
  /* Degradado aquí: evita repintarlo en cada frame */
  background: linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(224,242,254,0.96) 100%);
}

/* Apaga el canvas completamente si el usuario pide menos movimiento */
@media (prefers-reduced-motion: reduce) {
  canvas { display: none; }
}
</style>
