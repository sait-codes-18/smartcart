import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const iconSize = size === 'sm' ? 'w-7 h-7 text-sm' : size === 'lg' ? 'w-10 h-10 text-xl' : 'w-8 h-8 text-base';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Brand Icon: rounded square with olive/dark bg and vibrant lime 'q' */}
      <div
        className={`${iconSize} rounded-xl bg-slate-900 flex items-center justify-center font-black text-lime-400 shadow-xs tracking-tighter`}
        style={{ backgroundColor: '#1C2611' }}
      >
        q
      </div>
      <span className={`${textSize} font-black tracking-tight text-slate-900`}>
        quick<span className="text-amber-700">compare</span>
      </span>
    </div>
  );
}
