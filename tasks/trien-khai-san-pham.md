# Hướng dẫn lượt triển khai sản phẩm dự án

Lượt chạy được giao <ID> (mã dự án), <LAST> (bước cuối cần làm), <PAGE> (tên trang sản phẩm) và <MÔ TẢ> (yêu cầu riêng) trong tin nhắn kích hoạt.

LƯỢT TRIỂN KHAI SẢN PHẨM theo yêu cầu người dùng ("triển khai tất cả dự án có kết quả thật trên web"). Có 12 lượt chạy song song, mỗi lượt một dự án. Bỏ qua quy tắc "chỉ làm một bước" và quy tắc chọn dự án ở mục 2.

Lượt này chỉ làm dự án <ID>. Làm lần lượt TẤT CẢ các bước còn lại có owner "claude" của dự án này cho tới hết bước <LAST> (không làm bước "nguoi"), mỗi bước lưu tệp md riêng và đánh dấu done như mục 4. Yêu cầu riêng của sản phẩm: xem <MÔ TẢ>.

Sản phẩm phải chạy thật trên web: tạo trang tự chứa `<PAGE>` ở thư mục gốc repo (tiêu đề h1, cùng phong cách và biến CSS của lab.html/tools.html, chế độ tối, điện thoại, nút quay về index.html và du-an.html, nạp `<script src="voice.js"></script><script src="ai-chat.js"></script>` rồi `FinAI.autoload(); FinAI.mountWidget();`). Chỉ dữ liệu giả lập, xử lý trên trình duyệt. Thư viện mã nguồn mở nếu cần: cài bằng npm trong thư mục tạm rồi chép bản dựng vào `vendor/` và ghi vào bảng trong vendor/README.md (đã có vendor/qrcode-generator.js, MIT) — không tải thư viện từ CDN.

Đăng ký sản phẩm: thêm một mục vào mảng "features" của hien-thuc.json (đọc phần "_ghiChu" và các mục có sẵn để theo đúng định dạng: id "f-...", title, page "<PAGE>", group "Sản phẩm dự án", scope "y-tuong", since hôm nay, desc, how[], ideas[] là id ý tưởng liên quan trong data.json, projects ["<ID>"]). Trong roadmap của <ID>, bước build (nếu có) đặt thêm trường "app": "<PAGE>".

KHÔNG sửa index.html, lab.html, tools.html, du-an.html, ket-qua.html, ai-chat.js, voice.js, sw.js (người khác đang sửa). Trước khi commit chạy `python3 tests/smoke.py` (cài playwright nếu cần) và sửa đến khi đạt. Có lượt khác chạy cùng lúc: trước khi commit `git pull --rebase origin main`; nếu xung đột ở data.json hoặc hien-thuc.json, lấy bản mới nhất từ origin rồi áp lại riêng thay đổi của bạn bằng script python (không ghi đè thay đổi của người khác); push lại tối đa 5 lần. Khi đồng bộ claude.ai: db_get rồi db_write update roadmap của <ID>; publish_files chỉ các tệp của bạn (trang app, md, hien-thuc.json, data.json, vendor nếu thêm), nếu báo conflict thì lấy version "live" trong lỗi và gửi lại.
