require("dotenv").config();

const {
  extractStructuredData,
} = require("./services/geminiService");

async function test() {
  const result =
    await extractStructuredData(`
Date: 20/04/2026
Shift: I
Employee No: BT4710
Operation Code: 856430
Machine No: MC-730
Work Order: 165460
Quantity: 25
Time: 4
`);

  console.log(result);
}

test();