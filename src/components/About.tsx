import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionContactCTA from './SectionContactCTA';

interface AboutProps {
  onContact: () => void;
}

export default function About({ onContact }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const workflowParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [24, -24]
  );

  const pillars = [
    {
      label: 'حفظ كامل لخصوصية الملفات الخام',
      accent: 'cyan',
    },
    {
      label: 'التزام دقيق بمواعيد التسليم',
      accent: 'magenta',
    },
    {
      label: 'تدرجات لونية متوازنة ومريحة للعين',
      accent: 'cyan',
    },
    {
      label: 'تواصل مرن ومراجعات منظمة',
      accent: 'magenta',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'استلام اللقطات وتحديد الرؤية',
      desc: 'ترسل لنا ملفاتك الخام وموجز الفكرة عبر رابط سحابي، لنراجع اللقطات ونضع تصور الإيقاع المناسب.',
    },
    {
      num: '02',
      title: 'القص وبناء التسلسل السردي',
      desc: 'نزيل الفجوات الميتة ونرتب المشاهد في هيكل متدفق يخدم فكرة الفيديو ويجذب انتباه المشاهد.',
    },
    {
      num: '03',
      title: 'المعالجة اللونية والموشن غرافيكس',
      desc: 'ننتقل لمرحلة توحيد الإضاءة والتلوين السينمائي وإضافة النصوص الحركية والمؤثرات البصرية بدقة.',
    },
    {
      num: '04',
      title: 'المراجعة والتسليم النهائي',
      desc: 'نشارك معك نسخة المراجعة لتحديد أي ملاحظات بالثانية، ثم نسلمك الملف النهائي بجودة 4K جاهزاً للنشر.',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        {/* Rebalanced Editorial Studio Overview (No Empty Columns) */}
        <div className="max-w-5xl mb-16">
          <ScrollReveal variant="rise">
            <p
              dir="ltr"
              className="font-mono text-xs font-bold tracking-[0.2em] text-[#FF168B] uppercase mb-3 inline-flex items-center gap-2"
            >
              <Award className="w-3.5 h-3.5" />
              <span>04 · ABOUT F.CUTS STUDIO</span>
            </p>

            <h2
              className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-6 leading-[1.1] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              شغف بالتفاصيل الدقيقة ورؤية تجمع بين السينما والتقنية
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                في <span dir="ltr" className="font-bold text-white inline-block">f.cuts</span> لا
                نتعامل مع الفيديو كملفات عابرة، بل كوسيلة متكاملة لنقل الفكرة وبناء الثقة مع
                الجمهور. ندمج مهارات المونتاج الكلاسيكي مع أدوات الذكاء الاصطناعي الحديثة لتقديم
                مخرجات نظيفة وعصرية.
              </p>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                سواء كنت صانع محتوى يطمح لرفع جودة قناته على يوتيوب أو علامة تجارية تبحث عن إعلان
                يبرز منتجاتها بوضوح، نعمل معك خطوة بخطوة حتى الوصول للنتيجة المثالية.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#0b0c10]/90 border border-white/10 hover:border-white/25 transition-colors rounded-xl px-4 py-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200 font-semibold"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      pillar.accent === 'cyan' ? 'text-[#00E5FF]' : 'text-[#FF168B]'
                    }`}
                  />
                  <span>{pillar.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 4-Step Workflow with Smooth Scroll Parallax */}
        <motion.div style={{ y: workflowParallaxY }} className="border-t border-white/10 pt-14">
          <ScrollReveal variant="curtain">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                  منهجية العمل في <span dir="ltr" className="text-[#00E5FF] inline-block">f.cuts</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  أربع خطوات واضحة تضمن سلاسة التواصل وجودة التنفيذ في كل مشروع.
                </p>
              </div>
              <span dir="ltr" className="font-mono text-xs text-neutral-500">
                WORKFLOW · 04 STEPS
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <ScrollReveal key={idx} delayMs={idx * 70} variant="zoom">
                <motion.div
                  whileHover={prefersReduced ? undefined : { y: -5 }}
                  transition={{ duration: 0.22 }}
                  className="h-full bg-[#0b0c10]/90 border border-white/10 hover:border-[#00E5FF]/60 p-6 rounded-2xl transition-colors duration-200 flex flex-col justify-between"
                >
                  <div>
                    <span
                      dir="ltr"
                      className={`font-mono text-xs font-bold block mb-3 tabular-nums ${
                        idx % 2 === 0 ? 'text-[#00E5FF]' : 'text-[#FF168B]'
                      }`}
                    >
                      {step.num}.
                    </span>
                    <h4 className="font-display font-extrabold text-base sm:text-lg text-white mb-2.5 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </motion.div>

        {/* Unified Section Contact CTA */}
        <SectionContactCTA
          onContact={onContact}
          promptText="جاهز للبدء وفق منهجية f.cuts خطوة بخطوة لإنجاز مشروعك؟"
        />
      </div>
    </section>
  );
}
