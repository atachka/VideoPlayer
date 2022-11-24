export function isValidVideoUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.setAttribute("src", url);
    video.addEventListener("canplay", function () {
      resolve(true);
    });
    video.addEventListener("error", function () {
      resolve(false);
    });
  });
}

export function getNameFromURL(url: string): string {
  const name = url.substring(url.lastIndexOf("/") + 1, url.length - 4);
  return name;
}
