console.log('Client-side code running');

const button = document.getElementById('myButton');
const display = document.getElementById('lineDisplay');

// Fetch all textlines and create numbered buttons
fetch('/all-textlines')
  .then(response => response.json())
  .then(textlines => {
    // Sort by lineNumber (optional)
    textlines.sort((a, b) => a.lineNumber - b.lineNumber);

    textlines.forEach(textline => {
      const button = document.createElement('button');
      button.className = 'textline-button';
      button.textContent = `Line #${textline.lineNumber}`; // Button shows line number
      
      // Add click handler to fetch the specific line
      button.addEventListener('click', async () => {
        try {
          const response = await fetch(`/textline/${textline.lineNumber}`);
          const data = await response.json();
          document.getElementById('display').textContent = data.text;
        } catch (err) {
          console.error("Error fetching line:", err);
        }
      });
      
      buttonsContainer.appendChild(button);
    });
  })
  .catch(err => console.error("Error loading textlines:", err));