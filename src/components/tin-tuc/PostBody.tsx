import type { ReactNode } from "react";

export default function PostBody({ body }: { body: string }) {
  const text = body.replace(/\r\n?/g, "\n").trim();
  if (!text) return null;

  const nodes: ReactNode[] = [];
  text.split(/\n{2,}/).forEach((block, bi) => {
    const lines = block.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim() !== "");
    let para: string[] = [];
    let items: string[] = [];
    let tableLines: string[] = [];
    // Bảng: các dòng liên tiếp bắt đầu bằng "|"; dòng đầu là tiêu đề, dòng |---| bị bỏ qua.
    const flushTable = (k: string) => {
      if (!tableLines.length) return;
      const cells = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const rows = tableLines.filter((l) => !/^\|?[\s:|-]+\|?$/.test(l.trim())).map(cells);
      tableLines = [];
      const [head, ...rest] = rows;
      if (!head) return;
      nodes.push(
        <div key={`t${k}`} className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[32rem] border-collapse text-left text-body-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-900">
              <tr>
                {head.map((c, i) => (
                  <th key={i} scope="col" className="px-space-sm py-space-xs font-bold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((r, ri) => (
                <tr key={ri} className="border-t border-slate-200 align-top">
                  {r.map((c, ci) => (
                    <td key={ci} className={`px-space-sm py-space-xs ${ci === 0 ? "font-semibold text-slate-900" : ""}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    };
    const flushPara = (k: string) => {
      if (para.length) {
        nodes.push(
          <p key={k} className="text-body-md text-slate-700 leading-relaxed whitespace-pre-line">
            {para.join("\n")}
          </p>,
        );
        para = [];
      }
    };
    const flushList = (k: string) => {
      if (items.length) {
        nodes.push(
          <ul key={k} className="list-disc pl-6 flex flex-col gap-space-xs text-body-md text-slate-700 leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>,
        );
        items = [];
      }
    };
    lines.forEach((line, li) => {
      const k = `${bi}-${li}`;
      if (line.trimStart().startsWith("|")) {
        flushPara(`p${k}`);
        flushList(`u${k}`);
        tableLines.push(line);
        return;
      }
      flushTable(k);
      if (line.startsWith("## ")) {
        flushPara(`p${k}`);
        flushList(`u${k}`);
        nodes.push(
          <h2 key={`h${k}`} className="text-headline-sm text-slate-900 font-bold pt-space-sm">
            {line.slice(3).trim()}
          </h2>,
        );
      } else if (line.startsWith("- ")) {
        flushPara(`p${k}`);
        items.push(line.slice(2).trim());
      } else {
        flushList(`u${k}`);
        para.push(line);
      }
    });
    flushTable(`e${bi}`);
    flushPara(`pe${bi}`);
    flushList(`ue${bi}`);
  });

  return <div className="flex flex-col gap-space-md">{nodes}</div>;
}
