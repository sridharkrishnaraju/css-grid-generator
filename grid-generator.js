/**
 * <grid-generator> — visual CSS Grid generator with live preview + copy. Zero dependencies.
 * Built & maintained by SGBP — Singapore Build Partners (https://sgbp.tech). MIT.
 */
class GridGenerator extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this.cols = 3; this.rows = 2; this.gap = 12; }
  connectedCallback() { this.render(); }
  _css() { return `display: grid;\ngrid-template-columns: repeat(${this.cols}, 1fr);\ngrid-template-rows: repeat(${this.rows}, 1fr);\ngap: ${this.gap}px;`; }
  _update() {
    const $ = (s) => this.shadowRoot.querySelector(s);
    const g = $("#preview");
    g.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
    g.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    g.style.gap = `${this.gap}px`;
    const n = this.cols * this.rows;
    g.innerHTML = Array.from({ length: n }, (_, i) => `<div class="cell">${i + 1}</div>`).join("");
    $("#out").textContent = this._css();
  }
  render() {
    const ctrls = [["cols", "Columns", 1, 8], ["rows", "Rows", 1, 8], ["gap", "Gap (px)", 0, 40]];
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:520px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .stage{background:#fafafa;border:1px solid #eee;border-radius:10px;padding:12px;margin-bottom:14px}
        .grid{display:grid;min-height:150px}
        .cell{background:linear-gradient(135deg,#EB0028,#ff6b6b);color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;min-height:42px}
        .ctrl{display:flex;align-items:center;gap:10px;margin:8px 0}
        .ctrl label{font-size:12px;font-weight:600;color:#555;width:88px;flex:0 0 auto}
        input[type=range]{flex:1;min-width:0;accent-color:#EB0028}
        .ctrl output{font-size:12px;font-family:ui-monospace,monospace;color:#333;width:34px;text-align:right;flex:0 0 auto}
        .outwrap{margin-top:14px;display:flex;align-items:stretch;gap:8px}
        pre{flex:1;min-width:0;background:#1a1a1a;color:#f4f4f4;border-radius:8px;padding:10px 12px;font-family:ui-monospace,monospace;font-size:12.5px;line-height:1.5;margin:0;overflow-x:auto;white-space:pre-wrap;word-break:break-word}
        .btns{display:flex;flex-direction:column;gap:6px;flex:0 0 auto}
        button{font:inherit;font-size:12px;font-weight:700;border-radius:8px;padding:8px 12px;cursor:pointer}
        .copy{color:#fff;background:#EB0028;border:0}
        .reset{color:#555;background:#fff;border:1px solid #ccc}
      </style>
      <div class="card">
        <div class="stage"><div class="grid" id="preview"></div></div>
        ${ctrls.map(([k, lab, mn, mx]) => `<div class="ctrl"><label>${lab}</label>
          <input type="range" id="r-${k}" min="${mn}" max="${mx}" value="${this[k]}"><output id="o-${k}">${this[k]}</output></div>`).join("")}
        <div class="outwrap"><pre id="out"></pre><div class="btns"><button class="copy" id="copy">Copy</button><button class="reset" id="reset">Reset</button></div></div>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    ctrls.forEach(([k]) => $(`#r-${k}`).addEventListener("input", (e) => { this[k] = +e.target.value; $(`#o-${k}`).textContent = e.target.value; this._update(); }));
    $("#copy").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText(this._css()); const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = o, 900); });
    $("#reset").addEventListener("click", () => { this.cols = 3; this.rows = 2; this.gap = 12; this.render(); });
    this._update();
  }
}
if (!customElements.get("grid-generator")) customElements.define("grid-generator", GridGenerator);
