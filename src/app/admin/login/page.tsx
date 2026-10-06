import { redirect } from "next/navigation";
import { gilroy } from "@/fonts";
import { getCurrentUser } from "@/server/auth";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

// CSS nhúng trực tiếp (không phụ thuộc file stylesheet ngoài) để trang đăng nhập luôn hiển thị đúng.
// Theo ngôn ngữ thiết kế của website: xanh thép + bạc + trắng, bo góc vuông, tiêu đề in hoa đậm, font SVN Gilroy.
const CSS = `
.lg{min-height:100vh;display:grid;grid-template-columns:1fr;font-family:var(--font-gilroy),ui-sans-serif,system-ui,sans-serif;color:#0f172a;background:#f8fafc}
.lg *{box-sizing:border-box}
.lg-hero{display:none;position:relative;background:#0d1e2b url('/images/factory/ma-treo-2.jpg') center/cover;color:#fff}
.lg-hero::before{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(13,30,43,.88),rgba(35,72,98,.72))}
.lg-hero-in{position:relative;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:56px}
.lg-hero h2{margin:0 0 12px;font-size:40px;line-height:1.1;font-weight:800;letter-spacing:-.01em;text-transform:uppercase}
.lg-hero h2 span{color:#8bb3cd}
.lg-hero p{margin:0;max-width:440px;font-size:16px;line-height:1.6;color:#dbe8f0}
.lg-hero-tag{display:inline-block;align-self:flex-start;margin-bottom:20px;padding:4px 10px;border:1px solid rgba(255,255,255,.3);font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600}
.lg-main{display:flex;align-items:center;justify-content:center;padding:32px 20px;min-height:100vh}
.lg-card{width:100%;max-width:400px}
.lg-logo{height:52px;width:auto;display:block;margin:0 0 36px}
.lg-card h1{margin:0 0 6px;font-size:26px;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;color:#0f172a}
.lg-sub{margin:0 0 28px;font-size:15px;color:#64748b}
.lg-form{display:flex;flex-direction:column;gap:18px}
.lg-field{display:flex;flex-direction:column;gap:6px}
.lg-field label{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#334155}
.lg-input{width:100%;height:46px;padding:0 14px;font:inherit;font-size:15px;color:#0f172a;background:#fff;border:1px solid #cbd5e1;border-radius:2px;outline:none;transition:border-color .15s,box-shadow .15s}
.lg-input:focus{border-color:#2b5a7a;box-shadow:0 0 0 3px rgba(43,90,122,.18)}
.lg-btn{height:48px;margin-top:6px;font:inherit;font-size:14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:#2b5a7a;border:0;border-radius:2px;cursor:pointer;transition:background .15s}
.lg-btn:hover{background:#234862}
.lg-btn:disabled{opacity:.65;cursor:default}
.lg-err{margin:0;padding:10px 12px;font-size:14px;color:#991b1b;background:#fef2f2;border-left:3px solid #dc2626}
.lg-foot{margin:32px 0 0;font-size:12px;color:#94a3b8}
@media(min-width:900px){.lg{grid-template-columns:1.1fr 1fr}.lg-hero{display:block}}
`;

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return (
    <main className={`lg ${gilroy.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="lg-hero" aria-hidden="true">
        <div className="lg-hero-in">
          <span className="lg-hero-tag">HANIN CMS</span>
          <h2>
            Quản trị <span>nội dung</span> website
          </h2>
          <p>Quản lý dịch vụ, sản phẩm, tin tức, tuyển dụng, banner và yêu cầu liên hệ tại một nơi.</p>
        </div>
      </section>
      <section className="lg-main">
        <div className="lg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lg-logo" src="/hanin-logo.png" alt="HANIN Plating" />
          <h1>Đăng nhập</h1>
          <p className="lg-sub">Nhập tài khoản quản trị để tiếp tục.</p>
          <LoginForm />
          <p className="lg-foot">© HANIN Technology Việt Nam</p>
        </div>
      </section>
    </main>
  );
}
