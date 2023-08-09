const express = require('express');
const numbersRouter = require('./routes/numbers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/numbers', numbersRouter);

app.listen(PORT, () => {
  console.log(`Number Microservice is running on port ${PORT}`);
});