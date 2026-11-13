# Ngân hàng mở (Open API) theo Thông tư 64/2024/TT-NHNN

**Mục tiêu hành động:** Mẫu sản phẩm tài chính nhúng qua Open API, đặt quyền đồng ý của khách hàng lên trước

### Hiện trạng
Chuẩn hóa kết nối giữa ngân hàng với fintech và doanh nghiệp qua giao diện lập trình mở, làm nền cho tài chính nhúng và BaaS. Nhiều ngân hàng đã ra mắt cổng Open API, nhưng vẫn còn đơn vị chậm chân. Nguồn: [Thời báo Tài chính](https://thoibaotaichinhvietnam.vn/open-api-dinh-hinh-san-choi-moi-nganh-ngan-hang-con-khong-it-don-vi-cham-chan-186909.html)

Đơn vị dẫn dắt: Ngân hàng Nhà nước Việt Nam. Chỉ tiêu chính: Kết nối an toàn, chuẩn hóa giữa ngân hàng và bên thứ ba.

### Vì sao làm
Thông tư 64 đã có hiệu lực từ 1/3/2025 nhưng nhiều đơn vị còn chậm. Startup fintech cần ví dụ cụ thể về cách kết nối và đặc biệt là cách xin đồng ý của khách hàng đúng luật dữ liệu cá nhân.

### Trang Đổi mới sáng tạo sẽ làm gì
- Bản thiết kế luồng đồng ý: khách thấy rõ chia sẻ gì, cho ai, bao lâu, thu hồi bằng một chạm.
- Demo dùng API giả lập, không chạm vào dữ liệu ngân hàng thật.

### Lộ trình
1. Hồ sơ dự án và kế hoạch hành động (Claude) ✓
2. Lập danh sách ngân hàng đã có cổng Open API và sandbox, yêu cầu của Thông tư 64, có nguồn (Claude)
3. Thiết kế luồng đồng ý chia sẻ dữ liệu đúng Luật Bảo vệ dữ liệu cá nhân 2025 (Claude)
4. Demo ứng dụng quản lý chi tiêu dùng API giả lập, có màn hình cấp và thu hồi quyền (Claude)
5. Đăng ký sandbox của một ngân hàng thật để thử kết nối (Người thực hiện)
6. Đánh giá kết quả, viết hướng dẫn cho startup fintech (Claude)

Claude làm dần các bước của Claude theo thứ tự, mỗi lần một bước, lưu kết quả vào thư mục dự án. Bước của người cần bạn hoặc đối tác thực hiện; Claude chuẩn bị tài liệu sẵn.

### Chỉ số đo kết quả
- Danh sách ngân hàng có cổng Open API, có nguồn
- Demo hoạt động trên trang
- Kết nối thành công với ít nhất 1 sandbox ngân hàng thật (bước cần người)

### Rủi ro và nguyên tắc
- Tài liệu API của từng ngân hàng khác nhau và có thể yêu cầu ký thỏa thuận: bước 5 do người thực hiện.
- Demo chỉ dùng dữ liệu giả lập.
- Mọi số liệu mới phải có nguồn đã mở và đọc; không bịa số liệu, văn bản hay link.

*Lập ngày 13/11/2026.*
