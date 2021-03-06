const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./app');

const normalizePort = val => {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val; //named pipe
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || 4404);// port injected in env variables or 3000 as default
app.set('port', port);

const server = http.createServer(app);

server.on("error", onError);
server.on("listening", onListening);
server.listen(4404, '172.168.100.218');
