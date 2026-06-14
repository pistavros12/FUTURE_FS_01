import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Mail, MapPin, Github, Linkedin, Twitter, Instagram, Download,
  ArrowRight, ArrowUp, Moon, Sun, Menu, X, ExternalLink,
  Palette, Bot, Code2, GraduationCap, Award, Sparkles, Briefcase,
  Send, Globe, Lightbulb, Rocket, BookOpen, Target, Heart, Zap,
} from "lucide-react";
import profileAsset from "@/assets/ribka-portrait.png.asset.json";
const profileImg = profileAsset.url;
import graduationKg from "@/assets/graduation-kg.png.asset.json";
import certSpaceScience from "@/assets/cert-space-science.png.asset.json";
import certJusssRank from "@/assets/cert-jusss-rank.png.asset.json";
import certWomensClub from "@/assets/cert-womens-club.png.asset.json";
import certUdacityAi from "@/assets/cert-udacity-ai.png.asset.json";
import certStemCs from "@/assets/cert-stem-cs.png.asset.json";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ribka Begashaw Lissanu — Graphics Designer, Bot Developer, Web Developer" },
      { name: "description", content: "Portfolio of Ribka Begashaw Lissanu — Ethiopian technology student blending graphic design, bot development and web development." },
      { property: "og:title", content: "Ribka Begashaw Lissanu — Portfolio" },
      { property: "og:description", content: "Graphics Designer · Bot Developer · Web Developer based in Addis Ababa, Ethiopia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ribka Begashaw Lissanu",
        jobTitle: "Graphics Designer, Bot Developer, Web Developer",
        address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
        email: "pistavrosbegashaw@gmail.com",
        alumniOf: "Shaggar Institute of Technology",
      }),
    }],
  }),
  component: () => (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  ),
});

