import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Inicio", "Temas", "Recursos", "Sobre mí", "Contacto"];

const STATS = [
  { value: "+50", label: "Artículos" },
  { value: "+20", label: "Videos" },
  { value: "+1K", label: "Estudiantes" },
  { value: "100%", label: "Gratuito" },
];

const TOPICS = [
  {
    icon: "💪",
    title: "Habilidades Físicas",
    desc: "Fuerza, velocidad, resistencia y flexibilidad. Fundamentos del rendimiento deportivo.",
    color: "#C8102E",
  },
  {
    icon: "🧠",
    title: "Motricidad",
    desc: "Motricidad fina y gruesa: bases del movimiento humano desde la infancia.",
    color: "#005BBB",
  },
  {
    icon: "🎯",
    title: "Capacidades Motrices",
    desc: "Coordinación, equilibrio, agilidad y ritmo en el deporte y la vida diaria.",
    color: "#e8e8f0",
  },
];

const RESOURCES = [
  { icon: "📄", label: "Artículos" },
  { icon: "🎥", label: "Videos" },
  { icon: "📊", label: "Infografías" },
  { icon: "🗓️", label: "Actividades" },
];

const SOCIALS = [
  { icon: "👥", label: "Facebook", url: "https://www.facebook.com/share/18mk6coqxc/" },
  { icon: "📸", label: "Instagram", url: "https://www.instagram.com/yonatanescorciacantillo?igsh=MXZqbTNzYXZ4djhtNA==" },
  { icon: "🎵", label: "TikTok", url: "https://www.tiktok.com/@yotaescorcia?_r=1&_t=ZS-96QMGqFGwoX" },
  { icon: "▶️", label: "YouTube", url: "https://youtube.com/@elyotaescorcia821?si=kiaPdS9Ca9zS_S_G" },
  { icon: "💬", label: "WhatsApp", url: "https://wa.me/573023301686" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState("0");
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value.replace(/\D/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setDisplay(value); clearInterval(timer); }
      else setDisplay(value.replace(/\d+/, start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

export default function ElProfeYEC() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroRef, heroIn] = useInView(0.1);
  const [statsRef, statsIn] = useInView(0.1);
  const [topicsRef, topicsIn] = useInView(0.1);
  const [articleRef, articleIn] = useInView(0.1);
  const [resourcesRef, resourcesIn] = useInView(0.1);
  const [aboutRef, aboutIn] = useInView(0.1);

  return (
    <div style={{ fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif", background: "#0a0f1e", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700&family=Barlow:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: #C8102E; border-radius: 2px; }

        .nav-link {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 0;
          position: relative;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: #C8102E;
          transition: width 0.3s;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: #C8102E;
          color: #fff;
          border: none;
          padding: 14px 36px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 3px;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #e03050; transform: scale(1.04); }

        .topic-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 36px 28px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s;
          cursor: pointer;
        }
        .topic-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: var(--accent);
          transition: width 0.3s;
        }
        .topic-card:hover { transform: translateY(-6px); border-color: var(--accent); }
        .topic-card:hover::before { width: 100%; opacity: 0.06; }

        .resource-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 28px 24px;
          text-align: center;
          transition: all 0.3s;
          cursor: pointer;
        }
        .resource-card:hover {
          background: rgba(200,16,46,0.12);
          border-color: #C8102E;
          transform: translateY(-4px);
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 14px 24px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s;
        }
        .social-btn:hover {
          background: rgba(200,16,46,0.2);
          border-color: #C8102E;
          transform: translateX(4px);
        }

        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        .diagonal-stripe {
          background: repeating-linear-gradient(
            -45deg,
            rgba(200,16,46,0.08),
            rgba(200,16,46,0.08) 1px,
            transparent 1px,
            transparent 12px
          );
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "12px 40px" : "22px 40px",
        background: scrolled ? "rgba(10,10,15,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,16,46,0.2)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38,
            background: "#C8102E",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>⚡</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 3 }}>
            El Profe <span style={{ color: "#C8102E" }}>YEC</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>

        <button className="btn-primary" style={{ fontSize: 14, padding: "10px 24px" }}>
          Explorar
        </button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background elements */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse at 20% 50%, rgba(200,16,46,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,91,187,0.15) 0%, transparent 50%)",
        }} />
        <div className="diagonal-stripe" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />

        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "8%", top: "20%",
          width: 300, height: 300,
          border: "2px solid rgba(200,16,46,0.2)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", right: "12%", top: "24%",
          width: 220, height: 220,
          border: "1px solid rgba(200,16,46,0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite 1s",
        }} />

        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className={`fade-up ${heroIn ? "visible" : ""}`} style={{ marginBottom: 16 }}>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 13, letterSpacing: 5, textTransform: "uppercase",
              color: "#C8102E", fontWeight: 600,
            }}>
              ⚡ Educación Física · Motricidad · Salud
            </span>
          </div>

          <h1 className={`fade-up delay-1 ${heroIn ? "visible" : ""}`} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 10vw, 130px)",
            lineHeight: 0.9,
            letterSpacing: 4,
            marginBottom: 28,
          }}>
            Educación<br />
            Física <span style={{
              color: "#C8102E",
              textShadow: "0 0 40px rgba(200,16,46,0.5)",
            }}>Para</span><br />
            <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)", color: "transparent" }}>Todos</span>
          </h1>

          <p className={`fade-up delay-2 ${heroIn ? "visible" : ""}`} style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 18, fontWeight: 300,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 480, lineHeight: 1.7,
            marginBottom: 40,
          }}>
            Habilidades físicas, motricidad, capacidades motrices y deporte. Aprende con El Profe YEC.
          </p>

          <div className={`fade-up delay-3 ${heroIn ? "visible" : ""}`} style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button className="btn-primary">▶ Explorar Contenido</button>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
              100% Gratuito
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT - after hero */}
      <section ref={aboutRef} style={{ padding: "100px 40px", background: "rgba(0,0,0,0.4)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className={`fade-up ${aboutIn ? "visible" : ""}`}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8102E" }}>
              Sobre mí
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 3, marginTop: 8, marginBottom: 32 }}>
              👨‍🏫 El Profe <span style={{ color: "#C8102E" }}>YEC</span>
            </h2>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.65)", fontWeight: 300, marginBottom: 36 }}>
              Soy docente de Educación Física con pasión por el movimiento, la salud y el deporte. En este espacio comparto contenido educativo sobre habilidades físicas, motricidad y capacidades motrices para estudiantes y profesionales.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Tecnólogo en Educación Física y Recreación",
                "Profesional en Deportes",
                "Comprometido con la educación de calidad",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 8, height: 8, background: "#C8102E", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing: 1, color: "rgba(255,255,255,0.8)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`fade-up delay-2 ${aboutIn ? "visible" : ""}`}>
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8102E" }}>
                📱 Sígueme
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <span>{s.label}</span>
                  <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.3)" }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "#C8102E", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18, letterSpacing: 4,
              color: "rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
              paddingRight: 60,
            }}>
              EDUCACIÓN FÍSICA &nbsp;·&nbsp; MOTRICIDAD &nbsp;·&nbsp; HABILIDADES FÍSICAS &nbsp;·&nbsp; CAPACIDADES MOTRICES &nbsp;·&nbsp; DEPORTE &nbsp;·&nbsp; SALUD &nbsp;·&nbsp; MOVIMIENTO &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: "80px 40px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
          {STATS.map((s, i) => (
            <div key={i} className={`fade-up delay-${i + 1} ${statsIn ? "visible" : ""}`} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 72, lineHeight: 1,
                color: "#C8102E",
                textShadow: "0 0 30px rgba(200,16,46,0.4)",
              }}>
                <AnimatedNumber value={s.value} />
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section ref={topicsRef} style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`fade-up ${topicsIn ? "visible" : ""}`} style={{ marginBottom: 60 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8102E" }}>
              Contenido
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 3, marginTop: 8 }}>
              📚 Temas Principales
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TOPICS.map((t, i) => (
              <div key={i} className={`topic-card fade-up delay-${i + 1} ${topicsIn ? "visible" : ""}`}
                style={{ "--accent": t.color }}>
                <div style={{ fontSize: 42, marginBottom: 20 }}>{t.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, letterSpacing: 2,
                  color: t.color, marginBottom: 14,
                }}>{t.title}</h3>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
                  {t.desc}
                </p>
                <div style={{ marginTop: 24, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 2, color: t.color }}>
                  VER MÁS →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section ref={articleRef} style={{ padding: "80px 40px", background: "rgba(200,16,46,0.04)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`fade-up ${articleIn ? "visible" : ""}`} style={{ marginBottom: 40 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8102E" }}>
              Destacado
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 3, marginTop: 8 }}>
              ✨ Artículo Destacado
            </h2>
          </div>

          <div className={`fade-up delay-1 ${articleIn ? "visible" : ""}`} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(200,16,46,0.3)",
            padding: "48px",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(200,16,46,0.15), transparent 70%)",
            }} />
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, letterSpacing: 4, color: "#C8102E", textTransform: "uppercase", marginBottom: 20 }}>
              📝 Artículo Destacado
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, letterSpacing: 2, marginBottom: 20 }}>
              ¿Qué son las habilidades motrices básicas?
            </h3>
            <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.65)", fontWeight: 300, maxWidth: 700, marginBottom: 32 }}>
              Las habilidades motrices básicas son los fundamentos del movimiento humano. Incluyen caminar, correr, saltar, lanzar y atrapar. Su desarrollo durante la infancia es clave para la práctica deportiva y la vida cotidiana.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
              <button className="btn-primary">Leer artículo completo →</button>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
                🗓 Mayo 2025 &nbsp;·&nbsp; ⏱ 5 min de lectura
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section ref={resourcesRef} style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className={`fade-up ${resourcesIn ? "visible" : ""}`} style={{ marginBottom: 60 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, letterSpacing: 5, textTransform: "uppercase", color: "#C8102E" }}>
              Biblioteca
            </span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, letterSpacing: 3, marginTop: 8 }}>
              🗂️ Recursos
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {RESOURCES.map((r, i) => (
              <div key={i} className={`resource-card fade-up delay-${i + 1} ${resourcesIn ? "visible" : ""}`}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{r.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(200,16,46,0.3)",
        padding: "40px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
        background: "#0a0f1e",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: "#C8102E", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2 }}>El Profe <span style={{ color: "#C8102E" }}>YEC</span></span>
        </div>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: 2 }}>
          Educación Física · Motricidad · Habilidades Físicas
        </p>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", letterSpacing: 1 }}>
          © 2025 El Profe YEC · Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
