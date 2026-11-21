import { PortfolioItem, AIShowcaseItem, Service } from './types';

/**
 * بيانات التواصل الرسمية لاستوديو f.cuts
 * لا توجد بيانات مخترعة؛ أضف البريد الإلكتروني ورقم الهاتف ورقم واتساب الحقيقيين هنا ليظهرا تلقائياً في الموقع والفوتر.
 */
export const contactInfo = {
  brandName: 'f.cuts',
  logoPath: '/assets/aistudio/image_6c7b35e0.png',
  email: '', // أضف البريد الإلكتروني الرسمي هنا، مثال: hello@fcuts.studio
  phone: '', // أضف رقم الهاتف الرسمي هنا، مثال: +966500000000
  whatsapp: '', // أضف رقم الواتساب بصيغة دولية بدون + مثل: 966500000000
  emailPlaceholder: 'يُضاف البريد الإلكتروني الرسمي هنا',
  phonePlaceholder: 'يُضاف رقم الهاتف الرسمي هنا',
  whatsappPlaceholder: 'يُضاف رقم واتساب الرسمي في الإعدادات',
};

/**
 * نماذج أعمال الاستوديو (Studio Showcase Demos)
 * قابلة للاستبدال المباشر بأعمال العملاء الفعلية وروابط الفيديو الحقيقية لاحقاً.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'نموذج عرض: فلوج سينمائي ليلي طويل',
    englishTitle: 'TOKYO NOCTURNE · LONG FORM DEMO',
    description:
      'نموذج عرض لمونتاج فلوج سفر طويل بأسلوب سينمائي متدرج. معالجة لونية دقيقة تبرز التباين بين السماوي والوردي تحت الإضاءة الليلية مع ضبط إيقاع المشاهد لرفع التفاعل.',
    category: 'youtube',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-man-with-headphones-40348-large.mp4',
    thumbnailUrl: 'placeholder:tokyo-cyber',
    duration: '04:15',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض استوديو f.cuts (قابل للتخصيص)',
    date: '2027',
    isDemo: true,
  },
  {
    id: '2',
    title: 'نموذج عرض: إعلان منتج إلكتروني إيقاعي',
    englishTitle: 'PRODUCT PULSE · COMMERCIAL DEMO',
    description:
      'نموذج إعلان تجاري يعتمد على التزامن الإيقاعي الدقيق والانتقالات الحركية الحادة، مع مؤثرات بصرية تبرز تفاصيل التصميم وجودة المنتج.',
    category: 'commercial',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-neon-camera-lens-revolving-around-itself-49488-large.mp4',
    thumbnailUrl: 'placeholder:aurapro-ad',
    duration: '01:00',
    softwareUsed: ['After Effects', 'Premiere Pro'],
    client: 'نموذج عرض تجاري f.cuts (قابل للتخصيص)',
    date: '2027',
    isDemo: true,
  },
  {
    id: '3',
    title: 'نموذج عرض: مقطع عمودي عالي الإيقاع 9:16',
    englishTitle: 'KINETIC SHORTS · 9:16 DEMO',
    description:
      'نموذج مونتاج فيديو قصير عالي الديناميكية لمنصات Reels وTikTok، يتضمن نصوصاً حركية واضحة وتقليص المساحات الميتة للحفاظ على تركيز المشاهد.',
    category: 'shorts',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-excited-influencer-creating-video-shorts-content-for-social-media-41804-large.mp4',
    thumbnailUrl: 'placeholder:shorts-kinetic',
    duration: '00:45',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض محتوى قصير f.cuts',
    date: '2027',
    isDemo: true,
  },
  {
    id: '5',
    title: 'نموذج عرض: إعلان واجهة تطبيق رقمي 3D',
    englishTitle: 'INTERFACE MOTION · COMMERCIAL DEMO',
    description:
      'نموذج فيديو تسويقي يمزج تحريك واجهات التطبيق ثلاثية الأبعاد مع لقطات حية سريعة التتابع لإيصال فكرة المنتج بوضوح بصري عالٍ.',
    category: 'commercial',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-on-a-computer-43093-large.mp4',
    thumbnailUrl: 'placeholder:focuslist-ui',
    duration: '01:30',
    softwareUsed: ['After Effects', 'Premiere Pro', 'Photoshop'],
    client: 'نموذج عرض تقني f.cuts',
    date: '2027',
    isDemo: true,
  },
  {
    id: '6',
    title: 'نموذج عرض: حلقة يوتيوب طويلة متعددة الكاميرات',
    englishTitle: 'ALPINE DRIFT · LONG FORM DEMO',
    description:
      'نموذج مونتاج حلقات طويلة يجمع لقطات الدرون والكاميرات الأرضية مع تثبيت الحركة وتصحيح التباين اللوني وبناء تسلسل قصصي متدفق.',
    category: 'youtube',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-video-editor-using-a-keyboard-and-mouse-40332-large.mp4',
    thumbnailUrl: 'placeholder:swiss-aerial',
    duration: '08:12',
    softwareUsed: ['Premiere Pro', 'After Effects'],
    client: 'نموذج عرض Long Form f.cuts',
    date: '2027',
    isDemo: true,
  },
];

/**
 * معرض أعمال الذكاء الاصطناعي (AI Showcase)
 */
