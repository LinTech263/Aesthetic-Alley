import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gift, Sparkles, Check, Send } from 'lucide-react';

export const GiftCardsView: React.FC = () => {
  const { formatPrice, showToast } = useStore();
  const [amount, setAmount] = useState(150);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('May these artisanal pieces bring quiet warmth and permanence into your home.');

  const handleAcquire = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      'Digital Privilege Card Issued',
      `A gift certificate of ${formatPrice(amount)} for ${recipientName || 'Patron'} has been prepared.`,
      'luxury'
    );
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
            Curated Patron Gifts
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1918]">
            The Aesthetic Alley Privilege Certificate
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Bestow the freedom of bespoke selection upon newly wedded couples, housewarmings in Borrowdale Brooke, or overseas family returning home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Certificate Visual Preview */}
          <div className="md:col-span-5 bg-[#1A1918] text-[#FAF8F5] p-8 rounded-3xl shadow-2xl border border-stone-800 space-y-8 flex flex-col justify-between min-h-[360px]">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49B45] font-semibold block">
                  Aesthetic Alley
                </span>
                <span className="text-xs text-stone-400">Harare Atelier Certificate</span>
              </div>
              <Gift className="w-6 h-6 text-[#C49B45]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-stone-400">Value of Acquisition</span>
              <div className="font-serif text-4xl text-[#FAF8F5] font-medium">
                {formatPrice(amount)}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-2 text-xs">
              <div className="text-stone-300">
                For: <span className="font-serif text-white">{recipientName || 'Esteemed Recipient'}</span>
              </div>
              <p className="text-[11px] text-stone-400 italic line-clamp-2">
                "{message}"
              </p>
            </div>
          </div>

          {/* Configuration Form */}
          <form
            onSubmit={handleAcquire}
            className="md:col-span-7 bg-white p-8 rounded-3xl border border-[#E8E2D9] shadow-xs space-y-5 text-xs"
          >
            <h3 className="font-serif text-xl text-[#1A1918]">Select Privilege Denomination</h3>

            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 150, 300].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-3 rounded-2xl border text-center font-serif text-base font-semibold cursor-pointer transition-all ${
                    amount === val
                      ? 'border-[#B85D38] bg-[#F4EFEB] text-[#1A1918]'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Tendai & Ruvimbo"
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Recipient Email</label>
                <input
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.co.zw"
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Uncle Farai"
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Personal Inscription</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-[#FAF8F5] border border-stone-200 rounded-xl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#1A1918] hover:bg-[#B85D38] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Issue Digital Certificate • {formatPrice(amount)}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
