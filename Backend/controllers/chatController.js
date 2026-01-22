// Backend/controllers/chatController.js

exports.startSession = async (req, res) => {
  try {
    // TODO: Logic to create a new session in your database
    const sessionId = 'abc123_generated_id'; 
    res.json({ sessionId });
  } catch (err) {
    console.error("Error starting session:", err);
    res.status(500).json({ error: "Failed to start session", details: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { sessionId } = req.params;
  const { text } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ error: "Message text is required" });
    }

    // TODO: Save user message to database here

    // Send message to ML API
    // Assuming your Python RAG/ML service is running locally on port 5000
    const mlServiceUrl = process.env.ML_API_URL || 'http://localhost:5000/chat'; 
    
    const mlResponse = await fetch(mlServiceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text })
    });

    if (!mlResponse.ok) {
        throw new Error(`ML Service responded with status: ${mlResponse.status}`);
    }

    const data = await mlResponse.json();
    const botReply = data.reply || "I'm processing that information."; 

    // TODO: Save bot response to database here

    res.json({ sessionId, reply: botReply });

  } catch (err) {
    console.error("Error processing message:", err);
    res.status(500).json({ error: "Failed to process message", details: err.message });
  }
};

exports.getHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    // TODO: Fetch chat history from database
    res.json([{ text: 'Hello', reply: 'Hi!' }]);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch chat history", details: err.message });
  }
};
