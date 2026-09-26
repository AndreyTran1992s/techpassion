-- ==============================================================
-- TECH PASSION DATABASE INITIALIZATION SCRIPT (MySQL 8.0)
-- 12 Content Pillars & 8 Sub-items Seed Data
-- ==============================================================

CREATE DATABASE IF NOT EXISTS tech_passion_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tech_passion_db;

-- 1. Bảng Users (Tài khoản & Phân quyền)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url VARCHAR(500) NULL,
    bio TEXT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'USER') DEFAULT 'USER',
    favorite_categories JSON NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Categories (Adjacency List Pattern cho 12 Pillars & 8 Sub-items)
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    parent_id INT NULL,
    cluster ENUM('TECH_CORE', 'SKILLS_GROWTH', 'RESOURCES_SERVICES') NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(50) NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Tags (Chuẩn hóa)
CREATE TABLE IF NOT EXISTS tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(60) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Dịch vụ & Sản phẩm
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    short_description VARCHAR(500) NOT NULL,
    price_display VARCHAR(100) NULL,
    features JSON NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng Khách hàng Liên hệ Tư vấn Dịch vụ
CREATE TABLE IF NOT EXISTS service_inquiries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id VARCHAR(36) NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NULL,
    message TEXT NOT NULL,
    status ENUM('NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng User Bookmarks
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_post (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================
-- SEED DATA: 12 PILLARS & 8 SUB-ITEMS
-- ==============================================================

-- CỤM 1: TECH CORE
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(1, NULL, 'TECH_CORE', 'Breaking News', 'breaking-news', 'Tin tức IT nhanh và mới nhất', 'Zap', 1),
(2, NULL, 'TECH_CORE', 'AI', 'ai', 'Kỹ thuật phát triển AI, LLM, RAG và Agentic AI', 'Bot', 2),
(3, NULL, 'TECH_CORE', 'Design & Development', 'design-development', 'Thiết kế và phát triển phần mềm, website', 'Layout', 3),
(4, NULL, 'TECH_CORE', 'Programming', 'programming', 'Kỹ thuật lập trình website và phần mềm', 'Code2', 4),
(5, NULL, 'TECH_CORE', 'Hacking & Security', 'hacking-security', 'Kỹ thuật Hacking và Bảo mật phần mềm', 'ShieldAlert', 5),
(6, NULL, 'TECH_CORE', 'Testing', 'testing', 'Kỹ năng kiểm thử phần mềm tự động và thủ công', 'CheckCircle2', 6)
ON DUPLICATE KEY UPDATE name=VALUES(name), cluster=VALUES(cluster);

-- Sub-items cho Design & Development (parent_id = 3)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(7, 3, 'TECH_CORE', 'Website Design', 'website-design', 'Thiết kế Website, UI/UX, Design System', 'Palette', 1),
(8, 3, 'TECH_CORE', 'Website Development', 'website-development', 'Kỹ thuật phát triển Web Frontend và Fullstack', 'Globe', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name), parent_id=VALUES(parent_id);

-- Sub-items cho Hacking & Security (parent_id = 5)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(9, 5, 'TECH_CORE', 'Hacking', 'hacking', 'Kỹ thuật Hacking, Pentesting, Reverse Engineering', 'Terminal', 1),
(10, 5, 'TECH_CORE', 'Security', 'security', 'Bảo mật phần mềm, Web Security, DevSecOps', 'Lock', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name), parent_id=VALUES(parent_id);

-- Sub-items cho Testing (parent_id = 6)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(11, 6, 'TECH_CORE', 'Auto Testing', 'auto-testing', 'Kiểm thử phần mềm tự động (Playwright, Cypress, CI/CD)', 'Cpu', 1),
(12, 6, 'TECH_CORE', 'Manual Testing', 'manual-testing', 'Kiểm thử thủ công, thiết kế testcase, quy trình QA/QC', 'FileCheck', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name), parent_id=VALUES(parent_id);

-- CỤM 2: SKILLS & GROWTH
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(13, NULL, 'SKILLS_GROWTH', 'S.E.O/Marketing', 'seo-marketing', 'Kỹ thuật SEO và Marketing công nghệ', 'TrendingUp', 7),
(14, NULL, 'SKILLS_GROWTH', 'Soft Skills', 'soft-skills', 'Kỹ năng mềm hay và cần thiết cho kỹ sư', 'Users', 8),
(15, NULL, 'SKILLS_GROWTH', 'Tricks', 'tricks', 'Thủ thuật thực tế khi dùng phần mềm, tools', 'Sparkles', 9),
(16, NULL, 'SKILLS_GROWTH', 'Tips', 'tips', 'Lời khuyên tốt nhất dành cho người làm công nghệ', 'Lightbulb', 10)
ON DUPLICATE KEY UPDATE name=VALUES(name), cluster=VALUES(cluster);

-- Sub-items cho S.E.O/Marketing (parent_id = 13)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(17, 13, 'SKILLS_GROWTH', 'S.E.O', 'seo', 'Kỹ thuật Technical SEO, On-page, Core Web Vitals', 'Search', 1),
(18, 13, 'SKILLS_GROWTH', 'Marketing', 'marketing', 'PR, quảng cáo tiếp thị sản phẩm công nghệ', 'Megaphone', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name), parent_id=VALUES(parent_id);

-- CỤM 3: RESOURCES & SERVICES
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(19, NULL, 'RESOURCES_SERVICES', 'Product & Services', 'product-services', 'Sản phẩm và dịch vụ công nghệ cá nhân', 'Briefcase', 11),
(20, NULL, 'RESOURCES_SERVICES', 'E-Books', 'ebooks', 'Thư viện sách chuyên ngành PDF hợp pháp', 'BookOpen', 12)
ON DUPLICATE KEY UPDATE name=VALUES(name), cluster=VALUES(cluster);

-- SEED DỊCH VỤ CÁ NHÂN MẪU (CHO PRODUCT & SERVICES)
INSERT INTO services (id, title, slug, short_description, price_display, features, is_active, sort_order) VALUES
('srv-0001-consulting', 'Tư vấn Kiến trúc Hệ thống & Code Review', 'tu-van-kien-truc-he-thong', 'Phân tích hiệu năng, tái cấu trúc mã nguồn, tối ưu hóa database lai và kiến trúc Microservices/Modular Monolith.', 'Liên hệ theo giờ', '["Kiểm định bảo mật OWASP Top 10", "Tối ưu hóa Database Query Indexing", "Tư vấn thiết kế Cloud & Docker", "Báo cáo chi tiết các Technical Debts"]', 1, 1),
('srv-0002-fullstack-dev', 'Thiết kế & Phát triển Web Ứng dụng Cao cấp', 'thiet-ke-phat-trien-web-ung-dung', 'Xây dựng website/web-app trọn gói với Next.js, Node.js, thiết kế UI/UX theo tiêu chuẩn quốc tế và chuẩn SEO.', 'Theo dự án', '["Frontend Next.js SSR/ISR chuẩn SEO", "Backend Node.js API bảo mật cao", "Thiết kế Responsive Mobile-first", "Bàn giao mã nguồn và Dockerize"]', 1, 2)
ON DUPLICATE KEY UPDATE id=id;

-- SEED TÀI KHOẢN SUPER ADMIN MẶC ĐỊNH (Mật khẩu: Admin@TechPassion2026)
INSERT INTO users (id, email, password_hash, full_name, role) VALUES
('adm-0000-0000-0000-000000000001', 'admin@techpassion.dev', '$2b$10$w8TfJ4jYfAiqfJqJ9J0QeOp5iM3vA0gLd6Dq5uP.qLdY3Zc7YmEGu', 'Tech Passion Lead', 'SUPER_ADMIN')
ON DUPLICATE KEY UPDATE id=id;
