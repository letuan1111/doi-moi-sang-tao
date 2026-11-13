/* FinVoice: giọng nói tiếng Việt cho trang Đổi mới sáng tạo.
   Hai chế độ:
   - "nhanh": dùng sẵn trình duyệt (Web Speech API) — không phải tải gì, phản hồi tức thì.
     Lưu ý: với nhận dạng giọng nói, Chrome gửi âm thanh tới máy chủ của Google để nhận dạng.
   - "rieng-tu": mô hình AI mã nguồn mở chạy ngay trên máy qua Transformers.js (ONNX, WebGPU/WASM):
     nhận dạng: Whisper tiny đa ngôn ngữ (OpenAI, MIT); đọc: MMS-TTS tiếng Việt (Meta, CC-BY-NC 4.0, chỉ phi thương mại).
     Tải mô hình một lần (khoảng 40 MB mỗi mô hình), trình duyệt lưu đệm cho lần sau; âm thanh không rời máy.
   Trên bản claude.ai, trang chạy trong khung bảo mật: micro và tải mô hình bên ngoài bị chặn, chỉ còn đọc to bằng giọng của trình duyệt. */
(function(){
  if (window.FinVoice) return;
  const TJS = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2";
  const ASR_MODEL = "Xenova/whisper-tiny", TTS_MODEL = "Xenova/mms-tts-vie";
  const sandboxed = !!(window.claude && window.claude.use);
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const store = { get(k, d){ try { const v = localStorage.getItem("dmst-voice-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v){ try { localStorage.setItem("dmst-voice-" + k, JSON.stringify(v)); } catch (e) {} } };
  let mode = store.get("mode", "nhanh");
  const listeners = new Set();
  const emit = (s) => listeners.forEach(f => { try { f(s); } catch (e) {} });

  /* ---------- Text clean-up for reading aloud ---------- */
  function clean(md){
    return String(md || "")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "đường link")
      .replace(/^\s*#{1,6}\s*/gm, "").replace(/^\s*[-*•]\s+/gm, "").replace(/^\s*\|.*\|\s*$/gm, " ")
      .replace(/[*_`>#|]/g, "").replace(/\s*\n+\s*/g, ". ").replace(/\.\s*\./g, ".").replace(/\s{2,}/g, " ").trim();
  }
  function chunks(text, max){
    const out = []; let cur = "";
    for (const s of text.split(/(?<=[.!?;:])\s+/)) {
      if ((cur + " " + s).length > max && cur) { out.push(cur.trim()); cur = s; } else cur += " " + s;
      while (cur.length > max) { const cut = cur.lastIndexOf(" ", max) > 40 ? cur.lastIndexOf(" ", max) : max; out.push(cur.slice(0, cut).trim()); cur = cur.slice(cut); }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }

  /* ---------- Transformers.js (lazy) ---------- */
  let tjsP = null; const pipes = {};
  function loadPipe(task, model, onProgress){
    if (sandboxed) return Promise.reject(Object.assign(new Error("sandbox"), { code: "sandbox" }));
    if (!pipes[model]) {
      tjsP = tjsP || import(TJS);
      pipes[model] = tjsP.then(async T => {
        const device = ("gpu" in navigator) ? "webgpu" : "wasm";
        const opts = { progress_callback: p => { if (onProgress && p && p.status === "progress" && p.total) onProgress(Math.round(p.loaded / p.total * 100), p.file); } };
        try { return await T.pipeline(task, model, Object.assign({ device, dtype: device === "webgpu" ? "fp32" : "q8" }, opts)); }
        catch (e) { if (device === "webgpu") return T.pipeline(task, model, Object.assign({ device: "wasm", dtype: "q8" }, opts)); throw e; }
      }).catch(e => { delete pipes[model]; throw e; });
    }
    return pipes[model];
  }

  /* ---------- Speaking ---------- */
  let speakToken = 0, audioEl = null;
  function viVoice(){
    const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    return vs.find(v => /^vi(-|_|$)/i.test(v.lang) && /google|natural|online/i.test(v.name)) || vs.find(v => /^vi(-|_|$)/i.test(v.lang)) || null;
  }
  if (window.speechSynthesis) { try { speechSynthesis.getVoices(); speechSynthesis.addEventListener && speechSynthesis.addEventListener("voiceschanged", () => emit({ voices: true })); } catch (e) {} }
  function stop(){
    speakToken++;
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
    if (audioEl) { try { audioEl.pause(); } catch (e) {} audioEl = null; }
    emit({ speaking: false });
  }
  async function speak(md, cb){
    cb = cb || {};
    stop(); const my = ++speakToken; const text = clean(md); if (!text) return;
    const native = !!window.speechSynthesis && (sandboxed || (mode === "nhanh" && !!viVoice()));
    emit({ speaking: true });
    try {
      if (native) {
        const v = viVoice();
        for (const c of chunks(text, 220)) {
          if (my !== speakToken) return;
          await new Promise(res => { const u = new SpeechSynthesisUtterance(c); u.lang = "vi-VN"; if (v) { try { u.voice = v; } catch (e) {} } u.rate = store.get("rate", 1); u.onend = u.onerror = res; speechSynthesis.speak(u); });
        }
      } else if (!sandboxed) {
        cb.onStatus && cb.onStatus("Đang tải giọng đọc AI (một lần, khoảng 40 MB)…");
        const tts = await loadPipe("text-to-speech", TTS_MODEL, p => cb.onStatus && cb.onStatus("Đang tải giọng đọc AI: " + p + "%"));
        cb.onStatus && cb.onStatus("");
        for (const c of chunks(text, 160)) {
          if (my !== speakToken) return;
          const out = await tts(c);
          if (my !== speakToken) return;
          const url = URL.createObjectURL(out.toBlob());
          await new Promise(res => { audioEl = new Audio(url); audioEl.playbackRate = store.get("rate", 1); audioEl.onended = audioEl.onerror = () => { URL.revokeObjectURL(url); res(); }; audioEl.play().catch(res); });
        }
      } else {
        throw Object.assign(new Error("no voice"), { code: "novoice" });
      }
      if (sandboxed && !viVoice()) cb.onStatus && cb.onStatus("Máy chưa có giọng tiếng Việt nên giọng đọc có thể chưa chuẩn. Hãy cài giọng tiếng Việt trong cài đặt hệ điều hành.");
    } catch (e) {
      cb.onStatus && cb.onStatus(e && e.code === "novoice" ? "Máy chưa có giọng đọc tiếng Việt. Hãy cài giọng tiếng Việt trong cài đặt hệ điều hành." : "Chưa đọc được: " + ((e && e.message) || "lỗi không xác định"));
    } finally { if (my === speakToken) emit({ speaking: false }); }
  }

  /* ---------- Listening ---------- */
  function canListen(){ return !sandboxed && (!!SR || !!(navigator.mediaDevices && window.MediaRecorder)); }
  function listen(cb){
    cb = cb || {};
    if (sandboxed) { cb.onError && cb.onError("Bản claude.ai chặn micro. Hãy dùng nút micro trên bàn phím điện thoại, hoặc mở bản GitHub của trang."); return () => {}; }
    if (SR && mode === "nhanh") return listenNative(cb);
    if (navigator.mediaDevices && window.MediaRecorder) return listenWhisper(cb);
    if (SR) return listenNative(cb);
    cb.onError && cb.onError("Trình duyệt này chưa hỗ trợ nhận dạng giọng nói.");
    return () => {};
  }
  function listenNative(cb){
    const r = new SR(); r.lang = "vi-VN"; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let finalText = "", ended = false;
    r.onresult = e => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finalText += t; else interim += t; } cb.onPartial && cb.onPartial((finalText + interim).trim()); };
    r.onerror = e => { cb.onError && cb.onError(e.error === "not-allowed" ? "Bạn chưa cho phép dùng micro." : e.error === "no-speech" ? "Không nghe thấy tiếng nói, hãy thử lại." : "Lỗi nhận dạng: " + e.error); };
    r.onend = () => { if (ended) return; ended = true; cb.onState && cb.onState("idle"); cb.onFinal && cb.onFinal(finalText.trim()); };
    cb.onState && cb.onState("listening"); r.start();
    return () => { try { r.stop(); } catch (e) {} };
  }
  function listenWhisper(cb){
    let rec = null, stream = null, stopped = false, timer = null; const parts = [];
    const stopAll = () => { if (stopped) return; stopped = true; clearTimeout(timer); try { rec && rec.state !== "inactive" && rec.stop(); } catch (e) {} };
    (async () => {
      try {
        // start loading the model while the user talks
        const pipeP = loadPipe("automatic-speech-recognition", ASR_MODEL, p => cb.onStatus && cb.onStatus("Đang tải mô hình nhận dạng (một lần): " + p + "%"));
        pipeP.catch(() => {});
        stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true } });
        rec = new MediaRecorder(stream); rec.ondataavailable = e => e.data && e.data.size && parts.push(e.data);
        rec.onstop = async () => {
          stream.getTracks().forEach(t => t.stop());
          cb.onState && cb.onState("thinking"); cb.onStatus && cb.onStatus("AI đang nhận dạng trên máy của bạn…");
          try {
            const buf = await new Blob(parts, { type: rec.mimeType || "audio/webm" }).arrayBuffer();
            const ctx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
            const audio = await ctx.decodeAudioData(buf); const pcm = audio.getChannelData(0); try { ctx.close(); } catch (e) {}
            const asr = await pipeP;
            const out = await asr(pcm, { language: "vietnamese", task: "transcribe", chunk_length_s: 30 });
            cb.onStatus && cb.onStatus(""); cb.onState && cb.onState("idle"); cb.onFinal && cb.onFinal(String(out && out.text || "").trim());
          } catch (e) { cb.onState && cb.onState("idle"); cb.onError && cb.onError("Chưa nhận dạng được: " + ((e && e.message) || "lỗi")); }
        };
        if (stopped) { stream.getTracks().forEach(t => t.stop()); return; }
        rec.start(); cb.onState && cb.onState("listening"); cb.onStatus && cb.onStatus("Đang ghi âm trên máy… bấm lại để dừng (tối đa 30 giây).");
        timer = setTimeout(stopAll, 30000);
      } catch (e) {
        cb.onState && cb.onState("idle");
        cb.onError && cb.onError(e && e.name === "NotAllowedError" ? "Bạn chưa cho phép dùng micro." : "Không mở được micro: " + ((e && e.message) || "lỗi"));
      }
    })();
    return stopAll;
  }

  /* ---------- Small UI helpers ---------- */
  const MIC_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z"/></svg>';
  const SPK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/></svg>';
  /* Gắn nút micro cho một ô nhập: kết quả nhận dạng được điền vào ô; onDone(text) tùy chọn. */
  function attachMic(input, button, opts){
    opts = opts || {};
    if (!canListen()) { button.hidden = true; return; }
    button.innerHTML = MIC_SVG; button.setAttribute("aria-label", "Nói để nhập"); button.title = "Nói để nhập (tiếng Việt)";
    let stopFn = null, base = "";
    const setState = s => { button.dataset.state = s; button.setAttribute("aria-pressed", String(s === "listening")); };
    button.addEventListener("click", () => {
      if (stopFn) { stopFn(); stopFn = null; return; }
      base = input.value ? input.value.replace(/\s+$/, "") + " " : "";
      stopFn = listen({
        onState: s => { setState(s); if (s === "idle") stopFn = null; },
        onPartial: t => { input.value = base + t; },
        onFinal: t => { if (t) { input.value = base + t; input.dispatchEvent(new Event("input", { bubbles: true })); opts.onDone && opts.onDone(input.value); } },
        onStatus: m => opts.onStatus && opts.onStatus(m),
        onError: m => { setState("idle"); stopFn = null; opts.onStatus && opts.onStatus(m); }
      });
    });
  }
  /* Nút đọc to: bấm lần nữa để dừng. */
  function speakButton(getText, opts){
    opts = opts || {};
    const b = document.createElement("button"); b.type = "button"; b.className = opts.className || "fv-speak"; b.innerHTML = SPK_SVG + (opts.label ? "<span>" + opts.label + "</span>" : "");
    b.setAttribute("aria-label", "Đọc to"); b.title = "Đọc to";
    let mine = false;
    b.addEventListener("click", () => {
      if (mine) { stop(); return; }
      mine = true; b.setAttribute("aria-pressed", "true");
      const off = s => { if (s.speaking === false) { mine = false; b.setAttribute("aria-pressed", "false"); listeners.delete(off); } };
      listeners.add(off);
      speak(getText(), { onStatus: m => opts.onStatus && opts.onStatus(m) });
    });
    return b;
  }
  function info(){
    return { sandboxed, mode, nativeListen: !!SR, nativeSpeak: !!window.speechSynthesis, viVoice: !!viVoice(), canListen: canListen(), webgpu: "gpu" in navigator };
  }
  function setMode(m){ mode = m === "rieng-tu" ? "rieng-tu" : "nhanh"; store.set("mode", mode); emit({ mode }); }

  window.FinVoice = { speak, stop, listen, canListen, attachMic, speakButton, clean, info, setMode, get mode(){ return mode; }, on: f => listeners.add(f), off: f => listeners.delete(f), store, MIC_SVG, SPK_SVG };
})();
