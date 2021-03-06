/**
 * Mandatory Hello World function.
 * @returns A string which contains "Hello world!"
 */
export const helloWorld = (): string => {
  return 'Hello world!';
};

const si = require('systeminformation');

/**si.cpu()
    .then(data => console.log(data))
    .catch(error => console.error(error)); */
    

type MyReturnTypeItem = {
      cpu: string[];
      system: string[];
      mem: string[];
      os: string[];
      currentLoad: string[];
      processes: string[];
      diskLayout: string[];
      networkInterfaces: string[];
  }
  
  type MyReturnType = {
      [name: string]: MyReturnTypeItem;
  }
  
  export async function formaterDonnees(): Promise<MyReturnType> {
      var json = {
          ISystemInformation: {
              "cpu": [],
              "system": [],
              "mem": [],
              "os": [],
              "currentLoad": [],
              "processes": [],
              "diskLayout": [],
              "networkInterfaces": []
          }
      };
  
      // put new variables in JSON (not real values below)
      json.ISystemInformation.cpu = await si.cpu();
      json.ISystemInformation.system = await si.system();
      json.ISystemInformation.mem = await si.mem();
      json.ISystemInformation.os = await si.osInfo();
      json.ISystemInformation.currentLoad = await si.currentLoad();
      json.ISystemInformation.processes = await si.processes();
      json.ISystemInformation.diskLayout = await si.diskLayout();
      json.ISystemInformation.networkInterfaces = await si.networkInterfaces();
  
      return json;
  
  };

  /** console.log(formaterDonnees().then(data => console.log(typeof data)))

*/

  import { createServer, IncomingMessage, ServerResponse } from 'http';
 export function serve() {
  const port = (process.env.PORT || 5000);
   
  const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    switch (request.url) {
      case '/api/v1/sysinfo': {
        if (request.method === 'GET') {
            let stringRes: string = "rien";
            response.writeHead(200 , {"Content-type": "application/json"});
            formaterDonnees().then(data => response.end(JSON.stringify(data)));
        }
        break;
      }
      default: {
        response.statusCode = 404;
        response.end("Erreur 404 du test ! ouais");

      }
    }
  });

  server.listen(port); 
console.log("running")};



if (require.main === module) {
  serve();
}