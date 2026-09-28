// Browser helper: run on /__ref/<page>.html (1440px viewport). Loads the real page in a
// 1440px iframe and reports text elements whose position/size/style differ from Figma.
// Usage (devtools / automation): await compareWith("/", { tolerance: 2 })
window.compareWith = async function compareWith(url, { tolerance = 2, height = 900 } = {}) {
  const frame = document.createElement("iframe");
  frame.style.cssText = `position:absolute;left:0;top:0;width:1440px;height:${height}px;border:0;opacity:0;pointer-events:none`;
  frame.src = url;
  document.body.appendChild(frame);
  await new Promise((r) => (frame.onload = r));
  await new Promise((r) => setTimeout(r, 1500));
  const doc = frame.contentDocument;
  doc.documentElement.style.scrollbarWidth = "none";
  await new Promise((r) => setTimeout(r, 300));
  await doc.fonts.ready;

  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const textOf = (el) => norm([...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(""));
  const collect = (root, win) =>
    [...root.querySelectorAll("body *")]
      .filter((el) => textOf(el) && win.getComputedStyle(el).visibility !== "hidden")
      .map((el) => {
        const range = el.ownerDocument.createRange(); const tn = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()); range.setStartBefore(tn[0]); range.setEndAfter(tn[tn.length - 1]); const r = range.getBoundingClientRect();
        const cs = win.getComputedStyle(el);
        return { el, text: textOf(el), x: r.left, y: r.top + win.scrollY, w: r.width, h: r.height, fs: cs.fontSize, color: cs.color, fw: cs.fontWeight };
      })
      .filter((e) => e.w > 0 && e.x > -5 && e.x < 1440);

  const ref = collect(document, window).filter((e) => !frame.contains(e.el));
  const mine = collect(doc, frame.contentWindow);
  const used = new Set();
  const report = [];
  for (const r of ref) {
    const cands = mine.filter((m) => !used.has(m) && (m.text === r.text || m.text.startsWith(r.text.slice(0, 24))));
    if (!cands.length) {
      report.push(`MISSING "${r.text.slice(0, 40)}" @${Math.round(r.x)},${Math.round(r.y)}`);
      continue;
    }
    const m = cands.sort((a, b) => Math.abs(a.y - r.y) + Math.abs(a.x - r.x) - (Math.abs(b.y - r.y) + Math.abs(b.x - r.x)))[0];
    used.add(m);
    const d = { x: m.x - r.x, y: m.y - r.y, w: m.w - r.w };
    const issues = [];
    if (Math.abs(d.x) > tolerance) issues.push(`dx=${Math.round(d.x)}`);
    if (Math.abs(d.y) > tolerance) issues.push(`dy=${Math.round(d.y)}`);
    if (m.fs !== r.fs) issues.push(`fs ${m.fs}≠${r.fs}`);
    if (m.fw !== r.fw) issues.push(`fw ${m.fw}≠${r.fw}`);
    if (m.color.replace(/ /g, "") !== r.color.replace(/ /g, "")) issues.push(`color ${m.color}≠${r.color}`);
    if (issues.length) report.push(`"${r.text.slice(0, 34)}" @${Math.round(r.x)},${Math.round(r.y)}: ${issues.join(" ")}`);
  }
  frame.remove();
  return { refCount: ref.length, mineCount: mine.length, issues: report.length, report };
};
