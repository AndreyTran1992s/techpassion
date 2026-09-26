# TECH PASSION — ACTIONABLE MASTER SPECIFICATION & DEVELOPMENT BLUEPRINT
> **Tài liệu đặc tả kỹ thuật và kế hoạch thực thi dành riêng cho Antigravity IDE & Visual Studio Code**  
> **Tổng hợp từ**: ChatGPT + Claude + Google Gemini + Qwen 3.8-Max (Loại trừ Kimi AI)  
> **Phiên bản**: 1.0 (Production-Ready Spec)

---

## 1. TECH STACK SPECIFICATION

| Layer | Công nghệ chuẩn | Thư viện & Công cụ chính |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 15 (App Router) + TypeScript** | Tailwind CSS, Lucide React, Shiki (Syntax Highlighting), PDF.js, Socket.io-client / EventSource (SSE), Axios/TanStack Query. |
| **Backend** | **Node.js 20+ (TypeScript) + Express / Fastify** | Mongoose (MongoDB ODM), mysql2 (Connection Pool / Knex), Redis (ioredis), BullMQ (Background Queue), Pino (Logger), Zod (Validation), JWT & bcryptjs. |
| **Databases** | **MySQL 8.0 & MongoDB 7.0 & Redis 7.0** | • **MySQL**: Lưu trữ quan hệ, ACID, giao dịch (Users, Categories, Tags, Services, Inquiries, Bookmarks).<br>• **MongoDB**: Lưu trữ Document nội dung (Posts, QuickNotes, Ebooks, UserAnalytics).<br>• **Redis**: Cache Menu 3 cụm, Live Breaking News PubSub, Rate limiting, Session. |
| **DevOps** | **Docker & Docker Compose** | Multi-stage Dockerfiles cho Frontend & Backend, Nginx Reverse Proxy, Let's Encrypt SSL. |

---

## 2. CẤU TRÚC THƯ MỤC CHUẨN MONOREPO (WORKSPACE DIRECTORY TREE)

```
Tech Passion/
├── docker-compose.yml                   # Khởi chạy 5 container: frontend, backend, mysql, mongodb, redis
├── docker-compose.dev.yml               # Cấu hình dev hot-reload
├── .env.example                         # Biến môi trường mẫu
├── PROJECT_SPEC.md                      # File đặc tả kiến trúc tại workspace
│
├── infrastructure/                      # Cấu hình hạ tầng & cơ sở dữ liệu
│   ├── nginx/
│   │   └── default.conf                 # Cấu hình Reverse Proxy & SSL
│   └── database/
│       └── mysql-init.sql               # Script DDL tạo bảng + Seed Data 12 Pillars & 8 Sub-items
│
├── backend/                             # RESTful API & WebSocket Engine (Node.js + TS)
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── config/                      # env.ts, mysql.ts, mongodb.ts, redis.ts
│       ├── common/                      # middlewares, guards, interceptors, errors
│       └── modules/
│           ├── auth/                    # Đăng ký, đăng nhập JWT, RBAC
│           ├── categories/              # Cây danh mục 3 cụm (cache Redis)
│           ├── posts/                   # Quản lý bài viết (MongoDB + category_path)
│           ├── quick-notes/             # Quản lý Tips & Tricks (Micro-Cards)
│           ├── ebooks/                  # Quản lý sách, Stream PDF an toàn
│           ├── services/                # Dịch vụ cá nhân & xử lý Inquiries
│           ├── news-engine/             # Live Breaking News SSE/WebSocket
│           └── analytics/               # Ghi nhận reading duration, scroll depth
│
└── frontend/                            # Next.js 15 App Router (TypeScript + Tailwind)
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    └── src/
        ├── app/
        │   ├── (public)/                # Giao diện cho độc giả
        │   │   ├── layout.tsx           # Header (Mega-Menu 3 Cụm + Live Ticker), Footer
        │   │   ├── page.tsx             # Homepage: Hero Breaking + Feed "For You"
        │   │   ├── [pillarSlug]/        # Dynamic route cho 12 Pillars
        │   │   │   ├── page.tsx         # Tự kiểm tra Sub-items để render Tab Bar hoặc bài viết
        │   │   │   ├── [subSlug]/       # Route cho 8 Sub-items
        │   │   │   │   ├── page.tsx     # Trang riêng của Sub-item (Sidebar Filter)
        │   │   │   │   └── [postSlug]/
        │   │   │   │       └── page.tsx # Chi tiết bài viết Sub-item (Canonical URL)
        │   │   │   └── post/[postSlug]/
        │   │   │       └── page.tsx     # Chi tiết bài viết Pillar không sub
        │   │   ├── tricks/page.tsx      # Giao diện Micro-Cards Tricks (1-Click Copy)
        │   │   ├── tips/page.tsx        # Giao diện Daily Wisdom Tips (Pinterest style)
        │   │   ├── ebooks/page.tsx      # Thư viện sách 3D Grid + PDF.js Viewer
        │   │   └── product-services/page.tsx # Landing Page dịch vụ & Form tư vấn
        │   └── (admin)/admin/           # CMS Quản trị bài viết & Khách hàng
        ├── components/
        │   ├── layout/                  # MegaMenu, Header, Footer, Breadcrumb
        │   ├── reader/                  # ReaderModeToolbar (Font Sans/Serif/Mono, TOC, Progress Bar)
        │   ├── interactive/             # TerminalBlock, InteractiveChecklist, SerpPreview
        │   └── cards/                   # PostCard, QuickNoteCard, EbookCard
        ├── lib/                         # api-client, utils, constants
        └── types/                       # TypeScript models
```

