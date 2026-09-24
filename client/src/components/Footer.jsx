import React from "react";
import { Logo } from "./ui/Logo";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest/90 border-t border-white/5 mt-auto py-8">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Logo className="w-5 h-5" />
          <span className="text-xs text-on-surface-variant">
            © 2025 AuthShield Identity Core. Enterprise-grade zero-trust security & RBAC.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#api"
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            API Docs
          </a>
          <a
            href="#telemetry"
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Telemetry Stream
          </a>
          <a
            href="#privacy"
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Privacy Framework
          </a>
        </div>
      </div>
    </footer>
  );
}

