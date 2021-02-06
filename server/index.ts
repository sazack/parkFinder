import * as express from 'express';
import {urlencoded, json} from 'body-parser';
import * as http from 'http';
import {myRouter} from './routes';

class NodeApp {
  Express: express.Express;
  server: http.Server;
  init() {
    this.Express = express();
    const port = '8088';
    this.Express.use(urlencoded({extended: false}));
    this.Express.use(express.static(process.cwd()+"/dist/parkFinder/"));
    this.server = http.createServer(this.Express);
    this.server.listen(port, async () => {
      console.log('Node Server Listening on Port: ' + port);
    });
    this.Express.use('/api', myRouter );

    this.Express.use('/', (req,res) => {
      res.sendFile(process.cwd()+"/dist/parkFinder/index.html")
    });
  }
}

export const nodeApp = new NodeApp();
nodeApp.init();
