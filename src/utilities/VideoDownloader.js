export default class VideoDownloader {
  async downloadPostVideo(postURL) {
    const response = await fetchVideoInfoAction(postURL);

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
}
