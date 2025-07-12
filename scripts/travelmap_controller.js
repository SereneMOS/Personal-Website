
/*
class travelmap_controller extends HTMLElement {
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

function select(selectedState) {
    descriptionsDiv = document.getElementById("descriptions-div");
    descriptionsDiv.setAttribute.content = selectedState;
}*/

const fs = require('node:fs');
fs.readFile('travel_descriptions.txt', 'utf8', (err, data) => {
if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    
});