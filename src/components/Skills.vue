<template>
  <section id="skills" class="relative py-24 px-6 max-w-7xl mx-auto text-white">
    <h2 ref="titleRef" class="text-4xl font-extrabold text-center text-indigo-400 mb-16">
      {{ $t('skills.title') }}
    </h2>

    <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div
        v-for="(group, gIndex) in skillGroups"
        :key="gIndex"
        class="bg-white bg-opacity-5 p-6 rounded-xl shadow-xl"
      >
        <h3 class="text-xl font-semibold text-indigo-300 mb-6 border-b border-indigo-800 pb-2 text-center">
          {{ $t(`skills.groups.${gIndex}.title`) }}
        </h3>
        <div class="space-y-5">
          <div v-for="(skill, i) in group.skills" :key="i">
            <div class="flex justify-between items-center mb-1">
              <div class="flex items-center gap-3">
                <img :src="skill.icon" :alt="skill.name" class="w-6 h-6 object-contain" />
                <span class="text-indigo-100 font-medium">
                  {{ $t(`skills.groups.${gIndex}.skills.${i}.name`) }}
                </span>
              </div>
              <span class="text-indigo-400 text-sm">{{ skill.level }}%</span>
            </div>
            <div class="w-full bg-indigo-950 rounded-full h-2 overflow-hidden">
              <div
                class="bg-indigo-500 h-2 rounded-full"
                :ref="el => skill.barRef = el"
                :style="{ width: '0%' }"
              ></div>
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

// Icons reales
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
          { name: 'JavaScript', level: 95, icon: javascriptIcon },
          { name: 'Python', level: 90, icon: pythonIcon },
          { name: 'Java', level: 85, icon: javaIcon },
          { name: 'PHP', level: 80, icon: phpIcon },
        ],
      },
      {
        skills: [
          { name: 'Vue.js', level: 92, icon: vueIcon },
          { name: 'React', level: 88, icon: reactIcon },
          { name: 'React Native', level: 80, icon: reactNativeIcon },
          { name: 'Laravel', level: 78, icon: laravelIcon },
          { name: 'Spring', level: 75, icon: springIcon },
          { name: 'Spring Boot', level: 70, icon: spring2Icon },
          { name: 'Django', level: 82, icon: djangoIcon },
        ],
      },
      {
        skills: [
          { name: 'MySQL', level: 85, icon: mysqlIcon },
          { name: 'MariaDB', level: 80, icon: mariadbIcon },
          { name: 'SQLite', level: 75, icon: sqliteIcon },
        ],
      },
      {
        skills: [
          { name: 'Git', level: 95, icon: gitIcon },
          { name: 'GitHub', level: 90, icon: githubIcon },
          { name: 'GitHub Actions', level: 80, icon: githubActionsIcon },
          { name: 'Postman', level: 85, icon: postmanIcon },
          { name: 'Linux', level: 80, icon: linuxIcon },
          { name: 'Jupyter', level: 75, icon: jupyterIcon },
          { name: 'WordPress', level: 70, icon: wordpressIcon },
        ],
      },
      {
        skills: [
          { name: 'Node.js', level: 85, icon: nodeIcon },
        ],
      },
      {
        skills: [
          { name: 'Agile / Scrum', level: 90, icon: githubActionsIcon },
          { name: 'Liderazgo Técnico', level: 85, icon: githubActionsIcon },
          { name: 'Resolución de Problemas', level: 95, icon: githubActionsIcon },
        ],
      },
    ]

    onMounted(() => {
      nextTick(() => {
        gsap.from(titleRef.value, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.value,
            start: 'top 90%',
          },
        })

        gsap.from(cardsRef.value.children, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.value,
            start: 'top 85%',
          },
        })

        skillGroups.forEach(group => {
          group.skills.forEach(skill => {
            gsap.to(skill.barRef, {
              width: `${skill.level}%`,
              duration: 1,
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
/* Puedes añadir efectos visuales aquí */
</style>
