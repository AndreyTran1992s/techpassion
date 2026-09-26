'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, QuickNote } from '@/lib/api';

export type Language = 'en' | 'vi' | 'zh';

export interface LocalizedEbook {
  title: string;
  slug: string;
  author: string;
  description: string;
  cover_image: string;
  pdf_stream_url: string;
  is_official_link: boolean;
  license_type: string;
  file_size: string;
  category_tag: string;
  download_count: number;
}

export interface LocalizedService {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  price_display: string;
  features: string[];
}

export const UI_DICTIONARY = {
  en: {
    // Top bar & Header
    latestNews: 'LATEST NEWS',
    breakingNews: 'BREAKING NEWS',
    searchPlaceholder: 'Search breaking news, articles...',
    archConsulting: 'Architecture & Consulting',
    archSubtitle: 'System Architecture & Custom Web Engineering',
    contactUs: 'Contact Us',
    tricks: 'TRICKS',
    tips: 'TIPS',
    ebooks: 'E-BOOKS',
    services: 'SERVICES',
    admin: 'Admin',
    languageLabel: 'Language',

    // Homepage
    aiAndProgramming: 'AI & PROGRAMMING',
    all: 'ALL',
    aiEngineering: 'AI ENGINEERING',
    architecture: 'ARCHITECTURE',
    readMore: 'READ MORE',
    minRead: 'min read',
    views: 'views',
    byAuthor: 'By',
    recentPosts: 'RECENT POSTS',
    loadMorePosts: 'LOAD MORE POSTS',
    popular: 'POPULAR',
    hackingAndSecurity: 'HACKING & SECURITY',
    corePillars12: '12 CORE TECH PILLARS',
    designAndDev: 'DESIGN & DEVELOPMENT',
    testingAndQa: 'TESTING & QA AUTOMATION',
    securityAndDevsecops: 'SECURITY & DEVSECOPS',

    // Category & Sub-category pages
    corePillarBadge: 'Core Technology Pillar',
    specializedTopicBadge: 'Specialized Topic',
    subCategoriesLabel: 'Sub-categories:',
    filterTopicLabel: 'Filter topic:',
    noArticlesTitle: 'No articles published in this category yet',
    noArticlesDesc: 'New engineering articles for this section are currently being prepared by our editorial team.',
    readArticle: 'Read Article',

    // Article Reader
    breakingBadge: 'BREAKING',
    softwareEngineer: 'Software Engineer',
    keyTakeaways: 'Key Takeaways',
    keyTakeawaysDesc: 'Production-focused engineering insights designed for scalable software architecture and real-world developer workflows.',
    copy: 'Copy',
    copied: 'Copied',
    topics: 'Topics:',

    // Tricks Page
    tricksBreadcrumb: 'Command-Line & IDE Tricks',
    tricksBadge: 'Pillar 10: Tricks',
    tricksTitle: 'Developer Power Tricks & Snippets',
    tricksDesc: 'High-impact, copy-ready command-line snippets and shortcuts for Git, Docker, VS Code, Linux/Windows terminals, and DevOps workflows.',
    filterByTool: 'Filter by tool:',
    allTools: 'All Tools',
    helpful: 'helpful',

    // Tips Page
    tipsBreadcrumb: 'Engineering Tips & Wisdom',
    tipsBadge: 'Pillar 11: Tips',
    tipsTitle: 'Software Engineering Principles & Career Wisdom',
    tipsDesc: 'Distilled best practices, architectural mental models, and career advice for software engineers and technical leaders.',
    endorsements: 'endorsements',

    // E-Books Page
    ebooksBreadcrumb: 'E-Books Library',
    ebooksBadge: 'Pillar 12: E-Books',
    ebooksTitle: 'Technical E-Books & Architecture Library (PDF)',
    ebooksDesc: 'Curated collection of essential software engineering, distributed systems, cybersecurity, and SRE books from official and open-access publishers.',
    readDownloadPdf: 'Read / Download PDF',

    // Product & Services Page
    servicesBreadcrumb: 'Product & Services',
    servicesBadge: 'Pillar 9: Product & Services',
    servicesTitle: 'Engineering Products & Consulting Services',
    servicesDesc: 'Partnering with startups and engineering teams on software architecture, security audits, and production-grade web application development.',
    keyDeliverables: 'Key Deliverables:',
    requestConsultation: 'Request Consultation',
    guarantee1Title: 'Deep Technical Expertise',
    guarantee1Desc: 'Proven large-scale system architecture',
    guarantee2Title: 'Strict Confidentiality',
    guarantee2Desc: 'Full NDA protection for all source code',
    guarantee3Title: '24-Hour Response SLA',
    guarantee3Desc: 'Direct 1-on-1 engineering consultation',
    inquiryFormTitle: 'Submit a Direct Consultation Inquiry',
    inquiryFormDesc: 'Your project details are encrypted and stored securely. Our lead engineer will respond within 24 hours.',
    inquirySuccessTitle: 'Inquiry Submitted Successfully!',
    inquirySuccessDesc: 'Thank you for reaching out. We will contact you via email or phone within 24 hours.',
    fullNameLabel: 'Full Name *',
    workEmailLabel: 'Work Email *',
    phoneLabel: 'Phone Number (Optional)',
    servicePackageLabel: 'Service Package',
    projectScopeLabel: 'Project Scope & Technical Requirements *',
    projectScopePlaceholder: 'Briefly describe your system architecture goals, performance challenges, or project timeline...',
    sendConsultationBtn: 'Send Consultation Request',
    submittingBtn: 'Submitting...',

    // Footer
    aboutTitle: 'ABOUT TECH PASSION',
    aboutDesc: 'A dedicated technology media & engineering knowledge platform featuring deep-dive software architecture, AI engineering, application security, automated testing, and curated E-Books for Software Engineers.',
    contactFormTitle: 'CONTACT FORM',
    contactSuccessMsg: 'Message sent successfully! We will get back to you shortly.',
    nameLabel: 'Name *',
    emailLabel: 'Email *',
    messageLabel: 'Message *',
    sendBtn: 'SEND',
    techSilosTitle: 'TECH SILOS & SERVICES',
    techSilosSubtitle: 'System Architecture & Custom Engineering',
    viewDetails: 'View Details',
    popularPostsTitle: 'POPULAR POSTS',
    adminPortal: 'Admin Portal',
  },
  vi: {
    // Top bar & Header
    latestNews: 'TIN MỚI NHẤT',
    breakingNews: 'TIN NÓNG IT',
    searchPlaceholder: 'Tìm kiếm tin nóng, bài viết...',
    archConsulting: 'Kiến trúc & Tư vấn',
    archSubtitle: 'Tư vấn Kiến trúc Hệ thống & Phát triển Web',
    contactUs: 'Liên hệ',
    tricks: 'THỦ THUẬT',
    tips: 'BÍ QUYẾT',
    ebooks: 'SÁCH E-BOOK',
    services: 'DỊCH VỤ',
    admin: 'Quản trị',
    languageLabel: 'Ngôn ngữ',

    // Homepage
    aiAndProgramming: 'AI & LẬP TRÌNH',
    all: 'TẤT CẢ',
    aiEngineering: 'KỸ THUẬT AI',
    architecture: 'KIẾN TRÚC',
    readMore: 'ĐỌC TIẾP',
    minRead: 'phút đọc',
    views: 'lượt xem',
    byAuthor: 'Bởi',
    recentPosts: 'BÀI VIẾT MỚI NHẤT',
    loadMorePosts: 'XEM TẤT CẢ BÀI VIẾT',
    popular: 'PHỔ BIẾN',
    hackingAndSecurity: 'HACKING & BẢO MẬT',
    corePillars12: '12 CHUYÊN MỤC TRỤ CỘT',
    designAndDev: 'THIẾT KẾ & PHÁT TRIỂN WEB',
    testingAndQa: 'KIỂM THỬ & TỰ ĐỘNG HÓA QA',
    securityAndDevsecops: 'BẢO MẬT & DEVSECOPS',

    // Category & Sub-category pages
    corePillarBadge: 'Chuyên Mục Cốt Lõi',
    specializedTopicBadge: 'Phân Loại Chuyên Sâu',
    subCategoriesLabel: 'Danh mục con:',
    filterTopicLabel: 'Lọc chuyên đề:',
    noArticlesTitle: 'Chưa có bài viết trong chuyên mục này',
    noArticlesDesc: 'Nội dung kỹ thuật chuyên sâu cho mục này đang được đội ngũ biên tập và sẽ xuất bản sớm nhất.',
    readArticle: 'Đọc bài',

    // Article Reader
    breakingBadge: 'TIN NÓNG',
    softwareEngineer: 'Kỹ sư Phần mềm',
    keyTakeaways: 'Điểm Cốt Lõi',
    keyTakeawaysDesc: 'Kiến thức kỹ thuật thực chiến được thiết kế cho kiến trúc phần mềm mở rộng và quy trình phát triển chuyên nghiệp.',
    copy: 'Sao chép',
    copied: 'Đã chép',
    topics: 'Chủ đề:',

    // Tricks Page
    tricksBreadcrumb: 'Thủ thuật Dòng lệnh & IDE',
    tricksBadge: 'Chuyên mục 10: Tricks',
    tricksTitle: 'Thủ Thuật Phần Mềm & Công Cụ Lập Trình',
    tricksDesc: 'Tổng hợp các câu lệnh, phím tắt và thủ thuật thực chiến giúp tăng tốc làm việc với Git, Docker, VS Code, Terminal và DevOps.',
    filterByTool: 'Lọc theo công cụ:',
    allTools: 'Tất cả công cụ',
    helpful: 'hữu ích',

    // Tips Page
    tipsBreadcrumb: 'Lời khuyên & Kinh nghiệm Kỹ sư',
    tipsBadge: 'Chuyên mục 11: Tips',
    tipsTitle: 'Nguyên Lý Kỹ Thuật Phần Mềm & Kinh Nghiệm Nghề Nghiệp',
    tipsDesc: 'Đúc kết các nguyên tắc thiết kế mã sạch, tư duy kiến trúc hệ thống và lời khuyên phát triển sự nghiệp cho kỹ sư công nghệ.',
    endorsements: 'đồng tình',

    // E-Books Page
    ebooksBreadcrumb: 'Thư viện E-Books',
    ebooksBadge: 'Chuyên mục 12: E-Books',
    ebooksTitle: 'Thư Viện Sách Kỹ Thuật & Kiến Trúc Phần Mềm (PDF)',
    ebooksDesc: 'Tuyển chọn các đầu sách kinh điển về kiến trúc hệ thống phân tán, mã sạch, bảo mật ứng dụng web và Google SRE từ nguồn chính thống.',
    readDownloadPdf: 'Đọc / Tải Sách PDF',

    // Product & Services Page
    servicesBreadcrumb: 'Sản phẩm & Dịch vụ',
    servicesBadge: 'Chuyên mục 9: Product & Services',
    servicesTitle: 'Sản Phẩm Công Nghệ & Dịch Vụ Tư Vấn Kỹ Thuật',
    servicesDesc: 'Đồng hành cùng doanh nghiệp và startup trong việc tư vấn kiến trúc hệ thống, kiểm định bảo mật mã nguồn và phát triển ứng dụng web.',
    keyDeliverables: 'Hạng mục bàn giao:',
    requestConsultation: 'Đăng Ký Tư Vấn Gói Này',
    guarantee1Title: 'Chuyên Sâu Kỹ Thuật',
    guarantee1Desc: 'Kinh nghiệm thực chiến hệ thống lớn',
    guarantee2Title: 'Bảo Mật Tuyệt Đối',
    guarantee2Desc: 'Ký kết thỏa thuận bảo mật NDA',
    guarantee3Title: 'Phản Hồi Trong 24 Giờ',
    guarantee3Desc: 'Tư vấn trực tiếp 1-1 với kỹ sư trưởng',
    inquiryFormTitle: 'Gửi Yêu Cầu Tư Vấn Trực Tiếp',
    inquiryFormDesc: 'Thông tin dự án của bạn được mã hóa và lưu trữ an toàn. Kỹ sư phụ trách sẽ phản hồi trong vòng 24 giờ.',
    inquirySuccessTitle: 'Đã Gửi Yêu Cầu Tư Vấn Thành Công!',
    inquirySuccessDesc: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi qua email hoặc số điện thoại trong vòng 24 giờ tới.',
    fullNameLabel: 'Họ và Tên *',
    workEmailLabel: 'Email Liên Hệ *',
    phoneLabel: 'Số Điện Thoại / Zalo',
    servicePackageLabel: 'Gói Dịch Vụ Quan Tâm',
    projectScopeLabel: 'Nội Dung Yêu Cầu & Bài Toán Kỹ Thuật *',
    projectScopePlaceholder: 'Mô tả tóm tắt mục tiêu kiến trúc hệ thống, vấn đề hiệu năng hoặc tiến độ dự án của bạn...',
    sendConsultationBtn: 'Gửi Yêu Cầu Tư Vấn',
    submittingBtn: 'Đang gửi...',

    // Footer
    aboutTitle: 'VỀ TECH PASSION',
    aboutDesc: 'Cổng thông tin công nghệ & nền tảng tri thức kỹ thuật chuyên sâu về Kiến trúc phần mềm, AI, Bảo mật ứng dụng, Kiểm thử tự động và thư viện E-Books dành cho Software Engineers.',
    contactFormTitle: 'LIÊN HỆ NHANH',
    contactSuccessMsg: 'Đã gửi tin nhắn thành công! Chúng tôi sẽ phản hồi sớm nhất.',
    nameLabel: 'Họ tên *',
    emailLabel: 'Email *',
    messageLabel: 'Nội dung *',
    sendBtn: 'GỬI TIN NHẮN',
    techSilosTitle: 'CHUYÊN MỤC & DỊCH VỤ',
    techSilosSubtitle: 'Tư vấn Kiến trúc & Phát triển Hệ thống',
    viewDetails: 'Xem Chi Tiết',
    popularPostsTitle: 'BÀI VIẾT ĐỌC NHIỀU',
    adminPortal: 'Cổng Quản Trị',
  },
  zh: {
    // Top bar & Header
    latestNews: '最新快讯',
    breakingNews: '科技头条',
    searchPlaceholder: '搜索科技头条、技术文章...',
    archConsulting: '架构与技术咨询',
    archSubtitle: '企业级系统架构与高性能 Web 工程开发',
    contactUs: '联系我们',
    tricks: '极客技巧',
    tips: '工程心得',
    ebooks: '电子书库',
    services: '技术服务',
    admin: '管理后台',
    languageLabel: '语言',

    // Homepage
    aiAndProgramming: '人工智能与编程架构',
    all: '全部',
    aiEngineering: 'AI 工程化',
    architecture: '系统架构',
    readMore: '阅读全文',
    minRead: '分钟阅读',
    views: '次阅读',
    byAuthor: '作者：',
    recentPosts: '最新发布文章',
    loadMorePosts: '加载更多技术文章',
    popular: '热门榜单',
    hackingAndSecurity: '黑客技术与网络安全',
    corePillars12: '12 大核心技术专栏',
    designAndDev: '前端设计与全栈开发',
    testingAndQa: '自动化测试与质量工程',
    securityAndDevsecops: '网络安全与 DEVSECOPS',

    // Category & Sub-category pages
    corePillarBadge: '核心技术专栏',
    specializedTopicBadge: '深度细分领域',
    subCategoriesLabel: '子分类：',
    filterTopicLabel: '筛选专题：',
    noArticlesTitle: '该专栏暂无已发布文章',
    noArticlesDesc: '我们的技术编辑团队正在撰写该领域的深度工程实践文章，敬请期待。',
    readArticle: '阅读文章',

    // Article Reader
    breakingBadge: '重磅头条',
    softwareEngineer: '资深软件工程师',
    keyTakeaways: '核心要点摘要',
    keyTakeawaysDesc: '专注于生产环境的工程实践洞察，助力构建高可用、可扩展的现代软件架构。',
    copy: '复制代码',
    copied: '已复制',
    topics: '技术标签：',

    // Tricks Page
    tricksBreadcrumb: '命令行与 IDE 极客技巧',
    tricksBadge: '专栏 10：极客技巧 (Tricks)',
    tricksTitle: '开发者高效命令行与工具技巧库',
    tricksDesc: '精选 Git、Docker、VS Code、终端与 DevOps 高效命令片段，一键复制即用，成倍提升研发效率。',
    filterByTool: '按工具筛选：',
    allTools: '全部工具',
    helpful: '人觉得有用',

    // Tips Page
    tipsBreadcrumb: '软件工程准则与职业智慧',
    tipsBadge: '专栏 11：工程心得 (Tips)',
    tipsTitle: '软件工程最佳实践与架构师思维法则',
    tipsDesc: '浓缩整洁代码原则、高并发架构设计思维与软件工程师职业进阶指南。',
    endorsements: '次赞同',

    // E-Books Page
    ebooksBreadcrumb: '技术电子书库',
    ebooksBadge: '专栏 12：电子书库 (E-Books)',
    ebooksTitle: '计算机经典著作与架构电子书库 (PDF)',
    ebooksDesc: '精选分布式系统、整洁代码、Web 安全攻防与 Google SRE 可靠性工程官方正版与开源参考书目。',
    readDownloadPdf: '阅读 / 下载 PDF',

    // Product & Services Page
    servicesBreadcrumb: '产品与技术咨询服务',
    servicesBadge: '专栏 9：产品与服务 (Product & Services)',
    servicesTitle: '技术架构咨询与定制化全栈开发服务',
    servicesDesc: '为科技初创企业与研发团队提供系统架构设计、代码安全审计及高性能 Web 应用全周期开发。',
    keyDeliverables: '核心交付物：',
    requestConsultation: '预约该方案咨询',
    guarantee1Title: '深度架构专家',
    guarantee1Desc: '高并发分布式系统实战经验',
    guarantee2Title: '严格保密协议',
    guarantee2Desc: '全程签署 NDA 保障源码安全',
    guarantee3Title: '24 小时极速响应',
    guarantee3Desc: '首席架构师一对一直接沟通',
    inquiryFormTitle: '提交一对一技术咨询需求',
    inquiryFormDesc: '您的项目信息将经过安全加密存储，首席工程师将在 24 小时内与您取得联系。',
    inquirySuccessTitle: '咨询需求提交成功！',
    inquirySuccessDesc: '感谢您的信任！我们的技术团队将在 24 小时内通过邮件或电话与您联系。',
    fullNameLabel: '您的姓名 *',
    workEmailLabel: '工作邮箱 *',
    phoneLabel: '联系电话 / 微信',
    servicePackageLabel: '意向咨询服务包',
    projectScopeLabel: '项目背景与技术需求描述 *',
    projectScopePlaceholder: '请简要描述您的系统架构目标、性能瓶颈或项目开发周期需求...',
    sendConsultationBtn: '立即提交咨询请求',
    submittingBtn: '正在提交...',

    // Footer
    aboutTitle: '关于 TECH PASSION',
    aboutDesc: '面向软件工程师的个性化科技媒体与工程知识平台，涵盖软件架构深度解析、AI 工程化、应用安全、自动化测试与精选技术电子书库。',
    contactFormTitle: '快速联系我们',
    contactSuccessMsg: '消息发送成功！我们将尽快与您联系。',
    nameLabel: '姓名 *',
    emailLabel: '邮箱 *',
    messageLabel: '留言内容 *',
    sendBtn: '发送消息',
    techSilosTitle: '技术专栏与企业服务',
    techSilosSubtitle: '系统架构咨询与全栈定制开发',
    viewDetails: '查看详情',
    popularPostsTitle: '热门必读文章',
    adminPortal: '管理后台',
  },
};

