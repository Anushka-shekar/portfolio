import { useEffect, useState } from "react";
import data from "./data.js";
import { Github, Linkedin, Mail, Check, ArrowDown, Send, MapPin } from "lucide-react";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NAV = ["about", "skills", "projects", "experience", "education", "contact"];

function useTyping(lines) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!lines?.length) return;
    if (reduce) return setText(lines[0]);
    let stop = false;
    (async () => {
      for (let i = 0; !stop; i++) {
        const t = lines[i % lines.length];
        for (let k = 1; k <= t.length && !stop; k++) { setText(t.slice(0, k)); await sleep(45); }
        await sleep(1700);
        for (let k = t.length; k >= 0 && !stop; k--) { setText(t.slice(0, k)); await sleep(20); }
        await sleep(300);
      }
    })();
    return () => { stop = true; };
  }, [lines]);
  return text;
}

function Terminal({ profile, projects }) {
  const [out, setOut] = useState([]);
  const [cur, setCur] = useState("");
  useEffect(() => {
    const script = [
      ["whoami", `${profile.name.toLowerCase()}, ISE student @ DSATM`],
      ["cat stack.txt", "React · Node · Express · MongoDB · Python · Gemini API"],
      ["ls projects/", projects.map((p) => p.file).join("\n")],
      ["echo $NOW", "building, learning DSA, shipping"],
    ];
    let stop = false;
    (async () => {
      for (const [cmd, res] of script) {
        if (!reduce) for (let k = 1; k <= cmd.length && !stop; k++) { setCur(cmd.slice(0, k)); await sleep(55); }
        if (stop) return;
        setOut((o) => [...o, { cmd, res }]); setCur("");
        await sleep(reduce ? 0 : 600);
      }
    })();
    return () => { stop = true; };
  }, []);
  return (
    <div className="card term mono" aria-label="Terminal summary">
      <div className="bar"><i /><i /><i /><span>~/{profile.first.toLowerCase()}</span></div>
      <pre>
        {out.map((l, i) => <span key={i}><span className="p1">$ </span>{l.cmd + "\n"}<span className="o">{l.res}</span>{"\n\n"}</span>)}
        <span className="p1">$ </span>{cur}
      </pre>
    </div>
  );
}

function Tabs({ items, value, onChange }) {
  const key = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const n = items.length, i = (value + (e.key === "ArrowRight" ? 1 : n - 1)) % n;
      onChange(i); e.currentTarget.children[i].focus();
    }
  };
  return (
    <div className="tabs" role="tablist" onKeyDown={key}>
      {items.map((t, i) => <button key={t} className="tab" role="tab" aria-selected={i === value} onClick={() => onChange(i)}>{t}</button>)}
    </div>
  );
}
const Tags = ({ items }) => <ul className="tags">{items.map((t, i) => <li key={t} className="tag" style={{ animationDelay: `${i * 50}ms` }}>{t}</li>)}</ul>;
const Section = ({ id, title, sub, children }) => (
  <section className="s" id={id}><div className="wrap rv"><h2 className="h2">{title}</h2><p className="sub">{sub}</p>{children}</div></section>
);

function Hero({ d }) {
  const { profile, projects } = d;
  const role = useTyping(profile.roles);
  return (
    <div className="wrap hero" id="top">
      <div>
        <span className="pill"><i />3rd year ISE · DSATM · {profile.location.split(",")[0]}</span>
        <h1>{profile.first}<br />{profile.last}</h1>
        <p className="role"><span>{role}</span><span className="cur" /></p>
        <p className="lead">{profile.intro}</p>
        <div className="row">
          <a className="btn p" href="#projects"><ArrowDown size={16} />View projects</a>
          <a className="btn" href="#contact"><Mail size={16} />Contact me</a>
          <a className="btn sq" href={profile.github} aria-label="GitHub"><Github size={18} /></a>
          <a className="btn sq" href={profile.linkedin} aria-label="LinkedIn"><Linkedin size={18} /></a>
        </div>
      </div>
      <Terminal profile={profile} projects={projects} />
    </div>
  );
}

function About({ d }) {
  const { profile: p, interests } = d;
  return (
    <Section id="about" title="About me" sub="Who I am, what I'm learning, and where I'm headed.">
      <div className="bento">
        <div className="card b-intro" style={{ gridColumn: "1 / -1" }}>
          <p className="big">{p.intro2}</p>
          <p className="mute">{p.learningNow}</p>
          <p style={{ marginTop: "1rem" }}>
            <b>I learn by building.</b>{" "}
            <span className="mute">I pick a real problem, ship a working version, then go back and learn why it broke.</span>
          </p>
          {/* Put your resume at client/public/resume.pdf */}
          <div className="row" style={{ marginTop: "1.25rem" }}>
            <a className="btn p" href="/resume.pdf" target="_blank" rel="noreferrer">View Resume</a>
            <a className="btn" href="/resume.pdf" download="Anushka-Shekar-Resume.pdf">Download Resume</a>
          </div>
        </div>
        <div className="card b-goal">
          <h3>Career direction</h3>
          <p className="mute">{p.goal}</p>
        </div>
        <div className="card b-int">
          <h3>Technical interests</h3>
          <Tags items={interests} />
          <p className="mute" style={{ marginTop: "1rem", fontSize: ".88rem", display: "flex", gap: ".4rem", alignItems: "center" }}><MapPin size={14} />{p.location}</p>
        </div>
      </div>
    </Section>
  );
}

