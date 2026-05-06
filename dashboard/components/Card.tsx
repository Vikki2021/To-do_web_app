import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

export function Card({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-bg-border bg-bg-card shadow-soft',
        'before:absolute before:inset-0 before:-z-10 before:rounded-2xl',
        glow && 'before:bg-card-glow',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 p-5 pb-3', className)}>
      <div>
        <h3 className="text-sm font-medium text-ink-dim tracking-wide uppercase">
          {title}
        </h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-5 pt-0', className)}>{children}</div>;
}