export const CATEGORY_TRANSLATIONS: Record<
  string,
  { en: { name: string; desc: string }; vi: { name: string; desc: string }; zh: { name: string; desc: string } }
> = {
  'breaking-news': {
    en: { name: 'Breaking News', desc: 'Latest breaking technology & software engineering news' },
    vi: { name: 'Tin Nóng IT', desc: 'Tin tức công nghệ và kỹ thuật phần mềm nhanh & mới nhất' },
    zh: { name: '科技头条', desc: '最新全球科技动态与软件工程重磅快讯' },
  },
  ai: {
    en: { name: 'AI', desc: 'Artificial Intelligence, LLMs, RAG, and Agentic AI engineering' },
    vi: { name: 'AI', desc: 'Kỹ thuật phát triển Trí tuệ nhân tạo (AI), LLM, RAG và Agentic AI' },
    zh: { name: '人工智能 (AI)', desc: '大语言模型 (LLM)、RAG 检索增强与智能体工程实践' },
  },
  'design-development': {
    en: { name: 'Design & Development', desc: 'Software & web design, architecture, and full-stack development' },
    vi: { name: 'Thiết Kế & Phát Triển Web', desc: 'Thiết kế UI/UX, kiến trúc và phát triển ứng dụng Web Full-stack' },
    zh: { name: '设计与开发', desc: '现代 Web 视觉架构、UI/UX 设计系统与全栈开发' },
  },
  'website-design': {
    en: { name: 'Website Design', desc: 'Modern Website Design, UI/UX Systems & Visual Architecture' },
    vi: { name: 'Thiết Kế Website', desc: 'Thiết kế giao diện Website hiện đại, UI/UX & Design System' },
    zh: { name: '网站视觉设计', desc: '现代响应式网站设计、UI/UX 组件库与交互体验' },
  },
  'website-development': {
    en: { name: 'Website Development', desc: 'Frontend & Full-stack Web Engineering with modern frameworks' },
    vi: { name: 'Phát Triển Website', desc: 'Kỹ thuật lập trình Frontend & Full-stack hiệu năng cao' },
    zh: { name: '网站工程开发', desc: '基于 Next.js 与 Node.js 的高性能前端与全栈工程' },
  },
  programming: {
    en: { name: 'Programming', desc: 'Clean Architecture, Algorithms, Design Patterns & Software Craftsmanship' },
    vi: { name: 'Lập Trình', desc: 'Clean Architecture, Thuật toán, Design Patterns & Nghệ thuật viết mã sạch' },
    zh: { name: '核心编程', desc: '整洁架构、算法设计模式与高质量软件工程实践' },
  },
  'hacking-security': {
    en: { name: 'Hacking & Security', desc: 'Offensive Security, Ethical Hacking & Application Hardening' },
    vi: { name: 'Hacking & Bảo Mật', desc: 'Kỹ thuật Hacking mũ trắng, Pentesting và Bảo mật ứng dụng Web' },
    zh: { name: '黑客与安全', desc: '白帽渗透测试、漏洞挖掘与 Web 应用安全加固' },
  },
  hacking: {
    en: { name: 'Hacking', desc: 'Ethical Hacking, Penetration Testing & Vulnerability Research' },
    vi: { name: 'Kỹ Thuật Hacking', desc: 'Pentesting, Reverse Engineering & Nghiên cứu lỗ hổng bảo mật' },
    zh: { name: '渗透测试', desc: '道德黑客、逆向工程与安全漏洞深度剖析' },
  },
  security: {
    en: { name: 'Security', desc: 'Application Security, Web Defense, Zero-Trust & DevSecOps' },
    vi: { name: 'Bảo Mật Hệ Thống', desc: 'Bảo mật ứng dụng Web, phòng chống XSS/CSRF & DevSecOps' },
    zh: { name: '系统安全防御', desc: '零信任架构、CSP 防御策略与 DevSecOps 安全体系' },
  },
  testing: {
    en: { name: 'Testing', desc: 'End-to-End Automated Testing & Quality Assurance Engineering' },
    vi: { name: 'Kiểm Thử', desc: 'Kiểm thử phần mềm tự động E2E và quy trình đảm bảo chất lượng QA/QC' },
    zh: { name: '软件测试', desc: '端到端自动化测试与现代质量保障 (QA) 工程体系' },
  },
  'auto-testing': {
    en: { name: 'Auto Testing', desc: 'Automated Software Testing with Playwright, Cypress & CI/CD Pipelines' },
    vi: { name: 'Kiểm Thử Tự Động', desc: 'Tự động hóa kiểm thử E2E với Playwright, Cypress trong CI/CD' },
    zh: { name: '自动化测试', desc: '基于 Playwright 与 CI/CD 流水线的高速自动化测试' },
  },
  'manual-testing': {
    en: { name: 'Manual Testing', desc: 'Exploratory Testing, Test Case Design & QA Strategy' },
    vi: { name: 'Kiểm Thử Thủ Công', desc: 'Thiết kế kịch bản kiểm thử, Exploratory Testing & Chiến lược QA' },
    zh: { name: '探索式与手工测试', desc: '测试用例设计、边界分析与全流程质量验收标准' },
  },
  'seo-marketing': {
    en: { name: 'S.E.O/Marketing', desc: 'Technical SEO, Core Web Vitals & Tech Product Growth' },
    vi: { name: 'SEO / Marketing', desc: 'Kỹ thuật Technical SEO, tối ưu Core Web Vitals & Tiếp thị sản phẩm IT' },
    zh: { name: 'SEO 与增长营销', desc: '技术 SEO、Core Web Vitals 性能优化与科技产品增长' },
  },
  seo: {
    en: { name: 'S.E.O', desc: 'Technical SEO, Structured Data, On-page Optimization & CWV' },
    vi: { name: 'Tối Ưu S.E.O', desc: 'Technical SEO, Schema.org JSON-LD và tối ưu tốc độ tải trang' },
    zh: { name: '技术 SEO', desc: '结构化数据、搜索引擎抓取优化与页面性能调优' },
  },
  marketing: {
    en: { name: 'Marketing', desc: 'Developer Relations, Product Positioning & Tech Growth Marketing' },
    vi: { name: 'Tiếp Thị Công Nghệ', desc: 'Chiến lược tăng trưởng người dùng và định vị sản phẩm phần mềm' },
    zh: { name: '科技产品营销', desc: '开发者生态建设、产品定位与全渠道增长策略' },
  },
  'soft-skills': {
    en: { name: 'Soft Skills', desc: 'Engineering Leadership, Communication & Career Growth for Developers' },
    vi: { name: 'Kỹ Năng Mềm', desc: 'Kỹ năng giao tiếp, làm việc nhóm và lãnh đạo kỹ thuật cho lập trình viên' },
    zh: { name: '工程师软技能', desc: '技术领导力、跨团队沟通与研发职业生涯规划' },
  },
  tricks: {
    en: { name: 'Tricks', desc: 'Actionable Command-Line, Git, Docker & IDE Power Tricks' },
    vi: { name: 'Thủ Thuật (Tricks)', desc: 'Thủ thuật dòng lệnh Git, Docker, VS Code & Terminal cực nhanh' },
    zh: { name: '极客技巧', desc: 'Git、Docker、VS Code 与命令行高效快捷指令' },
  },
  tips: {
    en: { name: 'Tips', desc: 'Proven Software Engineering Principles & Career Wisdom' },
    vi: { name: 'Bí Quyết (Tips)', desc: 'Nguyên lý thiết kế phần mềm và kinh nghiệm xương máu cho kỹ sư' },
    zh: { name: '工程心得', desc: '资深架构师编程准则与研发避坑指南' },
  },
  'product-services': {
    en: { name: 'Product & Services', desc: 'System Architecture Consulting, Code Audits & Custom Web Engineering' },
    vi: { name: 'Sản Phẩm & Dịch Vụ', desc: 'Tư vấn kiến trúc hệ thống, kiểm định bảo mật và phát triển Web trọn gói' },
    zh: { name: '产品与技术服务', desc: '系统架构咨询、源码安全审计与全栈定制开发服务' },
  },
  ebooks: {
    en: { name: 'E-Books', desc: 'Curated Library of Official Software Engineering & Security E-Books' },
    vi: { name: 'Thư Viện E-Books', desc: 'Tuyển tập sách chuyên ngành Kiến trúc phần mềm, AI & Bảo mật (PDF)' },
    zh: { name: '电子书库', desc: '精选计算机架构、编程艺术与网络安全 PDF 电子书库' },
  },
};