---

## 3. ĐẶC TẢ CƠ SỞ DỮ LIỆU & SEED DATA ĐẦY ĐỦ

### 3.1. MySQL 8.0 DDL & Seed Script (`infrastructure/database/mysql-init.sql`)

```sql
CREATE DATABASE IF NOT EXISTS tech_passion_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tech_passion_db;

-- 1. Bảng Users
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
);

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
);

-- 3. Bảng Tags (Chuẩn hóa)
CREATE TABLE IF NOT EXISTS tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(60) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

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
);

-- 6. Bảng User Bookmarks
CREATE TABLE IF NOT EXISTS user_bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(36) NOT NULL,
    post_id VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_post (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

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
(6, NULL, 'TECH_CORE', 'Testing', 'testing', 'Kỹ năng kiểm thử phần mềm tự động và thủ công', 'CheckCircle2', 6);

-- Sub-items cho Design & Development (parent_id = 3)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(7, 3, 'TECH_CORE', 'Website Design', 'website-design', 'Thiết kế Website, UI/UX, Design System', 'Palette', 1),
(8, 3, 'TECH_CORE', 'Website Development', 'website-development', 'Kỹ thuật phát triển Web Frontend và Fullstack', 'Globe', 2);

-- Sub-items cho Hacking & Security (parent_id = 5)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(9, 5, 'TECH_CORE', 'Hacking', 'hacking', 'Kỹ thuật Hacking, Pentesting, Reverse Engineering', 'Terminal', 1),
(10, 5, 'TECH_CORE', 'Security', 'security', 'Bảo mật phần mềm, Web Security, DevSecOps', 'Lock', 2);

-- Sub-items cho Testing (parent_id = 6)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(11, 6, 'TECH_CORE', 'Auto Testing', 'auto-testing', 'Kiểm thử phần mềm tự động (Playwright, Cypress, CI/CD)', 'Cpu', 1),
(12, 6, 'TECH_CORE', 'Manual Testing', 'manual-testing', 'Kiểm thử thủ công, thiết kế testcase, quy trình QA/QC', 'FileCheck', 2);

-- CỤM 2: SKILLS & GROWTH
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(13, NULL, 'SKILLS_GROWTH', 'S.E.O/Marketing', 'seo-marketing', 'Kỹ thuật SEO và Marketing công nghệ', 'TrendingUp', 7),
(14, NULL, 'SKILLS_GROWTH', 'Soft Skills', 'soft-skills', 'Kỹ năng mềm hay và cần thiết cho kỹ sư', 'Users', 8),
(15, NULL, 'SKILLS_GROWTH', 'Tricks', 'tricks', 'Thủ thuật thực tế khi dùng phần mềm, tools', 'Sparkles', 9),
(16, NULL, 'SKILLS_GROWTH', 'Tips', 'tips', 'Lời khuyên tốt nhất dành cho người làm công nghệ', 'Lightbulb', 10);

-- Sub-items cho S.E.O/Marketing (parent_id = 13)
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(17, 13, 'SKILLS_GROWTH', 'S.E.O', 'seo', 'Kỹ thuật Technical SEO, On-page, Core Web Vitals', 'Search', 1),
(18, 13, 'SKILLS_GROWTH', 'Marketing', 'marketing', 'PR, quảng cáo tiếp thị sản phẩm công nghệ', 'Megaphone', 2);

-- CỤM 3: RESOURCES & SERVICES
INSERT INTO categories (id, parent_id, cluster, name, slug, description, icon, sort_order) VALUES
(19, NULL, 'RESOURCES_SERVICES', 'Product & Services', 'product-services', 'Sản phẩm và dịch vụ công nghệ cá nhân', 'Briefcase', 11),
(20, NULL, 'RESOURCES_SERVICES', 'E-Books', 'ebooks', 'Thư viện sách chuyên ngành PDF hợp pháp', 'BookOpen', 12);

-- Tạo sẵn tài khoản Super Admin mặc định (password: Admin@TechPassion2026 - hash bcrypt)
INSERT INTO users (id, email, password_hash, full_name, role) VALUES
('adm-0000-0000-0000-000000000001', 'admin@techpassion.dev', '$2b$10$w8TfJ4jYfAiqfJqJ9J0QeOp5iM3vA0gLd6Dq5uP.qLdY3Zc7YmEGu', 'Tech Passion Lead', 'SUPER_ADMIN')
ON DUPLICATE KEY UPDATE id=id;
```

