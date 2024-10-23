document.getElementById('presenceForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Collect form data
    const clientId = document.getElementById('clientId').value;
    const details = document.getElementById('details').value;
    const state = document.getElementById('state').value;
    const largeImageKey = document.getElementById('largeImageKey').value;
    const largeImageText = document.getElementById('largeImageText').value;
    const smallImageKey = document.getElementById('smallImageKey').value;
    const smallImageText = document.getElementById('smallImageText').value;
    const button1Label = document.getElementById('button1Label').value;
    const button1Url = document.getElementById('button1Url').value;
    const button2Label = document.getElementById('button2Label').value;
    const button2Url = document.getElementById('button2Url').value;
  
    // Simulate setting the presence (In reality, you would send this to your server)
    console.log('Setting presence:', {
      clientId, details, state, largeImageKey, largeImageText, smallImageKey, smallImageText,
      button1Label, button1Url, button2Label, button2Url
    });
  
    // Redirect to success page
    window.location.href = 'success.html';
  });
  