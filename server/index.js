import express from 'express';
import register from './routes/register';
import login from './routes/login';
import resource from './routes/myResource';
import myResource from './routes/myResource1';
import resources from './routes/locationResource';
import download from './routes/download';
import bodyParser from 'body-parser';
import upload from './routes/upload';
import allUpload from './routes/allUpload';
import recharge from './routes/recharge';
import users from './routes/users';
import path from 'path';
import test from './routes/test';


let app = express();
app.use(bodyParser.json());
app.use('/api/download', express.static(path.join(__dirname, 'download')));

app.get('/', (req, res) => {
    res.send('hello!!!')
});

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/upload', upload);
app.use('/api/myResources', resource);
app.use('/api/myResource', myResource);
app.use('/api/locationResources', resources);
app.use('/api/allUpload', allUpload);
app.use('/api/download', download);
app.use('/api/tesResources', test);
app.use('/api/user', recharge);
app.use('/api/users', users);

app.listen(6060, () => console.log('Running on localhost:6060'));
