/**
 * Tạo hoặc đặt lại tài khoản quản trị trên DB hiện có (không kiểm tra độ dài mật khẩu — dùng cho tài khoản demo).
 *   npm run db:create-admin -- <tài khoản> <mật khẩu>
 */
import { getDb } from "../src/server/db";
import { hashPassword } from "../src/server/auth";

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Cách dùng: npm run db:create-admin -- <tài khoản> <mật khẩu>");
  process.exit(1);
}
getDb()
  .prepare(
    `INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Quản trị viên', ?, 'admin')
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, role = 'admin', active = 1`,
  )
  .run(email, hashPassword(password));
console.log(`Đã tạo/cập nhật tài khoản quản trị "${email}".`);
