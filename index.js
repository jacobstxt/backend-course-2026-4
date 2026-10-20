import { Command } from 'commander';
import http from 'node:http';
import fs from 'node:fs';

const program = new Command();

program
  .helpOption(false)
  .requiredOption('-i, --input <path>', 'path to input JSON file')
  .requiredOption('-h, --host <host>', 'server host')
  .requiredOption('-p, --port <port>', 'server port');


program.parse(process.argv);
const { input, host, port } = program.opts();

if (!fs.existsSync(input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Server is running');
});

server.listen(Number(port), host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});