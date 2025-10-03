<template>
  <section id="skills" class="relative py-24 px-6 max-w-7xl mx-auto">
    <!-- Título -->
    <h2
      ref="titleRef"
      class="text-4xl md:text-5xl font-extrabold text-center mb-16 tracking-tight
             bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600"
    >
      {{ $t('skills.title') }}
    </h2>

    <!-- Nota -->
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
        <!-- Card: blur solo en md+ para ahorrar en móvil -->
        <div class="h-full rounded-2xl bg-white/80 md:backdrop-blur border border-white shadow-lg p-6">
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
                  <img
                    :src="skill.icon"
                    :alt="skill.name"
                    class="w-6 h-6 object-contain"
                    width="24" height="24"
                    loading="lazy" decoding="async"
                  />
                  <span class="text-slate-800 font-medium">
                    {{ $t(`skills.groups.${gIndex}.skills.${i}.name`) }}
                  </span>
                </div>
                <span class="text-slate-600 text-sm font-medium">{{ skill.level }}%</span>
              </div>

              <!-- Barra -->
              <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  class="h-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 skill-bar"
                  :ref="el => (skill.barRef = el)"
                  :style="{ width: reduceMotion ? skill.level + '%' : '0%' }"
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
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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

export default {
  name: 'Skills',
  setup() {
    const titleRef = ref(null)
    const cardsRef = ref(null)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const skillGroups = [
      {
        skills: [
          { name: 'JavaScript', level: 75, icon: javascriptIcon, barRef: null },
          { name: 'Python', level: 80, icon: pythonIcon, barRef: null },
          { name: 'Java', level: 90, icon: javaIcon, barRef: null },
          { name: 'PHP', level: 85, icon: phpIcon, barRef: null },
        ],
      },
      {
        skills: [
          { name: 'Vue.js', level: 40, icon: vueIcon, barRef: null },
          { name: 'React', level: 85, icon: reactIcon, barRef: null },
          { name: 'React Native', level: 80, icon: reactNativeIcon, barRef: null },
          { name: 'Laravel', level: 65, icon: laravelIcon, barRef: null },
          { name: 'Spring', level: 90, icon: springIcon, barRef: null },
          { name: 'Spring Boot', level: 90, icon: spring2Icon, barRef: null },
          { name: 'Django', level: 60, icon: djangoIcon, barRef: null },
        ],
      },
      {
        skills: [
          { name: 'MySQL', level: 85, icon: mysqlIcon, barRef: null },
          { name: 'MariaDB', level: 80, icon: mariadbIcon, barRef: null },
          { name: 'SQLite', level: 80, icon: sqliteIcon, barRef: null },
        ],
      },
      {
        skills: [
          { name: 'Git', level: 95, icon: gitIcon, barRef: null },
          { name: 'GitHub', level: 90, icon: githubIcon, barRef: null },
          { name: 'GitHub Actions', level: 60, icon: githubActionsIcon, barRef: null },
          { name: 'Postman', level: 95, icon: postmanIcon, barRef: null },
          { name: 'Linux', level: 65, icon: linuxIcon, barRef: null },
          { name: 'Jupyter', level: 80, icon: jupyterIcon, barRef: null },
          { name: 'WordPress', level: 95, icon: wordpressIcon, barRef: null },
        ],
      },
      { skills: [ { name: 'Node.js', level: 60, icon: nodeIcon, barRef: null } ] },
      {
        skills: [
          { name: 'Agile / Scrum', level: 75, icon: githubActionsIcon, barRef: null },
          { name: 'Liderazgo Técnico', level: 40, icon: githubActionsIcon, barRef: null },
          { name: 'Resolución de Problemas', level: 60, icon: githubActionsIcon, barRef: null },
        ],
      },
    ]

    // GSAP dinámico (solo si hace falta)
    let gsap = null
    let ScrollTrigger = null
    let observer = null
    let resizeRaf = null

    const initGsap = async () => {
      if (reduceMotion) return // no animamos, ya hay fallback CSS
      if (!gsap) {
        const mod = await import('gsap')
        const st = await import('gsap/ScrollTrigger')
        gsap = mod.default || mod
        ScrollTrigger = st.default || st
        gsap.registerPlugin(ScrollTrigger)
      }

      // Título
      if (titleRef.value) {
        gsap.from(titleRef.value, {
          opacity: 0,
          y: -40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.value, start: 'top 90%' },
        })
      }

      // Cards (stagger)
      if (cardsRef.value) {
        gsap.from(cardsRef.value.children, {
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.value, start: 'top 85%' },
        })
      }

      // Barras
      skillGroups.forEach(group => {
        group.skills.forEach(skill => {
          if (!skill.barRef) return
          gsap.fromTo(
            skill.barRef,
            { width: '0%' },
            {
              width: `${skill.level}%`,
              duration: 0.9,
              ease: 'power2.out',
              scrollTrigger: { trigger: skill.barRef, start: 'top 95%' },
            }
          )
        })
      })

      // Refresh con throttle
      const onResize = () => {
        if (resizeRaf) return
        resizeRaf = requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          resizeRaf = null
        })
      }
      window.addEventListener('resize', onResize, { passive: true })
      // guardamos para cleanup
      cleanupFns.push(() => window.removeEventListener('resize', onResize))
    }

    // Cleanup acumulado
    const cleanupFns = []
    onBeforeUnmount(() => {
      cleanupFns.forEach(fn => fn())
      if (ScrollTrigger) ScrollTrigger.getAll().forEach(tr => tr.kill())
    })

    onMounted(() => {
      nextTick(() => {
        if (reduceMotion) {
          // Sin animaciones: ya dejamos los widths al montar (hecho en template)
          return
        }
        // Inicia GSAP solo cuando la sección entra en viewport (ahorra JS en home)
        const opts = { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        observer = new IntersectionObserver(async (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              await initGsap()
              observer.disconnect()
              observer = null
              break
            }
          }
        }, opts)
        if (titleRef.value) observer.observe(titleRef.value)
        cleanupFns.push(() => observer && observer.disconnect())
      })
    })

    return { titleRef, cardsRef, skillGroups, reduceMotion }
  },
}
</script>

<style scoped>
/* Hover sutil */
.group:hover .rounded-2xl {
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

/* Fallback accesible: si el usuario pide menos movimiento, respetamos */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
</style>
