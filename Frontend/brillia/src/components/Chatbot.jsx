import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Brillia's AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatSize, setChatSize] = useState({ width: 384, height: 500 });
  const chatboxRef = useRef(null);
  const isResizing = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate bot response (placeholder for ML model)
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "Thanks for your message! I'm currently a placeholder and will be connected to our ML model soon.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleMouseDown = (e) => {
    isResizing.current = true;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;

      const newWidth = window.innerWidth - e.clientX;
      const newHeight = window.innerHeight - e.clientY;

      setChatSize({
        width: Math.max(320, Math.min(600, newWidth)),
        height: Math.max(400, Math.min(800, newHeight))
      });
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Open chatbot"
      >
        <span className="material-symbols-outlined text-3xl">chat</span>
      </button>

      {/* Chatbot Window */}
      <div
        ref={chatboxRef}
        className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl bg-white shadow-2xl dark:bg-[#1a2b34] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        }`}
        style={{
          width: `${chatSize.width}px`,
          height: `${chatSize.height}px`,
          minWidth: '320px',
          minHeight: '400px',
          maxWidth: '600px',
          maxHeight: '800px'
        }}
      >
          {/* Resize Handle */}
          <div
            className="absolute -left-1 -top-1 h-4 w-4 cursor-nwse-resize"
            onMouseDown={handleMouseDown}
          >
            <div className="h-full w-full rounded-tl-2xl hover:bg-primary/20"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl">smart_toy</span>
              <div>
                <h3 className="font-bold">Brillia AI</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
              aria-label="Close chatbot"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                disabled={inputValue.trim() === ''}
                aria-label="Send message"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </form>

          {/* Resize Indicator */}
          <div className="absolute left-2 bottom-2 text-xs text-gray-400 dark:text-gray-500 select-none pointer-events-none">
            ↖ Drag corner to resize
          </div>
        </div>
    </>
  );
}
