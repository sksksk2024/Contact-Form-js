document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('contactForm');
  
  const fields = [
    { id: 'first__name', errorId: 'firstNameError', validate: (value) => /^[A-Z][a-z]*$/.test(value.trim()) },
    { id: 'last__name', errorId: 'lastNameError', validate: (value) => /^[A-Z][a-z]*$/.test(value.trim()) },
    { id: 'email', errorId: 'emailError', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
    { id: 'message', errorId: 'messageError', validate: (value) => value.trim() !== '' },
    { id: 'agree', errorId: 'consentError', validate: () => document.getElementById('agree').checked },
  ];
  
  const queryError = document.getElementById('queryError');
  const successMessage = document.getElementById('successMessage');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);
      
      if (!field.validate(input.value)) {
        error.style.display = 'inline';
        isValid = false;
      } else {
        error.style.display = 'none';
      }
    });
    
    // Validate query type separately
    const querySelected = [...document.getElementsByName('option')].some(option => option.checked);
    if (!querySelected) {
      queryError.style.display = 'inline';
      isValid = false;
    } else {
      queryError.style.display = 'none';
    }
    
    // Show success message if the form is valid
    if (isValid) {
      successMessage.classList.remove('hide');
      // setTimeout(() => {
      //   successMessage.classList.add('hide');
      //   form.reset();
      // }, 3000);
    }
  });
});