import express from 'express';
import * as bodyParser from 'body-parser';
import { routes } from './routes'

const app = express();

app.use(bodyParser.json());

app.use('/', routes)

app.listen(3000, () =>
    console.log(
        '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
    ),
);
