"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

/**
 * Consent-gated Google Tag Manager.
 *
 * The site runs Google Tag Manager (container GTM-W6Z7MHG) for analytics and
 * conversion tracking. Those are non-essential scripts, so they are NOT loaded
 * until the visitor makes a choice on the cookie banner. The choice is
 * remembered in localStorage per device; the banner can be reopened any time
 * via the "Cookie Preferences" link in the footer (custom event below).
 *
 * Declining simply means the GTM snippet never runs on that visit — no
 * analytics or advertising tags fire. Changing an existing choice reloads the
 * page so the correct scripts load (or stay unloaded).
 */
const GTM_ID = "GTM-W6Z7MHG";
const STORAGE_KEY = "islah_cookie_consent";

type ConsentChoice = "granted" | "declined" | null;

function readStoredChoice(): ConsentChoice {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "granted" || raw === "declined") return raw;
  } catch {
    // localStorage unavailable (private mode / blocked) — treat as no choice.
  }
  return null;
}

function writeChoice(choice: "granted" | "declined") {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Non-fatal: the banner will simply reappear next visit.
  }
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("islah:cookie-preferences"));
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [stored, setStored] = useState<ConsentChoice>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const choice = readStoredChoice();
    setStored(choice);
    if (choice === null) setShowBanner(true);

    const open = () => setShowBanner(true);
    window.addEventListener("islah:cookie-preferences", open);
    return () => window.removeEventListener("islah:cookie-preferences", open);
  }, []);

  const choose = (choice: "granted" | "declined") => {
    const previous = readStoredChoice();
    writeChoice(choice);
    if (previous !== null && previous !== choice) {
      // Reload so the tag manager loads (or stays unloaded) cleanly.
      window.location.reload();
      return;
    }
    setStored(choice);
    setShowBanner(false);
  };

  // GTM loads only after explicit consent.
  const gtmLoaded = mounted && stored === "granted";

  return (
    <>
      {gtmLoaded && (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        </>
      )}

      {mounted && showBanner && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-slate-950/95 p-5 sm:p-6 shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-sm text-slate-300 leading-relaxed">
              <p className="font-semibold text-white mb-1">We value your privacy</p>
              <p>
                This website uses Google Tag Manager for analytics and conversion tracking. These
                non-essential scripts only run if you accept. See our{" "}
                <Link href="/privacy-policy" className="text-cyan-400 hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-2 sm:flex-row">
              <button
                onClick={() => choose("declined")}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={() => choose("granted")}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-500"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
