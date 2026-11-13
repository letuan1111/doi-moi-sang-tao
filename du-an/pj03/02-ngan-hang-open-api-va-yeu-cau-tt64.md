# Bước 2. Ngân hàng đã có cổng Open API và sandbox, yêu cầu của Thông tư 64/2024/TT-NHNN

*Ngày thực hiện và tra cứu: 13/11/2026. Người thực hiện: Claude.*

> Phạm vi: chỉ dùng thông tin từ các trang đã mở và đọc được trong ngày tra cứu; mỗi ý có link nguồn. Lần này chưa đọc được toàn văn Thông tư 64 (thuvienphapluat.vn, lawnet.vn không truy cập tự động được), nên các điều khoản dưới đây lấy từ bài phân tích trên Tạp chí Ngân hàng (cơ quan của NHNN) và tin trên cổng NHNN. **Trước khi dùng cho mục đích pháp lý, cần đối chiếu văn bản gốc.**

## Kết luận nhanh

- Có **5 ngân hàng** mà nguồn đã đọc xác nhận có cổng Open API công khai: **VietinBank, BIDV, Sacombank, TPBank, PVcomBank**. Trong đó **VietinBank, BIDV, TPBank, PVcomBank** được nguồn xác nhận có **sandbox**.
- OCB được báo chí nêu là đã có developer portal nhưng chưa tìm thấy trang cổng để kiểm chứng. Techcombank, MB, VPBank: báo chí cho biết **chưa công bố chiến lược Open Banking chính thức**.
- **Mốc quan trọng:** các ngân hàng đã kết nối trước 1/3/2025 phải **hoàn thành tuân thủ Thông tư 64 trước 1/3/2027**, tức còn khoảng 3,5 tháng.

## 1. Yêu cầu chính của Thông tư 64/2024/TT-NHNN

