<template>
    <section id="skills" class="relative py-24 px-6 max-w-7xl mx-auto text-white">
      <h2 ref="titleRef" class="text-4xl font-extrabold text-center text-indigo-400 mb-16">
        Habilidades Técnicas
      </h2>
  
      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div
          v-for="group in skillGroups"
          :key="group.title"
          class="bg-white bg-opacity-5 p-6 rounded-xl shadow-xl"
        >
          <h3 class="text-xl font-semibold text-indigo-300 mb-6 border-b border-indigo-800 pb-2 text-center">
            {{ group.title }}
          </h3>
          <div class="space-y-5">
            <div v-for="(skill, i) in group.skills" :key="i">
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center gap-3">
                  <img :src="skill.icon" :alt="skill.name" class="w-6 h-6 object-contain" />
                  <span class="text-indigo-100 font-medium">{{ skill.name }}</span>
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
  
  // Icons
  import jsIcon from '../assets/profile.png'
  import vueIcon from '../assets/profile.png'
  import pythonIcon from '../assets/profile.png'
  import dockerIcon from '../assets/profile.png'
  import gitIcon from '../assets/profile.png'
  import graphqlIcon from '../assets/profile.png'
  import awsIcon from '../assets/profile.png'
  import agileIcon from '../assets/profile.png'
  import cIcon from '../assets/profile.png'
  import javaIcon from '../assets/profile.png'
  
  gsap.registerPlugin(ScrollTrigger)
  
  export default {
    name: 'Skills',
    setup() {
      const titleRef = ref(null)
      const cardsRef = ref(null)
  
      const skillGroups = [
        {
          title: 'Lenguajes de Programación',
          skills: [
            { name: 'JavaScript', level: 95, icon: jsIcon },
            { name: 'Python', level: 90, icon: pythonIcon },
            { name: 'C/C++', level: 85, icon: cIcon },
            { name: 'Java', level: 80, icon: javaIcon },
          ],
        },
        {
          title: 'Frameworks y Librerías',
          skills: [
            { name: 'Vue.js', level: 92, icon: vueIcon },
            { name: 'GraphQL', level: 75, icon: graphqlIcon },
            { name: 'TailwindCSS', level: 90, icon: vueIcon },
          ],
        },
        {
          title: 'DevOps y Herramientas',
          skills: [
            { name: 'Git & GitHub', level: 95, icon: gitIcon },
            { name: 'Docker', level: 85, icon: dockerIcon },
            { name: 'AWS', level: 70, icon: awsIcon },
          ],
        },
        {
          title: 'Habilidades y Metodologías',
          skills: [
            { name: 'Agile / Scrum', level: 90, icon: agileIcon },
            { name: 'Liderazgo Técnico', level: 85, icon: agileIcon },
            { name: 'Resolución de Problemas', level: 95, icon: agileIcon },
          ],
        },
      ]
  
      onMounted(() => {
        nextTick(() => {
          // Animar título
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
  
          // Animar tarjetas
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
  
          // Animar barras
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
  /* Puedes añadir transiciones suaves o brillos si deseas */
  </style>
  