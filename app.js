const express = require('express');
const cors = require('cors');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/api/quotes/random', (req, res) => {
  res.send({
    quote: getRandomElement(quotes)
  });
});

app.get('/api/quotes', (req, res) => {
  const person = req.query.person;
  if (person) {
    const quotesByPerson = quotes.filter(quote => quote.person.toLowerCase() === person.toLowerCase());
    if (quotesByPerson.length > 0) {
      res.send({
        quotes: quotesByPerson
      });
    } else {
      res.status(404).send({
        error: `No quotes found for person: ${person}`
      });
    }
  } else {
    res.send({
      quotes: quotes
    });
  }
}); 

app.post('/api/quotes', (req, res) => {
  const newquote = req.query;
  if (newquote.quote && newquote.person) {
    quotes.push(newquote);
    res.status(201).send({
      quote: newquote
    }); 
  } else {
    res.status(400).send({
      error: 'Request body must contain quote and person'
    });

  }
});

app.put('/api/quotes', (req, res) => {
  const updatedQuote = req.query;
  if (updatedQuote.quote && updatedQuote.person) {
    const index = quotes.findIndex(quote => quote.quote === updatedQuote.quote);
    if (index !== -1) {
      quotes[index] = updatedQuote;
      res.send({
        quote: updatedQuote
      });
    } else {
      res.status(404).send({
        error: 'Quote not found'
      });
    }
  } else {
    res.status(400).send({
      error: 'Request body must contain quote and person'
    });
  }
});

app.delete('/api/quotes', (req, res) => {
  const quoteToDelete = req.query.quote;
  if (quoteToDelete) {
    const index = quotes.findIndex(quote => quote.quote === quoteToDelete);
    if (index !== -1) {
      quotes.splice(index, 1);
      res.send({
        message: 'Quote deleted successfully'
      });
    } else {
      res.status(404).send({
        error: 'Quote not found'
      });
    }
  } else {
    res.status(400).send({
      error: 'Request body must contain quote'
    });
  }
}); 



module.exports = app;