export const POST_TRANSLATIONS: Record<
  string,
  {
    en: { title: string; summary: string; content: string };
    vi: { title: string; summary: string; content: string };
    zh: { title: string; summary: string; content: string };
  }
> = {
  'xay-dung-clean-architecture-nodejs-typescript': {
    en: {
      title: 'Building Production-Grade Clean Architecture with Node.js and TypeScript',
      summary: 'An in-depth guide to structuring Domain Entities, Use Cases, and Repositories for scalable enterprise Node.js systems.',
      content: `# Clean Architecture with Node.js and TypeScript\n\nIn modern software engineering, decoupling core business rules from external frameworks and databases is critical for long-term maintainability.\n\n\`\`\`typescript\nexport interface UserRepository {\n  findById(id: string): Promise<User | null>;\n  save(user: User): Promise<void>;\n}\n\`\`\`\n\n### Core Architectural Benefits\n1. Complete independence from UI layers and database engines.\n2. Effortless unit testing without complex infrastructure mocks.\n3. Sustainable scalability across multi-team engineering organizations.`,
    },
    vi: {
      title: 'Xây dựng Clean Architecture chuẩn mực với Node.js và TypeScript',
      summary: 'Phân tích chi tiết cách tổ chức Domain Entities, Use Cases và Repositories cho các hệ thống Node.js quy mô doanh nghiệp.',
      content: `# Clean Architecture với Node.js và TypeScript\n\nTrong kỹ thuật phần mềm hiện đại, việc tách biệt hoàn toàn Business Logic khỏi Framework và Database là yếu tố sống còn để duy trì hệ thống lâu dài.\n\n\`\`\`typescript\nexport interface UserRepository {\n  findById(id: string): Promise<User | null>;\n  save(user: User): Promise<void>;\n}\n\`\`\`\n\n### Lợi ích kiến trúc cốt lõi\n1. Độc lập hoàn toàn với tầng giao diện (UI) và hệ quản trị cơ sở dữ liệu.\n2. Dễ dàng viết Unit Test tốc độ cao mà không cần dựng hạ tầng thật.\n3. Mở rộng bền vững khi dự án phát triển lên hàng trăm tính năng.`,
    },
    zh: {
      title: '使用 Node.js 与 TypeScript 构建生产级整洁架构 (Clean Architecture)',
      summary: '深入解析如何在大型企业级 Node.js 系统中设计领域实体 (Entities)、用例 (Use Cases) 与仓储接口 (Repositories)。',
      content: `# Node.js 与 TypeScript 整洁架构实践\n\n在现代软件工程中，将核心业务逻辑与外部 Web 框架及数据库彻底解耦，是保障系统长期可维护性的关键。\n\n\`\`\`typescript\nexport interface UserRepository {\n  findById(id: string): Promise<User | null>;\n  save(user: User): Promise<void>;\n}\n\`\`\`\n\n### 核心架构优势\n1. 领域核心完全独立于 UI 层与数据库引擎。\n2. 无需复杂基础设施即可执行极速单元测试。\n3. 支撑多团队并行研发与系统长期平滑演进。`,
    },
  },
  'chien-luoc-kiem-thu-tu-dong-e2e-playwright': {
    en: {
      title: 'High-Velocity E2E Automated Testing with Playwright in CI/CD Pipelines',
      summary: 'How to architect parallelized Playwright E2E test suites on GitHub Actions with sub-3-minute execution times.',
      content: `# Playwright E2E Testing in CI/CD\n\nPlaywright has established itself as the gold standard for browser automation thanks to deterministic auto-waiting and isolated browser contexts.\n\n\`\`\`typescript\nimport { test, expect } from '@playwright/test';\n\ntest('homepage renders breaking news hero', async ({ page }) => {\n  await page.goto('http://localhost:3000');\n  await expect(page).toHaveTitle(/Tech Passion/);\n});\n\`\`\``,
    },
    vi: {
      title: 'Chiến lược Kiểm thử Tự động E2E với Playwright trong CI/CD Pipeline',
      summary: 'Cách thiết lập bộ kiểm thử tự động Playwright chạy song song trên GitHub Actions với thời gian thực thi dưới 3 phút.',
      content: `# Playwright E2E Testing trong CI/CD\n\nPlaywright đã trở thành công cụ tiêu chuẩn vàng cho Automation Testing nhờ cơ chế tự động chờ (Auto-waiting) và khả năng cô lập Browser Context siêu tốc.\n\n\`\`\`typescript\nimport { test, expect } from '@playwright/test';\n\ntest('homepage renders breaking news hero', async ({ page }) => {\n  await page.goto('http://localhost:3000');\n  await expect(page).toHaveTitle(/Tech Passion/);\n});\n\`\`\``,
    },
    zh: {
      title: '基于 Playwright 的 CI/CD 流水线高速端到端 (E2E) 自动化测试策略',
      summary: '如何在 GitHub Actions 中构建并行化的 Playwright 自动化测试集群，将回归测试执行时间缩短至 3 分钟以内。',
      content: `# CI/CD 流水线中的 Playwright 自动化测试\n\n凭借确定性自动等待机制与轻量级浏览器上下文隔离，Playwright 已成为现代前端与全栈自动化测试的行业黄金标准。\n\n\`\`\`typescript\nimport { test, expect } from '@playwright/test';\n\ntest('homepage renders breaking news hero', async ({ page }) => {\n  await page.goto('http://localhost:3000');\n  await expect(page).toHaveTitle(/Tech Passion/);\n});\n\`\`\``,
    },
  },
  'phong-ngua-lo-hong-xss-csrf-spa': {
    en: {
      title: 'Mitigating XSS & CSRF Vulnerabilities in Modern Single-Page Applications',
      summary: 'Defense-in-depth techniques for securing JWT tokens, enforcing strict Content Security Policy (CSP), and hardening SameSite cookies.',
      content: `# SPA Security: XSS & CSRF Prevention\n\nStoring raw session tokens in browser LocalStorage exposes web applications to severe token exfiltration if an XSS vector is triggered.\n\n\`\`\`http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m';\nSet-Cookie: token=jwt; HttpOnly; Secure; SameSite=Strict\n\`\`\``,
    },
    vi: {
      title: 'Phòng ngừa lỗ hổng bảo mật XSS & CSRF cho Single Page Application',
      summary: 'Các kỹ thuật phòng thủ chiều sâu giúp bảo vệ JWT token, thiết lập Content Security Policy (CSP) nghiêm ngặt và cấu hình Cookie SameSite an toàn.',
      content: `# Bảo mật SPA: Phòng chống XSS & CSRF\n\nViệc lưu trữ trực tiếp JWT Token trong LocalStorage khiến ứng dụng web đứng trước nguy cơ bị đánh cắp phiên đăng nhập ngay khi xuất hiện lỗ hổng XSS.\n\n\`\`\`http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m';\nSet-Cookie: token=jwt; HttpOnly; Secure; SameSite=Strict\n\`\`\``,
    },
    zh: {
      title: '现代单页应用 (SPA) 中的 XSS 与 CSRF 漏洞深度防御指南',
      summary: '保护 JWT 令牌、部署严格内容安全策略 (CSP) 以及加固 HttpOnly SameSite Cookie 的纵深安全防御技术。',
      content: `# SPA 安全加固：彻底防范 XSS 与 CSRF 攻击\n\n将敏感会话令牌直接存储在浏览器 LocalStorage 中极易受到跨站脚本 (XSS) 窃取攻击，生产环境应始终结合 HttpOnly Cookie 与严格 CSP 策略。\n\n\`\`\`http\nContent-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m';\nSet-Cookie: token=jwt; HttpOnly; Secure; SameSite=Strict\n\`\`\``,
    },
  },
  'deepseek-v3-xu-huong-ai-engineering-2026': {
    en: {
      title: 'DeepSeek-V3 & The Next Wave of Agentic AI Engineering in 2026',
      summary: 'Breakthroughs in Mixture-of-Experts (MoE) inference efficiency and how engineering teams integrate multi-agent workflows into production.',
      content: `# AI Engineering Trends in 2026\n\nHigh-efficiency open-weight Mixture-of-Experts (MoE) models are reshaping enterprise AI architecture with dramatic reductions in inference latency and cost.\n\n\`\`\`python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\n# Load high-throughput reasoning model\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V3")\n\`\`\``,
    },
    vi: {
      title: 'DeepSeek-V3 & Làn Sóng Phát Triển Agentic AI Engineering Năm 2026',
      summary: 'Đột phá về hiệu năng suy luận của kiến trúc Mixture-of-Experts (MoE) và cách các đội ngũ kỹ sư tích hợp hệ thống đa tác tử (Multi-Agent) vào thực tế.',
      content: `# Xu hướng AI Engineering năm 2026\n\nSự trỗi dậy của các mô hình Mixture-of-Experts (MoE) trọng số mở hiệu năng cao đang định hình lại kiến trúc AI doanh nghiệp với chi phí suy luận giảm mạnh.\n\n\`\`\`python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\n# Tải mô hình suy luận hiệu suất cao\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V3")\n\`\`\``,
    },
    zh: {
      title: 'DeepSeek-V3 与 2026 智能体工程 (Agentic AI Engineering) 技术浪潮',
      summary: '深入剖析混合专家模型 (MoE) 的推理效率突破，以及研发团队如何将多智能体工作流集成至企业生产环境。',
      content: `# 2026 AI 工程化核心趋势\n\n高吞吐量开源权重混合专家 (MoE) 模型正在重塑企业级 AI 基础设施，大幅降低推理延迟与算力成本。\n\n\`\`\`python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\n\n# 加载高性能推理模型\ntokenizer = AutoTokenizer.from_pretrained("deepseek-ai/DeepSeek-V3")\n\`\`\``,
    },
  },
};