| Nội dung | Yêu cầu | Nguồn |
|---|---|---|
| Phạm vi | Ngân hàng thương mại, ngân hàng hợp tác xã, chi nhánh ngân hàng nước ngoài | [Brankas, 27/5/2025](https://blog.brankas.com/How-Open-Banking-is-Evolving-in-Vietnam-with-The-New-Circular-64/) |
| Hiệu lực | 01/3/2025 | [Tạp chí Ngân hàng, 24/2/2025](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |
| Lộ trình chuyển tiếp | Ngân hàng đã kết nối trước đó: nộp danh mục API và kế hoạch tuân thủ **trước 01/7/2025**; hoàn thành tuân thủ **trước 01/3/2027** | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html); [Brankas](https://blog.brankas.com/How-Open-Banking-is-Evolving-in-Vietnam-with-The-New-Circular-64/) |
| Nguyên tắc (Điều 4) | Tuân thủ pháp luật về bảo mật, cung cấp thông tin khách hàng, bảo vệ dữ liệu cá nhân; dữ liệu dùng đúng mục đích trong hợp đồng | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |
| Hợp đồng ngân hàng – bên thứ ba (Điều 8) | Cam kết bảo mật, dùng dữ liệu đúng phạm vi, thông báo vi phạm an toàn thông tin, đánh giá cấp độ hệ thống, quyền truy cập, điều khoản chấm dứt | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |
| Trách nhiệm ngân hàng (Điều 11) | Hệ thống tối thiểu **cấp độ 3**; công cụ để khách **tra cứu và rút lại đồng ý**; thời hạn truy vấn sau một lần đồng ý tối đa **180 ngày** (trừ thỏa thuận khác); giới hạn truy vấn tự động; nhật ký lưu tối thiểu **3 tháng**, sao lưu tối thiểu **1 năm** | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |
| Trách nhiệm bên thứ ba (Điều 12) | Công cụ trực tuyến để khách tra cứu và rút đồng ý; thông báo kịp thời cho ngân hàng khi có sự cố | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |
| Kỹ thuật | REST, JSON, OAuth 2.0, TLS ≥ 1.2, chữ ký điện tử JWS; bên thứ ba phải được đánh giá cấp độ và cam kết bảo mật | [Cổng NHNN, 14/11/2025](https://sbv.gov.vn/en/w/open-api-tr%E1%BB%A5c-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BB%9Bi-c%E1%BB%A7a-h%E1%BB%87-sinh-th%C3%A1i-t%C3%A0i-ch%C3%ADnh-s%E1%BB%91-vi%E1%BB%87t-nam) |
| Quyền của khách hàng | Đồng ý hoặc không đồng ý chia sẻ, tra cứu lịch sử chia sẻ, rút lại đồng ý bất cứ lúc nào; bên thứ ba chỉ dùng dữ liệu trong phạm vi đã thỏa thuận và được khách đồng ý | [Cổng NHNN](https://sbv.gov.vn/en/w/open-api-tr%E1%BB%A5c-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BB%9Bi-c%E1%BB%A7a-h%E1%BB%87-sinh-th%C3%A1i-t%C3%A0i-ch%C3%ADnh-s%E1%BB%91-vi%E1%BB%87t-nam) |
| "Đồng ý" | Thể hiện "rõ ràng, tự nguyện, khẳng định việc cho phép xử lý dữ liệu cá nhân" | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |

- Danh mục nhóm API chi tiết trong phụ lục Thông tư: **chưa tìm thấy nguồn đã đọc được**. Theo cổng NHNN, dịch vụ đang triển khai tập trung vào ví điện tử, khởi tạo thanh toán, truy vấn tài khoản ([Cổng NHNN](https://sbv.gov.vn/en/w/open-api-tr%E1%BB%A5c-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BB%9Bi-c%E1%BB%A7a-h%E1%BB%87-sinh-th%C3%A1i-t%C3%A0i-ch%C3%ADnh-s%E1%BB%91-vi%E1%BB%87t-nam)).
- Số ngân hàng đã nộp danh mục API hoặc đã tuân thủ: **chưa tìm thấy nguồn**.

## 2. Danh sách ngân hàng có cổng Open API

| Ngân hàng | Cổng | Sandbox | Dịch vụ, số liệu | Nguồn |
|---|---|---|---|---|
| **VietinBank** | openapi.vietinbank.vn (phiên bản mới ra mắt 6/2026); trước đó có nền tảng iConnect | **Có** – sandbox tự động, thử API trên trình duyệt | 8 gói giải pháp theo ngành, 19 sản phẩm số (chuyển tiền, chi lương, VietQR Pay, giải ngân, thanh toán hóa đơn); đăng ký trực tuyến cho doanh nghiệp. iConnect: hơn 55 triệu giao dịch/tháng (theo bài 3/2026) | [VietinBank, 15/6/2026](https://www.vietinbank.vn/vietinbank-open-api-portal-phien-ban-moi-don-dau-xu-huong-tai-chinh-so-thong-minh-20260615044700-00-html); [Thị trường Tài chính Tiền tệ, 17/3/2026](https://thitruongtaichinhtiente.vn/open-banking-tu-xu-huong-cong-nghe-den-chien-luoc-phat-trien-cua-ngan-hang-80390.html) |
| **BIDV** | openapi.bidv.com.vn/devportal ("BIDV Open API") | **Có** theo báo chí: hơn 17.000 lượt thử trên sandbox | 15 gói API; khoảng 60 đối tác tham gia sau hơn 3 tháng | [Thị trường Tài chính Tiền tệ](https://thitruongtaichinhtiente.vn/open-banking-tu-xu-huong-cong-nghe-den-chien-luoc-phat-trien-cua-ngan-hang-80390.html); [Trang cổng BIDV](https://openapi.bidv.com.vn/devportal/) |
| **Sacombank** | openapi.sacombank.com.vn ("SACOMBANK OPEN API", 3/2026) | Chưa tìm thấy nguồn | Cá nhân: mở tài khoản, mở thẻ, ủy thác thanh toán trên nền tảng đối tác; doanh nghiệp: tích hợp ERP, thu hộ – đối soát qua tài khoản ảo | [Sacombank, 13/3/2026](https://www.sacombank.com.vn/en/home/news/sacombank-news/2026/sacombank-expands-its-partner-ecosystem-through-open-banking-solutions.html) |
| **TPBank** | developer.tpb.vn | **Có** – "Sandbox API" | Tài liệu và mã mẫu cho từng API; không chia nhóm công khai | [Trang cổng TPBank](https://developer.tpb.vn/tpb/portal/fr/about-us) |
| **PVcomBank** | developer.pvcombank.com.vn | **Có** – thử API trên trình duyệt | 3 nhóm: ví điện tử, thu hộ, chi hộ | [Trang cổng PVcomBank](https://developer.pvcombank.com.vn/en) |
| OCB | Báo chí nêu có developer portal | Chưa tìm thấy nguồn | — | [Doanh nghiệp Hội nhập, 12/4/2026](https://doanhnghiephoinhap.vn/open-banking-thay-doi-cach-ngan-hang-viet-tim-tang-truong-132415.html); [Tin nhanh Chứng khoán, 20/6/2026](https://www.tinnhanhchungkhoan.vn/ngan-hang-mo-tang-toc-post392103.html) |
| Techcombank, MB, VPBank | Chưa công bố chiến lược Open Banking chính thức; tích hợp đối tác qua bộ phận kinh doanh số | Chưa tìm thấy nguồn | — | [Tin nhanh Chứng khoán](https://www.tinnhanhchungkhoan.vn/ngan-hang-mo-tang-toc-post392103.html) |
| Vietcombank, ACB | Chưa tìm thấy nguồn đã đọc được | — | — | — |

Ghi chú: các trang tổng hợp quốc tế (Open Banking Tracker, banq.ai) có liệt kê thêm ngân hàng Việt Nam nhưng chưa được mở và đọc lần này, nên không đưa vào bảng.

## 3. Khó khăn được báo chí ghi nhận

Theo [Tin nhanh Chứng khoán (20/6/2026)](https://www.tinnhanhchungkhoan.vn/ngan-hang-mo-tang-toc-post392103.html):
- Năng lực bảo mật giữa các tổ chức chưa đồng đều; tiêu chuẩn chung còn đang hoàn thiện, nguy cơ phân mảnh.
- **Cơ chế "đồng ý chia sẻ dữ liệu" nhiều khi chỉ mang tính hình thức.**
- Phần lớn ngân hàng chưa đặt nặng việc thu phí API.

Theo [Tạp chí Ngân hàng (2/2025)](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html): mỗi ngân hàng dùng một tiêu chuẩn Open API và tiêu chuẩn bảo mật khác nhau; đề xuất hạ tầng dùng chung về ngân hàng mở.

## 4. Hệ quả cho dự án

1. **Bước 3 (luồng đồng ý)** phải thể hiện được: phạm vi dữ liệu, bên nhận, mục đích, **thời hạn tối đa 180 ngày**, nút **rút lại đồng ý** và **lịch sử chia sẻ** ở cả phía ngân hàng và phía ứng dụng bên thứ ba. Đây đúng là điểm yếu "đồng ý hình thức" mà báo chí nêu.
2. **Bước 4 (demo)** mô phỏng OAuth 2.0 + ủy quyền có thời hạn, chỉ dùng dữ liệu giả lập; hiển thị đếm ngược ngày hết hạn đồng ý.
3. **Bước 5 (người thực hiện)**: ứng viên sandbox dễ tiếp cận nhất là **VietinBank** (sandbox tự động, đăng ký trực tuyến cho doanh nghiệp), **PVcomBank**, **TPBank**, **BIDV**. Lưu ý VietinBank hướng tới doanh nghiệp – cần pháp nhân để đăng ký (giả định, cần kiểm tra khi đăng ký).

## 5. Việc còn mở

- Đọc toàn văn Thông tư 64 (danh mục API trong phụ lục, yêu cầu công khai thông tin trên website).
- Kiểm chứng cổng của OCB, Vietcombank, ACB, MB, Techcombank, VPBank.
- Số liệu NHNN về số tổ chức đã nộp danh mục API trước 1/7/2025.

## Nguồn đã mở và đọc (13/11/2026)

- Tạp chí Ngân hàng (24/2/2025): https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html
- Cổng NHNN (14/11/2025): https://sbv.gov.vn/en/w/open-api-tr%E1%BB%A5c-k%E1%BA%BFt-n%E1%BB%91i-m%E1%BB%9Bi-c%E1%BB%A7a-h%E1%BB%87-sinh-th%C3%A1i-t%C3%A0i-ch%C3%ADnh-s%E1%BB%91-vi%E1%BB%87t-nam
- Brankas (27/5/2025): https://blog.brankas.com/How-Open-Banking-is-Evolving-in-Vietnam-with-The-New-Circular-64/
- VietinBank (15/6/2026): https://www.vietinbank.vn/vietinbank-open-api-portal-phien-ban-moi-don-dau-xu-huong-tai-chinh-so-thong-minh-20260615044700-00-html
- Thị trường Tài chính Tiền tệ (17/3/2026): https://thitruongtaichinhtiente.vn/open-banking-tu-xu-huong-cong-nghe-den-chien-luoc-phat-trien-cua-ngan-hang-80390.html
- Sacombank (13/3/2026): https://www.sacombank.com.vn/en/home/news/sacombank-news/2026/sacombank-expands-its-partner-ecosystem-through-open-banking-solutions.html
- Cổng BIDV Open API: https://openapi.bidv.com.vn/devportal/
- Cổng TPBank: https://developer.tpb.vn/tpb/portal/fr/about-us
- Cổng PVcomBank: https://developer.pvcombank.com.vn/en
- Doanh nghiệp Hội nhập (12/4/2026): https://doanhnghiephoinhap.vn/open-banking-thay-doi-cach-ngan-hang-viet-tim-tang-truong-132415.html
- Tin nhanh Chứng khoán (20/6/2026): https://www.tinnhanhchungkhoan.vn/ngan-hang-mo-tang-toc-post392103.html

Đã thử nhưng không đọc được: bài gốc Thời báo Tài chính trong hồ sơ dự án, lawnet.vn, thuvienphapluat.vn.
