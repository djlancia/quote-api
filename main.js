const app = require("./app.js");

// designate which PORT the server will listen on
const PORT = 'https://quote-api-puce.vercel.app/api/' || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
}); // start the server and have it listen on the designated PORT