import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./index.css";

// small helper for feature flags
const flags = (process.env.REACT_APP_FEATURE_FLAGS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allow = (name) => flags.length === 0 || flags.includes(name);

// generic next/prev nav used by demos
function DemoNav({ prev, next }) {
  return (
    <div className="mt-6 flex items-center justify-between text-sm">
      {prev ? (
        <NavLink to={prev.to} className="text-gray-600 hover:text-ocean-primary">
          ← {prev.label}
        </NavLink>
      ) : (
        <span />
      )}
      {next ? (
        <NavLink to={next.to} className="text-gray-600 hover:text-ocean-primary">
          {next.label} →
        </NavLink>
      ) : (
        <NavLink to="/" className="text-gray-600 hover:text-ocean-primary">
          Back to Home →
        </NavLink>
      )}
    </div>
  );
}

// Layout with Ocean Professional header/footer
function Shell({ children }) {
  const menu = [
    { path: "/", label: "Home", cond: true },
    { path: "/accordion", label: "Accordion", cond: allow("accordion") },
    { path: "/bentomenu", label: "Bento", cond: allow("bentomenu") },
    { path: "/breadcrumbs", label: "Breadcrumbs", cond: allow("breadcrumbs") },
    { path: "/carousel", label: "Carousel", cond: allow("carousel") },
    { path: "/chatbot", label: "Chatbot", cond: allow("chatbot") },
    { path: "/form-wizard", label: "Form Wizard", cond: allow("form-wizard") },
    { path: "/testimonial", label: "Testimonial", cond: allow("testimonial") },
    { path: "/toast", label: "Toast", cond: allow("toast") },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-500/10 to-gray-50 border-b border-gray-200">
        <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-ocean-primary text-white grid place-items-center shadow-soft">
              UI
            </div>
            <div className="font-semibold text-[var(--oc-text)]">
              Ocean UI Showcase
            </div>
            <span className="ml-2 oc-badge">Modern</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            {menu
              .filter((m) => m.cond)
              .map((m) =>
                m.path === "/" ? (
                  <NavLink
                    key={m.path}
                    to={m.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-ocean-primary font-semibold"
                        : "text-gray-600 hover:text-ocean-primary"
                    }
                  >
                    {m.label}
                  </NavLink>
                ) : (
                  <NavLink
                    key={m.path}
                    to={m.path}
                    className="text-gray-600 hover:text-ocean-primary"
                  >
                    {m.label}
                  </NavLink>
                )
              )}
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-gradient-to-r from-blue-500/10 to-gray-50 border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Ocean UI Showcase</span>
          <span className="text-gray-500">Primary: #2563EB • Accent: #F59E0B</span>
        </div>
      </footer>
    </div>
  );
}

// Home landing with links and brief preview cards
function Home() {
  const allCards = [
    { to: "/accordion", title: "Accordion", desc: "Accessible disclosure panels", icon: "▾", name: "accordion" },
    { to: "/bentomenu", title: "Bento Menu", desc: "Modern grid navigation", icon: "◼︎", name: "bentomenu" },
    { to: "/breadcrumbs", title: "Breadcrumbs", desc: "Hierarchical navigation", icon: "⋯", name: "breadcrumbs" },
    { to: "/carousel", title: "Carousel", desc: "Touch friendly slider", icon: "⟲", name: "carousel" },
    { to: "/chatbot", title: "Chatbot", desc: "Assistant-like chat UI", icon: "💬", name: "chatbot" },
    { to: "/form-wizard", title: "Form Wizard", desc: "Multi-step form flow", icon: "🧭", name: "form-wizard" },
    { to: "/testimonial", title: "Testimonial", desc: "Customer quotes", icon: "⭐", name: "testimonial" },
    { to: "/toast", title: "Toast", desc: "Ephemeral notifications", icon: "🔔", name: "toast" },
  ];
  const cards = allCards.filter((c) => allow(c.name));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--oc-text)]">
          Ocean Professional Components
        </h1>
        <p className="mt-3 text-gray-600">
          A modern, responsive showcase of UI patterns with Tailwind CSS.
        </p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c) => (
          <a
            key={c.to}
            href={c.to}
            className="oc-card p-5 hover:shadow-md transition-shadow duration-200 ease-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-primary"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-blue-50 text-ocean-primary border border-blue-100">
                <span aria-hidden>{c.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--oc-text)]">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}

