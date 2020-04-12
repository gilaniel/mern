const express = require('express');
const congig = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));

const PORT = congig.get('port');


async function start() {
  try {
    await mongoose.connect(congig.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`run on ${PORT}`));

  } catch(e) {
    console.log('server error', e.message);
    process.exit({code:1});
  }
}

start();
