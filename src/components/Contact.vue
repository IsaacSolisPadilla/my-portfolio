<template>
  <section id="contact" class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      <!-- Left: Texto + contactos -->
      <div class="flex flex-col justify-center text-center md:text-left md:w-1/2 text-gray-300 space-y-8">
        <h2 class="text-4xl font-extrabold tracking-tight text-white drop-shadow-xl">{{ $t('contact.title') }}</h2>
        <p class="text-base max-w-md leading-relaxed text-gray-400 tracking-wide">
          {{ $t('contact.description') }}
        </p>

        <div class="flex justify-center md:justify-start gap-10 mt-4">
          <!-- GitHub -->
          <a
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 hover:text-indigo-500 transition duration-300"
            aria-label="GitHub"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.084-.73.084-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.81 1.304 3.495.997.108-.775.418-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013-.404c1.02.005 2.045.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.243 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.1.815 2.22v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z"
              />
            </svg>
            <span class="font-semibold text-sm">{{ $t('contact.github') }}</span>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 hover:text-indigo-500 transition duration-300"
            aria-label="LinkedIn"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path
                d="M4.983 3.5C4.983 4.88 3.9 6 2.5 6S.017 4.88.017 3.5 1.1 1 2.5 1 4.983 2.12 4.983 3.5zM.117 7h4.83v14H.117zM8.596 7h4.63v2.337h.064c.646-1.225 2.227-2.516 4.585-2.516 4.904 0 5.805 3.23 5.805 7.424V21H18.23v-7.3c0-1.743-.03-3.988-2.43-3.988-2.43 0-2.8 1.894-2.8 3.853V21H8.596z"
              />
            </svg>
            <span class="font-semibold text-sm">{{ $t('contact.linkedin') }}</span>
          </a>
        </div>
      </div>

      <!-- Right: Formulario -->
      <Form
        :validation-schema="schema"
        @submit="handleSubmit"
        class="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md mx-auto w-full text-gray-300"
      >
        <h3 class="text-2xl font-extrabold mb-6 text-white tracking-wide drop-shadow-md">
          {{ $t('contact.form.title') }}
        </h3>

        <div class="mb-6">
          <label for="name" class="block mb-2 font-semibold text-base">{{ $t('contact.form.name') }}</label>
          <Field
            name="name"
            id="name"
            as="input"
            type="text"
            :placeholder="$t('contact.form.namePlaceholder')"
            class="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-600 transition-shadow duration-300"
          />
          <ErrorMessage name="name" class="text-red-500 mt-1 text-sm" />
        </div>

        <div class="mb-6">
          <label for="email" class="block mb-2 font-semibold text-base">{{ $t('contact.form.email') }}</label>
          <Field
            name="email"
            id="email"
            as="input"
            type="email"
            :placeholder="$t('contact.form.emailPlaceholder')"
            class="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-600 transition-shadow duration-300"
          />
          <ErrorMessage name="email" class="text-red-500 mt-1 text-sm" />
        </div>

        <div class="mb-6">
          <label for="message" class="block mb-2 font-semibold text-base">{{ $t('contact.form.message') }}</label>
          <Field
            name="message"
            id="message"
            as="textarea"
            rows="5"
            :placeholder="$t('contact.form.messagePlaceholder')"
            class="w-full rounded-lg bg-gray-800 border border-gray-700 p-3 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-600 transition-shadow duration-300 resize-none"
          />
          <ErrorMessage name="message" class="text-red-500 mt-1 text-sm" />
        </div>

        <vue-recaptcha
          sitekey="TU_SITE_KEY"
          @verify="onVerify"
          @expired="onExpired"
          class="mb-6 mx-auto"
        />

        <button
          :disabled="loading || !recaptchaVerified"
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-4 rounded-xl text-white font-bold flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-indigo-500/50"
        >
          <span v-if="!loading">{{ $t('contact.form.send') }}</span>
          <svg
            v-else
            class="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </button>

        <p v-if="successMessage" class="mt-6 text-green-400 font-bold text-center tracking-wide text-sm">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="mt-6 text-red-500 font-bold text-center tracking-wide text-sm">
          {{ errorMessage }}
        </p>
      </Form>
    </div>
  </section>
</template>


<script>
import emailjs from 'emailjs-com'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'Contact',
  components: {
    Form,
    Field,
    ErrorMessage,
    'vue-recaptcha': VueRecaptcha,
  },
  data() {
    return {
      loading: false,
      successMessage: '',
      errorMessage: '',
      recaptchaVerified: false,
      recaptchaResponse: '',
      schema: yup.object({
        name: yup.string().required('El nombre es obligatorio'),
        email: yup.string().email('Correo no válido').required('El correo es obligatorio'),
        message: yup.string().min(10, 'El mensaje es muy corto').required('Mensaje obligatorio'),
      }),
    }
  },
  methods: {
    onVerify(response) {
      this.recaptchaVerified = true
      this.recaptchaResponse = response
      this.errorMessage = '' // limpia errores de recaptcha si los hubo
    },
    onExpired() {
      this.recaptchaVerified = false
      this.recaptchaResponse = ''
    },
    handleSubmit(values) {
      if (!this.recaptchaVerified) {
        this.errorMessage = 'Por favor, verifica que no eres un robot.'
        return
      }

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      const serviceID = 'YOUR_EMAILJS_SERVICE_ID'
      const templateID = 'YOUR_EMAILJS_TEMPLATE_ID'
      const userID = 'YOUR_EMAILJS_PUBLIC_KEY'

      // Añadimos el token recaptcha a los valores para backend si quieres
      const templateParams = {
        ...values,
        'g-recaptcha-response': this.recaptchaResponse,
      }

      emailjs.send(serviceID, templateID, templateParams, userID)
        .then(() => {
          this.loading = false
          this.successMessage = 'Mensaje enviado con éxito. ¡Gracias!'
          this.recaptchaVerified = false
          this.recaptchaResponse = ''
          // Reiniciar reCAPTCHA
          this.$refs.recaptcha.reset()
        })
        .catch(() => {
          this.loading = false
          this.errorMessage = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
          this.recaptchaVerified = false
          this.recaptchaResponse = ''
          this.$refs.recaptcha.reset()
        })
    },
  },
}
</script>

<style scoped>
/* Extra: Añadí para que el botón no cambie ancho al cambiar texto */
button span,
button svg {
  display: inline-block;
}
</style>