---

### 3.2. MongoDB 7.0 Mongoose Schemas

#### `backend/src/modules/posts/post.model.ts`
```typescript
import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  category_id: number;
  sub_category_id?: number | null;
  category_slug: string;
  sub_category_slug?: string | null;
  category_path: string[]; // VD: ["testing", "auto-testing"] -> query Silo cực nhanh
  summary: string;
  content: string; // Markdown hoặc JSON Blocks
  cover_image?: string;
  author_id: string; // UUID tham chiếu MySQL users.id
  author_name: string;
  is_breaking: boolean;
  tags: string[];
  seo: {
    meta_title: string;
    meta_description: string;
    canonical_url: string;
  };
  metrics: {
    views: number;
    likes: number;
    reading_time_minutes: number;
  };
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category_id: { type: Number, required: true, index: true },
  sub_category_id: { type: Number, default: null, index: true },
  category_slug: { type: String, required: true, index: true },
  sub_category_slug: { type: String, default: null, index: true },
  category_path: [{ type: String, index: true }],
  summary: { type: String, required: true },
  content: { type: String, required: true },
  cover_image: { type: String },
  author_id: { type: String, required: true },
  author_name: { type: String, required: true },
  is_breaking: { type: Boolean, default: false, index: true },
  tags: [{ type: String, index: true }],
  seo: {
    meta_title: { type: String },
    meta_description: { type: String },
    canonical_url: { type: String }
  },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    reading_time_minutes: { type: Number, default: 5 }
  },
  status: { type: String, enum: ['DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED'], default: 'DRAFT', index: true },
  published_at: { type: Date }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const PostModel = model<IPost>('Post', PostSchema);
```

#### `backend/src/modules/quick-notes/quick-note.model.ts`
```typescript
import { Schema, model, Document } from 'mongoose';

export interface IQuickNote extends Document {
  type: 'TRICK' | 'TIP';
  title: string;
  code_snippet?: string;
  language?: string;
  explanation: string;
  target_tool?: string; // Git, Docker, VS Code, Linux...
  tags: string[];
  likes_count: number;
  created_at: Date;
}

const QuickNoteSchema = new Schema<IQuickNote>({
  type: { type: String, enum: ['TRICK', 'TIP'], required: true, index: true },
  title: { type: String, required: true },
  code_snippet: { type: String },
  language: { type: String, default: 'bash' },
  explanation: { type: String, required: true },
  target_tool: { type: String, index: true },
  tags: [{ type: String }],
  likes_count: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at' } });

export const QuickNoteModel = model<IQuickNote>('QuickNote', QuickNoteSchema);
```

#### `backend/src/modules/ebooks/ebook.model.ts`
```typescript
import { Schema, model, Document } from 'mongoose';

export interface IEbook extends Document {
  title: string;
  slug: string;
  author: string;
  description: string;
  cover_image: string;
  pdf_stream_url: string; // URL stream qua backend chống leech
  is_official_link: boolean;
  license_type: string;
  file_size: string;
  category_tag: string;
  download_count: number;
  created_at: Date;
}

const EbookSchema = new Schema<IEbook>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  cover_image: { type: String, required: true },
  pdf_stream_url: { type: String, required: true },
  is_official_link: { type: Boolean, default: true },
  license_type: { type: String, default: 'Free Reference' },
  file_size: { type: String, default: '5 MB' },
  category_tag: { type: String, index: true },
  download_count: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'created_at' } });

export const EbookModel = model<IEbook>('Ebook', EbookSchema);
```

---

## 4. CHI TIẾT TÍNH NĂNG TƯƠNG TÁC ĐỘC QUYỀN (INTERACTIVE FRONTEND COMPONENTS)

