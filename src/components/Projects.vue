<template>
  <section id="projects" class="max-w-7xl mx-auto px-6 py-20 md:py-32">
    <h2
      class="text-4xl font-extrabold mb-12 text-indigo-400 tracking-wide text-center"
      v-intersect.once="fadeIn"
    >
      {{ $t('projects.title') }}
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      <article
        v-for="project in projects"
        :key="project.id"
        class="bg-indigo-900 bg-opacity-70 rounded-xl shadow-xl overflow-hidden transform transition duration-400 hover:scale-[1.03] hover:shadow-indigo-500 cursor-pointer"
        v-intersect.once="fadeInCard"
      >
        <img
          :src="project.image"
          :alt="$t(project.title)"
          :class="[
            'w-full h-64 object-contain',
            project.id === 3 ? 'scale-95' : 'scale-150'
          ]"
          loading="lazy"
        />
        <div class="p-12 flex flex-col justify-between h-95">
          <div>
            <h3 class="text-2xl font-semibold text-indigo-200 mb-3">
              {{ $t(project.title) }}
            </h3>
            <p class="text-indigo-300 text-sm leading-relaxed mb-4">
              {{ $t(project.description) }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="text-indigo-400 text-xs bg-indigo-700 px-3 py-1 rounded-full font-mono"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="mt-6 flex gap-4">
           <a
            v-if="project.demoUrl.endsWith('.mp4')"
            href="#"
            @click.prevent="openVideoModal(project.demoUrl)"
            class="flex-1 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center py-2 rounded-md font-semibold transition"
          >
            {{ $t('projects.demo') }}
          </a>
          <a
            v-else
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center py-2 rounded-md font-semibold transition"
          >
            {{ $t('projects.demo') }}
          </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-indigo-200 text-center py-2 rounded-md font-semibold transition"
            >
              {{ $t('projects.repo') }}
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- Modal para video -->
    <div
      v-if="showVideoModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      @click.self="closeVideoModal"
    >
      <div class="bg-indigo-900 rounded-lg shadow-lg p-4 w-full max-w-3xl">
        <div class="relative w-full max-h-[80vh] flex justify-center items-center">
        <video
          controls
          autoplay
          class="max-w-full max-h-[80vh] object-contain rounded-md"
        >
          <source :src="activeVideoUrl" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>
      </div>
        <button
          @click="closeVideoModal"
          class="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Cerrar
        </button>
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
      el.style.transform = 'translateY(20px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      }, 100)
    },
    fadeInCard(el) {
      el.style.opacity = 0
      el.style.transform = 'translateY(40px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      }, 100)
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
              if (binding.modifiers.once) {
                observer.unobserve(el)
              }
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
/* Puedes añadir animaciones aquí si lo deseas */
</style>
