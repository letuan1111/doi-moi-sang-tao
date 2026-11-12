# Đổi mới sáng tạo

Trang tổng hợp **ý tưởng** và **dự án đổi mới sáng tạo đang được thực thi** trong giáo dục, nền tảng giao dịch, ngân hàng – fintech, mô hình kinh doanh và khoa học – công nghệ, ở Việt Nam và quốc tế.

**Xem trực tuyến:** https://letuan1111.github.io/doi-moi-sang-tao/

- 63 ý tưởng, 12 dự án đang thực thi, mỗi mục có link tới nguồn gốc; có chuyên mục Bảo mật – Chống lừa đảo và Dữ liệu cá nhân.
- Ý tưởng kinh doanh có mục "Bắt đầu từ đâu" và nhãn mức vốn khởi đầu.

## Tính năng

| Tính năng | Mô tả | Học hỏi từ |
|---|---|---|
| Điểm ưu tiên ICE | Mỗi ý tưởng được chấm Impact · Confidence · Ease (1–10), lấy trung bình, có thanh điểm trực quan | rice-ice-tool, Parpt |
| Top 5 đáng làm | Bảng xếp hạng theo ICE trong bộ lọc hiện tại | Startup Idea Evaluator (leaderboard) |
| Ma trận ưu tiên | Lưới 2×2 Tác động × Vốn: Thắng nhanh, Đặt cược chiến lược, Thử nghiệm nhỏ, Cân nhắc kỹ | Value vs. Effort matrix |
| Gợi ý cho tôi | Chọn vốn, lĩnh vực, khu vực → xếp hạng 5 ý tưởng phù hợp kèm lý do | — |
| Lean Canvas | Kế hoạch kinh doanh 1 trang 9 ô cho từng ý tưởng, lưu nháp, sao chép Markdown; bản claude.ai có nút **AI điền gợi ý** | leancanvas, bcanvas, Lean Canvas GPT |
| Kanban dự án | Xem dự án theo cột giai đoạn: Khởi động → Thử nghiệm → Mở rộng → Hoàn thành | Fider roadmap |
| Link tới từng ý tưởng | `#idea-<id>` mở và làm nổi bật đúng thẻ, nút "Sao chép link" | Idea Tracker (copy-link) |
| Xuất dữ liệu | Sao chép bảng Markdown, tải CSV (bản GitHub) | Idea Tracker, rice-ice-tool |
| Phím tắt | `/` để tìm kiếm | — |
| Trợ lý AI ngân hàng & bảo mật | Chat về ý tưởng chống lừa đảo, xác thực mạnh, deepfake, bảo vệ dữ liệu cá nhân; tự tra kho ý tưởng và dẫn nguồn; chặn gửi số thẻ, mật khẩu. Chỉ chạy trên bản claude.ai (bản GitHub là trang tĩnh, không có máy chủ AI) | Ideation Tool (AI assistance) |

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Toàn bộ giao diện (HTML + CSS + JS, không cần build) |
| `data.json` | Dữ liệu ý tưởng và dự án |

## Thêm hoặc sửa nội dung

Sửa `data.json` rồi commit. Mỗi ý tưởng gồm: `title`, `summary`, `category`, `region` (`vn` hoặc `intl`), `impact` (1–3), `capital` (1 thấp, 2 vừa, 3 cao), `steps` (danh sách bước), `sourceUrl`, `sourceName`. Mỗi dự án có thêm `stage` (`kickoff`, `pilot`, `scale`, `done`, `paused`), `lead`, `kpi`, `start`, `end` và danh sách `milestones` (`{ "t": "...", "done": true }`).

## Chạy thử trên máy

```bash
python -m http.server 8000
# mở http://localhost:8000
```

Nội dung mô tả được viết lại bằng tiếng Việt từ các nguồn báo chí và báo cáo công khai, cập nhật 11/2026. Điểm ICE chỉ để so sánh tương đối giữa các ý tưởng, không phải dự báo lợi nhuận.

## Phòng thử nghiệm (lab.html)

Các ý tưởng bảo mật, chống lừa đảo, dữ liệu cá nhân được hiện thực thành 6 công cụ chạy trên trình duyệt, chỉ dùng dữ liệu giả lập:

1. **Kiểm tra người nhận** (Confirmation of Payee + danh sách cảnh báo kiểu SIMO), so tên bỏ dấu, đảo thứ tự, thiếu tên đệm.
2. **Chấm điểm rủi ro giao dịch** theo tầng: cho qua, cảnh báo, sinh trắc học + dừng 10 giây, tạm giữ gọi lại, chặn; đánh dấu ngưỡng QĐ 2345/QĐ-NHNN.
3. **Soi tin nhắn lừa đảo**: luật nhận diện kịch bản phổ biến tại Việt Nam, tô sáng đoạn đáng ngờ; phân tích AI tùy chọn trên bản claude.ai.
4. **Xác minh cuộc gọi ngân hàng**: nhân viên ghi nhận cuộc gọi, khách kiểm tra số và mã trong app.
5. **Passkey (WebAuthn)** thay OTP SMS.
6. **Dữ liệu của tôi**: đồng ý theo mục đích, yêu cầu quyền chủ thể có hạn xử lý, nhật ký, tự đánh giá tuân thủ Luật 91/2025 và NĐ 356/2025.

Không có máy chủ: dữ liệu demo nằm trong localStorage và xóa được bằng một nút.
