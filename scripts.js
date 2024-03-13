const quoteContainer = document.getElementById('quote-container');
const moreButton = document.getElementById('more');

function fetchQuote() {
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
            const { quote, character, image } = data[0];

            const quoteElement = document.createElement('div');
            quoteElement.classList.add('quote');

            const characterImage = document.createElement('img');
            characterImage.src = image;
            characterImage.alt = character;

            const quoteText = document.createElement('p');
            quoteText.textContent = `"${quote}" - ${character}`;

            quoteElement.appendChild(characterImage);
            quoteElement.appendChild(quoteText);

            quoteContainer.innerHTML = '';
            quoteContainer.appendChild(quoteElement);
        })
        .catch(error => console.error('Error fetching quote:', error));
}

function fetchNewCharacter() {
    fetchQuote();
}

// Agregar un event listener al botón para cargar un nuevo personaje al hacer clic
moreButton.addEventListener('click', fetchNewCharacter);

// Llamar a la función para obtener una cita al cargar la página
fetchQuote();

