<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-fuchsia-50 py-16 px-4"
  >
    <!-- Blobs decorativos -->
    <div aria-hidden="true" class="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl"></div>
    <div aria-hidden="true" class="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-3xl"></div>

    <div class="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      <!-- Izquierda: Texto + redes -->
      <div class="flex flex-col justify-center text-center md:text-left md:w-1/2 text-slate-700 space-y-8">
        <h2
          class="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent
                 bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 drop-shadow-sm"
        >
          {{ $t?.('contact.title') || 'Contáctame' }}
        </h2>

        <p class="text-base max-w-md leading-relaxed text-slate-600 tracking-wide mx-auto md:mx-0">
          {{ $t?.('contact.description') || '¿Tienes una idea, proyecto o vacante? Estoy abierto a colaborar y escuchar propuestas.' }}
        </p>

        <!-- Badges de highlights -->
        <div class="flex flex-wrap justify-center md:justify-start gap-3">
          <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 109 9 9.01 9.01 0 00-9-9zm.75 4.5v5.19l4.22 2.53-.75 1.23L11.25 13V7.5z"/></svg>
            Respuesta rápida
          </span>
          <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6a3 3 0 013-3h7l5 5v10a3 3 0 01-3 3H6a3 3 0 01-3-3z"/></svg>
            Disponible para proyectos
          </span>
          <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 4.84L19.53 19H4.47L12 6.84zM11 10h2v5h-2zm0 6h2v2h-2z"/></svg>
            Aprender y crecer
          </span>
        </div>

        <!-- Redes -->
        <div class="flex justify-center md:justify-start gap-10 pt-2">
          <!-- GitHub -->
          <a
            href="https://github.com/IsaacSolisPadilla"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 text-slate-700 hover:text-slate-900 transition duration-300"
            aria-label="GitHub"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.084-.73.084-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.81 1.304 3.495.997.108-.775.418-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013-.404c1.02.005 2.045.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.243 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.1.815 2.22v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z"/>
            </svg>
            <span class="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-fuchsia-600">
              {{ $t?.('contact.github') || 'GitHub' }}
            </span>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/isaacsolispadilla"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 text-slate-700 hover:text-slate-900 transition duration-300"
            aria-label="LinkedIn"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path d="M4.983 3.5C4.983 4.88 3.9 6 2.5 6S.017 4.88.017 3.5 1.1 1 2.5 1 4.983 2.12 4.983 3.5zM.117 7h4.83v14H.117zM8.596 7h4.63v2.337h.064c.646-1.225 2.227-2.516 4.585-2.516 4.904 0 5.805 3.23 5.805 7.424V21H18.23v-7.3c0-1.743-.03-3.988-2.43-3.988-2.43 0-2.8 1.894-2.8 3.853V21H8.596z"/>
            </svg>
            <span class="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              {{ $t?.('contact.linkedin') || 'LinkedIn' }}
            </span>
          </a>
        </div>
      </div>

      <!-- Derecha: CTA tarjetas -->
      <div class="md:w-1/2 w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <!-- Tarjeta email -->
          <div
            class="group relative rounded-2xl border border-white bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-100/0 via-indigo-100/0 to-fuchsia-100/0 group-hover:from-sky-100/60 group-hover:via-indigo-100/60 group-hover:to-fuchsia-100/60 transition"></div>

            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-3">
                <!-- Icono email -->
                <div class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.35l-10 6.25L2 6.35V6zm20 3.24l-9.37 5.86a2 2 0 01-2.26 0L1 9.24V18a2 2 0 002 2h16a2 2 0 002-2V9.24z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-slate-500">Email</p>
                  <p class="font-semibold text-slate-800 select-all">{{ email }}</p>
                </div>
              </div>
            </div>

            <div class="relative mt-5 flex gap-3">
              <a
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 px-4 py-3 font-semibold text-white shadow hover:opacity-95 active:opacity-90 transition"
                :href="`mailto:${email}?subject=${encodeURIComponent(asuntoMail)}&body=${encodeURIComponent(cuerpoMail)}`"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6h20v12H2z" opacity=".25"/><path d="M22 6l-10 6L2 6V5l10 6 10-6v1z"/></svg>
                Enviar email
              </a>
              <button
                class="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100 transition"
                @click="copiarEmail"
                :aria-label="copiado ? 'Copiado' : 'Copiar email'"
              >
                <svg v-if="!copiado" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4a2 2 0 00-2 2v12h2V3h12V1zm3 4H8a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 14H8V7h11v12z"/></svg>
                <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17l-3.88-3.88L3 14.41 9 20.41 21 8.41 19.59 7l-10.6 10.6z"/></svg>
              </button>
            </div>

            <p v-if="copiado" class="relative mt-3 text-sm text-green-600">¡Email copiado al portapapeles!</p>
          </div>

          <!-- Tarjeta WhatsApp (opcional: oculta si no hay phone) -->
          <div
            v-if="phone"
            class="group relative rounded-2xl border border-white bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-100/0 via-emerald-100/0 to-emerald-100/0 group-hover:from-emerald-100/60 group-hover:to-emerald-100/60 transition"></div>

            <div class="relative flex items-center gap-3">
              <div class="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500 text-white shadow">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a9.93 9.93 0 00-8.48 15.3L2 22l4.87-1.28A10 10 0 1012 2zm5.44 14.18c-.23.64-1.15 1.18-1.8 1.33-.48.1-1.1.18-3.2-.67-2.68-1.1-4.41-3.83-4.55-4.01-.13-.18-1.09-1.45-1.09-2.77s.69-1.96.94-2.23c.24-.27.52-.34.69-.34h.5c.16 0 .37 0 .56.42.21.51.72 1.77.79 1.9.06.13.1.28.02.45-.08.17-.12.27-.24.42-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.13.24.59.97 1.27 1.57.88.78 1.62 1.02 1.86 1.14.24.12.39.1.54-.06.15-.16.62-.73.79-.98.17-.24.34-.2.56-.12.22.08 1.39.66 1.63.78.24.12.39.18.45.28.06.1.06.58-.17 1.22z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-slate-500">WhatsApp</p>
                <p class="font-semibold text-slate-800 select-all">{{ phone }}</p>
              </div>
            </div>

            <div class="relative mt-5 flex gap-3">
              <a
                class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white shadow hover:opacity-95 active:opacity-90 transition"
                :href="`https://wa.me/${phoneWhatsApp}?text=${encodeURIComponent(mensajeWA)}`"
                target="_blank" rel="noopener noreferrer"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.94 14.38L2 22l5.76-1.51A10 10 0 1012 2z"/></svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          <!-- Tarjeta Disponibilidad / Calendario (CTA secundario) -->
          <div
            class="group relative rounded-2xl border border-white bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl sm:col-span-2"
          >
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-50/0 via-indigo-50/0 to-fuchsia-50/0 group-hover:from-sky-50/70 group-hover:via-indigo-50/70 group-hover:to-fuchsia-50/70 transition"></div>

            <div class="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="grid h-12 w-12 place-items-center rounded-xl bg-indigo-600 text-white shadow">
                  <svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v2H5a2 2 0 00-2 2v2h18V6a2 2 0 00-2-2h-2V2h-2v2H9V2H7zm14 8H3v10a2 2 0 002 2h14a2 2 0 002-2V10z"/></svg>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wider text-slate-500">Disponibilidad</p>
                  <p class="font-semibold text-slate-800">Respuesta en 24–48h (CET)</p>
                </div>
              </div>

              <div class="flex gap-3">
                <a
                  :href="`mailto:${email}?subject=${encodeURIComponent('Consulta rápida')}`"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100 transition"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6h20v12H2z" opacity=".25"/><path d="M22 6l-10 6L2 6V5l10 6 10-6v1z"/></svg>
                  Contacto rápido
                </a>
                <a
                  href="https://linkedin.com/in/isaacsolispadilla"
                  target="_blank" rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 px-4 py-3 font-semibold text-white shadow hover:opacity-95 active:opacity-90 transition"
                >
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 3a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h16zm-9 8H8v7h3v-7zm-1.5-1.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 13.5c0-2.22-1.18-3.25-2.76-3.25A2.37 2.37 0 0014 11.49V11h-3v7h3v-3.75c0-1 .19-1.97 1.43-1.97s1.57 1.12 1.57 2.04V18h3v-4.5z"/></svg>
                  Conectar en LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      email: 'isaacsolpad@gmail.com',
      asuntoMail: 'Hola Isaac — Me interesa tu perfil',
      cuerpoMail:
        'Hola Isaac,%0D%0A%0D%0AHe visto tu portfolio y me gustaría hablar contigo sobre...',
      phone: '+34 611643913', 
      copiado: false,
    }
  },
  computed: {
    phoneWhatsApp() {
      // convierte +34 600 111 222 -> 34600111222
      return (this.phone || '')
        .replace(/\s+/g, '')
        .replace(/^\+/, '')
    },
    mensajeWA() {
      return '¡Hola Isaac! Te contacto desde tu portfolio.'
    },
  },
  methods: {
    async copiarEmail() {
      try {
        await navigator.clipboard.writeText(this.email)
        this.copiado = true
        setTimeout(() => (this.copiado = false), 1800)
      } catch (e) {
        this.copiado = false
        alert('No se pudo copiar. Selecciona el email y copia manualmente.')
      }
    },
  },
}
</script>

<style scoped>
/* Sutil animación del fondo (opcional) */
@keyframes floaty {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
:deep(.floaty) { animation: floaty 6s ease-in-out infinite; }
</style>
