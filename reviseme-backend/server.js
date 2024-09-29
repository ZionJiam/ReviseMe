const express = require('express');
const app = express();
const port = process.env.PORT || 5002;

// Sample API route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
