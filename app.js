//punto de entrada de todo nuestro servidor
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const authRouter = require('./auth/auth.route').router;
const teamsRouter = require('./teams/teams.router').router;

const port = 3000;

app.use(bodyParser.json());

//Routes
app.use('/auth', authRouter);
app.use('/teams', teamsRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hola mundo');
});

app.listen(port, () => {
  console.log('Server started at port: ', port);
});

exports.app = app;
