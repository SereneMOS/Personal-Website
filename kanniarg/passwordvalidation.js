class passwordValidation extends HTMLElement {
    constructor (password) {
        super()
        this.password == password;
    }
}

function validate() {
    const attempt = document.getElementById('password');
    const correctPassword = 'hi';
    if (attempt.value == correctPassword) {
        const fart = document.getElementById('veil');
        fart.style.contentVisibility = "visible";
    }
}
customElements.define("password-validation", passwordValidation)