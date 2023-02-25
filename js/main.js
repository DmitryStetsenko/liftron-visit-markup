const doc = document;
const contactUsBtn = doc.querySelector('.contacts__btn-contact');

const modalWindow = doc.querySelector('.modalWindows');
const contactsForm = doc.forms.contactsForm;
const formData = contactsForm.formGroup.elements;

const closeFormBtn = contactsForm.querySelector('.contact-form__close-btn');


toggleModalWindow();
validateAndSendForm();


// functions

function validateAndSendForm() {
    for(let field of formData) {
        field.oninput = e => {
            e.target.style = '';
        }
    }
    
    contactsForm.onsubmit = e => {
        e.preventDefault();
        let formValid = true;

        for(let field of formData) {
            const value = field.value.trim();
            console.log(field.name);

            field.style = '';
            if (!value) {
                formValid = false;
                field.style.background = '#ffbaad';
            }
            if (field.name == 'email' && !value.includes('@')) {
                formValid = false;
                field.style.background = '#ffbaad';
            }

        }

        if (!formValid) {
            return;
        }

        successSendForm();
        setTimeout(() => {
            sendForm(contactsForm);
            clearFormFields();
            closeModalWindow();
        }, 1000);
    }
}

function successSendForm() {
    for(let field of formData) {
        field.style.background = '#adffbc';
    }
}

function clearFormFields() {
    for(let field of formData) {
        field.value = '';
        field.style = '';
    }
}

async function sendForm(form) {
    const data = new FormData(form);
    const res = await fetch('send-email.php', {
        method: 'POST',
        body: data,
    });
}

function toggleModalWindow() {
    contactUsBtn.onclick = showModalWindow;
    closeFormBtn.onclick = closeModalWindow;
}

function showModalWindow() {
    bodyNoScroll(true);
    modalWindow.classList.add('modalWindows_show');
    setTimeout(() => toggleForm(true), 100);
}

function closeModalWindow() {
    
    toggleForm(false);
    setTimeout(() => {
        modalWindow.classList.remove('modalWindows_show');
        bodyNoScroll(false);
    }, 100);
}

function toggleForm(state) {
    state 
        ? contactsForm.classList.add('contact-form_show')
        : contactsForm.classList.remove('contact-form_show');
}

function bodyNoScroll(state) {
    state 
        ? doc.body.classList.add('no-scroll')
        : doc.body.classList.remove('no-scroll');
}