const TRICKS_BY_LANG: Record<Language, QuickNote[]> = {
  en: [
    {
      type: 'TRICK',
      title: 'Undo the last Git commit while keeping all changes staged',
      code_snippet: 'git reset --soft HEAD~1',
      language: 'bash',
      explanation: 'Rewinds HEAD by one commit so you can amend your commit message or stage forgotten files without losing any work.',
      target_tool: 'Git',
      tags: ['git', 'version-control'],
      likes_count: 142,
    },
    {
      type: 'TRICK',
      title: 'Purge all unused Docker containers, images, and volumes in one command',
      code_snippet: 'docker system prune -a --volumes -f',
      language: 'bash',
      explanation: 'Instantly reclaims gigabytes of disk space occupied by dangling images and stopped containers.',
      target_tool: 'Docker',
      tags: ['docker', 'devops'],
      likes_count: 98,
    },
    {
      type: 'TRICK',
      title: 'Find and terminate a process occupying a port on Windows',
      code_snippet: 'netstat -ano | findstr :3000\ntaskkill /PID <PID> /F',
      language: 'powershell',
      explanation: 'Immediately resolves EADDRINUSE port conflicts when running local development servers.',
      target_tool: 'Windows',
      tags: ['windows', 'terminal'],
      likes_count: 85,
    },
    {
      type: 'TRICK',
      title: 'VS Code Multi-Cursor Box Selection & Batch Editing',
      code_snippet: 'Alt + Shift + Click (or Ctrl + Alt + Arrow Up/Down)',
      language: 'text',
      explanation: 'Place multiple cursors simultaneously to rename variables or edit column-aligned configuration blocks in seconds.',
      target_tool: 'VS Code',
      tags: ['vscode', 'productivity'],
      likes_count: 120,
    },
    {
      type: 'TRICK',
      title: 'Measure API response latency and inspect HTTP headers via cURL',
      code_snippet: 'curl -I -s -w "\\nTime: %{time_total}s\\n" https://api.example.com/health',
      language: 'bash',
      explanation: 'Benchmark endpoint response times directly from the terminal without opening Postman or a browser.',
      target_tool: 'cURL',
      tags: ['api', 'networking'],
      likes_count: 76,
    },
  ],
  vi: [
    {
      type: 'TRICK',
      title: 'Hoàn tác (Undo) Git commit gần nhất nhưng giữ nguyên toàn bộ code ở Staging',
      code_snippet: 'git reset --soft HEAD~1',
      language: 'bash',
      explanation: 'Giúp bạn lùi lại 1 commit để sửa lại nội dung commit message hoặc thêm file bị sót mà không làm mất dòng code nào.',
      target_tool: 'Git',
      tags: ['git', 'version-control'],
      likes_count: 142,
    },
    {
      type: 'TRICK',
      title: 'Dọn sạch toàn bộ Docker containers, images và volumes rác chỉ với 1 lệnh',
      code_snippet: 'docker system prune -a --volumes -f',
      language: 'bash',
      explanation: 'Giải phóng ngay lập tức hàng chục GB dung lượng ổ cứng bị chiếm dụng bởi các container và image cũ.',
      target_tool: 'Docker',
      tags: ['docker', 'devops'],
      likes_count: 98,
    },
    {
      type: 'TRICK',
      title: 'Tìm và tắt nhanh tiến trình đang chiếm dụng cổng (Port) trên Windows',
      code_snippet: 'netstat -ano | findstr :3000\ntaskkill /PID <PID> /F',
      language: 'powershell',
      explanation: 'Xử lý tức thì lỗi xung đột cổng EADDRINUSE khi khởi động các server phát triển tại local.',
      target_tool: 'Windows',
      tags: ['windows', 'terminal'],
      likes_count: 85,
    },
    {
      type: 'TRICK',
      title: 'Phím tắt VS Code: Chỉnh sửa đồng thời nhiều dòng (Multi-Cursor)',
      code_snippet: 'Alt + Shift + Click (hoặc Ctrl + Alt + Phím mũi tên Lên/Xuống)',
      language: 'text',
      explanation: 'Đặt nhiều con trỏ cùng lúc để đổi tên hàng loạt biến hoặc chỉnh sửa cấu hình dạng bảng chỉ trong vài giây.',
      target_tool: 'VS Code',
      tags: ['vscode', 'productivity'],
      likes_count: 120,
    },
    {
      type: 'TRICK',
      title: 'Đo tốc độ phản hồi API và kiểm tra HTTP Headers trực tiếp bằng cURL',
      code_snippet: 'curl -I -s -w "\\nTime: %{time_total}s\\n" https://api.example.com/health',
      language: 'bash',
      explanation: 'Kiểm tra độ trễ của API ngay trên cửa sổ dòng lệnh mà không cần mở Postman hay trình duyệt.',
      target_tool: 'cURL',
      tags: ['api', 'networking'],
      likes_count: 76,
    },
  ],
  zh: [
    {
      type: 'TRICK',
      title: '撤销最近一次 Git 提交 (Commit) 同时保留所有暂存区代码修改',
      code_snippet: 'git reset --soft HEAD~1',
      language: 'bash',
      explanation: '将 HEAD 指针回退一个版本，方便修改提交信息或补交遗漏文件，不会丢失任何代码改动。',
      target_tool: 'Git',
      tags: ['git', 'version-control'],
      likes_count: 142,
    },
    {
      type: 'TRICK',
      title: '一行命令彻底清理未使用的 Docker 容器、镜像与数据卷',
      code_snippet: 'docker system prune -a --volumes -f',
      language: 'bash',
      explanation: '瞬间释放被悬空镜像和停止运行的旧容器占用的数十 GB 磁盘空间。',
      target_tool: 'Docker',
      tags: ['docker', 'devops'],
      likes_count: 98,
    },
    {
      type: 'TRICK',
      title: '在 Windows 终端快速查找并终止占用指定端口的进程',
      code_snippet: 'netstat -ano | findstr :3000\ntaskkill /PID <PID> /F',
      language: 'powershell',
      explanation: '立即解决本地启动开发服务器时遇到的 EADDRINUSE 端口占用冲突报错。',
      target_tool: 'Windows',
      tags: ['windows', 'terminal'],
      likes_count: 85,
    },
    {
      type: 'TRICK',
      title: 'VS Code 多光标列编辑与批量重构快捷键',
      code_snippet: 'Alt + Shift + 鼠标左键 (或 Ctrl + Alt + 上/下方向键)',
      language: 'text',
      explanation: '同时创建多个编辑光标，在数秒内完成多行变量批量重命名或配置文件对齐修改。',
      target_tool: 'VS Code',
      tags: ['vscode', 'productivity'],
      likes_count: 120,
    },
    {
      type: 'TRICK',
      title: '使用 cURL 直接测量 API 响应延迟并检查 HTTP 安全响应头',
      code_snippet: 'curl -I -s -w "\\nTime: %{time_total}s\\n" https://api.example.com/health',
      language: 'bash',
      explanation: '无需打开 Postman 或浏览器，直接在命令行终端精准测量接口耗时。',
      target_tool: 'cURL',
      tags: ['api', 'networking'],
      likes_count: 76,
    },
  ],
};