// Individual demo screens
function AccordionDemo() {
  const [open, setOpen] = React.useState(null);
  const items = [
    { q: "What is Ocean Professional?", a: "A modern theme with blue primary and amber accents." },
    { q: "Is it responsive?", a: "Yes, components adapt across breakpoints and support keyboard interactions." },
    { q: "Is it accessible?", a: "Focus, ARIA, and keyboard behavior are included in patterns." },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold">Accordion</h2>
          <a className="text-xs text-gray-500 hover:text-ocean-primary" href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/region_role" target="_blank" rel="noreferrer">ARIA: region</a>
        </div>
        <p className="text-sm text-gray-600 mb-4">Click headers or press Enter/Space to toggle.</p>
        <div className="divide-y divide-gray-200">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx}>
                <button
                  className="w-full text-left py-4 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-primary"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${idx}`}
                  id={`accordion-${idx}`}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen(isOpen ? null : idx);
                    }
                  }}
                >
                  <span className="font-medium">{it.q}</span>
                  <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
                </button>
                <div
                  id={`panel-${idx}`}
                  role="region"
                  aria-labelledby={`accordion-${idx}`}
                  className={`grid transition-all duration-300 ease-smooth ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-gray-600">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage (props and state)
        // PUBLIC_INTERFACE
        // Example:
        // const [open, setOpen] = useState(null);
        // <button aria-expanded={open===i} onClick={()=>setOpen(open===i?null:i)}>Header</button>
        // <div role="region" aria-labelledby={`accordion-${i}`}>Panel</div>
        */}

        <DemoNav
          prev={{ to: "/", label: "Back home" }}
          next={allow("bentomenu") ? { to: "/bentomenu", label: "Bento" } : allow("breadcrumbs") ? { to: "/breadcrumbs", label: "Breadcrumbs" } : null}
        />
      </div>
    </div>
  );
}

function BentoMenuDemo() {
  const items = [
    { title: "Dashboard", desc: "Overview & metrics" },
    { title: "Projects", desc: "Manage initiatives" },
    { title: "Teams", desc: "People & roles" },
    { title: "Billing", desc: "Plans & invoices" },
    { title: "Settings", desc: "Preferences" },
    { title: "Help", desc: "Docs & support" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Bento Menu</h2>
        <p className="text-sm text-gray-600 mb-4">A grid of actions for quick navigation.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <button
              key={i}
              className="group rounded-xl border border-gray-200 p-4 text-left hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-primary"
            >
              <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 grid place-items-center text-ocean-primary mb-3 group-hover:scale-105 transition-transform">
                ◼︎
              </div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">{it.desc}</div>
            </button>
          ))}
        </div>

        {/* Usage (props and structure)
        const items=[{title:'Dashboard',desc:'Overview'}, ...];
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(i=>(
            <button className="rounded-xl border p-4 text-left">...</button>
          ))}
        </div>
        */}

        <DemoNav
          prev={allow("accordion") ? { to: "/accordion", label: "Accordion" } : { to: "/", label: "Home" }}
          next={allow("breadcrumbs") ? { to: "/breadcrumbs", label: "Breadcrumbs" } : allow("carousel") ? { to: "/carousel", label: "Carousel" } : null}
        />
      </div>
    </div>
  );
}

function BreadcrumbsDemo() {
  const crumbs = ["Home", "Library", "Components", "Breadcrumbs"];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Breadcrumbs</h2>
        <p className="text-sm text-gray-600 mb-4">Shows the user’s location within a hierarchy.</p>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <a
                  href="#"
                  className={`hover:text-ocean-primary ${
                    i === crumbs.length - 1
                      ? "text-gray-700 font-medium pointer-events-none"
                      : "text-gray-600"
                  }`}
                  aria-current={i === crumbs.length - 1 ? "page" : undefined}
                >
                  {c}
                </a>
                {i < crumbs.length - 1 && <span className="text-gray-400">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Usage (props)
        const crumbs=['Home','Library','Components','Breadcrumbs'];
        <nav aria-label="Breadcrumb">
          <ol className="flex gap-2">
            {crumbs.map((c,i)=>(
              <li key={i}>
                <a aria-current={i===crumbs.length-1?'page':undefined}>{c}</a>
              </li>
            ))}
          </ol>
        </nav>
        */}

        <DemoNav
          prev={allow("bentomenu") ? { to: "/bentomenu", label: "Bento" } : allow("accordion") ? { to: "/accordion", label: "Accordion" } : { to: "/", label: "Home" }}
          next={allow("carousel") ? { to: "/carousel", label: "Carousel" } : allow("chatbot") ? { to: "/chatbot", label: "Chatbot" } : null}
        />
      </div>
    </div>
  );
}

