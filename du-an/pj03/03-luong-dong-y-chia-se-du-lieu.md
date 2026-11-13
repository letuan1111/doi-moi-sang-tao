# Bước 3. Thiết kế luồng đồng ý chia sẻ dữ liệu theo Luật Bảo vệ dữ liệu cá nhân 2025

*Ngày thực hiện: 13/11/2026. Người thực hiện: Claude. Ngày tra cứu văn bản: 13/11/2026.*

> **Tài liệu này dùng để làm gì.** Đây là bản thiết kế mẫu cho một ứng dụng quản lý chi tiêu, gọi là "bên thứ ba" theo Thông tư 64. Ứng dụng muốn đọc dữ liệu tài khoản của khách qua Open API của ngân hàng. Bản thiết kế gồm các yêu cầu pháp lý đã đối chiếu, các màn hình kèm câu chữ, cấu trúc bản ghi đồng ý, các trạng thái, checklist kiểm tra và API giả lập cho demo ở bước 4.
>
> **Giả định.** Tên ứng dụng "Sổ Chi Tiêu Sen" (Công ty CP Sen Số), ngân hàng "Ngân hàng ABC" và khách "Nguyễn Văn A" đều là **giả định**. Đây không phải tư vấn pháp lý. Trước khi ra sản phẩm thật, cần luật sư và bộ phận pháp chế của ngân hàng đối tác rà soát.

## 1. Căn cứ pháp lý đã đọc

