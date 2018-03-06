const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '/build_prod')));

app.set('port', process.env.PORT || 3000);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build_prod/index.html'));
});

app.listen(app.get('port'));