| Component | Vị trí áp dụng | Logic kỹ thuật |
| :--- | :--- | :--- |
| `<MegaMenu />` | Header | Hiển thị 3 cụm lớn: `TECH CORE`, `SKILLS & GROWTH`, `RESOURCES & SERVICES`. Hover hoặc click sẽ xổ cột Sub-items rõ ràng kèm icon. |
| `<BreakingNewsTicker />` | Dưới Navbar | Lắng nghe Server-Sent Events (SSE) `/api/v1/news/stream`. Tin nóng mới xuất hiện lập tức chạy chữ mượt mà kèm nhấp nháy đèn đỏ `LIVE`. |
| `<ReaderModeToolbar />` | Trang đọc bài `[postSlug]` | Nằm floating góc màn hình: Chuyển đổi font chữ (`Fira Code` cho Hacker/Dev, `Merriweather` cho Soft Skills, `Inter` cho tin tức); Tăng giảm font size; Đếm thời gian đọc. |
| `<TerminalBlock />` | Chuyên mục Hacking & Security | Component hiển thị code dạng màn hình Terminal (Nền đen tuyền, chữ xanh lá Fira Code, thanh tiêu đề chấm đỏ/vàng/xanh, nút Copy 1-click). |
| `<InteractiveChecklist />` | Chuyên mục Testing | Danh sách các testcase có checkbox tương tác. Người dùng tick chọn sẽ tự động lưu trạng thái vào `localStorage` của trình duyệt. |
| `<QuickNoteCard />` | Trang Tricks & Tips | Thẻ Micro-Card: Nút copy lệnh 1-chạm hiển thị hiệu ứng Toast thông báo đã copy, bộ lọc nhanh theo công cụ (Git, Docker, VS Code). |
| `<PdfViewerModal />` | Trang E-Books | Nhúng thư viện `pdfjs-dist` mở modal đọc trực tiếp sách PDF trên giao diện không cần tải về máy; kèm form nhập email mở khóa link tải tốc độ cao. |
| `<SerpPreview />` | Chuyên mục S.E.O/Marketing | Khung mô phỏng trực tiếp kết quả hiển thị thẻ Title/Description trên Google SERP (Google Search Result Preview). |

---

## 5. DOCKER ENVIRONMENT SPECIFICATION (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: tp_frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: tp_backend
    restart: unless-stopped
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - NODE_ENV=development
      - MYSQL_HOST=mysql
      - MYSQL_PORT=3306
      - MYSQL_DATABASE=tech_passion_db
      - MYSQL_USER=tp_user
      - MYSQL_PASSWORD=tp_secret
      - MONGO_URI=mongodb://tp_mongo_user:tp_mongo_secret@mongodb:27017/tech_passion_content?authSource=admin
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=tp_super_secure_jwt_secret_key_2026
    depends_on:
      - mysql
      - mongodb
      - redis

  mysql:
    image: mysql:8.0
    container_name: tp_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_secret_password
      MYSQL_DATABASE: tech_passion_db
      MYSQL_USER: tp_user
      MYSQL_PASSWORD: tp_secret
    ports:
      - "3306:3306"
    volumes:
      - tp_mysql_data:/var/lib/mysql
      - ./infrastructure/database/mysql-init.sql:/docker-entrypoint-initdb.d/init.sql

  mongodb:
    image: mongo:7.0
    container_name: tp_mongodb
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: tp_mongo_user
      MONGO_INITDB_ROOT_PASSWORD: tp_mongo_secret
      MONGO_INITDB_DATABASE: tech_passion_content
    ports:
      - "27017:27017"
    volumes:
      - tp_mongo_data:/data/db

  redis:
    image: redis:7-alpine
    container_name: tp_redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - tp_redis_data:/data

volumes:
  tp_mysql_data:
  tp_mongo_data:
  tp_redis_data:
