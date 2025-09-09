// src/AuthPage.jsx
import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";

const styles = {
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b1220",
        padding: 24,
    },
    card: {
        width: 420,
        background: "#ffffff",
        borderRadius: 18,
        boxShadow: "0 20px 60px rgba(16,24,40,0.18)",
        padding: "28px 28px 24px",
    },
    title: {
        margin: "2px 0 16px",
        fontSize: 34,
        lineHeight: 1.2,
        fontWeight: 800,
        letterSpacing: 0.2,
        color: "#0f172a",
        textAlign: "center",
    },
    tabs: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 0,
        background: "#f3f4f6",
        borderRadius: 9999,
        padding: 6,
        margin: "8px 0 18px",
        border: "1px solid #e5e7eb",
    },
    tab: {
        border: 0,
        background: "transparent",
        color: "#111827",
        fontWeight: 700,
        padding: "10px 12px",
        borderRadius: 9999,
        cursor: "pointer",
    },
    tabActive: {
        backgroundImage: "linear-gradient(135deg, #2563eb, #0ea5e9)",
        color: "#ffffff",
        boxShadow: "0 6px 14px rgba(37,99,235,0.35)",
    },
    label: {
        display: "block",
        fontSize: 14,
        color: "#64748b",
        margin: "10px 2px 6px",
    },
    input: {
        width: "80%",
        padding: "12px 16px",
        background: "#ffffff",
        color: "#0f172a",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        outline: "none",
        boxShadow: "inset 0 2px 0 rgba(0,0,0,0.01)",
    },
    primaryBtn: {
        width: "100%",
        padding: "12px 16px",
        border: 0,
        borderRadius: 16,
        cursor: "pointer",
        color: "#ffffff",
        fontWeight: 800,
        letterSpacing: 0.2,
        backgroundImage: "linear-gradient(135deg, #1d4ed8, #0ea5e9)",
        boxShadow: "0 10px 18px rgba(2,132,199,.25)",
        transition: "transform .04s ease, filter .15s ease",
        marginTop: 6,
    },
    switchBtn: {
        padding: "10px 12px",
        background: "#0b1220",
        color: "#cbd5e1",
        border: "1px solid #23314b",
        borderRadius: 10,
        cursor: "pointer",
        width: "100%",
    },
    googleBtn: {
        padding: "12px 16px",
        background: "#ffffff",
        color: "#0b1220",
        border: "0",
        borderRadius: 16,
        cursor: "pointer",
        fontWeight: 800,
        width: "100%",
    },
    linkBtn: {
        background: "transparent",
        color: "#2563eb",
        border: "none",
        textAlign: "left",
        padding: 0,
        cursor: "pointer",
        fontWeight: 700,
        marginBottom: 6,
    },
    divider: { textAlign: "center", color: "#9aa5b1", margin: "10px 0" },
    msg: { color: "#16a34a", textAlign: "center", fontWeight: 600, marginTop: 10 },

};

export default function AuthPage() {
    const [mode, setMode] = useState("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setMsg(user ? `Signed in as ${user.email}` : "");
            // Already logged in? send to landing:
            if (user) navigate("/landing", { replace: true });
        });
        return unsub;
    }, [navigate]);

    const doSignup = async (e) => {
        e.preventDefault();
        setMsg("Creating account...");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/landing", { replace: true });
        } catch (err) {
            setMsg(err.message);
        }
    };

    const doLogin = async (e) => {
        e.preventDefault();
        setMsg("Signing in...");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/landing", { replace: true });
        } catch (err) {
            setMsg(err.message);
        }
    };

    const doReset = async () => {
        if (!email) return setMsg("Enter email to reset.");
        try {
            await sendPasswordResetEmail(auth, email);
            setMsg("Password reset email sent.");
        } catch (err) {
            setMsg(err.message);
        }
    };

    const doGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/landing", { replace: true });
        } catch (err) {
            setMsg(err.message);
        }
    };

    const doLogout = async () => {
        await signOut(auth);
        setMsg("Logged out.");
    };

    return (
        <div style={styles.wrapper}>
            <form style={styles.card} onSubmit={mode === "login" ? doLogin : doSignup}>
                <h2 style={styles.title}>{mode === "login" ? "Login" : "Signup Form"}</h2>

                <div style={styles.tabs}>
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                        style={{ ...styles.tab, ...(mode === "login" ? styles.tabActive : {}) }}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("signup")}
                        style={{ ...styles.tab, ...(mode === "signup" ? styles.tabActive : {}) }}
                    >
                        Signup
                    </button>
                </div>

                {mode === "signup" && (
                    <>
                        <label style={styles.label}>Name</label>
                        <input style={styles.input} placeholder="Name" />
                    </>
                )}

                <label style={styles.label}>Email Address</label>
                <input
                    style={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                />

                <label style={styles.label}>Password</label>
                <input
                    style={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />

                {mode === "signup" && (
                    <>
                        <label style={styles.label}>Confirm password</label>
                        <input style={styles.input} type="password" placeholder="Confirm password" />
                    </>
                )}

                <button type="button" onClick={doReset} style={styles.linkBtn}>
                    Forgot password?
                </button>

                <button type="submit" style={styles.primaryBtn}>
                    {mode === "login" ? "Login" : "Signup"}
                </button>

                <div style={styles.divider}>or</div>

                <button type="button" onClick={doGoogle} style={styles.googleBtn}>
                    Continue with Google
                </button>


            </form>
        </div>
    );
}
