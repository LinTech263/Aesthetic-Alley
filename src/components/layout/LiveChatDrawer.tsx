import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, CheckCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  time: string;
}

export const LiveChatDrawer: React.FC = () => {
  const { isChatOpen, setIsChatOpen, navigateTo } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'concierge',
      text: 'Mhoro! Welcome to Aesthetic Alley. I am Rutendo, your private interior styling concierge in Harare. How may I assist your space today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'How does Harare white-glove delivery work?',
    'I want to inquire about diaspora shipping to UK/USA.',
    'Can I book a private viewing at the Borrowdale showroom?',
    'What is the stock on the Zambezi Teak console?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Thank you for your inquiry. Our Harare atelier team will attend to your request directly. You can also WhatsApp us anytime at +263 77 240 9100.';
      const lower = message.toLowerCase();

      if (lower.includes('delivery') || lower.includes('harare') || lower.includes('white-glove')) {
        reply = 'Complimentary white-glove room delivery is provided on all Harare orders over $150. Our driver calls 15 minutes before arrival, unpacks, positions your furniture, and removes all packaging crating.';
      } else if (lower.includes('diaspora') || lower.includes('uk') || lower.includes('shipping') || lower.includes('usa')) {
        reply = 'For our diaspora patrons in the UK, USA, Europe, and South Africa, we crate all timber and stone in custom shock-absorbing timber crates with full DHL Express door-to-door tracking and export clearance.';
      } else if (lower.includes('showroom') || lower.includes('borrowdale') || lower.includes('viewing')) {
        reply = 'We would be delighted to host you at 12 Kingsmead Road, Borrowdale. Showroom viewings are private by appointment Monday to Saturday.';
      } else if (lower.includes('teak') || lower.includes('console')) {
        reply = 'Our Zambezi fluted teak consoles are seasoned over 36 months and hand-rubbed in beeswax. Currently we have 4 units seasoned and ready for immediate delivery in Harare.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'reply-' + Date.now(),
          sender: 'concierge',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        id="btn-live-chat-launcher"
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full bg-[#1A1918] text-[#FAF8F5] px-4 py-3 shadow-2xl hover:bg-[#B85D38] transition-all border border-stone-700 cursor-pointer"
        aria-label="Open Concierge Chat"
      >
        <MessageSquare className="w-4 h-4 text-[#C49B45]" />
        <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
          Harare Concierge
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Slide-out Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E8E2D9] overflow-hidden flex flex-col font-sans animate-in slide-in-from-bottom-3 duration-300">
          {/* Header */}
          <div className="bg-[#1A1918] text-[#FAF8F5] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs font-serif text-[#C49B45]">
                  AA
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1A1918]" />
              </div>
              <div>
                <h4 className="font-serif text-sm text-[#FAF8F5] font-medium leading-none">
                  Aesthetic Alley Concierge
                </h4>
                <span className="text-[10px] text-stone-400">Live from Harare Atelier</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1A1918] text-[#FAF8F5] rounded-br-xs'
                      : 'bg-white text-[#1A1918] border border-[#E8E2D9] rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-stone-400 mt-1 flex items-center gap-1 px-1">
                  {msg.time}
                  {msg.sender === 'user' && <CheckCheck className="w-2.5 h-2.5 text-stone-400" />}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-[11px] text-stone-400 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce delay-200" />
                <span className="ml-1">Rutendo is replying...</span>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          <div className="p-2 border-t border-[#E8E2D9] bg-[#F4EFEB]/50 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            {quickPrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-white border border-[#E8E2D9] text-stone-700 hover:border-[#B85D38] hover:text-[#B85D38] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input field & WhatsApp direct */}
          <div className="p-3 border-t border-[#E8E2D9] bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask our styling concierge..."
              className="flex-1 bg-[#F4EFEB] px-3.5 py-2 rounded-full text-xs text-[#1A1918] border border-stone-200 focus:outline-none focus:border-[#B85D38]"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 rounded-full bg-[#1A1918] text-[#FAF8F5] hover:bg-[#B85D38] transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-[#FAF8F5] px-3 py-1.5 text-center border-t border-[#E8E2D9] text-[10px] text-stone-500">
            <span>Prefer WhatsApp? </span>
            <a
              href="https://wa.me/263772409100"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#B85D38] hover:underline"
            >
              Chat on WhatsApp Business (+263 77 240 9100)
            </a>
          </div>
        </div>
      )}
    </>
  );
};
