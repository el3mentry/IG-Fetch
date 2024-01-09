"use client";

import React, { useState } from "react";
import "../../styles/globals.css";
import PostURL from "../utils/classes/PostURL";
import IPostDownloader from "../utils/interfaces/IPostDownloader";
import IFormValidator from "../utils/interfaces/IFormValidator";
import IDownloaderService from "../utils/interfaces/IDownloaderService";
import PostDownloader from "../utils/classes/PostDownloader";
import FormValidator from "../utils/classes/FormValidator";
import serviceExporter from "../utils/actions/serviceExporter";
import DownloaderService from "../lib/services/DownloaderService";

export default function Home() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [autoSave, setAutoSave] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(null);

  const postDownloader: IPostDownloader = new PostDownloader();
  const formValidator: IFormValidator = new FormValidator();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let postURL = new PostURL(sourceUrl);
    const downloaderService: IDownloaderService = await serviceExporter(
      DownloaderService
    );

    const inputError = formValidator.isValidFormInput(postURL);

    if (inputError) {
      throw new Error(inputError);
    }

    try {
      let fileInfo = await postDownloader.downloadPostVideo(
        postURL,
        downloaderService
      );
      console.log(fileInfo);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => setSourceUrl(text))
      .catch((err) =>
        console.error("Failed to read clipboard contents: ", err)
      );
  };

  const handleClear = () => {
    setSourceUrl("");
  };

  const handleSave = () => {
    // Implement your save functionality here
  };

  const handleToggle = () => {
    setAutoSave(!autoSave);
  };

  const handlePlay = () => {
    // Implement your play functionality here
  };

  const handleClose = () => {
    setVideoPlayer(null);
  };

  return (
    <div className="App">
      <h2>Video Fetcher</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Video Source URL:
          <input
            type="text"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            required
          />
          <button type="button" onClick={handlePaste}>
            Paste
          </button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </label>
        <label>
          Auto-save:
          <input type="checkbox" checked={autoSave} onChange={handleToggle} />
        </label>
        {videoPlayer && (
          <div>
            <video src={videoPlayer} controls />
            <button type="button" onClick={handleClose}>
              Close Video
            </button>
          </div>
        )}
        <label>
          File Name:
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </label>
        <label>
          Discord Webhook URL:
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post to Discord</button>
      </form>
    </div>
  );
}
