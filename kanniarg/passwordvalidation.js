class passwordValidation extends HTMLElement {
    constructor (password) {
        super()
        this.password == password;
    }
}

function validate1() {
    const attempt = document.getElementById('password');
    const correctPassword = 'hi';
    if (attempt.value == correctPassword) {
        const content = document.getElementById('veil');
        content.style.contentVisibility = "visible";
    } else {
        attempt.style.backgroundColor = "red";
    }
}
function validate2() {
    const attempt = document.getElementById('password');
    const correctPassword = 'what#the#freak';
    if (attempt.value == correctPassword) {
        const content = document.getElementById('veil');
        content.style.contentVisibility = "visible";
    } else {
        attempt.style.backgroundColor = "red";
    }
}
customElements.define("password-validation", passwordValidation)