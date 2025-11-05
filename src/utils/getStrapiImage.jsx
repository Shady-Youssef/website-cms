// utils/getStrapiImage.js
export default function getStrapiImage(imageArray, size = "medium") {
  if (!Array.isArray(imageArray) || !imageArray.length) return null;

  const image = imageArray[0];
  const formats = image.formats || {};
  const selected = formats[size] || formats.medium || formats.large || null;

  return selected?.url || image.url || null;
}
