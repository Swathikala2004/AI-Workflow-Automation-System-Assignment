const axios = require("axios");

const extractStructuredData = async (text) => {
  try {
    const prompt = `
You are an expert OCR data extraction system.

The OCR text comes from handwritten manufacturing production sheets.

Extract the following fields:

- date
- shift (I, II, III)
- employeeNumber
- operationCode
- machineNumber
- workOrderNumber
- quantityProduced
- timeTaken

Rules:
1. Return ONLY valid JSON.
2. Do NOT use markdown.
3. Do NOT use \`\`\`.
4. If a value is missing, return "".
5. quantityProduced and timeTaken must be numbers.
6. Preserve values exactly as seen.
7. machineNumber may be values like:
   MC-720
   MC-730
   MC-840
   MC-850
   ABC-T30

Expected Output:

{
  "date": "",
  "shift": "",
  "employeeNumber": "",
  "operationCode": "",
  "machineNumber": "",
  "workOrderNumber": "",
  "quantityProduced": 0,
  "timeTaken": 0
}

OCR TEXT:
${text}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content =
      response.data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error(
        "No response received from AI"
      );
    }

    return content.trim();
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    throw new Error(
      "AI extraction failed"
    );
  }
};

module.exports = {
  extractStructuredData,
};