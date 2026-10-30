const EMAILJS_SERVICE_ID = 'service_0yh5wdr';
const EMAILJS_TEMPLATE_ID = 'template_d6v1pkw';

async function contact(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const loading = document.querySelector('.modal__overlay--loading');
  const success = document.querySelector('.modal__overlay--success');
  const status = document.querySelector('.form__status');
  const submitButton = form.querySelector('#contact__submit');

  if (!loading || !success || !status || !submitButton) {
    console.error('Contact form status elements are missing.');
    return;
  }

  status.textContent = '';
  loading.classList.add('modal__overlay--visible');
  submitButton.disabled = true;

  try {
    if (!window.emailjs) {
      throw new Error('EmailJS did not load.');
    }

    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    form.reset();
    success.classList.add('modal__overlay--visible');
  } catch (error) {
    console.error('Failed to send contact form:', error);
    status.textContent = 'Sorry, your message could not be sent. Please try again later or email me directly.';
  } finally {
    loading.classList.remove('modal__overlay--visible');
    submitButton.disabled = false;
  }
}