function CarouselDemo() {
  const [idx, setIdx] = React.useState(0);
  const slides = [
    { title: "Elegant", text: "Clean, modern components.", color: "bg-blue-50" },
    { title: "Responsive", text: "Adapts to any device.", color: "bg-amber-50" },
    { title: "Accessible", text: "Keyboard and ARIA friendly.", color: "bg-gray-50" },
  ];
  const next = () => setIdx((p) => (p + 1) % slides.length);
  const prev = () => setIdx((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Carousel</h2>
        <p className="text-sm text-gray-600 mb-4">Use the arrows or dots to navigate between slides.</p>
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          <div className="relative h-48">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 grid place-items-center transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"} ${s.color}`}
              >
                <div className="text-center">
                  <div className="text-xl font-semibold">{s.title}</div>
                  <div className="text-gray-600">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 flex items-center p-2">
            <button
              aria-label="Previous slide"
              className="oc-btn bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={prev}
            >
              ‹
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center p-2">
            <button
              aria-label="Next slide"
              className="oc-btn bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={next}
            >
              ›
            </button>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-ocean-primary" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Usage (state and handlers)
        const [idx,setIdx]=useState(0);
        const next=()=>setIdx((p)=>(p+1)%slides.length);
        const prev=()=>setIdx((p)=>(p-1+slides.length)%slides.length);
        */}

        <DemoNav
          prev={allow("breadcrumbs") ? { to: "/breadcrumbs", label: "Breadcrumbs" } : allow("bentomenu") ? { to: "/bentomenu", label: "Bento" } : { to: "/", label: "Home" }}
          next={allow("chatbot") ? { to: "/chatbot", label: "Chatbot" } : allow("form-wizard") ? { to: "/form-wizard", label: "Form Wizard" } : null}
        />
      </div>
    </div>
  );
}

