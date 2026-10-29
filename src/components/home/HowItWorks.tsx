export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Search any product',
      desc: 'Type what you need — from daily milk & bread to party snacks and household essentials.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      step: '02',
      title: 'Compare platforms',
      desc: 'See live price, delivery time, delivery fee, and in-stock status across Blinkit, Zepto, Swiggy Instamart & BigBasket.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      step: '03',
      title: 'Pick & Order',
      desc: 'Select the cheapest or fastest option with transparent breakdown of delivery fees and final checkout cost.',
      icon: (
        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((s) => (
        <div
          key={s.step}
          className="relative flex flex-col bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
              {s.icon}
            </div>
            <span className="text-2xl font-black text-indigo-100 tracking-tighter">
              {s.step}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
