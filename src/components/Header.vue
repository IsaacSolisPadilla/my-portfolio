<template>
  <header
    :class="[
      'fixed w-full top-0 left-0 z-50 transition-all duration-500',
      'bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 shadow-2xl backdrop-blur-md'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">
      <h1
        class="text-2xl font-extrabold text-white drop-shadow-lg cursor-pointer select-none tracking-wide"
        @click="goTop"
      >
        Isaac Solis Padilla
      </h1>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-8 font-semibold text-white/90">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="relative group px-1 py-2 transition-colors"
          :class="{
            'text-cyan-200': activeSection === link.href,
            'hover:text-cyan-300': activeSection !== link.href
          }"
          @click.prevent="scrollToSection(link.href)"
        >
          {{ $t(link.label) }}
          <span
            class="absolute left-0 -bottom-1 h-0.5 bg-cyan-300 transition-all"
            :class="{
              'w-full': activeSection === link.href,
              'w-0 group-hover:w-full': activeSection !== link.href
            }"
          ></span>
        </a>

        <!-- Language Switcher -->
        <div class="flex gap-2 items-center ml-4">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            :aria-label="lang.label"
            class="text-xl hover:scale-125 transition-transform duration-300 focus:outline-none"
            :class="{ 'opacity-100': currentLang === lang.code, 'opacity-50': currentLang !== lang.code }"
          >
            {{ lang.emoji }}
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        aria-label="Toggle menu"
        class="md:hidden relative w-8 h-8 focus:outline-none"
      >
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-white rounded transition-transform duration-300',
            menuOpen ? 'rotate-45 top-3.5' : 'top-2'
          ]"
        ></span>
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-white rounded transition-opacity duration-300',
            menuOpen ? 'opacity-0' : 'top-4'
          ]"
        ></span>
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-white rounded transition-transform duration-300',
            menuOpen ? '-rotate-45 top-3.5' : 'top-6'
          ]"
        ></span>
      </button>
    </div>

    <!-- Mobile Nav Panel -->
    <transition name="slide-fade">
      <nav
        v-if="menuOpen"
        class="md:hidden bg-gradient-to-b from-indigo-700 via-fuchsia-600 to-sky-500/90 backdrop-blur-sm py-6 px-8 space-y-6 font-semibold text-white/90 shadow-lg"
      >
        <a
          v-for="link in navLinks"
          :key="link.id + '-mobile'"
          :href="link.href"
          class="block text-lg transition-colors"
          :class="{
            'text-cyan-200': activeSection === link.href,
            'hover:text-cyan-300': activeSection !== link.href
          }"
          @click.prevent="scrollToSection(link.href); toggleMenu()"
        >
          {{ $t(link.label) }}
        </a>

        <!-- Language Switcher Mobile -->
        <div class="flex gap-4 justify-center mt-6">
          <button
            v-for="lang in languages"
            :key="lang.code + '-mobile'"
            @click="switchLanguage(lang.code)"
            :aria-label="lang.label"
            class="text-2xl hover:scale-125 transition-transform duration-300 focus:outline-none"
            :class="{ 'opacity-100': currentLang === lang.code, 'opacity-50': currentLang !== lang.code }"
          >
            {{ lang.emoji }}
          </button>
        </div>
      </nav>
    </transition>
  </header>
</template>


<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'Header',
  setup() {
    const { locale, t } = useI18n()

    const navLinks = [
      { id: 1, label: 'nav.about', href: '#about' },
      { id: 2, label: 'nav.projects', href: '#projects' },
      { id: 3, label: 'nav.contact', href: '#contact' },
      { id: 4, label: 'nav.skills', href: '#skills' },
    ]

    const languages = [
      { code: 'es', label: 'Español', emoji: '🇪🇸' },
      { code: 'en', label: 'English', emoji: '🇬🇧' },
    ]

    const switchLanguage = (lang) => {
      locale.value = lang
    }

    return {
      navLinks,
      languages,
      currentLang: locale,
      switchLanguage,
      t,
    }
  },
  data() {
    return {
      menuOpen: false,
      activeSection: null,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    scrollToSection(id) {
      const el = document.querySelector(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  mounted() {
    const sections = document.querySelectorAll('section[id]')
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = `#${entry.target.id}`
        }
      })
    }, options)

    sections.forEach((section) => observer.observe(section))
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
