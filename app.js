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

module.exports = app;