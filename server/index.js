import express from 'express';
import register from './routes/register';
import login from './routes/login';
import resource from './routes/resource';
import bodyParser from 'body-parser';
import upload from './routes/upload';
import path from 'path';

let app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'FileUpload')));

app.get('/', (req, res) => {
    res.send('hello!!!')
});

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/resources', resource);
app.use('/api/upload', upload);

app.listen(6060, () => console.log('Running on localhost:6060'));