const TIPS_BY_LANG: Record<Language, QuickNote[]> = {
  en: [
    {
      type: 'TIP',
      title: 'Apply the Boy Scout Rule in Software Engineering',
      explanation: 'Always leave the codebase cleaner than you found it. Even renaming one ambiguous variable or deleting an unused helper function saves weeks of future debugging for your team.',
      target_tool: 'Mindset',
      tags: ['clean-code', 'best-practices'],
      likes_count: 215,
    },
    {
      type: 'TIP',
      title: 'Favor Guard Clauses (Early Returns) over deeply nested if-else blocks',
      code_snippet: 'if (!user) return null;\nif (!hasPermission) return false;\nreturn processTransaction(user);',
      language: 'typescript',
      explanation: 'Early returns drastically reduce cyclomatic complexity, eliminate deeply nested indentation, and help engineers read and audit control flow twice as fast.',
      target_tool: 'Coding Habit',
      tags: ['refactoring', 'clean-code'],
      likes_count: 180,
    },
    {
      type: 'TIP',
      title: 'Avoid Premature Optimization — Measure First',
      explanation: 'Write clear, maintainable, and correct code first. Only optimize for raw execution speed after real profiling and benchmark telemetry pinpoint the exact bottleneck.',
      target_tool: 'Architecture',
      tags: ['performance', 'mindset'],
      likes_count: 165,
    },
  ],
  vi: [
    {
      type: 'TIP',
      title: 'Áp dụng quy tắc Boy Scout Rule trong phát triển phần mềm',
      explanation: 'Luôn để lại mã nguồn sạch hơn lúc bạn bắt đầu chạm vào nó. Dù chỉ là đổi tên một biến cho rõ nghĩa hay xóa một đoạn code thừa, bạn đang tiết kiệm hàng tuần debug cho cả đội ngũ về sau.',
      target_tool: 'Tư duy',
      tags: ['clean-code', 'best-practices'],
      likes_count: 215,
    },
    {
      type: 'TIP',
      title: 'Ưu tiên Guard Clauses (Early Return) thay vì lồng nhau hàng tầng if-else',
      code_snippet: 'if (!user) return null;\nif (!hasPermission) return false;\nreturn processTransaction(user);',
      language: 'typescript',
      explanation: 'Early Return giúp giảm độ phức tạp Cyclomatic Complexity, loại bỏ các khối ngoặc nhọn lồng nhau và giúp đồng đội đọc hiểu luồng nghiệp vụ nhanh gấp đôi.',
      target_tool: 'Thói quen Code',
      tags: ['refactoring', 'clean-code'],
      likes_count: 180,
    },
    {
      type: 'TIP',
      title: 'Tránh tối ưu hóa quá sớm — Hãy đo đạc trước khi tối ưu',
      explanation: 'Hãy viết code rõ ràng, dễ bảo trì và chạy đúng trước tiên. Chỉ tối ưu hóa hiệu năng khi bạn đã có số liệu đo đạc (profiling/benchmark) chỉ ra chính xác đâu là điểm nghẽn.',
      target_tool: 'Kiến trúc',
      tags: ['performance', 'mindset'],
      likes_count: 165,
    },
  ],
  zh: [
    {
      type: 'TIP',
      title: '在软件工程中践行“童子军军规 (Boy Scout Rule)”',
      explanation: '始终让代码库比你接手时更整洁。哪怕只是重命名一个含糊的变量或删除一段废弃函数，都能为团队未来节省数周的排错时间。',
      target_tool: '工程思维',
      tags: ['clean-code', 'best-practices'],
      likes_count: 215,
    },
    {
      type: 'TIP',
      title: '优先使用卫语句 (Guard Clauses / Early Return) 替代深层嵌套 if-else',
      code_snippet: 'if (!user) return null;\nif (!hasPermission) return false;\nreturn processTransaction(user);',
      language: 'typescript',
      explanation: '提前返回能显著降低圈复杂度 (Cyclomatic Complexity)，消除多层缩进，让代码审查与逻辑阅读速度提升一倍。',
      target_tool: '编码习惯',
      tags: ['refactoring', 'clean-code'],
      likes_count: 180,
    },
    {
      type: 'TIP',
      title: '避免过早优化 — 先通过性能剖析定位真正瓶颈',
      explanation: '首先编写清晰、可读且逻辑正确的代码。只有在基准测试和性能监控数据明确指出瓶颈所在时，才进行针对性的底层性能优化。',
      target_tool: '架构设计',
      tags: ['performance', 'mindset'],
      likes_count: 165,
    },
  ],
};

