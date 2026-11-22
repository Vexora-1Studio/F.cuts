import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

function ErrorFallback() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-[#0b0c10] border border-white/15 rounded-2xl p-8 space-y-4">
        <p dir="ltr" className="font-display font-extrabold text-2xl text-white">
          f.<span className="text-[#00E5FF]">cuts</span>
        </p>
        <p className="text-sm text-neutral-300 leading-relaxed">{t.errorBoundary.message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-[#00E5FF] text-[#050505] font-extrabold text-xs tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
        >
          {t.errorBoundary.reloadBtn}
        </button>
      </div>
    </div>
  );
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  declare readonly props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('f.cuts render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
