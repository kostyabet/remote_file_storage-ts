import http from 'http';
import { FileRead } from './file';

const PORT = 3000;
const DIRECTORY_PATH = "./uploads/"

http.createServer(async (request, response) => {
  const url = new URL(request.url || "", `http://${request.headers.host}`);
  const fileReader = new FileRead();
  const fileName = DIRECTORY_PATH + url.searchParams.get("fileName");
  const currentMethod = url.pathname + request.method;
  console.log(new Date().toISOString(), ":\t", request.method, '->', url.href);
  fileReader.ensureDirectoryExists(DIRECTORY_PATH).then(
    async () => {
      switch (currentMethod) {
        case ("/files" + "GET"):
          if (await fileReader.isFileExist(fileName)) {
            fileReader.readFile(fileName ?? "")
              .then((data) => {
                  response.writeHead(200, { "Content-Type": "application/json" });
                  response.end(JSON.stringify({ message: "File reading!", filePath: fileName, data: data }));
                }
              )
              .catch((error) => {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: error }));
              });
          }
          else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Bad file name!" })) 
          }
          break;
    
        case ("/files" + "PUT"):
          request.on("data", (content) => {
            fileReader.rewriteFile(fileName ?? "", content.toString())
            .then((data) => {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "File rewriting!", filePath: fileName, data: content.toString() }));
              }
            )
            .catch((error) => {
              response.writeHead(400, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: error }));
            });
          });
          break;
    
        case ("/files" + "DELETE"):
          if (await fileReader.isFileExist(fileName)) {
            fileReader.deleteFile(fileName ?? "")
              .then(() => {
                  response.writeHead(200, { "Content-Type": "application/json" });
                  response.end(JSON.stringify({ message: "File deleting!", filePath: fileName }));
                }
              )
              .catch((error) => {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: error }));
              });
          }
          else {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: "Bad file name!" })) 
          }
          break;
    
        case ("/files/copy" + "POST"):
          request.on("data", async (content) => {
            if (await fileReader.isFileExist(fileName)) {
              const newName = DIRECTORY_PATH + JSON.parse(content)?.newName;
              if (await fileReader.isFileExist(newName)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Copy file exist!" })) 
                return;
              }
              fileReader.copyFile(fileName ?? "", newName)
                .then(() => {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "File copeing!", from: fileName, to: newName }));
                  }
                )
                .catch((error) => {
                  response.writeHead(400, { "Content-Type": "application/json" });
                  response.end(JSON.stringify({ message: error }));
                });
            }
            else {
              response.writeHead(400, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: "Bad file name!" })) 
            }
          })
          break;
    
        case ("/files/move" + "POST"):
          request.on("data", async (content) => {
            if (await fileReader.isFileExist(fileName)) {
              const moveTo = DIRECTORY_PATH + JSON.parse(content)?.moveTo;
              if (await fileReader.isFileExist(moveTo)) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Move file position already exist!" })) 
                return;
              }
              fileReader.moveFile(fileName ?? "", moveTo)
                .then(() => {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "File moving!", from: fileName, to: moveTo }));
                  }
                )
                .catch((error) => {
                  response.writeHead(400, { "Content-Type": "application/json" });
                  response.end(JSON.stringify({ message: error }));
                });
            }
            else {
              response.writeHead(400, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: "Bad file name!" })) 
            }
          })
          break;

      default:
        response.writeHead(400, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Bad request" }))
        break;
      }
    }
  );
}).listen(PORT, () => console.log("Server started!"));