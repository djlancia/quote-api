const deleteButton = document.getElementById('delete-quote');

deleteButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  fetch(`https://quote-api-puce.vercel.app/api/quotes?quote=${quote}&person=${person}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(({quote}) => {
    const deletedQuote = document.createElement('div');
    deletedQuote.innerHTML = `
    <h3>Quote deleted successfully!</h3>
    
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(deletedQuote);
  });
});
