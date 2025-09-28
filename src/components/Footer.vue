<template>
  <footer class="mt-24">
    <!-- Borde superior con gradiente -->
    <div class="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"></div>

    <section class="bg-gradient-to-br from-white via-sky-50 to-fuchsia-50">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid md:grid-cols-3 gap-10">
          <!-- Col 1: Branding -->
          <div>
            <h3 class="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600">
              Isaac Solis Padilla
            </h3>
            <p class="mt-3 text-slate-600 leading-relaxed">
              {{ $t('footer.about') || 'Desarrollador full-stack con foco en UX, rendimiento y productos escalables.' }}
            </p>
          </div>

          <!-- Col 2: Links rápidos -->
          <nav aria-label="Quick links" class="grid sm:grid-cols-2 gap-3">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              @click.prevent="scrollTo(link.href)"
              class="text-slate-700 hover:text-slate-900 transition-colors"
            >
              {{ $t(link.label) }}
            </a>
          </nav>

          <!-- Col 3: Contacto / Redes -->
          <div>
            <h4 class="font-semibold text-slate-900 mb-3">{{ $t('footer.contact') || 'Contacto' }}</h4>
            <ul class="space-y-2 text-slate-700">
              <li>
                <a :href="`mailto:${email}`" class="hover:underline">{{ email }}</a>
              </li>
              <li class="flex items-center gap-4 pt-2">
                <!-- GitHub -->
                <a :href="github" target="_blank" rel="noreferrer" aria-label="GitHub"
                   class="p-2 rounded-xl bg-white/80 border border-white shadow hover:shadow-md transition">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.87 10.94c.58.11.8-.25.8-.56v-2.2c-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.2 1.8 1.2 1.06 1.82 2.78 1.29 3.45.99.11-.76.42-1.29.76-1.58-2.65-.3-5.45-1.33-5.45-5.9 0-1.29.47-2.35 1.24-3.17-.12-.3-.54-1.5.12-3.12 0 0 1-.32 3.27 1.22.95-.27 1.97-.41 2.98-.41s2.03.14 2.98.41c2.27-1.54 3.27-1.22 3.27-1.22.67 1.62.25 2.82.13 3.12.77.82 1.24 1.88 1.24 3.17 0 4.58-2.8 5.6-5.47 5.9.43.37.82 1.1.82 2.23v3.28c0 .31.21.68.82.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/>
                  </svg>
                </a>
                <!-- LinkedIn -->
                <a :href="linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                   class="p-2 rounded-xl bg-white/80 border border-white shadow hover:shadow-md transition">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM.84 8h4.3v13.5H.84V8Zm7.7 0h4.11v1.98h.06c.57-1.08 1.97-2.21 4.06-2.21 4.34 0 5.14 2.86 5.14 6.58v7.15h-4.3v-6.34c0-1.52-.03-3.49-2.13-3.49-2.13 0-2.45 1.66-2.45 3.38v6.45H8.54V8Z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-px w-full bg-gradient-to-r from-sky-100 via-slate-200 to-fuchsia-100 my-8"></div>

        <!-- Bottom bar -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-slate-600">
            © {{ year }} · {{ name }} · {{ $t('footer.madeWith') || 'Hecho con' }}
            <span class="font-semibold">Vue 3</span> + <span class="font-semibold">Tailwind</span>
          </p>
          <div class="flex items-center gap-3 text-sm text-slate-600">
            <a href="#" @click.prevent="scrollTo('#about')" class="hover:underline">{{ $t('footer.backToTop') || 'Volver arriba' }}</a>
            <span aria-hidden="true">·</span>
            <a href="/privacy" class="hover:underline">{{ $t('footer.privacy') || 'Privacidad' }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Botón flotante back-to-top -->
    <button
      v-show="showTop"
      @click="goTop"
      aria-label="Back to top"
      class="fixed bottom-6 right-6 p-3 rounded-2xl shadow-lg text-white
             bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600
             hover:brightness-110 active:scale-95 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="m12 6 6 6-1.4 1.4L13 9.8V20h-2V9.8l-3.6 3.6L6 12l6-6Z"/>
      </svg>
    </button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      name: 'Isaac Solis Padilla',
      email: 'isaacsolpad@gmail.com',
      github: 'https://github.com/IsaacSolisPadilla',
      linkedin: 'https://www.linkedin.com/in/isaacsolispadilla/',
      showTop: false,
      links: [
        { href: '#about',    label: 'nav.about' },
        { href: '#projects', label: 'nav.projects' },
        { href: '#skills',   label: 'nav.skills' },
        { href: '#contact',  label: 'nav.contact' },
      ],
    }
  },
  computed: {
    year() {
      return new Date().getFullYear()
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    scrollTo(id) {
      const el = document.querySelector(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onScroll() {
      this.showTop = window.scrollY > 600
    },
  },
}
</script>
