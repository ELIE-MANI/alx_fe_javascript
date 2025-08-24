let quotes = loadQuotes();
if (quotes.length === 0) {
 quotes = [
  {"text":" The best way to get started is to quit talking and begin doing.", "category":"Motivation"},
  {"text":" Don't let yesterday take up too much of today.", "category":"Life"},
  {"text":" It's not whether you get knocked down, it's whether you get up.", "category":"Resilience"},
];
saveQuotes();
}

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    return JSON.parse(storedQuotes);
  }
  else {
  return [];
}
}
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

function addQuote() {ad
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert('Please enter both quote text and category.');
    return;
  }

  quotes.push({text, category});
  saveQuotes();
  
  newQuoteText.value = '';
  newQuoteCategory.value = '';

  populateCategotiries();

}
addQuoteBtn.addEventListener('click', addQuote);
const formSection = document.querySelector('.add-quote-section');

function createAddQuoteForm() {

  const section = document.createElement('div');

  const textInput = document.createElement('input');
  textInput.id = 'newQuoteText';
  textInput.type = 'text';
  textInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.id = 'addQuoteBtn';
  addButton.textContent = 'Add Quote';

  addButton.addEventListener('click', addQuote);

  section.appendChild(textInput);
  section.appendChild(categoryInput); 
  section.appendChild(addButton);
  formSection.appendChild(section);
}

createAddQuoteForm();

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // Pretty print JSON
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}



function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }

  function populateCategotiries() {
    const CategoryFilter = document.getElementById('categoryFilter');

    CategoryFilter.innerText = '<option value="all">All Categories</option>';
    const categories = [...new Set(quotes.map(quote => quote.category))];

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      CategoryFilter.appendChild(option);
    });

    const savedFilter = localStorage.getItem('selectedCategory');
    if (savedFilter) {
      CategoryFilter.value = savedFilter;
      filterQuotes();
    }

}

function filterQuotes() {
const categoryFilter = document.getElementById('categoryFilter');
const selectedCategory = categoryFilter.value;

localStorage.setItem('selectedCategory', selectedCategory);

quoteDisplay.innerHTML = '';

const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

filterQuotes.forEach(quote => renderQuotes(quote));

}

document.addEventListener('DOMContentLoaded', () => {
  populateCategotiries();
  filterQuotes();

} );