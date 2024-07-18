class writingPost extends HTMLElement {
    constructor (type, title, date, content) {
        super()
        const shadow = this.attachShadow({mode: "open"})
        this.innerHTML = "custom"
        this.type = type
        this.title = title
        this.date = date
        this.content = content
    }
    

}

const writing = document.querySelector(".writing")
var selected = 0;

function select() {
    if (selected == 0) {
        selected = 1
        writing.style.width = "100%";
        writing.style.height = "500px";
    } else {
        selected = 0;
        writing.style.width = "25%";
        writing.style.height = "250px";
    }
}

customElements.define("writing-post", writingPost)