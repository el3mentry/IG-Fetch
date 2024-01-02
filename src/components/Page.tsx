import React, { useState } from "react";
import PostURL from "../utilities/classes/PostURL";
import IVideoDownloader from "../utilities/interfaces/IVideoDownloader";
import IFormValidator from "../utilities/interfaces/IFormValidator";

type PropType = {
  videoDownloader: IVideoDownloader;
  formValidator: IFormValidator;
};

export default function Page(props: PropType) {
  const { videoDownloader, formValidator } = props;

  const [sourceURL, setSourceURL] = useState("");
  const [webhookURL, setWebhookURL] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let postURL = new PostURL(sourceURL);

    const inputError = formValidator.isValidFormInput(postURL);

    if (inputError) {
      throw new Error(inputError);
    }

    try {
      await videoDownloader.downloadPostVideo(postURL);
    } catch (error: any) {
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
