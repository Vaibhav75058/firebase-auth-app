// src/Landing.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);                 // Firebase sign out
            navigate("/auth", { replace: true }); // Go back to auth page
        } catch (e) {
            console.error(e);
        }
    };

    // Inline UI styles
    const ui = {
        page: { minHeight: "100vh", background: "#0b1220", color: "white" },
        header: {
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "#0b1220",
            borderBottom: "1px solid #1f2937",
        },
        brand: { margin: 0, fontWeight: 800, letterSpacing: 0.3 },
        nav: { display: "flex", gap: 18 },
        link: { color: "#cbd5e1", textDecoration: "none", fontWeight: 700 },
        section: { maxWidth: 960, margin: "0 auto", padding: "56px 20px" },
        h1: { marginTop: 0, fontSize: 36 },
        logout: {
            padding: "10px 14px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
        },
    };

    return (
        <div style={ui.page}>
            {/* Header with brand, in-page links, and logout */}
            <header style={ui.header}>
                <h2 style={ui.brand}>🚀 HireGenius</h2>

                {/* In-page navigation (anchors) */}
                <nav style={ui.nav}>
                    <a href="#home" style={ui.link}>Home</a>
                    <a href="#about" style={ui.link}>About</a>
                    <a href="#contact" style={ui.link}>Contact</a>
                </nav>

                <button onClick={handleLogout} style={ui.logout}>
                    Logout
                </button>
            </header>

            {/* Sections that anchors jump to */}

            <section id="home" style={ui.section}>
                <h1 style={ui.h1}>Welcome to HireGenius 🚀</h1>
                <h3 style={ui.h1}>Build interview skills. Get hired.</h3>
                <p>
                    Practice real-world interviews with AI, track progress, and turn weak areas
                    into strengths—without scheduling hassles.
                </p>
                <ul>
                    <li>Instant mock interviews across roles and stacks</li>
                    <li>Actionable feedback and targeted practice sets</li>
                    <li>Progress dashboard and weekly goals</li>
                </ul>
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                    <button style={{ padding: "10px 14px", borderRadius: 10, border: 0, background: "#22c55e", color: "#0b1220", fontWeight: 800 }}>
                        Start a mock interview
                    </button>

                </div>
            </section>

            {/* Companies FAQ band */}
            <section id="companies" style={{ maxWidth: 1100, margin: "24px auto", padding: "18px 20px", background: "#0f1629", border: "1px solid #1f2937", borderRadius: 14 }}>
                <h2 style={{ margin: "0 0 6px", fontSize: 24 }}>Top companies – frequently asked interview questions</h2>
                <p style={{ margin: "0 0 16px", color: "#cbd5e1" }}>
                    Real questions asked in recent interviews. Pick a company to practice targeted sets and patterns.
                </p>

                {/* Card grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                        gap: 14,
                    }}
                >
                    {[
                        {
                            name: "Amazon",
                            blurb: "Arrays, hashing, two‑pointers, system design basics.",
                            logo: "/assets/logos/amazon.png",
                        },
                        {
                            name: "TCS",
                            blurb: "OOPs, DBMS, SDLC, basic coding and aptitude mix.",
                            logo: "/assets/logos/tcs.png",
                        },
                        {
                            name: "Accenture",
                            blurb: "SQL, APIs, REST, scenario questions, agile basics.",
                            logo: "/assets/logos/accen.png",
                        },
                        {
                            name: "Wipro",
                            blurb: "Loops, strings, data structures fundamentals.",
                            logo: "/assets/logos/wipro.png",
                        },
                        {
                            name: "HCL",
                            blurb: "Networking basics, OS, DSA entry‑level patterns.",
                            logo: "/assets/logos/hcl.png",
                        },
                    ].map((c) => (
                        <article
                            key={c.name}
                            style={{
                                background: "#111827",
                                border: "1px solid #23314b",
                                borderRadius: 12,
                                padding: 14,
                                display: "flex",
                                flexDirection: "column",
                                minHeight: 170,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: 8,
                                        background: "#f8f8f8ff",
                                        border: "1px solid #22304a",
                                        display: "grid",
                                        placeItems: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    <img
                                        src={c.logo}
                                        alt={c.name}
                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                </div>

                                <h3 style={{ margin: 0, fontSize: 18 }}>{c.name}</h3>
                            </div>

                            <p style={{ margin: "0 0 12px", color: "#cbd5e1", flexGrow: 1 }}>{c.blurb}</p>

                            <button
                                onClick={() => alert(`Start ${c.name} set`)}
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 10,
                                    border: 0,
                                    fontWeight: 800,
                                    cursor: "pointer",
                                    color: "#0b1220",
                                    background:
                                        "linear-gradient(135deg, rgba(34,197,94,1), rgba(16,185,129,1))",
                                }}
                            >
                                Start
                            </button>
                        </article>
                    ))}
                </div>
            </section>


            <section id="about" style={ui.section}>
                <h1 style={ui.h1}>About</h1>
                <p>
                    HireGenius is a focused interview‑prep workspace that replaces scattered notes and random practice with guided, repeatable sessions. Start an AI‑powered mock interview in seconds, get concise feedback on clarity, correctness, and communication, and immediately drill the exact areas that need work. Track trends over time with simple dashboards and build momentum with weekly goals and streaks. Whether preparing for a first role or leveling up to senior, HireGenius keeps preparation practical, measurable, and calm—so the next interview feels familiar, not intimidating.
                </p>
            </section>

            <section id="contact" style={ui.section}>
                <h1 style={ui.h1}>Contact</h1>
                <p>Reach out anytime—typical response within 24 hours.</p>

                <div style={{ display: "grid", gap: 12, maxWidth: 450 }}>
                    <div style={{ background: "#111827", padding: 16, borderRadius: 12 }}>
                        <strong>Email</strong>
                        <p style={{ margin: "6px 0 0" }}>
                            <a href="mailto:jhavaibhav419@gmail.com" style={{ color: "#93c5fd", textDecoration: "none" }}>
                                jhavaibhav419@gmail.com
                            </a>
                        </p>
                    </div>

                    <div style={{ background: "#111827", padding: 16, borderRadius: 12 }}>
                        <strong>Feedback form</strong>
                        <p style={{ margin: "6px 0 10px" }}>Share a bug, idea, or feature request.</p>
                        <a
                            href="https://forms.gle/example"
                            target="_blank" rel="noreferrer"
                            style={{ padding: "5px 10px", borderRadius: 10, background: "#1d4ed8", color: "#fff", textDecoration: "none", fontWeight: 600 }}
                        >
                            Open form
                        </a>
                    </div>

                    <div style={{ background: "#111827", padding: 16, borderRadius: 12 }}>
                        <strong>WhatsApp</strong>
                        <p style={{ margin: "6px 0 10px" }}>Mon–Fri, 10am–6pm IST</p>
                        <a
                            href="https://wa.me/917505838844"
                            target="_blank" rel="noreferrer"
                            style={{ padding: "7px 11px", borderRadius: 10, background: "#22c55e", color: "#0b1220", textDecoration: "none", fontWeight: 600 }}
                        >
                            Chat on WhatsApp
                        </a>
                    </div>


                </div>
            </section>

        </div>
    );
}
