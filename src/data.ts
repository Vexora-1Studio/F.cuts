import { PortfolioItem, Service, Language } from './types';

/**
 * بيانات التواصل الرسمية لاستوديو f.cuts
 * لا توجد بيانات مخترعة؛ أضف البريد الإلكتروني ورقم الهاتف ورقم واتساب الحقيقيين هنا ليظهرا تلقائياً في الموقع والفوتر.
 */
export const contactInfo = {
  brandName: 'f.cuts',
  logoPath: `${import.meta.env.BASE_URL}assets/aistudio/image_6c7b35e0.png`,
  email: 'faresedits0@gmail.com',
  phone: '0594060379',
  whatsapp: '966594060379',
  instagram: 'https://www.instagram.com/fcuts.1?bqrl=NmN6em4xZHZtc2J5',
  tiktok: 'https://www.tiktok.com/@f_cuts11?_r=1&_t=ZS-9Bc7uRSeTrS',
  emailPlaceholder: 'يُضاف البريد الإلكتروني الرسمي هنا',
  emailPlaceholderEn: 'Official email address goes here',
  phonePlaceholder: 'يُضاف رقم الهاتف الرسمي هنا',
  whatsappPlaceholder: 'يُضاف رقم واتساب الرسمي في الإعدادات',
  phonePlaceholderEn: 'Official phone number goes here',
  whatsappPlaceholderEn: 'Official WhatsApp number can be added in settings',
};

export function getContactPlaceholders(lang: Language) {
  return {
    emailPlaceholder:
      lang === 'ar' ? contactInfo.emailPlaceholder : contactInfo.emailPlaceholderEn,
    phonePlaceholder:
      lang === 'ar' ? contactInfo.phonePlaceholder : contactInfo.phonePlaceholderEn,
    whatsappPlaceholder:
      lang === 'ar' ? contactInfo.whatsappPlaceholder : contactInfo.whatsappPlaceholderEn,
  };
}

