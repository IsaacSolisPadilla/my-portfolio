<template>
  <section id="projects" class="max-w-7xl mx-auto px-6 py-20 md:py-32">
    <h2
      class="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight
             bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600
             leading-[1.15] md:leading-[1.12] pb-1"
      v-reveal
    >
      {{ $t('projects.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      <article
        v-for="(project, idx) in projects"
        :key="project.id"
        class="group rounded-2xl p-1 bg-gradient-to-br from-sky-500/25 via-indigo-600/25 to-fuchsia-600/25"
        v-reveal
      >
        <!-- Card interior: glass en desktop; en móvil sin blur (más barato) -->
        <div
          class="relative h-full rounded-2xl bg-white/85 border border-white shadow-lg overflow-hidden
                 md:backdrop-blur"
        >
          <!-- Imagen -->
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="project.images?.fallback || project.image"
              :srcset="project.images
                ? `${project.images.w320} 320w, ${project.images.w640} 640w, ${project.images.w960} 960w`
                : null"
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              :alt="$t(project.title)"
              class="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              :loading="idx === 0 ? 'eager' : 'lazy'"
              :fetchpriority="idx === 0 ? 'high' : 'low'"
              decoding="async"
              width="960" height="540"
            />

            <!-- Indicador vídeo si es .mp4 -->
            <button
              v-if="project.demoUrl.endsWith('.mp4')"
              @click.prevent="openVideoModal(project.demoUrl)"
              class="absolute bottom-3 right-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl
                     text-white text-sm font-semibold shadow-md
                     bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 hover:brightness-110 active:scale-95"
            >
              ▶ {{ $t('projects.demo') }}
            </button>
          </div>

          <!-- Contenido -->
          <div class="p-6 flex flex-col h-full">
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-xl font-bold text-slate-900">
                {{ $t(project.title) }}
              </h3>
            </div>

            <p class="mt-2 text-slate-600 text-sm leading-relaxed">
              {{ $t(project.description) }}
            </p>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-6 flex gap-3">
              <!-- Demo (si no es .mp4) -->
              <a
                v-if="!project.demoUrl.endsWith('.mp4')"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 shadow-md hover:shadow-lg hover:brightness-110 active:scale-95"
              >
                {{ $t('projects.demo') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7m0 0v7m0-7L10 14"/>
                </svg>
              </a>

              <button
                v-else
                @click.prevent="openVideoModal(project.demoUrl)"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 shadow-md hover:shadow-lg hover:brightness-110 active:scale-95"
              >
                {{ $t('projects.demo') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>

              <a
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold
                       border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-white active:scale-95 transition-all"
              >
                {{ $t('projects.repo') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.7 17.3 3.4 12l5.3-5.3 1.4 1.4L6.2 12l3.9 3.9-1.4 1.4Zm6.6 0-1.4-1.4L17.8 12l-3.9-3.9 1.4-1.4L20.6 12l-5.3 5.3Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal vídeo -->
    <div
      v-if="showVideoModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeVideoModal"
    >
      <div class="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        <div class="p-1 bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600">
          <div class="bg-white rounded-2xl p-4">
            <div class="relative w-full max-h-[80vh] flex justify-center items-center">
              <video
                ref="videoEl"
                controls
                autoplay
                playsinline
                preload="metadata"
                class="max-w-full max-h-[70vh] object-contain rounded-md"
              >
                <source :src="activeVideoUrl" type="video/mp4" />
                {{ $t('projects.videoNotSupported') }}
              </video>
            </div>
            <div class="mt-4 flex justify-end">
              <button
                @click="closeVideoModal"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
                       border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-white active:scale-95"
              >
                {{ $t('projects.close') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="m14.7 12 4.65-4.65-1.4-1.4L13.3 10.6 8.65 5.95l-1.4 1.4L11.9 12l-4.65 4.65 1.4 1.4 4.65-4.65 4.65 4.65 1.4-1.4Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Importa variantes responsivas (idealmente WebP).
 * Si aún no las tienes, deja sólo projectXImage y elimina "images" abajo.
 */
import project1Image from '../assets/eol.png'
import project2Image from '../assets/todus.png'
import project3Image from '../assets/caronte.png'

// Ejemplo (cuando tengas WebP generados):
// import p1_320 from '../assets/eol-320.webp'
// import p1_640 from '../assets/eol-640.webp'
// import p1_960 from '../assets/eol-960.webp'

export default {
  name: 'Projects',
  data() {
    return {
      showVideoModal: false,
      activeVideoUrl: '',
      projects: [
        {
          id: 1,
          title: 'projects.items.0.title',
          description: 'projects.items.0.description',
          technologies: ['React', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'Spring Boot', 'Java'],
          demoUrl: 'https://youtu.be/jteUFW18IEQ',
          repoUrl: 'https://github.com/IsaacSolisPadilla/EndOfLine',
          image: project1Image,
          featured: true,
          // images: { w320: p1_320, w640: p1_640, w960: p1_960, fallback: project1Image },
        },
        {
          id: 2,
          title: 'projects.items.1.title',
          description: 'projects.items.1.description',
          technologies: ['React Native', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'MySQL', 'Spring Boot', 'Java'],
          demoUrl: 'https://youtu.be/Yo3TVPByef4',
          repoUrl: 'https://github.com/IsaacSolisPadilla/ToDUS',
          image: project2Image,
          // images: { w320: ..., w640: ..., w960: ..., fallback: project2Image },
        },
        {
          id: 3,
          title: 'projects.items.2.title',
          description: 'projects.items.2.description',
          technologies: ['React Native', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'MySQL', 'Spring Boot', 'Java'],
          demoUrl: 'https://youtu.be/CUF0JLJ-yL4',
          repoUrl: 'https://github.com/ISPP-2425-G9',
          image: project3Image,
          // images: { w320: ..., w640: ..., w960: ..., fallback: project3Image },
        },
      ],
    }
  },
  methods: {
    openVideoModal(url) {
      this.activeVideoUrl = url
      this.showVideoModal = true
      document.documentElement.style.overflow = 'hidden'
    },
    closeVideoModal() {
      const video = this.$refs.videoEl
      if (video) { video.pause(); video.currentTime = 0 }
      this.activeVideoUrl = ''
      this.showVideoModal = false
      document.documentElement.style.overflow = ''
    },
  },
  directives: {
    // Directiva que NO anima si el elemento ya es visible al cargar
    reveal: {
      mounted(el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const rect = el.getBoundingClientRect()
        const initiallyVisible =
          rect.top < window.innerHeight && rect.bottom > 0 && window.scrollY === 0

        if (reduce || initiallyVisible) {
          el.classList.add('is-visible')
          return
        }

        el.classList.add('reveal')

        const observer = new IntersectionObserver((entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              obs.unobserve(el)
            }
          }
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

        observer.observe(el)
      },
    },
  },
}
</script>

<style scoped>
/* Animación suave sólo cuando se añade 'reveal' */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .6s ease, transform .6s ease;
}
.is-visible {
  opacity: 1;
  transform: none;
}

/* Hover micro en desktop */
@media (hover: hover) {
  article:hover img { transform: scale(1.04); }
}

/* Accesibilidad: menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
</style>
