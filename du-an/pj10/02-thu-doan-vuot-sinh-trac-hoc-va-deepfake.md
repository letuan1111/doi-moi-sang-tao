# Bước 2. Các thủ đoạn vượt sinh trắc học và deepfake đã được ghi nhận

*Ngày thực hiện và tra cứu: 13/11/2026. Người thực hiện: Claude.*

> **Phạm vi.** Tài liệu chỉ tổng hợp những thủ đoạn **đã được cơ quan chức năng, báo chí chính thống hoặc tổ chức bảo mật công bố**, mô tả ở mức đủ để nhận diện và phòng tránh. Tài liệu **không** nêu công cụ cụ thể, cách cấu hình hay từng bước tấn công. Mỗi ý có link nguồn đã mở và đọc trong ngày tra cứu. Điều gì chưa kiểm chứng được ghi "chưa tìm thấy nguồn".

## Kết luận nhanh

1. **Lừa người dùng tự mở cửa vẫn là đường phổ biến nhất.** Kẻ gian giả danh nhân viên ngân hàng, Ngân hàng Nhà nước, công an, rồi dụ nạn nhân cài ứng dụng giả "hỗ trợ cập nhật sinh trắc học", gửi ảnh căn cước, ảnh mặt, quay video mặt. Sinh trắc học vẫn đúng, nhưng chính chủ đã bị dắt mũi.
2. **Thay hình ảnh đưa vào camera.** Ở Việt Nam, công an đã triệt phá các nhóm dùng thiết bị bị can thiệp hoặc phần mềm chiếm camera, đưa ảnh chân dung có sẵn thay cho khuôn mặt thật lúc ngân hàng yêu cầu quét mặt. Quốc tế gọi đây là **tấn công tiêm (injection)**, khó hơn tấn công trình diện (đưa ảnh hay màn hình ra trước camera).
3. **Deepfake đã thành dịch vụ có giá rẻ.** Group-IB ghi nhận ảnh deepfake, danh tính tổng hợp, giọng nói nhân bản được rao bán từ khoảng 5 USD, và 8.065 lần thử vượt kiểm tra liveness ở một tổ chức tài chính trong 8 tháng.
4. **Deepfake gọi video để dụ chuyển tiền** (không cần vượt sinh trắc): vụ Arup tại Hồng Kông mất khoảng 25 triệu USD sau một cuộc họp video với "giám đốc tài chính" giả.
5. **Hướng phòng thủ được các nguồn nêu chung:** chống giả mạo sinh trắc đạt chuẩn (ISO 30107 mức 2 theo NHNN; CEN 18099 cho tấn công tiêm), phát hiện thiết bị bị can thiệp, kết hợp tín hiệu thiết bị, phiên, hành vi và giao dịch. Đây là đầu vào cho checklist ở Bước 3.

## 1. Bối cảnh Việt Nam: quy định và số liệu

