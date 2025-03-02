import connectDB from "@/utils/db"; // If using a database, ensure it's connected
import User from "@/models/User"; // Import your Mongoose user model

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    console.log("Request received:", req.body);

    const { username, fullname, email, password, gender, phoneNo, date } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, fullname, email, password, gender, phoneNo, date });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
