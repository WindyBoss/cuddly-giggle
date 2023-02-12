import Joi from 'joi';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const refs = {
  nameInput: document.querySelector('.form-input-name'),
  emailInput: document.querySelector('.form-input-email'),
  topicInput: document.querySelector('.form-input-topic'),
  messageInput: document.querySelector('.form-input-message'),
  formBtn: document.querySelector('.form-btn'),
  form: document.querySelector('.form'),
  mailToBtn: document.querySelector('.contact-email-icon'),
};

refs.form.addEventListener('submit', handleForm);

async function handleForm(uEvent) {
  uEvent.preventDefault();

  const formData = {
    username: refs.nameInput.value.trim(),
    email: refs.emailInput.value.trim(),
    topic: refs.topicInput.value.trim(),
    message: refs.messageInput.value.trim(),
  };

  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'eu', 'gov', 'org'] },
      })
      .required(),
    topic: Joi.string().alphanum().min(1).max(60).required(),
    message: Joi.string().alphanum().min(1).max(5000),
  });

  const validationResult = schema.validate(formData);

  if (validationResult.error) {
    return Swal.fire({
      title: 'Błąd!',
      text: 'Wypejnij, proszę, wszystkie pola formularzu',
      icon: 'error',
      confirmButtonText: 'Ok!',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  refs.nameInput.value = '';
  refs.emailInput.value = '';
  refs.topicInput.value = '';
  refs.messageInput.value = '';

  await sendData(this, formData);
}

async function sendData(data, formData) {
  try {
    await emailjs.sendForm('service_ngea7du', 'template_hlng49b', data, 'OiuvS6AKnSnpouYza');
    Swal.fire(`Dziękujemy ${formData.username}!`, 'Formularz został wysłany');
  } catch (error) {
    Swal.fire({
      title: 'Błąd!',
      text: `Coś poszło nie tak, prosimy skontaktować się z nami przez telefon.
        Bardzo przepraszamy za dyskomfort`,
      icon: 'error',
      confirmButtonText: 'Ok!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

refs.mailToBtn.addEventListener('click', handleMailTo);

function handleMailTo() {
  var link = 'mailto:polaczkropkibiuro@gmail.com';
  window.location.href = link;
}