export const aiShowcaseItems: AIShowcaseItem[] = [
  {
    id: 'ai-1',
    title: 'تصور بصري: حملة إطلاق منتج فاخر بالذكاء الاصطناعي',
    subtitle: 'توليد مشاهد إعلانية كاملة بالذكاء الاصطناعي',
    description:
      'نموذج إنتاج إعلان بصري متكامل باستخدام مشاهد مولدة بالذكاء الاصطناعي مع معالجة الإضاءة السينمائية ودمج اللقطات في تايم لاين إبداعي متناسق.',
    category: 'ai-commercial',
    thumbnailUrl: 'placeholder:ai-perfume',
    duration: '00:38',
    aspectRatio: '16:9',
    aiTools: ['Generative Video AI', 'After Effects', 'Premiere Pro'],
    deliverables: ['نسخة رئيسية 4K 16:9', 'نسخ ترويجية عمودية 9:16', 'إطارات مرجعية للحملة'],
    workflowNotes:
      'تم بناء المشاهد الأساسية عبر توليد إطارات مرجعية متسقة الهوية، ثم تحويلها إلى لقطات متحركة ودمجها مع مؤثرات إضاءة وتصحيح لوني موحد.',
    year: '2027',
  },
  {
    id: 'ai-2',
    title: 'دمج بيئات افتراضية لمحتوى تقني',
    subtitle: 'عزل ذكي وخلفيات 3D مولدة بالذكاء الاصطناعي',
    description:
      'تحويل تصوير استوديو بسيط إلى بيئة مستقبلية غامرة باستخدام العزل الذكي وتوسيع الخلفية وإعادة توزيع الإضاءة.',
    category: 'ai-vfx',
    thumbnailUrl: 'placeholder:ai-virtual-set',
    duration: '06:20',
    aspectRatio: '16:9',
    aiTools: ['AI Rotoscoping', 'After Effects', 'Generative Fill'],
    deliverables: ['حلقة يوتيوب Long Form كاملة', 'مشاهد انتقال ثلاثية الأبعاد', 'غلاف مخصص للحلقة'],
    workflowNotes:
      'استبدال الخلفية دون شاشة خضراء مع مطابقة درجة حرارة اللون وظلال الإضاءة بين المقدم والبيئة الافتراضية.',
    year: '2027',
  },
  {
    id: 'ai-3',
    title: 'سلسلة ريلز بتحريك النصوص الذكي',
    subtitle: 'محتوى قصير مدعوم بالقص والتحريك التلقائي',
    description:
      'إنتاج حزمة مقاطع قصيرة مع استخراج أبرز اللقطات وإضافة رسوم توضيحية مولدة وتنسيق نصي ديناميكي متزامن.',
    category: 'ai-shortform',
    thumbnailUrl: 'placeholder:ai-reels-pack',
    duration: '00:52',
    aspectRatio: '9:16',
    aiTools: ['Auto-Reframe AI', 'Smart Captions', 'Premiere Pro'],
    deliverables: ['6 مقاطع عمودية جاهزة للنشر', 'خطوط وعناوين موحدة للهوية', 'ملفات ترجمة مدمجة'],
    workflowNotes:
      'تركيز الكادر تلقائياً على المتحدث والمنتج مع توليد لقطات B-Roll توضيحية بالذكاء الاصطناعي لرفع وضوح الشرح.',
    year: '2027',
  },
  {
    id: 'ai-4',
    title: 'مفهوم بصري مستقبلي لتحريك الصور الثابتة',
    subtitle: 'تحويل الصور الفوتوغرافية إلى مشاهد سينمائية',
    description:
      'تحريك جلسة تصوير فوتوغرافية ثابتة وإضافة حركة كاميرا سينمائية وضباب محيطي وتفاصيل حركة ناعمة بتقنيات توليد الفيديو الحديثة.',
    category: 'ai-visuals',
    thumbnailUrl: 'placeholder:ai-fashion-motion',
    duration: '00:28',
    aspectRatio: '1:1',
    aiTools: ['Image-to-Video AI', 'Upscaling 4K', 'Premiere Pro'],
    deliverables: ['نسخة مربعة لمنصات التواصل 1:1', 'نسخة ستوري 9:16', 'ترقية دقة 4K'],
    workflowNotes:
      'حافظنا على ملامح وتفاصيل المنتج الأصلية من الصور الفوتوغرافية مع توليد حركة كاميرا بطيئة وسلسة.',
    year: '2027',
  },
  {
    id: 'ai-5',
    title: 'ترجمة ودبلجة متزامنة لمحتوى تعليمي',
    subtitle: 'توطين المحتوى وحركة الشفاه بالذكاء الاصطناعي',
    description:
      'تحويل فيديو تعريفي بين العربية والإنجليزية مع الحفاظ على نبرة الصوت الأصلية ومزامنة حركة الشفاه والنصوص التوضيحية.',
    category: 'ai-vfx',
    thumbnailUrl: 'placeholder:ai-dubbing-sync',
    duration: '03:45',
    aspectRatio: '16:9',
    aiTools: ['AI Voice & Lip-Sync', 'After Effects', 'Premiere Pro'],
    deliverables: ['نسخة عربية وإنجليزية متزامنة', 'تعريب كافة الرسوم البيانية', 'ملفات SRT'],
    workflowNotes:
      'إعادة مزامنة النصوص والرسوم المدمجة داخل الفيديو بحيث تبدو النسخة المترجمة متكاملة بصرياً.',
    year: '2027',
  },
  {
    id: 'ai-6',
    title: 'فواصل بصرية مولدة لقنوات البودكاست',
    subtitle: 'هوية انتقالية ثلاثية الأبعاد بتكلفة إنتاج رشيقة',
    description:
      'تصميم مقاطع انتقالية تعبر عن موضوع كل فقرة في البودكاست باستخدام نماذج التوليد البصري والمونتاج الإيقاعي.',
    category: 'ai-commercial',
    thumbnailUrl: 'placeholder:ai-podcast-visuals',
    duration: '01:15',
    aspectRatio: '16:9',
    aiTools: ['Generative Visuals', 'After Effects', 'Premiere Pro'],
    deliverables: ['8 فواصل موضوعية متناسقة', 'إنترو متجدد للقناة', 'قوالب عناوين ذكية'],
    workflowNotes:
      'دمج الأسلوب الجرافيكي باللون الأسود والسماوي والوردي في كل مشهد لضمان وحدة الهوية البصرية.',
    year: '2027',
  },
];

