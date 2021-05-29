const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; // Global variable

// Show loading spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove loading spinner
function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote(){
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]; // Quotes from localQuotes object(quotes.js)

    // Check if author field is empty or null
    authorText.textContent = (!quote.author) ? 'Unknown' : quote.author;

    // Check long quote to determine styling
    (quote.text.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    
    // Set quote and hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl); // Gets the list of strings from the apiUrl
        apiQuotes = await response.json(); // Convert the list of strings into json object and pass it to a global variable
        newQuote();
    } 
    catch(error){
        // Catch error here
        console.log(error);
    }
}

// Tweet the quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${ quoteText.textContent } - ${ authorText.textContent }`;
    window.open(twitterUrl, '_blank'); // _blank allows us to open twitter in a new tab
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();

// On load, if using localQuotes from quotes.js
// newQuote();