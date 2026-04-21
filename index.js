async function runPrompt() {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3", // or phi3 for faster CPU
        prompt: "Explain Node.js in simple terms",
        stream: false,
      }),
    });

    const data = await response.json();
    console.log(data.response); // 🔥 THIS LINE WAS MISSING
  } catch (error) {
    console.error("Error:", error);
  }
}

runPrompt().catch((error) => console.error("Error:", error));
