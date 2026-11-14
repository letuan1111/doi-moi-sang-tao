# Bước 2. Các mô hình định giá theo kết quả trên thế giới: ưu, nhược điểm và nguồn

*Ngày thực hiện và tra cứu: 14/11/2026. Người thực hiện: Claude.*

> Phạm vi: chỉ dùng thông tin từ các trang đã mở và đọc được trong ngày tra cứu; mỗi ý có link nguồn. Giá của các hãng thay đổi nhanh, cần kiểm tra lại trước khi dùng. Mục 6 là **phân tích của Claude**, không phải số liệu có nguồn.

## Kết luận nhanh

- **Định giá theo kết quả đã thành mô hình thật trong phần mềm chăm sóc khách hàng bằng AI**, với mức giá công khai khoảng 0,50–2 USD cho mỗi lần "giải quyết": HubSpot 0,50 USD, Intercom/Fin 0,99 USD, Zendesk 1,50–2,00 USD (xem bảng mục 2).
- **Nhưng vẫn là thiểu số:** khảo sát hơn 240 công ty phần mềm và AI (tháng 4–5/2025) cho thấy chỉ 5% dùng định giá theo kết quả làm mô hình chính; 25% dự kiến dùng vào năm 2028; mô hình lai (hybrid) tăng từ 27% lên 41% ([Growth Unhinged](https://www.growthunhinged.com/p/2025-state-of-b2b-monetization)).
- **Khó nhất là định nghĩa và đo "kết quả".** Mỗi hãng định nghĩa "đã giải quyết" một kiểu; chưa có chuẩn chung nên khó so giá giữa các hãng ([TechTarget, 26/8/2026](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem)).
- **Xu hướng thực tế là mô hình lai:** phí nền (thuê bao, gói tối thiểu, cam kết khối lượng) cộng phần tính theo kết quả ([BCG](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai); [Constellation Research, 29/10/2026](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)).
- Mô hình này **không mới**: Rolls-Royce TotalCare thu phí theo giờ bay của động cơ và nhận rủi ro chi phí bảo dưỡng về phía mình ([Rolls-Royce](https://www.rolls-royce.com/products-and-services/civil-aerospace/services/totalcare.aspx)); quảng cáo Google có hình thức trả theo chuyển đổi thay cho trả theo lượt nhấp ([Google Ads Help](https://support.google.com/google-ads/answer/7528254)).

## 1. Năm nhóm mô hình

| Nhóm | Thu tiền theo | Ví dụ | Phù hợp khi |
|---|---|---|---|
| A. Giá cố định mỗi kết quả | Mỗi việc hoàn thành (một yêu cầu được giải quyết, một khách tiềm năng đạt chuẩn) | Intercom/Fin, HubSpot | Kết quả rời rạc, đếm được, xảy ra nhanh |
| B. Kết quả phân tầng | Chỉ tầng kết quả "đủ chuẩn" mới tính tiền, các tầng khác miễn phí | Zendesk (từ 18/5/2026) | Muốn tách phần AI làm trọn vẹn với phần có người hỗ trợ |
| C. Phí thành công theo % giá trị | % số tiền thu hồi/tiết kiệm được | Chargeflow (25% khoản bồi hoàn đòi lại được) | Giá trị đo được bằng tiền, có mốc so sánh rõ |
| D. Trả theo hành động của người dùng cuối | Mỗi chuyển đổi trong quảng cáo | Google Ads "pay for conversions" | Có hệ thống đo chuyển đổi đủ dữ liệu |
| E. Hợp đồng theo hiệu năng | Đơn vị sử dụng thực tế, nhà cung cấp gánh rủi ro chi phí | Rolls-Royce TotalCare (USD/giờ bay động cơ) | Dịch vụ dài hạn, nhà cung cấp kiểm soát được phần lớn kết quả |

Bên cạnh đó có các mô hình **theo mức dùng** dễ nhầm với theo kết quả: Salesforce Agentforce thu 2 USD mỗi cuộc hội thoại, hoặc Flex Credits 500 USD/100.000 tín dụng, tức 0,10 USD mỗi hành động (20 tín dụng) ([Salesforce](https://www.salesforce.com/agentforce/pricing/)). Đây là trả theo **khối lượng việc**, không phụ thuộc việc đó có thành công hay không.

## 2. Các trường hợp cụ thể

| Hãng | Đơn vị tính | Giá công bố | Khi nào **không** tính tiền | Nguồn |
|---|---|---|---|---|
| **Intercom / Fin** (chat, email) | Mỗi "resolution" | 0,99 USD; khách tiềm năng đạt chuẩn 9,99 USD; loại khách không phù hợp 0,99 USD; mỗi hội thoại chỉ tính 1 kết quả | Chuyển cho người do khách yêu cầu hoặc khách bực bội; quy trình thất bại; spam; hội thoại bỏ dở; khách quay lại hỏi tiếp thì kết quả cũ bị trừ, kể cả sang kỳ sau | [Intercom Help](https://www.intercom.com/help/en/articles/8205718-fin-pricing) |
| **Zendesk** (mô hình cũ, trước 18/5/2026) | Mỗi "automated resolution" | Không công bố trên trang chính thức | Hội thoại bị chuyển cho người; hội thoại không qua bước xác minh bằng LLM | [Zendesk Support](https://support.zendesk.com/hc/en-us/articles/5352026794010-About-the-automated-resolutions-platform-prior-to-resolution-tiers) |
| **Zendesk** (từ 18/5/2026: "resolution tiers") | Các tầng kết quả, trả bằng "resolution allowance" (quỹ tiền linh hoạt) | Trang chính thức chỉ có giá minh họa. Theo Lago và TechTarget: 1,50 USD/kết quả đã xác minh nếu cam kết khối lượng, 2,00 USD nếu trả theo mức dùng | Theo Lago: "Assisted Escalation" và "Contained Resolution" miễn phí, chỉ "Verified Resolution" bị tính tiền | [Zendesk Support](https://support.zendesk.com/hc/en-us/articles/10479528943130); [Lago](https://getlago.com/blog/outcome-based-pricing); [TechTarget](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem) |
| **HubSpot** Customer Agent | Mỗi hội thoại được giải quyết | 0,50 USD (50 tín dụng), áp dụng từ 14/4/2026; TechTarget ghi đây là mức giảm từ 1,00 USD | Trang công bố không định nghĩa "resolved conversation" | [HubSpot](https://www.hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete) |
| **HubSpot** Prospecting Agent | Mỗi khách tiềm năng được đề xuất tiếp cận | 1 USD (100 tín dụng) | — | [HubSpot](https://www.hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete) |
| **Sierra** | Mỗi kết quả: yêu cầu được giải quyết, giữ chân khách định hủy, bán thêm | Không công bố giá | "Trong đa số trường hợp" không tính tiền khi chưa giải quyết hoặc chuyển cho người; tương tác kiểu chào hỏi/điều hướng có thể tính theo số hội thoại | [Sierra, 10/12/2024](https://sierra.ai/uk/blog/outcome-based-pricing-for-ai-agents) |
| **Chargeflow** (thanh toán) | % khoản bồi hoàn (chargeback) đòi lại được | 25%; cảnh báo ngăn bồi hoàn 29 USD/lần; không phí tối thiểu tháng ở gói chuẩn | Không đòi lại được thì không trả; có "cam kết ROI 4 lần" nhưng điều khoản nằm trong hợp đồng, không công khai | [Chargeflow](https://www.chargeflow.io/ai-info) |
| **Google Ads** (Display) | Mỗi chuyển đổi | Theo CPA mục tiêu do nhà quảng cáo đặt (dưới 200 USD) | Không tính tiền hiển thị, lượt nhấp. Điều kiện: >100 chuyển đổi trong 30 ngày, 90% chuyển đổi xảy ra trong 7 ngày sau nhấp | [Google Ads Help](https://support.google.com/google-ads/answer/7528254) |
| **Rolls-Royce TotalCare** | USD mỗi giờ bay động cơ | Không công bố | Nhà sản xuất nhận rủi ro thời gian hoạt động và chi phí đại tu (cả theo kế hoạch và đột xuất) | [Rolls-Royce](https://www.rolls-royce.com/products-and-services/civil-aerospace/services/totalcare.aspx) |

**Bối cảnh thị trường:** Salesforce ký thỏa thuận mua Fin (tên mới của công ty Intercom) với giá khoảng 3,6 tỷ USD, công bố ngày 15/6/2026, dự kiến hoàn tất trong quý 4 năm tài chính 2027 của Salesforce ([Salesforce Investor](https://investor.salesforce.com/news/news-details/2026/Salesforce-Signs-Definitive-Agreement-to-Acquire-Fin/)). Thông cáo không nhắc tới chính sách giá; việc "giá giữ nguyên" chỉ có trong bài của Lago, chưa thấy nguồn chính thức.

## 3. "Kết quả" được định nghĩa và kiểm chứng thế nào

Đây là phần quyết định mô hình có chạy được hay không. Các cách đang dùng:

1. **Khách xác nhận hoặc khách rời đi không hỏi thêm** (Intercom): "confirmed resolution" khi khách trả lời kiểu "Cảm ơn, ổn rồi"; "assumed resolution" khi khách thoát mà không yêu cầu hỗ trợ thêm. Fin phải đưa ra câu trả lời thật, trả lời lời chào không tính ([Intercom Help](https://www.intercom.com/help/en/articles/8205718-fin-pricing)).
2. **Cửa sổ thời gian + mô hình ngôn ngữ chấm điểm** (Zendesk, mô hình cũ): hội thoại email kết thúc sau 72 giờ, nhắn tin mặc định 2 giờ (kéo dài được tới 72 giờ), gọi thoại khi cúp máy; sau đó một LLM đọc nội dung để xác nhận đã giải quyết mà không cần người ([Zendesk Support](https://support.zendesk.com/hc/en-us/articles/5352026794010-About-the-automated-resolutions-platform-prior-to-resolution-tiers)). Đại diện Zendesk cũng nêu tiêu chí "không bị mở lại trong 3 ngày" ([IT Brief, 18/8/2026](https://itbrief.com.au/story/zendesk-s-outcome-based-pricing-balances-ai-with-human-touch)).
3. **Minh bạch từng giao dịch:** Zendesk ghi loại kết quả và tầng tính tiền trong sự kiện của từng phiếu yêu cầu, có bảng chi phí theo tầng ([Zendesk Support](https://support.zendesk.com/hc/en-us/articles/10479528943130)); Intercom cho đặt nhắc ngưỡng và giới hạn cứng trong bảng theo dõi ([Intercom Help](https://www.intercom.com/help/en/articles/8205718-fin-pricing)).
4. **Điều kiện dữ liệu đầu vào:** Google chỉ cho trả theo chuyển đổi khi tài khoản có đủ lịch sử chuyển đổi và độ trễ ngắn ([Google Ads Help](https://support.google.com/google-ads/answer/7528254)) — tức nhà cung cấp chỉ nhận rủi ro khi đo được đáng tin.

**Điểm yếu đã được chỉ ra:** các tiêu chí gián tiếp (không trả lời, không chuyển cho người, không liên hệ lại) khiến một khách **bỏ cuộc** trông giống một khách **hài lòng**; khi AI làm phần lớn việc rồi mới chuyển cho người, bên mua có thể không phải trả gì dù AI đã làm việc thật ([TechTarget](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem)).

## 4. Ưu điểm

- **Giá gắn với giá trị** khách nhận được, có thể giảm tỷ lệ rời bỏ; định vị AI là nguồn tạo doanh thu/tiết kiệm chứ không phải khoản chi ([Lago](https://getlago.com/blog/outcome-based-pricing)).
- **Chuyển rủi ro sang nhà cung cấp**, có thể rút ngắn chu kỳ bán hàng với khách thận trọng ([Lago](https://getlago.com/blog/outcome-based-pricing)); doanh nghiệp lớn có nhu cầu chia sẻ rủi ro với nhà cung cấp ([Constellation Research](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)).
- **Tránh bị cắt theo số người dùng:** 40% bên mua coi giảm số tài khoản (seat) là cách chính để cắt chi phí phần mềm, và AI tác tử làm việc này dễ hơn ([BCG](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)).
- **Nhà cung cấp có thể hưởng phần tăng thêm** và tích lũy dữ liệu đo kết quả riêng ([Lago](https://getlago.com/blog/outcome-based-pricing)).

## 5. Nhược điểm và rủi ro

- **Khó định nghĩa kết quả:** theo khảo sát của Andreessen Horowitz được BCG dẫn, 47% bên mua gặp khó khi xác định kết quả đo được; 36% lo về khả năng dự đoán chi phí; 25% khó thống nhất với nhà cung cấp về phần đóng góp; 24% cho rằng kết quả phụ thuộc yếu tố ngoài tầm kiểm soát của nhà cung cấp ([BCG](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)).
- **Tranh chấp phân bổ công:** "Ngay cả khoản tiết kiệm chi phí cũng bị tranh cãi ngay trong nội bộ bên mua" ([Constellation Research](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)).
- **Chỉ số đơn lẻ dễ bị "lách":** ví dụ chỉ số "đóng phiếu" có thể đạt được bằng cách từ chối mọi người ([Constellation Research](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)); nhà cung cấp có thể chạy theo kết quả nhanh, dễ tính tiền thay vì giá trị rộng hơn ([Lago](https://getlago.com/blog/outcome-based-pricing)).
- **Doanh thu khó dự báo cho nhà cung cấp;** bên dưới giá theo kết quả vẫn thường có phí nền và mức tối thiểu ([TechTarget](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem)). Một nhà cung cấp phần mềm tương tác khách hàng ghi nhận biên lợi nhuận chênh nhau hơn 70 điểm phần trăm giữa các tài khoản ([BCG](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)).
- **Giá đơn vị thấp chưa chắc rẻ:** "Nhà cung cấp 2 USD xử lý 70% khối lượng vẫn tốt hơn nhà cung cấp 0,50 USD xử lý 30%" (Craig Durr, trích trong [TechTarget](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem)).
- **Chi phí hạ tầng đo lường** (đường dữ liệu có thể kiểm toán) cao, nhất là ngành bị quản lý chặt; không hợp với công cụ cộng tác nơi kết quả do nhiều bên cùng tạo ([Lago](https://getlago.com/blog/outcome-based-pricing)).
- **Khó đưa vào hợp đồng và quy trình mua sắm:** bộ phận mua hàng thường mặc định từ chối cấu trúc hợp đồng lạ ([Constellation Research](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)).

**Khi nào hợp:** việc lặp lại, đã có mốc so sánh (baseline) và chỉ số rõ ([Constellation Research](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)); nhà cung cấp có ca sử dụng đã chín muồi, đảm bảo hoàn thành được việc; còn định giá theo kết quả tài chính (tăng doanh thu, giảm chi phí) hợp với bên đóng vai dịch vụ quản lý trọn gói vì họ kiểm soát nhiều hơn ([BCG](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)).

## 6. Liên hệ Việt Nam (phân tích của Claude)

**Đã có nguồn:** FPT đặt mục tiêu chuyển từ "bán nhân lực" (hợp đồng tính theo số người, thời gian) sang làm đối tác chuyển đổi theo kết quả kinh doanh; bài viết lưu ý nếu AI giảm giờ công mà hợp đồng vẫn tính theo thời gian thì FPT phải chia phần lớn lợi ích năng suất cho khách, và FPT **chưa công bố** tỷ trọng hợp đồng tính theo kết quả ([Stockbiz tổng hợp từ Nhà đầu tư, 11/9/2026](https://stockbiz.vn/tin-tuc/phep-tinh-ai-cua-fpt-tu-ban-nhan-luc-den-ban-ket-qua/41749718)).

**Chưa tìm thấy nguồn:** số liệu về tỷ lệ doanh nghiệp phần mềm Việt Nam dùng định giá theo kết quả; doanh nghiệp SaaS Việt Nam công bố công khai bảng giá theo kết quả.

**Gợi ý ban đầu (để kiểm chứng ở bước phỏng vấn):**
1. Bắt đầu từ **nhóm A hoặc B** (giá cố định mỗi việc hoàn thành) với ca dễ đếm: chatbot chăm sóc khách hàng, xử lý hồ sơ/chứng từ, nhắc nợ, đặt lịch. Tránh nhóm C (% giá trị) cho tới khi có dữ liệu mốc so sánh.
2. **Viết định nghĩa kết quả vào hợp đồng** theo 4 thành phần học từ Intercom/Zendesk: điều kiện được tính; khoảng thời gian chờ (ví dụ không mở lại trong 3 ngày); trường hợp không tính; cách khách tra soát từng giao dịch.
3. **Dùng mô hình lai:** phí nền nhỏ + giá theo kết quả + trần chi phí tháng cho khách, để cả hai bên dự báo được dòng tiền.
4. Theo dõi đồng thời **tỷ lệ giải quyết và chất lượng** (khảo sát hài lòng, tỷ lệ liên hệ lại) để tránh "kết quả giả".

## 7. Điểm chưa kiểm chứng / cần lưu ý

- Tên các tầng của Zendesk ("Assisted Escalation", "Contained Resolution", "Verified Resolution") và mức 1,50/2,00 USD chỉ thấy ở Lago và TechTarget; trang hỗ trợ của Zendesk chỉ dùng giá minh họa.
- Lago ghi Intercom có mức tối thiểu 50 kết quả/tháng, nhưng trang giá của Intercom (đọc ngày 14/11/2026) không nêu mức tối thiểu hay trần. Cần kiểm tra lại khi trích dẫn.
- Thông tin Chargeflow là do chính hãng công bố; điều khoản "ROI 4 lần" không công khai.
- Giá ghi bằng USD, chưa gồm thuế, có thể khác theo khu vực và gói.

## Nguồn đã đọc (14/11/2026)

- Zendesk Support — [About the automated resolutions platform prior to resolution tiers](https://support.zendesk.com/hc/en-us/articles/5352026794010-About-the-automated-resolutions-platform-prior-to-resolution-tiers); [Resolution tiers](https://support.zendesk.com/hc/en-us/articles/10479528943130)
- Zendesk Newsroom — [Outcome-based pricing (28/8/2024)](https://www.zendesk.com/sg/newsroom/articles/zendesk-outcome-based-pricing/)
- Intercom — [Fin pricing](https://www.intercom.com/help/en/articles/8205718-fin-pricing)
- HubSpot — [Customer Agent và Prospecting Agent: trả tiền khi việc hoàn thành](https://www.hubspot.com/company-news/hubspots-customer-agent-and-prospecting-agent-now-you-pay-when-the-task-is-complete)
- Salesforce — [Agentforce Pricing](https://www.salesforce.com/agentforce/pricing/); [Thông cáo mua Fin (15/6/2026)](https://investor.salesforce.com/news/news-details/2026/Salesforce-Signs-Definitive-Agreement-to-Acquire-Fin/)
- Sierra — [Outcome-based pricing for AI agents](https://sierra.ai/uk/blog/outcome-based-pricing-for-ai-agents)
- Chargeflow — [AI info / pricing](https://www.chargeflow.io/ai-info)
- Google — [Use pay for conversions in Display campaigns](https://support.google.com/google-ads/answer/7528254)
- Rolls-Royce — [TotalCare](https://www.rolls-royce.com/products-and-services/civil-aerospace/services/totalcare.aspx)
- Lago — [Outcome-based pricing](https://getlago.com/blog/outcome-based-pricing)
- TechTarget — [Outcome-based AI pricing hits a measurement problem](https://www.techtarget.com/enterprise-software/feature/Outcome-based-AI-pricing-hits-a-measurement-problem)
- Constellation Research — [Outcome based pricing: Pros, cons and nuances](https://www.constellationr.com/insights/news/outcome-based-pricing-pros-cons-and-nuances)
- BCG — [Rethinking B2B Software Pricing in the Era of AI](https://bcg.com/publications/2025/rethinking-b2b-software-pricing-in-the-era-of-ai)
- Growth Unhinged — [The state of B2B monetization in 2025](https://www.growthunhinged.com/p/2025-state-of-b2b-monetization)
- IT Brief — [Zendesk's outcome-based pricing balances AI with human touch](https://itbrief.com.au/story/zendesk-s-outcome-based-pricing-balances-ai-with-human-touch)
- Stockbiz (tổng hợp từ Nhà đầu tư) — ["Phép tính" AI của FPT: Từ bán nhân lực đến bán kết quả](https://stockbiz.vn/tin-tuc/phep-tinh-ai-cua-fpt-tu-ban-nhan-luc-den-ban-ket-qua/41749718)

*Tài liệu phục vụ nghiên cứu mô hình kinh doanh, không phải lời khuyên đầu tư.*
