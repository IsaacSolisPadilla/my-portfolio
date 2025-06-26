<template>
  <header
    :class="[
      'fixed w-full top-0 left-0 z-50 transition-all duration-500',
      scrolled ? 'bg-indigo-900 bg-opacity-90 shadow-xl backdrop-blur-md' : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:py-5">
      <h1 class="text-2xl font-bold text-indigo-400 cursor-pointer select-none" @click="goTop">
        Isaac Solis Padilla
      </h1>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-10 font-semibold text-indigo-200">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="relative group px-1 py-2 hover:text-indigo-400 transition-colors"
          @click.prevent="scrollToSection(link.href)"
        >
          {{ link.label }}
          <span
            class="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full"
          ></span>
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        aria-label="Toggle menu"
        class="md:hidden relative w-8 h-8 focus:outline-none"
      >
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-indigo-300 rounded transition-transform duration-300',
            menuOpen ? 'rotate-45 top-3.5' : 'top-2'
          ]"
        ></span>
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-indigo-300 rounded transition-opacity duration-300',
            menuOpen ? 'opacity-0' : 'top-4'
          ]"
        ></span>
        <span
          :class="[
            'block absolute h-0.5 w-8 bg-indigo-300 rounded transition-transform duration-300',
            menuOpen ? '-rotate-45 top-3.5' : 'top-6'
          ]"
        ></span>
      </button>
    </div>

    <!-- Mobile Nav Panel -->
    <transition name="slide-fade">
      <nav
        v-if="menuOpen"
        class="md:hidden bg-indigo-900 bg-opacity-95 backdrop-blur-sm py-6 px-8 space-y-6 font-semibold text-indigo-200"
      >
        <a
          v-for="link in navLinks"
          :key="link.id + '-mobile'"
          :href="link.href"
          class="block text-lg hover:text-indigo-400 transition-colors"
          @click.prevent="scrollToSection(link.href); toggleMenu()"
        >
          {{ link.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false,
      scrolled: false,
      navLinks: [
        { id: 1, label: 'Sobre mí', href: '#about' },
        { id: 2, label: 'Proyectos', href: '#projects' },
        { id: 3, label: 'Contacto', href: '#contact' },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    handleScroll() {
      this.scrolled = window.scrollY > 40
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
