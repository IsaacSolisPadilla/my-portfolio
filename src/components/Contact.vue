<template>
  <section
    id="contact"
    class="bg-gradient-to-br from-white via-sky-50 to-fuchsia-50 py-16 px-4"
  >
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">

      <!-- Izquierda: Texto + enlaces -->
      <div class="flex flex-col justify-center text-center md:text-left md:w-1/2 text-slate-700 space-y-8">
        <h2
          class="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent
                 bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 drop-shadow-sm"
        >
          {{ $t('contact.title') }}
        </h2>

        <p class="text-base max-w-md leading-relaxed text-slate-600 tracking-wide mx-auto md:mx-0">
          {{ $t('contact.description') }}
        </p>

        <div class="flex justify-center md:justify-start gap-10 mt-4">
          <!-- GitHub -->
          <a
            href="https://github.com/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 text-slate-700 hover:text-slate-900 transition duration-300"
            aria-label="GitHub"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.61-4.033-1.61-.546-1.39-1.333-1.76-1.333-1.76-1.09-.745.084-.73.084-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.81 1.304 3.495.997.108-.775.418-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013-.404c1.02.005 2.045.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.243 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922.43.37.815 1.1.815 2.22v3.293c0 .32.217.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.373-12-12-12z"/>
            </svg>
            <span class="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-fuchsia-600">
              {{ $t('contact.github') }}
            </span>
          </a>

          <!-- LinkedIn -->
          <a
            href="https://linkedin.com/in/tuusuario"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center space-y-2 text-slate-700 hover:text-slate-900 transition duration-300"
            aria-label="LinkedIn"
          >
            <svg class="w-10 h-10 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
              <path d="M4.983 3.5C4.983 4.88 3.9 6 2.5 6S.017 4.88.017 3.5 1.1 1 2.5 1 4.983 2.12 4.983 3.5zM.117 7h4.83v14H.117zM8.596 7h4.63v2.337h.064c.646-1.225 2.227-2.516 4.585-2.516 4.904 0 5.805 3.23 5.805 7.424V21H18.23v-7.3c0-1.743-.03-3.988-2.43-3.988-2.43 0-2.8 1.894-2.8 3.853V21H8.596z"/>
            </svg>
            <span class="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              {{ $t('contact.linkedin') }}
            </span>
          </a>
        </div>
      </div>

      <!-- Derecha: Formulario -->
      <Form
        :validation-schema="schema"
        @submit="handleSubmit"
        class="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-lg border border-white md:w-1/2 w-full text-slate-700"
      >
        <h3 class="text-2xl font-extrabold mb-6 text-slate-900">
          {{ $t('contact.form.title') }}
        </h3>

        <div class="mb-6">
          <label for="name" class="block mb-2 font-semibold text-sm text-slate-700">
            {{ $t('contact.form.name') }}
          </label>
          <Field
            name="name"
            id="name"
            as="input"
            type="text"
            :placeholder="$t('contact.form.namePlaceholder')"
            class="w-full rounded-xl bg-white border border-slate-300 p-3 placeholder-slate-400
                   focus:outline-none focus:ring-4 focus:ring-sky-200 transition-shadow duration-300"
          />
          <ErrorMessage name="name" class="text-red-500 mt-1 text-sm"/>
        </div>

        <div class="mb-6">
          <label for="email" class="block mb-2 font-semibold text-sm text-slate-700">
            {{ $t('contact.form.email') }}
          </label>
          <Field
            name="email"
            id="email"
            as="input"
            type="email"
            :placeholder="$t('contact.form.emailPlaceholder')"
            class="w-full rounded-xl bg-white border border-slate-300 p-3 placeholder-slate-400
                   focus:outline-none focus:ring-4 focus:ring-sky-200 transition-shadow duration-300"
          />
          <ErrorMessage name="email" class="text-red-500 mt-1 text-sm"/>
        </div>

        <div class="mb-6">
          <label for="message" class="block mb-2 font-semibold text-sm text-slate-700">
            {{ $t('contact.form.message') }}
          </label>
          <Field
            name="message"
            id="message"
            as="textarea"
            rows="5"
            :placeholder="$t('contact.form.messagePlaceholder')"
            class="w-full rounded-xl bg-white border border-slate-300 p-3 placeholder-slate-400
                   focus:outline-none focus:ring-4 focus:ring-sky-200 transition-shadow duration-300 resize-y"
          />
          <ErrorMessage name="message" class="text-red-500 mt-1 text-sm"/>
        </div>

        <!-- reCAPTCHA -->
        <div class="mb-6 flex justify-center">
          <div ref="recaptchaEl" id="recaptcha-el"></div>
        </div>

        <button
          :disabled="loading || !recaptchaVerified"
          type="submit"
          class="w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-3
                 bg-gradient-to-r from-sky-500 via-indigo-600 to-fuchsia-600 shadow-md
                 hover:shadow-lg hover:brightness-110 active:scale-95 transition-all
                 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">{{ $t('contact.form.send') }}</span>
          <svg v-else class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        </button>

        <p v-if="successMessage" class="mt-6 text-green-600 font-semibold text-center tracking-wide text-sm">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="mt-6 text-red-600 font-semibold text-center tracking-wide text-sm">
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

