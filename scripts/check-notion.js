const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function checkItems() {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    console.log("Querying Database ID:", databaseId);
    
    // Use databases.query correctly
    const response = await notion.databases.query({ 
      database_id: databaseId,
      page_size: 5 // Get a few items to be sure
    });
    
    console.log("Results Count:", response.results.length);
    if (response.results.length > 0) {
      response.results.forEach((page, index) => {
        console.log(`Page ${index} Properties:`, Object.keys(page.properties));
      });
    } else {
      console.log("Database is empty.");
    }
  } catch (error) {
    console.error("Query Error:", error.message);
    if (error.body) console.error("Error Body:", error.body);
  }
}

checkItems();
