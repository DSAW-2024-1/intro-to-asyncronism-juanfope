const quoteContainer = document.getElementById('quote-container');
const moreButton = document.getElementById('more');
const characterFilterInput = document.getElementById('character-filter');
let shownCharacters = new Set();

function fetchQuotes(characterName = '') {
    let apiUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=8';
    if (characterName !== '') {
        apiUrl += `&character=${encodeURIComponent(characterName)}`;
        shownCharacters.clear();
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            quoteContainer.innerHTML = '';

            data.forEach(quoteData => {
                const { quote, character, image } = quoteData;

                if (!shownCharacters.has(character)) {
                    const quoteElement = document.createElement('div');
                    quoteElement.classList.add('quote');

                    const characterImage = document.createElement('img');
                    characterImage.src = image;
                    characterImage.alt = character;

                    const quoteText = document.createElement('p');
                    quoteText.textContent = `"${quote}" - ${character}`;

                    quoteElement.appendChild(characterImage);
                    quoteElement.appendChild(quoteText);

                    quoteContainer.appendChild(quoteElement);

                    shownCharacters.add(character);
                }
            });
        })
        .catch(error => console.error('Error fetching quotes:', error));
}

function handleFilterChange() {
    const characterName = characterFilterInput.value.trim();
    fetchQuotes(characterName);
}

moreButton.addEventListener('click', () => fetchQuotes(characterFilterInput.value.trim()));
characterFilterInput.addEventListener('input', handleFilterChange);

fetchQuotes();
