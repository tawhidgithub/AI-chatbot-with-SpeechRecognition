import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// 🔥 MUST be at the top (before routes)
app.use(
  cors({
    origin: "*", // dev only
  }),
);

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("AI server is running 🚀");
});

// chat route
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Enter prompt" });
    }

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:7b",
        prompt,
        stream: false,
      }),
    });

    const data = await response.json();

    res.json({
      success: true,
      reply: data.response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
