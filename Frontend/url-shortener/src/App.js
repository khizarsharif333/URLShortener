import { useEffect, useState } from "react";

function App() {
  const [backendBaseUrl, setBackendBaseUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");

  useEffect(() => {
    setBackendBaseUrl(process.env.REACT_APP_BACKEND_URL);
  }, []);

  const handleShortenUrl = async () => {
    setStatusMessage("Please wait a moment...");
    setCopiedMessage("");
    setShortUrl("");

    if (!longUrl.trim()) {
      setStatusMessage("Please enter a valid URL.");
      return;
    }

    try {
      const response = await fetch(
        `${backendBaseUrl}/shorten?longUrl=${encodeURIComponent(longUrl)}`,
        { method: "POST" }
      );

      if (response.ok) {
        setStatusMessage("");
        const shortUrl = await response.text();
        setShortUrl(`${backendBaseUrl}/${shortUrl}`);
      } else {
        setStatusMessage("Error: Could not shorten URL.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Error: Unable to connect to the server.");
    }
  };


  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => setCopiedMessage("Copied to clipboard!"))
      .catch((err) => {
        console.error(err);
        setCopiedMessage("Failed to copy URL.");
      });
  };

  return (
    <div className="container">
      <h1 className="montserrat-heading">URL Shortener</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your long URL"
          className="input-field roboto-body"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button className="btn roboto-body" onClick={handleShortenUrl}>
          Shorten
        </button>
      </div>

      {shortUrl && (
        <div className="output-section">
          <input
            type="text"
            className="input-field roboto-body"
            value={shortUrl}
            readOnly
          />
          <button className="btn roboto-body" onClick={handleCopy}>
            Copy
          </button>
        </div>
      )}

      {statusMessage && <p className="roboto-body statusMessage">{statusMessage}</p>}
      {copiedMessage && <p className="roboto-body copiedMessage">{copiedMessage}</p>}
    </div>
  );
}

export default App;
