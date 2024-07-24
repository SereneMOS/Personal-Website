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
    const post = document.querySelector(id);
    if (post.style.width == "25%") {
        post.style.width = "100%";
        post.style.height = "500px";
    } else {
        post.style.width = "25%";
        post.style.height = "250px";
    }
}

function filter(type) {
    var i, x;
    x = document.getElementsByClassName("post");

    for (i = 0; i < x.length; i++) {
        var m = x[i];
        var p = m.className.split(" ");
        if (p[1] == type) {
            m.style.display = "initial";
        } else {
            m.style.display = "none";
        }
    }
}

customElements.define("writing-post", writingPost)