export default {
  name: 'Contact',
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      loading: false,
      successMessage: '',
      errorMessage: '',
      recaptchaVerified: false,
      recaptchaToken: '',
      recaptchaWidgetId: null,
      schema: yup.object({
        name: yup.string().required('El nombre es obligatorio'),
        email: yup.string().email('Correo no válido').required('El correo es obligatorio'),
        message: yup.string().min(10, 'El mensaje es muy corto').required('Mensaje obligatorio'),
      }),
    }
  },
  mounted() {
    window.onRecaptchaLoaded = () => {
      this.renderRecaptcha()
    }
    if (window.grecaptcha && window.grecaptcha.render) {
      this.renderRecaptcha()
    }
  },
  methods: {
    renderRecaptcha() {
      if (!this.$refs.recaptchaEl || !window.grecaptcha || this.recaptchaWidgetId !== null) return

      this.recaptchaWidgetId = window.grecaptcha.render(this.$refs.recaptchaEl, {
        sitekey: '6LeNZrMrAAAAAEQtrNLr0JYnfZEsUItmZa7OkxEC', // tu sitekey v2
        theme: 'light', // <-- claro para el nuevo diseño
        size: 'normal',
        callback: (token) => {
          this.recaptchaVerified = true
          this.recaptchaToken = token
          this.errorMessage = ''
        },
        'expired-callback': () => {
          this.recaptchaVerified = false
          this.recaptchaToken = ''
        },
        'error-callback': () => {
          this.recaptchaVerified = false
          this.recaptchaToken = ''
          this.errorMessage = 'No se pudo cargar reCAPTCHA. Recarga la página.'
        },
      })
    },
    handleSubmit(values) {
      if (!this.recaptchaVerified || !this.recaptchaToken) {
        this.errorMessage = 'Por favor, verifica que no eres un robot.'
        return
      }

      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''

      const serviceID = 'service_f9zpqqe'
      const templateID = 'template_agt7jhy'
      const publicKey = 'ZmO-eXR_fMYjtNjHO'

      const time = new Date().toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      })

      const templateParams = {
        name: values.name,
        email: values.email,
        message: values.message,
        time,
        reply_to: values.email,
        subject: `Nuevo mensaje desde mi portfolio — ${values.name}`,
        'g-recaptcha-response': this.recaptchaToken,
      }

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then(() => {
          this.loading = false
          this.successMessage = 'Mensaje enviado con éxito. ¡Gracias!'
          if (this.recaptchaWidgetId !== null) {
            window.grecaptcha.reset(this.recaptchaWidgetId)
          }
          this.recaptchaVerified = false
          this.recaptchaToken = ''
        })
        .catch((err) => {
          console.error('EmailJS error:', err)
          this.loading = false
          this.errorMessage = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
          if (this.recaptchaWidgetId !== null) {
            window.grecaptcha.reset(this.recaptchaWidgetId)
          }
          this.recaptchaVerified = false
          this.recaptchaToken = ''
        })
    },
  },
}
</script>

<style scoped>
button span, button svg { display: inline-block; }
</style>