| # | Quy định | Nội dung dùng cho thiết kế | Nguồn |
|---|---|---|---|
| L1 | Luật 91/2025/QH15, khoản 2 Điều 9 | Đồng ý chỉ có hiệu lực khi **tự nguyện** và khách **biết rõ** ba điều: loại dữ liệu và mục đích, bên kiểm soát dữ liệu, quyền và nghĩa vụ của mình | [Toàn văn Luật, cổng PBGDPL Thái Bình](https://pbgdpl.thaibinh.gov.vn/AppFile/data/DEBB0210EA08046F14A50A2A197AEFFE.doc) |
| L2 | Khoản 3 Điều 9 | Thể hiện rõ ràng, cụ thể, **in hoặc sao chép được** thành văn bản. Được dùng dạng điện tử nếu kiểm chứng được | như trên |
| L3 | Điểm a, b khoản 4 Điều 9 | Đồng ý **cho từng mục đích**. **Không được** buộc phải đồng ý mục đích khác mới được dùng dịch vụ | như trên |
| L4 | Điểm c, d khoản 4 Điều 9 | Đồng ý có hiệu lực đến khi khách thay đổi. **Im lặng hoặc không phản hồi không phải là đồng ý** | như trên |
| L5 | Điều 10 | Khách được yêu cầu **rút lại đồng ý** hoặc hạn chế xử lý, bằng văn bản kể cả dạng điện tử. Việc rút lại không có hiệu lực ngược với các lần xử lý trước đó | như trên |
| L6 | Khoản 1 Điều 4 | Quyền được biết; được xem, chỉnh sửa; được yêu cầu cung cấp, xóa, hạn chế; được phản đối; được khiếu nại và đòi bồi thường | như trên |
| L7 | Điểm b khoản 1 Điều 27 | **Không dùng thông tin tín dụng để chấm điểm, xếp hạng tín dụng** khi chưa có đồng ý của khách | như trên |
| L8 | Điều 21, khoản 2 và 3 Điều 38 | Phải lập hồ sơ đánh giá tác động và gửi cơ quan chuyên trách trong 60 ngày từ lần xử lý đầu tiên. Doanh nghiệp nhỏ và khởi nghiệp được miễn hoặc tự chọn trong 5 năm, **nhưng không được miễn nếu trực tiếp xử lý dữ liệu nhạy cảm** | như trên |
| L9 | Khoản 1 Điều 23 | Báo vi phạm cho cơ quan chuyên trách chậm nhất **72 giờ** sau khi phát hiện | như trên |
| N1 | NĐ 356/2025/NĐ-CP, điểm k khoản 1 Điều 4 | **Thông tin thẻ ngân hàng và lịch sử giao dịch tài khoản ngân hàng là dữ liệu nhạy cảm** | [Toàn văn NĐ 356, CSDL VBPL Bộ Tư pháp](https://vbpl.moj.gov.vn/TW/Lists/vbpq/Attachments/187276/ND.356.2025.doc) |
| N2 | Khoản 2 Điều 6 NĐ 356 | Phải **lưu trữ** đồng ý. Khi tranh chấp, **bên kiểm soát phải chứng minh** đã có đồng ý | như trên |
| N3 | Khoản 3, 4 Điều 6 NĐ 356 | **Không được đặt đồng ý mặc định.** Với dữ liệu nhạy cảm phải báo cho khách đó là dữ liệu nhạy cảm | như trên |
| N4 | Khoản 2 Điều 5 NĐ 356 | Yêu cầu rút đồng ý: phản hồi trong **02 ngày làm việc**, thực hiện trong **15 ngày**. Bên xử lý hoặc bên thứ ba thực hiện trong 20 ngày. Gia hạn 1 lần, tối đa 15 ngày | như trên |
| N5 | Khoản 3, 4 Điều 5 NĐ 356 | Yêu cầu xem, sửa, cung cấp: thực hiện trong 10 ngày. Yêu cầu xóa: thực hiện trong 20 ngày. Cả hai đều phản hồi trong 02 ngày làm việc | như trên |
| N6 | Khoản 2, 3 Điều 8 NĐ 356 | Trong tài chính, ngân hàng: nội dung xin đồng ý phải nêu rõ mục đích (kể cả chấm điểm, xếp hạng tín dụng), **nguồn thu thập, thời gian lưu trữ, cơ chế rút lại**. Lộ, mất dữ liệu nhạy cảm phải báo cơ quan chuyên trách **và khách** trong 72 giờ. Đánh giá tuân thủ 01 năm/lần, ghi nhật ký toàn bộ hoạt động xử lý | như trên |
| T1 | Thông tư 64/2024/TT-NHNN (đã tóm tắt ở bước 2) | Một lần đồng ý cho phép truy vấn tối đa **180 ngày**, trừ khi có thỏa thuận khác. Cả ngân hàng và bên thứ ba phải có **công cụ để khách tra cứu và rút lại đồng ý**. Dùng OAuth 2.0 | [Bước 2](02-ngan-hang-open-api-va-yeu-cau-tt64.md); [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html) |

Luật 91/2025/QH15 có hiệu lực từ 01/01/2026. NĐ 356/2025/NĐ-CP ký ngày 31/12/2025, có hiệu lực từ 01/01/2026 và thay NĐ 13/2023/NĐ-CP. Nguồn: hai văn bản gốc nêu trên.

**Hệ quả quan trọng:** lịch sử giao dịch là dữ liệu nhạy cảm (N1). Vì vậy ứng dụng chi tiêu **không được hưởng miễn trừ dành cho khởi nghiệp** về hồ sơ đánh giá tác động (L8), và phải nói rõ với khách đây là dữ liệu nhạy cảm (N3).

## 2. Mười nguyên tắc thiết kế

1. **Tách mục đích.** Mỗi mục đích có một công tắc riêng, mặc định **tắt** (L3, N3).
2. **Dịch vụ lõi không bị ràng buộc.** Khách có thể chỉ bật mục đích lõi, ví dụ phân loại chi tiêu, mà vẫn dùng được ứng dụng. Các mục đích phụ như gợi ý sản phẩm hay chấm điểm tín dụng không được là điều kiện (L3).
3. **Nói trước, hỏi sau.** Trên cùng một màn hình, nêu đủ dữ liệu gì, để làm gì, ai nhận, giữ bao lâu, lấy từ đâu và cách rút lại (L1, N6).
4. **Gắn nhãn "dữ liệu nhạy cảm"** cho lịch sử giao dịch và thông tin thẻ (N1, N3).
5. **Có thời hạn.** Mặc định 90 ngày, tối đa 180 ngày (T1). Hiển thị đếm ngược. Khi hết hạn thì tự dừng, **không tự gia hạn** (L4).
6. **Phải có hành động chủ động.** Chỉ nút "Đồng ý và tiếp tục" mới tạo đồng ý. Đóng ứng dụng hoặc bỏ qua thì không tạo gì (L4).
7. **Biên nhận.** Sau khi đồng ý, khách nhận một biên nhận có thể tải hoặc in, có mã đồng ý (L2, N2).
8. **Thu hồi bằng một chạm,** dễ tìm như lúc cấp. Ứng dụng dừng truy vấn ngay, không đợi hết hạn 15 ngày theo luật (L5, N4, T1).
9. **Nhật ký minh bạch.** Khách xem được ứng dụng đã gọi API lúc nào, lấy loại dữ liệu gì (L6, N6, T1).
10. **Lưu bằng chứng không sửa được.** Lưu đúng phiên bản câu chữ đã hiển thị, thời điểm, kênh và mã phiên OAuth (N2).

## 3. Các bên trong luồng

| Bên | Vai trò theo luật dữ liệu | Vai trò theo Thông tư 64 |
|---|---|---|
| Nguyễn Văn A (giả định) | Chủ thể dữ liệu | Khách hàng |
| Sổ Chi Tiêu Sen, Công ty CP Sen Số (giả định) | Bên kiểm soát và xử lý dữ liệu cho mục đích của ứng dụng | Bên thứ ba |
| Ngân hàng ABC (giả định) | Bên kiểm soát dữ liệu tài khoản, chuyển dữ liệu theo đồng ý | Ngân hàng cung cấp Open API |

## 4. Luồng màn hình

```
[M1 Giới thiệu] → [M2 Chọn ngân hàng] → [M3 Xin đồng ý tại ứng dụng]
      → [M4 Xác thực tại ngân hàng (OAuth 2.0)] → [M5 Biên nhận]
      → [M6 Trung tâm quyền dữ liệu] ⇄ [M7 Thu hồi] / [M8 Nhắc hết hạn]
```

### M1. Giới thiệu, chưa thu thập gì
- Tiêu đề: "Kết nối tài khoản ngân hàng để tự động ghi chi tiêu".
- Ba ý ngắn: tự động phân loại chi tiêu; ứng dụng **chỉ đọc**, không chuyển được tiền; bạn có thể ngắt kết nối bất cứ lúc nào.
- Hai nút ngang nhau: **"Kết nối ngân hàng"** và **"Tự nhập tay"**. Lựa chọn tự nhập tay để khách không bị ép kết nối.

### M2. Chọn ngân hàng
Danh sách ngân hàng có Open API. Dùng dữ liệu giả lập trong demo. Mỗi ngân hàng hiển thị trạng thái "đã kết nối" hoặc "chưa".

### M3. Xin đồng ý, màn hình quan trọng nhất

Câu chữ mẫu (phiên bản `v1.0-2026-11`):

> **Sổ Chi Tiêu Sen xin phép đọc dữ liệu từ Ngân hàng ABC**
>
> **Bên nhận và kiểm soát dữ liệu:** Công ty CP Sen Số, [địa chỉ giả định], email: baove-dulieu@sen-so.example
>
> **Nguồn dữ liệu:** Ngân hàng ABC, qua Open API theo Thông tư 64/2024/TT-NHNN
>
> **⚠ Dữ liệu cá nhân nhạy cảm:** lịch sử giao dịch tài khoản ngân hàng thuộc nhóm dữ liệu nhạy cảm theo pháp luật.
>
> **Chọn mục đích bạn cho phép** (mỗi mục một công tắc, mặc định tắt):
> - ☐ **Phân loại và thống kê chi tiêu** *(cần để tự động ghi chi tiêu)*. Dữ liệu: số tài khoản (che 6 số giữa), số dư, lịch sử giao dịch 90 ngày gần nhất.
> - ☐ **Nhắc hóa đơn định kỳ** *(không bắt buộc)*. Dữ liệu: các giao dịch lặp lại.
> - ☐ **Gợi ý sản phẩm tiết kiệm của đối tác** *(không bắt buộc)*. Dữ liệu: tổng chi theo nhóm, **không** gửi giao dịch chi tiết cho đối tác.
> - ☐ **Chấm điểm, xếp hạng tín dụng** *(không bắt buộc, tắt thì không ảnh hưởng các tính năng khác)*.
>
> **Thời hạn cho phép:** ( ) 30 ngày (•) 90 ngày ( ) 180 ngày. Hết hạn thì tự dừng, không tự gia hạn.
>
> **Thời gian lưu trữ:** dữ liệu giao dịch lưu tối đa 12 tháng *(giả định)*. Khi bạn ngắt kết nối, bạn có thể chọn xóa ngay.
>
> **Quyền của bạn:** xem, sửa, tải về, yêu cầu xóa hoặc hạn chế dữ liệu, rút lại đồng ý tại mục *Cài đặt › Quyền dữ liệu* hoặc qua email trên, và khiếu nại. Rút lại đồng ý không ảnh hưởng đến việc xử lý đã diễn ra trước đó.
>
> [Xem toàn văn chính sách] · [Tải bản này (PDF)]
>
> **[ Đồng ý và tiếp tục sang Ngân hàng ABC ]**   [ Để sau ]

Quy tắc giao diện:
- Nút "Đồng ý" chỉ bật khi đã chọn ít nhất mục "Phân loại chi tiêu". Nếu khách chỉ muốn bật mục phụ, giải thích rằng mục phụ cần dữ liệu từ kết nối.
- Hai nút có kích thước tương đương. Không dùng màu hoặc chữ gây áp lực như "Bạn sẽ bỏ lỡ…".
- Không tích sẵn bất kỳ ô nào (N3). Không gộp tất cả vào một ô "Tôi đồng ý với điều khoản".

### M4. Xác thực tại ngân hàng (OAuth 2.0)
- Chuyển sang trang hoặc ứng dụng của Ngân hàng ABC. **Mật khẩu ngân hàng không bao giờ nhập vào ứng dụng bên thứ ba.**
- Ngân hàng hiển thị lại: tên bên thứ ba, phạm vi dữ liệu (scope) và thời hạn. Khách xác thực bằng OTP hoặc sinh trắc học **tại ngân hàng**.
- Phạm vi ngân hàng cấp phải **khớp hoặc hẹp hơn** những gì khách chọn ở M3. Ứng dụng không được xin scope rộng hơn.

### M5. Biên nhận đồng ý
- Mã đồng ý (ví dụ `CS-2026-000123`), ngày giờ, các mục đích đã bật, thời hạn (ngày hết hạn), phiên bản câu chữ, ngân hàng nguồn.
- Có nút **Tải PDF / Gửi về email**, đáp ứng yêu cầu in hoặc sao chép được (L2).

### M6. Trung tâm quyền dữ liệu
Mỗi kết nối hiển thị trên một thẻ:
- Ngân hàng, trạng thái (Đang hiệu lực, Sắp hết hạn, Đã hết hạn, Đã thu hồi), còn bao nhiêu ngày.
- Các mục đích, mỗi mục **bật hoặc tắt được riêng**. Tắt một mục là rút đồng ý từng phần.
- **Nhật ký truy cập:** "14/11 08:00, đọc giao dịch mới (12 bản ghi)" và các dòng tương tự.
- Nút: **Ngắt kết nối**, **Tải dữ liệu của tôi**, **Yêu cầu xóa dữ liệu**, **Sửa thông tin**, **Khiếu nại**.

### M7. Thu hồi (rút lại đồng ý)
1. Khách bấm "Ngắt kết nối". Hộp xác nhận ghi: "Ứng dụng sẽ ngừng đọc dữ liệu ngay. Bạn muốn làm gì với dữ liệu đã lưu?" Có hai lựa chọn: (•) Xóa ngay, ( ) Giữ lịch sử đã ghi để tiếp tục xem.
2. Hệ thống làm ngay các việc sau: đổi trạng thái thành `revoked`, gọi API thu hồi token tại ngân hàng, dừng mọi lịch truy vấn, ghi sự kiện vào nhật ký.
3. Gửi xác nhận cho khách ngay lập tức, nhanh hơn mức 02 ngày làm việc mà N4 yêu cầu. Nếu khách chọn xóa, hoàn tất xóa và báo lại trong thời hạn N5 (mục tiêu nội bộ: 72 giờ).
4. Khách cũng có thể thu hồi từ phía ngân hàng (T1). Ứng dụng phải lắng nghe thông báo thu hồi từ ngân hàng (webhook) và cập nhật trạng thái.

### M8. Nhắc trước khi hết hạn
- Nhắc trước 7 ngày và 1 ngày: "Kết nối Ngân hàng ABC hết hạn ngày …".
- Nút "Gia hạn" dẫn lại về M3, nơi các mục đích cũ hiện sẵn để khách xem lại, rồi tiếp tục M4. Không gia hạn ngầm.
- Không phản hồi thì hết hạn (L4).

## 5. Các trạng thái của một đồng ý

```
draft ──(Đồng ý ở M3 + xác thực OK ở M4)──> active
draft ──(Để sau / hủy / xác thực lỗi)──────> discarded   (không lưu như đồng ý)
active ──(còn ≤ 7 ngày)───────────────────> expiring
active/expiring ──(đến ngày hết hạn)──────> expired
active/expiring ──(khách thu hồi, ở app hoặc ngân hàng)──> revoked
active ──(khách tắt một mục đích)─────────> active (giảm phạm vi, ghi sự kiện)
active ──(khách yêu cầu hạn chế xử lý)────> restricted ──(khách mở lại)──> active
expiring ──(gia hạn: M3 + M4)─────────────> active (bản ghi mới, liên kết bản cũ)
```

Trạng thái `expired`, `revoked` và `discarded` **không bao giờ** quay lại `active`. Muốn dùng lại phải tạo bản ghi đồng ý mới.

## 6. Cấu trúc bản ghi đồng ý (dữ liệu giả định)

```json
{
  "consentId": "CS-2026-000123",
  "subjectRef": "user_8f3a (mã nội bộ, không phải số CCCD)",
  "controller": "Công ty CP Sen Số (giả định)",
  "sourceBank": "Ngân hàng ABC (giả định)",
  "purposes": [
    {"code": "SPEND_CATEGORIZE", "granted": true,  "dataScopes": ["accounts.masked", "balances", "transactions.90d"], "sensitive": true},
    {"code": "BILL_REMINDER",    "granted": true,  "dataScopes": ["transactions.recurring"], "sensitive": true},
    {"code": "PARTNER_OFFERS",   "granted": false, "dataScopes": ["spend.aggregates"], "sensitive": false},
    {"code": "CREDIT_SCORING",   "granted": false, "dataScopes": ["transactions.90d", "balances"], "sensitive": true}
  ],
  "grantedAt": "2026-11-13T09:15:02+07:00",
  "expiresAt": "2027-02-11T09:15:02+07:00",
  "durationDays": 90,
  "retentionPolicy": "transactions ≤ 12 tháng; xóa khi khách yêu cầu",
  "noticeVersion": "v1.0-2026-11",
  "noticeHash": "sha256:…(hash của đúng câu chữ đã hiển thị)",
  "channel": "app-android",
  "oauth": {"bankConsentRef": "abc-cns-77e1", "scopesGranted": ["accounts:read", "transactions:read"]},
  "status": "active",
  "events": [
    {"at": "2026-11-13T09:15:02+07:00", "type": "GRANTED"},
    {"at": "2026-11-14T08:00:00+07:00", "type": "ACCESS", "scope": "transactions.90d", "records": 12}
  ]
}
```

Lưu ý triển khai:
- Bảng `events` là loại **chỉ ghi thêm**, không sửa hay xóa. Nhật ký này dùng làm bằng chứng (N2) và đáp ứng yêu cầu ghi nhật ký (N6). Thông tư 64 yêu cầu ngân hàng lưu nhật ký tối thiểu 3 tháng và sao lưu 1 năm (bước 2). Ứng dụng nên lưu bằng chứng đồng ý ít nhất bằng thời gian còn khả năng tranh chấp. Mốc cụ thể **chưa tìm thấy nguồn**, cần luật sư tư vấn.
- Mọi lần gọi API ngân hàng đều phải kiểm tra lại: trạng thái là `active`, chưa quá `expiresAt`, và scope gọi nằm trong mục đích đã bật.
- Không gửi dữ liệu giao dịch chi tiết cho đối tác. Mục "Gợi ý sản phẩm" chỉ dùng số tổng hợp.

## 7. API giả lập cho demo ở bước 4

Chỉ chạy trên trình duyệt với dữ liệu giả, không gửi đi đâu.

| Phương thức | Đường dẫn giả lập | Việc làm |
|---|---|---|
| `POST` | `/mock/consents` | Tạo bản nháp từ lựa chọn ở M3 |
| `POST` | `/mock/bank/authorize` | Giả lập ngân hàng xác thực, trả `bankConsentRef` và scope |
| `GET` | `/mock/consents/{id}` | Xem bản ghi và trạng thái |
| `PATCH` | `/mock/consents/{id}/purposes` | Bật hoặc tắt từng mục đích |
| `POST` | `/mock/consents/{id}/revoke` | Thu hồi, có tùy chọn `deleteData` |
| `GET` | `/mock/consents/{id}/events` | Nhật ký truy cập |
| `GET` | `/mock/accounts/transactions` | Trả giao dịch giả. Báo lỗi `403 CONSENT_INACTIVE` nếu đồng ý không còn hiệu lực |
| `POST` | `/mock/bank/webhook/revoked` | Giả lập khách thu hồi từ phía ngân hàng |

Demo nên có nút **"Tua thời gian +85 ngày"** để kiểm tra nhắc hết hạn và tự dừng.

## 8. Checklist kiểm tra trước khi ra mắt

| # | Câu hỏi kiểm tra | Căn cứ | Đạt? |
|---|---|---|---|
| 1 | Màn hình M3 có nêu đủ loại dữ liệu, mục đích, bên kiểm soát, quyền của khách không? | L1 | ☐ |
| 2 | Mỗi mục đích có công tắc riêng, mặc định tắt? | L3, N3 | ☐ |
| 3 | Từ chối mục đích phụ mà vẫn dùng được dịch vụ lõi? | L3 | ☐ |
| 4 | Chấm điểm tín dụng có ô đồng ý riêng, không gộp? | L7, N6 | ☐ |
| 5 | Có nhãn "dữ liệu nhạy cảm"? | N1, N3 | ☐ |
| 6 | Có nêu nguồn thu thập, thời gian lưu trữ và cách rút lại? | N6 | ☐ |
| 7 | Thời hạn ≤ 180 ngày, không tự gia hạn? | T1, L4 | ☐ |
| 8 | Biên nhận tải hoặc in được? | L2 | ☐ |
| 9 | Lưu phiên bản và hash câu chữ, thời điểm, kênh? Bằng chứng không sửa được? | N2 | ☐ |
| 10 | Thu hồi từ ứng dụng dừng truy vấn ngay và thu hồi token ở ngân hàng? | L5, T1 | ☐ |
| 11 | Nhận được thu hồi từ phía ngân hàng (webhook)? | T1 | ☐ |
| 12 | Phản hồi yêu cầu của khách trong 02 ngày làm việc, xong trong 10, 15 hoặc 20 ngày tùy loại yêu cầu? | N4, N5 | ☐ |
| 13 | Có nhật ký truy cập để khách xem? | L6, N6 | ☐ |
| 14 | Đã lập hồ sơ đánh giá tác động, gửi trong 60 ngày từ lần xử lý đầu tiên? | L8 | ☐ |
| 15 | Có quy trình báo sự cố trong 72 giờ cho cơ quan chuyên trách, khách và ngân hàng? | L9, N6, T1 | ☐ |
| 16 | Mật khẩu ngân hàng không bao giờ đi qua ứng dụng? Có dùng OAuth 2.0? | T1 | ☐ |

## 9. Những kiểu "đồng ý hình thức" cần tránh

Báo chí đã ghi nhận tình trạng đồng ý chia sẻ dữ liệu chỉ mang tính hình thức (xem bước 2, nguồn Tin nhanh Chứng khoán 20/6/2026). Các kiểu thường gặp:

- Một ô "Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật" gộp mọi mục đích. Vi phạm L3.
- Ô tích sẵn, hoặc "tiếp tục dùng nghĩa là đồng ý". Vi phạm N3 và L4.
- Nút "Từ chối" nhỏ, màu xám, giấu trong menu, hoặc phải qua nhiều bước mới thu hồi được. Trái với nguyên tắc 8 ở mục 2 và tinh thần của L5.
- Đồng ý không có thời hạn, hoặc tự gia hạn. Vi phạm T1.
- Lấy "toàn bộ lịch sử giao dịch" trong khi chỉ cần 90 ngày. Trái với nguyên tắc đúng mục đích và thời gian phù hợp tại khoản 2, 3 Điều 3 Luật.

## 10. Giả định và việc còn mở

- Các mốc 90 ngày mặc định, lưu trữ 12 tháng và mục tiêu xóa trong 72 giờ là **lựa chọn thiết kế giả định**, không phải quy định.
- Các con số 02 ngày làm việc, 15, 10, 20 ngày lấy từ Điều 5 NĐ 356 qua bản đọc tự động. Cần đối chiếu bản có dấu khi triển khai thật.
- **Chưa đọc được toàn văn Thông tư 64.** Mốc 180 ngày lấy từ bài phân tích trên Tạp chí Ngân hàng (bước 2).
- Chưa rõ mỗi ngân hàng triển khai thu hồi và webhook thế nào. Cần kiểm tra khi đăng ký sandbox thật ở bước 5.
- Mẫu hồ sơ đánh giá tác động (theo NĐ 356) chưa được tổng hợp trong bước này.

## Nguồn đã mở và đọc (13/11/2026)

1. Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15, toàn văn trên cổng Phổ biến giáo dục pháp luật tỉnh Thái Bình: https://pbgdpl.thaibinh.gov.vn/AppFile/data/DEBB0210EA08046F14A50A2A197AEFFE.doc
2. Nghị định 356/2025/NĐ-CP, toàn văn trên Cơ sở dữ liệu quốc gia về VBPL (Bộ Tư pháp): https://vbpl.moj.gov.vn/TW/Lists/vbpq/Attachments/187276/ND.356.2025.doc
3. Bước 2 của dự án (Thông tư 64): [02-ngan-hang-open-api-va-yeu-cau-tt64.md](02-ngan-hang-open-api-va-yeu-cau-tt64.md)
4. Tạp chí Ngân hàng, 24/2/2025: https://tapchinganhang.gov.vn/bao-dam-an-toan-trong-viec-ket-noi-va-xu-ly-du-lieu-cua-khach-hang-khi-trien-khai-open-api-15537.html
