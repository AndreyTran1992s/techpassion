import { describe, it, expect, vi } from 'vitest';
import { securitySanitizer } from '../common/securitySanitizer';
import { requireAdminAuth } from '../common/authMiddleware';
import { sendSuccess, sendError } from '../common/response';

describe('Backend Security & RBAC Middleware (Vitest)', () => {
  it('1. securitySanitizer strips MongoDB NoSQL injection operators ($gt, $ne, $where)', () => {
    const req: any = {
      body: {
        email: { $gt: '' },
        password: { $ne: null },
        normalField: 'valid_user@techpassion.dev',
      },
      query: {
        search: { $where: '1 == 1' },
        page: '1',
      },
      params: {},
    };
    const res: any = {};
    const next = vi.fn();

    securitySanitizer(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.body.email).toEqual({});
    expect(req.body.password).toEqual({});
    expect(req.body.normalField).toBe('valid_user@techpassion.dev');
    expect(req.query.search).toEqual({});
    expect(req.query.page).toBe('1');
  });

  it('2. securitySanitizer cleans XSS <script> tags and javascript: URIs from strings', () => {
    const req: any = {
      body: {
        title: 'AI Revolution <script>alert("xss")</script> in 2026',
        link: 'javascript:evilFunction()',
      },
      query: {},
      params: {},
    };
    const res: any = {};
    const next = vi.fn();

    securitySanitizer(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.body.title).toBe('AI Revolution  in 2026');
    expect(req.body.link).toBe('evilFunction()');
  });

  it('3. requireAdminAuth blocks unauthenticated requests with 401 status', () => {
    const req: any = { headers: {} };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    requireAdminAuth(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('4. requireAdminAuth authorizes requests with valid Admin Bearer token', () => {
    const req: any = {
      headers: {
        authorization: 'Bearer dev_admin_secret_token_2026',
      },
    };
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn();

    requireAdminAuth(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.user).toBeDefined();
    expect(req.user.role).toBe('SUPER_ADMIN');
    expect(req.user.email).toBe('admin@techpassion.dev');
  });

  it('5. Standardized API Response helper (sendSuccess & sendError) returns valid JSON envelope', () => {
    const res: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    sendSuccess(res, { totalPillars: 12 }, 'Fetched successfully', 200);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Fetched successfully',
        data: { totalPillars: 12 },
      })
    );

    sendError(res, 'Forbidden resource', 403);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: 'Forbidden resource',
      })
    );
  });
});