const EBOOKS_BY_LANG: Record<Language, LocalizedEbook[]> = {
  en: [
    {
      title: 'Designing Data-Intensive Applications',
      slug: 'designing-data-intensive-applications',
      author: 'Martin Kleppmann',
      description: 'The definitive reference on distributed systems, large-scale data processing, replication, partitioning, and consensus.',
      cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      is_official_link: true,
      license_type: 'Official Reference & Summary',
      file_size: '14.2 MB (PDF)',
      category_tag: 'System Architecture',
      download_count: 1420,
    },
    {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      slug: 'clean-code-robert-martin',
      author: 'Robert C. Martin',
      description: 'Foundational principles of writing clean, maintainable code, intention-revealing naming, and disciplined software refactoring.',
      cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://archive.org/details/clean-code-handbook-of-agile-software-craftsmanship',
      is_official_link: true,
      license_type: 'Open Educational Resource',
      file_size: '8.5 MB (PDF)',
      category_tag: 'Programming',
      download_count: 2850,
    },
    {
      title: "The Web Application Hacker's Handbook",
      slug: 'web-application-hackers-handbook',
      author: 'Dafydd Stuttard & Marcus Pinto',
      description: 'Hands-on guide to discovering, exploiting, and defending against modern web application security vulnerabilities.',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://portswigger.net/web-security',
      is_official_link: true,
      license_type: 'Official Web Security Resource',
      file_size: '18.1 MB (PDF)',
      category_tag: 'Security',
      download_count: 960,
    },
    {
      title: 'The Site Reliability Workbook (Google SRE)',
      slug: 'site-reliability-workbook',
      author: 'Betsy Beyer & Google SRE Team',
      description: 'Practical implementation lessons from Google SRE teams on managing reliable production services, SLOs/SLIs, and incident response.',
      cover_image: 'https://images.unsplash.com/photo-1507842229451-7f01be7fe0f2?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://sre.google/sre-book/table-of-contents/',
      is_official_link: true,
      license_type: 'Free Creative Commons',
      file_size: '11.0 MB (PDF)',
      category_tag: 'DevOps & SRE',
      download_count: 1150,
    },
  ],
  vi: [
    {
      title: 'Designing Data-Intensive Applications',
      slug: 'designing-data-intensive-applications',
      author: 'Martin Kleppmann',
      description: 'Cuốn sách gối đầu giường về thiết kế hệ thống phân tán, xử lý dữ liệu lớn, nhân bản (replication), phân mảnh (partitioning) và tính nhất quán.',
      cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      is_official_link: true,
      license_type: 'Tài liệu Tham khảo Chính thức',
      file_size: '14.2 MB (PDF)',
      category_tag: 'Kiến trúc Hệ thống',
      download_count: 1420,
    },
    {
      title: 'Clean Code: Cẩm Nang Viết Mã Sạch',
      slug: 'clean-code-robert-martin',
      author: 'Robert C. Martin',
      description: 'Nguyên lý nền tảng về viết mã nguồn sạch, dễ bảo trì, cách đặt tên biến rõ nghĩa và tái cấu trúc phần mềm chuyên nghiệp.',
      cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://archive.org/details/clean-code-handbook-of-agile-software-craftsmanship',
      is_official_link: true,
      license_type: 'Tài nguyên Giáo dục Mở',
      file_size: '8.5 MB (PDF)',
      category_tag: 'Lập trình',
      download_count: 2850,
    },
    {
      title: "The Web Application Hacker's Handbook",
      slug: 'web-application-hackers-handbook',
      author: 'Dafydd Stuttard & Marcus Pinto',
      description: 'Tài liệu thực chiến chuyên sâu về tìm kiếm lỗ hổng, kiểm thử xâm nhập (Pentest) và phòng vệ bảo mật ứng dụng Web.',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://portswigger.net/web-security',
      is_official_link: true,
      license_type: 'Tài liệu Bảo mật Chính thức',
      file_size: '18.1 MB (PDF)',
      category_tag: 'Bảo mật',
      download_count: 960,
    },
    {
      title: 'The Site Reliability Workbook (Google SRE)',
      slug: 'site-reliability-workbook',
      author: 'Betsy Beyer & Google SRE Team',
      description: 'Bài học thực tiễn từ đội ngũ kỹ sư Google SRE về vận hành hệ thống độ tin cậy cao, thiết lập chỉ số SLO/SLI và xử lý sự cố.',
      cover_image: 'https://images.unsplash.com/photo-1507842229451-7f01be7fe0f2?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://sre.google/sre-book/table-of-contents/',
      is_official_link: true,
      license_type: 'Giấy phép Mở Creative Commons',
      file_size: '11.0 MB (PDF)',
      category_tag: 'DevOps & SRE',
      download_count: 1150,
    },
  ],
  zh: [
    {
      title: '数据密集型应用系统设计 (DDIA)',
      slug: 'designing-data-intensive-applications',
      author: 'Martin Kleppmann',
      description: '分布式系统架构领域的权威圣经，深入剖析大规模数据处理、数据复制、分区策略与分布式一致性算法。',
      cover_image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/',
      is_official_link: true,
      license_type: '官方正版章节与导读',
      file_size: '14.2 MB (PDF)',
      category_tag: '系统架构',
      download_count: 1420,
    },
    {
      title: '代码整洁之道 (Clean Code)',
      slug: 'clean-code-robert-martin',
      author: 'Robert C. Martin',
      description: '软件工匠必读经典，系统阐述编写高可读性、高可维护性代码的黄金法则与持续重构实践。',
      cover_image: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://archive.org/details/clean-code-handbook-of-agile-software-craftsmanship',
      is_official_link: true,
      license_type: '开源教育资源',
      file_size: '8.5 MB (PDF)',
      category_tag: '核心编程',
      download_count: 2850,
    },
    {
      title: 'Web 前端与应用程序黑客攻防手册',
      slug: 'web-application-hackers-handbook',
      author: 'Dafydd Stuttard & Marcus Pinto',
      description: '全面解析现代 Web 应用安全漏洞挖掘、渗透测试方法论以及 OWASP 纵深防御策略。',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://portswigger.net/web-security',
      is_official_link: true,
      license_type: '官方网络安全指南',
      file_size: '18.1 MB (PDF)',
      category_tag: '网络安全',
      download_count: 960,
    },
    {
      title: 'Google 站点可靠性工程实践手册 (SRE Workbook)',
      slug: 'site-reliability-workbook',
      author: 'Betsy Beyer & Google SRE Team',
      description: 'Google SRE 团队一线运维与架构经验总结，涵盖高可用服务治理、SLO/SLI 指标监控与故障应急响应。',
      cover_image: 'https://images.unsplash.com/photo-1507842229451-7f01be7fe0f2?auto=format&fit=crop&w=600&q=80',
      pdf_stream_url: 'https://sre.google/sre-book/table-of-contents/',
      is_official_link: true,
      license_type: 'Creative Commons 免费授权',
      file_size: '11.0 MB (PDF)',
      category_tag: 'DevOps & SRE',
      download_count: 1150,
    },
  ],
};

