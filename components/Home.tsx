"use client";

import React, { useState } from "react";
import "../styles/globals.css";
import PostURL from "../utils/classes/PostURL";
import IFormValidator from "../utils/interfaces/IFormValidator";
import FormValidator from "../utils/classes/FormValidator";
import { VIDEO_API_URL } from "../utils/constants";

export default function Home() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [autoSave, setAutoSave] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(null);

  const formValidator: IFormValidator = new FormValidator();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let postURL = new PostURL(sourceUrl);

    const inputError = formValidator.isValidFormInput(postURL);

    if (inputError) {
      throw new Error(inputError);
    }

    try {
      const response = await fetch(VIDEO_API_URL + "?url=" + postURL.url);
      const scrapedData = await response.json();
      console.log(scrapedData);
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
    throw new Error("Not implemented yet.");
  };

  const handleSaveAs = () => {
    throw new Error("Not implemented yet.");
  };

  const handleToggle = () => {
    setAutoSave(!autoSave);
  };

  const handlePlay = () => {
    throw new Error("Not implemented yet.");
  };

  const handleClose = () => {
    setVideoPlayer(null);
  };

  return (
    <div className="container">

      <div className="box">
        <input type="text" placeholder="reels url" className="field" />
        <button className="button" type="button">
          Clear
        </button>
        <button className="button" type="button">
          Copy
        </button>
      </div>

      <div className="box">
        <input type="text" placeholder="name of file" className="field" />
        <button className="button" type="button">
          Save
        </button>
        <button className="button" type="button">
          Save as
        </button>
      </div>

      <div className="box">
        <input
          type="text"
          placeholder="discord channel webhook url"
          className="field"
        />
        <button className="button" type="button">
          Push
        </button>
      </div>

      <div className="box">
        <input type="text" placeholder="source url" className="field" />
        <label className="switch">
          <input type="checkbox" title="switch" />
          <span className="slider round"></span>
        </label>
        <p>Autoplay media from source</p>
      </div>

      <div className="box align-items-center no-background">
        <button className="button" type="button">
          Compress video
        </button>
      </div>
      
    </div>
  );
}
