"use client";

import { useEffect, useState } from "react";

// Replace with your own Formspree form ID
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

// Image is loaded from the Swedish site – no upload needed
const CUBIQO_IMAGE = "https://event-demo-pied.vercel.app/bilder/cubiqo.jpg";

const steps = ["Discover", "Interact", "Ask", "Book", "Follow up"];

const visitorCan = [
  "View the event program and information",
  "Read about the company",
  "Explore offers",
  "Book a meeting or consultation",
  "Ask the AI assistant questions",
  "Upload photos and video",
  "Leave their contact details",
  "Visit the website and social media",
  "Take the next step directly from their phone",
];

const tailored = [
  "Brand",
  "Colors and logo",
  "Event purpose",
  "Target audience",
  "Offers",
  "Content",
  "Features",
];

const exhibitorValue = [
  "Create more engagement",
  "Collect leads",
  "Get more bookings",
  "Give faster answers",
  "Showcase offers",
  "Collect photos and content",
  "Build lasting contact after the event",
];

const aiTopics = [
  "FAQs",
  "Company information",
  "Products and services",
  "Program",
  "Offers",
  "Booking",
  "Next steps",
];

const program = [
  { time: "09:00", title: "Welcome & breakfast mingle", place: "Booth B:12" },
  { time: "10:00", title: "From booth to mobile", place: "Stage 2" },
  { time: "11:30", title: "Live demo: AI video and AI avatars", place: "Booth B:12" },
  { time: "13:00", title: "Lunch & networking", place: "The restaurant" },
  { time: "14:00", title: "The booth that generates leads", place: "Stage 2" },
  { time: "16:00", title: "After work at the booth", place: "Booth B:12" },
];

const tabs = [
  { id: "program", icon: "🗓", label: "Program" },
  { id: "about", icon: "🏢", label: "About us" },
  { id: "offer", icon: "🎁", label: "Offer" },
  { id: "book", icon: "📅", label: "Book" },
  { id: "upload", icon: "📸", label: "Upload" },
  { id: "ai", icon: "✨", label: "AI assistant" },
];

const slots = ["10:30", "12:00", "14:30", "15:30"];

const aiQA = [
  {
    q: "What does MonicaLoov.ai do?",
    a: "MonicaLoov.ai creates AI video, AI avatars and digital experiences that help companies stand out – without having to appear on camera.",
  },
  {
    q: "Where can I find you?",
    a: "You will find us at Booth B:12. Our talks take place on Stage 2 – see the Program tab for times.",
  },
  {
    q: "Can I book a meeting?",
    a: "Of course! Go to the Book tab, choose a time that suits you and we will meet at the booth.",
  },
  {
    q: "What is today’s offer?",
    a: "Visitors at the expo get a special event offer on our AI video packages. Open the Offer tab to see the details.",
  },
];

