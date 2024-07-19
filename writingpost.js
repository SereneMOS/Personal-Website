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

function select(id) {
    const post = document.querySelector(id)
    if (post.style.width == "25%") {
        post.style.width = "100%";
        post.style.height = "500px";
    } else {
        post.style.width = "25%";
        post.style.height = "250px";
    }
}

customElements.define("writing-post", writingPost)