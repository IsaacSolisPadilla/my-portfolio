<template>
  <section id="projects" class="max-w-7xl mx-auto px-6 py-20 md:py-32">
    <!-- Título -->
    <h2
      class="text-4xl md:text-5xl font-extrabold mb-12 text-center tracking-tight
             bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"
      v-intersect.once="fadeIn"
    >
      {{ $t('projects.title') }}
    </h2>

    <!-- Grid de proyectos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      <article
        v-for="project in projects"
        :key="project.id"
        class="group rounded-2xl p-1 bg-gradient-to-br from-sky-500/25 via-indigo-600/25 to-fuchsia-600/25
               hover:from-sky-500/35 hover:to-fuchsia-600/35 transition-colors"
        v-intersect.once="fadeInCard"
      >
        <!-- Card interior (glass) -->
        <div class="relative h-full rounded-2xl bg-white/80 backdrop-blur border border-white shadow-lg overflow-hidden">
          <!-- Imagen -->
          <div class="relative aspect-video overflow-hidden">
            <img
              :src="project.image"
              :alt="$t(project.title)"
              class="w-full h-full object-contain transition-transform duration-700 ease-out
                     group-hover:scale-[1.04]"
            />
            <!-- Glow sutil -->
            <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style="background: radial-gradient(60% 60% at 50% 50%, rgba(56,189,248,.25), rgba(167,139,250,.18), rgba(236,72,153,.14) 70%, transparent 75%);">
            </div>

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

            <!-- Chips -->
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Botones -->
            <div class="mt-6 flex gap-3">
              <!-- Demo (si no es .mp4 abre en nueva pestaña) -->
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

    <!-- Modal de vídeo (claro) -->
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
                controls
                autoplay
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
import project1Image from '../assets/eol.png'
import project2Image from '../assets/todus.png'
import project3Image from '../assets/caronte.png'

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
        },
        {
          id: 2,
          title: 'projects.items.1.title',
          description: 'projects.items.1.description',
          technologies: ['React Native', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'MySQL', 'Spring Boot', 'Java'],
          demoUrl: 'https://youtu.be/Yo3TVPByef4',
          repoUrl: 'https://github.com/IsaacSolisPadilla/ToDUS',
          image: project2Image,
        },
        {
          id: 3,
          title: 'projects.items.2.title',
          description: 'projects.items.2.description',
          technologies: ['React Native', 'CSS', 'HTML', 'JavaScript', 'Node.js', 'MySQL', 'Spring Boot', 'Java'],
          demoUrl: 'https://www.caronte.site/',
          repoUrl: 'https://github.com/ISPP-2425-G9',
          image: project3Image,
        },
      ],
    }
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
    fadeInCard(el) {
      el.style.opacity = 0
      el.style.transform = 'translateY(28px)'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity .7s ease, transform .7s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      })
    },
    openVideoModal(url) {
      this.activeVideoUrl = url
      this.showVideoModal = true
    },
    closeVideoModal() {
      this.activeVideoUrl = ''
      this.showVideoModal = false
    },
  },
  directives: {
    intersect: {
      mounted(el, binding) {
        const options = { threshold: 0.15 }
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
/* (Opcional) micro-animación de “float” al pasar el mouse en desktop */
@media (hover: hover) {
  article:hover img { transform: scale(1.04); }
}
</style>
