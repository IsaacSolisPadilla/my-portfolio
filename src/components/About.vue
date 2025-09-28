<template>
  <section
    id="about"
    class="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12"
  >
    <!-- Imagen -->
    <div
      class="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-sky-100 hover:ring-sky-200 transition-all duration-500 hover:scale-[1.02]"
    >
      <img
        src=""
        alt="Isaac Solis Padilla"
        class="object-cover w-full h-full"
        loading="lazy"
      />
    </div>

    <!-- Texto -->
    <div class="flex flex-col max-w-xl">
      <h2
        class="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"
        v-intersect.once="fadeIn"
      >
        {{ $t('about.title') }}
      </h2>

      <h3
        class="text-xl md:text-2xl font-semibold mb-6 text-slate-700"
        v-intersect.once="fadeIn"
        style="animation-delay:150ms"
      >
        {{ $t('about.subtitle') }}
      </h3>

      <p
        class="text-lg leading-relaxed mb-8 text-slate-600"
        v-intersect.once="fadeIn"
        style="animation-delay:300ms"
      >
        {{ $t('about.description') }}
      </p>

      <a
        :href="cvLink"
        download
        class="self-start inline-flex items-center gap-2 font-semibold py-3 px-7 rounded-xl shadow-lg transition-all duration-300
               bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 text-white hover:shadow-2xl hover:brightness-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-200"
      >
        {{ $t('about.download') }}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 9l-3-3m3 3l3-3"/>
        </svg>
        <span class="ripple absolute rounded-full bg-white/30 opacity-30 pointer-events-none" ref="ripple"></span>
      </a>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'About',
  setup() {
    const { locale } = useI18n()
    const cvLink = computed(() => (locale.value === 'en'
      ? '/assets/cv-isaac-en.pdf'
      : '/assets/cv-isaac-es.pdf'))
    return { cvLink }
  },
  methods: {
    fadeIn(el) {
      el.style.opacity = 0
      el.style.transform = 'translateY(16px)'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity .6s ease, transform .6s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      })
    },
  },
  directives: {
    intersect: {
      mounted(el, binding) {
        const options = { threshold: 0.1 }
        const callback = (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (binding.modifiers.once) observer.unobserve(el)
              binding.value(el)
            }
          })
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
      },
    },
  },
}
</script>

<style scoped>
/* Ripple */
a { position: relative; overflow: hidden; }
a .ripple {
  position: absolute;
  transform: scale(0);
  animation: ripple 600ms linear;
}
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
</style>
