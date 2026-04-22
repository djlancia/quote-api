const deleteButton = document.getElementById('delete-quote');
const deleteQuoteContainer = document.getElementById('delete-quote-container');

deleteButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  fetch(`https://quote-api-puce.vercel.app/api/quotes?quote=${quote}&person=${person}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then((data) => {
    // Check if 'data.quote' exists, or if 'data' itself is the quote object
    const quoteData = data.quote || data; 
    
    if (!quoteData || !quoteData.quote) {
      console.error('Unexpected API response structure:', data);
      return;
    }

    const deletedQuote = document.createElement('div');
    deletedQuote.innerHTML = `
    <h3>Quote deleted successfully!</h3>
    
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
    document.getElementById('delete-quote-container').appendChild(deletedQuote);
  })
  .catch(err => console.error('Delete failed:', err));
}); 