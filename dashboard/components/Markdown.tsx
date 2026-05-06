// Tiny, dependency-free markdown renderer tuned for this harness.
// Handles: headings, paragraphs, ul/ol, blockquotes, fenced code, inline code,
// bold, italic, links, tables, hr.
import { createElement } from 'react';
import { cn } from '@/lib/cn';

type Token =
  | { t: 'h'; level: number; text: string }
  | { t: 'p'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'quote'; lines: string[] }
  | { t: 'code'; lang: string; text: string }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'hr' };

function tokenize(src: string): Token[] {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const out: Token[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (/^```/.test(line)) {
      const lang = line.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      out.push({ t: 'code', lang, text: buf.join('\n') });
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      out.push({ t: 'h', level: h[1].length, text: h[2].trim() });
      i++;
      continue;
    }

    if (/^---\s*$/.test(line)) {
      out.push({ t: 'hr' });
      i++;
      continue;
    }

    if (/^\|/.test(line) && i + 1 < lines.length && /^\|?\s*-{2,}/.test(lines[i + 1] || '')) {
      const head = line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((s) => s.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) {
        rows.push(
          lines[i]
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((s) => s.trim()),
        );
        i++;
      }
      out.push({ t: 'table', head, rows });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push({ t: 'quote', lines: buf });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      out.push({ t: 'ul', items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      out.push({ t: 'ol', items });
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    const buf: string[] = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s|```|>\s?|[-*]\s+|\d+\.\s+|\|)/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push({ t: 'p', text: buf.join(' ') });
  }
  return out;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inline(s: string): string {
  let out = escapeHtml(s);
  out = out.replace(/`([^`]+)`/g, '<code class="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-saffron-200">$1</code>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink">$1</strong>');
  out = out.replace(/(^|\W)\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-teal-300 underline-offset-2 hover:underline">$1</a>');
  return out;
}

export function Markdown({ source, className }: { source: string; className?: string }) {
  const tokens = tokenize(source);
  return (
    <div className={cn('space-y-4 text-sm leading-relaxed text-ink-dim', className)}>
      {tokens.map((tok, i) => {
        switch (tok.t) {
          case 'h': {
            const sizes = ['text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm', 'text-xs'];
            const cls = cn(
              'mt-2 font-semibold text-ink tracking-tight',
              sizes[Math.min(5, tok.level - 1)],
              tok.level === 1 && 'text-2xl',
            );
            return createElement(`h${tok.level}`, {
              key: i,
              className: cls,
              dangerouslySetInnerHTML: { __html: inline(tok.text) },
            });
          }
          case 'p':
            return <p key={i} dangerouslySetInnerHTML={{ __html: inline(tok.text) }} />;
          case 'ul':
            return (
              <ul key={i} className="ml-5 list-disc space-y-1 marker:text-ink-muted">
                {tok.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="ml-5 list-decimal space-y-1 marker:text-ink-muted">
                {tok.items.map((it, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="rounded-xl border-l-2 border-saffron-500/60 bg-bg-elev px-4 py-3 italic text-ink"
              >
                {tok.lines.map((l, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: inline(l) }} />
                ))}
              </blockquote>
            );
          case 'code':
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-bg-border bg-black/40 p-4 text-xs leading-relaxed text-ink scroll-thin"
              >
                <code>{tok.text}</code>
              </pre>
            );
          case 'table':
            return (
              <div key={i} className="overflow-x-auto scroll-thin">
                <table className="w-full border-separate border-spacing-y-1 text-left text-xs">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-wider text-ink-muted">
                      {tok.head.map((h, j) => (
                        <th key={j} className="px-3 py-2 font-medium" dangerouslySetInnerHTML={{ __html: inline(h) }} />
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tok.rows.map((row, j) => (
                      <tr key={j} className="bg-bg-elev/60">
                        {row.map((c, k) => (
                          <td
                            key={k}
                            className={cn(
                              'px-3 py-2 text-ink-dim',
                              k === 0 && 'rounded-l-lg',
                              k === row.length - 1 && 'rounded-r-lg',
                            )}
                            dangerouslySetInnerHTML={{ __html: inline(c) }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'hr':
            return <hr key={i} className="border-bg-border" />;
        }
      })}
    </div>
  );
}
