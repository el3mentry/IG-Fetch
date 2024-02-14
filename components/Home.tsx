"use client";

import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import PostURL from "../utils/classes/PostURL";
import IFormValidator from "../utils/interfaces/IFormValidator";
import FormValidator from "../utils/classes/FormValidator";
import { VIDEO_API_URL } from "../utils/constants";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { DownloadFileInfo } from "../utils/types";

export default function Home() {
  const [sourceUrl, setSourceUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [autoSave, setAutoSave] = useState(false);
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [scrapedPostUrl, setScrapedPostUrl] = useState("");
  const formValidator: IFormValidator = new FormValidator();

  useEffect(() => {
    const postRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

    const reelRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

    if (!postRegex.test(sourceUrl) && !reelRegex.test(sourceUrl)) {
      return;
    } else {
      handleSubmit(sourceUrl);
    }
  }, [sourceUrl]);

  async function handleSubmit(sourceUrl: string) {
    let postURL = new PostURL(sourceUrl);

    const inputError = formValidator.isValidFormInput(postURL);

    if (inputError) {
      throw new Error(inputError);
    }

    try {
      const response = await fetch(VIDEO_API_URL + "?url=" + postURL.url);
      const scrapedData: DownloadFileInfo = await response.json();
      console.log(scrapedData);
      setScrapedPostUrl(scrapedData.videoURL);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  
  return (
    <div className="sm:p-4 lg:p-2 flex w-[100%] h-[100%] flex-col items-center justify-evenly flex-shrink flex-grow bg-transparent">
      <div className="flex w-[100%] flex-row max-w-[1980px] items-center justify-center flex-wrap p-4 flex-shrink flex-grow">
        <LeftSection sourceUrl={sourceUrl} setSourceUrl={setSourceUrl} />
        <RightSection scrapedPostUrl={scrapedPostUrl}/>
      </div>

      <div className="no-background mx-0 my-0 flex-shrink flex-grow">
        <button
          className="button rounded-border-18 hover:shadow text-customSm text-semiTransparentWhite"
          type="button"
        >
          compress video
        </button>
      </div>
    </div>
  );
}
