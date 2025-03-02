import axios from "axios";

const chatWithBot = async (req, res) => {
  try {
    const { user_id, user_input } = req.body;

    if (!user_input) {
      return res.status(400).json({ error: "User input is required" });
    }

    const flaskResponse = await axios.post(process.env.PYTHON_CHATBOT_URL, {
      user_id: user_id || "default_user",
      user_input,
    });

    return res.json({ response: flaskResponse.data.response });
  } catch (error) {
    console.error("Error communicating with Flask chatbot:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { chatWithBot };
