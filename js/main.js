const doc = document;
const contactUsBtn = doc.querySelector('.contacts__btn-contact');

const modalWindow = doc.querySelector('.modalWindows');
const contactsForm = doc.forms.contactsForm;
const closeFormBtn = contactsForm.querySelector('.contact-form__close-btn');


toggleModalWindow();






// functions

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
        bodyNoScroll(true);
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