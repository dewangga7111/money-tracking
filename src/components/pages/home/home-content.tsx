'use client';

const GREEN = '#5fa744';
const GREEN_DARK = '#4a8334';
const GREEN_LIGHT = '#e8f1e0';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80&auto=format&fit=crop',
  whatMakes: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80&auto=format&fit=crop',
  productRange: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&q=80&auto=format&fit=crop',
  ltw42: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80&auto=format&fit=crop',
  ltw80: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80&auto=format&fit=crop',
  ltw90: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80&auto=format&fit=crop',
  ltw101: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&auto=format&fit=crop',
  cacer: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80&auto=format&fit=crop',
  ski: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=900&q=80&auto=format&fit=crop',
  services: 'https://images.unsplash.com/photo-1473073897856-cc56a3e2c3a5?w=1920&q=80&auto=format&fit=crop',
  news1: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80&auto=format&fit=crop',
  news2: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80&auto=format&fit=crop',
  news3: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80&auto=format&fit=crop',
};

export function HomeContent() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>

      {/* ── FLOATING LOGO CARD (top-left) ── */}
      <div className="fixed top-5 left-5 z-50">
        <div className="bg-white rounded-2xl px-5 py-2.5 shadow-md flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 5 L13 18 L4 18 L14 25 L10 36 L20 28 L30 36 L26 25 L36 18 L27 18 Z" fill={GREEN} stroke={GREEN} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span className="font-black text-xl tracking-tight" style={{ color: '#1a1a1a', letterSpacing: '0.02em' }}>LEITWIND<sup className="text-[8px]" style={{ color: GREEN }}>®</sup></span>
        </div>
      </div>

      {/* ── FLOATING ICON BUTTONS (top-right) ── */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
        {/* Phone */}
        <a href="tel:+390472722111" className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform" style={{ background: GREEN }} aria-label="Call us">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
        {/* Email */}
        <a href="mailto:info@leitwind.com" className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform" style={{ background: GREEN }} aria-label="Email us">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
        </a>
        {/* Language */}
        <button className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-md text-xs font-bold hover:scale-105 transition-transform" style={{ background: GREEN }}>
          EN
        </button>
        {/* Menu */}
        {/* <button className="h-11 px-5 rounded-full flex items-center gap-2.5 text-white shadow-md text-sm font-bold hover:scale-105 transition-transform" style={{ background: GREEN }}>
          menu
          <span className="flex flex-col gap-1">
            <span className="block w-4 h-0.5 bg-white" />
            <span className="block w-4 h-0.5 bg-white" />
          </span>
        </button> */}
      </div>

      {/* ── HERO ── */}
      <section className="relative" style={{ height: '100vh', minHeight: '650px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url(${IMG.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex-1 flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 w-full">
              <h1
                className="text-white font-black leading-[0.95] mb-8"
                style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
              >
                <span style={{ color: '#a8e088' }}>PETANI </span>
                ADALAH TUAN SEBUAH NEGERI DAN SEJATINYA DIALAH <br />
                <span style={{ color: '#a8e088' }}>RAJA YANG HAKIKI</span>
              </h1>
              <div className="flex flex-wrap gap-3">
                <a href="#products" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded text-white" style={{ background: GREEN }}>
                  Products <span>→</span>
                </a>
                <a href="#company" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-black transition-colors">
                  Company <span>→</span>
                </a>
                <a href="#technology" className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded border-2 border-white text-white hover:bg-white hover:text-black transition-colors">
                  Technology <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom newsletter strip */}
          {/* <div className="bg-black/40 backdrop-blur-sm py-5">
            <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <p className="text-white text-sm">Stay informed about LEITWIND and the newest trends in the sector</p>
              <div className="flex gap-2 ml-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border border-white/30 rounded text-white placeholder-white/60 text-sm px-4 py-2.5 w-64 focus:outline-none focus:border-white"
                />
                <button className="font-bold text-sm px-6 py-2.5 rounded text-white" style={{ background: GREEN }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* ── STICKY PILL NAV ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-center">
          <nav className="bg-[#f0f0f0] rounded-full px-3 py-2 flex items-center gap-1 overflow-x-auto max-w-full">
            {[
              { label: 'ABOUT US', active: true, href: '#company' },
              { label: 'PRODUCTS', active: false, href: '#products' },
              { label: 'BENEFIT', active: false, href: '#applications' },
              { label: 'HOW TO', active: false, href: '#services' },
              { label: 'GALERI', active: false, href: '#technology' },
              { label: 'LEGAL', active: false, href: '#references' },
              { label: 'DECOMMENTATION', active: false, href: '#magazine' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-colors"
                style={{
                  color: item.active ? GREEN : '#333',
                }}
                onMouseEnter={(e) => { if (!item.active) e.currentTarget.style.color = GREEN; }}
                onMouseLeave={(e) => { if (!item.active) e.currentTarget.style.color = '#333'; }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* ── COMPANY INTRO ── */}
      <section id="company" className="py-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="font-black leading-tight mb-8" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
            LEITWIND is the only Italian manufacturer of{' '}
            <span style={{ color: GREEN }}>megawatt-class</span> wind turbine
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto">
            PT. Mandraguna Pusaka Indonesia melakukan operasi produksi dengan melalui proses perizinan sesuai perundangan di Indonesia, Seiring dengan berjalanya waktu kami terus berproses melengkapi dokumen legalitas kami dari mulai Akta Notariat, pengesahan Kemenkumham, Perizinan Perpajakan hingga terdaftar di OSS dan terbitnya NIB dan izin Usaha. Kami tumbuh melengkapi perizinan produksi hingga legalitas HAKI untuk pengamanan merk nama produk kami semua.
          </p>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT — huge typography centered ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '700px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMG.whatMakes})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 100%)' }} />
        <div className="relative z-10 flex flex-col items-center justify-center w-full" style={{ minHeight: '700px' }}>
          <h2
            className="text-white font-black leading-[0.9] text-center select-none"
            style={{
              fontSize: 'clamp(5rem, 16vw, 16rem)',
              letterSpacing: '-0.04em',
              textShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            WHAT MAKES
          </h2>
          <h2
            className="text-white font-black leading-[0.9] text-center select-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              letterSpacing: '-0.04em',
              textShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            US DIFFERENT
          </h2>
        </div>
      </section>

      {/* ── 6 USPs ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
                title: 'Italian Design',
                desc: 'The Hi-Tech district of Bolzano (Italy) is the place where LEITWIND wind turbines are designed and built. The high quality and technological excellence are part of our company DNA.',
              },
              {
                icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
                title: 'A partner you can trust',
                desc: 'As part of the HTI Group, LEITWIND is supported by a global leader in mountain transport technology and clean energy with decades of industrial experience.',
              },
              {
                icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                title: 'LEITWIND in the world',
                desc: 'We export our turbines all over the world and have over 400 wind turbines installed across Europe, Asia, and beyond — supported by our network of service centers.',
              },
              {
                icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z',
                title: 'From the idea to operational management',
                desc: 'We accompany our partners and clients in every step of the project: from design and engineering to installation, commissioning, and ongoing maintenance services.',
              },
              {
                icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
                title: 'Customisation',
                desc: 'We custom build our wind turbines to satisfy any need. Through the modular design of our turbines, we can provide the perfect solution for every project.',
              },
              {
                icon: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
                title: 'Certifications',
                desc: 'All the LEITWIND wind turbines have an excellent rate of reliability and uptime, attested by international Type Certificates and standards.',
              },
            ].map((usp) => (
              <div key={usp.title} className="border-l-2 pl-6 py-2" style={{ borderColor: GREEN_LIGHT }}>
                <svg viewBox="0 0 24 24" className="w-9 h-9 mb-4" fill={GREEN}>
                  <path d={usp.icon} />
                </svg>
                <h3 className="font-bold text-base mb-3 text-gray-900">{usp.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a href="#" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded text-white" style={{ background: GREEN }}>
              Discover LEITWIND <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── THE LEITWIND RANGE — GREEN BACKGROUND ── */}
      <section id="products" className="py-24 relative" style={{ background: GREEN }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                THE LEITWIND RANGE
              </h2>
            </div>
            <div className="text-white text-opacity-90">
              <p className="leading-relaxed mb-2 font-semibold text-white">A LEITWIND wind turbine for every need.</p>
              <p className="leading-relaxed text-sm">
                Thanks to the modular design of our turbines, we can provide the perfect solution for every project to satisfy even the most complex requests.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-white text-sm font-bold mt-4 underline-offset-4 hover:underline">
                Download our presentation of LEITWIND wind turbines <span>↓</span>
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { model: 'LTW42', tag: 'Ideal for self-consumption projects', img: IMG.ltw42, prod: '500–1,000 MWh/y', rotor: '42 m', height: '28 / 39 m' },
              { model: 'LTW80', tag: 'Designed to withstand the strongest winds', img: IMG.ltw80, prod: '1,000–4,500 MWh/y', rotor: '80 m', height: '60 / 65 / 80 m' },
              { model: 'LTW90', tag: 'Low wind, high performance', img: IMG.ltw90, prod: '1,500–5,500 MWh/y', rotor: '90 m', height: '60 / 65 / 80 / 97.5 m' },
              { model: 'LTW101', tag: 'The largest LEITWIND turbine', img: IMG.ltw101, prod: '6,000–9,000 MWh/y', rotor: '101 m', height: '80 / 93.5 m' },
            ].map((p) => (
              <div key={p.model} className="bg-white rounded-md overflow-hidden flex">
                <div
                  className="w-2/5 flex-shrink-0"
                  style={{
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="flex-1 p-6">
                  <h3 className="font-black text-2xl mb-1" style={{ color: '#1a1a1a' }}>{p.model}</h3>
                  <p className="text-gray-500 text-xs mb-4">{p.tag}</p>
                  <div className="space-y-1.5 text-xs border-t pt-3" style={{ borderColor: '#f0f0f0' }}>
                    {[
                      ['Production', p.prod],
                      ['Rotor diameter', p.rotor],
                      ['Tower height', p.height],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-400">{k}</span>
                        <span className="font-bold text-gray-800">{v}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold"
                    style={{ color: GREEN }}
                  >
                    View product →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <a href="#" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded text-white border-2 border-white hover:bg-white" style={{ color: 'white' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = GREEN; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'white'; }}>
              Learn more about our turbines →
            </a>
          </div>
        </div>
      </section>

      {/* ── FIELDS OF APPLICATION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-black mb-10" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            FIELDS OF APPLICATION
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Cacer', img: IMG.cacer, badge: 'CACER • Communities • SMEs' },
              { title: 'Ski resorts', img: IMG.ski, badge: 'Mountain • Resort • Lift energy' },
            ].map((app) => (
              <a key={app.title} href="#" className="group relative block overflow-hidden rounded-md" style={{ height: '320px' }}>
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), url(${app.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="relative z-10 h-full flex flex-col justify-between p-7 text-white">
                  <div className="flex items-center gap-2 text-xs font-medium opacity-90">
                    {app.badge.split(' • ').map((b) => (
                      <span key={b} className="border border-white/40 rounded-full px-2.5 py-0.5">{b}</span>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-black text-3xl mb-1">{app.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-bold">
                      Learn more <span>→</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES — full-width image with overlay labels ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '500px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(20,30,20,0.5), rgba(20,30,20,0.7)), url(${IMG.services})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20 text-white">
          <h2 className="font-black leading-none mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            OUR SERVICES,
          </h2>
          <h2 className="font-black leading-none mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#a8e088' }}>
            FROM IDEA TO MANAGEMENT
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 max-w-5xl">
            {[
              'Research & Development',
              'Project Management',
              'Production',
              'Installation & Commissioning',
              'Grid Connection',
              'Management & Monitoring',
              'Assistance & Maintenance',
            ].map((s, i) => (
              <div key={s} className="text-center">
                <div
                  className="w-12 h-12 mx-auto rounded-full mb-3 flex items-center justify-center font-bold text-sm border-2 border-white/30 backdrop-blur-sm"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-xs leading-tight font-medium">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a href="#" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded text-white" style={{ background: GREEN }}>
              Read more about our services <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── LEITWIND IN THE WORLD ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              LEITWIND IN THE WORLD
            </h2>
            <p className="text-gray-500 max-w-2xl">
              We manage an international supply chain and count over 400 wind turbines installed all over the world.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Stats box */}
            <div className="rounded-md p-7" style={{ background: GREEN_LIGHT }}>
              <div className="flex items-end gap-3 mb-3">
                <span className="font-black leading-none" style={{ fontSize: '4.5rem', color: GREEN }}>6</span>
                <div className="pb-2">
                  <p className="font-bold text-gray-900">Production</p>
                  <p className="font-bold text-gray-900">plants</p>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-5">
                <li>South Tyrol, Italy</li>
                <li>Telfs, Austria</li>
                <li>Vienna, Austria</li>
                <li>Gilly-sur-Isère, France</li>
                <li>Lacedonia, Italy</li>
                <li>Tamil Nadu, India</li>
              </ul>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: GREEN }}>
                Find out more <span>→</span>
              </a>
            </div>

            {/* World map */}
            <div className="lg:col-span-2 rounded-md p-6" style={{ background: '#fafafa' }}>
              <svg viewBox="0 0 800 380" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="380" fill="#fafafa" />
                {/* Simplified continents — dotted style */}
                {[
                  // Europe
                  { x: 380, y: 110, r: 1.5 }, { x: 385, y: 105, r: 1.5 }, { x: 392, y: 108, r: 1.5 }, { x: 400, y: 112, r: 1.5 }, { x: 410, y: 105, r: 1.5 }, { x: 415, y: 115, r: 1.5 }, { x: 405, y: 120, r: 1.5 }, { x: 395, y: 125, r: 1.5 }, { x: 385, y: 122, r: 1.5 }, { x: 378, y: 118, r: 1.5 },
                  // North Africa
                  { x: 380, y: 145, r: 1.5 }, { x: 395, y: 148, r: 1.5 }, { x: 410, y: 152, r: 1.5 }, { x: 425, y: 158, r: 1.5 }, { x: 415, y: 165, r: 1.5 }, { x: 400, y: 170, r: 1.5 }, { x: 388, y: 175, r: 1.5 }, { x: 405, y: 180, r: 1.5 }, { x: 420, y: 185, r: 1.5 }, { x: 415, y: 195, r: 1.5 }, { x: 405, y: 200, r: 1.5 }, { x: 395, y: 205, r: 1.5 }, { x: 408, y: 215, r: 1.5 }, { x: 418, y: 220, r: 1.5 }, { x: 412, y: 230, r: 1.5 }, { x: 422, y: 240, r: 1.5 },
                  // Asia
                  { x: 450, y: 100, r: 1.5 }, { x: 470, y: 95, r: 1.5 }, { x: 490, y: 90, r: 1.5 }, { x: 510, y: 95, r: 1.5 }, { x: 530, y: 100, r: 1.5 }, { x: 550, y: 105, r: 1.5 }, { x: 570, y: 110, r: 1.5 }, { x: 580, y: 120, r: 1.5 }, { x: 590, y: 130, r: 1.5 }, { x: 600, y: 140, r: 1.5 }, { x: 610, y: 150, r: 1.5 }, { x: 590, y: 155, r: 1.5 }, { x: 570, y: 145, r: 1.5 }, { x: 550, y: 130, r: 1.5 }, { x: 530, y: 125, r: 1.5 }, { x: 510, y: 130, r: 1.5 }, { x: 490, y: 125, r: 1.5 }, { x: 470, y: 120, r: 1.5 }, { x: 450, y: 115, r: 1.5 }, { x: 440, y: 120, r: 1.5 }, { x: 460, y: 140, r: 1.5 }, { x: 480, y: 150, r: 1.5 }, { x: 500, y: 160, r: 1.5 }, { x: 520, y: 170, r: 1.5 },
                  // Americas
                  { x: 180, y: 100, r: 1.5 }, { x: 200, y: 105, r: 1.5 }, { x: 215, y: 115, r: 1.5 }, { x: 220, y: 130, r: 1.5 }, { x: 215, y: 145, r: 1.5 }, { x: 205, y: 155, r: 1.5 }, { x: 195, y: 165, r: 1.5 }, { x: 200, y: 180, r: 1.5 }, { x: 215, y: 195, r: 1.5 }, { x: 225, y: 215, r: 1.5 }, { x: 230, y: 235, r: 1.5 }, { x: 225, y: 255, r: 1.5 }, { x: 220, y: 275, r: 1.5 }, { x: 215, y: 290, r: 1.5 }, { x: 210, y: 300, r: 1.5 }, { x: 220, y: 200, r: 1.5 }, { x: 235, y: 220, r: 1.5 },
                  // Australia
                  { x: 620, y: 250, r: 1.5 }, { x: 640, y: 255, r: 1.5 }, { x: 660, y: 260, r: 1.5 }, { x: 670, y: 270, r: 1.5 }, { x: 660, y: 280, r: 1.5 }, { x: 640, y: 285, r: 1.5 }, { x: 625, y: 275, r: 1.5 },
                ].map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#cccccc" />
                ))}

                {/* Office markers */}
                {[
                  { x: 395, y: 115, label: 'Italy/Austria' },
                  { x: 388, y: 105, label: 'Vienna' },
                  { x: 478, y: 158, label: 'India' },
                ].map((m, i) => (
                  <g key={i}>
                    <circle cx={m.x} cy={m.y} r="10" fill={GREEN} fillOpacity="0.2" />
                    <circle cx={m.x} cy={m.y} r="5" fill={GREEN} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── #MAGAZINE ── */}
      <section className="py-20" style={{ background: '#fafafa' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <h2 className="font-black mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                <span style={{ color: GREEN }}>#</span>MAGAZINE
              </h2>
              <p className="text-gray-500 text-sm">A dedicated space for our latest news</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'NEWS', active: true },
                { label: 'EVENTS', active: false },
                { label: 'PRODUCT AND TECHNOLOGY', active: false },
              ].map((tab) => (
                <button
                  key={tab.label}
                  className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded border transition-colors"
                  style={{
                    background: tab.active ? GREEN : 'transparent',
                    color: tab.active ? 'white' : '#666',
                    borderColor: tab.active ? GREEN : '#ddd',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                date: '8 Sep 2025',
                cat: 'EVENTS',
                title: 'LEITWIND at HUSUM Wind 2025: meet our team and discover the new grid certifications',
                img: IMG.news1,
              },
              {
                date: '17 Jul 2025',
                cat: 'APPLICATIONS',
                title: 'Wind power for the sustainable evolution of the ski resort',
                img: IMG.news2,
              },
              {
                date: '15 May 2025',
                cat: 'COMPANY',
                title: "HTI GROUP: REVENUE OF 1.4 BILLION EUROS, INVESTMENTS AND EMPLOYEES GROW",
                img: IMG.news3,
              },
            ].map((a) => (
              <article key={a.title} className="bg-white rounded-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div
                  className="h-52"
                  style={{
                    backgroundImage: `url(${a.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="p-6">
                  <p className="text-xs text-gray-400 mb-2">{a.date}</p>
                  <h3 className="font-bold text-base leading-snug mb-4 text-gray-900 group-hover:text-green-700 transition-colors min-h-[64px]">{a.title}</h3>
                  <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: '#f0f0f0' }}>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded" style={{ background: GREEN_LIGHT, color: GREEN_DARK }}>
                      {a.cat}
                    </span>
                    <a href="#" className="text-xs font-bold" style={{ color: GREEN }}>Read →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a href="#" className="inline-flex items-center gap-2 font-bold text-sm px-8 py-3.5 rounded border-2 hover:text-white transition-colors" style={{ borderColor: GREEN, color: GREEN }}
              onMouseEnter={(e) => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = GREEN; }}>
              Browse magazine articles →
            </a>
          </div>
        </div>
      </section>

      {/* ── #LINKEDIN WALL ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-black mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            <span style={{ color: GREEN }}>#</span>LINKEDIN<br />WALL
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {[
              { date: '2 days ago', title: 'LEITWIND - Italian Wind Turbines', text: 'New LTW101 installation milestone in Austria...', img: IMG.news1 },
              { date: '5 days ago', title: 'LEITWIND - Italian Wind Turbines', text: 'HUSUM Wind 2025 — meet us at booth B12!', img: IMG.news2 },
              { date: '1 week ago', title: 'LEITWIND - Italian Wind Turbines', text: 'Direct Drive technology explained: why we chose it.', img: IMG.news3 },
              { date: '2 weeks ago', title: 'LEITWIND - Italian Wind Turbines', text: 'Sustainable mountain tourism with wind power.', img: IMG.cacer },
              { date: '3 weeks ago', title: 'LEITWIND - Italian Wind Turbines', text: 'HTI Group: €1.4B revenue and growing investments.', img: IMG.ski },
            ].map((post, i) => (
              <a key={i} href="#" className="block rounded-md overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
                <div
                  className="h-32"
                  style={{
                    backgroundImage: `url(${post.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-black">in</span>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700 truncate">{post.title}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-snug line-clamp-3 mb-2">{post.text}</p>
                  <p className="text-[10px] text-gray-400">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY UPDATED — Green section ── */}
      <section className="py-16" style={{ background: GREEN }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="lg:flex-1">
              <h2 className="font-black text-white mb-2" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
                STAY UPDATED
              </h2>
              <p className="text-white text-opacity-90 text-sm">
                Stay informed about LEITWIND and the newest trends in the sector.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white rounded px-4 py-3 text-sm w-full sm:w-72 focus:outline-none border border-white text-gray-900 placeholder-gray-400"
              />
              <button className="font-bold text-sm px-7 py-3 rounded text-white whitespace-nowrap" style={{ background: GREEN_DARK }}>
                Join the newsletter →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER — Green ── */}
      <footer style={{ background: GREEN }}>
        <div className="border-t border-white border-opacity-20">
          <div className="max-w-[1400px] mx-auto px-6 py-14">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="white" />
                <path d="M20 8 L17 17 L8 17 L15.5 22.5 L12.5 31 L20 26 L27.5 31 L24.5 22.5 L32 17 L23 17 Z" fill={GREEN} />
              </svg>
              <span className="font-black text-2xl text-white tracking-tight">leitwind</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Headquarters block */}
              <div className="lg:col-span-2">
                <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Headquarters</h4>
                <div className="grid sm:grid-cols-2 gap-5 text-white text-xs leading-relaxed">
                  <div>
                    <p className="font-bold mb-1">SOUTH TYROL — ITALY</p>
                    <p className="opacity-85">LEITWIND S.p.A.</p>
                    <p className="opacity-85">Via Brennero 34</p>
                    <p className="opacity-85">39049 Vipiteno (BZ), Italy</p>
                    <p className="opacity-85">+39 0472 722111</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">CAMPANIA — ITALY</p>
                    <p className="opacity-85">LEITWIND S.p.A.</p>
                    <p className="opacity-85">Via Industriale</p>
                    <p className="opacity-85">83046 Lacedonia (AV), Italy</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">AUSTRIA</p>
                    <p className="opacity-85">LEITWIND AG</p>
                    <p className="opacity-85">Untermarkt 9</p>
                    <p className="opacity-85">6410 Telfs, Austria</p>
                  </div>
                  <div>
                    <p className="font-bold mb-1">INDIA</p>
                    <p className="opacity-85">LEITWIND Shriram</p>
                    <p className="opacity-85">Manufacturing Ltd.</p>
                    <p className="opacity-85">Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              {/* Nav columns */}
              <div>
                <ul className="space-y-2.5 text-white text-sm">
                  {['Company', 'Products', 'Applications', 'Services', 'Technology', 'References'].map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:underline opacity-90 hover:opacity-100">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <ul className="space-y-2.5 text-white text-sm">
                  {['Career', 'Magazine', 'Media & Press', 'Events', 'Park Viewer', 'Contact'].map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:underline opacity-90 hover:opacity-100">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom row */}
            <div className="border-t border-white border-opacity-20 pt-6 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white text-xs opacity-75">
                Leitner S.p.A. — VAT IT00560870215 — Cap. soc. € 70.000.000 i.v. — © leitwind 2025
              </p>
              <div className="flex items-center gap-4">
                {/* Social icons */}
                {[
                  { l: 'in', bg: 'rgba(255,255,255,0.15)' },
                  { l: 'f', bg: 'rgba(255,255,255,0.15)' },
                  { l: '▶', bg: 'rgba(255,255,255,0.15)' },
                  { l: '@', bg: 'rgba(255,255,255,0.15)' },
                ].map((s, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: s.bg }}>
                    {s.l}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-white opacity-75">
                <a href="#" className="hover:opacity-100">Privacy</a>
                <a href="#" className="hover:opacity-100">Cookies</a>
                <a href="#" className="hover:opacity-100">Legal</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
