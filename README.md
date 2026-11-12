# Đổi mới sáng tạo

Trang tổng hợp **ý tưởng** và **dự án đổi mới sáng tạo đang được thực thi** trong giáo dục, nền tảng giao dịch, ngân hàng – fintech, mô hình kinh doanh và khoa học – công nghệ, ở Việt Nam và quốc tế.

- 50 ý tưởng, 8 dự án đang thực thi; ý tưởng kinh doanh có mục "Bắt đầu từ đâu" và mức vốn, mỗi mục có link tới nguồn gốc.
- Lọc theo lĩnh vực, khu vực (Việt Nam / Quốc tế), giai đoạn dự án; tìm kiếm theo từ khóa.
- Tiến độ dự án tính theo các mốc đã hoàn thành.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Toàn bộ giao diện (HTML + CSS + JS, không cần build) |
| `data.json` | Dữ liệu ý tưởng và dự án |

## Thêm hoặc sửa nội dung

Sửa `data.json` rồi commit. Mỗi ý tưởng gồm: `title`, `summary`, `category`, `region` (`vn` hoặc `intl`), `impact` (1–3), `sourceUrl`, `sourceName`. Mỗi dự án có thêm `stage` (`kickoff`, `pilot`, `scale`, `done`, `paused`), `lead`, `kpi`, `start`, `end` và danh sách `milestones` (`{ "t": "...", "done": true }`).

## Chạy thử trên máy

```bash
python -m http.server 8000
# mở http://localhost:8000
```

Nội dung mô tả được viết lại bằng tiếng Việt từ các nguồn báo chí và báo cáo công khai, cập nhật 11/2026.
