import express, { request, response } from 'express'
import routes from './routes/routes';
import {createConnection} from "typeorm";
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';


createConnection().then(connection => {
  const app = express();

  app.use(express.json());

  //call midlewares
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  
  app.use(routes);

  app.listen(3333);
})
.catch(error => console.log(error));

