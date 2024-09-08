document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const modelSelect = document.getElementById("model-select");

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    const selectedModel = modelSelect.value;
    if (message) {
      addMessage("user", message);
      userInput.value = "";

      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message, model: selectedModel }),
        });

        const data = await response.json();
        addMessage("assistant", marked.parse(data.response));
      } catch (error) {
        console.error("Error:", error);
        addMessage(
          "assistant",
          "Sorry, there was an error processing your request."
        );
      }
    }
  }

  function addMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", `${role}-message`);
    messageDiv.innerHTML = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
