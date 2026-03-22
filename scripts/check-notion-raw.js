require("dotenv").config({ path: ".env.local" });
const fs = require("fs");

async function checkDatabase() {
  const response = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
    }
  });
  
  const data = await response.json();
  fs.writeFileSync("notion_raw_response.json", JSON.stringify(data, null, 2));
  console.log("Raw response written to notion_raw_response.json");
}

checkDatabase();
