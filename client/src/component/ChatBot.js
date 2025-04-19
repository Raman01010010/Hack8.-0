import { useContext, useState } from 'react';
import { User } from '../context/User';
import { useNavigate } from 'react-router-dom';
export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
const {newUser}=useContext(User)
console.log(newUser)

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
          document:newUser.doc, //"Holi (IPA: ['hoːli:, hoːɭiː]) is a major Hindu festival celebrated as the Festival of Colours, Love, Equality and Spring.[1][7][8][9] It celebrates the eternal and divine love of the deities Radha and Krishna.[10][11] Additionally, the day signifies the triumph of good over evil,[12][13] as it commemorates the victory of Vishnu as Narasimha over Hiranyakashipu.[14][15] Holi originated and is predominantly celebrated in the Indian subcontinent, but has also spread to other regions of Asia and parts of the Western world through the Indian diaspora.",
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
    <div style={styles.container}>
      <h2 style={styles.header}>📚 How can I help you with this pitch?</h2>

      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#DCF8C6' : '#E6E6E6'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

// Basic inline styles (you can move these to a CSS file)
const styles = {
  container: {
    width: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    background: '#fff',
    fontFamily: 'sans-serif',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  header: {
    margin: 0,
    textAlign: 'center'
  },
  messages: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    maxHeight: '300px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#f9f9f9'
  },
  message: {
    padding: '10px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordBreak: 'break-word'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    background: '#4CAF50',
    color: '#fff',
    cursor: 'pointer'
  }
};
