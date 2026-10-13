import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  HelpCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  FileText,
  ChevronDown
} from 'lucide-react';

export const CustomerCareView: React.FC<{ initialSection?: 'faq' | 'shipping' | 'returns' | 'terms' }> = ({
  initialSection = 'faq'
}) => {
  const [activeSection, setActiveSection] = useState<'faq' | 'shipping' | 'returns' | 'terms'>(
    initialSection
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Harare White-Glove Room Delivery work?',
      a: 'For all orders over $150 across greater Harare (including Borrowdale, Highlands, Mt Pleasant, Glen Lorne, Avondale, and Chisipite), our uniformed atelier delivery team provides complimentary white-glove placement. We schedule an exact 2-hour arrival window, call 15 minutes ahead, carry the furniture into your room of choice, assemble any fixtures, and remove all protective wooden crates.'
    },
    {
      q: 'Can you ship heavy Zambezi Teak and stone sculptures to the diaspora (UK, USA, South Africa)?',
      a: 'Yes. We crate all export pieces in custom phytosanitary-certified pine with high-density shock foam. Shipments are handled via DHL Express door-to-door with complete export clearance and insurance documentation. Patrons receive real-time air waybill tracking.'
    },
    {
      q: 'What local Zimbabwean payment methods are accepted?',
      a: 'We accept EcoCash (instant USSD push to your registered mobile), OneMoney, Paynow, local Zimbabwean bank transfers in USD or ZiG Nostro, and international Visa/Mastercards with 3D-Secure.'
    },
    {
      q: 'How do I care for Zambezi Teak in dry Zimbabwean winters?',
      a: 'Because our teak is air-seasoned for 36 months, it resists shrinkage and warping naturally. We recommend applying our organic beeswax polish twice a year with a soft cotton rag.'
    },
    {
      q: 'Can I visit the Harare atelier or showroom before acquiring?',
      a: 'Certainly. Private viewings are welcomed at our Borrowdale gallery (12 Kingsmead Road) from Monday to Saturday by prior appointment. Contact concierge@aestheticalley.co.zw or WhatsApp +263 77 240 9100.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen font-sans text-[#1A1918] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B85D38] font-semibold block">
            Patron Concierge & Client Services
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1918]">
            Customer Care & Specifications
          </h1>
        </div>

        {/* Section switcher */}
        <div className="flex border-b border-[#E8E2D9] gap-4 justify-center overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          {[
            { id: 'faq', label: 'Frequently Answered', icon: HelpCircle },
            { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
            { id: 'returns', label: 'Returns & Guarantee', icon: RotateCcw },
            { id: 'terms', label: 'Terms & Privacy', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as typeof activeSection)}
                className={`pb-3 flex items-center gap-1.5 cursor-pointer transition-colors ${
                  activeSection === tab.id
                    ? 'border-b-2 border-[#B85D38] text-[#B85D38]'
                    : 'text-stone-500 hover:text-black'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section 1: FAQs */}
        {activeSection === 'faq' && (
          <div className="space-y-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-xs">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-stone-200 last:border-0 pb-4 text-xs sm:text-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left py-2 font-serif text-base sm:text-lg font-medium text-[#1A1918] flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-[#B85D38]' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <p className="mt-2 text-stone-600 leading-relaxed font-sans pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Section 2: Shipping & Delivery */}
        {activeSection === 'shipping' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed text-stone-700">
            <h3 className="font-serif text-2xl text-[#1A1918]">Harare & Regional Logistics</h3>
            <p>
              We operate our own dedicated transport fleet within Harare to safeguard seasoned timber and hand-carved stone.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200">
                <h4 className="font-semibold text-stone-900">Harare Metro White-Glove</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Complimentary on orders over $150. $15 for orders below. Delivered within 2-3 business days.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200">
                <h4 className="font-semibold text-stone-900">Bulawayo & Provincial Towns</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Secure regional transit via courier crating. $28 flat fee. Transit time 3-5 business days.
                </p>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200">
                <h4 className="font-semibold text-stone-900">Diaspora Air Express (UK, US, EU, RSA)</h4>
                <p className="text-xs text-stone-600 mt-1">
                  DHL Express with phytosanitary inspection certificates. $85 flat fee. Delivered in 5-8 business days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Returns & Guarantee */}
        {activeSection === 'returns' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed text-stone-700">
            <h3 className="font-serif text-2xl text-[#1A1918]">The 30-Day Bespoke Guarantee</h3>
            <p>
              Every home sanctuary is deeply personal. If a piece does not harmonize perfectly with your architectural lighting or spatial scale, we accept returns within 30 days of delivery.
            </p>
            <p>
              Pieces must remain in original pristine condition. Our Harare white-glove driver will inspect and collect the piece directly from your residence.
            </p>
          </div>
        )}

        {/* Section 4: Terms & Privacy */}
        {activeSection === 'terms' && (
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-xs space-y-6 text-xs sm:text-sm leading-relaxed text-stone-700">
            <h3 className="font-serif text-2xl text-[#1A1918]">Terms of Service & Privacy</h3>
            <p>
              Aesthetic Alley Private Limited is registered in Harare, Zimbabwe. All transactions are settled in compliant legal tender (USD or official Zimbabwe Gold - ZiG).
            </p>
            <p>
              We protect all patron data with bank-grade encryption. We never rent or distribute client contact details to third parties.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