export const services: Service[] = [
  {
    id: 'long-form',
    number: '01',
    title: 'تصميم ومونتاج فيديوهات Long Form',
    englishTitle: 'Long Form Video Editing',
    shortTag: 'CORE SPECIALTY · YOUTUBE & PODCASTS',
    description:
      'نبني تجربة مشاهدة متماسكة للفيديوهات الطويلة على يوتيوب والبودكاست والمحتوى المعرفي. هندسة سردية متدرجة، إيقاع مدروس، ودمج ذكي للقطات B-Roll يحافظ على انتباه المشاهد حتى النهاية.',
    visualType: 'longform',
    featured: true,
    accent: 'cyan',
    features: [
      'بناء هيكل قصصي مشوق ومقدمة خاطفة من الثواني الأولى',
      'تقسيم الفصول وإضافة فواصل بصرية وعناصر توضيحية متزنة',
      'معالجة نقاء الحوار وتوازن المستويات الصوتية طوال الحلقة',
      'تصدير نهائي مهيأ لمنصات البث بدقة 4K',
    ],
    deliverables: [
      'نسخة رئيسية 16:9 بدقة 4K',
      'مقاطع تشويقية مستخرجة للريلز',
      'ملف فصول يوتيوب وعناوين مقترحة',
    ],
  },
  {
    id: 'short-form',
    number: '02',
    title: 'مونتاج الفيديوهات القصيرة',
    englishTitle: 'Short Form Video Editing',
    shortTag: 'REELS · TIKTOK · SHORTS',
    description:
      'مقاطع عمودية سريعة الإيقاع مصممة لجذب الانتباه من الثانية الأولى، مع نصوص حركية متزامنة وانتقالات خاطفة تناسب طبيعة المشاهدة السريعة.',
    visualType: 'shortform',
    accent: 'magenta',
    features: [
      'قص مكثف وإزالة الفجوات الميتة لرفع ديناميكية المقطع',
      'نصوص تفاعلية متحركة بالعربية والإنجليزية',
      'ضبط التكوين الرأسي 9:16 ومناطق الأمان للمنصات',
    ],
    deliverables: ['نسخ 9:16 عالية الحدة', 'ملفات ترجمة مدمجة', 'أغلفة مصغرة للحسابات'],
  },
  {
    id: 'cinematic-editing',
    number: '03',
    title: 'المونتاج السينمائي',
    englishTitle: 'Cinematic Editing',
    shortTag: 'STORYTELLING · BRAND FILMS',
    description:
      'تحرير قصصي وبصري يركز على الإحساس والتوقيت السينمائي للحركات والانتقالات، مناسب لأفلام العلامات التجارية، الإعلانات الراقية، ومشاريع إطلاق المنتجات.',
    visualType: 'cinematic',
    accent: 'cyan',
    features: [
      'مواءمة اللقطات مع الإيقاع الموسيقي والحركة البصرية',
      'انتقالات سلسة ومؤثرات سرعة مدروسة (Speed Ramping)',
      'توجيه انتباه المشاهد نحو تفاصيل المنتج والرسالة',
    ],
    deliverables: ['فيلم العلامة الرئيسي 4K', 'نسخ مقصوصة للحملات الإعلانية', 'تصدير Master نظيف'],
  },
  {
    id: 'ai-video-creation',
    number: '04',
    title: 'إنتاج الفيديوهات بالذكاء الاصطناعي',
    englishTitle: 'AI Video Creation',
    shortTag: 'GENERATIVE PIPELINE · 2027',
    description:
      'توظيف نماذج الذكاء الاصطناعي التوليدية لإنشاء مشاهد مستقبلية، توسيع البيئات الافتراضية، وتحريك الصور الثابتة ودمجها بسلاسة مع المونتاج الاحترافي.',
    visualType: 'aivideo',
    accent: 'magenta',
    features: [
      'توليد مشاهد B-Roll وإعلانات مفاهيمية مبتكرة بالذكاء الاصطناعي',
      'العزل الذكي ودمج البيئات الرقمية بدون شاشة خضراء',
      'تحسين الدقة والترجمة البصرية المتزامنة',
    ],
    deliverables: ['مفاهيم بصرية مولدة مخصصة', 'دمج كامل في التايم لاين', 'نسخ متعددة الأبعاد'],
  },
  {
    id: 'color-grading',
    number: '05',
    title: 'تصحيح الألوان الاحترافي',
    englishTitle: 'Color Grading',
    shortTag: 'LOOK DESIGN · TONE BALANCE',
    description:
      'إضفاء هوية لونية نظيفة ومتوازنة على مشاهدك. توحيد ألوان الكاميرات المختلفة، معالجة الإضاءة الصعبة، وبناء مظهر سينمائي مريح للعين.',
    visualType: 'color',
    accent: 'cyan',
    features: [
      'تصحيح التعرض الضوئي وتوازن اللون الأبيض والديناميكية',
      'مطابقة اللقطات المأخوذة من كاميرات وزوايا متعددة',
      'بناء طابع لوني خاص يميز العلامة التجارية',
    ],
    deliverables: ['معالجة لونية كاملة 10-bit', 'توحيد تدرج البشرة والإضاءة', 'إطارات مرجعية معتمدة'],
  },
];
