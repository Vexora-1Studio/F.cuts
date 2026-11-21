import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MessageCircle,
  MessageSquare,
  Youtube,
  Instagram,
  Film,
  Sparkles,
} from 'lucide-react';
import { contactInfo, services } from '../data';
import ScrollReveal from './ScrollReveal';
import MagneticButton from './MagneticButton';

interface ContactProps {
  preSelectedPackage: string;
  clearPreSelection: () => void;
}

export default function Contact({ preSelectedPackage, clearPreSelection }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('long-form');
  const [projectType, setProjectType] = useState('youtube');
  const [budget, setBudget] = useState('200-500');
  const [rawFootageUrl, setRawFootageUrl] = useState('');
  const [description, setDescription] = useState('');

  const [formError, setFormError] = useState('');
  const [whatsappNotice, setWhatsappNotice] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preSelectedPackage) {
      setDescription(`أهلاً فريق f.cuts، أود الاستفسار عن تنفيذ: [ ${preSelectedPackage} ].`);
      if (preSelectedPackage.includes('Long Form')) {
        setSelectedService('long-form');
        setProjectType('youtube');
      } else if (preSelectedPackage.includes('Short Form') || preSelectedPackage.includes('قصيرة')) {
        setSelectedService('short-form');
        setProjectType('shorts');
      } else if (preSelectedPackage.includes('AI')) {
        setSelectedService('ai-video-creation');
        setProjectType('commercial');
      } else if (preSelectedPackage.includes('Color')) {
        setSelectedService('color-grading');
      } else if (preSelectedPackage.includes('Cinematic')) {
        setSelectedService('cinematic-editing');
      } else {
        setProjectType('other');
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preSelectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setFormError('يرجى إدخال الاسم والبريد الإلكتروني لإرسال طلبك.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('يرجى إدخال صيغة بريد إلكتروني صحيحة.');
      return;
    }
    setFormError('');
    setIsSuccess(true);
    clearPreSelection();

    setName('');
    setEmail('');
    setRawFootageUrl('');
    setDescription('');
  };

  const scrollToFormInput = () => {
    const inputEl = document.getElementById('contact-name-input');
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const hasEmail = Boolean(contactInfo.email.trim());
  const hasPhone = Boolean(contactInfo.phone.trim());
  const cleanedWhatsapp = (contactInfo.whatsapp || contactInfo.phone).replace(/[^\d]/g, '');
  const hasWhatsapp = Boolean(cleanedWhatsapp);

  return (
    <section id="contact" className="py-24 border-b border-white/10 relative overflow-hidden">
      {/* Subtle dual atmospheric rim lights behind closing manifesto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#00E5FF]/8 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#FF168B]/8 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        {/* Monumental Editorial Finale Header */}
        <ScrollReveal variant="curtain">
          <div className="text-center max-w-5xl mx-auto mb-16">
            <p
              dir="ltr"
              className="font-mono text-xs font-bold tracking-[0.22em] text-[#00E5FF] uppercase mb-5 inline-flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>05 · START YOUR NEXT FILM</span>
            </p>

            <h2
              dir="ltr"
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-white uppercase mb-5"
              style={{ textWrap: 'balance' }}
            >
              LET&apos;S MAKE
              <br />
              SOMETHING{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-white to-[#FF168B] bg-clip-text text-transparent">
                UNFORGETTABLE.
              </span>
            </h2>

            <p className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
              لنصنع معاً عملاً بصرياً لا يُنسى
            </p>
            <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              أرسل تفاصيل مشروعك ورابط اللقطات الخام عبر النموذج، أو تواصل مباشرة عبر قنوات
              استوديو <span dir="ltr" className="font-bold text-white inline-block">f.cuts</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                id="finale-start-project-btn"
                onClick={scrollToFormInput}
                className="min-h-[48px] px-8 py-4 rounded-xl bg-[#00E5FF] text-[#050505] font-extrabold text-sm tracking-wide hover:bg-white transition-colors cursor-pointer inline-flex items-center gap-2.5 fcuts-cyan-glow"
              >
                <span dir="ltr">START A PROJECT</span>
                <Send className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Right Column in RTL (lg:5): Direct Contact Details + WhatsApp + Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Channels Box */}
            <ScrollReveal>
              <div className="bg-[#0b0c10]/90 border border-white/15 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-white mb-1">
                      قنوات التواصل المباشر
                    </h3>
                    <p className="text-xs text-neutral-400">
                      بيانات التواصل الرسمية لاستوديو{' '}
                      <span dir="ltr" className="font-mono text-white">
                        f.cuts
                      </span>
                    </p>
                  </div>
                  <img
                    src={contactInfo.logoPath}
                    alt="f.cuts emblem"
                    className="w-10 h-10 object-contain rounded-lg border border-white/15 bg-[#050505] p-1"
                  />
                </div>

                {/* Email & Phone Slots */}
                <div className="space-y-3">
                  {/* Email Slot */}
                  <div className="bg-[#050505] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#0b0c10] border border-white/10 flex items-center justify-center text-[#00E5FF] shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-neutral-400 font-semibold">البريد الإلكتروني</p>
                        {hasEmail ? (
                          <a
                            dir="ltr"
                            href={`mailto:${contactInfo.email}`}
                            className="text-sm font-mono font-bold text-white hover:text-[#00E5FF] transition-colors truncate block"
                          >
                            {contactInfo.email}
                          </a>
                        ) : (
                          <p className="text-xs font-semibold text-neutral-300 border-b border-dashed border-white/15 pb-0.5">
                            {contactInfo.emailPlaceholder}
                          </p>
                        )}
                      </div>
                    </div>

                    {hasEmail ? (
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="px-3 py-2 rounded-lg bg-[#00E5FF] text-[#050505] text-xs font-extrabold hover:bg-white transition-colors shrink-0"
                      >
                        مراسلة
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={scrollToFormInput}
                        className="px-3 py-2 rounded-lg border border-white/15 hover:border-[#00E5FF] text-xs font-bold text-[#00E5FF] transition-colors cursor-pointer shrink-0"
                      >
                        أرسل رسالة
                      </button>
                    )}
                  </div>

                  {/* Phone Slot */}
                  <div className="bg-[#050505] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#0b0c10] border border-white/10 flex items-center justify-center text-[#FF168B] shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-neutral-400 font-semibold">رقم الهاتف</p>
                        {hasPhone ? (
                          <a
                            dir="ltr"
                            href={`tel:${contactInfo.phone}`}
                            className="text-sm font-mono font-bold text-white hover:text-[#FF168B] transition-colors truncate block tabular-nums"
                          >
                            {contactInfo.phone}
                          </a>
                        ) : (
                          <p className="text-xs font-semibold text-neutral-300 border-b border-dashed border-white/15 pb-0.5">
                            {contactInfo.phonePlaceholder}
                          </p>
                        )}
                      </div>
                    </div>

                    {hasPhone ? (
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="px-3 py-2 rounded-lg bg-[#FF168B] text-white text-xs font-extrabold hover:bg-white hover:text-[#050505] transition-colors shrink-0"
                      >
                        اتصال
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={scrollToFormInput}
                        className="px-3 py-2 rounded-lg border border-white/15 hover:border-[#FF168B] text-xs font-bold text-[#FF168B] transition-colors cursor-pointer shrink-0"
                      >
                        احجز تواصل
                      </button>
                    )}
                  </div>
                </div>

                {/* WhatsApp + Quick Form Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {hasWhatsapp ? (
                    <a
                      id="whatsapp-contact-btn"
                      href={`https://wa.me/${cleanedWhatsapp}?text=${encodeURIComponent(
                        'مرحباً فريق f.cuts، أود الاستفسار عن مشروع مونتاج جديد.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] py-3 px-4 rounded-xl bg-[#050505] border border-[#00E5FF]/50 hover:bg-[#00E5FF] text-white hover:text-[#050505] text-xs font-extrabold transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>تواصل عبر واتساب</span>
                    </a>
                  ) : (
                    <button
                      id="whatsapp-contact-btn"
                      type="button"
                      onClick={() => setWhatsappNotice((prev) => !prev)}
                      className="min-h-[44px] py-3 px-4 rounded-xl bg-[#050505] border border-[#00E5FF]/40 hover:border-[#00E5FF] text-[#00E5FF] text-xs font-extrabold transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>تواصل عبر واتساب</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={scrollToFormInput}
                    className="min-h-[44px] py-3 px-4 rounded-xl bg-[#00E5FF] text-[#050505] text-xs font-extrabold hover:bg-white transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>تعبئة طلب مشروع</span>
                  </button>
                </div>

                {whatsappNotice && !hasWhatsapp && (
                  <div className="bg-[#050505] border border-[#00E5FF]/40 rounded-xl p-3 text-xs text-neutral-300 leading-relaxed">
                    {contactInfo.whatsappPlaceholder}. يمكنك الآن إرسال تفاصيل مشروعك مباشرة عبر
                    النموذج المجاور.
                  </div>
                )}

                {/* Social Media Links */}
                <div className="pt-3 border-t border-white/10">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3">
                    منصات التواصل والمعارض
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <a
                      href="#portfolio"
                      aria-label="YouTube Portfolio"
                      className="min-h-[40px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#050505] border border-white/10 hover:border-[#00E5FF] text-neutral-300 hover:text-[#00E5FF] text-xs font-bold transition-colors"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span dir="ltr">YouTube</span>
                    </a>
                    <a
                      href="#ai-showcase"
                      aria-label="Instagram AI Reels"
                      className="min-h-[40px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#050505] border border-white/10 hover:border-[#FF168B] text-neutral-300 hover:text-[#FF168B] text-xs font-bold transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span dir="ltr">Instagram</span>
                    </a>
                    <a
                      href="#portfolio"
                      aria-label="TikTok Shorts"
                      className="min-h-[40px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#050505] border border-white/10 hover:border-[#00E5FF] text-neutral-300 hover:text-[#00E5FF] text-xs font-bold transition-colors"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span dir="ltr">TikTok</span>
                    </a>
                    <a
                      href="#ai-showcase"
                      aria-label="AI Exhibition"
                      className="min-h-[40px] flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#050505] border border-white/10 hover:border-[#FF168B] text-neutral-300 hover:text-[#FF168B] text-xs font-bold transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span dir="ltr">AI Gallery</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Why Submit Here */}
            <ScrollReveal delayMs={70}>
              <div className="bg-[#0b0c10]/90 border border-white/10 p-6 rounded-2xl">
                <h3 className="font-display font-extrabold text-base text-white mb-4">
                  خطوات ما بعد إرسال الطلب
                </h3>
                <ul className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#00E5FF] shrink-0">01.</span>
                    <span>مراجعة أولية للقطات الخام وتحديد أسلوب المونتاج والإيقاع المناسب.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#FF168B] shrink-0">02.</span>
                    <span>حفظ سرية الملفات الخام والالتزام التام بخصوصية المحتوى.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono font-bold text-[#00E5FF] shrink-0">03.</span>
                    <span>تأكيد التكلفة النهائية والجدول الزمني للتسليم والمراجعات.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Left Column in RTL (lg:7): Project Submission Form */}
          <div className="lg:col-span-7 w-full">
            <ScrollReveal delayMs={80}>
              <div className="bg-[#0b0c10]/95 border border-white/15 rounded-2xl p-6 sm:p-9 fcuts-card-glow">
                {isSuccess ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#050505] border border-[#00E5FF] text-[#00E5FF] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-9 h-9" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-white mb-2">
                      تم استلام طلبك بنجاح
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed mb-6">
                      شكراً لتواصلك مع{' '}
                      <span dir="ltr" className="font-bold text-white inline-block">
                        f.cuts
                      </span>
                      . سيقوم فريق المونتاج بمراجعة تفاصيل مشروعك والتواصل معك في أقرب وقت لتحديد
                      الخطوات التالية.
                    </p>
                    <MagneticButton
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 rounded-xl bg-[#00E5FF] text-[#050505] text-xs sm:text-sm font-extrabold hover:bg-white transition-colors cursor-pointer"
                    >
                      تقديم طلب مشروع آخر
                    </MagneticButton>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {preSelectedPackage && (
                      <div className="bg-[#050505] border border-[#00E5FF] p-4 rounded-xl flex items-center justify-between gap-3">
                        <span className="text-xs sm:text-sm font-bold text-[#00E5FF]">
                          الطلب المحدد: {preSelectedPackage}
                        </span>
                        <button
                          type="button"
                          onClick={clearPreSelection}
                          className="text-xs bg-[#FF168B] hover:bg-white hover:text-[#050505] text-white font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                          إلغاء
                        </button>
                      </div>
                    )}

                    {formError && (
                      <div
                        role="alert"
                        className="bg-[#FF168B]/10 border border-[#FF168B] text-[#FF168B] text-xs font-bold px-4 py-3 rounded-xl"
                      >
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name-input"
                          className="block text-xs font-bold text-neutral-200 mb-2"
                        >
                          الاسم أو اسم العلامة التجارية
                        </label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          placeholder="أدخل اسمك أو اسم مشروعك"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors text-right"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email-input"
                          className="block text-xs font-bold text-neutral-200 mb-2"
                        >
                          البريد الإلكتروني للتواصل
                        </label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          dir="ltr"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors text-left"
                        />
                      </div>
                    </div>

                    {/* Service Selection + Project Format + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label
                          htmlFor="contact-service-select"
                          className="block text-xs font-bold text-neutral-200 mb-2"
                        >
                          الخدمة المطلوبة
                        </label>
                        <select
                          id="contact-service-select"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-neutral-200 focus:outline-none transition-colors cursor-pointer text-right"
                        >
                          {services.map((srv) => (
                            <option key={srv.id} value={srv.id}>
                              {srv.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-project-type"
                          className="block text-xs font-bold text-neutral-200 mb-2"
                        >
                          نطاق المشروع
                        </label>
                        <select
                          id="contact-project-type"
                          value={projectType}
                          onChange={(e) => setProjectType(e.target.value)}
                          className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-neutral-200 focus:outline-none transition-colors cursor-pointer text-right"
                        >
                          <option value="youtube">فيديو يوتيوب طويل (Long Form)</option>
                          <option value="commercial">إعلان تجاري أو مشروع AI</option>
                          <option value="shorts">فيديو قصير (TikTok / Reels)</option>
                          <option value="other">طلب مونتاج مخصص</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-budget"
                          className="block text-xs font-bold text-neutral-200 mb-2"
                        >
                          الميزانية التقديرية ($)
                        </label>
                        <select
                          id="contact-budget"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-neutral-200 focus:outline-none transition-colors cursor-pointer text-right"
                        >
                          <option value="50-100">50$ إلى 100$</option>
                          <option value="100-200">100$ إلى 200$</option>
                          <option value="200-500">200$ إلى 500$</option>
                          <option value="500-1000">500$ إلى 1000$</option>
                          <option value="1000+">أكبر من 1000$</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-footage-url"
                        className="block text-xs font-bold text-neutral-200 mb-2"
                      >
                        رابط اللقطات الخام (Google Drive / WeTransfer / Dropbox)
                      </label>
                      <input
                        id="contact-footage-url"
                        type="url"
                        dir="ltr"
                        placeholder="https://drive.google.com/drive/folders/..."
                        value={rawFootageUrl}
                        onChange={(e) => setRawFootageUrl(e.target.value)}
                        className="w-full min-h-[46px] bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors text-left"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-description"
                        className="block text-xs font-bold text-neutral-200 mb-2"
                      >
                        تفاصيل المشروع والأسلوب المطلوب
                      </label>
                      <textarea
                        id="contact-description"
                        rows={4}
                        placeholder="اذكر فكرة الفيديو، المدة المتوقعة، أو أي مراجع بصرية تفضلها..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#050505] border border-white/10 focus:border-[#00E5FF] rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none transition-colors text-right"
                      />
                    </div>

                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      className="w-full min-h-[48px] py-4 rounded-xl bg-[#00E5FF] text-[#050505] font-extrabold text-sm hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-2.5"
                    >
                      <span>إرسال تفاصيل المشروع</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
