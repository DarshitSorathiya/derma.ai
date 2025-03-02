"use client"
import { useState } from "react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const toggleChatbot = () => setIsOpen(!isOpen);

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput("");
        }
    };

    return (
        <div className="fixed bottom-4 w-full z-10 right-4 flex flex-col items-end">
            <button
                className="bg-blue-500 text-3xl text-white p-3 rounded-full shadow-lg"
                onClick={toggleChatbot}
            >
                💬
            </button>
            {isOpen && (
                <div className="w-1/3 bg-white rounded-lg shadow-lg overflow-hidden mt-2">
                    <div
                        className="bg-blue-500 text-white p-3 text-center cursor-pointer"
                        onClick={toggleChatbot}
                    >
                        Chat with us
                    </div>
                    <div className="p-3 h-96 overflow-y-auto border-b">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2 p-2 bg-gray-200 rounded">
                                {msg}
                            </div>
                        ))}
                    </div>
                    <div className="flex h-12 border-t">
                        <input
                            type="text"
                            className="flex-1 p-2 border-none outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            className="p-2 bg-blue-500 text-white"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}