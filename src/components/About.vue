<template>
  <section
    id="about"
    class="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12"
  >
    <!-- Imagen -->
    <div
      class="w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-indigo-600"
    >
      <img
        src="./assets/profile.png"
        alt="Isaac Solis Padilla"
        class="object-cover w-full h-full"
        loading="lazy"
      />
    </div>

    <!-- Texto -->
    <div class="flex flex-col max-w-xl text-indigo-100">
      <h2 class="text-4xl font-extrabold mb-3 tracking-wide text-indigo-400" v-intersect.once="fadeIn">
        {{ $t('about.title') }}
      </h2>
      <h3 class="text-xl font-semibold mb-6 text-indigo-300" v-intersect.once="fadeIn" style="animation-delay: 150ms">
        {{ $t('about.subtitle') }}
      </h3>
      <p class="text-lg leading-relaxed mb-8 text-indigo-200" v-intersect.once="fadeIn" style="animation-delay: 300ms">
        {{ $t('about.description') }}
      </p>

      <a
        :href="cvLink"
        download
        class="self-start bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold py-3 px-7 rounded-lg shadow-lg relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-indigo-400"
      >
        {{ $t('about.download') }}
        <span class="ripple absolute rounded-full bg-indigo-300 opacity-30 pointer-events-none" ref="ripple"></span>
      </a>
    </div>
  </section>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export default {
  name: 'About',

  setup() {
    const { locale } = useI18n()

    const cvLink = computed(() => {
      return locale.value === 'en'
        ? '/assets/cv-isaac-en.pdf'
        : '/assets/cv-isaac-es.pdf'
    })

    return { cvLink }
  },

  methods: {
    fadeIn(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
      }, 100);
    },
  },

  directives: {
    intersect: {
      mounted(el, binding) {
        const options = { threshold: 0.1 };
        const callback = (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (binding.modifiers.once) {
                observer.unobserve(el);
              }
              binding.value(el);
            }
          });
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
      },
    },
  },
}
</script>

<style scoped>
/* Ripple effect on button */
button {
  position: relative;
  overflow: hidden;
}

button .ripple {
  position: absolute;
  transform: scale(0);
  pointer-events: none;
  animation: ripple 600ms linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
  