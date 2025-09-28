<template>
  <section
    id="skills"
    class="relative py-24 px-6 max-w-7xl mx-auto"
  >
    <!-- Título -->
    <h2
      ref="titleRef"
      class="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight
             bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"
    >
      {{ $t('skills.title') }}
    </h2>

     <!-- Nota explicativa -->
    <p
      class="text-center text-sm md:text-base text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed"
      v-html="$t('skills.note')"
    ></p>

    <!-- Grid -->
    <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <div
        v-for="(group, gIndex) in skillGroups"
        :key="gIndex"
        class="group rounded-2xl p-1 bg-gradient-to-br from-sky-500/20 via-indigo-600/20 to-fuchsia-600/20
               hover:from-sky-500/30 hover:to-fuchsia-600/30 transition-colors"
      >
        <!-- Card (glass) -->
        <div class="h-full rounded-2xl bg-white/80 backdrop-blur border border-white shadow-lg p-6">
          <h3
            class="text-center text-lg md:text-xl font-semibold mb-6
                   bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600"
          >
            {{ $t(`skills.groups.${gIndex}.title`) }}
          </h3>

          <div class="space-y-5">
            <div v-for="(skill, i) in group.skills" :key="i">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center gap-3">
                  <img :src="skill.icon" :alt="skill.name" class="w-6 h-6 object-contain" />
                  <span class="text-slate-800 font-medium">
                    {{ $t(`skills.groups.${gIndex}.skills.${i}.name`) }}
                  </span>
                </div>
                <span class="text-slate-600 text-sm font-medium">{{ skill.level }}%</span>
              </div>

              <!-- Barra -->
              <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  class="h-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"
                  :ref="el => skill.barRef = el"
                  :style="{ width: '0%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Icons
import djangoIcon from '../assets/skills/django.svg'
import gitIcon from '../assets/skills/git.svg'
import githubIcon from '../assets/skills/github.svg'
import githubActionsIcon from '../assets/skills/githubactions.svg'
import javaIcon from '../assets/skills/java.svg'
import javascriptIcon from '../assets/skills/javascript.svg'
import jupyterIcon from '../assets/skills/jupyter.svg'
import laravelIcon from '../assets/skills/laravel.svg'
import linuxIcon from '../assets/skills/linux.svg'
import mariadbIcon from '../assets/skills/mariadb.svg'
import mysqlIcon from '../assets/skills/mysql.svg'
import nodeIcon from '../assets/skills/node.svg'
import phpIcon from '../assets/skills/php.svg'
import postmanIcon from '../assets/skills/postman.svg'
import pythonIcon from '../assets/skills/python.svg'
import reactIcon from '../assets/skills/react.svg'
import reactNativeIcon from '../assets/skills/reactnative.svg'
import springIcon from '../assets/skills/spring.svg'
import spring2Icon from '../assets/skills/spring2.svg'
import sqliteIcon from '../assets/skills/sqlite.svg'
import vueIcon from '../assets/skills/vue.svg'
import wordpressIcon from '../assets/skills/wordpress.svg'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'Skills',
  setup() {
    const titleRef = ref(null)
    const cardsRef = ref(null)

    const skillGroups = [
      {
        skills: [
          { name: 'JavaScript', level: 75, icon: javascriptIcon },
          { name: 'Python', level: 80, icon: pythonIcon },
          { name: 'Java', level: 90, icon: javaIcon },
          { name: 'PHP', level: 85, icon: phpIcon },
        ],
      },
      {
        skills: [
          { name: 'Vue.js', level: 40, icon: vueIcon },
          { name: 'React', level: 85, icon: reactIcon },
          { name: 'React Native', level: 80, icon: reactNativeIcon },
          { name: 'Laravel', level: 65, icon: laravelIcon },
          { name: 'Spring', level: 90, icon: springIcon },
          { name: 'Spring Boot', level: 90, icon: spring2Icon },
          { name: 'Django', level: 60, icon: djangoIcon },
        ],
      },
      {
        skills: [
          { name: 'MySQL', level: 85, icon: mysqlIcon },
          { name: 'MariaDB', level: 80, icon: mariadbIcon },
          { name: 'SQLite', level: 80, icon: sqliteIcon },
        ],
      },
      {
        skills: [
          { name: 'Git', level: 95, icon: gitIcon },
          { name: 'GitHub', level: 90, icon: githubIcon },
          { name: 'GitHub Actions', level: 60, icon: githubActionsIcon },
          { name: 'Postman', level: 95, icon: postmanIcon },
          { name: 'Linux', level: 65, icon: linuxIcon },
          { name: 'Jupyter', level: 80, icon: jupyterIcon },
          { name: 'WordPress', level: 95, icon: wordpressIcon },
        ],
      },
      {
        skills: [
          { name: 'Node.js', level: 60, icon: nodeIcon },
        ],
      },
      {
        skills: [
          { name: 'Agile / Scrum', level: 75, icon: githubActionsIcon },
          { name: 'Liderazgo Técnico', level: 40, icon: githubActionsIcon },
          { name: 'Resolución de Problemas', level: 60, icon: githubActionsIcon },
        ],
      },
    ]

    onMounted(() => {
      nextTick(() => {
        // Título
        gsap.from(titleRef.value, {
          opacity: 0,
          y: -40,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.value,
            start: 'top 90%',
          },
        })

        // Cards
        if (cardsRef.value) {
          gsap.from(cardsRef.value.children, {
            opacity: 0,
            y: 40,
            scale: 0.98,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.value,
              start: 'top 85%',
            },
          })
        }

        // Barras
        skillGroups.forEach(group => {
          group.skills.forEach(skill => {
            gsap.to(skill.barRef, {
              width: `${skill.level}%`,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: skill.barRef,
                start: 'top 95%',
              },
            })
          })
        })
      })
    })

    return {
      titleRef,
      cardsRef,
      skillGroups,
    }
  },
}
</script>

<style scoped>
/* (Opcional) brillo sutil al hover del contenedor */
.group:hover .rounded-2xl {
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}
</style>
