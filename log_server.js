import http from 'http';

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log("\n\n=== REACT RUNTIME ERROR ===\n");
      try {
        const data = JSON.parse(body);
        console.log("Message:", data.message);
        console.log("ComponentStack:", data.componentStack);
      } catch (e) {
        console.log("Raw body:", body);
      }
      console.log("\n===========================\n");
      res.writeHead(200);
      res.end('ok');
    });
  }
}).listen(3001, () => {
  console.log("Log server listening on port 3001...");
});
