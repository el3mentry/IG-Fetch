"use client";

import React, { useState } from "react";
import "../styles/globals.css";
import PostURL from "../utils/classes/PostURL";
import IFormValidator from "../utils/interfaces/IFormValidator";
import FormValidator from "../utils/classes/FormValidator";
import { VIDEO_API_URL } from "../utils/constants";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

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
    <div className="container p-4 m-auto flex w-[100%] flex-col items-center justify-evenly flex-shrink flex-grow bg-transparent">
      <div className="flex w-[100%] flex-row max-w-[1980px] items-center justify-center flex-wrap p-4 m-auto flex-shrink flex-grow">
        <LeftSection sourceUrl={sourceUrl} setSourceUrl={setSourceUrl} />
        <RightSection />
      </div>

      <div className="no-background ml-0 mr-0 pl-0 pr-0 flex-shrink flex-grow">
        <button className="button rounded-border-18" type="button">
          Compress video
        </button>
      </div>
    </div>
  );
}