function Skills({ skills }) {
  const [i, setI] = useState(0);
  return (
    <Section id="skills" title="Skills" sub="Pick a category. Everything here is something I've used in a project.">
      <Tabs items={skills.map((s) => s[0])} value={i} onChange={setI} />
      <div className="card skillbox"><Tags key={i} items={skills[i][1]} /></div>
    </Section>
  );
}

function Projects({ projects }) {
  const [i, setI] = useState(0);
  const p = projects[i];
  return (
    <Section id="projects" title="Featured projects" sub="Real applications I built while learning. Select one to explore.">
      <Tabs items={projects.map((x) => x.title.split(":")[0])} value={i} onChange={setI} />
      <div className="pshow" key={i}>
        <div className="card pdet">
          <p className="acc" style={{ fontSize: ".88rem" }}>{p.cat}</p><h3>{p.title}</h3><p className="mute">{p.desc}</p>
          <ul className="feat">{p.features.map((f) => <li key={f}><Check size={14} />{f}</li>)}</ul>
          <Tags items={p.stack} />
          <div className="links"><a href={p.github} target="_blank" rel="noreferrer"><Github size={16} />GitHub</a></div>
        </div>
        <div className="card mock">
          <div className="bar"><i /><i /><i /><span className="mono">{p.file} / preview</span></div>
          <div className="bd">{p.features.slice(0, 3).map((f) => <div className="mrow" key={f}><small className="mono">feature</small><p>{f}</p><u /></div>)}</div>
        </div>
      </div>
    </Section>
  );
}

const Experience = ({ experience }) => (
  <Section id="experience" title="Internships" sub="Hands-on experience, in my own words.">
    <ol className="tl">{experience.map((e) => (
      <li key={e.org}><div className="card"><h3>{e.org}</h3><span className="chip mono">{e.role}</span><span className="chip mono">{e.domain}</span>
        <ul>{e.points.map((x) => <li key={x}><Check size={14} />{x}</li>)}</ul></div></li>))}</ol>
  </Section>
);

const Education = ({ education: e, learning }) => (
  <Section id="education" title="Education" sub="">
    <div className="card edu"><div><h3>{e.degree}</h3><p style={{ marginTop: ".3rem" }}>{e.school}</p><p className="mute" style={{ fontSize: ".9rem" }}>{e.place} · {e.year}</p></div><span className="tag mono">CGPA {e.cgpa}</span></div>
    <div className="lgrid">{learning.map(([t, n]) => <div className="card" key={t}><span className="mono">in progress</span><h3>{t}</h3><p>{n}</p></div>)}</div>
  </Section>
);

function Contact({ profile }) {
  return (
    <section className="s" id="contact"><div className="wrap rv"><div className="card cta">
      <div>
        <h2>Let's build something.</h2>
        <p className="mute" style={{ marginTop: "1rem" }}>Open to internships, collaborations and conversations about software. The best way to reach me is email.</p>
      </div>
      <div className="cl" style={{ alignContent: "center" }}>
        <a className="btn p" href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} />LinkedIn</a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} />GitHub</a>
      </div>
    </div></div></section>
  );
}

export default function App() {
  const d = data;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const move = (e) => {
      const g = document.getElementById("glow").style; g.setProperty("--x", e.clientX + "px"); g.setProperty("--y", e.clientY + "px");
      const c = e.target.closest?.(".card");
      if (c) { const r = c.getBoundingClientRect(); c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px"); }
    };
    const scroll = () => { const h = document.documentElement; document.getElementById("bar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%"; };
    const io = new IntersectionObserver((es) => es.forEach((x) => x.isIntersecting && (x.target.classList.add("in"), io.unobserve(x.target))), { threshold: 0.1 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    addEventListener("pointermove", move); addEventListener("scroll", scroll, { passive: true });
    return () => { removeEventListener("pointermove", move); removeEventListener("scroll", scroll); io.disconnect(); };
  }, [d]);

  const all = d.skills.flatMap((s) => s[1]);
  return (
    <>
      <a className="sr" href="#main">Skip to content</a>
      <div id="glow" /><div id="bar" />
      <header><div className="wrap"><nav aria-label="Primary">
        <a className="brand" href="#top">{d.profile.first}<span>.</span></a>
        <ul className={open ? "open" : ""} onClick={() => setOpen(false)}>{NAV.map((l) => <li key={l}><a href={`#${l}`} style={{ textTransform: "capitalize" }}>{l}</a></li>)}</ul>
        <button id="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
      </nav></div></header>
      <main id="main">
        <Hero d={d} />
        <div className="marq" aria-hidden="true"><div>{[...all, ...all].map((s, i) => <span key={i}>{s}</span>)}</div></div>
        <About d={d} /><Skills skills={d.skills} /><Projects projects={d.projects} />
        <Experience experience={d.experience} /><Education education={d.education} learning={d.learning} /><Contact profile={d.profile} />
      </main>
      <footer><div className="wrap">© {new Date().getFullYear()} {d.profile.name}</div></footer>
    </>
  );
}