[![Kiểm thử](https://github.com/letuan1111/doi-moi-sang-tao/actions/workflows/kiem-thu.yml/badge.svg)](https://github.com/letuan1111/doi-moi-sang-tao/actions/workflows/kiem-thu.yml)

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

## Công cụ tài chính (tools.html)

- **Khoản vay và lịch trả nợ:** trả góp đều và gốc đều (dư nợ giảm dần), trả thêm vào gốc, biểu đồ dư nợ, bảng chi tiết sao chép được dạng CSV.
- **So sánh gói vay:** lãi ưu đãi trong N tháng, sau đó lãi thả nổi giả định, kèm phí; xếp hạng theo tổng chi phí.
- **Tiết kiệm theo mục tiêu:** số tiền cần để dành mỗi tháng với lãi kép, có tính lạm phát.
- **Ngân sách 50/30/20 và quỹ khẩn cấp:** tỷ lệ trả nợ trên thu nhập, mục tiêu quỹ khẩn cấp.

Mỗi công cụ có nút "Hỏi AI" gửi kết quả hiện tại sang Trợ lý AI tài chính (chỉ trên bản claude.ai). Số liệu nhập được lưu trong trình duyệt.

## Trợ lý AI tài chính (ai-chat.js)

Nút nổi trên mọi trang. Nạp toàn bộ ý tưởng và dự án vào ngữ cảnh, có công cụ: tìm kho, xem chi tiết, tính vay, tính tiết kiệm, chấm điểm rủi ro giao dịch, soi tin nhắn lừa đảo. Chặn gửi câu hỏi chứa số thẻ, số tài khoản, mật khẩu.

## Lộ trình thực thi (du-an.html)

Mỗi dự án có `actionGoal` (mục tiêu hành động của trang) và `roadmap` gồm 6 bước `{n, t, owner: "claude"|"nguoi", kind, status: "todo"|"done", out?, doneAt?}`. Kết quả từng bước lưu ở `du-an/<id>/<NN>-<slug>.md`. Một tác vụ tự động hằng ngày chọn bước Claude tiếp theo (dự án ít bước xong nhất trước), thực hiện, lưu kết quả, đánh dấu xong và đăng lên cả GitHub lẫn bản claude.ai.

## Giọng nói (voice.js)

Nói để hỏi Trợ lý AI, nghe AI đọc câu trả lời và tài liệu dự án, đọc nội dung cuộc gọi nghi lừa đảo vào công cụ soi tin nhắn.

| Chế độ | Nhận dạng giọng nói | Đọc to | Ghi chú |
|---|---|---|---|
| Nhanh (mặc định) | Web Speech API của trình duyệt (vi-VN) | speechSynthesis, giọng tiếng Việt của máy | Không tải gì. Chrome gửi âm thanh tới máy chủ Google để nhận dạng. |
| Riêng tư | [Whisper tiny](https://huggingface.co/Xenova/whisper-tiny) chạy trên máy qua [Transformers.js](https://github.com/huggingface/transformers.js) | [MMS-TTS tiếng Việt](https://huggingface.co/Xenova/mms-tts-vie) chạy trên máy | Tải mô hình một lần (~40 MB mỗi mô hình), âm thanh không rời máy. MMS-TTS giấy phép CC-BY-NC 4.0: chỉ dùng phi thương mại. |

Bản claude.ai chạy trong khung bảo mật nên micro và tải mô hình ngoài bị chặn; chỉ có đọc to bằng giọng của trình duyệt.

## Kiểm thử tự động

`tests/smoke.py` kiểm tra dữ liệu (id không trùng, tệp kết quả lộ trình tồn tại), mở mọi trang ở cỡ máy tính và điện thoại (không lỗi JS, không tràn ngang) và chạy thử các công cụ chính. GitHub Actions (`.github/workflows/kiem-thu.yml`) chạy bộ kiểm thử sau mỗi lần đẩy lên `main` và mỗi pull request.

Chạy tại máy: `pip install playwright && python -m playwright install chromium && python tests/smoke.py`

## Ứng dụng web (PWA)

Bản GitHub cài được lên màn hình điện thoại và máy tính (`manifest.webmanifest`, biểu tượng `icon.svg`/`icon-*.png`), và vẫn mở được các trang đã xem khi mất mạng (`sw.js`). Có `sitemap.xml`, `robots.txt` và trang `404.html`.

## Từ ý tưởng đến sản phẩm (ket-qua.html)

Trang tổng hợp để xem hết trong một chỗ:

- **Số liệu và hành trình:** bao nhiêu ý tưởng, bao nhiêu đã có công cụ chạy trên web, bao nhiêu gắn với dự án thực thi, bao nhiêu tài liệu đã xong; biểu đồ theo lĩnh vực.
- **Sản phẩm đang chạy trên web:** mọi công cụ của Phòng thử nghiệm, Công cụ tài chính và tính năng chung, kèm cách dùng, ý tưởng mà công cụ hiện thực và dự án liên quan.
- **Tài liệu đã hoàn thành:** mọi kết quả lộ trình, lọc theo dự án và loại, đọc ngay trên trang (có nút nghe).
- **Dự án và ý tưởng liên quan:** tiến độ từng dự án và các ý tưởng nó minh chứng.
- **Toàn bộ ý tưởng:** lọc theo trạng thái (Đã có sản phẩm / Đang thực thi / Chưa triển khai), lĩnh vực, khu vực, tìm kiếm, sắp xếp; khung chi tiết có "Bắt đầu từ đâu", công cụ đã làm, lộ trình dự án và tài liệu.
- **Nhật ký cập nhật** theo ngày. Link trực tiếp: `ket-qua.html#idea=<id>`, `ket-qua.html#doc=<đường dẫn md>`.

Liên kết ý tưởng – sản phẩm – dự án nằm ở `hien-thuc.json`. **Khi xây tính năng mới, thêm một mục vào `features`** (`ideas`, `projects` là id trong `data.json`; `scope`: `y-tuong`, `ho-tro` hoặc `nen-tang`). Kiểm thử tự động kiểm tra id và trang đích hợp lệ.
