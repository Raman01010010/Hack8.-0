import { useContext, useState, useEffect, useRef } from 'react';
import { User } from '../context/User';
import { useNavigate } from 'react-router-dom';
import { FaPaperPlane, FaRobot, FaUser, FaMagic, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { newUser } = useContext(User);
  console.log(newUser);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to state
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Clear input
    setInput('');

    try {
      // Send message to backend API
      const response = await fetch('http://localhost:3500/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document: newUser.doc,
          question: input
        })
      });

      const data = await response.json();

      // Add bot's reply to state
      const botMessage = { text: data.answer || "Sorry, no response.", sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { text: "Error contacting server.", sender: 'bot' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <FaRobot className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                AI Assistant <FaMagic className="text-yellow-300" />
              </h2>
              <p className="text-blue-200 flex items-center gap-2">
                <FaLightbulb className="text-yellow-300" />
                Ask me anything about the pitch
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="h-[500px] overflow-y-auto p-6 bg-blue-50/50">
          <AnimatePresence>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                      : 'bg-gray-100'
                  }`}>
                    {msg.sender === 'user' ? 
                      <FaUser className="text-white" /> : 
                      <FaRobot className="text-gray-600" />
                    }
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-6 py-3 ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none' 
                      : 'bg-white shadow-md rounded-tl-none border border-gray-100'
                  }`}>
                    <p className={`text-sm md:text-base ${
                      msg.sender === 'user' ? 'text-white' : 'text-gray-700'
                    }`}>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-blue-100 bg-white">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Type your message here..."
              className="flex-1 px-6 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50/50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 hover:shadow-lg transition-all duration-200"
            >
              <span className="hidden md:inline">Send</span>
              <FaPaperPlane className="text-lg" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
