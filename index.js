const scaleFactor = 1 / 20;

function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;

  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`
  }
}

function toggleContrast() {
  document.body.classList.toggle('dark-theme');
}

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

    await emailjs.sendForm('service_0yh5wdr', 'template_d6v1pkw', form);
    form.reset();
    success.classList.add('modal__overlay--visible');
  } catch (error) {
    console.error('Failed to send contact form:', error);
    status.textContent = 'Your message could not be sent. Please try again later or email me directly at ..@...com .';
  } finally {
    loading.classList.remove('modal__overlay--visible');
    submitButton.disabled = false;
  }
}

function toggleModal() {
  document.body.classList.toggle('modal--open');
}