| Nội dung | Chi tiết | Nguồn |
|---|---|---|
| Quyết định 2345/QĐ-NHNN (18/12/2023) | Giải pháp an toàn, bảo mật trong thanh toán trực tuyến và thanh toán thẻ | [Tạp chí Ngân hàng, 6/7/2026](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html) |
| Thông tư 50/2024/TT-NHNN (31/10/2024) | Bắt buộc xác thực sinh trắc với khách cá nhân khi giao dịch trên 10 triệu đồng, tổng trong ngày trên 20 triệu đồng, đăng nhập lần đầu trên thiết bị mới, đổi thiết bị hoặc đổi thông tin bảo mật quan trọng | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html) |
| Thông tư 17/2024/TT-NHNN (28/6/2024) | Đối chiếu giấy tờ tùy thân và sinh trắc trước khi rút tiền, thanh toán điện tử; một số trường hợp mở hoặc thay đổi tài khoản phải xác thực trực tiếp | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html) |
| Yêu cầu chống can thiệp ứng dụng | NHNN chỉ đạo ngân hàng phát hiện và chặn gỡ lỗi, giả lập, máy ảo, kết nối máy tính, chèn mã, móc nối API, ứng dụng bị đóng gói lại, thiết bị đã root hoặc jailbreak; khi phát hiện thì ứng dụng tự đóng. Bài không dẫn số hiệu văn bản cho yêu cầu này: **chưa tìm thấy nguồn văn bản gốc** | [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html) |
| Chuẩn chống giả mạo | Chống giả mạo sinh trắc phải đạt **ISO 30107 mức 2**; ứng dụng phải phát hiện thiết bị bị xâm nhập và tự dừng | [SGGP, 7/11/2026](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html) |
| Dự kiến đầu năm 2027 | Khách tự đặt hạn mức giao dịch; chuyển tiền lần đầu tới người nhận mới (trong vòng 1 năm) bị trễ tối thiểu 24 giờ | [SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html) |
| Hiệu quả sinh trắc | Sau khi áp dụng sinh trắc khi chuyển tiền, số tài khoản cá nhân bị lừa giảm khoảng 59%, số tiền bị lừa giảm 52% (theo NHNN) | [VnEconomy, 26/11/2025](https://vneconomy.vn/techconnect/dung-ai-deepfake-lua-dao-giong-that-den-muc-chuyen-gia-cung-co-the-mac-bay.htm) |
| Độ phủ sinh trắc | Đến 2/10/2026: hơn 178 triệu hồ sơ khách hàng đã đối chiếu sinh trắc qua căn cước gắn chip hoặc VNeID, phủ toàn bộ tài khoản có giao dịch số | [SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html) |
| SIMO sau 1 năm | 5,8 triệu lượt cảnh báo; khoảng 1,9 triệu khách dừng hoặc hủy giao dịch, gần 7.200 tỷ đồng | [SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html) |
| Tài khoản có dấu hiệu bất thường | Hệ thống giám sát của NHNN, kết nối gần 100 tổ chức, gắn cờ hơn 668.000 tài khoản có dấu hiệu bất hợp pháp | [SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html) |

*Số liệu SGGP lấy từ Diễn đàn An ninh tài chính số Việt Nam 2026 (TP.HCM, 6/11/2026).*

## 2. Các thủ đoạn đã ghi nhận ở Việt Nam

### 2.1. Giả danh "hỗ trợ cập nhật sinh trắc học" (lừa đảo xã hội + ứng dụng giả)

- **Cách tiếp cận:** gọi điện, nhắn tin, kết bạn Zalo, Facebook, xưng là nhân viên ngân hàng; đề nghị "hỗ trợ" thu thập sinh trắc; xin thông tin tài khoản, ảnh căn cước, ảnh khuôn mặt; có trường hợp yêu cầu gọi video để thu thêm giọng nói, cử chỉ ([Tiền Phong, 4/7/2024, khuyến cáo của Công an TP.HCM](https://tienphong.vn/post-1651987.tpo)).
- **Đường link, ứng dụng giả:** gửi link lạ, yêu cầu tải ứng dụng gọi là để thu thập sinh trắc; sau đó chiếm đoạt tiền trong tài khoản ([Tiền Phong](https://tienphong.vn/post-1651987.tpo)).
- **Điểm mấu chốt để phòng:** "Ngân hàng không liên hệ trực tiếp với khách hàng để hướng dẫn thu thập sinh trắc học"; chỉ làm qua ứng dụng chính thức hoặc tại quầy ([Tiền Phong](https://tienphong.vn/post-1651987.tpo)).

### 2.2. Gọi video giả danh để thu video khuôn mặt

- Kẻ gian dùng âm thanh, hình ảnh deepfake giả công an, cán bộ thuế, tòa án hoặc người quen để gọi video, **yêu cầu nạn nhân quay mặt sang các hướng** và ghi lại. Đoạn ghi có thể bị dùng để mở tài khoản từ xa qua eKYC; tài khoản này dùng cho mục đích phạm pháp ([Cổng TTĐT Hà Tĩnh đăng lại từ VOV, 22/8/2024](https://hatinh.gov.vn/vi/bai-viet/canh-bao-chiem-doat-tai-khoan-ngan-hang-bang-deepfake-ai)).
- Dấu hiệu nhận biết: bị yêu cầu làm động tác lạ như nhìn trái, phải, lên, xuống trong cuộc gọi tự xưng của cơ quan nhà nước ([Hà Tĩnh/VOV](https://hatinh.gov.vn/vi/bai-viet/canh-bao-chiem-doat-tai-khoan-ngan-hang-bang-deepfake-ai)).

### 2.3. Chiếm camera, thay khuôn mặt thật bằng ảnh có sẵn (tấn công tiêm)

- Một số công cụ chiếm camera điện thoại của nạn nhân; khi ngân hàng yêu cầu quét mặt, công cụ chặn camera thật và đưa ảnh chân dung trong thư viện ảnh vào thay ([SGGP, 7/11/2026](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html); [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html)).
- Các nhóm tội phạm mua mã nguồn từ người bán nước ngoài qua Telegram, dùng AI để Việt hóa, chỉnh sửa rồi bán hoặc cài sẵn vào thiết bị; công an Hà Nội, Thanh Hóa đã triệt phá ([SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html)).
- Dùng ảnh tĩnh hoặc video ngắn do AI tạo để mô phỏng cử động khuôn mặt, vượt một số bước kiểm tra sinh trắc ([SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html)).

### 2.4. Thiết bị bị can thiệp, bán kèm tài khoản

- Điện thoại bị chỉnh sửa, cài sẵn công cụ vượt xác thực khuôn mặt trên ứng dụng của một số ngân hàng ([Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html)).
- Các vụ được nêu (theo Tạp chí Ngân hàng, 6/7/2026):

| Thời gian | Địa phương | Nội dung |
|---|---|---|
| 26/6/2026 | Thanh Hóa | Khởi tố, tạm giam 8 đối tượng mua bán thông tin tài khoản; bán, cho thuê tài khoản kèm phần mềm vượt sinh trắc |
| 6/6/2026 | Hà Nội | Bắt 5 người sản xuất, mua bán phần mềm độc hại vượt sinh trắc ở một số ngân hàng; cảnh báo việc khách mất sóng điện thoại không rõ lý do rồi bị chiếm tài khoản |
| 6/2026 | Lai Châu | Phát hiện thiết bị bị chỉnh sửa có công cụ vượt sinh trắc |
| 5/2025 | Thái Bình | Đường dây 14 người bị cáo buộc rửa khoảng 1.000 tỷ đồng, dùng dữ liệu khuôn mặt do AI tạo (từ cuối 2024 đến 4/2025) |

Nguồn: [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html).

- Thuê, mua, bán, mượn tài khoản ngân hàng là vi phạm; mức phạt 100–200 triệu đồng tùy số tài khoản theo Điều 30 Nghị định 340/2025/NĐ-CP (theo [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html); chưa đối chiếu văn bản gốc).

### 2.5. Deepfake giọng nói, hình ảnh người thân để dụ chuyển tiền

- Giả giọng, hình người thân; mạo danh shipper, nhân viên ngân hàng, công an; dựng tình huống khẩn cấp (chuyển nhầm tiền, điều tra, tài khoản "an toàn"); kết hợp dụ cài link hoặc phần mềm độc hại để chiếm điện thoại ([VnEconomy, 26/11/2025](https://vneconomy.vn/techconnect/dung-ai-deepfake-lua-dao-giong-that-den-muc-chuyen-gia-cung-co-the-mac-bay.htm)).
- Thông điệp của NHNN: "thấy đúng số, nghe đúng giọng, nhìn đúng mặt vẫn phải kiểm chứng" ([SGGP](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html)).

## 3. Ghi nhận quốc tế

| Thủ đoạn | Ghi nhận | Nguồn |
|---|---|---|
| **Deepfake dạng dịch vụ (DaaS)** | Ảnh deepfake, danh tính tổng hợp, giọng nhân bản, bộ dữ liệu sinh trắc bán từ khoảng 5 USD; dịch vụ ảnh deepfake 10–50 USD; danh tính tổng hợp tới 15 USD; thuê phần mềm hoán đổi khuôn mặt 1.000–10.000 USD; nhân bản giọng dưới 10 USD/tháng; hơn 300 quảng cáo có từ "deepfake" và "KYC" trên Telegram, dark web (2022 – 9/2025) | [Biometric Update, 21/1/2026, tóm tắt báo cáo "Weaponized AI" của Group-IB](https://www.biometricupdate.com/202601/deepfake-as-a-service-revolutionizing-biometrics-spoofing-and-identity-fraud-report) |
| **Tấn công tiêm deepfake vào eKYC** | 8.065 lần thử vượt kiểm tra liveness khi đăng ký vay ở một tổ chức tài chính, 1–8/2025 | [Biometric Update / Group-IB](https://www.biometricupdate.com/202601/deepfake-as-a-service-revolutionizing-biometrics-spoofing-and-identity-fraud-report) |
| **Camera ảo trên điện thoại thường** | MITRE ATLAS đưa vào cơ sở tri thức một tình huống (do đội Red Team của iProov dựng trong môi trường thử) trong đó video hoán đổi khuôn mặt trực tiếp được đưa vào ứng dụng onboarding qua ứng dụng thay luồng camera, chạy trên Android **không root**, nên né được kiểm tra toàn vẹn thiết bị cơ bản; vượt được kiểm tra liveness và xác thực bằng danh tính giả. Khuyến nghị: yêu cầu nhà cung cấp sinh trắc được kiểm thử theo **CEN 18099** (chuẩn châu Âu về phát hiện liveness và chống tấn công tiêm) | [SecurityBrief UK, 18/12/2025](https://securitybrief.co.uk/story/mitre-flags-deepfake-kyc-threat-using-face-swap-tools) |
| **Nhóm "Grey Nickel"** | iProov ghi nhận nhóm hoạt động từ giữa 2023, nhắm ngân hàng, sàn tiền mã hóa, ví điện tử, cổng thanh toán ở châu Á – Thái Bình Dương, Bắc Mỹ, EMEA; khai thác liveness kiểm tra **một khung hình**; dùng hoán đổi khuôn mặt, sửa siêu dữ liệu, tiêm video qua camera ảo | [Context.ph, 10/6/2025](https://context.ph/2025/06/10/25m-deepfake-heist-exposes-gaps-in-global-id-verification/) |
| **Họp video deepfake (vụ Arup)** | Nhân viên tại Hồng Kông nhận tin của "giám đốc tài chính" ở Anh, tham gia họp video với CFO và đồng nghiệp đều do AI tạo, chuyển nhiều lần tới 5 tài khoản tại Hồng Kông, tổng khoảng 25 triệu USD (200 triệu HKD); phát hiện khi hỏi lại trụ sở. Báo cảnh sát 1/2024 | [CFO Dive, 17/5/2024](https://www.cfodive.com/news/scammers-siphon-25m-from-engineering-firm-arup-via-ai-deepfake-cfo/716501/) |

## 4. Phân loại để dùng cho checklist (Bước 3)

Bảng dưới do Claude sắp xếp từ các nguồn trên; cột "lớp phòng thủ" là gợi ý, sẽ được chi tiết hóa và đưa chuyên gia phản biện ở Bước 5.

| # | Nhóm thủ đoạn | Đánh vào đâu | Lớp phòng thủ liên quan |
|---|---|---|---|
| A | Giả danh hỗ trợ sinh trắc, app giả, link giả | Con người, thiết bị | Truyền thông khách hàng, chặn app ngoài kho chính thức, phát hiện phần mềm điều khiển từ xa, cảnh báo trong app |
| B | Thu video khuôn mặt qua cuộc gọi | Con người, dữ liệu sinh trắc | Liveness chủ động có thử thách ngẫu nhiên, đối chiếu CSDL dân cư, giới hạn mở tài khoản mới |
| C | Trình diện (ảnh in, màn hình, mặt nạ) | Cảm biến camera | Phát hiện tấn công trình diện (ISO 30107) |
| D | Tiêm luồng hình (camera ảo, chiếm camera, ảnh thư viện) | Đường truyền camera → app | Kiểm tra toàn vẹn camera và luồng hình, chống tiêm (CEN 18099), chứng thực thiết bị |
| E | Thiết bị bị can thiệp, root, giả lập, app đóng gói lại | Thiết bị, ứng dụng | Phát hiện root/jailbreak, giả lập, hook, chèn mã; tự dừng app (theo chỉ đạo NHNN) |
| F | Chiếm SIM, mất sóng bất thường | Kênh viễn thông | Đối soát thuê bao – chủ tài khoản, tín hiệu đổi SIM |
| G | Deepfake giọng, video người quen, cấp trên | Quyết định chuyển tiền | Trễ giao dịch người nhận mới, hạn mức do khách đặt, gọi lại xác minh, cảnh báo SIMO |
| H | Mua bán, thuê tài khoản kèm công cụ vượt sinh trắc | Hệ thống tài khoản | Giám sát hành vi, đồ thị liên kết tài khoản, phong tỏa theo báo cáo |

## 5. Khoảng trống thông tin

- Số vụ hoặc tỷ lệ vượt sinh trắc thành công tại Việt Nam: **chưa tìm thấy nguồn**.
- Văn bản gốc quy định ISO 30107 mức 2 và yêu cầu chặn root, giả lập, hook: **chưa tìm thấy số hiệu** trong các nguồn đã đọc.
- Bài "Công an chỉ rõ hành vi của chủ tài khoản khiến sinh trắc học bị vô hiệu" trên Nhà đầu tư không tải được: **chưa đọc**.
- Dữ liệu về deepfake giọng nói vượt xác thực giọng nói ở ngân hàng Việt Nam: **chưa tìm thấy nguồn**.

## Nguồn đã mở và đọc (13/11/2026)

- [SGGP – Ngăn lừa đảo thời AI: Thêm "lá chắn", tăng cảnh giác, 7/11/2026](https://www.sggp.org.vn/ngan-lua-dao-thoi-ai-them-la-chan-tang-canh-giac-post880459.html)
- [Tạp chí Ngân hàng – Đảm bảo an toàn hệ sinh thái số, 6/7/2026](https://tapchinganhang.gov.vn/dam-bao-an-toan-he-sinh-thai-so-bao-ve-khach-hang-su-dung-dich-vu-ngan-hang-tren-khong-gian-mang-17473.html)
- [VnEconomy – Dùng AI, deepfake lừa đảo…, 26/11/2025](https://vneconomy.vn/techconnect/dung-ai-deepfake-lua-dao-giong-that-den-muc-chuyen-gia-cung-co-the-mac-bay.htm)
- [Tiền Phong – Cảnh báo chiêu trò hỗ trợ xác thực sinh trắc học, 4/7/2024](https://tienphong.vn/post-1651987.tpo)
- [Cổng TTĐT Hà Tĩnh (từ VOV) – Cảnh báo chiếm đoạt tài khoản bằng Deepfake AI, 22/8/2024](https://hatinh.gov.vn/vi/bai-viet/canh-bao-chiem-doat-tai-khoan-ngan-hang-bang-deepfake-ai)
- [Biometric Update – Deepfake-as-a-Service (Group-IB), 21/1/2026](https://www.biometricupdate.com/202601/deepfake-as-a-service-revolutionizing-biometrics-spoofing-and-identity-fraud-report)
- [SecurityBrief UK – MITRE flags deepfake KYC threat, 18/12/2025](https://securitybrief.co.uk/story/mitre-flags-deepfake-kyc-threat-using-face-swap-tools)
- [Context.ph – Grey Nickel (iProov), 10/6/2025](https://context.ph/2025/06/10/25m-deepfake-heist-exposes-gaps-in-global-id-verification/)
- [CFO Dive – Arup deepfake CFO, 17/5/2024](https://www.cfodive.com/news/scammers-siphon-25m-from-engineering-firm-arup-via-ai-deepfake-cfo/716501/)

*Tài liệu phục vụ phòng ngừa, không mô tả cách thực hiện tấn công.*
