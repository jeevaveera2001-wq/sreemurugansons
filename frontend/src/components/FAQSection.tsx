import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import Scroll3D from './Scroll3D';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What products do you sell?',
    answer:
      'Sree Murugan Sons is a comprehensive one-stop destination dealing in core categories: Hardware (hand & power tools, fasteners, plumbing, electrical fittings), Paints (interior, exterior emulsions, primers, enamels, wall putty), Steel (Fe 550D TMT bars, MS pipes, GI pipes, structural angles, channels, roofing sheets), Cement (fresh batch UltraTech, Dalmia, Ramco OPC & PPC cement), Granite Slabs & Washbasins, and Agro Products (certified hybrid seeds, chemical & bio fertilizers, sprayers, farm tools).',
  },
  {
    question: 'Do you provide home delivery?',
    answer:
      'Yes, we provide reliable and prompt doorstep and job-site transport delivery directly to your site or home in Ettiyampatti, Harur, and all surrounding villages across Dharmapuri district.',
  },
  {
    question: 'Do you accept bulk orders?',
    answer:
      'Yes! We specialize in wholesale and bulk volume supplies for individual home builds, commercial complexes, schools, and apartment projects with direct mill weighbridge receipts and scheduled installment deliveries.',
  },
  {
    question: 'Do you supply construction materials to contractors?',
    answer:
      'Yes, we partner actively with licensed civil contractors, builders, and masons, offering priority yard loading, customized steel rod cutting/bending, and verified trade credit accounts.',
  },
  {
    question: 'Do you sell agricultural products?',
    answer:
      'Yes, we stock high-yield certified hybrid seeds, 16L battery-operated knapsack sprayers, drip irrigation kits, UV heavy-duty tarpaulins, and bio-fertilizers for local farmers.',
  },
  {
    question: 'How can I request a quotation?',
    answer:
      'You can request a quote easily on this website using our wholesale quote modal, compute requirements with our interactive Estimator, or call/WhatsApp our sales desk directly at +91 94883 31932.',
  },
  {
    question: 'Where is Sree Murugan Sons located?',
    answer:
      'Our primary showroom and extensive steel storage yard are conveniently located on Main Road, Ettiyampatti P.O., Harur (TK), Dharmapuri (DT) – 636903, Tamil Nadu.',
  },
  {
    question: 'How can I contact the store and owner?',
    answer:
      'You can directly contact proprietor M. Vivekananthan at +91 94883 31932 or reach our store desk at +91 94426 24882. We are also available on WhatsApp 7 days a week.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl =
    'https://wa.me/919488331932?text=' +
    encodeURIComponent(
      'Hello Sree Murugan Sons, I have a question regarding materials and pricing.'
    );

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden border-b border-white/60">
      
      {/* Refraction Glow */}
      <div className="ambient-glow-amber w-[450px] h-[450px] top-1/3 -right-20 opacity-25 float-3d-slow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header in Glossy Pod */}
        <Scroll3D direction="up" delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glossy-pill text-xs font-bold uppercase tracking-wider text-[#92400E] mb-3">
              <HelpCircle size={15} className="text-[#D97706]" />
              <span>Common Inquiries</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-[#2E1B0E] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3D2E] mt-3 leading-relaxed font-normal">
              Have questions about ordering, delivery, bulk contractor supply, or store hours? Find quick answers below.
            </p>
          </div>
        </Scroll3D>

        {/* Accordion List of Glossy Panels */}
        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Scroll3D key={index} direction="up" delay={0.06 * (index % 4)}>
                <div
                  className="glossy-card rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_12px_28px_rgba(217,119,6,0.1)]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full px-4 sm:px-6 py-3.5 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                  >
                    <span className="font-heading font-extrabold text-xs sm:text-base text-[#2E1B0E] tracking-tight leading-snug">
                      {item.question}
                    </span>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      isOpen 
                        ? 'golden-btn text-white shadow-xs' 
                        : 'golden-tag text-[#D97706]'
                    }`}>
                      {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-xs sm:text-sm text-[#5C3D2E] leading-relaxed border-t border-amber-200/50 font-normal">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Scroll3D>
            );
          })}
        </div>

        {/* Bottom Help Banner in Glossy Glass Pod */}
        <Scroll3D direction="up" delay={0.2}>
          <div className="mt-8 sm:mt-10 p-5 sm:p-7 rounded-3xl glossy-card flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 shadow-md">
            <div className="text-center sm:text-left">
              <h4 className="font-heading font-extrabold text-xs sm:text-base text-[#2E1B0E]">
                Have a specific question or requirement not covered here?
              </h4>
              <p className="text-[11px] sm:text-xs text-[#5C3D2E] mt-1 font-normal">
                Our store desk at Ettiyampatti, Harur is happy to assist you immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919488331932"
                className="golden-btn w-full sm:w-auto px-5 py-2.5 rounded-2xl text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-white" />
                <span>Call Us</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glossy-btn w-full sm:w-auto px-5 py-2.5 rounded-2xl glossy-pill hover:bg-white text-[#2E1B0E] font-extrabold text-xs transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle size={15} className="text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </Scroll3D>

      </div>
    </section>
  );
}