const SERVICES_BY_LANG: Record<Language, LocalizedService[]> = {
  en: [
    {
      id: 'srv-0001-consulting',
      title: 'System Architecture Consulting & Code Audit',
      slug: 'tu-van-kien-truc-he-thong',
      short_description: 'Deep-dive performance analysis, source code security review, technical debt identification, and Clean Architecture / hybrid database design.',
      price_display: 'Hourly / Retainer',
      features: [
        'OWASP Top 10 Security & Vulnerability Assessment',
        'Database Query & Indexing Optimization (MySQL / MongoDB)',
        'Clean Architecture & Domain-Driven Design Refactoring',
        'Comprehensive Technical Audit Report & Actionable Roadmap',
      ],
    },
    {
      id: 'srv-0002-fullstack-dev',
      title: 'End-to-End Custom Web Application Engineering',
      slug: 'thiet-ke-phat-trien-web-ung-dung',
      short_description: 'Full-lifecycle development of high-performance media portals, knowledge platforms, and SaaS web applications with Next.js and Node.js.',
      price_display: 'Project-Based',
      features: [
        'SEO-Optimized Next.js 15 (App Router) SSR/ISR Frontend',
        'Hardened, High-Throughput Node.js & TypeScript Backend APIs',
        'Docker Compose Packaging Ready for Cloud / VPS Deployment',
        'Full Source Code Handover, Documentation & Maintenance Support',
      ],
    },
    {
      id: 'srv-0003-performance-audit',
      title: 'Core Web Vitals & Web Performance Optimization',
      slug: 'toi-uu-hoa-toc-do-tai-trang',
      short_description: 'Boost Google PageSpeed scores to 90+, resolving LCP, CLS, and INP bottlenecks to maximize search rankings and user retention.',
      price_display: 'Fixed Package',
      features: [
        'In-depth Largest Contentful Paint (LCP) & Render Path Audit',
        'JavaScript Bundle Reduction & Render-Blocking Elimination',
        'Image, Font & Multi-Tier CDN / Redis Caching Configuration',
        'Guaranteed Measurable Telemetry Improvements',
      ],
    },
  ],
  vi: [
    {
      id: 'srv-0001-consulting',
      title: 'Tư Vấn Kiến Trúc Hệ Thống & Kiểm Định Mã Nguồn',
      slug: 'tu-van-kien-truc-he-thong',
      short_description: 'Phân tích chuyên sâu điểm nghẽn hiệu năng, rà soát lỗ hổng bảo mật mã nguồn và thiết kế Clean Architecture / Database lai.',
      price_display: 'Theo giờ / Theo tháng',
      features: [
        'Kiểm định bảo mật toàn diện theo chuẩn OWASP Top 10',
        'Tối ưu hóa câu lệnh truy vấn & đánh chỉ mục (MySQL / MongoDB)',
        'Tái cấu trúc mã nguồn theo Clean Architecture & DDD',
        'Bàn giao báo cáo kiểm định kỹ thuật và lộ trình nâng cấp',
      ],
    },
    {
      id: 'srv-0002-fullstack-dev',
      title: 'Thiết Kế & Phát Triển Ứng Dụng Web Trọn Gói',
      slug: 'thiet-ke-phat-trien-web-ung-dung',
      short_description: 'Xây dựng trọn gói cổng thông tin công nghệ, nền tảng tri thức hoặc ứng dụng SaaS hiệu năng cao với Next.js 15 và Node.js.',
      price_display: 'Theo quy mô dự án',
      features: [
        'Frontend Next.js 15 (App Router) chuẩn SEO Google',
        'Backend Node.js & TypeScript bảo mật cao, chịu tải lớn',
        'Đóng gói Docker Compose sẵn sàng triển khai Cloud / VPS',
        'Bàn giao 100% mã nguồn, tài liệu kỹ thuật và hỗ trợ vận hành',
      ],
    },
    {
      id: 'srv-0003-performance-audit',
      title: 'Tối Ưu Hóa Tốc Độ Tải Trang & Core Web Vitals',
      slug: 'toi-uu-hoa-toc-do-tai-trang',
      short_description: 'Nâng điểm Google PageSpeed lên 90+, xử lý triệt để các chỉ số LCP, CLS, INP giúp tăng thứ hạng SEO và tỷ lệ giữ chân người dùng.',
      price_display: 'Gói cố định',
      features: [
        'Phân tích chuyên sâu Largest Contentful Paint (LCP)',
        'Tối ưu dung lượng bundle JavaScript & loại bỏ render-blocking',
        'Thiết lập bộ nhớ đệm đa tầng (Redis Caching & CDN)',
        'Cam kết cải thiện điểm số đo đạc thực tế',
      ],
    },
  ],
  zh: [
    {
      id: 'srv-0001-consulting',
      title: '企业级系统架构咨询与源码安全审计',
      slug: 'tu-van-kien-truc-he-thong',
      short_description: '深入排查系统性能瓶颈、源码安全漏洞审计、技术债务评估，以及整洁架构与混合数据库集群设计。',
      price_display: '按小时 / 顾问包月',
      features: [
        '基于 OWASP Top 10 标准的全方位安全漏洞审计',
        '数据库慢查询与索引深度调优 (MySQL / MongoDB)',
        '整洁架构 (Clean Architecture) 与领域驱动设计重构',
        '交付完整技术架构评估报告与演进路线图',
      ],
    },
    {
      id: 'srv-0002-fullstack-dev',
      title: '高性能定制化 Web 应用全栈工程开发',
      slug: 'thiet-ke-phat-trien-web-ung-dung',
      short_description: '采用 Next.js 15 与 Node.js 全周期打造高性能科技媒体门户、知识平台与企业级 SaaS 应用。',
      price_display: '按项目规模评估',
      features: [
        '深度 SEO 优化的 Next.js 15 SSR/ISR 前端架构',
        '高并发、高安全加固的 Node.js & TypeScript 后端 API',
        '全套 Docker Compose 容器化封装，支持一键云端部署',
        '100% 源码交付、架构文档编写与运维技术支持',
      ],
    },
    {
      id: 'srv-0003-performance-audit',
      title: 'Core Web Vitals 页面极速加载与性能调优',
      slug: 'toi-uu-hoa-toc-do-tai-trang',
      short_description: '将 Google PageSpeed 性能评分提升至 90+，彻底解决 LCP、CLS 与 INP 性能瓶颈，显著提升搜索排名与转化率。',
      price_display: '固定套餐',
      features: [
        '首屏最大内容绘制 (LCP) 与关键渲染路径深度剖析',
        'JavaScript 体积精简与渲染阻塞资源消除',
        '多级 Redis 缓存策略与全球 CDN 静态资源加速',
        '承诺提供可量化的真实性能指标提升保障',
      ],
    },
  ],
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof UI_DICTIONARY['en'];
  getLocalizedPost: (post: Post) => Post;
  getLocalizedCategoryName: (slug: string, fallbackName: string) => string;
  getLocalizedCategoryDesc: (slug: string, fallbackDesc?: string) => string;
  getLocalizedTricks: () => QuickNote[];
  getLocalizedTips: () => QuickNote[];
  getLocalizedEbooks: () => LocalizedEbook[];
  getLocalizedServices: () => LocalizedService[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('tp_lang') as Language | null;
    if (saved && (saved === 'en' || saved === 'vi' || saved === 'zh')) {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('tp_lang', newLang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
  };

  const getLocalizedPost = (post: Post): Post => {
    const trans = POST_TRANSLATIONS[post.slug]?.[lang];
    if (!trans) return post;
    return {
      ...post,
      title: trans.title,
      summary: trans.summary,
      content: trans.content,
    };
  };

  const getLocalizedCategoryName = (slug: string, fallbackName: string): string => {
    return CATEGORY_TRANSLATIONS[slug]?.[lang]?.name || fallbackName;
  };

  const getLocalizedCategoryDesc = (slug: string, fallbackDesc?: string): string => {
    return CATEGORY_TRANSLATIONS[slug]?.[lang]?.desc || fallbackDesc || '';
  };

  const getLocalizedTricks = () => TRICKS_BY_LANG[lang];
  const getLocalizedTips = () => TIPS_BY_LANG[lang];
  const getLocalizedEbooks = () => EBOOKS_BY_LANG[lang];
  const getLocalizedServices = () => SERVICES_BY_LANG[lang];

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: UI_DICTIONARY[lang],
        getLocalizedPost,
        getLocalizedCategoryName,
        getLocalizedCategoryDesc,
        getLocalizedTricks,
        getLocalizedTips,
        getLocalizedEbooks,
        getLocalizedServices,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
