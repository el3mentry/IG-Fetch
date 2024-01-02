export async function fetchVideoInfoAction(postUrl) {
  try {
    const videoInfo = await fetchPostJson(postUrl);
    const response = makeSuccessResponse(videoInfo);
    return response;
  } catch (error) {
    return handleError(error);
  }
}

function isValidFormInput(postUrl) {
  if (!postUrl) {
    return "Instagram URL was not provided";
  }

  if (!postUrl.includes("instagram.com/")) {
    return "Invalid URL does not contain Instagram domain";
  }

  if (!postUrl.startsWith("https://")) {
    return 'Invalid URL it should start with "https://www.instagram.com..."';
  }

  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;

  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels?\/([a-zA-Z0-9_-]+)\/?/;

  if (!postRegex.test(postUrl) && !reelRegex.test(postUrl)) {
    return "URL does not match Instagram post or reel";
  }

  return "";
}

export async function downloadPostVideo(postUrl) {
  const response = await fetchVideoInfoAction(postUrl);

  if (inputError) {
    throw new Error(inputError);
  }

  if (response.status === "error") {
    throw new ClientException(response.message);
  }

  if (!response.data) {
    throw new ClientException();
  }

  const { filename, videoUrl } = response.data;
  await downloadFile(filename, videoUrl);
}