/**
 * نماذج أعمال الاستوديو (Studio Showcase Demos)
 * قابلة للاستبدال المباشر بأعمال العملاء الفعلية وروابط الفيديو الحقيقية لاحقاً.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'نموذج عرض: فلوج سينمائي ليلي طويل',
    titleEn: 'Showcase Demo: Nocturnal Cinematic Long-Form Vlog',
    englishTitle: 'TOKYO NOCTURNE · LONG FORM DEMO',
    description:
      'نموذج عرض لمونتاج فلوج سفر طويل بأسلوب سينمائي متدرج. معالجة لونية دقيقة تبرز التباين بين السماوي والوردي تحت الإضاءة الليلية مع ضبط إيقاع المشاهد لرفع التفاعل.',
    descriptionEn:
      'A long-form travel vlog editing showcase with progressive cinematic pacing. Precision color grading highlights the cyan-and-magenta night contrast while maintaining viewer retention.',
    category: 'youtube',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-man-with-headphones-40348-large.mp4',
    thumbnailUrl: 'placeholder:tokyo-cyber',
    duration: '04:15',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض استوديو f.cuts (قابل للتخصيص)',
    clientEn: 'f.cuts Studio Showcase Demo (Customizable)',
    date: '2027',
    isDemo: true,
  },
  {
    id: '2',
    title: 'نموذج عرض: إعلان منتج إلكتروني إيقاعي',
    titleEn: 'Showcase Demo: Rhythmic Tech Product Commercial',
    englishTitle: 'PRODUCT PULSE · COMMERCIAL DEMO',
    description:
      'نموذج إعلان تجاري يعتمد على التزامن الإيقاعي الدقيق والانتقالات الحركية الحادة، مع مؤثرات بصرية تبرز تفاصيل التصميم وجودة المنتج.',
    descriptionEn:
      'A commercial spot built around tight beat-synced cuts and sharp kinetic transitions, paired with visual effects that spotlight product craftsmanship and detail.',
    category: 'commercial',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-neon-camera-lens-revolving-around-itself-49488-large.mp4',
    thumbnailUrl: 'placeholder:aurapro-ad',
    duration: '01:00',
    softwareUsed: ['After Effects', 'Premiere Pro'],
    client: 'نموذج عرض تجاري f.cuts (قابل للتخصيص)',
    clientEn: 'f.cuts Commercial Showcase Demo (Customizable)',
    date: '2027',
    isDemo: true,
  },
  {
    id: '3',
    title: 'نموذج عرض: مقطع عمودي عالي الإيقاع 9:16',
    titleEn: 'Showcase Demo: High-Tempo 9:16 Vertical Cut',
    englishTitle: 'KINETIC SHORTS · 9:16 DEMO',
    description:
      'نموذج مونتاج فيديو قصير عالي الديناميكية لمنصات Reels وTikTok، يتضمن نصوصاً حركية واضحة وتقليص المساحات الميتة للحفاظ على تركيز المشاهد.',
    descriptionEn:
      'A high-energy short-form edit crafted for Reels and TikTok, featuring crisp kinetic typography and zero dead-air pacing to lock in viewer attention.',
    category: 'shorts',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-excited-influencer-creating-video-shorts-content-for-social-media-41804-large.mp4',
    thumbnailUrl: 'placeholder:shorts-kinetic',
    duration: '00:45',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض محتوى قصير f.cuts',
    clientEn: 'f.cuts Short-Form Showcase Demo',
    date: '2027',
    isDemo: true,
  },
  {
    id: '5',
    title: 'نموذج عرض: إعلان واجهة تطبيق رقمي 3D',
    titleEn: 'Showcase Demo: 3D Digital App Interface Spot',
    englishTitle: 'INTERFACE MOTION · COMMERCIAL DEMO',
    description:
      'نموذج فيديو تسويقي يمزج تحريك واجهات التطبيق ثلاثية الأبعاد مع لقطات حية سريعة التتابع لإيصال فكرة المنتج بوضوح بصري عالٍ.',
    descriptionEn:
      'A launch promo blending 3D animated UI sequences with fast-paced live-action footage to communicate product value with unmistakable visual clarity.',
    category: 'commercial',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-video-editing-on-a-computer-43093-large.mp4',
    thumbnailUrl: 'placeholder:focuslist-ui',
    duration: '01:30',
    softwareUsed: ['After Effects', 'Premiere Pro', 'Photoshop'],
    client: 'نموذج عرض تقني f.cuts',
    clientEn: 'f.cuts Tech Showcase Demo',
    date: '2027',
    isDemo: true,
  },
  {
    id: '6',
    title: 'نموذج عرض: حلقة يوتيوب طويلة متعددة الكاميرات',
    titleEn: 'Showcase Demo: Multi-Cam Long-Form YouTube Episode',
    englishTitle: 'ALPINE DRIFT · LONG FORM DEMO',
    description:
      'نموذج مونتاج حلقات طويلة يجمع لقطات الدرون والكاميرات الأرضية مع تثبيت الحركة وتصحيح التباين اللوني وبناء تسلسل قصصي متدفق.',
    descriptionEn:
      'A multi-camera long-form episode combining drone and handheld footage with motion stabilization, balanced contrast grading, and seamless narrative flow.',
    category: 'youtube',
    videoUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-using-a-keyboard-and-mouse-40332-large.mp4',
    thumbnailUrl: 'placeholder:swiss-aerial',
    duration: '08:12',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض Long Form f.cuts',
    clientEn: 'f.cuts Long-Form Showcase Demo',
    date: '2027',
    isDemo: true,
  },
];

export const services: Service[] = [
  {
    id: 'long-form',
    number: '01',
    title: 'تصميم ومونتاج فيديوهات Long Form',
    titleEn: 'Long-Form Video Design & Editing',
    englishTitle: 'Long Form Video Editing',
    shortTag: 'CORE SPECIALTY · YOUTUBE & PODCASTS',
    description:
      'نبني تجربة مشاهدة متماسكة للفيديوهات الطويلة على يوتيوب والبودكاست والمحتوى المعرفي. هندسة سردية متدرجة، إيقاع مدروس، ودمج ذكي للقطات B-Roll يحافظ على انتباه المشاهد حتى النهاية.',
    descriptionEn:
      'We architect cohesive viewing experiences for YouTube long-form, podcasts, and educational shows—combining narrative pacing, deliberate rhythm, and smart B-roll integration to sustain retention.',
    visualType: 'longform',
    featured: true,
    accent: 'cyan',
    features: [
      'بناء هيكل قصصي مشوق ومقدمة خاطفة من الثواني الأولى',
      'تقسيم الفصول وإضافة فواصل بصرية وعناصر توضيحية متزنة',
      'معالجة نقاء الحوار وتوازن المستويات الصوتية طوال الحلقة',
      'تصدير نهائي مهيأ لمنصات البث بدقة 4K',
    ],
    featuresEn: [
      'Compelling narrative structure and high-retention opening hooks',
      'Chapter segmentation with balanced visual dividers and callouts',
      'Dialogue clarity treatment and consistent loudness leveling',
      'Final 4K delivery mastered for streaming platforms',
    ],
    deliverables: [
      'نسخة رئيسية 16:9 بدقة 4K',
      'مقاطع تشويقية مستخرجة للريلز',
      'ملف فصول يوتيوب وعناوين مقترحة',
    ],
    deliverablesEn: [
      '4K 16:9 Master Video',
      'Extracted Teaser Clips for Reels',
      'YouTube Chapters & Title Suggestions',
    ],
  },
  {
    id: 'short-form',
    number: '02',
    title: 'مونتاج الفيديوهات القصيرة',
    titleEn: 'Short-Form Video Editing',
    englishTitle: 'Short Form Video Editing',
    shortTag: 'REELS · TIKTOK · SHORTS',
    description:
      'مقاطع عمودية سريعة الإيقاع مصممة لجذب الانتباه من الثانية الأولى، مع نصوص حركية متزامنة وانتقالات خاطفة تناسب طبيعة المشاهدة السريعة.',
    descriptionEn:
      'Fast-paced vertical edits engineered to hook viewers in the very first second, complete with synced kinetic captions and snappy transitions built for social feeds.',
    visualType: 'shortform',
    accent: 'magenta',
    features: [
      'قص مكثف وإزالة الفجوات الميتة لرفع ديناميكية المقطع',
      'نصوص تفاعلية متحركة بالعربية والإنجليزية',
      'ضبط التكوين الرأسي 9:16 ومناطق الأمان للمنصات',
    ],
    featuresEn: [
      'Tight pacing that eliminates dead air and maximizes momentum',
      'Interactive animated captions in Arabic and English',
      'Precision 9:16 vertical framing within platform safe zones',
    ],
    deliverables: ['نسخ 9:16 عالية الحدة', 'ملفات ترجمة مدمجة', 'أغلفة مصغرة للحسابات'],
    deliverablesEn: ['Crisp 9:16 Vertical Masters', 'Burned-In Subtitle Files', 'Social Cover Frames'],
  },
  {
    id: 'cinematic-editing',
    number: '03',
    title: 'المونتاج السينمائي',
    titleEn: 'Cinematic Editing',
    englishTitle: 'Cinematic Editing',
    shortTag: 'STORYTELLING · BRAND FILMS',
    description:
      'تحرير قصصي وبصري يركز على الإحساس والتوقيت السينمائي للحركات والانتقالات، مناسب لأفلام العلامات التجارية، الإعلانات الراقية، ومشاريع إطلاق المنتجات.',
    descriptionEn:
      'Narrative-driven visual editing focused on emotion, cinematic timing, and fluid motion transitions—tailored for brand films, luxury commercials, and product launches.',
    visualType: 'cinematic',
    accent: 'cyan',
    features: [
      'مواءمة اللقطات مع الإيقاع الموسيقي والحركة البصرية',
      'انتقالات سلسة ومؤثرات سرعة مدروسة (Speed Ramping)',
      'توجيه انتباه المشاهد نحو تفاصيل المنتج والرسالة',
    ],
    featuresEn: [
      'Frame-accurate cut synchronization with score and motion',
      'Seamless match cuts and deliberate speed ramping',
      'Visual storytelling that spotlights product craft and message',
    ],
    deliverables: ['فيلم العلامة الرئيسي 4K', 'نسخ مقصوصة للحملات الإعلانية', 'تصدير Master نظيف'],
    deliverablesEn: ['4K Brand Hero Film', 'Ad Campaign Cutdowns', 'Clean ProRes / Master Export'],
  },
  {
    id: 'ai-video-creation',
    number: '04',
    title: 'إنتاج الفيديوهات بالذكاء الاصطناعي',
    titleEn: 'AI Video Creation',
    englishTitle: 'AI Video Creation',
    shortTag: 'GENERATIVE PIPELINE · 2027',
    description:
      'توظيف نماذج الذكاء الاصطناعي التوليدية لإنشاء مشاهد مستقبلية، توسيع البيئات الافتراضية، وتحريك الصور الثابتة ودمجها بسلاسة مع المونتاج الاحترافي.',
    descriptionEn:
      'Leveraging generative AI pipelines to craft futuristic scenes, extend virtual environments, and animate still imagery—seamlessly blended into professional timelines.',
    visualType: 'aivideo',
    accent: 'magenta',
    features: [
      'توليد مشاهد B-Roll وإعلانات مفاهيمية مبتكرة بالذكاء الاصطناعي',
      'العزل الذكي ودمج البيئات الرقمية بدون شاشة خضراء',
      'تحسين الدقة والترجمة البصرية المتزامنة',
    ],
    featuresEn: [
      'Generative AI B-roll and conceptual commercial sequences',
      'AI rotoscoping and virtual set compositing without green screens',
      'Neural 4K upscaling and lip-synced visual localization',
    ],
    deliverables: ['مفاهيم بصرية مولدة مخصصة', 'دمج كامل في التايم لاين', 'نسخ متعددة الأبعاد'],
    deliverablesEn: ['Custom Generative Visual Concepts', 'Full Timeline Compositing', 'Multi-Aspect Deliverables'],
  },
  {
    id: 'color-grading',
    number: '05',
    title: 'تصحيح الألوان الاحترافي',
    titleEn: 'Professional Color Grading',
    englishTitle: 'Color Grading',
    shortTag: 'LOOK DESIGN · TONE BALANCE',
    description:
      'إضفاء هوية لونية نظيفة ومتوازنة على مشاهدك. توحيد ألوان الكاميرات المختلفة، معالجة الإضاءة الصعبة، وبناء مظهر سينمائي مريح للعين.',
    descriptionEn:
      'Giving your footage a clean, balanced color identity—matching multiple cameras, rescuing challenging lighting, and crafting a refined cinematic look.',
    visualType: 'color',
    accent: 'cyan',
    features: [
      'تصحيح التعرض الضوئي وتوازن اللون الأبيض والديناميكية',
      'مطابقة اللقطات المأخوذة من كاميرات وزوايا متعددة',
      'بناء طابع لوني خاص يميز العلامة التجارية',
    ],
    featuresEn: [
      'Exposure, white balance, and dynamic range correction',
      'Color matching across multi-camera shoots and angles',
      'Custom look development tailored to your brand palette',
    ],
    deliverables: ['معالجة لونية كاملة 10-bit', 'توحيد تدرج البشرة والإضاءة', 'إطارات مرجعية معتمدة'],
    deliverablesEn: ['Full 10-Bit Color Pipeline', 'Skin Tone & Lighting Consistency', 'Approved Look Reference Stills'],
  },
];
