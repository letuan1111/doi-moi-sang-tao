/* FinAI: trợ lý AI tài chính dùng chung cho index.html và lab.html.
   Nạp toàn bộ kho ý tưởng + dự án vào ngữ cảnh, có công cụ tra cứu và tính toán tài chính.
   Chỉ chạy AI trên bản claude.ai (window.claude); bản tĩnh hiện thông báo. */
(function(){
  if (window.FinAI) return;
  const KB = { ideas: [], projects: [], ready: false };
  const REG = { vn: "Việt Nam", intl: "Quốc tế" };
  const STAGE = { kickoff: "Khởi động", pilot: "Thí điểm", scale: "Mở rộng", done: "Hoàn thành", paused: "Tạm dừng" };
  const safeUrl = u => { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch (e) { return ""; } };
  const vnd = n => Math.round(n).toLocaleString("vi-VN") + " đ";
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

  function setData(ideas, projects){ KB.ideas = (ideas || []).slice(); KB.projects = (projects || []).slice(); KB.ready = true; listeners.forEach(f => f()); }
  const listeners = [];

  function kbText(){
    const I = KB.ideas.map(i => `[${i.id}] ${i.title} | ${i.category || ""} | ${REG[i.region] || ""} | ${i.summary || ""}` +
      (i.steps && i.steps.length ? ` | Bắt đầu: ${i.steps.join("; ")}` : "") + (safeUrl(i.sourceUrl) ? ` | Nguồn: ${i.sourceName || ""} ${safeUrl(i.sourceUrl)}` : "")).join("\n");
    const P = KB.projects.map(p => `[${p.id}] ${p.title} | ${STAGE[p.stage] || p.stage || ""} | ${p.summary || ""} | KPI: ${p.kpi || ""} | Mốc: ` +
      (p.milestones || []).map(m => (m.done ? "✓ " : "○ ") + m.t).join("; ") + (safeUrl(p.sourceUrl) ? ` | Nguồn: ${safeUrl(p.sourceUrl)}` : "")).join("\n");
    return `KHO Ý TƯỞNG (${KB.ideas.length} mục):\n${I}\n\nDỰ ÁN ĐANG THỰC THI (${KB.projects.length} mục):\n${P}`;
  }

  const FACTS = `Dữ kiện nền (đã kiểm chứng từ nguồn công khai, cập nhật 11/2026):
- Việt Nam: Hệ thống SIMO của NHNN chia sẻ thông tin tài khoản nghi ngờ lừa đảo giữa các tổ chức tín dụng, trung gian thanh toán; đến 20/10/2026 hơn 6 triệu lượt khách nhận cảnh báo, hơn 2 triệu lượt dừng/hủy giao dịch.
- Việt Nam: Quyết định 2345/QĐ-NHNN (từ 1/7/2024) yêu cầu xác thực sinh trắc học với giao dịch trên 10 triệu đồng/lần hoặc trên 20 triệu đồng/ngày; NHNN cho biết số vụ lừa đảo chiếm đoạt tiền trong tài khoản giảm hơn 50%. Kẻ gian lợi dụng bằng cách giả danh nhân viên ngân hàng "hỗ trợ cài sinh trắc học".
- Việt Nam: Luật Bảo vệ dữ liệu cá nhân (Luật 91/2025/QH15) và Nghị định 356/2025/NĐ-CP có hiệu lực từ 1/1/2026, thay thế Nghị định 13/2023; yêu cầu nghiêm ngặt với tài chính – ngân hàng; đánh giá tuân thủ định kỳ hằng năm và ghi nhật ký xử lý dữ liệu; doanh nghiệp nhỏ, khởi nghiệp được ân hạn 5 năm.
- Anh: Bắt buộc hoàn tiền cho nạn nhân lừa đảo chuyển khoản (APP fraud) từ 10/2024; Confirmation of Payee phủ hơn 99% giao dịch.
- Singapore: Khung chia sẻ trách nhiệm (SRF) từ 16/12/2024 giữa ngân hàng và nhà mạng với lừa đảo phishing.
- Deepfake: tấn công "injection" có thể vượt kiểm tra liveness; cần phòng thủ nhiều lớp. Passkey (FIDO) chống lừa đảo tốt hơn OTP.`;

  const LAB = `Phòng thử nghiệm của trang (lab.html) có 6 công cụ người dùng tự thử được: (1) Kiểm tra người nhận (so tên, danh sách cảnh báo), (2) Chấm điểm rủi ro giao dịch theo tầng, (3) Soi tin nhắn lừa đảo, (4) Xác minh cuộc gọi ngân hàng, (5) Passkey thay OTP, (6) "Dữ liệu của tôi" – đồng ý, yêu cầu quyền, nhật ký, tự đánh giá tuân thủ. Trang Công cụ tài chính (tools.html) có: máy tính khoản vay và lịch trả nợ (trả đều / gốc đều, trả thêm), so sánh gói vay lãi ưu đãi rồi thả nổi kèm phí, tiết kiệm theo mục tiêu có lạm phát, ngân sách 50/30/20 và quỹ khẩn cấp. Gợi ý người dùng mở công cụ phù hợp khi liên quan.`;

  function brief(){
    return `Bạn là "Trợ lý AI Tài chính" của trang Đổi mới sáng tạo. Bạn đã được nạp TOÀN BỘ dữ liệu của trang (bên dưới) và trả lời mọi câu hỏi thuộc lĩnh vực tài chính: ngân hàng, fintech, thanh toán, tín dụng và vay vốn, tiết kiệm, tài chính cá nhân và gia đình, tài chính doanh nghiệp và khởi nghiệp (dòng tiền, gọi vốn, mô hình doanh thu), đầu tư (kiến thức nền), bảo hiểm, bảo mật – chống lừa đảo, dữ liệu cá nhân, chính sách tiền tệ và quy định tài chính ở Việt Nam và quốc tế.

Cách trả lời:
- Tiếng Việt, ngắn gọn, có cấu trúc (tiêu đề "### ", gạch đầu dòng "- "), thực tế, ưu tiên việc làm được ngay.
- Khi câu hỏi liên quan nội dung của trang, dựa vào kho dữ liệu bên dưới, nhắc mã mục (ví dụ [bs03]) và dẫn link nguồn có sẵn. Có thể gọi search_kb hoặc get_item để xem chi tiết.
- Khi cần con số (trả góp, lãi, tiết kiệm, điểm rủi ro, soi tin nhắn), GỌI CÔNG CỤ để tính, không tự nhẩm. Nêu rõ giả định.
- Bạn không có dữ liệu thời gian thực (lãi suất hiện hành, tỷ giá, giá cổ phiếu, vàng). Nếu được hỏi, nói rõ và hướng dẫn xem ở nguồn chính thức (website ngân hàng, NHNN, sàn giao dịch). Không bịa số liệu, văn bản pháp luật hay link.
- Đầu tư: chỉ cung cấp kiến thức, khung đánh giá, rủi ro; không khuyên mua/bán mã cụ thể, nhắc bạn không phải chuyên gia tư vấn tài chính được cấp phép. Pháp lý, thuế: thông tin tham khảo, khuyên kiểm tra văn bản chính thức hoặc chuyên gia.
- An toàn: không bao giờ hỏi mật khẩu, OTP, số thẻ, số tài khoản. Nếu người dùng dán thông tin nhạy cảm, nhắc họ xóa và đổi mật khẩu. Từ chối hướng dẫn lừa đảo, vượt xác thực, mua bán tài khoản, rửa tiền, deepfake.
- Câu hỏi ngoài lĩnh vực tài chính: trả lời ngắn và gợi ý quay lại chủ đề tài chính.

${FACTS}

${LAB}

${kbText()}`;
  }

  /* ---------- Tools ---------- */
  function search(query, limit){
    const words = norm(query).split(/[\s,;]+/).filter(w => w.length > 1);
    const items = KB.ideas.map(i => ({ k: "Ý tưởng", ...i })).concat(KB.projects.map(p => ({ k: "Dự án", ...p })));
    return items.map(it => {
      const hay = norm([it.id, it.title, it.summary, it.category, (it.steps || []).join(" "), (it.milestones || []).map(m => m.t).join(" "), it.kpi].join(" "));
      return { it, s: words.reduce((a, w) => a + (hay.includes(w) ? 1 : 0), 0) };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, limit || 8).map(({ it }) => ({
      ma: it.id, loai: it.k, tieu_de: it.title, tom_tat: it.summary, linh_vuc: it.category, khu_vuc: REG[it.region] || "", nguon: safeUrl(it.sourceUrl), ten_nguon: it.sourceName || ""
    }));
  }
  function loan({ principal, annual_rate, months, method }){
    const P = +principal, r = (+annual_rate) / 100 / 12, n = Math.round(+months);
    if (!(P > 0) || !(n > 0) || !(r >= 0)) return { loi: "Cần principal > 0, months > 0, annual_rate >= 0" };
    const rows = []; let bal = P, totalI = 0;
    if (method === "declining") {
      const g = P / n;
      for (let k = 1; k <= n; k++) { const i = bal * r; totalI += i; rows.push([k, g + i, g, i, bal - g]); bal -= g; }
    } else {
      const pay = r === 0 ? P / n : P * r / (1 - Math.pow(1 + r, -n));
      for (let k = 1; k <= n; k++) { const i = bal * r, g = pay - i; totalI += i; rows.push([k, pay, g, i, Math.max(0, bal - g)]); bal -= g; }
    }
    const fmt = x => ({ ky: x[0], tra: vnd(x[1]), goc: vnd(x[2]), lai: vnd(x[3]), du_no_con: vnd(x[4]) });
    return { phuong_phap: method === "declining" ? "Gốc đều, lãi trên dư nợ giảm dần" : "Trả góp đều hằng tháng (annuity)",
      ky_dau: fmt(rows[0]), ky_cuoi: fmt(rows[rows.length - 1]), tra_thang_dau: vnd(rows[0][1]), tong_lai: vnd(totalI), tong_phai_tra: vnd(P + totalI),
      vai_ky_dau: rows.slice(0, 3).map(fmt) };
  }
  function savings({ initial, monthly, annual_rate, years }){
    const r = (+annual_rate || 0) / 100 / 12, n = Math.round((+years || 0) * 12); let b = +initial || 0; const m = +monthly || 0;
    if (!(n > 0)) return { loi: "Cần years > 0" };
    const yearly = [];
    for (let k = 1; k <= n; k++) { b = b * (1 + r) + m; if (k % 12 === 0) yearly.push({ nam: k / 12, so_du: vnd(b) }); }
    const contributed = (+initial || 0) + m * n;
    return { so_du_cuoi: vnd(b), tong_gop: vnd(contributed), tien_lai: vnd(b - contributed), theo_nam: yearly.length > 10 ? yearly.filter((_, i) => i % Math.ceil(yearly.length / 10) === 0 || i === yearly.length - 1) : yearly,
      gia_dinh: "Lãi nhập gốc hằng tháng, góp cuối mỗi tháng, lãi suất cố định, chưa trừ thuế/phí, chưa tính lạm phát." };
  }
  const SIGW = { thiet_bi_moi: [25, "Thiết bị mới"], dang_co_cuoc_goi: [30, "Đang có cuộc gọi khi chuyển tiền"], nguoi_nhan_moi: [10, "Người nhận lần đầu"], tk_nhan_duoi_30_ngay: [15, "Tài khoản nhận mở dưới 30 ngày"], tk_nhan_bi_canh_bao: [40, "Tài khoản nhận bị cảnh báo"], tk_nhan_nhieu_nguoi_gui: [15, "Tài khoản nhận nhận tiền từ nhiều người lạ"], gio_0_5: [5, "Giao dịch 0–5 giờ sáng"], app_dieu_khien_tu_xa: [30, "Ứng dụng điều khiển từ xa đang chạy"] };
  function risk({ amount, daily_total_before, usual_amount, signals, memo }){
    const amt = +amount || 0, day = +daily_total_before || 0, avg = +usual_amount || 0; let s = 0; const ly_do = [];
    (signals || []).forEach(k => { const w = SIGW[k]; if (w) { s += w[0]; ly_do.push(`+${w[0]} ${w[1]}`); } });
    if (avg > 0 && amt >= 3 * avg) { s += 15; ly_do.push(`+15 Số tiền gấp ${(amt / avg).toFixed(1)} lần thường ngày`); }
    if (/(phi|le phi)\s*(xac minh|ho so|giai ngan|bao hiem)|hoan tien|nop phat|dau tu|nhan thuong|tai khoan an toan|tam giu|kich hoat|mo khoa/.test(norm(memo))) { s += 15; ly_do.push("+15 Nội dung chuyển khoản giống kịch bản lừa đảo"); }
    s = Math.min(100, s);
    const tang = s >= 80 ? "Chặn và báo cáo" : s >= 60 ? "Tạm giữ để gọi lại khách" : s >= 40 ? "Sinh trắc học + dừng 10 giây" : s >= 20 ? "Cảnh báo" : "Cho qua";
    return { diem: s, phan_ung: tang, ly_do, sinh_trac_bat_buoc_QD2345: amt > 10000000 || day + amt > 20000000, ghi_chu: "Trọng số minh họa của Phòng thử nghiệm, không phải mô hình thật của ngân hàng." };
  }
  const SCAM = [
    [/(https?:\/\/|www\.)\S+/i, "Có đường link"], [/\botp\b|ma (xac thuc|xac nhan|kich hoat|bao mat)/, "Đòi OTP / mã xác thực"],
    [/(cai|tai|cap nhat)[^.\n]{0,20}(ung dung|app|phan mem)|\bapk\b/, "Yêu cầu cài ứng dụng"], [/cong an|vien kiem sat|toa an|co quan thue|cuc thue|ngan hang nha nuoc|dien luc|buu dien|bao hiem xa hoi/, "Giả danh cơ quan / dịch vụ"],
    [/khan|gap|ngay lap tuc|khoa tai khoan|dinh chi|phong toa|bi dieu tra/, "Hối thúc, đe dọa"], [/tai khoan (an toan|tam giu)|phi (xac minh|ho so|giai ngan)/, "Đòi chuyển tiền xác minh / phí trước"],
    [/loi nhuan|hoa hong|viec nhe luong cao|trung thuong|lam nhiem vu/, "Hứa lợi nhuận, quà"], [/sinh trac/, "Nhắc tới sinh trắc học"], [/cccd|can cuoc|mat khau|so the/, "Xin giấy tờ, thông tin bí mật"], [/hoan tien|chuyen nham/, "Kịch bản hoàn tiền / chuyển nhầm"]
  ];
  function scam({ text }){ const t = norm(text); const d = SCAM.filter(([rx]) => rx.test(t)).map(x => x[1]); return { so_dau_hieu: d.length, dau_hieu: d, muc: d.length >= 3 ? "Rất đáng ngờ" : d.length ? "Có dấu hiệu" : "Chưa thấy dấu hiệu rõ" }; }

  const TOOLS = [
    { name: "search_kb", description: "Tìm trong kho ý tưởng và dự án của trang theo từ khóa (có dấu hoặc không dấu). Trả về tối đa 8 mục kèm mã, nguồn.",
      inputSchema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] }, execute: async ({ query }) => search(query, 8) },
    { name: "get_item", description: "Xem đầy đủ một ý tưởng hoặc dự án theo mã (ví dụ bs03, pj05): các bước bắt đầu, mốc, KPI, nguồn.",
      inputSchema: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      execute: async ({ id }) => { const x = KB.ideas.concat(KB.projects).find(i => String(i.id).toLowerCase() === String(id).toLowerCase()); return x ? { ...x, sourceUrl: safeUrl(x.sourceUrl) } : { loi: "Không có mã " + id }; } },
    { name: "loan_calculator", description: "Tính khoản vay: tiền trả hằng tháng, tổng lãi. method 'annuity' (trả đều) hoặc 'declining' (gốc đều, lãi dư nợ giảm dần). Đơn vị đồng, lãi %/năm.",
      inputSchema: { type: "object", properties: { principal: { type: "number" }, annual_rate: { type: "number" }, months: { type: "number" }, method: { type: "string", enum: ["annuity", "declining"] } }, required: ["principal", "annual_rate", "months"] }, execute: async a => loan(a) },
    { name: "savings_calculator", description: "Tính tiết kiệm / tích lũy có lãi kép: số dư cuối kỳ khi có tiền ban đầu và góp hằng tháng. Đơn vị đồng, lãi %/năm.",
      inputSchema: { type: "object", properties: { initial: { type: "number" }, monthly: { type: "number" }, annual_rate: { type: "number" }, years: { type: "number" } }, required: ["annual_rate", "years"] }, execute: async a => savings(a) },
    { name: "transaction_risk", description: "Chấm điểm rủi ro một giao dịch chuyển tiền theo động cơ của Phòng thử nghiệm. signals là danh sách mã: " + Object.keys(SIGW).join(", "),
      inputSchema: { type: "object", properties: { amount: { type: "number" }, daily_total_before: { type: "number" }, usual_amount: { type: "number" }, memo: { type: "string" }, signals: { type: "array", items: { type: "string", enum: Object.keys(SIGW) } } }, required: ["amount"] }, execute: async a => risk(a) },
    { name: "scam_check", description: "Soi nhanh một tin nhắn/cuộc gọi tìm dấu hiệu lừa đảo phổ biến tại Việt Nam.",
      inputSchema: { type: "object", properties: { text: { type: "string" } }, required: ["text"] }, execute: async a => scam(a) }
  ];

  /* ---------- Markdown-lite renderer ---------- */
  function md(s){
    const esc = String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let html = "", list = null; const close = () => { if (list) { html += "</" + list + ">"; list = null; } };
    const inline = t => t.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    for (const raw of esc.split("\n")) {
      const l = raw.trim(); let m;
      if (!l) { close(); continue; }
      if (/^\|.*\|$/.test(l)) { if (/^\|[\s:|-]+\|$/.test(l)) continue; if (list !== "table") { close(); html += "<table>"; list = "table"; } html += "<tr>" + l.slice(1, -1).split("|").map(c => "<td>" + inline(c.trim()) + "</td>").join("") + "</tr>"; continue; }
      if ((m = l.match(/^#{1,4}\s+(.*)/))) { close(); html += "<h4>" + inline(m[1]) + "</h4>"; continue; }
      if ((m = l.match(/^[-*•]\s+(.*)/))) { if (list !== "ul") { close(); html += "<ul>"; list = "ul"; } html += "<li>" + inline(m[1]) + "</li>"; continue; }
      if ((m = l.match(/^\d+[.)]\s+(.*)/))) { if (list !== "ol") { close(); html += "<ol>"; list = "ol"; } html += "<li>" + inline(m[1]) + "</li>"; continue; }
      close(); html += "<p>" + inline(l) + "</p>";
    }
    close(); return html;
  }
  function sensitive(q){
    return /(^|\D)\d{12,19}(\D|$)/.test(q.replace(/(\d)[\s.-](?=\d)/g, "$1")) || /\b(otp|mật khẩu|mat khau|password)\s*[:=]?\s*\S{4,}/i.test(q);
  }

  /* ---------- Conversation engine ---------- */
  let sample = null, samplePromise = null;
  function getSample(){
    if (sample) return Promise.resolve(sample);
    if (!window.claude || !window.claude.use) return Promise.resolve(null);
    if (!samplePromise) samplePromise = claude.use("sample").then(s => (sample = s || null)).catch(() => null);
    return samplePromise;
  }
  function makeChat(){
    const hist = []; let ctrl = null;
    return {
      reset(){ if (ctrl) ctrl.abort(); hist.length = 0; },
      abort(){ if (ctrl) ctrl.abort(); },
      async ask(q, onText){
        const s = await getSample(); if (!s) { const e = new Error("no_ai"); e.code = "no_ai"; throw e; }
        hist.push({ role: "user", content: hist.length ? q : brief() + "\n\n---\nCâu hỏi đầu tiên của người dùng: " + q });
        ctrl = new AbortController();
        try {
          const msgs = hist.length > 13 ? [hist[0], ...hist.slice(-12)] : hist.slice();
          const r = await s(msgs, { signal: ctrl.signal, cache: false, modelTier: "default", tools: TOOLS, onText: ({ text }) => onText && onText(text) });
          const text = (r && r.text) || "";
          hist.push({ role: "assistant", content: text });
          return text + (r && r.truncated ? "\n\n(Câu trả lời bị cắt bớt. Hãy hỏi tiếp để xem phần còn lại.)" : "");
        } catch (e) { hist.pop(); throw e; } finally { ctrl = null; }
      }
    };
  }
  function errText(e){
    if (!e) return "Chưa nhận được câu trả lời. Hãy thử lại.";
    if (e.code === "no_ai") return "Trợ lý AI chỉ chạy trên bản claude.ai của trang (cần đăng nhập Claude). Bản GitHub công khai không có máy chủ AI.";
    if (e.code === "not_granted") { sample = null; samplePromise = null; return "Trang chưa được cấp quyền dùng AI. Hãy cho phép khi được hỏi, rồi thử lại."; }
    if (e.code === "rate_limited") return "Trợ lý đang bận vì quá nhiều yêu cầu. Hãy thử lại sau ít phút.";
    if (e.name === "AbortError") return "Đã dừng.";
    return "Chưa nhận được câu trả lời. Hãy thử lại.";
  }

  /* ---------- Floating widget ---------- */
  const SUGG = [
    "Vay 500 triệu, lãi 9%/năm trong 15 năm thì mỗi tháng trả bao nhiêu? So sánh trả đều và dư nợ giảm dần.",
    "Mỗi tháng gửi 5 triệu, lãi 6%/năm, sau 10 năm có bao nhiêu?",
    "Trang đang có những ý tưởng nào về chống lừa đảo cho ngân hàng? Ưu tiên cái nào trước?",
    "Khởi nghiệp fintech ở Việt Nam nên chọn mô hình doanh thu nào?",
    "Tóm tắt tiến độ các dự án đang thực thi.",
    "Luật Bảo vệ dữ liệu cá nhân 2025 ảnh hưởng thế nào tới ngân hàng?"
  ];
  const CSS = `
#finai-fab{position:fixed;right:18px;bottom:18px;z-index:50;border:0;border-radius:999px;padding:12px 18px;background:var(--ink,#141a2e);color:var(--bg,#fff);font:700 14px var(--body,system-ui);box-shadow:0 8px 24px rgba(0,0,0,.25);cursor:pointer;display:flex;gap:8px;align-items:center}
#finai-fab b{color:var(--spark,#f2b200)}
#finai-panel{position:fixed;right:18px;bottom:76px;z-index:51;width:min(430px,calc(100vw - 24px));height:min(640px,calc(100vh - 100px));background:var(--surface,#fff);color:var(--ink,#141a2e);border:1px solid var(--line,#ddd);border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.28);display:flex;flex-direction:column;overflow:hidden;font-family:var(--body,system-ui)}
#finai-panel[hidden]{display:none}
@media (max-width:520px){#finai-panel{right:12px;left:12px;width:auto;bottom:70px;height:calc(100vh - 90px)}}
.finai-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid var(--line,#ddd)}
.finai-head h3{margin:0;font:800 16px var(--display,system-ui);flex:1}
.finai-head small{display:block;font:500 11px var(--body,system-ui);color:var(--muted,#666)}
.finai-head button{border:1px solid var(--line,#ddd);background:transparent;color:inherit;border-radius:999px;padding:4px 10px;font-size:12px;cursor:pointer}
.finai-log{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px}
.finai-m{max-width:92%;padding:9px 12px;border-radius:12px;font-size:14px;line-height:1.55;overflow-wrap:anywhere}
.finai-m.u{align-self:flex-end;background:var(--accent,#2440d6);color:var(--accent-ink,#fff);border-bottom-right-radius:4px}
.finai-m.a{align-self:flex-start;background:var(--bg,#f3f4f8);border:1px solid var(--line,#ddd);border-bottom-left-radius:4px}
.finai-m p{margin:0 0 6px}.finai-m p:last-child{margin:0}.finai-m ul,.finai-m ol{margin:4px 0 6px;padding-left:18px}
.finai-m h4{margin:8px 0 4px;font:800 14px var(--display,system-ui)}.finai-m a{color:var(--accent,#2440d6)}
.finai-m table{border-collapse:collapse;font-size:12px;margin:4px 0}.finai-m td{border:1px solid var(--line,#ddd);padding:3px 6px}
.finai-m code{font-size:12px;background:var(--surface,#fff);padding:0 4px;border-radius:4px}
.finai-sugg{display:flex;flex-direction:column;gap:6px;margin-top:4px}
.finai-sugg button{text-align:left;border:1px solid var(--line,#ddd);background:var(--surface,#fff);color:inherit;border-radius:10px;padding:7px 10px;font-size:13px;cursor:pointer}
.finai-sugg button:hover{border-color:var(--accent,#2440d6)}
.finai-form{display:flex;gap:6px;padding:10px;border-top:1px solid var(--line,#ddd)}
.finai-form textarea{flex:1;resize:none;height:44px;border:1px solid var(--line,#ddd);border-radius:10px;padding:10px;background:var(--bg,#f3f4f8);color:inherit;font:inherit;font-size:14px}
.finai-form button{border:0;border-radius:10px;padding:0 14px;background:var(--accent,#2440d6);color:var(--accent-ink,#fff);font-weight:700;cursor:pointer}
.finai-form button:disabled{opacity:.5;cursor:not-allowed}
.finai-note{font-size:11px;color:var(--muted,#666);padding:0 12px 8px}
@media print{#finai-fab,#finai-panel{display:none!important}}`;

  let openWithImpl = null;
  function openWith(q){ if (openWithImpl) openWithImpl(q); }
  function mountWidget(opts){
    opts = opts || {};
    if (document.getElementById("finai-fab")) return;
    const st = document.createElement("style"); st.textContent = CSS; document.head.append(st);
    const fab = document.createElement("button"); fab.id = "finai-fab"; fab.type = "button"; fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-controls", "finai-panel");
    fab.innerHTML = "<b>✦</b> Hỏi AI tài chính";
    const p = document.createElement("section"); p.id = "finai-panel"; p.hidden = true; p.setAttribute("aria-label", "Trợ lý AI tài chính");
    p.innerHTML = `<div class="finai-head"><h3>Trợ lý AI tài chính<small id="finai-kb">Đang nạp dữ liệu…</small></h3><button type="button" data-a="new">Cuộc mới</button><button type="button" data-a="close" aria-label="Đóng">✕</button></div>
      <div class="finai-log" id="finai-log" aria-live="polite"></div>
      <form class="finai-form" id="finai-form"><textarea id="finai-q" placeholder="Hỏi về vay, tiết kiệm, ngân hàng, chống lừa đảo, ý tưởng trên trang…" aria-label="Câu hỏi"></textarea><button type="submit" id="finai-send">Gửi</button></form>
      <div class="finai-note">Không nhập số thẻ, số tài khoản, mật khẩu, OTP. Thông tin tham khảo, không phải tư vấn tài chính hay pháp lý.</div>`;
    document.body.append(p, fab);
    const log = p.querySelector("#finai-log"), q = p.querySelector("#finai-q"), send = p.querySelector("#finai-send"), kb = p.querySelector("#finai-kb");
    const chat = makeChat(); let busy = false;
    const bubble = (role, text) => { const b = document.createElement("div"); b.className = "finai-m " + (role === "user" ? "u" : "a"); if (role === "user") b.textContent = text; else b.innerHTML = md(text); log.append(b); log.scrollTop = log.scrollHeight; return b; };
    function welcome(){
      log.replaceChildren();
      const w = bubble("assistant", "Xin chào! Mình đã được nạp **toàn bộ ý tưởng và dự án** của trang, cùng công cụ tính khoản vay, tiết kiệm, chấm điểm rủi ro giao dịch và soi tin nhắn lừa đảo. Hỏi mình bất cứ điều gì về tài chính, ngân hàng, fintech nhé.");
      const sg = document.createElement("div"); sg.className = "finai-sugg";
      SUGG.forEach(s => { const b = document.createElement("button"); b.type = "button"; b.textContent = s; b.onclick = () => go(s); sg.append(b); });
      w.append(sg);
    }
    function updKb(){ kb.textContent = KB.ready ? `Đã nạp ${KB.ideas.length} ý tưởng, ${KB.projects.length} dự án` : "Đang nạp dữ liệu…"; }
    listeners.push(updKb); updKb();
    async function go(text){
      text = String(text || "").trim(); if (!text || busy) return;
      if (sensitive(text)) { bubble("assistant", "Câu hỏi có vẻ chứa số thẻ, số tài khoản hoặc mật khẩu. Hãy xóa thông tin đó rồi gửi lại."); return; }
      busy = true; send.disabled = true; q.value = "";
      bubble("user", text); const out = bubble("assistant", "Đang suy nghĩ…");
      try { const t = await chat.ask(text, t => { out.innerHTML = md(t || "Đang suy nghĩ…"); log.scrollTop = log.scrollHeight; }); out.innerHTML = md(t); }
      catch (e) { out.innerHTML = md(errText(e)); }
      finally { busy = false; send.disabled = false; log.scrollTop = log.scrollHeight; }
    }
    const open = v => { p.hidden = !v; fab.setAttribute("aria-expanded", String(v)); if (v) { q.focus(); getSample(); } };
    fab.onclick = () => open(p.hidden);
    p.querySelector('[data-a="close"]').onclick = () => { open(false); fab.focus(); };
    p.querySelector('[data-a="new"]').onclick = () => { chat.reset(); welcome(); };
    p.addEventListener("keydown", e => { if (e.key === "Escape") { open(false); fab.focus(); } });
    p.querySelector("#finai-form").addEventListener("submit", e => { e.preventDefault(); go(q.value); });
    q.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); go(q.value); } });
    openWithImpl = text => { open(true); q.value = text; go(text); };
    welcome();
    if (opts.hideWhen) { const upd = () => { const h = opts.hideWhen(); fab.style.display = h ? "none" : ""; if (h) open(false); }; addEventListener("hashchange", upd); upd(); }
  }

  /* Tự nạp dữ liệu khi trang không tự cung cấp (lab.html) */
  async function autoload(){
    if (window.claude && window.claude.use) {
      try {
        const db = await claude.use("db"); if (!db) throw 0;
        const got = { i: null, p: null }; const docs = snap => { if (!snap) return []; const a = Array.isArray(snap) ? snap : (snap.docs || []); return a.map(d => (d && typeof d.data === "function") ? Object.assign({ id: d.id }, d.data()) : d).filter(Boolean); };
        const fin = () => { if (got.i && got.p) setData(got.i, got.p); };
        db.collection("ideas").onSnapshot(s => { got.i = docs(s); fin(); }, () => {});
        db.collection("projects").onSnapshot(s => { got.p = docs(s); fin(); }, () => {});
        return;
      } catch (e) {}
    }
    try { const r = await fetch("data.json", { cache: "no-store" }); const d = await r.json(); setData(d.ideas, d.projects); } catch (e) {}
  }

  window.FinAI = { setData, brief, TOOLS, md, sensitive, makeChat, errText, mountWidget, openWith, autoload, getSample, kb: KB };
})();
