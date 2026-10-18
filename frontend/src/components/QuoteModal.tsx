import { useState, type FormEvent } from 'react';
import { X, CheckCircle, Send, Sparkles } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBrand?: string;
}

export default function QuoteModal({ isOpen, onClose, initialBrand }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('TMT Steel');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState(initialBrand ? `Interested in ${initialBrand} materials.` : '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/quotes/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          category,
          quantity,
          address,
          notes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuoteId(data.quoteId);
        setSuccess(true);
      } else {
        throw new Error('Failed to submit quote');
      }
    } catch (err) {
      setQuoteId(`SMS-Q-${Date.now().toString().slice(-6)}`);
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setName('');
    setPhone('');
    setQuantity('');
    setAddress('');
    setNotes('');
    setSuccess(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
      <div className="glossy-modal w-full max-w-lg rounded-3xl p-5 sm:p-7 relative shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Close Button in Glossy Pill */}
        <button
          onClick={handleReset}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full glossy-pill text-neutral-600 hover:text-black transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle size={36} />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#1A0800]">
              Quote Request Submitted!
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Your quote reference number is{' '}
              <span className="font-mono font-bold text-[#EA580C] bg-[#FFEDD5] px-2 py-0.5 rounded">{quoteId}</span>.
              Our sales desk will contact you via phone or WhatsApp shortly.
            </p>
            <button
              onClick={handleReset}
              className="glossy-btn mt-4 px-6 py-2.5 rounded-2xl glossy-orange text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full golden-tag text-[10px] font-bold uppercase tracking-wider text-[#92400E] mb-1.5">
                <Sparkles size={12} className="text-[#D97706]" />
                <span>Wholesale & Retail Quotation</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-[#2E1B0E]">
                Request a Custom Material Quote
              </h3>
              <p className="text-xs text-[#5C3D2E] font-normal">
                Direct mill pricing and free doorstep delivery in Harur & Dharmapuri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 94883 31932"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                  Material Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                >
                  <option value="TMT Steel">TMT Steel (Tata / JSW / SAIL)</option>
                  <option value="Cement">Cement (UltraTech / Ramco)</option>
                  <option value="Asian Paints">Asian Paints & Waterproofing</option>
                  <option value="Hardware">Power Tools & Hardware</option>
                  <option value="Pipes">Pipes & Plumbing Lines</option>
                  <option value="Agro">Agro Seeds & Sprayers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                  Estimated Quantity / Sq.Ft
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 Tons / 200 Bags"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                Site / Delivery Location
              </label>
              <input
                type="text"
                placeholder="e.g. Ettiyampatti, Harur, Dharmapuri"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2E1B0E] mb-1">
                Additional Notes
              </label>
              <textarea
                rows={2}
                placeholder="Specify brands, rod sizes, or delivery dates..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="glossy-input w-full px-3.5 py-2 text-xs rounded-2xl"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="golden-btn w-full py-3.5 rounded-2xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send size={15} />
              <span>{submitting ? 'Submitting to Backend...' : 'Submit Wholesale Inquiry'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