const ROLES = ["Graphics Designer", "Bot Developer", "Beginner Web Developer"];
const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Services />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ---------- Background ---------- */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[var(--eth-green)] opacity-20 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full bg-[var(--eth-yellow)] opacity-20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-[var(--eth-red)] opacity-10 blur-3xl animate-blob [animation-delay:-12s]" />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass shadow-card" : ""}`}>
          <a href="#top" className="group flex items-center gap-2 font-display font-bold text-lg">
            <span className="grid h-9 w-9 place-items-center rounded-xl eth-stripe text-white shadow-glow transition-transform group-hover:scale-110">
              R
            </span>
            <span className="hidden sm:inline">n</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group">
                {n.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left eth-stripe rounded-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-surface-elevated hover:bg-accent/20 transition-colors">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}>
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href="#contact" className="hidden sm:inline-flex">
              <Button className="rounded-xl bg-foreground text-background hover:bg-foreground/90">Hire Me</Button>
            </a>
            <button onClick={() => setOpen((v) => !v)} className="md:hidden grid h-9 w-9 place-items-center rounded-xl border border-border" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="md:hidden mt-2 glass rounded-2xl p-2">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent/20">
                  {n.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function useTypingEffect(words: string[], speed = 80, pause = 1500) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    if (!del && text === current) {
      const t = setTimeout(() => setDel(true), pause);
      return () => clearTimeout(t);
    }
    if (del && text === "") {
      setDel(false);
      setI((x) => x + 1);
      return;
    }
    const t = setTimeout(() => {
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const typed = useTypingEffect(ROLES);

  return (
    <section id="top" ref={ref} className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <motion.div style={{ y }} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--eth-green)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--eth-green)]" />
            </span>
            Available for internships & freelance
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Hi, I'm{" "}
            <span className="text-gradient">Ribka</span>
            <br />
            <span className="text-foreground/90">Begashaw Lissanu</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-display font-medium h-10">
            <span className="text-muted-foreground">I'm a </span>
            <span className="text-gradient">{typed}</span>
            <span className="ml-0.5 inline-block w-0.5 h-7 align-middle bg-[var(--eth-green)] animate-pulse" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
            className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A passionate technology enthusiast from Ethiopia. I combine creativity and code through graphic design,
            bot development, and web development — continuously learning, building, and exploring new ways to create
            meaningful digital experiences.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3 pt-2">
            <a href="#projects">
              <Button size="lg" className="rounded-xl bg-foreground text-background hover:bg-foreground/90 group">
                View Projects <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="outline" className="rounded-xl">
                <Mail /> Contact Me
              </Button>
            </a>
            <a href="#" download>
              <Button size="lg" variant="ghost" className="rounded-xl border border-dashed">
                <Download /> Resume
              </Button>
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex items-center gap-3 pt-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Connect</span>
            <div className="h-px flex-1 max-w-12 bg-border" />
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Mail, href: "mailto:pistavrosbegashaw@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-elevated hover:bg-accent/20 hover:border-[var(--eth-green)] hover:-translate-y-0.5 transition-all">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto lg:mx-0">
          <div className="absolute -inset-6 eth-stripe opacity-30 blur-2xl rounded-full" />
          <div className="relative h-80 w-80 sm:h-96 sm:w-96 rounded-[2rem] overflow-hidden glass shadow-elevated">
            <img src={profileImg} alt="Ribka Begashaw Lissanu portrait"
              width={768} height={768}
              className="h-full w-full object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-[2rem]" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--eth-yellow)]" />
              <div>
                <div className="text-xs text-muted-foreground">Based in</div>
                <div className="text-sm font-semibold">Addis Ababa 🇪🇹</div>
              </div>
            </div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-card">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[var(--eth-green)]" />
              <div>
                <div className="text-xs text-muted-foreground">Currently</div>
                <div className="text-sm font-semibold">Learning & Building</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <span>Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="block h-8 w-5 rounded-full border border-border relative">
          <span className="absolute left-1/2 top-1.5 -translate-x-1/2 h-1.5 w-1 rounded-full bg-foreground" />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ---------- Section helper ---------- */
function Section({ id, eyebrow, title, subtitle, children }: {
  id: string; eyebrow: string; title: ReactNode; subtitle?: string; children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--eth-green)]">
            <span className="h-px w-8 bg-[var(--eth-green)]" /> {eyebrow}
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
/* ---------- About ---------- */
function About() {
  const highlights = [
    { icon: GraduationCap, label: "Freshman at", value: "Shaggar Institute of Technology" },
    { icon: MapPin, label: "Based in", value: "Addis Ababa, Ethiopia" },
    { icon: Briefcase, label: "Open to", value: "Internships & Freelance" },
    { icon: Heart, label: "Passions", value: "Community · Maths · Code" },
  ];
  return (
    <Section id="about" eyebrow="About Me"
      title={<>Crafting at the intersection of <span className="text-gradient">creativity and code</span>.</>}>
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }} className="space-y-5 text-muted-foreground leading-relaxed text-lg">
          <p>
            I'm a freshman at <span className="text-foreground font-medium">Shaggar Institute of Technology (SIT)</span>,
            pursuing a BSc with a deep passion for technology, mathematics, and using software to{" "}
            <span className="text-foreground font-medium">uplift the Ethiopian community</span>. I've already built
            two class projects in my first year and love collaborating in teams to turn ideas into reality.
          </p>
          <p>
            My journey blends graphic design, bot development, and web development. Whether I'm mentoring Grade 12
            students preparing for the ESSLCE, building bots for my church service, or designing meaningful user
            experiences, my goal is the same: <span className="text-foreground font-medium">help others and create
            real-world impact</span>. Maths has been the thread connecting it all — it sharpens how I solve problems
            and design systems.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Community-Driven", "Team Player", "Maths Lover", "Problem Solver", "Lifelong Learner", "Creative Thinker"].map((t) => (
              <span key={t} className="rounded-full glass px-3 py-1.5 text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl glass p-5 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all">
              <h.icon className="h-5 w-5 text-[var(--eth-green)]" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{h.label}</div>
              <div className="mt-1 font-semibold">{h.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}


/* ---------- Education ---------- */
function Education() {
  const items: Array<{
    institution: string; degree: string; duration: string; desc: string; image?: string;
  }> = [
    {
      institution: "Shaggar Institute of Technology (SIT)",
      degree: "BSc — Freshman",
      duration: "Oct 2025 — Jun 2030",
      desc: "Pursuing a Bachelor's degree in technology, building foundations across software development, mathematics and creative problem solving.",
    },
    {
      institution: "Jimma University Specialized Secondary School (JUSSS)",
      degree: "High School · Grade 9–12",
      duration: "2022 — 2025",
      desc: "Completed ESSLCE with 551/600, joining one of Ethiopia's most competitive secondary schools and sharpening academic and analytical skills.",
    },
    {
      institution: "Felege Tibeb Primary School",
      degree: "Grade 5 — 8 · Jimma City, Oromia",
      duration: "Completed",
      desc: "Earned a Ministry average of 94.05, ranking among top students and developing a lasting love for mathematics.",
    },
    {
      institution: "HoraHayu School",
      degree: "Grade 2 — 4 · Dedo, Jimma, Oromia",
      duration: "Completed",
      desc: "Continued elementary education in a community-rooted school environment.",
    },
    {
      institution: "Dedo Elementary School",
      degree: "Grade 1 · Dedo, Jimma",
      duration: "Completed",
      desc: "Began formal primary education and the foundation of my academic journey.",
    },
    {
      institution: "ETN Kindergarten",
      degree: "Kindergarten",
      duration: "Early years",
      desc: "Where it all began — my first graduation at the age of 6.",
      image: graduationKg.url,
    },
  ];
  return (
    <Section id="education" eyebrow="Education" title="Academic journey" subtitle="From kindergarten in Jimma to a BSc in Addis Ababa — the milestones shaping my path in technology.">
      <div className="relative pl-6 sm:pl-10">
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px eth-stripe opacity-40" />
        <div className="space-y-8">
          {items.map((it, i) => (
            <motion.div key={it.institution} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="relative">
              <span className="absolute -left-6 sm:-left-10 top-6 grid h-5 w-5 place-items-center">
                <span className="absolute inset-0 rounded-full eth-stripe blur-md opacity-70" />
                <span className="relative h-3 w-3 rounded-full eth-stripe ring-4 ring-background" />
              </span>
              <div className="rounded-2xl glass p-6 shadow-card hover:shadow-elevated transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">{it.institution}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{it.degree}</p>
                  </div>
                  <span className="text-xs font-semibold rounded-full bg-[var(--eth-green)]/10 text-[var(--eth-green)] px-3 py-1.5">
                    {it.duration}
                  </span>
                </div>
                <p className="mt-3 text-muted-foreground">{it.desc}</p>
                {it.image && (
                  <div className="mt-4 flex items-center gap-4">
                    <img src={it.image} alt="Ribka at her KG graduation, age 6"
                      loading="lazy" width={120} height={160}
                      className="h-32 w-24 object-cover rounded-xl ring-1 ring-border shadow-card" />
                    <p className="text-xs text-muted-foreground italic">
                      A treasured memory — my very first graduation. 🎓
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}


/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    {
      title: "Design", icon: Palette, color: "var(--eth-yellow)",
      skills: [
        { name: "Graphic Design", level: 85 },
        { name: "Visual Communication", level: 80 },
        { name: "Creative Thinking", level: 90 },
      ],
    },
    {
      title: "Programming", icon: Code2, color: "var(--eth-green)",
      skills: [
        { name: "HTML", level: 85 },
        { name: "CSS", level: 80 },
        { name: "JavaScript", level: 70 },
      ],
    },
    {
      title: "Development", icon: Bot, color: "var(--eth-red)",
      skills: [
        { name: "Bot Development", level: 75 },
        { name: "Front-End Development", level: 70 },
        { name: "Problem Solving", level: 85 },
      ],
    },
  ];
  const tools = ["Git", "GitHub", "VS Code", "Figma"];
  const soft = ["Communication", "Teamwork", "Continuous Learning", "Adaptability"];

  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the craft"
      subtitle="A growing toolkit spanning design, code and collaboration.">
      <div className="grid md:grid-cols-3 gap-5">
        {groups.map((g, gi) => (
          <motion.div key={g.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: gi * 0.1, duration: 0.6 }}
            className="rounded-2xl glass p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl"
                style={{ background: `color-mix(in oklch, ${g.color} 18%, transparent)` }}>
                <g.icon className="h-5 w-5" style={{ color: g.color }} />
              </span>
              <h3 className="font-display text-lg font-bold">{g.title}</h3>
            </div>
            <div className="mt-5 space-y-4">
              {g.skills.map((s, i) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${g.color}, var(--eth-green))` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl glass p-6">
          <h4 className="font-display text-lg font-bold flex items-center gap-2"><Zap className="h-4 w-4 text-[var(--eth-yellow)]" />Tools</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((t) => (
              <span key={t} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium bg-surface-elevated">{t}</span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl glass p-6">
          <h4 className="font-display text-lg font-bold flex items-center gap-2"><Heart className="h-4 w-4 text-[var(--eth-red)]" />Soft Skills</h4>
          <div className="mt-4 flex flex-wrap gap-2">
            {soft.map((t) => (
              <span key={t} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium bg-surface-elevated">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */
function Projects() {
  const projects = [
    {
      title: "Moodflix", category: "Web",
      desc: "A movie recommendation app that suggests films based on the user's mood — with a special feature highlighting Ethiopian movies. Featured on Devpost.",
      tech: ["React", "JavaScript", "API"],
      gradient: "linear-gradient(135deg, var(--eth-green), var(--eth-yellow))",
      icon: Sparkles,
    },
    {
      title: "G12 Online Exam Platform", category: "Web",
      desc: "A web-based exam system mirroring the new Ethiopian online entrance exam format, helping Grade 12 students practice for the ESSLCE.",
      tech: ["HTML", "CSS", "JavaScript"],
      gradient: "linear-gradient(135deg, var(--eth-green), var(--eth-red))",
      icon: GraduationCap,
    },
    {
      title: "Church Service Bot", category: "Bot",
      desc: "A bot built to support and automate communication for my church community, making information more accessible to members.",
      tech: ["JavaScript", "Bot API"],
      gradient: "linear-gradient(135deg, var(--eth-red), var(--eth-yellow))",
      icon: Bot,
    },
    {
      title: "G12 Student Support Bot", category: "Bot",
      desc: "A helper bot offering advice, study tips and resources for Grade 12 students preparing for their national exam.",
      tech: ["JavaScript", "Node.js"],
      gradient: "linear-gradient(135deg, var(--eth-yellow), var(--eth-green))",
      icon: Bot,
    },
    {
      title: "Telsem Hack Team Project", category: "Web",
      desc: "A team project from the Telsem Hack hackathon where we earned the Best Creative Award for our innovative approach.",
      tech: ["Team", "Web", "Design"],
      gradient: "linear-gradient(135deg, var(--eth-yellow), var(--eth-red))",
      icon: Rocket,
    },
    {
      title: "GeezX AI Vibe Coding Project", category: "Web",
      desc: "A project developed during the GeezX AI bootcamp exploring AI-assisted 'vibe coding' workflows.",
      tech: ["AI", "Web"],
      gradient: "linear-gradient(135deg, var(--eth-green), var(--eth-yellow))",
      icon: Lightbulb,
    },
    {
      title: "Graphic Design Collection", category: "Design",
      desc: "A growing showcase of graphic design and visual communication work created during the Telsem Hack design track and beyond.",
      tech: ["Design", "Branding"],
      gradient: "linear-gradient(135deg, var(--eth-red), var(--eth-green))",
      icon: Palette,
    },
  ];

  const categories = ["All", "Web", "Bot", "Design"];
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" eyebrow="Projects" title="Selected work"
      subtitle="A growing collection of projects bridging design, code and curiosity.">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
              filter === c
                ? "eth-stripe text-white border-transparent shadow-glow"
                : "border-border bg-surface-elevated hover:bg-accent/20"
            }`}>
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="grid md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article key={p.title} layout
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl glass overflow-hidden shadow-card hover:shadow-elevated transition-all">
              <div className="relative h-48 overflow-hidden" style={{ background: p.gradient }}>
                <div className="absolute inset-0 grid place-items-center">
                  <p.icon className="h-20 w-20 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="absolute top-3 left-3 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-xs font-medium text-white">
                  {p.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs rounded-md bg-muted px-2 py-1 font-medium">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-lg"><Github /> Code</Button>
                  <Button size="sm" className="rounded-lg bg-foreground text-background hover:bg-foreground/90">
                    <ExternalLink /> Live Demo
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    { icon: Palette, title: "Graphic Design", desc: "Creating visual content and creative designs that communicate clearly and resonate emotionally.", color: "var(--eth-yellow)" },
    { icon: Bot, title: "Bot Development", desc: "Building automation tools and intelligent bots that streamline workflows and save time.", color: "var(--eth-green)" },
    { icon: Code2, title: "Web Development", desc: "Developing responsive and user-friendly websites with modern technologies and best practices.", color: "var(--eth-red)" },
  ];
  return (
    <Section id="services" eyebrow="What I Do" title="Services"
      subtitle="Blending creative vision with technical execution.">
      <div className="grid md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative rounded-2xl glass p-7 shadow-card hover:shadow-elevated overflow-hidden transition-all">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
              style={{ background: s.color }} />
            <span className="grid h-14 w-14 place-items-center rounded-2xl"
              style={{ background: `color-mix(in oklch, ${s.color} 20%, transparent)` }}>
              <s.icon className="h-6 w-6" style={{ color: s.color }} />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--eth-green)]">
              Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  const certs: Array<{
    title: string; provider: string; issued: string; expires?: string;
    credentialId?: string; category: string; desc: string; icon: typeof Award;
    image?: string;
  }> = [
    {
      title: "Artificial Intelligence Fundamentals",
      provider: "Udacity (Part of Accenture) — Nanodegree",
      issued: "June 13, 2025",
      category: "AI / Nanodegree",
      desc: "Verified Nanodegree completion covering core AI concepts: search, knowledge representation, machine learning foundations, and applied problem solving.",
      icon: Bot,
      image: certUdacityAi.url,
    },
    {
      title: "Best Creative Award — Telsem Hack 2025",
      provider: "Telsem Hack · United Latino Students Association",
      issued: "July 2025",
      credentialId: "0f3d3d55-526b-4517-8719-48a133148323",
      category: "Hackathon",
      desc: "Recognized with the Best Creative Award as part of a team for an innovative project combining design thinking and code.",
      icon: Sparkles,
    },
    {
      title: "Vibe Coding Certificate",
      provider: "GeezX AI Bootcamp",
      issued: "2025",
      category: "AI Bootcamp",
      desc: "Completed the GeezX AI bootcamp focused on AI-assisted development, and built a project as part of the program.",
      icon: Code2,
    },
    {
      title: "STEM Center Training — Computer Science & Electrical Engineering",
      provider: "Jimma University STEM Center",
      issued: "March 17 – June 17, 2022",
      category: "STEM Training",
      desc: "Three-month STEM Center program at Jimma University covering foundations of Computer Science and Electrical Engineering — hardware basics, programming logic, and applied problem solving.",
      icon: Code2,
      image: certStemCs.url,
    },
    {
      title: "Certificate of Participation — Space Science & Astronomy",
      provider: "Ethiopian Space Science Society (ESSS) — Jimma Branch",
      issued: "February 3, 2022",
      category: "Space Science",
      desc: "Active participant in the Space Science, Astronomy and School Outreach Program at Jimma University, jointly organized by ESSS Jimma Branch, Jimma University CNS, and the Ethiopian Space Science & Technology Institute.",
      icon: Sparkles,
      image: certSpaceScience.url,
    },
    {
      title: "Top of Class — Grade 10, Average 97.03",
      provider: "Jimma University Special Secondary School (JUSSS)",
      issued: "2015 E.C. (2022/23)",
      category: "Academic Excellence",
      desc: "Awarded the JUSSS Woraqaa Ragaa / የምስክር ወረቀት for ranking 1st in Grade 10 with an outstanding average of 97.03 — recognized for exceptional academic dedication.",
      icon: GraduationCap,
      image: certJusssRank.url,
    },
    {
      title: "Certificate of Appreciation — Women's Club",
      provider: "Jimma University Special Secondary School (JUSSS)",
      issued: "2022 – 2025",
      category: "Leadership & Community",
      desc: "Honored for three years of active participation and significant contributions to the school's Women's Club — supporting peers, organizing activities, and promoting empowerment.",
      icon: Heart,
      image: certWomensClub.url,
    },
    {
      title: "ESSLCE — 551 / 600",
      provider: "Ethiopian Ministry of Education",
      issued: "2025",
      category: "National Exam",
      desc: "Scored 551 out of 600 on the Ethiopian Secondary School Leaving Certificate Examination, qualifying for university entrance.",
      icon: GraduationCap,
    },
    {
      title: "Ministry Average — 94.05",
      provider: "Felege Tibeb Primary School · Jimma",
      issued: "Grade 8",
      category: "Academic",
      desc: "Achieved a Ministry-recognized average of 94.05, placing among the top-performing students in the region.",
      icon: Award,
    },
  ];
  const [preview, setPreview] = useState<string | null>(null);
  return (
    <Section id="certifications" eyebrow="Credentials" title="Certifications & awards"
      subtitle="Recognized milestones, awards and learning programs along my journey — click any certificate image to view full size.">
      <div className="grid md:grid-cols-2 gap-5">
        {certs.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }}
            className="relative rounded-2xl glass p-6 shadow-card hover:shadow-elevated transition-all overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 eth-stripe" />
            {c.image && (
              <button
                type="button"
                onClick={() => setPreview(c.image!)}
                className="group block w-full mb-4 overflow-hidden rounded-xl border border-border bg-surface-elevated"
                aria-label={`View ${c.title} certificate`}
              >
                <img
                  src={c.image}
                  alt={`${c.title} certificate`}
                  loading="lazy"
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            )}
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--eth-yellow)]/20 shrink-0">
                <c.icon className="h-6 w-6 text-[var(--eth-yellow)]" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-semibold rounded-full bg-[var(--eth-green)]/10 text-[var(--eth-green)] px-2 py-0.5">
                    {c.category}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-tight">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.provider}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Issued: <span className="text-foreground font-medium">{c.issued}</span></span>
                  {c.expires && <span>Expires: <span className="text-foreground font-medium">{c.expires}</span></span>}
                </div>
                {c.credentialId && (
                  <div className="mt-2 text-xs text-muted-foreground break-all">
                    ID: <span className="font-mono text-foreground/80">{c.credentialId}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setPreview(null)}
              className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-xl glass text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={preview}
              alt="Certificate preview"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-elevated cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}


/* ---------- Achievements ---------- */
function Achievements() {
  const items = [
    { icon: BookOpen, title: "Lifelong Learning", desc: "Always curious — learning is a daily commitment." },
    { icon: Rocket, title: "Technology Exploration", desc: "Constantly experimenting with new tools and ideas." },
    { icon: GraduationCap, title: "Academic Growth", desc: "Building strong foundations through formal study." },
    { icon: Lightbulb, title: "Creative Problem Solving", desc: "Approaching challenges with imagination and logic." },
    { icon: Target, title: "Continuous Skill Development", desc: "Sharpening abilities across design and development." },
    { icon: Sparkles, title: "Passion for Innovation", desc: "Driven to create meaningful, modern solutions." },
  ];
  return (
    <Section id="achievements" eyebrow="Achievements" title="Values & milestones"
      subtitle="The principles that shape how I learn, build, and grow.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div key={it.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5 }}
            className="rounded-2xl glass p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all">
            <span className="grid h-11 w-11 place-items-center rounded-xl eth-stripe text-white">
              <it.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="Get in touch" title={<>Let's build <span className="text-gradient">something</span> together.</>}
      subtitle="I'm always interested in internships, collaborative projects, and connecting with fellow developers, designers and technology enthusiasts.">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="space-y-4">
          <div className="rounded-2xl glass p-6 shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--eth-green)]/15 text-[var(--eth-green)]">
              <Mail className="h-5 w-5" />
            </span>
            <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">Email</div>
            <a href="mailto:pistavrosbegashaw@gmail.com"
              className="block mt-1 font-semibold hover:text-[var(--eth-green)] transition-colors break-all">
              pistavrosbegashaw@gmail.com
            </a>
          </div>
          <div className="rounded-2xl glass p-6 shadow-card">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--eth-yellow)]/15 text-[var(--eth-yellow)]">
              <MapPin className="h-5 w-5" />
            </span>
            <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">Location</div>
            <div className="mt-1 font-semibold">Addis Ababa, Ethiopia 🇪🇹</div>
          </div>
          <div className="rounded-2xl glass p-6 shadow-card">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Follow</div>
            <div className="mt-3 flex gap-2">
              {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-xl border border-border hover:eth-stripe hover:text-white hover:border-transparent transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3500); }}
          className="rounded-2xl glass p-6 sm:p-8 shadow-card space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" required maxLength={100} className="mt-1.5 bg-background/50" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input id="email" type="email" required maxLength={255} className="mt-1.5 bg-background/50" placeholder="you@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <Input id="subject" required maxLength={150} className="mt-1.5 bg-background/50" placeholder="What's this about?" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" required maxLength={1500} rows={5} className="mt-1.5 bg-background/50" placeholder="Tell me about your project or opportunity..." />
          </div>
          <Button type="submit" size="lg" className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90 group">
            {sent ? <>Sent — Thank you! <Sparkles /></> : <>Send Message <Send className="transition-transform group-hover:translate-x-1" /></>}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border mt-10">
      <div className="absolute top-0 left-0 right-0 h-0.5 eth-stripe" />
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="grid h-9 w-9 place-items-center rounded-xl eth-stripe text-white">R</span>
              Ribka<span className="text-gradient">.</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Ethiopian technology enthusiast — designing, coding, and continuously learning.
            </p>
            <p className="mt-4 text-sm italic text-foreground/80 border-l-2 border-[var(--eth-green)] pl-3">
              "Learning never exhausts the mind."
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} className="hover:text-foreground transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Get in touch</h4>
            <a href="mailto:pistavrosbegashaw@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors break-all">
              pistavrosbegashaw@gmail.com
            </a>
            <div className="mt-4 flex gap-2">
              {[Github, Linkedin, Twitter, Instagram, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:eth-stripe hover:text-white hover:border-transparent transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ribka Begashaw Lissanu. All rights reserved.</span>
          <span>Built with care in Addis Ababa 🇪🇹</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Back to top ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-2xl eth-stripe text-white shadow-glow hover:scale-110 transition-transform">
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
