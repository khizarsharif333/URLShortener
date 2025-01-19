const backendBaseUrl = 'http://localhost:8080'; // Update with your backend URL

// Shorten URL Functionality
document.getElementById('shortenButton').addEventListener('click', async () => {
  const longUrl = document.getElementById('longUrlInput').value;
  const statusMessage = document.getElementById('statusMessage');
  const shortUrlSection = document.getElementById('shortUrlSection');
  const shortUrlInput = document.getElementById('shortUrlInput');
  const copiedMessage = document.getElementById('copiedMessage');
  
  // Reset previous messages
  statusMessage.textContent = '';
  shortUrlSection.classList.add('hidden');
  copiedMessage.classList.add('hidden');

  if (!longUrl) {
    statusMessage.textContent = "Please enter a valid URL.";
    return;
  }

  try {
    const response = await fetch(`${backendBaseUrl}/shorten?longUrl=${encodeURIComponent(longUrl)}`, {
      method: 'POST'
    });

    if (response.ok) {
      const shortUrl = await response.text();
      shortUrlInput.value = `${backendBaseUrl}/${shortUrl}`;
      shortUrlSection.classList.remove('hidden');
    } else {
      statusMessage.textContent = "Error: Could not shorten URL.";
    }
  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Error: Unable to connect to the server.";
  }
});

// Copy Shortened URL Functionality
document.getElementById('copyButton').addEventListener('click', () => {
  const shortUrlInput = document.getElementById('shortUrlInput');
  const copiedMessage = document.getElementById('copiedMessage');

  shortUrlInput.select();
  shortUrlInput.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(shortUrlInput.value).then(() => {
    copiedMessage.classList.remove('hidden');
  }).catch(err => {
    console.error(err);
    copiedMessage.textContent = "Failed to copy URL.";
    copiedMessage.classList.remove('hidden');
    copiedMessage.style.color = "red";
  });
});
