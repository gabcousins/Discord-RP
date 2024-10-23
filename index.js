const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DiscordRPC = require('discord-rpc');

const app = express();
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files like CSS
app.use(express.static(path.join(__dirname, 'views')));

// Function to set Rich Presence
async function setRichPresence(clientId, details, state, largeImageKey, largeImageText, smallImageKey, smallImageText, button1Label, button1Url, button2Label, button2Url) {
  rpc.on('ready', () => {
    rpc.setActivity({
      details: details,
      state: state,
      largeImageKey: largeImageKey,   // Imgur URL for large image
      largeImageText: largeImageText, // Hover text for large image
      smallImageKey: smallImageKey,   // Imgur URL for small image
      smallImageText: smallImageText, // Hover text for small image
      buttons: [
        { label: button1Label, url: button1Url },  // First button
        { label: button2Label, url: button2Url }   // Second button
      ],
      startTimestamp: new Date(),  // Start time for elapsed time
      instance: false,
    });
    console.log('Rich Presence set successfully!');
  });

  await rpc.login({ clientId }).catch(console.error);
}

// Route to display the form (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission to set Rich Presence
app.post('/setPresence', (req, res) => {
  const {
    clientId, details, state, largeImageKey, largeImageText, smallImageKey, smallImageText,
    button1Label, button1Url, button2Label, button2Url
  } = req.body;

  setRichPresence(clientId, details, state, largeImageKey, largeImageText, smallImageKey, smallImageText, button1Label, button1Url, button2Label, button2Url)
    .then(() => {
      res.sendFile(path.join(__dirname, 'views', 'success.html')); // Redirect to success page
    })
    .catch(err => {
      console.error('Error setting Rich Presence:', err);
      res.status(500).send('Failed to update Rich Presence');
    });
});

// Start the server


