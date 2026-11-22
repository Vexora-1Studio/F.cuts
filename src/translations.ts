import { Language } from './types';

export interface Translations {
  meta: {
    title: string;
  };
  header: {
    navAriaLabel: string;
    nav: {
      hero: string;
      services: string;
      portfolio: string;
      about: string;
    };
    cta: string;
    openMenu: string;
    closeMenu: string;
    switchToEnglish: string;
    switchToArabic: string;
    languageLabel: string;
  };
  hero: {
    studioTag: string;
    eraTag: string;
    headlineFirstWord: string;
    headlinePart1: string;
    headlinePart2: string;
    introBeforeBrand: string;
    introAfterBrand: string;
    introAfterLongForm: string;
    exploreBtn: string;
    startBtn: string;
    showreelBtn: string;
    disciplines: {
      uhdLabel: string;
      longFormLabel: string;
      aiLabel: string;
    };
    scrollToExplore: string;
    showreelModal: {
      dialogLabel: string;
      closeLabel: string;
      playLabel: string;
      pauseLabel: string;
      muteLabel: string;
      unmuteLabel: string;
      scrubberLabel: string;
      overlayTitle: string;
    };
  };
  services: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
    subtitle: string;
    hint: string;
    tracksCountSuffix: string;
    exploreCard: string;
    ctaPrompt: string;
    modal: {
      closeLabel: string;
      scopeTitle: string;
      deliverablesTitle: string;
      startWithService: string;
    };
  };
  portfolio: {
    eyebrow: string;
    headingPrefix: string;
    headingSuffix: string;
    subtitle: string;
    hint: string;
    categories: {
      all: string;
      youtube: string;
      commercial: string;
      shorts: string;
    };
    categoryLabels: {
      youtube: string;
      commercial: string;
      shorts: string;
      default: string;
    };
    playPreview: string;
    emptyState: string;
    showAllBtn: string;
    ctaPrompt: string;
    modal: {
      prevLabel: string;
      nextLabel: string;
      closeLabel: string;
      scopeLabel: string;
      releaseLabel: string;
      durationLabel: string;
      toolsLabel: string;
      orderSimilarBtn: string;
    };
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph1BeforeBrand: string;
    paragraph1AfterBrand: string;
    paragraph2: string;
    pillars: {
      privacy: string;
      deadlines: string;
      colorBalance: string;
      communication: string;
    };
    workflowTitlePrefix: string;
    workflowSubtitle: string;
    workflowTag: string;
    steps: Array<{
      num: string;
      title: string;
      desc: string;
    }>;
    ctaPrompt: string;
  };
  footer: {
    studioTag: string;
    description: string;
    quickNavTitle: string;
    links: {
      home: string;
      services: string;
      portfolio: string;
      about: string;
    };
    contactTitle: string;
    emailLabel: string;
    phoneLabel: string;
    whatsappBtn: string;
    whatsappDefaultMsg: string;
    copyrightBeforeBrand: string;
    backToTop: string;
  };
  sectionCTA: {
    defaultPrompt: string;
    buttonLabel: string;
  };
  errorBoundary: {
    message: string;
    reloadBtn: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    meta: {
      title: 'f.cuts – استوديو المونتاج الإبداعي والإنتاج بالذكاء الاصطناعي',
    },
    header: {
      navAriaLabel: 'التنقل الرئيسي',
      nav: {
        hero: 'الرئيسية',
        services: 'الخدمات',
        portfolio: 'معرض الأعمال',
        about: 'عن الاستوديو',
      },
      cta: 'ابدأ مشروعك',
      openMenu: 'فتح قائمة التنقل',
      closeMenu: 'إغلاق قائمة التنقل',
      switchToEnglish: 'التبديل إلى الإنجليزية',
      switchToArabic: 'التبديل إلى العربية',
      languageLabel: 'تغيير اللغة',
    },
    hero: {
      studioTag: 'F.CUTS STUDIO',
      eraTag: 'CREATIVE POST-PRODUCTION · 2027',
      headlineFirstWord: 'WE',
      headlinePart1: "DON'T JUST EDIT.",
      headlinePart2: 'WE CREATE IMPACT.',
      introBeforeBrand: 'استوديو',
      introAfterBrand:
        'للإخراج الرقمي والمونتاج الاحترافي — نجمع السرد السينمائي، تصميم فيديوهات',
      introAfterLongForm: '، وتقنيات الذكاء الاصطناعي لصناعة تجربة بصرية لا تُنسى.',
      exploreBtn: 'استكشف أعمالنا',
      startBtn: 'ابدأ مشروعك',
      showreelBtn: 'SHOWREEL 2027',
      disciplines: {
        uhdLabel: 'معيار التصدير',
        longFormLabel: 'تخصص سردي متكامل',
        aiLabel: 'إنتاج بصري حديث',
      },
      scrollToExplore: 'اسحب للاستكشاف',
      showreelModal: {
        dialogLabel: 'عرض استوديو f.cuts 2027',
        closeLabel: 'إغلاق العرض',
        playLabel: 'تشغيل العرض',
        pauseLabel: 'إيقاف العرض مؤقتاً',
        muteLabel: 'كتم الصوت',
        unmuteLabel: 'تشغيل الصوت',
        scrubberLabel: 'شريط التمرير الزمني للعرض',
        overlayTitle: 'F.CUTS 2027 SHOWREEL',
      },
    },
    services: {
      eyebrow: '01 · CREATIVE SERVICES',
      headingPrefix: 'خدمات إنتاج بصري بمستوى',
      headingSuffix: '',
      subtitle:
        'خمس مسارات إبداعية متكاملة تجمع بين دقة المونتاج، سحر الألوان، وتوليد المحتوى بالذكاء الاصطناعي. اضغط على أي خدمة لاستعراض التفاصيل الكاملة.',
      hint: 'اضغط على أي بطاقة لاستعراض التفاصيل',
      tracksCountSuffix: 'مسارات تنفيذية',
      exploreCard: 'استعراض الخدمة',
      ctaPrompt: 'هل لديك مشروع جاهز وتبحث عن مسار مونتاج وإخراج يترك أثراً حقيقياً؟',
      modal: {
        closeLabel: 'إغلاق تفاصيل الخدمة',
        scopeTitle: 'نطاق التنفيذ',
        deliverablesTitle: 'المخرجات النهائية',
        startWithService: 'ابدأ مشروعك بهذه الخدمة',
      },
    },
    portfolio: {
      eyebrow: '02 · CINEMATIC PORTFOLIO · 2027',
      headingPrefix: 'نماذج عرض بهوية',
      headingSuffix: 'السينمائية',
      subtitle:
        'مشاريع عرض تفاعلية تبرز إمكاناتنا في قوة السرد، دقة التقطيع، والمعالجة البصرية في اليوتيوب، الإعلانات، والمحتوى العمودي السريع.',
      hint: '4K UHD · مشغّل تفاعلي بملء الشاشة',
      categories: {
        all: 'الكل',
        youtube: 'فيديوهات يوتيوب',
        commercial: 'إعلانات تجارية',
        shorts: 'فيديوهات قصيرة',
      },
      categoryLabels: {
        youtube: 'يوتيوب',
        commercial: 'إعلان تجاري',
        shorts: 'فيديوهات قصيرة',
        default: 'مونتاج مخصص',
      },
      playPreview: 'تشغيل ومعاينة كاملة',
      emptyState: 'لا توجد مشاريع في هذا التصنيف حالياً',
      showAllBtn: 'عرض جميع الأعمال',
      ctaPrompt: 'هل أعجبك أحد الأساليب المعروضة وتريد تنفيذ مونتاج مشابه لمحتواك؟',
      modal: {
        prevLabel: 'المشروع السابق',
        nextLabel: 'المشروع التالي',
        closeLabel: 'إغلاق المعاينة',
        scopeLabel: 'النطاق',
        releaseLabel: 'الإصدار',
        durationLabel: 'مدة النموذج',
        toolsLabel: 'الأدوات المستخدمة',
        orderSimilarBtn: 'اطلب مونتاجاً مشابهاً لمشروعك',
      },
    },
    about: {
      eyebrow: '03 · ABOUT F.CUTS STUDIO',
      heading: 'شغف بالتفاصيل الدقيقة ورؤية تجمع بين السينما والتقنية',
      paragraph1BeforeBrand: 'في',
      paragraph1AfterBrand:
        'لا نتعامل مع الفيديو كملفات عابرة، بل كوسيلة متكاملة لنقل الفكرة وبناء الثقة مع الجمهور. ندمج مهارات المونتاج الكلاسيكي مع أدوات الذكاء الاصطناعي الحديثة لتقديم مخرجات نظيفة وعصرية.',
      paragraph2:
        'سواء كنت صانع محتوى يطمح لرفع جودة قناته على يوتيوب أو علامة تجارية تبحث عن إعلان يبرز منتجاتها بوضوح، نعمل معك خطوة بخطوة حتى الوصول للنتيجة المثالية.',
      pillars: {
        privacy: 'حفظ كامل لخصوصية الملفات الخام',
        deadlines: 'التزام دقيق بمواعيد التسليم',
        colorBalance: 'تدرجات لونية متوازنة ومريحة للعين',
        communication: 'تواصل مرن ومراجعات منظمة',
      },
      workflowTitlePrefix: 'منهجية العمل في',
      workflowSubtitle: 'أربع خطوات واضحة تضمن سلاسة التواصل وجودة التنفيذ في كل مشروع.',
      workflowTag: 'WORKFLOW · 04 STEPS',
      steps: [
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
      ],
      ctaPrompt: 'جاهز للبدء وفق منهجية f.cuts خطوة بخطوة لإنجاز مشروعك؟',
    },
    footer: {
      studioTag: 'CREATIVE STUDIO',
      description:
        'استوديو متخصص في خدمات المونتاج الاحترافي، تصميم فيديوهات Long Form، تصحيح الألوان، والمشاريع البصرية المعتمدة على الذكاء الاصطناعي.',
      quickNavTitle: 'الأقسام الرئيسية',
      links: {
        home: 'الرئيسية',
        services: 'خدمات المونتاج',
        portfolio: 'معرض الأعمال',
        about: 'عن الاستوديو',
      },
      contactTitle: 'بيانات التواصل',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'رقم الهاتف',
      whatsappBtn: 'تواصل عبر واتساب',
      whatsappDefaultMsg: 'مرحباً فريق f.cuts، أود الاستفسار عن مشروع مونتاج جديد.',
      copyrightBeforeBrand: 'جميع الحقوق محفوظة © 2027',
      backToTop: 'العودة للأعلى',
    },
    sectionCTA: {
      defaultPrompt: 'هل لديك مشروع جاهز وتبحث عن إخراج ومونتاج يترك أثراً حقيقياً؟',
      buttonLabel: 'تواصل معنا',
    },
    errorBoundary: {
      message: 'حدث خطأ غير متوقع أثناء تحميل الصفحة. يرجى إعادة المحاولة.',
      reloadBtn: 'إعادة تحميل الموقع',
    },
  },
  en: {
    meta: {
      title: 'f.cuts – Creative Video Editing & AI Production Studio',
    },
    header: {
      navAriaLabel: 'Primary Navigation',
      nav: {
        hero: 'Home',
        services: 'Services',
        portfolio: 'Portfolio',
        about: 'About',
      },
      cta: 'START A PROJECT',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      switchToEnglish: 'Switch to English',
      switchToArabic: 'Switch to Arabic',
      languageLabel: 'Switch language',
    },
    hero: {
      studioTag: 'F.CUTS STUDIO',
      eraTag: 'CREATIVE POST-PRODUCTION · 2027',
      headlineFirstWord: 'WE',
      headlinePart1: "DON'T JUST EDIT.",
      headlinePart2: 'WE CREATE IMPACT.',
      introBeforeBrand: '',
      introAfterBrand:
        'is a creative post-production and video editing studio—blending cinematic storytelling,',
      introAfterLongForm:
        'video design, and generative AI pipelines to craft unforgettable visual experiences.',
      exploreBtn: 'EXPLORE OUR WORK',
      startBtn: 'START A PROJECT',
      showreelBtn: 'SHOWREEL 2027',
      disciplines: {
        uhdLabel: 'Export Standard',
        longFormLabel: 'Narrative Specialty',
        aiLabel: 'Modern Visual Pipeline',
      },
      scrollToExplore: 'SCROLL TO EXPLORE',
      showreelModal: {
        dialogLabel: 'f.cuts 2027 Showreel',
        closeLabel: 'Close showreel',
        playLabel: 'Play showreel',
        pauseLabel: 'Pause showreel',
        muteLabel: 'Mute showreel',
        unmuteLabel: 'Unmute showreel',
        scrubberLabel: 'Showreel timeline scrubber',
        overlayTitle: 'F.CUTS 2027 SHOWREEL',
      },
    },
    services: {
      eyebrow: '01 · CREATIVE SERVICES',
      headingPrefix: 'Visual Production Services by',
      headingSuffix: '',
      subtitle:
        'Five specialized creative tracks uniting precision editing, balanced color grading, and generative AI production. Select any service card to explore its full breakdown.',
      hint: 'CLICK ANY CARD FOR BREAKDOWN',
      tracksCountSuffix: 'execution tracks',
      exploreCard: 'Explore Service',
      ctaPrompt: 'Have a project ready and looking for editing and direction that leaves a real impact?',
      modal: {
        closeLabel: 'Close service details',
        scopeTitle: 'Execution Scope',
        deliverablesTitle: 'Final Deliverables',
        startWithService: 'Start Your Project with This Service',
      },
    },
    portfolio: {
      eyebrow: '02 · CINEMATIC PORTFOLIO · 2027',
      headingPrefix: 'Showcase Works in the',
      headingSuffix: 'Cinematic Signature',
      subtitle:
        'Interactive showcase projects demonstrating our craft in narrative pacing, sharp cutting, and visual grading across YouTube, commercials, and vertical short-form.',
      hint: '4K UHD · FULLSCREEN INTERACTIVE PLAYER',
      categories: {
        all: 'All',
        youtube: 'YouTube Videos',
        commercial: 'Commercials',
        shorts: 'Short Form',
      },
      categoryLabels: {
        youtube: 'YouTube',
        commercial: 'Commercial',
        shorts: 'Short Form',
        default: 'Custom Edit',
      },
      playPreview: 'Play & Full Preview',
      emptyState: 'No projects found in this category yet',
      showAllBtn: 'View All Works',
      ctaPrompt: 'Liked one of the styles above and want a similar edit tailored to your content?',
      modal: {
        prevLabel: 'Previous project',
        nextLabel: 'Next project',
        closeLabel: 'Close preview',
        scopeLabel: 'Scope',
        releaseLabel: 'Release',
        durationLabel: 'Duration',
        toolsLabel: 'Tools Used',
        orderSimilarBtn: 'Request a Similar Edit',
      },
    },
    about: {
      eyebrow: '03 · ABOUT F.CUTS STUDIO',
      heading: 'Obsession with Precision & Vision Blending Cinema with Tech',
      paragraph1BeforeBrand: 'At',
      paragraph1AfterBrand:
        'we never treat footage as disposable files—it is a complete medium to communicate ideas and earn audience trust. We pair classic editorial discipline with modern AI tools to deliver clean, contemporary results.',
      paragraph2:
        'Whether you are a creator elevating your YouTube channel or a brand launching a standout product campaign, we collaborate with you step by step until every frame hits the mark.',
      pillars: {
        privacy: 'Full confidentiality of raw footage',
        deadlines: 'Strict adherence to delivery schedules',
        colorBalance: 'Balanced, eye-friendly color grading',
        communication: 'Flexible communication & structured reviews',
      },
      workflowTitlePrefix: 'Workflow at',
      workflowSubtitle: 'Four transparent stages ensuring smooth communication and consistent quality on every project.',
      workflowTag: 'WORKFLOW · 04 STEPS',
      steps: [
        {
          num: '01',
          title: 'Footage Intake & Creative Direction',
          desc: 'Share your raw footage and project brief via cloud link so we can review the material and map out the ideal pacing.',
        },
        {
          num: '02',
          title: 'Assembly Cut & Narrative Pacing',
          desc: 'We trim dead air and structure scenes into a compelling story arc that serves the message and holds viewer attention.',
        },
        {
          num: '03',
          title: 'Color Grading & Motion Graphics',
          desc: 'We unify exposure and cinematic color, then layer kinetic typography, visual effects, and clean audio mixing.',
        },
        {
          num: '04',
          title: 'Review Rounds & Final 4K Delivery',
          desc: 'We share a review cut for frame-accurate feedback, then deliver your final 4K master ready for immediate publishing.',
        },
      ],
      ctaPrompt: 'Ready to launch your project step by step with the f.cuts workflow?',
    },
    footer: {
      studioTag: 'CREATIVE STUDIO',
      description:
        'A studio specializing in professional video editing, Long Form video design, color grading, and AI-powered visual production.',
      quickNavTitle: 'Main Sections',
      links: {
        home: 'Home',
        services: 'Services',
        portfolio: 'Portfolio',
        about: 'About Studio',
      },
      contactTitle: 'Contact Details',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone Number',
      whatsappBtn: 'Chat on WhatsApp',
      whatsappDefaultMsg: 'Hi f.cuts team, I would like to inquire about a new video editing project.',
      copyrightBeforeBrand: 'All rights reserved © 2027',
      backToTop: 'Back to Top',
    },
    sectionCTA: {
      defaultPrompt: 'Have a project ready and looking for editing and direction that leaves a real impact?',
      buttonLabel: 'Contact Us',
    },
    errorBoundary: {
      message: 'An unexpected error occurred while loading the page. Please try again.',
      reloadBtn: 'Reload Site',
    },
  },
};
