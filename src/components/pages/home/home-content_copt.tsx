'use client';

export function HomeContent() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Top Bar */}
      <div className="bg-[#1a1a1a] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>+39 0472 722111</span>
            <span>info@leitwind.com</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-green-400 transition-colors">Support & Maintenance</a>
            <span>|</span>
            <div className="flex gap-2">
              <a href="#" className="hover:text-green-400">IT</a>
              <span>/</span>
              <a href="#" className="hover:text-green-400">DE</a>
              <span>/</span>
              <span className="text-green-400 font-semibold">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-[#3d8c40] rounded-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#1a1a1a] tracking-tight">LEITWIND</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            {['Company', 'Products', 'Applications', 'Services', 'Technology', 'References', 'Career', 'Media & Press', 'Magazine'].map((item) => (
              <a key={item} href="#" className="hover:text-[#3d8c40] transition-colors whitespace-nowrap">{item}</a>
            ))}
          </div>
          <a
            href="#"
            className="hidden lg:inline-flex items-center gap-2 bg-[#3d8c40] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#2e6b30] transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
            Park Viewer
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, #0d2d14 0%, #1a5220 40%, #2d7a35 70%, #3d8c40 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-300 text-sm font-semibold tracking-widest uppercase mb-4">Italian Wind Energy</p>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              DRIVEN BY<br />
              THE WIND<br />
              <span className="text-green-300">OF CHANGE</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
              LEITWIND is the only Italian manufacturer of megawatt-class wind turbines, specializing in Direct Drive technology for a greener tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="bg-[#3d8c40] text-white font-bold px-8 py-3 rounded hover:bg-[#2e6b30] transition-colors">
                Our Products
              </a>
              <a href="#company" className="border-2 border-white text-white font-bold px-8 py-3 rounded hover:bg-white hover:text-[#1a5220] transition-colors">
                Company
              </a>
              <a href="#technology" className="border-2 border-green-400 text-green-300 font-bold px-8 py-3 rounded hover:bg-green-400 hover:text-white transition-colors">
                Technology
              </a>
            </div>
          </div>

          {/* Wind Turbine Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <svg viewBox="0 0 300 500" className="w-64 h-auto opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Tower */}
              <rect x="138" y="200" width="24" height="280" rx="4" fill="rgba(255,255,255,0.3)" />
              {/* Hub */}
              <circle cx="150" cy="200" r="12" fill="rgba(255,255,255,0.6)" />
              {/* Blades */}
              <path d="M150 200 L120 100 L145 115 Z" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M150 200 L230 240 L210 220 Z" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <path d="M150 200 L70 260 L90 235 Z" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Newsletter Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm py-4 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <p className="text-white text-sm font-medium whitespace-nowrap">
              Stay informed about LEITWIND and the newest trends in the sector
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 sm:w-64 px-4 py-2 rounded text-sm bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-green-400"
              />
              <button className="bg-[#3d8c40] text-white font-semibold px-5 py-2 rounded text-sm hover:bg-[#2e6b30] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Message */}
      <section id="company" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
              Italy's Premier<br />Wind Turbine Manufacturer
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              LEITWIND is the only Italian manufacturer of megawatt-class wind turbines. We specialize in Direct Drive turbines with synchronous generators and permanent magnets — delivering maximum reliability with minimum maintenance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our mission is to accelerate the green energy transition for small-scale wind farms, SME self-consumption projects, and community energy initiatives. As part of the HTI Group, we combine Italian engineering excellence with global reach.
            </p>
            <div className="flex flex-wrap gap-8 text-center">
              <div>
                <p className="text-4xl font-black text-[#3d8c40]">400+</p>
                <p className="text-sm text-gray-500 mt-1">Global Installations</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#3d8c40]">4</p>
                <p className="text-sm text-gray-500 mt-1">Turbine Models</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#3d8c40]">€1.4B</p>
                <p className="text-sm text-gray-500 mt-1">HTI Group Revenue 2024</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { bg: 'bg-[#3d8c40]', label: 'Renewable Energy', icon: '🌱' },
              { bg: 'bg-gray-800', label: 'Direct Drive', icon: '⚙️' },
              { bg: 'bg-gray-800', label: 'Italian Design', icon: '🇮🇹' },
              { bg: 'bg-[#2e6b30]', label: 'Global Presence', icon: '🌍' },
            ].map((card) => (
              <div key={card.label} className={`${card.bg} rounded-xl p-8 flex flex-col items-center justify-center text-white aspect-square`}>
                <span className="text-4xl mb-3">{card.icon}</span>
                <span className="text-sm font-semibold text-center">{card.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-4xl font-black text-gray-900">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ),
                title: 'Italian Design',
                desc: 'Engineered and manufactured in Italy with the highest standards of quality, innovation, and craftsmanship.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
                title: 'A Partner You Can Trust',
                desc: 'Part of the HTI Group — a global leader in mountain transport and clean energy with over €1.4B annual revenue.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                ),
                title: 'Global Presence',
                desc: 'With 400+ installations worldwide and offices across Europe and Asia, we deliver wind energy solutions globally.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                ),
                title: 'Customisation',
                desc: 'Every project is unique. We tailor turbine configurations to match site-specific wind conditions, grid requirements, and project goals.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                ),
                title: 'Complete Project Management',
                desc: 'From site assessment and permitting to installation, grid connection, and ongoing maintenance — full turnkey solutions.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z" />
                  </svg>
                ),
                title: 'International Certifications',
                desc: 'All LEITWIND turbines meet strict international standards and hold certifications across multiple markets including EU, India, and Poland.',
              },
            ].map((usp) => (
              <div key={usp.title} className="group p-8 rounded-xl border border-gray-100 hover:border-[#3d8c40] hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-green-50 text-[#3d8c40] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#3d8c40] group-hover:text-white transition-colors">
                  {usp.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{usp.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Range</p>
            <h2 className="text-4xl font-black text-white">Wind Turbine Models</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Four proven models covering the full spectrum of wind energy needs, from community self-consumption to utility-scale generation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                model: 'LTW42',
                rotor: '42m',
                power: '250–500 kW',
                height: '28 / 39m',
                tag: 'Ideal for self-consumption projects',
                color: 'border-green-400',
                badge: 'bg-green-400',
              },
              {
                model: 'LTW80',
                rotor: '80m',
                power: '500–1,800 kW',
                height: '60 / 65 / 80m',
                tag: 'Designed to withstand the strongest winds',
                color: 'border-blue-400',
                badge: 'bg-blue-400',
              },
              {
                model: 'LTW90',
                rotor: '90m',
                power: '500–2,000 kW',
                height: '60 / 65 / 80 / 97.5m',
                tag: 'Maximum energy yield in complex terrain',
                color: 'border-purple-400',
                badge: 'bg-purple-400',
              },
              {
                model: 'LTW101',
                rotor: '101m',
                power: '2,000–3,000 kW',
                height: '80 / 93.5m',
                tag: 'Flagship model for large-scale generation',
                color: 'border-orange-400',
                badge: 'bg-orange-400',
              },
            ].map((product) => (
              <div
                key={product.model}
                className={`bg-gray-800 rounded-xl p-6 border-t-4 ${product.color} hover:bg-gray-700 transition-colors flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${product.badge} w-2 h-2 rounded-full`} />
                  <span className="text-2xl font-black text-white">{product.model}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">{product.tag}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rotor Diameter</span>
                    <span className="text-white font-semibold">{product.rotor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Power Range</span>
                    <span className="text-white font-semibold">{product.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tower Height</span>
                    <span className="text-white font-semibold">{product.height}</span>
                  </div>
                </div>
                <a href="#" className="mt-6 block text-center border border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400 text-sm font-semibold py-2 rounded transition-colors">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">Use Cases</p>
            <h2 className="text-4xl font-black text-gray-900">Applications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'CACER — Community Energy',
                subtitle: 'Renewable Energy Communities',
                desc: 'LEITWIND turbines power CACER (Renewable Energy Community) projects across Italy and Europe, enabling communities, municipalities, and SMEs to produce and share clean energy locally. Our turbines are ideally sized for distributed generation — reducing energy costs and carbon footprints at scale.',
                features: ['Community self-consumption', 'SME energy sharing', 'Municipal green projects', 'Energy independence'],
                color: 'bg-[#3d8c40]',
              },
              {
                title: 'Ski Resorts',
                subtitle: 'Mountain Energy Solutions',
                desc: "Ski resorts face unique energy challenges — high consumption, remote locations, and extreme weather. LEITWIND's robust Direct Drive turbines are engineered for alpine environments, providing reliable on-site energy production that offsets snowmaking, lifts, and facility operations.",
                features: ['Alpine-rated performance', 'Snowmaking energy offset', 'Extreme weather design', 'Low maintenance'],
                color: 'bg-gray-800',
              },
            ].map((app) => (
              <div key={app.title} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`${app.color} p-8 text-white`}>
                  <p className="text-sm font-semibold opacity-75 mb-1">{app.subtitle}</p>
                  <h3 className="text-2xl font-black">{app.title}</h3>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">{app.desc}</p>
                  <ul className="space-y-2">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="w-5 h-5 bg-green-100 text-[#3d8c40] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="mt-6 inline-flex items-center text-[#3d8c40] font-semibold text-sm hover:underline">
                    Explore this application →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="technology" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">End-to-End</p>
            <h2 className="text-4xl font-black text-gray-900">Complete Service Journey</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              From initial concept through decades of operation, LEITWIND manages every phase of your wind energy project.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'R&D', desc: 'Continuous innovation in Direct Drive technology, aerodynamics, and control systems.' },
              { step: '02', title: 'Project Management', desc: 'Site assessment, feasibility studies, permitting, and full project coordination.' },
              { step: '03', title: 'Production', desc: 'Precision manufacturing at our South Tyrol and Austrian facilities with rigorous QA.' },
              { step: '04', title: 'Installation & Commissioning', desc: 'Expert installation teams ensure safe, efficient turbine deployment on any terrain.' },
              { step: '05', title: 'Grid Connection', desc: 'Seamless integration with local and national grids, meeting all regulatory requirements.' },
              { step: '06', title: 'Management & Monitoring', desc: 'Real-time SCADA monitoring and remote control via our Park Viewer platform.' },
              { step: '07', title: 'Assistance & Maintenance', desc: '24/7 support, preventive maintenance programs, and rapid response service teams.' },
            ].map((service) => (
              <div key={service.step} className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#3d8c40] hover:shadow-md transition-all group">
                <div className="text-3xl font-black text-gray-100 group-hover:text-green-100 mb-3 transition-colors">{service.step}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
            <div className="bg-[#3d8c40] rounded-xl p-6 flex flex-col justify-center items-center text-white text-center">
              <div className="text-4xl mb-3">🔁</div>
              <p className="font-bold text-lg">Full Lifecycle Support</p>
              <p className="text-green-100 text-sm mt-2">One partner, every phase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-[#0d2d14] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-3">Worldwide</p>
            <h2 className="text-4xl font-black">Global Presence</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              { location: 'South Tyrol, Italy', role: 'Headquarters & Manufacturing', flag: '🇮🇹' },
              { location: 'Telfs, Austria', role: 'R&D and Production', flag: '🇦🇹' },
              { location: 'Vienna, Austria', role: 'R&D Offices', flag: '🇦🇹' },
              { location: 'Gilly-sur-Isère, France', role: 'POMA Production', flag: '🇫🇷' },
              { location: 'Lacedonia, Italy', role: 'Service Center', flag: '🇮🇹' },
              { location: 'Tamil Nadu, India', role: 'Component Manufacturing', flag: '🇮🇳' },
            ].map((office) => (
              <div key={office.location} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10 hover:border-green-400/40 transition-colors">
                <span className="text-3xl">{office.flag}</span>
                <div>
                  <p className="font-bold text-white">{office.location}</p>
                  <p className="text-green-300 text-sm mt-1">{office.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8 text-center border-t border-white/10 pt-12">
            <div>
              <p className="text-5xl font-black text-green-400">400+</p>
              <p className="text-gray-400 mt-2">Installations Worldwide</p>
            </div>
            <div>
              <p className="text-5xl font-black text-green-400">6</p>
              <p className="text-gray-400 mt-2">Global Locations</p>
            </div>
            <div>
              <p className="text-5xl font-black text-green-400">3 GW</p>
              <p className="text-gray-400 mt-2">Clean Energy Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine / News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">Latest News</p>
              <h2 className="text-4xl font-black text-gray-900">Magazine</h2>
            </div>
            <a href="#" className="text-[#3d8c40] font-semibold text-sm hover:underline hidden sm:block">View all articles →</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                category: 'Events',
                date: 'Sep 2025',
                title: 'LEITWIND at HUSUM Wind 2025',
                desc: 'We presented our latest grid certifications and expanded product line at Europe\'s leading wind energy trade fair.',
              },
              {
                category: 'Applications',
                date: 'Jul 2025',
                title: 'Wind Power for Ski Resorts',
                desc: 'How alpine wind energy is transforming ski resort sustainability — a case study from the Dolomites.',
              },
              {
                category: 'Company',
                date: 'May 2025',
                title: 'HTI Group Reports €1.4B Revenue',
                desc: 'Strong financial performance underpins our continued investment in wind energy innovation and global expansion.',
              },
              {
                category: 'Certification',
                date: 'Mar 2025',
                title: 'LTW90 Certified for Polish Market',
                desc: 'Our flagship LTW90 turbine receives Polish grid certification, opening new opportunities in Central Europe.',
              },
            ].map((article) => (
              <article key={article.title} className="group rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-300 fill-current">
                    <path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" />
                  </svg>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#3d8c40] bg-green-50 px-2 py-0.5 rounded">{article.category}</span>
                    <span className="text-xs text-gray-400">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#3d8c40] transition-colors leading-snug">{article.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{article.desc}</p>
                  <a href="#" className="mt-4 inline-block text-[#3d8c40] text-sm font-semibold hover:underline">Read more →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#3d8c40] text-sm font-semibold tracking-widest uppercase mb-3">Get in Touch</p>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Request Information</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Interested in a LEITWIND solution? Fill out the form and our team will contact you with tailored information for your project.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3d8c40] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">+39 0472 722111</p>
                  <p className="text-gray-500">Mon–Fri, 8:00–17:00 CET</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3d8c40] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">info@leitwind.com</p>
                  <p className="text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                { label: 'Company', type: 'text', placeholder: 'Your Company' },
                { label: 'Email', type: 'email', placeholder: 'john@company.com' },
                { label: 'Phone', type: 'tel', placeholder: '+1 234 567 890' },
                { label: 'City', type: 'text', placeholder: 'Your City' },
                { label: 'Country', type: 'text', placeholder: 'Your Country' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3d8c40] focus:ring-1 focus:ring-[#3d8c40] transition-colors"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product of Interest</label>
              <div className="flex flex-wrap gap-2">
                {['LTW 42', 'LTW 80', 'LTW 90', 'LTW 101'].map((p) => (
                  <label key={p} className="flex items-center gap-2 cursor-pointer text-sm border border-gray-200 rounded-lg px-3 py-2 hover:border-[#3d8c40] transition-colors">
                    <input type="checkbox" className="accent-[#3d8c40]" />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#3d8c40] focus:ring-1 focus:ring-[#3d8c40] transition-colors resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" className="accent-[#3d8c40] mt-0.5 flex-shrink-0" />
                I accept the <a href="#" className="text-[#3d8c40] underline">Privacy Policy</a>
              </label>
              <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-600">
                <input type="checkbox" className="accent-[#3d8c40] mt-0.5 flex-shrink-0" />
                Subscribe to LEITWIND newsletter
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3d8c40] text-white font-bold py-3 rounded-lg hover:bg-[#2e6b30] transition-colors"
            >
              Send Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#3d8c40] rounded-sm flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                    <path d="M12 2L8 8H2l5 4-2 7 7-4 7 4-2-7 5-4h-6L12 2z" />
                  </svg>
                </div>
                <span className="text-xl font-black text-white tracking-tight">LEITWIND</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                The only Italian manufacturer of megawatt-class wind turbines. Part of the HTI Group — delivering clean energy solutions worldwide.
              </p>
              <div className="flex gap-4">
                {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#3d8c40] transition-colors text-xs font-bold text-white">
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm">
                {['About Us', 'Technology', 'Certifications', 'Career', 'HTI Group'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#3d8c40] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Products Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Products</h4>
              <ul className="space-y-2 text-sm">
                {['LTW 42', 'LTW 80', 'LTW 90', 'LTW 101', 'Services', 'Park Viewer'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#3d8c40] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Offices */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Headquarters</h4>
              <address className="not-italic text-sm space-y-1 leading-relaxed">
                <p className="text-white font-semibold">Leitner S.p.A</p>
                <p>Via Brennero 34</p>
                <p>39049 Vipiteno (BZ)</p>
                <p>South Tyrol, Italy</p>
                <p className="mt-3">+39 0472 722111</p>
                <p>info@leitwind.com</p>
              </address>
            </div>
          </div>

          {/* Group Logos */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-4">Part of the HTI Group</p>
            <div className="flex flex-wrap gap-6 items-center">
              {['Leitner', 'POMA', 'Bartholet', 'Agudio', 'LeitWind'].map((brand) => (
                <span key={brand} className="text-sm font-bold text-gray-600 hover:text-gray-400 transition-colors cursor-pointer">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2025 Leitner S.p.A — VAT IT00560870215. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#3d8c40] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#3d8c40] transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-[#3d8c40] transition-colors">Legal Notice</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
