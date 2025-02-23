import { useState } from "react";
import "./index.css";
const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;


function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [copiedMessage, setCopiedMessage] = useState("");

  const handleShortenUrl = async () => {
    setStatusMessage("");
    setCopiedMessage("");
    setShortUrl("");

    if (!longUrl) {
      setStatusMessage("Please enter a valid URL.");
      return;
    }
    console.log(`Here: ${backendBaseUrl}`);

    try {
      const response = await fetch(
        `${backendBaseUrl}/shorten?longUrl=${encodeURIComponent(longUrl)}`,
        { method: "POST" }
      );

      if (response.ok) {
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

      {/* Input Section */}
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

      {/* Output Section */}
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

      {/* Messages */}
      {statusMessage && <p className="roboto-body statusMessage">{statusMessage}</p>}
      {copiedMessage && <p className="roboto-body copiedMessage">{copiedMessage}</p>}
    </div>
  );
}

export default App;
