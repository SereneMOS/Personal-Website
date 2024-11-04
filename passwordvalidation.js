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
        attempt.style.width = "10%";
    }
}
customElements.define("password-validation", passwordValidation)