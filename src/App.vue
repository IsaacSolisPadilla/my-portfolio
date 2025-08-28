<template>
  <div class="relative min-h-screen text-gray-900 dark:text-gray-100 overflow-x-hidden">
    <BackgroundAnimation />
    <Header />
    <About />
    <Projects />
    <Contact />
    <Skills />
    <Footer />
  </div>
</template>

<script>
import BackgroundAnimation from './components/BackgroundAnimation.vue'
import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Skills from './components/Skills.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    BackgroundAnimation,
    Header,
    About,
    Projects,
    Contact,
    Skills,
    Footer,
  },
}
</script>