function ChatbotDemo() {
  const [messages, setMessages] = React.useState([
    { role: "bot", content: "Hello! Ask me anything about this UI kit." },
  ]);
  const [input, setInput] = React.useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [
      ...m,
      userMsg,
      {
        role: "bot",
        content:
          "Thanks! This is a demo response in the Ocean Professional theme.",
      },
    ]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Chatbot</h2>
        <p className="text-sm text-gray-600 mb-4">A minimal chat interface with user/bot roles.</p>
        <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[80%] ${m.role === "user" ? "ml-auto" : ""}`}>
              <div className={`${m.role === "user" ? "bg-ocean-primary text-white" : "bg-white"} rounded-lg shadow-soft px-3 py-2`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            aria-label="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary"
            placeholder="Type a message..."
          />
          <button className="oc-btn oc-btn-primary" onClick={send}>
            Send
          </button>
        </div>

        {/* Usage (events)
        const [messages,setMessages]=useState([{role:'bot',content:'Hello'}]);
        setMessages(m=>[...m,{role:'user',content:input}]);
        */}

        <DemoNav
          prev={allow("carousel") ? { to: "/carousel", label: "Carousel" } : allow("breadcrumbs") ? { to: "/breadcrumbs", label: "Breadcrumbs" } : { to: "/", label: "Home" }}
          next={allow("form-wizard") ? { to: "/form-wizard", label: "Form Wizard" } : allow("testimonial") ? { to: "/testimonial", label: "Testimonial" } : null}
        />
      </div>
    </div>
  );
}

function FormWizardDemo() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ name: "", email: "", plan: "basic" });
  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Form Wizard</h2>
        <p className="text-sm text-gray-600 mb-4">Multi-step form flow with progress indicators.</p>

        <ol className="flex items-center gap-3 mb-6 text-sm">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className={`flex items-center gap-2 ${i <= step ? "text-ocean-primary" : "text-gray-400"}`}
            >
              <span
                className={`h-6 w-6 grid place-items-center rounded-full border ${
                  i <= step ? "border-ocean-primary" : "border-gray-300"
                }`}
              >
                {i}
              </span>
              <span>{i === 1 ? "Account" : i === 2 ? "Plan" : "Confirm"}</span>
              {i < 3 && <span className="text-gray-300">—</span>}
            </li>
          ))}
        </ol>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ocean-primary"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            {["basic", "pro", "enterprise"].map((p) => (
              <label
                key={p}
                className="flex items-center gap-3 border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-ocean-primary"
              >
                <input
                  name="plan"
                  type="radio"
                  checked={data.plan === p}
                  onChange={() => setData({ ...data, plan: p })}
                />
                <span className="capitalize">{p}</span>
              </label>
            ))}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-2">
            <div>
              <span className="text-gray-500">Name:</span>{" "}
              <strong>{data.name || "—"}</strong>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>{" "}
              <strong>{data.email || "—"}</strong>
            </div>
            <div>
              <span className="text-gray-500">Plan:</span>{" "}
              <strong className="capitalize">{data.plan}</strong>
            </div>
            <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mt-3">
              Looks good! Submit when ready.
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            className="oc-btn bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={prev}
            disabled={step === 1}
            aria-disabled={step === 1}
          >
            Back
          </button>
          {step < 3 ? (
            <button className="oc-btn oc-btn-primary" onClick={next}>
              Next
            </button>
          ) : (
            <button
              className="oc-btn bg-ocean-secondary text-white hover:brightness-95"
              onClick={() => alert("Submitted!")}
            >
              Submit
            </button>
          )}
        </div>

        {/* Usage (state machine)
        const [step,setStep]=useState(1);
        const next=()=>setStep(s=>Math.min(3,s+1));
        const prev=()=>setStep(s=>Math.max(1,s-1));
        */}

        <DemoNav
          prev={allow("chatbot") ? { to: "/chatbot", label: "Chatbot" } : allow("carousel") ? { to: "/carousel", label: "Carousel" } : { to: "/", label: "Home" }}
          next={allow("testimonial") ? { to: "/testimonial", label: "Testimonial" } : allow("toast") ? { to: "/toast", label: "Toast" } : null}
        />
      </div>
    </div>
  );
}

function TestimonialDemo() {
  const items = [
    { name: "Ava M.", role: "PM", quote: "These components helped us ship faster with confidence." },
    { name: "Noah J.", role: "Engineer", quote: "Clean, accessible, and easy to adapt to our needs." },
    { name: "Liam K.", role: "Designer", quote: "Modern look with a professional polish out of the box." },
  ];
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="oc-card p-6">
        <h2 className="text-xl font-semibold mb-2">Testimonial</h2>
        <p className="text-sm text-gray-600 mb-6">Compact quote cards with author and role.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-4 bg-white shadow-soft">
              <div className="text-sm text-gray-600">“{t.quote}”</div>
              <div className="mt-3 font-medium">{t.name}</div>
              <div className="text-xs text-gray-500">{t.role}</div>
            </div>
          ))}
        </div>

        {/* Usage (data driven)
        const items=[{name:'Ava',role:'PM',quote:'...'}];
        <div className="grid md:grid-cols-3 gap-4">
          {items.map(t=>(
            <Card key={t.name} quote={t.quote} name={t.name} role={t.role}/>
          ))}
        </div>
        */}

        <DemoNav
          prev={allow("form-wizard") ? { to: "/form-wizard", label: "Form Wizard" } : allow("chatbot") ? { to: "/chatbot", label: "Chatbot" } : { to: "/", label: "Home" }}
          next={allow("toast") ? { to: "/toast", label: "Toast" } : null}
        />
      </div>
    </div>
  );
}

function ToastDemo() {
  const [toasts, setToasts] = React.useState([]);
  const push = (type) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [
      ...t,
      {
        id,
        type,
        text: type === "error" ? "Something went wrong" : "Saved successfully",
      },
    ]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  };
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="oc-card p-6 relative">
        <h2 className="text-xl font-semibold mb-2">Toast</h2>
        <p className="text-sm text-gray-600 mb-4">Transient notifications for quick feedback.</p>
        <div className="flex gap-3">
          <button className="oc-btn oc-btn-primary" onClick={() => push("success")}>
            Show Success
          </button>
          <button
            className="oc-btn bg-[var(--oc-error)] text-white hover:brightness-95"
            onClick={() => push("error")}
          >
            Show Error
          </button>
        </div>
        <div className="fixed right-4 bottom-4 space-y-2 z-50">
          {toasts.map((t) => (
            <div
              key={t.id}
              role="status"
              className={`rounded-lg border px-3 py-2 shadow-soft ${
                t.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-green-50 border-green-200 text-green-800"
              }`}
            >
              {t.text}
            </div>
          ))}
        </div>

        {/* Usage (store + auto dismiss)
        const [toasts,setToasts]=useState([]);
        const push=(type)=>{ const id=uid(); setToasts(t=>[...t,{id,type,text:'Saved'}]); setTimeout(()=>remove(id),2500); };
        */}

        <DemoNav
          prev={allow("testimonial") ? { to: "/testimonial", label: "Testimonial" } : allow("form-wizard") ? { to: "/form-wizard", label: "Form Wizard" } : { to: "/", label: "Home" }}
          next={null}
        />
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function AppRouter() {
  /** Router entrypoint for the UI showcase application. Respects REACT_APP_FEATURE_FLAGS (comma-separated names). */
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          {allow("accordion") && <Route path="/accordion" element={<AccordionDemo />} />}
          {allow("bentomenu") && <Route path="/bentomenu" element={<BentoMenuDemo />} />}
          {allow("breadcrumbs") && <Route path="/breadcrumbs" element={<BreadcrumbsDemo />} />}
          {allow("carousel") && <Route path="/carousel" element={<CarouselDemo />} />}
          {allow("chatbot") && <Route path="/chatbot" element={<ChatbotDemo />} />}
          {allow("form-wizard") && <Route path="/form-wizard" element={<FormWizardDemo />} />}
          {allow("testimonial") && <Route path="/testimonial" element={<TestimonialDemo />} />}
          {allow("toast") && <Route path="/toast" element={<ToastDemo />} />}
          <Route path="*" element={<Home />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default AppRouter;
