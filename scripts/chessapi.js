class chessApi extends HTMLElement {
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

function begin() {
    document.getElementById("game-scene").style.visibility = "visible"
}



customElements.define("writing-post", chessApi)