```

---

## 6. RUNBOOK HƯỚNG DẪN THỰC THI CHO ANTIGRAVITY IDE / VS CODE

### BƯỚC 1: Khởi tạo Cấu trúc Hạ tầng & Docker (HOÀN THÀNH ✅)
1. Tạo file `infrastructure/database/mysql-init.sql` với toàn bộ DDL & Seed Data ở Mục 3.1.
2. Tạo file `docker-compose.yml` ở Mục 5.
3. Cấu hình 5 container: `frontend`, `backend`, `mysql`, `mongodb`, `redis`.
4. MySQL nạp thành công 12 Pillars và 8 Sub-items.

### BƯỚC 2: Khởi tạo Backend API (Node.js + TypeScript) (HOÀN THÀNH ✅)
1. Khởi tạo `backend/package.json` với Express, TypeScript, Mongoose, MySQL2, Redis, Pino, Zod.
2. Tạo các module kết nối cơ sở dữ liệu (`mysql.ts`, `mongodb.ts`, `redis.ts`) có cơ chế offline fallback thông minh.
3. Endpoint Healthcheck: `GET /api/v1/health` kiểm tra trạng thái 3 databases.
4. Module Categories: `GET /api/v1/categories/menu` trả về cây thư mục 3 cụm có cache Redis.
5. Module Posts: `GET /api/v1/posts`, `GET /api/v1/posts/:slug`, `POST /api/v1/posts`.
6. Module Quick-Notes (Tricks/Tips), E-Books (PDF) và Services (`/services`, `/services/inquiry`, `/services/inquiries`).
7. Đã biên dịch `npm run build` thành công 100%.

### BƯỚC 3: Khởi tạo Frontend (Next.js 15 App Router + Tailwind CSS) (HOÀN THÀNH ✅)
1. Khởi tạo Next.js 15 App Router với React 19, TypeScript, Tailwind CSS.
2. Cài đặt các thư viện bổ trợ: `lucide-react`, `clsx`, `tailwind-merge`.
3. Xây dựng Header với `<MegaMenu />` hiển thị 3 Cụm Tri thức (12 Pillars + 8 Sub-items).
4. Xây dựng `<BreakingNewsTicker />` chạy tin nóng thời gian thực trên đỉnh trang.
5. Xây dựng Dynamic Route `/[pillarSlug]/page.tsx` tự động render thanh Tab Bar điều hướng khi có Sub-items.
6. Xây dựng Route bài viết chuẩn Canonical URL: `/[pillarSlug]/[subSlug]/[postSlug]/page.tsx`.
7. Tích hợp thanh công cụ `<ReaderModeToolbar />` cho phép chỉnh font chữ (Monospace / Serif / Sans) và thanh tiến trình đọc bài.

### BƯỚC 4: Xây dựng Các Trang Tương tác Chuyên biệt (HOÀN THÀNH ✅)
1. Trang `/tricks`: Danh sách thẻ thủ thuật Git, Docker, VS Code, Linux với nút 1-Click Copy code snippet.
2. Trang `/tips`: Chia sẻ kinh nghiệm công nghệ, best practices và tư duy lập trình tối giản, mượt mà.
3. Trang `/ebooks`: Thư viện sách chuyên ngành PDF nguồn chính thống hợp pháp, hiển thị dung lượng và link đọc/tải.
4. Trang `/product-services`: Showcase dịch vụ tư vấn cá nhân kèm Form đăng ký tư vấn lưu vào MySQL.
5. Loại bỏ toàn bộ widget rườm rà, giao diện siêu tốc mượt mà ~103kB bundle.

### BƯỚC 5: Xây dựng Admin CMS & Quản trị Nội dung (HOÀN THÀNH ✅)
1. Trang `/admin`: Bảng điều khiển quản trị tập trung (Next.js 15 SSR, bundle 117 kB).
2. Tab Tổng Quan (Overview): Thống kê số lượng bài viết, 12 Trụ cột, số lượng yêu cầu tư vấn mới.
3. Tab Soạn Thảo (New Post): Form nhập liệu Markdown, tự động sinh slug tiếng Việt, phân loại chính xác 12 Pillars & 8 Sub-items, tùy chọn Breaking News.
4. Tab Danh Sách Bài Viết (Articles): Tìm kiếm nhanh, lọc theo danh mục, xem trực tiếp trên web.
5. Tab Quản Lý Yêu Cầu Dịch Vụ (Inquiries): Bảng dữ liệu khách hàng từ MySQL, chuyển đổi trạng thái (Mới, Đã liên hệ, Hoàn thành) 1-chạm.

### BƯỚC 6: Kiểm thử & Đóng gói Deploy Production (HOÀN THÀNH ✅)
1. Đã kiểm tra responsive trên Mobile, Tablet, Desktop: Mega-Menu mobile drawer, lưới bài viết co giãn tự động, Admin Console cuộn bảng chống tràn.
2. Đã tích hợp SEO thẻ meta, OpenGraph, `sitemap.xml` động (`frontend/src/app/sitemap.ts`), `robots.txt` (`frontend/src/app/robots.ts`) và Schema.org JSON-LD Rich Snippets trong `ArticleView.tsx`.
3. Đã tạo `frontend/public/favicon.svg` và đồng bộ Dockerfile.
4. Đóng gói hoàn thiện `docker-compose.yml` cho 5 container và tài liệu hướng dẫn vận hành toàn diện tại `README.md`.
5. Cả 2 hệ thống Backend và Frontend đều biên dịch thành công 100% không lỗi (`npm run build` -> exit code 0).
