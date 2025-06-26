<template>
  <section id="projects" class="max-w-7xl mx-auto px-6 py-20 md:py-32">
    <h2
      class="text-4xl font-extrabold mb-12 text-indigo-400 tracking-wide text-center"
      v-intersect.once="fadeIn"
    >
      Proyectos
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <article
        v-for="project in projects"
        :key="project.id"
        class="bg-indigo-900 bg-opacity-70 rounded-xl shadow-xl overflow-hidden transform transition duration-400 hover:scale-[1.03] hover:shadow-indigo-500 cursor-pointer"
        v-intersect.once="fadeInCard"
      >
        <img
          :src="project.image"
          :alt="project.title"
          class="w-full h-48 object-cover"
          loading="lazy"
        />
        <div class="p-6 flex flex-col justify-between h-56">
          <div>
            <h3 class="text-2xl font-semibold text-indigo-200 mb-3">
              {{ project.title }}
            </h3>
            <p class="text-indigo-300 text-sm leading-relaxed mb-4">
              {{ project.description }}
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
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-center py-2 rounded-md font-semibold transition"
            >
              Demo
            </a>
            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 bg-indigo-700 hover:bg-indigo-800 active:bg-indigo-900 text-indigo-200 text-center py-2 rounded-md font-semibold transition"
            >
              Repo
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import project1Image from '../assets/project1.png'
import project2Image from '../assets/project2.png'
import project3Image from '../assets/project3.png'

export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        {
          id: 1,
          title: 'Proyecto One',
          description: 'Una app increíble que hace X, Y y Z con tecnología moderna.',
          technologies: ['Vue 3', 'Tailwind', 'Vite', 'Firebase'],
          demoUrl: 'https://demo-proyecto1.com',
          repoUrl: 'https://github.com/usuario/proyecto1',
          image: project1Image,
        },
        {
          id: 2,
          title: 'Proyecto Two',
          description: 'Proyecto web con funcionalidades avanzadas y UI/UX pulida.',
          technologies: ['Vue 3', 'Node.js', 'Express', 'MongoDB'],
          demoUrl: 'https://demo-proyecto2.com',
          repoUrl: 'https://github.com/usuario/proyecto2',
          image: project2Image,
        },
        {
          id: 3,
          title: 'Proyecto Three',
          description: 'Aplicación móvil multiplataforma con rendimiento excelente.',
          technologies: ['React Native', 'Expo', 'GraphQL'],
          demoUrl: 'https://demo-proyecto3.com',
          repoUrl: 'https://github.com/usuario/proyecto3',
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
/* Añadir aquí si quieres alguna animación o efecto extra */
</style>
