
const quotes = [
  {"text":" The best way to get started is to quit talking and begin doing.", "category":"Motivation"},
  {"text":" Don't let yesterday take up too much of today.", "category":"Life"},
  {"text":" It's not whether you get knocked down, it's whether you get up.", "category":"Resilience"},
];

const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

function renderQuotes(quote) {
  quoteDisplay.innerHTML = '';

  //for quote text
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = quote.text

  //for quote category
const cite = document.createElement('cite');
  cite.textContent = `- ${quote.category}`;
  
  quoteDisplay.appendChild(blockquote);
  quoteDisplay.appendChild(cite);


}

renderQuotes(quotes[1]);

function showRandomQuote() {
  const randomindex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomindex];
  renderQuotes(randomQuote);
  

}

newQuoteBtn.addEventListener('click', showRandomQuote);

const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteBtn = document.getElementById('addQuoteBtn');

function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert('Please enter both quote text and category.');
    return;
  }

  quotes.push({text, category});
  newQuoteText.value = '';
  newQuoteCategory.value = '';

  
}
addQuoteBtn.addEventListener('click', addQuote);