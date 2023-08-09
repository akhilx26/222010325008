const express = require('express');
const numbersRouter = require('./routes/numbers');

const app = express();
const PORT = 3000;

app.use('/numbers', numbersRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});