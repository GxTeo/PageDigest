chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // console.log("Background script received a message!", message);

    // Check if sender.tab.url is a chrome:// page
    if (sender && sender.tab && sender.tab.url && sender.tab.url.startsWith("chrome://")) {
        // console.log("Cannot summarize chrome:// pages.");
        sendResponse({ summary: "Cannot summarize chrome:// pages." });
        return true;  // Stop further execution
    }

    // Only process if the message contains a valid action and content
    if (message.action === "generateSummary" && message.content) {
        // console.log("Received content, generating summary...");

        // Use async wrapper around the call to sendResponse
        (async () => {
            try {
                const summary = await generateSummary(message.content);
                // console.log("Summary generated successfully:", summary);

                // Send the summary back to popup.js after it is generated
                sendResponse({ summary });
            } catch (error) {
                // console.error("Error generating summary:", error);
                sendResponse({ summary: "Sorry, there was an error generating the summary." });
            }
        })();

        // Returning true here keeps the message channel open for async response
        // console.log("Returning true to keep the message port open.");
        return true;
    }
});

async function generateSummary(content) {
const apiKey = "sk-********************************";  // Replace with your actual OpenAI API key

// console.log("Generating summary for:", content);
const query = `Please summarize the content: ${content}`;

try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: "gpt-4o",  // Use the correct model ID here
        messages: [{ role: "user", content: query }],
        max_tokens: 300
    })
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message.content) {
    return data.choices[0].message.content;
    } else {
    return "Sorry, no summary could be generated.";
    }
} catch (error) {
    // console.error("Error with OpenAI API request:", error);
    return "Sorry, I couldn't generate the summary.";
}
}