import React, { useState } from "react";
import PostURL from "../utilities/PostURL";

export default function Page({ videoDownloader }) {
  const [sourceURL, setSourceURL] = useState("");
  const [webhookURL, setWebhookURL] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let postURL = new PostURL(sourceURL);

    try {
      await videoDownloader.downloadPostVideo(postURL);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="App">
      <h2>Video Fetcher</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Video Source URL:
          <input
            type="text"
            value={sourceURL}
            onChange={(e) => setSourceURL(e.target.value)}
            required
          />
        </label>
        <label>
          Discord Webhook URL:
          <input
            type="text"
            value={webhookURL}
            onChange={(e) => setWebhookURL(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send to Discord</button>
      </form>
    </div>
  );
}