function PhoneDemo() {
  const [tab, setTab] = useState("program");
  const [slot, setSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  const [files, setFiles] = useState([]);
  const [answer, setAnswer] = useState(null);

  function onFiles(e) {
    const list = Array.from(e.target.files || []).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      isVideo: f.type.startsWith("video"),
    }));
    setFiles((prev) => [...prev, ...list]);
  }

  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-head">
          <div className="app-brand">
            Cubiqo <b>×</b> MonicaLoov.ai
          </div>
          <div className="app-meta">Thursday 12 November · Booth B:12 · Stockholm</div>
          <div className="app-event">Nordic Business Expo 2026</div>
        </div>

        <div className="app-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "app-tab active" : "app-tab"}
              onClick={() => setTab(t.id)}
            >
              <span className="app-tab-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="app-body">
          {tab === "program" && (
            <ul className="app-list">
              {program.map((p) => (
                <li key={p.time} className="app-item">
                  <b className="app-time">{p.time}</b>
                  <div>
                    <div className="app-item-title">{p.title}</div>
                    <div className="app-item-sub">{p.place}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "about" && (
            <div className="app-card">
              <h4>About us</h4>
              <p>
                MonicaLoov.ai builds digital experiences, AI video and AI avatars for
                companies that want to be seen – online and at events.
              </p>
              <p>
                Together with Cubiqo, we turn every booth visit into a digital
                experience that continues long after the event.
              </p>
              <div className="app-links">
                <a href="#" className="app-btn ghost">Website</a>
                <a href="#" className="app-btn ghost">Instagram</a>
                <a href="#" className="app-btn ghost">LinkedIn</a>
              </div>
            </div>
          )}

          {tab === "offer" && (
            <div className="app-card offer">
              <div className="offer-badge">Event offer</div>
              <h4>Exclusive for expo visitors</h4>
              <p>
                Book a meeting at the booth today and get a special event price on
                your first AI video package.
              </p>
              <button className="app-btn" onClick={() => setTab("book")}>
                Book a meeting
              </button>
            </div>
          )}

          {tab === "book" && (
            <div className="app-card">
              <h4>Book a meeting at the booth</h4>
              {!booked ? (
                <>
                  <p>Choose a time:</p>
                  <div className="slots">
                    {slots.map((s) => (
                      <button
                        key={s}
                        className={slot === s ? "slot active" : "slot"}
                        onClick={() => setSlot(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    className="app-btn"
                    disabled={!slot}
                    onClick={() => setBooked(true)}
                  >
                    Confirm booking
                  </button>
                </>
              ) : (
                <div className="success">
                  ✅ Booked! See you at Booth B:12 at {slot}.
                  <button
                    className="app-btn ghost"
                    onClick={() => {
                      setBooked(false);
                      setSlot(null);
                    }}
                  >
                    Change time
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === "upload" && (
            <div className="app-card">
              <h4>Share your photos and videos</h4>
              <p>Upload your moments from the event.</p>
              <label className="upload-box">
                <input type="file" accept="image/*,video/*" multiple onChange={onFiles} />
                📤 Choose files
              </label>
              {files.length > 0 && (
                <div className="thumbs">
                  {files.map((f, i) =>
                    f.isVideo ? (
                      <video key={i} src={f.url} className="thumb" muted />
                    ) : (
                      <img key={i} src={f.url} alt={f.name} className="thumb" />
                    )
                  )}
                </div>
              )}
              <p className="tiny">Demo: files are only shown on your device.</p>
            </div>
          )}

          {tab === "ai" && (
            <div className="app-card">
              <h4>✨ AI assistant</h4>
              <p>What would you like to know?</p>
              <div className="chips">
                {aiQA.map((item, i) => (
                  <button
                    key={i}
                    className={answer === i ? "chip active" : "chip"}
                    onClick={() => setAnswer(i)}
                  >
                    {item.q}
                  </button>
                ))}
              </div>
              {answer !== null && <div className="ai-answer">{aiQA[answer].a}</div>}
            </div>
          )}
        </div>

        <div className="app-foot">Digital Experience powered by MonicaLoov.ai</div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card">
        <h3>Thank you!</h3>
        <p className="muted">We have received your message and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h3>Want to know more?</h3>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Company
        <input name="company" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Phone <em>(optional)</em>
        <input name="phone" type="tel" />
      </label>
      <label>
        Message <em>(optional)</em>
        <textarea name="message" rows={4} />
      </label>
      <label className="check">
        <input type="checkbox" name="contact_after_event" value="yes" />
        I would like to be contacted after the event.
      </label>
      <input type="hidden" name="_language" value="en" />
      <button className="btn primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      {status === "error" && (
        <p className="error">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export default function Page() {
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    const url = window.location.href.split("#")[0];
    setQrUrl(
      "https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=" +
        encodeURIComponent(url)
    );
  }, []);

  return (
    <>
      <style>{css}</style>

      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#" className="logo">
            MonicaLoov.ai <i>×</i> Cubiqo
          </a>
          <a href="#demo" className="btn small primary">
            Try the live demo
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">MonicaLoov.ai &amp; Cubiqo</div>
              <h1>A physical touchpoint. A complete digital event experience.</h1>
              <p className="lead">
                <strong>Everything the visitor needs. Right in their phone.</strong>
              </p>
              <p className="muted">
                A physical, sustainable and brand-tailored access point is combined
                with a digital event experience that visitors use directly on their
                own phone.
              </p>
              <ul className="no-list">
                <li>No app to download.</li>
                <li>No extra screen to install.</li>
                <li>No complex hardware.</li>
              </ul>
              <div className="actions">
                <a href="#demo" className="btn primary">Try the live demo</a>
                <a href="#hur" className="btn ghost">See how it works</a>
              </div>
            </div>

            <div className="qr-card">
              <div className="qr-box">
                {qrUrl ? (
                  <img src={qrUrl} alt="QR code to this page" />
                ) : (
                  <span className="muted">Loading QR code…</span>
                )}
              </div>
              <div className="qr-text">
                <strong>Scan and try it yourself</strong>
                <span>Opens directly on your phone</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="hur" className="section">
          <div className="wrap">
            <div className="eyebrow">How it works</div>
            <h2>From physical presence to digital interaction</h2>
            <p className="muted max">
              Cubiqo creates a clear physical presence on site and becomes the
              natural access point to the company’s digital event experience. The
              visitor scans, opens and continues directly on their own phone.
            </p>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s}>
                  <span className="step-num">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="quote">
              The QR code is the way in. The digital experience is the service itself.
            </p>
          </div>
        </section>

        {/* VISITOR + CUSTOMER */}
        <section className="section">
          <div className="wrap two-col">
            <div className="card">
              <div className="eyebrow">What the visitor can do</div>
              <h3>Everything in one place</h3>
              <ul className="check-list">
                {visitorCan.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <p className="pill-note">No app needed.</p>
            </div>

            <div className="card">
              <div className="eyebrow">What the client gets</div>
              <h3>An experience tailored to every event</h3>
              <p className="muted">The digital event experience is tailored to:</p>
              <div className="tags">
                {tailored.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <p className="muted">
                MonicaLoov.ai builds the solution so that it feels like a natural
                part of the company’s own brand.
              </p>
            </div>
          </div>
        </section>

        {/* BEFORE DURING AFTER */}
        <section className="section">
          <div className="wrap">
            <div className="eyebrow">Before. During. After.</div>
            <h2>The connection doesn’t end when the visitor leaves the booth</h2>
            <div className="three-col">
              <div className="card">
                <h3>Before the event</h3>
                <p className="muted">
                  The experience is built and tailored to the company, the event and
                  the goal. Content, design, features and bookings are ready ahead of
                  the event.
                </p>
              </div>
              <div className="card">
                <h3>During the event</h3>
                <p className="muted">
                  Visitors can discover, ask, book, interact and get in touch directly
                  on their phone. Cubiqo acts as the physical access point to the
                  experience.
                </p>
              </div>
              <div className="card">
                <h3>After the event</h3>
                <p className="muted">
                  The solution continues to support follow-up, offers, bookings,
                  contact, lead nurturing and future events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE + AI */}
        <section className="section">
          <div className="wrap">
            <div className="eyebrow">Value for the exhibitor</div>
            <h2>More value from every encounter</h2>
            <p className="muted max">
              An event is not just about how many people walk past the booth. It is
              about what happens when someone stops.
            </p>
            <div className="two-col">
              <div className="card">
                <ul className="check-list">
                  {exhibitorValue.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
              <div className="card accent-card">
                <div className="eyebrow">The AI assistant</div>
                <h3>Instant answers – even when the staff are busy</h3>
                <div className="tags">
                  {aiTopics.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <p className="muted">Tailored to every company and event.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE DEMO */}
        <section id="demo" className="section">
          <div className="wrap">
            <div className="eyebrow">Live demo</div>
            <h2>Try the experience yourself</h2>
            <p className="muted max">
              Click around in the phone – or scan the QR code and open it on your own
              phone. This is how the visitor meets your company at the event.
            </p>
            <div className="demo-grid">
              <div className="cube-wrap">
                <img src={CUBIQO_IMAGE} alt="Cubiqo with QR code" className="cube-img" />
              </div>
              <PhoneDemo />
            </div>
          </div>
        </section>

        {/* ROLES */}
        <section className="section">
          <div className="wrap">
            <div className="eyebrow">Roles and partnership</div>
            <h2>Two parts. One complete event experience.</h2>
            <div className="two-col">
              <div className="card">
                <h3>Cubiqo</h3>
                <p className="muted">
                  The physical, sustainable and brand-tailored access point to the
                  digital event experience.
                </p>
              </div>
              <div className="card">
                <h3>MonicaLoov.ai</h3>
                <p className="muted">
                  Builds, tailors and runs the digital event experience.
                </p>
              </div>
            </div>
            <p className="quote">
              Together, they create a seamless experience before, during and after the
              event.
            </p>
          </div>
        </section>

        {/* CTA + FORM */}
        <section id="formular" className="section">
          <div className="wrap two-col cta">
            <div>
              <div className="eyebrow">Next step</div>
              <h2>Get more out of every event visitor</h2>
              <p className="muted">
                Create an event experience that doesn’t end when the visitor leaves
                the booth.
              </p>
              <div className="actions">
                <a href="#demo" className="btn primary">Try the live demo</a>
                <a href="#formular" className="btn ghost">Book a presentation</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <strong>Digital Event Experience by MonicaLoov.ai</strong>
          <span>In collaboration with Cubiqo</span>
        </div>
      </footer>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root{
  --bg:#070a10; --bg2:#0c111b; --card:#111827; --line:rgba(255,255,255,.08);
  --text:#eef2f7; --muted:#9aa4b2; --accent:#d4a86a; --accent2:#f0cf9a;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{max-width:100%;display:block}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.muted{color:var(--muted)}
.max{max-width:680px}
.eyebrow{text-transform:uppercase;letter-spacing:.14em;font-size:12px;font-weight:700;color:var(--accent);margin-bottom:12px}
h1{font-size:clamp(34px,5.5vw,58px);line-height:1.08;font-weight:800;letter-spacing:-.02em;margin-bottom:20px}
h2{font-size:clamp(26px,3.6vw,40px);line-height:1.15;font-weight:800;letter-spacing:-.01em;margin-bottom:16px}
h3{font-size:20px;font-weight:700;margin-bottom:12px}
p{margin-bottom:14px}

.nav{position:sticky;top:0;z-index:50;background:rgba(7,10,16,.8);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{font-weight:800;font-size:16px}
.logo i{color:var(--accent);font-style:normal;margin:0 4px}

.btn{display:inline-flex;align-items:center;justify-content:center;padding:13px 22px;border-radius:999px;font-weight:600;font-size:15px;border:1px solid transparent;cursor:pointer;transition:.2s;font-family:inherit}
.btn.small{padding:9px 16px;font-size:14px}
.btn.primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#14100a}
.btn.primary:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(212,168,106,.3)}
.btn.ghost{border-color:var(--line);background:rgba(255,255,255,.03)}
.btn.ghost:hover{border-color:var(--accent)}
.btn:disabled{opacity:.6;cursor:default}
.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}

.hero{padding:80px 0 60px;background:radial-gradient(900px 500px at 80% 0%,rgba(212,168,106,.14),transparent 60%)}
.hero-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center}
.lead{font-size:20px;margin-bottom:12px}
.no-list{list-style:none;margin-top:16px;display:grid;gap:8px}
.no-list li::before{content:"✕";color:var(--accent);font-weight:700;margin-right:10px}

.qr-card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:28px;text-align:center;box-shadow:0 30px 60px rgba(0,0,0,.4)}
.qr-box{background:#fff;border-radius:16px;padding:16px;width:240px;height:240px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center}
.qr-box .muted{color:#555}
.qr-text{display:flex;flex-direction:column;gap:4px}
.qr-text span{color:var(--muted);font-size:14px}

.section{padding:80px 0;border-top:1px solid var(--line)}
.steps{list-style:none;display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:32px 0}
.steps li{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 14px;text-align:center;font-weight:600;display:flex;flex-direction:column;align-items:center;gap:10px}
.step-num{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#14100a;font-weight:800}
.quote{font-size:18px;font-weight:600;color:var(--accent2);margin-top:24px}

.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px}
.three-col{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:28px}
.card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:28px}
.accent-card{background:linear-gradient(160deg,rgba(212,168,106,.12),var(--card) 60%)}
.check-list{list-style:none;display:grid;gap:10px;margin:8px 0 16px}
.check-list li::before{content:"✓";color:var(--accent);font-weight:800;margin-right:10px}
.pill-note{display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(212,168,106,.12);color:var(--accent2);font-weight:600;font-size:14px;margin:0}
.tags{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0 18px}
.tag{padding:7px 14px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.04);font-size:14px}

.demo-grid{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:center;margin-top:32px}
.cube-wrap{border-radius:24px;overflow:hidden;border:1px solid var(--line)}
.cube-img{width:100%;height:100%;object-fit:cover}

.phone{width:340px;height:680px;border-radius:44px;background:#000;padding:12px;position:relative;box-shadow:0 40px 80px rgba(0,0,0,.6),0 0 0 2px #222}
.phone-notch{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:120px;height:26px;background:#000;border-radius:0 0 16px 16px;z-index:2}
.phone-screen{background:var(--bg2);height:100%;border-radius:34px;overflow:hidden;display:flex;flex-direction:column}
.app-head{padding:42px 18px 14px;background:linear-gradient(160deg,rgba(212,168,106,.22),transparent)}
.app-brand{font-size:13px;font-weight:600;color:var(--muted)}
.app-brand b{color:var(--accent)}
.app-meta{font-size:11px;color:var(--muted);margin-top:6px}
.app-event{font-size:19px;font-weight:800;margin-top:2px}
.app-tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;padding:10px 12px}
.app-tab{background:var(--card);border:1px solid var(--line);color:var(--text);border-radius:12px;padding:8px 4px;font-size:11px;font-weight:600;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;font-family:inherit}
.app-tab.active{border-color:var(--accent);background:rgba(212,168,106,.15)}
.app-tab-icon{font-size:16px}
.app-body{flex:1;overflow-y:auto;padding:4px 12px 12px}
.app-list{list-style:none;display:grid;gap:8px}
.app-item{display:flex;gap:12px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px}
.app-time{color:var(--accent);font-size:13px;min-width:42px}
.app-item-title{font-size:13px;font-weight:600;line-height:1.3}
.app-item-sub{font-size:11px;color:var(--muted)}
.app-card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;font-size:13px}
.app-card h4{font-size:15px;margin-bottom:8px}
.app-card p{margin-bottom:10px;color:var(--muted)}
.app-links{display:flex;gap:6px;flex-wrap:wrap}
.app-btn{display:inline-block;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#14100a;border:none;border-radius:999px;padding:9px 14px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit;margin-top:4px}
.app-btn.ghost{background:transparent;border:1px solid var(--line);color:var(--text)}
.app-btn:disabled{opacity:.5;cursor:default}
.offer-badge{display:inline-block;background:rgba(212,168,106,.2);color:var(--accent2);font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;margin-bottom:8px}
.slots{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-bottom:10px}
.slot{background:transparent;border:1px solid var(--line);color:var(--text);border-radius:10px;padding:8px;cursor:pointer;font-family:inherit;font-weight:600}
.slot.active{border-color:var(--accent);background:rgba(212,168,106,.15)}
.success{display:grid;gap:8px;font-weight:600}
.upload-box{display:block;border:1.5px dashed var(--accent);border-radius:12px;padding:16px;text-align:center;cursor:pointer;font-weight:600;margin-bottom:10px}
.upload-box input{display:none}
.thumbs{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}
.thumb{width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px}
.tiny{font-size:10px}
.chips{display:grid;gap:6px;margin-bottom:10px}
.chip{text-align:left;background:transparent;border:1px solid var(--line);color:var(--text);border-radius:10px;padding:8px 10px;font-size:12px;cursor:pointer;font-family:inherit}
.chip.active{border-color:var(--accent)}
.ai-answer{background:rgba(212,168,106,.1);border-left:3px solid var(--accent);border-radius:8px;padding:10px;font-size:12px;line-height:1.5}
.app-foot{text-align:center;font-size:10px;color:var(--muted);padding:10px;border-top:1px solid var(--line)}

.cta{align-items:start}
.form-card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:28px;display:grid;gap:14px}
.form-card label{display:grid;gap:6px;font-size:14px;font-weight:600}
.form-card em{color:var(--muted);font-weight:400}
.form-card input,.form-card textarea{background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:12px;color:var(--text);font-family:inherit;font-size:15px}
.form-card input:focus,.form-card textarea:focus{outline:none;border-color:var(--accent)}
.form-card .check{display:flex;align-items:center;gap:10px;font-weight:500}
.form-card .check input{width:18px;height:18px;accent-color:var(--accent)}
.error{color:#f87171;font-size:14px}

.footer{border-top:1px solid var(--line);padding:32px 0;text-align:center}
.footer .wrap{display:flex;flex-direction:column;gap:4px}
.footer span{color:var(--muted);font-size:14px}

@media (max-width:900px){
  .hero-grid,.two-col,.three-col,.demo-grid{grid-template-columns:1fr}
  .steps{grid-template-columns:repeat(2,1fr)}
  .phone{margin:0 auto;width:320px;height:640px}
  .hero{padding:48px 0 40px}
  .section{padding:56px 0}
}
@media (max-width:380px){
  .phone{width:100%}
  .qr-box{width:200px;height:200px}
}
`;
