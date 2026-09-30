import type { ReactNode } from "react";

export default function PostBody({ body }: { body: string }) {
  const text = body.replace(/\r\n?/g, "\n").trim();
  if (!text) return null;

  const nodes: ReactNode[] = [];
  text.split(/\n{2,}/).forEach((block, bi) => {
    const lines = block.split("\n").map((l) => l.trimEnd()).filter((l) => l.trim() !== "");
    let para: string[] = [];
    let items: string[] = [];
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
    flushPara(`pe${bi}`);
    flushList(`ue${bi}`);
  });

  return <div className="flex flex-col gap-space-md">{nodes}</div>;
}
