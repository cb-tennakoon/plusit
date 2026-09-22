"use client";

import { useState, useRef, FormEvent } from "react";

const services = [
  {
    title: "Computer & Laptop Repair",
    description:
      "Hardware diagnostics, software fixes, virus removal, and performance upgrades — right at your home or office.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
  },
  {
    title: "Network & Wi-Fi Setup",
    description:
      "Home or office network installation, Wi-Fi optimization, mesh systems, and secure router configuration.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    title: "Data Recovery & Backup",
    description:
      "Recover lost files from hard drives, SSDs, and external media. Set up reliable automated backups.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
      </svg>
    ),
  },
  {
    title: "Smart Home & Device Setup",
    description:
      "Install and configure smart TVs, printers, CCTV, home assistants, and IoT devices seamlessly.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    ),
  },
  {
    title: "Business IT Support",
    description:
      "On-site support for small offices — workstations, printers, cloud setup, and employee training.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3 0h.008v.008H18V7.5zm0 3h.008v.008H18V10.5z" />
      </svg>
    ),
  },
  {
    title: "Virus & Malware Removal",
    description:
      "Complete system cleanup, security hardening, and protection setup to keep your devices safe.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Book a Visit",
    description: "Fill the form or call us. Tell us the issue and preferred time.",
  },
  {
    number: "02",
    title: "We Come to You",
    description: "Our certified technician arrives at your location with tools & parts.",
  },
  {
    number: "03",
    title: "Problem Solved",
    description: "We diagnose, fix, and explain everything. Most issues resolved same day.",
  },
];

const benefits = [
  {
    title: "No Travel Needed",
    description: "We come to your home or office. Save time and hassle.",
  },
  {
    title: "Certified Experts",
    description: "Experienced technicians with years of hands-on experience.",
  },
  {
    title: "Transparent Pricing",
    description: "Clear quotes before work begins. No hidden charges.",
  },
  {
    title: "Same-Day Service",
    description: "Most bookings fulfilled within hours in our service areas.",
  },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Mouse tracking for hero animation
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Lead submitted:", formData);
    setStatus("success");
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-slate-900">
                DoorStep<span className="text-red-600">IT</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-red-600 transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-red-600 transition-colors">How It Works</a>
              <a href="#why-us" className="hover:text-red-600 transition-colors">Why Us</a>
              <a href="#contact" className="hover:text-red-600 transition-colors">Contact</a>
            </nav>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center"
        >
          {/* Interactive grid – reveals near cursor */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(220, 38, 38, 0.18) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(220, 38, 38, 0.18) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
              maskImage: `radial-gradient(circle 380px at ${mouse.x}% ${mouse.y}%, black, transparent)`,
              WebkitMaskImage: `radial-gradient(circle 380px at ${mouse.x}% ${mouse.y}%, black, transparent)`,
            }}
          />

          {/* Soft red glow following cursor */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle 420px at ${mouse.x}% ${mouse.y}%, rgba(220, 38, 38, 0.28), transparent 70%)`,
            }}
          />

          {/* Smaller inner glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle 180px at ${mouse.x}% ${mouse.y}%, rgba(239, 68, 68, 0.18), transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-200 text-sm font-medium mb-6 border border-red-400/30 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available in your area • Same-day service
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Expert IT Support
                <span className="block text-red-400">Right at Your Door</span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                From broken laptops to home networks and data recovery — our certified technicians
                come to you. Fast, reliable, and hassle-free.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-red-600 text-white font-semibold text-base hover:bg-red-500 transition-all shadow-lg shadow-red-600/40 hover:shadow-red-500/50 hover:scale-[1.02]"
                >
                  Book Free Diagnosis
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                Our Door-to-Door Services
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Professional IT solutions delivered to your location.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-200 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 sm:py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative text-center">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-red-200" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600 text-white font-display font-bold text-2xl mb-5 shadow-lg shadow-red-500/30">
                    {step.number}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section id="why-us" className="py-20 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                  Why Choose DoorStep IT?
                </h2>
                <div className="mt-8 space-y-5">
                  {benefits.map((b) => (
                    <div key={b.title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{b.title}</h4>
                        <p className="text-sm text-slate-600 mt-0.5">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-800 p-8 sm:p-10 text-white shadow-2xl">
                <h3 className="font-display text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-red-100 mb-6">
                  Most issues are diagnosed free of charge. Book a visit and let us handle the rest.
                </p>
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center px-6 py-3 rounded-xl bg-white text-red-700 font-semibold hover:bg-red-50 transition-colors"
                >
                  Request a Visit
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 sm:py-24 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold">Book Your Doorstep Visit</h2>
                <p className="mt-4 text-slate-300 text-lg">
                  Tell us about your issue. We&apos;ll get back to you within 30 minutes.
                </p>
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Call / WhatsApp</p>
                      <p className="text-slate-400">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Email</p>
                      <p className="text-slate-400">support@doorstepit.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl">
                {status === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold">Request Received!</h3>
                    <p className="mt-2 text-slate-600">We&apos;ll contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Service Needed *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                      >
                        <option value="">Select a service</option>
                        <option value="computer-repair">Computer / Laptop Repair</option>
                        <option value="network">Network & Wi-Fi Setup</option>
                        <option value="data-recovery">Data Recovery & Backup</option>
                        <option value="smart-home">Smart Home & Device Setup</option>
                        <option value="business">Business IT Support</option>
                        <option value="virus">Virus & Malware Removal</option>
                        <option value="other">Other / Not sure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Describe the Issue</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                        placeholder="Briefly tell us what's wrong..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-70"
                    >
                      {status === "loading" ? "Submitting..." : "Request Free Visit"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-display font-bold text-xl text-white">
                  DoorStep<span className="text-red-400">IT</span>
                </span>
              </a>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Professional door-to-door IT support. We come to you — fast, reliable, and hassle-free.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#services" className="hover:text-red-400 transition-colors">Services</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-red-400 transition-colors">How It Works</a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-red-400 transition-colors">Why Us</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-red-400 transition-colors">Contact</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">📞</span>
                  <a href="tel:+919876543210" className="hover:text-red-400 transition-colors">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">✉️</span>
                  <a href="mailto:support@doorstepit.com" className="hover:text-red-400 transition-colors">support@doorstepit.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">🕒</span>
                  <span>Mon – Sat: 9 AM – 8 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <p>
              © {new Date().getFullYear()} DoorStep IT. All rights reserved.
            </p>
            <p>
              Developed by{" "}
              <a
                href="https://cb95.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                cb95.xyz
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}