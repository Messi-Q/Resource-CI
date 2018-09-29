import express from 'express';
import bodyParser from 'body-parser';
import register from './routes/register';
import login from './routes/login';
import resource from './routes/myResource';
import myResource from './routes/myResource1';
import resources from './routes/locationResource';
import download from './routes/download';
import upload from './routes/upload';
import allUpload from './routes/allUpload';
import recharge from './routes/recharge';
import users from './routes/users';
import owner from './routes/owner';
import owner1 from './routes/owner1';
import updateBuyer from './routes/updateBuyer';
import path from 'path';
import buy from './routes/buy';
import buy1 from './routes/buy1';
import buyer from './routes/buyer';


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
app.use('/api/buyResources', buy);
app.use('/api/buyResource', buy1);
app.use('/api/buyerResource', buyer);
app.use('/api/localUser', recharge);
app.use('/api/users', users);
app.use('/api/owner', owner);
app.use('/api/fetchOwnerId', owner1);
app.use('/api/updateBuyer', updateBuyer);

app.listen(6060, () => console.log('Running on localhost:6060'));
