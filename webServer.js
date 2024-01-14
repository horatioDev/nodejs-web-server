const http = require('http');
const path = require('path');
const fs = require('fs');
// ----------------------------------------------------------------------------
// Create server
const server = http.createServer((req, res)  => {
  // Load files: '/'
  /*
  // if (req.url === '/about') {
  //   // // Load index.html
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //     // Handle error if reading file fails
  //     if (err) throw err;
  //     // Send a successful response with custom HTML content
  //     res.writeHead(200, {'Content-Type': 'text/html'})
  //     res.end(content);
  //   })
  // }
  // Rest API
  // if (req.url === '/api/users') {
  //   // Load users
  //   const users = [
  //     {name:"John Doe", age: 36},
  //     {name: "Ray Xavier", age: 40}
  //   ];
  //   // Write headers
  //   res.writeHead(200, {"Content-Type": "application/json"});
  //   // Return the data in JSON format
  //   res.end(JSON.stringify(users))
  // }
  */

  // Build file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension of the file
  let extname = path.extname(filePath);

  // Set initial "Content-Type"
  let contentType = 'text/html';

  // Check ext and set proper "Content-Type"
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';    
      break;
    case '.css':
      contentType = 'text/css';    
      break;
    case '.json':
      contentType = 'application/json';    
      break;
    case '.png':
      contentType = 'image/png';    
      break;
    case '.jpg':
      contentType = 'image/jpg';    
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if(err.code == 'ENOENT') {
        // Page Not Found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          // Write Headers
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(content, 'utf8')
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf8');
    }
  });
});

// Declare Port
const PORT = process.env.PORT || 5001;

// Listen for Port
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));