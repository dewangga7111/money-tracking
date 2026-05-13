'use client';

const GREEN = '#3d8c40';
const GREEN_DARK = '#2d6b30';

export function HomeContent() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }} className="text-xs">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-8">
          <div className="flex items-center gap-5 text-gray-600">
            <a href="#" className="hover:text-gray-900">Park Viewer Login</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-900">Support & Maintenance</a>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <a href="#" className="hover:text-gray-900">IT</a>
            <span>/</span>
            <a href="#" className="hover:text-gray-900">DE</a>
            <span>/</span>
            <span style={{ color: GREEN }} className="font-bold">EN</span>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '2px solid #e8e8e8' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="4" fill={GREEN} />
              <path d="M18 6 L14 15 L6 15 L13 20 L10 29 L18 24 L26 29 L23 20 L30 15 L22 15 Z" fill="white" />
            </svg>
            <span className="font-black text-xl tracking-tight text-gray-900">LEITWIND</span>
          </a>

          {/* Nav links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-gray-600">
            {['Company', 'Products', 'Applications', 'Services', 'Technology', 'References', 'Career', 'Media & Press', 'Magazine', 'Events'].map((item) => (
              <a key={item} href="#" className="hover:text-gray-900 whitespace-nowrap transition-colors">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:+390472722111" className="hidden lg:block text-sm text-gray-500 hover:text-gray-800">+39 0472 722111</a>
            <a
              href="#contact"
              className="text-sm font-bold px-5 py-2 rounded text-white"
              style={{ background: GREEN }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
        {/* Background: simulated landscape photo */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #0a1a0c 0%, #1a3a1e 30%, #2d5e33 55%, #4a8a50 75%, #6aaa70 100%)',
          }}
        />
        {/* Overlay texture */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />

        {/* Wind turbine silhouette SVG */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full flex items-end justify-center opacity-20">
          <svg viewBox="0 0 200 600" className="h-full w-auto" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="92" y="200" width="16" height="380" rx="8" />
            <circle cx="100" cy="200" r="10" />
            <path d="M100 200 L75 80 L98 100 Z" />
            <path d="M100 200 L180 255 L162 235 Z" />
            <path d="M100 200 L20 255 L40 232 Z" />
          </svg>
        </div>

        {/* Mountain silhouette at bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="rgba(255,255,255,0.05)">
          <path d="M0 120 L240 40 L480 90 L720 20 L960 70 L1200 30 L1440 80 L1440 120 Z" />
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center" style={{ minHeight: '90vh', paddingTop: '8rem', paddingBottom: '6rem' }}>
          <p className="text-green-300 text-sm font-bold tracking-widest uppercase mb-4">Italian Wind Energy Technology</p>
          <h1 className="text-white font-black leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}>
            DRIVEN BY THE<br />
            <span style={{ color: '#7fd484' }}>WIND OF CHANGE</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <a href="#products" className="font-bold px-8 py-3 rounded text-white text-sm" style={{ background: GREEN }}>Our Products</a>
            <a href="#company" className="font-bold px-8 py-3 rounded text-white text-sm border border-white border-opacity-50 hover:bg-white hover:text-gray-900 transition-colors">Company</a>
            <a href="#technology" className="font-bold px-8 py-3 rounded border border-green-400 text-green-300 text-sm hover:bg-green-400 hover:text-white transition-colors">Technology</a>
          </div>

          {/* Newsletter strip */}
          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white text-sm font-medium whitespace-nowrap">Stay informed — subscribe to our newsletter:</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white bg-opacity-15 border border-white border-opacity-30 rounded text-white placeholder-white text-sm px-4 py-2 w-56 focus:outline-none focus:border-green-300"
                style={{ backdropFilter: 'blur(4px)' }}
              />
              <button className="font-bold text-sm px-5 py-2 rounded text-white" style={{ background: GREEN }}>Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY INTRO ── */}
      <section id="company" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-black leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#1a1a1a' }}>
              <span style={{ color: GREEN }}>LEITWIND</span> is the only Italian<br />
              manufacturer of <span style={{ color: GREEN }}>megawatt-class</span><br />
              wind turbine
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              LEITWIND specializes in the construction and installation of patented Direct Drive wind turbines with synchronous generators and permanent magnets — the most reliable, low-maintenance technology on the market.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our turbines are designed for small-scale wind farms and SME self-consumption projects, delivering maximum energy yield with minimum environmental impact. As part of the HTI Group, we combine Italian craftsmanship with global industrial strength.
            </p>
            <a href="#products" className="inline-block font-bold text-sm px-7 py-3 rounded text-white" style={{ background: GREEN }}>
              Discover Our Turbines
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Simulated photo with gradient */}
            <div className="col-span-2 rounded-xl overflow-hidden" style={{ height: '220px', background: 'linear-gradient(135deg, #c8e6c9 0%, #81c784 40%, #4caf50 70%, #2e7d32 100%)' }}>
              <div className="w-full h-full flex items-center justify-center opacity-40">
                <svg viewBox="0 0 300 200" className="w-full h-full" fill="none">
                  <path d="M0 200 Q75 120 150 140 Q225 160 300 80 L300 200 Z" fill="#1b5e20" opacity="0.5" />
                  <circle cx="200" cy="80" r="6" fill="white" />
                  <rect x="197" y="80" width="6" height="120" rx="3" fill="white" opacity="0.6" />
                  <path d="M200 80 L185 35 L198 45 Z" fill="white" opacity="0.6" />
                  <path d="M200 80 L235 95 L225 83 Z" fill="white" opacity="0.6" />
                  <path d="M200 80 L165 95 L175 82 Z" fill="white" opacity="0.6" />
                  <circle cx="80" cy="100" r="4" fill="white" />
                  <rect x="77" y="100" width="6" height="100" rx="3" fill="white" opacity="0.5" />
                  <path d="M80 100 L68 60 L79 68 Z" fill="white" opacity="0.5" />
                  <path d="M80 100 L110 112 L103 103 Z" fill="white" opacity="0.5" />
                  <path d="M80 100 L50 112 L57 102 Z" fill="white" opacity="0.5" />
                </svg>
              </div>
            </div>
            {[
              { value: '400+', label: 'Installations' },
              { value: '€1.4B', label: 'HTI Group Revenue' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-6 flex flex-col items-center justify-center" style={{ background: GREEN }}>
                <p className="text-white font-black text-3xl">{s.value}</p>
                <p className="text-green-100 text-sm mt-1 text-center">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT (full-width banner) ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '440px' }}>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(100deg, #1a3320 0%, #2d5e35 40%, #4a8850 70%, #a5d6a7 100%)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-white font-black leading-none mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
            WHAT MAKES US<br /><span style={{ color: '#a5d6a7' }}>DIFFERENT</span>
          </h2>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            From Italian engineering excellence to worldwide service support — six reasons why LEITWIND is the trusted partner for wind energy projects globally.
          </p>
        </div>
      </section>

      {/* ── 6 USPs ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: '#e8e8e8' }}>
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" /></svg>
                ),
                title: 'Italian Design',
                desc: 'Engineered and manufactured in South Tyrol, Italy — combining Alpine precision with Mediterranean innovation.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                ),
                title: 'A partner you can trust',
                desc: 'Part of the HTI Group — a global leader with €1.4B revenue and decades of experience in mountain and clean energy.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                ),
                title: 'LEITWIND in the world',
                desc: '400+ installations across Europe, Asia and beyond — with offices and service centers on four continents.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" /></svg>
                ),
                title: 'From the idea to operational management',
                desc: 'Full turnkey solutions: from site assessment and engineering through installation, grid connection, and lifetime maintenance.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
                ),
                title: 'Customisation',
                desc: 'Every wind project is unique. We tailor turbine configurations, tower heights, and control systems to your exact site conditions.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill={GREEN}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" /></svg>
                ),
                title: 'Certifications',
                desc: 'All LEITWIND turbines hold international certifications, meeting the strictest regulatory standards across EU, India, and Poland.',
              },
            ].map((usp) => (
              <div key={usp.title} className="bg-white p-8 hover:bg-gray-50 transition-colors">
                <div className="mb-5">{usp.icon}</div>
                <h3 className="font-bold text-gray-900 text-base mb-3">{usp.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE LEITWIND RANGE ── */}
      <section id="products" className="py-16" style={{ background: '#f7f7f7' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Wind Turbines</p>
          <h2 className="font-black text-gray-900 mb-2" style={{ fontSize: '2.2rem' }}>THE LEITWIND RANGE</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">
            A wind turbine for every need — four proven models covering from community self-consumption to large-scale generation. All Direct Drive, all Italian.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                model: 'LTW42',
                tag: 'Ideal for self-consumption projects',
                rotor: '42m', power: '250–500 kW', height: '28 / 39m',
                bg: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)',
                accent: GREEN,
              },
              {
                model: 'LTW80',
                tag: 'Designed to withstand the strongest winds',
                rotor: '80m', power: '500–1,800 kW', height: '60 / 65 / 80m',
                bg: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
                accent: '#1976d2',
              },
              {
                model: 'LTW90',
                tag: 'Maximum energy yield in complex terrain',
                rotor: '90m', power: '500–2,000 kW', height: '60 / 65 / 80 / 97.5m',
                bg: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)',
                accent: '#7b1fa2',
              },
              {
                model: 'LTW101',
                tag: 'The largest LEITWIND turbine',
                rotor: '101m', power: '2,000–3,000 kW', height: '80 / 93.5m',
                bg: 'linear-gradient(135deg, #fff8e1 0%, #ffecb3 50%, #ffd54f 100%)',
                accent: '#f57f17',
              },
            ].map((p) => (
              <div key={p.model} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Image area */}
                <div style={{ height: '200px', background: p.bg, position: 'relative' }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 120 300" className="h-full w-auto" fill={p.accent}>
                      <rect x="56" y="120" width="8" height="180" rx="4" />
                      <circle cx="60" cy="120" r="6" />
                      <path d="M60 120 L47 55 L59 63 Z" />
                      <path d="M60 120 L110 148 L100 137 Z" />
                      <path d="M60 120 L10 148 L20 136 Z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="font-black text-3xl" style={{ color: p.accent }}>{p.model}</span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">{p.tag}</p>
                  <div className="space-y-2 text-sm border-t pt-4" style={{ borderColor: '#f0f0f0' }}>
                    {[
                      ['Rotor Diameter', p.rotor],
                      ['Power Range', p.power],
                      ['Tower Height', p.height],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-400">{label}</span>
                        <span className="font-bold text-gray-800">{val}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-5 block text-center text-sm font-bold py-2.5 rounded border transition-colors"
                    style={{ borderColor: p.accent, color: p.accent }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = p.accent;
                      (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = p.accent;
                    }}
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIELDS OF APPLICATION ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>Use Cases</p>
          <h2 className="font-black text-gray-900 mb-10" style={{ fontSize: '2.2rem' }}>FIELDS OF APPLICATION</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Cacer',
                subtitle: 'Renewable Energy Communities',
                desc: 'LEITWIND turbines power CACER community energy projects across Italy and Europe — enabling municipalities and SMEs to produce and share clean energy, cutting costs and carbon footprints.',
                bg: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 40%, #388e3c 70%, #66bb6a 100%)',
              },
              {
                title: 'Ski resorts',
                subtitle: 'Mountain Energy Solutions',
                desc: "Alpine environments demand robust, reliable turbines. LEITWIND's Direct Drive technology is built for extreme weather — offsetting snowmaking and lift energy while contributing to resort sustainability goals.",
                bg: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 40%, #1976d2 70%, #64b5f6 100%)',
              },
            ].map((app) => (
              <div key={app.title} className="rounded-lg overflow-hidden shadow-sm group">
                <div className="relative overflow-hidden" style={{ height: '260px', background: app.bg }}>
                  <div className="absolute inset-0 flex items-end p-8">
                    <div>
                      <p className="text-white text-opacity-75 text-xs font-semibold uppercase tracking-widest mb-1 opacity-80">{app.subtitle}</p>
                      <h3 className="text-white font-black text-3xl">{app.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-t-0 border-gray-100">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{app.desc}</p>
                  <a href="#" className="text-sm font-bold transition-colors" style={{ color: GREEN }}>
                    Explore →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES banner ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(100deg, #0a1a0c 0%, #1a3320 50%, #2d5e35 100%)', minHeight: '340px' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8" style={{ minHeight: '340px', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div>
            <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-3">End-to-End</p>
            <h2 className="text-white font-black leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}>
              OUR SERVICES,<br />FROM IDEA TO MANAGEMENT
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['R&D', 'Project Management', 'Production', 'Installation', 'Grid Connection', 'Monitoring', 'Maintenance'].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7fd484' }} />
                  <span className="text-green-200 text-xs font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 font-bold text-sm px-8 py-4 rounded text-white"
            style={{ background: GREEN }}
          >
            Get Started →
          </a>
        </div>
      </section>

      {/* ── LEITWIND IN THE WORLD ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* World map placeholder */}
          <div className="rounded-xl overflow-hidden" style={{ background: '#f0f4f0', minHeight: '380px', position: 'relative' }}>
            <svg viewBox="0 0 600 380" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Simplified world map silhouette */}
              <rect width="600" height="380" fill="#eef5ee" />
              {/* Europe */}
              <path d="M270 100 L280 95 L295 90 L310 88 L318 95 L315 108 L308 115 L298 120 L285 118 L275 112 Z" fill="#c8e6c9" />
              {/* Africa */}
              <path d="M278 125 L290 122 L302 125 L308 140 L305 165 L295 175 L282 172 L272 155 L270 135 Z" fill="#c8e6c9" />
              {/* Asia */}
              <path d="M318 88 L380 80 L420 85 L440 100 L430 115 L410 120 L380 115 L350 120 L330 115 L318 105 Z" fill="#c8e6c9" />
              {/* Americas */}
              <path d="M120 90 L145 85 L160 95 L165 115 L155 130 L140 135 L125 128 L115 110 Z" fill="#c8e6c9" />
              <path d="M130 140 L148 135 L158 148 L155 170 L142 180 L128 175 L120 160 L122 148 Z" fill="#c8e6c9" />
              {/* Australia */}
              <path d="M430 160 L455 155 L470 163 L468 180 L452 185 L435 178 L428 168 Z" fill="#c8e6c9" />

              {/* Location dots */}
              {[
                { x: 285, y: 100, label: 'South Tyrol' },
                { x: 295, y: 97, label: 'Austria' },
                { x: 280, y: 108, label: 'France' },
                { x: 292, y: 105, label: 'Lacedonia' },
                { x: 400, y: 100, label: 'India' },
              ].map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.x} cy={dot.y} r="5" fill={GREEN} />
                  <circle cx={dot.x} cy={dot.y} r="9" fill={GREEN} fillOpacity="0.25" />
                </g>
              ))}
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>Worldwide</p>
            <h2 className="font-black text-gray-900 mb-6" style={{ fontSize: '2.2rem' }}>LEITWIND IN THE WORLD</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We manage an international supply chain and count over 400 wind turbines installed all over the world — with offices, production, and service centers across Europe and India.
            </p>
            <div className="space-y-4">
              {[
                { flag: '🇮🇹', place: 'South Tyrol, Italy', role: 'Headquarters & Manufacturing' },
                { flag: '🇦🇹', place: 'Telfs & Vienna, Austria', role: 'R&D and Production' },
                { flag: '🇫🇷', place: 'Gilly-sur-Isère, France', role: 'POMA Production' },
                { flag: '🇮🇳', place: 'Tamil Nadu, India', role: 'Component Manufacturing' },
                { flag: '🇮🇹', place: 'Lacedonia, Italy', role: 'Service Center' },
              ].map((o) => (
                <div key={o.place} className="flex items-center gap-4">
                  <span className="text-2xl">{o.flag}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{o.place}</p>
                    <p className="text-gray-400 text-xs">{o.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-8">
              <div>
                <p className="font-black text-3xl" style={{ color: GREEN }}>400+</p>
                <p className="text-gray-400 text-xs mt-1">Installations</p>
              </div>
              <div>
                <p className="font-black text-3xl" style={{ color: GREEN }}>6</p>
                <p className="text-gray-400 text-xs mt-1">Global Offices</p>
              </div>
              <div>
                <p className="font-black text-3xl" style={{ color: GREEN }}>20+</p>
                <p className="text-gray-400 text-xs mt-1">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── #MAGAZINE ── */}
      <section className="py-16" style={{ background: '#f7f7f7' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-black text-gray-900 text-3xl">#MAGAZINE</h2>
              <p className="text-gray-400 mt-1 text-sm">A dedicated space for our latest news</p>
            </div>
            <a href="#" className="text-sm font-bold hidden sm:block" style={{ color: GREEN }}>All articles →</a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                cat: 'Events',
                date: 'Sep 2025',
                title: 'LEITWIND at HUSUM Wind 2025 with new grid certifications',
                img: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
              },
              {
                cat: 'Applications',
                date: 'Jul 2025',
                title: 'LEITWIND for ski resorts — wind power applications at altitude',
                img: 'linear-gradient(135deg, #0d47a1 0%, #64b5f6 100%)',
              },
              {
                cat: 'Company',
                date: 'May 2025',
                title: 'HTI Group closes 2024 with €1.4 billion revenue',
                img: 'linear-gradient(135deg, #4a148c 0%, #ce93d8 100%)',
              },
              {
                cat: 'Certification',
                date: 'Mar 2025',
                title: 'LTW90 receives Polish grid certification — new market opening',
                img: 'linear-gradient(135deg, #e65100 0%, #ffca28 100%)',
              },
            ].map((a) => (
              <article key={a.title} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div style={{ height: '160px', background: a.img }} className="relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg viewBox="0 0 24 24" className="w-16 h-16 fill-white"><path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#e8f5e9', color: GREEN }}>{a.cat}</span>
                    <span className="text-xs text-gray-400">{a.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm leading-snug mb-3 group-hover:text-green-700 transition-colors">{a.title}</h3>
                  <a href="#" className="text-xs font-bold" style={{ color: GREEN }}>Read more →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── #LINKEDIN WALL ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black text-gray-900 text-3xl mb-2">#LINKEDIN WALL</h2>
          <p className="text-gray-400 text-sm mb-10">Follow our latest updates on LinkedIn</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { bg: 'linear-gradient(135deg, #1b5e20, #66bb6a)', text: 'New LTW101 installation in Austria — a milestone for Alpine wind energy! ⚡' },
              { bg: 'linear-gradient(135deg, #0d47a1, #42a5f5)', text: 'HUSUM Wind 2025: our team is ready to meet you at stand B12. Come visit!' },
              { bg: 'linear-gradient(135deg, #1a237e, #7986cb)', text: 'Direct Drive technology: why fewer moving parts means longer turbine life.' },
              { bg: 'linear-gradient(135deg, #bf360c, #ff8a65)', text: 'Ski resorts + wind power = sustainable mountain tourism. See how.' },
              { bg: 'linear-gradient(135deg, #1b5e20, #a5d6a7)', text: 'HTI Group: proud to report €1.4 billion in revenue. A team effort!' },
            ].map((post, i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div style={{ height: '120px', background: post.bg }} />
                <div className="p-4 border border-t-0 border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{post.text}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <span className="text-xs text-gray-400">LinkedIn</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY UPDATED / CONTACT ── */}
      <section id="contact" className="py-16" style={{ background: '#f7f7f7' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Newsletter */}
          <div className="rounded-xl p-8 text-white" style={{ background: GREEN }}>
            <h3 className="font-black text-2xl mb-2">STAY UPDATED</h3>
            <p className="text-green-100 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter and be the first to receive news about LEITWIND, new certifications, and the latest trends in wind energy.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-4 py-3 text-white placeholder-green-200 text-sm focus:outline-none focus:border-white"
              />
              <button className="w-full font-bold py-3 rounded text-sm" style={{ background: GREEN_DARK, color: 'white' }}>
                Subscribe to Newsletter
              </button>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="font-black text-gray-900 text-2xl mb-6">Request Information</h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {['Full Name', 'Company', 'Email', 'Phone'].map((f) => (
                  <div key={f}>
                    <label className="block text-xs font-bold text-gray-600 mb-1">{f}</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none transition-colors"
                      style={{ outline: 'none' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = GREEN)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">Product Interest</label>
                <div className="flex flex-wrap gap-2">
                  {['LTW 42', 'LTW 80', 'LTW 90', 'LTW 101'].map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm border border-gray-200 rounded px-3 py-1.5 cursor-pointer hover:border-green-400 transition-colors">
                      <input type="checkbox" className="rounded" style={{ accentColor: GREEN }} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <textarea
                rows={3}
                placeholder="Your message..."
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm resize-none focus:outline-none transition-colors"
                onFocus={(e) => (e.currentTarget.style.borderColor = GREEN)}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
              />
              <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                <input type="checkbox" className="mt-0.5" style={{ accentColor: GREEN }} />
                I accept the <a href="#" className="underline" style={{ color: GREEN }}>Privacy Policy</a>
              </label>
              <button className="w-full font-bold py-3 rounded text-white text-sm" style={{ background: GREEN }}>
                Send Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: GREEN }}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="4" fill="rgba(255,255,255,0.25)" />
                  <path d="M18 6 L14 15 L6 15 L13 20 L10 29 L18 24 L26 29 L23 20 L30 15 L22 15 Z" fill="white" />
                </svg>
                <span className="font-black text-xl tracking-tight text-white">LEITWIND</span>
              </div>
              <p className="text-green-100 text-sm leading-relaxed mb-5">
                The only Italian manufacturer of megawatt-class wind turbines. Part of the HTI Group — delivering clean energy solutions worldwide since 1989.
              </p>
              <div className="flex gap-3">
                {[
                  { letter: 'in', bg: '#0a66c2' },
                  { letter: 'f', bg: '#1877f2' },
                  { letter: '▶', bg: '#ff0000' },
                  { letter: '📷', bg: '#e1306c' },
                ].map((s) => (
                  <a
                    key={s.letter}
                    href="#"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                    style={{ background: s.bg }}
                  >
                    {s.letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Technology', 'Certifications', 'Career', 'Media & Press', 'Events'].map((l) => (
                  <li key={l}><a href="#" className="text-green-100 text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Products</h4>
              <ul className="space-y-2.5">
                {['LTW 42', 'LTW 80', 'LTW 90', 'LTW 101', 'Services', 'References', 'Park Viewer'].map((l) => (
                  <li key={l}><a href="#" className="text-green-100 text-sm hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Headquarters */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider mb-4">Headquarters</h4>
              <address className="not-italic text-green-100 text-sm space-y-1 leading-relaxed">
                <p className="font-bold text-white">Leitner S.p.A</p>
                <p>Via Brennero 34</p>
                <p>39049 Vipiteno (BZ)</p>
                <p>South Tyrol, Italy</p>
                <p className="mt-3 font-semibold text-white">+39 0472 722111</p>
                <p>info@leitwind.com</p>
              </address>
            </div>
          </div>

          {/* Group brands */}
          <div className="border-t border-white border-opacity-20 pt-8 mb-8">
            <p className="text-green-200 text-xs uppercase tracking-wider mb-4">Part of the HTI Group</p>
            <div className="flex flex-wrap gap-6 items-center">
              {['Leitner', 'POMA', 'Bartholet', 'Agudio', 'LeitWind'].map((b) => (
                <span key={b} className="text-sm font-black text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer">{b}</span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white border-opacity-20 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-green-200">
            <p>© 2025 Leitner S.p.A — VAT IT00560870215. All rights reserved.</p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Cookie Policy', 'Legal Notice'].map((l) => (
                <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
