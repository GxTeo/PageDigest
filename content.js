// console.log("Content script is running.");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log("Content script received a message from the popup!", request);
  
    if (request.action === "summarize") {
      try {
        const pageContent = document.body.innerText;  // Get text from the page
        // console.log("Content script retrieved page content:", pageContent);
        sendResponse({ content: pageContent });  // Send the content back to the popup
      } catch (error) {
        // console.error("Error retrieving page content:", error);
        sendResponse({ content: "Error retrieving content." });
      }
    }
    return true;
  });