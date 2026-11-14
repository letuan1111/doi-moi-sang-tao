# Sản phẩm: Bộ công cụ sandbox Đà Nẵng (app-sandbox-da-nang.html)

*Ra mắt 14/11/2026. Sản phẩm web của dự án pj04, hiện thực [bước 4](04-bo-chi-so-checklist-rui-ro.md).*

**Mở:** https://letuan1111.github.io/doi-moi-sang-tao/app-sandbox-da-nang.html

## Tính năng
| Thẻ | Làm gì | Căn cứ |
|---|---|---|
| 1. Tự kiểm tra điều kiện | Đánh dấu 4 điều kiện đầu vào và 7 tiêu chí a–g; chọn lĩnh vực → kết luận "Chưa đủ / Cần bổ sung / Đủ điều kiện cơ bản", danh sách còn thiếu, lưu ý theo lĩnh vực (tài sản mã hóa, thanh toán, ngân hàng – NĐ 94/2025, dữ liệu, chứng khoán) | Điều 1 khoản 2, Điều 2 Quy định kèm NQ 20/2026 |
| 2. Checklist hồ sơ | 21 việc trong 6 thành phần hồ sơ, thanh tiến độ, 3 việc tiếp theo; nhập ngày hồ sơ hợp lệ → ước tính 6 mốc (thẩm định, Hội đồng, trình UBND, quyết định, cấp phép, hạn bắt đầu thử nghiệm) | Điều 3 khoản 1, 3 Quy định |
| 3. Bộ chỉ số đánh giá | 22 chỉ số / 5 nhóm, tự xếp Xanh–Vàng–Đỏ, gợi ý kết luận (tiếp tục, mở rộng, gia hạn, thu hẹp/chấm dứt, tự rút) và việc cần làm; có số liệu mẫu "Điểm Xanh"; nút hỏi trợ lý AI (bản claude.ai) | Khoản 4, 5 Điều 14 NQ 136/2024/QH15; CGAP/World Bank 2020 |
| 4. Bản tóm tắt | Gộp kết quả thành Markdown, sao chép hoặc tải .md | — |

## Cách dùng nhanh
1. Thẻ 1: tick những gì đã có → xem phần còn thiếu.
2. Thẻ 2: tick hồ sơ đã xong, chọn ngày dự kiến nộp để xem mốc.
3. Thẻ 3: bấm "Nạp số liệu mẫu" để xem ví dụ, rồi thay bằng số liệu kỳ báo cáo của bạn.
4. Thẻ 4: sao chép bản tóm tắt gửi cố vấn hoặc mang theo khi gặp Sở.

## Dữ liệu và giới hạn
- Chạy hoàn toàn trên trình duyệt; nháp lưu trong localStorage của máy, nút "Xóa dữ liệu" xóa sạch. Không gửi dữ liệu đi.
- Ngưỡng xanh/vàng/đỏ là **giả định** (xem bước 4), không thay thế quy chế thử nghiệm của cơ quan có thẩm quyền. Mốc thời gian là ước tính, chưa trừ ngày lễ.
- Không phải tư vấn pháp lý.

## Kiểm thử
`python3 tests/smoke.py` mở trang ở 1280px và 390px, kiểm tra không lỗi JS, có h1, không tràn ngang.
