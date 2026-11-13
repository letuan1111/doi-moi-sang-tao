"""Kiểm thử nhanh toàn bộ trang: dữ liệu hợp lệ, trang mở không lỗi JS, các công cụ chính chạy đúng.
Chạy: python3 tests/smoke.py   (tự bật máy chủ tĩnh ở cổng 8765)
Biến môi trường CHROME=/đường/dẫn/chrome để dùng Chrome có sẵn thay cho Chromium của Playwright."""
import json, os, sys, threading, http.server, socketserver, functools, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = int(os.environ.get("PORT", "8765"))
fails = []
def check(cond, msg):
    print(("  ok  " if cond else "  FAIL") + " " + msg)
    if not cond: fails.append(msg)

# 1. Dữ liệu
d = json.loads((ROOT / "data.json").read_text(encoding="utf-8"))
ids = [i["id"] for i in d["ideas"]]
check(len(ids) == len(set(ids)), f"id ý tưởng không trùng ({len(ids)} ý tưởng)")
check(all(i.get("title") and i.get("category") for i in d["ideas"]), "ý tưởng nào cũng có tiêu đề và lĩnh vực")
for p in d["projects"]:
    for s in p.get("roadmap", []):
        if s.get("out"):
            check((ROOT / s["out"]).exists(), f"{p['id']} bước {s['n']}: tệp kết quả {s['out']} tồn tại")
        check(s.get("owner") in ("claude", "nguoi") and s.get("status") in ("todo", "done"), f"{p['id']} bước {s['n']}: owner/status hợp lệ")

# 2. Trang
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = socketserver.TCPServer(("127.0.0.1", PORT), functools.partial(Quiet, directory=str(ROOT)))
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{PORT}/"

with sync_playwright() as pw:
    kw = {"executable_path": os.environ["CHROME"]} if os.environ.get("CHROME") else {}
    b = pw.chromium.launch(**kw)
    def page(path, vw=1280):
        pg = b.new_page(viewport={"width": vw, "height": 900}); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(BASE + path); pg.wait_for_timeout(900)
        return pg, errs
    for path, sel in [("index.html", "nav.tabs"), ("lab.html", "#v-nguoi-nhan"), ("tools.html", "#l-stats .stat"), ("du-an.html", ".card"), ("404.html", "h1")]:
        if not (ROOT / path).exists(): continue
        for vw in (1280, 390):
            pg, errs = page(path, vw)
            check(not errs, f"{path} @{vw}px không lỗi JS {errs[:1] if errs else ''}")
            check(pg.locator(sel).count() > 0, f"{path} @{vw}px có {sel}")
            check(not pg.evaluate("document.documentElement.scrollWidth > innerWidth + 1"), f"{path} @{vw}px không tràn ngang")
            pg.close()
    # Công cụ
    pg, errs = page("index.html")
    check(pg.locator("article.card").count() >= len(d["ideas"]) // 2, "trang chính hiển thị thẻ ý tưởng")
    pg.close()
    pg, errs = page("lab.html#tin-nhan")
    pg.click("#sc-ex"); check("lừa đảo" in pg.inner_text("#sc-out"), "soi tin nhắn nhận ra ví dụ lừa đảo")
    pg.goto(BASE + "lab.html#rui-ro"); pg.wait_for_timeout(300); check("/100" in pg.inner_text("#risk-out"), "chấm điểm rủi ro có kết quả")
    pg.close()
    pg, errs = page("tools.html")
    check("5.071.333" in pg.inner_text("#l-stats"), "máy tính vay: 500 triệu, 9%, 15 năm = 5.071.333 đ/tháng")
    pg.close()
    pg, errs = page("du-an.html")
    pg.locator(".res").first.click(); pg.wait_for_timeout(500)
    check(len(pg.inner_text("#d-body")) > 200, "trang lộ trình mở được tài liệu kết quả")
    pg.close()
    b.close()
srv.shutdown()
print(f"\n{'THẤT BẠI: ' + str(len(fails)) + ' lỗi' if fails else 'TẤT CẢ ĐỀU ĐẠT'}")
sys.exit(1 if fails else 0)
