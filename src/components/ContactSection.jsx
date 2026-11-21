import React, { useState } from 'react';
import {
  Send, Copy, Check, Mail, ExternalLink,
  MessageSquare, CheckCircle2, AlertCircle
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/sound';

// =========================================================================
// 📬 ATTACH YOUR RECEIVING EMAIL HERE:
// All messages submitted through the form will be sent to this email address.
// You can edit it right here or in src/data/portfolioData.js (personalInfo.recipientEmail).
// =========================================================================
const RECIPIENT_EMAIL = personalInfo.recipientEmail || "rkb.88856@gmail.com";
const FORMSPREE_ID = personalInfo.formspreeId || "";

// Vector icons for GitHub and LinkedIn
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default function ContactSection() {
  const [copiedType, setCopiedType] = useState(null); // 'email', 'github', 'linkedin'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activationNeeded, setActivationNeeded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCopy = (text, type) => {
    sound.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setActivationNeeded(false);

    try {
      const endpoint = FORMSPREE_ID
        ? (FORMSPREE_ID.startsWith('http') ? FORMSPREE_ID : `https://formspree.io/f/${FORMSPREE_ID.replace(/^\//, '')}`)
        : `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true || data.ok)) {
        sound.playSuccess();
        setSubmitted(true);
      } else if (data.message && data.message.toLowerCase().includes('activation')) {
        sound.playSuccess();
        setActivationNeeded(true);
      } else {
        throw new Error(data.message || (data.errors && data.errors.map(e => e.message).join(', ')) || 'Failed to transmit message.');
      }
    } catch (err) {
      console.error('Contact transmission error:', err);
      setErrorMessage(
        err.message && !err.message.includes('Failed to fetch')
          ? err.message
          : 'Could not send via automated gateway. You can also send directly using your email app below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header (Human, professional, warm) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-6 border-b border-slate-800/60">
          <div>
            <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
              Let's Build Together
            </h2>
          </div>

          <p className="text-slate-400 font-sans text-sm max-w-md leading-relaxed font-semibold">
            Whether you have a custom hardware design, an embedded firmware requirement, or an engineering role, I'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Visible Links with Copy Buttons (6 cols) */}
          <div className="lg:col-span-6 space-y-4">

            {/* 1. Direct Email Card */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-md hover:border-cyan-500/40 transition-all shadow-card-subtle">
              <div className="text-xs font-sans font-medium text-slate-400 mb-2 flex items-center justify-between">
                <span>Email Address</span>
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="text-base sm:text-lg font-mono text-white mb-2 break-all font-semibold">
                {personalInfo.email}
              </div>

              <p className="text-xs text-slate-400 font-sans mb-4 font-semibold">
                Direct inbox for project inquiries, technical specifications, and role opportunities.
              </p>

              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all text-xs font-sans font-medium flex items-center justify-center gap-2"
              >
                {copiedType === 'email' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-cyan-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* 2. GitHub Profile Link Card */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-md hover:border-cyan-500/40 transition-all shadow-card-subtle">
              <div className="text-xs font-sans font-medium text-slate-400 mb-2 flex items-center justify-between">
                <span>GitHub Profile</span>
                <GithubIcon className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="text-sm sm:text-base font-mono text-white mb-2 break-all font-semibold">
                {personalInfo.github}
              </div>

              <p className="text-xs text-slate-400 font-sans mb-4 font-semibold">
                Repositories for firmware, hardware schematics, and open-source projects.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(personalInfo.github, 'github')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all text-xs font-sans font-medium flex items-center justify-center gap-2"
                >
                  {copiedType === 'github' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>GitHub Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Copy GitHub Link</span>
                    </>
                  )}
                </button>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-medium flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
              </div>
            </div>

            {/* 3. LinkedIn Profile Link Card */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-md hover:border-cyan-500/40 transition-all shadow-card-subtle">
              <div className="text-xs font-sans font-medium text-slate-400 mb-2 flex items-center justify-between">
                <span>LinkedIn Profile</span>
                <LinkedinIcon className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="text-sm sm:text-base font-mono text-white mb-2 break-all font-semibold">
                {personalInfo.linkedin}
              </div>

              <p className="text-xs text-slate-400 font-sans mb-4 font-semibold">
                Professional network, experience details, and recommendations.
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(personalInfo.linkedin, 'linkedin')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-cyan-500/50 transition-all text-xs font-sans font-medium flex items-center justify-center gap-2"
                >
                  {copiedType === 'linkedin' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>LinkedIn Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Copy LinkedIn Link</span>
                    </>
                  )}
                </button>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-sans font-medium flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Minimal Contact Form (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-card-subtle">

            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 text-xs font-sans">
              <span className="text-slate-200 flex items-center gap-2 font-semibold">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Send a Direct Message</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Direct Form</span>
            </div>

            {activationNeeded ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white">
                  1-Time Email Activation Required
                </h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed font-sans font-medium">
                  FormSubmit has sent a confirmation link to <strong className="text-cyan-400">{RECIPIENT_EMAIL}</strong>.
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans font-normal">
                  Please open your Gmail inbox (check Spam/Promotions if needed) and click <strong className="text-white">"Activate Form"</strong>. This is a one-time step. Once activated, every message submitted will arrive directly into your inbox!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActivationNeeded(false);
                    }}
                    className="px-6 py-2 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    Back to Form
                  </button>
                </div>
              </div>
            ) : !submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Engineering Manager"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => sound.playClick()}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => sound.playClick()}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 font-sans outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell me about your hardware idea, firmware requirements, or open role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => sound.playClick()}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 font-sans outline-none transition-all resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-sans space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <p>{errorMessage}</p>
                    </div>
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(`Portfolio Message from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 underline font-medium pl-6"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Click here to open email app directly</span>
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-sans text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-cyan-glow cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white">
                  Message Sent!
                </h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed font-sans font-semibold">
                  Thank you, <strong className="text-white">{formData.name}</strong>. I've received your note and will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Send Another Note
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
