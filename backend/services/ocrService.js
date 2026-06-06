const Tesseract = require("tesseract.js");

const extractText = async (imagePath) => {
  const result = await Tesseract.recognize(
    imagePath,
    "eng"
  );

  console.log("========== OCR TEXT ==========");
  console.log(result.data.text);
  console.log("==============================");

  return result.data.text;
};

module.exports = {
  extractText,
};