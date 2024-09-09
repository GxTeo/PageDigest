document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarize-btn");
  const statusText = document.getElementById("status");
  const loadingIcon = document.getElementById("loading");
  const summaryBox = document.getElementById("summary");

  summarizeBtn.addEventListener("click", () => {
    summaryBox.innerText = "";
    summaryBox.style.display = "none";  // Hide summary initially
    loadingIcon.style.display = "block";  // Show loading icon
    statusText.innerText = "Summarizing...";

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      // Send a message to content script to get the page content
      chrome.tabs.sendMessage(activeTab.id, { action: "summarize" }, (response) => {
        console.log("Content script response:", response);
        if (response && response.content) {
          // Send the page content to the background script for summarization
          chrome.runtime.sendMessage({ action: "generateSummary", content: response.content }, (bgResponse) => {
            loadingIcon.style.display = "none";  // Hide loading icon when done

            console.log("Background script response:", bgResponse);
            
            // Display the summary
            if (bgResponse && bgResponse.summary) {
              summaryBox.innerText = bgResponse.summary;
              summaryBox.style.display = "block";  // Show the summary box
              summaryBox.classList.add('fade-in');  // Apply fade-in effect
              statusText.innerText = "Summary completed!";
            } else {
              summaryBox.innerText = "Sorry, no summary could be generated.";
              summaryBox.style.display = "block";
              statusText.innerText = "Error during summarization.";
            }
          });
        } else {
          loadingIcon.style.display = "none";
          summaryBox.innerText = "Sorry, no content could be retrieved.";
          summaryBox.style.display = "block";
          statusText.innerText = "Error retrieving content.";
        }
      });
    });
  });
});