import React, { useState, useRef, useEffect } from "react";

const LANGUAGES = [
    { code: "en-US", flag: "🇬🇧", label: "English" },
    { code: "uk-UA", flag: "🇺🇦", label: "Українська" },
    { code: "pl-PL", flag: "🇵🇱", label: "Polski" },
    { code: "de-DE", flag: "🇩🇪", label: "Deutsch" },
    { code: "fr-FR", flag: "🇫🇷", label: "Français" },
    { code: "es-ES", flag: "🇪🇸", label: "Español" },
    { code: "it-IT", flag: "🇮🇹", label: "Italiano" },
    { code: "ja-JP", flag: "🇯🇵", label: "日本語" },
    { code: "pt-PT", flag: "🇵🇹", label: "Português" },
];

const LanguageSwitcher = ({ lang, setLang }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="lang-dropdown" ref={ref}>
            <button className="lang-selected" onClick={() => setOpen(o => !o)}>
                <span>{current.flag}</span>
                <span>{current.label}</span>
                <span className={`lang-arrow ${open ? "open" : ""}`}>▾</span>
            </button>

            {open && (
                <div className="lang-menu">
                    {LANGUAGES.map(l => (
                        <button
                            key={l.code}
                            className={`lang-option ${l.code === lang ? "active" : ""}`}
                            onClick={() => { setLang(l.code); setOpen(false); }}
                        >
                            <span>{l.flag}</span>
                            <span>{l.label}</span>
                            {l.code === lang && <span className="lang-check">✓</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;