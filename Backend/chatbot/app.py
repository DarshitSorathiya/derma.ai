from flask import Flask, request, jsonify
import google.generativeai as genai

genai.configure(api_key="AIzaSyAt-I7xIiiayyNs5Gun5gNd2GsXDV0oWuU")

app = Flask(__name__)

conversation_history = {}

def classify_query(user_input):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0})
        prompt = f"""
        You are a skin disease chatbot. Classify the following user query into one of these categories:
        - skin disease symptoms
        - follow-up question
        - in-detail
        - out-of-domain
        - critical condition
        Query: "{user_input}"
        Return only the category name as a single word.
        """
        response = model.generate_content(prompt, stream=False)
        return response.text.strip().lower()
    except Exception:
        return "error"

def predict_disease_and_remedy(user_id, user_input):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0})
        user_input = user_input[:500]

        prompt = f"""
        A user describes their skin symptoms. Predict the most likely skin disease and provide Ayurvedic remedies and medical advice.
        Response format:
        Disease: [Disease Name] - [Brief explanation]
        Ayurvedic Remedies:
        1. [Remedy 1] - [Explanation]
        2. [Remedy 2] - [Explanation]
        Medical Advice:
        [Provide direct medical advice. Recommend seeing a dermatologist if necessary.]
        User Symptoms: "{user_input}"
        """
        response = model.generate_content(prompt, stream=False)
        response_text = response.text.strip()

        conversation_history[user_id] = {
            "disease": response_text.split("\n")[0].replace("Disease: ", ""),
            "symptoms": user_input,
            "detailed_response": response_text
        }
        return response_text.replace("", "")
    except Exception as e:
        return f"Error processing request: {str(e)}"

def provide_detailed_info(user_id):
    try:
        user_data = conversation_history.get(user_id)
        if not user_data:
            return "Please describe your symptoms first."

        previous_disease = user_data["disease"]
        previous_symptoms = user_data["symptoms"]

        model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0})
        
        prompt = f"""
        Expand on Ayurvedic remedies and medical advice for "{previous_disease}" caused by "{previous_symptoms}". 
        Provide alternative treatments, precautions, and additional insights without repeating previous responses.
        """
        response = model.generate_content(prompt, stream=False)
        return response.text.strip().replace("", "")
    except Exception:
        return "Error processing request."

def handle_follow_up(user_id, user_input):
    try:
        user_data = conversation_history.get(user_id)
        if not user_data:
            return "Please describe your symptoms first."

        previous_disease = user_data["disease"]
        previous_symptoms = user_data["symptoms"]

        model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0})
        
        prompt = f"""
        A user was previously diagnosed with {previous_disease} based on these symptoms: "{previous_symptoms}".

        The user has asked a follow-up question: "{user_input}".  
        Provide detailed information in plain text.

        If the user asks for:
        - More remedies → List additional Ayurvedic remedies.
        - More medical advice → Expand on previous advice, including prevention and treatment.
        - How long it will take to heal → Give an estimated recovery time.
        - Causes → Explain what causes the condition.
        - Prevention → Provide tips to prevent it.
        - If unclear, ask the user for clarification.

        Response must be in plain text, no extra formatting , no bold text.

        User Follow-up: {user_input}
        """
        
        response = model.generate_content(prompt, stream=False)
        return response.text.strip().replace("", "")
    except Exception:
        return "Error processing request."

def chatbot_response(user_id, user_input):
    try:
        greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"]
        byee = ["good bye", "goodbye", "bye", "by"]

        if user_input.lower() in byee: 
            return "Bye! Have a nice day"
        
        if user_input.lower() in greetings:
            return "Hello! How can I assist you with skin disease symptoms or remedies today?"
        
        category = classify_query(user_input)

        if category == "out-of-domain":
            return "Sorry, I can only assist with skin disease symptoms and Ayurvedic remedies."
        elif category == "critical condition":
            return "Please consult a dermatologist immediately."
        elif category == "follow-up question":
            return handle_follow_up(user_id, user_input)
        elif category == "in-detail":
            return provide_detailed_info(user_id)
        else:
            return predict_disease_and_remedy(user_id, user_input)
    except Exception:
        return "An error occurred while processing your request."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_id = data.get("user_id", "default_user")
    user_input = data.get("user_input", "")

    if not user_input:
        return jsonify({"error": "User input is required"}), 400

    response = chatbot_response(user_id, user_input)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)