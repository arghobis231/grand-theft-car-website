import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  Download,
  Github,
  ExternalLink,
  Menu,
  X,
  Gauge,
  ShieldAlert,
  Zap,
  Layers,
  Flag,
  AlertTriangle,
  ArrowRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Sliders,
  Smartphone,
  Info
} from 'lucide-react';

// Screenshot item definitions matching the exact required paths
const SCREENSHOTS_DATA = [
  {
    id: 'menu',
    title: 'Main Menu',
    subtitle: 'Retro arcade starting interface',
    path: '/screenshots/menu.png',
    stageName: 'START SCREEN',
    theme: 'amber',
    hint: 'Retro arcade HUD & menu selections'
  },
  {
    id: 'city',
    title: 'Stage 01: City Highway',
    subtitle: 'Day · High-density morning commuter flow',
    path: '/screenshots/city.png',
    stageName: 'STAGE 01 — DAY',
    theme: 'cyan',
    hint: 'Dense metro traffic & multi-lane navigation'
  },
  {
    id: 'countryside',
    title: 'Stage 02: Countryside',
    subtitle: 'Sunset · Rapid open highway speed',
    path: '/screenshots/countryside.png',
    stageName: 'STAGE 02 — SUNSET',
    theme: 'orange',
    hint: 'Long stretches & fast closing velocity'
  },
  {
    id: 'mountain',
    title: 'Stage 03: Mountain Road',
    subtitle: 'Night · Dark curves & piercing headlights',
    path: '/screenshots/mountain.png',
    stageName: 'STAGE 03 — NIGHT',
    theme: 'indigo',
    hint: 'Low-light reaction challenges'
  },
  {
    id: 'desert',
    title: 'Stage 04: Desert',
    subtitle: 'Storm · High-wind dust storm conditions',
    path: '/screenshots/desert.png',
    stageName: 'STAGE 04 — STORM',
    theme: 'amber',
    hint: 'Dust haze & unpredictable vehicle spacing'
  },
  {
    id: 'neon-city',
    title: 'Stage 05: Neon City',
    subtitle: 'Night · Peak traffic & maximum stakes',
    path: '/screenshots/neon-city.png',
    stageName: 'STAGE 05 — NIGHT',
    theme: 'pink',
    hint: 'Maximum oncoming speed & neon asphalt'
  }
];

// 5 Stages data
const STAGES_DATA = [
  {
    number: '01',
    name: 'City Highway',
    timeOfDay: 'Day',
    description: 'Start the run through a busy city highway and learn to read the traffic.',
    hazard: 'High Density',
    atmosphere: 'Steel blue urban daylight, overpasses, and heavy multi-lane congestion.',
    colorClass: 'stage-city',
    accentBorder: 'border-sky-500/40',
    accentText: 'text-sky-400',
    accentBg: 'bg-sky-500/10'
  },
  {
    number: '02',
    name: 'Countryside',
    timeOfDay: 'Sunset',
    description: 'Push farther into open roads as the scenery changes and the pace increases.',
    hazard: 'Accelerated Velocity',
    atmosphere: 'Warm sunset hues across wide open lanes where oncoming cars approach rapidly.',
    colorClass: 'stage-countryside',
    accentBorder: 'border-orange-500/40',
    accentText: 'text-orange-400',
    accentBg: 'bg-orange-500/10'
  },
  {
    number: '03',
    name: 'Mountain Road',
    timeOfDay: 'Night',
    description: 'Navigate a darker mountain route where visibility and reaction time become more important.',
    hazard: 'Limited Visibility',
    atmosphere: 'Deep midnight darkness with sharp contrasts from oncoming headlight beams.',
    colorClass: 'stage-mountain',
    accentBorder: 'border-indigo-500/40',
    accentText: 'text-indigo-400',
    accentBg: 'bg-indigo-500/10'
  },
  {
    number: '04',
    name: 'Desert',
    timeOfDay: 'Storm',
    description: 'Race through a harsh desert storm while traffic and speed keep increasing.',
    hazard: 'Sandstorm Haze',
    atmosphere: 'Ochre dust particles and harsh wind gusts that challenge fast lane corrections.',
    colorClass: 'stage-desert',
    accentBorder: 'border-amber-500/40',
    accentText: 'text-amber-400',
    accentBg: 'bg-amber-500/10'
  },
  {
    number: '05',
    name: 'Neon City',
    timeOfDay: 'Night',
    description: 'Enter the final neon-lit city stage for the most intense part of the run.',
    hazard: 'Terminal Speed & Police Chases',
    atmosphere: 'Wet asphalt reflecting hot magenta and cyan streetlights at maximum velocity.',
    colorClass: 'stage-neon',
    accentBorder: 'border-pink-500/40',
    accentText: 'text-pink-400',
    accentBg: 'bg-pink-500/10'
  }
];

// 8 Core Features
const FEATURES_DATA = [
  {
    id: 1,
    title: 'Six-Lane Highway',
    description: 'Navigate six lanes while avoiding incoming traffic.',
    icon: Layers,
    accent: 'text-orange-500',
    badge: '6 LANES'
  },
  {
    id: 2,
    title: 'Increasing Speed',
    description: 'The pace increases as the player progresses, making every decision more important.',
    icon: Gauge,
    accent: 'text-red-500',
    badge: 'DYNAMIC MPH'
  },
  {
    id: 3,
    title: 'Dynamic Traffic',
    description: 'Avoid incoming vehicles and find safe gaps through traffic.',
    icon: Car,
    accent: 'text-amber-500',
    badge: 'ADAPTIVE GAPS'
  },
  {
    id: 4,
    title: 'Near-Miss Feedback',
    description: 'Close calls reward precision and create tension.',
    icon: Zap,
    accent: 'text-yellow-400',
    badge: 'TENSION BONUS'
  },
  {
    id: 5,
    title: 'Police Chase',
    description: 'Crashes trigger a police pursuit and raise the stakes.',
    icon: ShieldAlert,
    accent: 'text-red-500',
    badge: 'HIGH STAKES'
  },
  {
    id: 6,
    title: 'Five Unique Stages',
    description: 'Race through five different environments with changing atmosphere and difficulty.',
    icon: Flag,
    accent: 'text-emerald-400',
    badge: '5 ENVIRONMENTS'
  },
  {
    id: 7,
    title: 'Speedometer',
    description: 'Keep track of your current speed while the world moves faster around you.',
    icon: Sliders,
    accent: 'text-cyan-400',
    badge: 'REALTIME HUD'
  },
  {
    id: 8,
    title: 'Responsive Controls',
    description: 'Quick lane changes designed for mobile gameplay.',
    icon: Smartphone,
    accent: 'text-orange-400',
    badge: 'TOUCH TUNED'
  }
];

// How to survive steps
const SURVIVE_STEPS = [
  {
    step: '01',
    title: 'Choose your lane.',
    description: 'Scan the 6 lanes ahead and position your car before incoming vehicle clusters form.'
  },
  {
    step: '02',
    title: 'Watch incoming traffic.',
    description: 'Read the speed differential of oncoming vehicles heading down towards you in the wrong direction.'
  },
  {
    step: '03',
    title: 'Move through safe gaps.',
    description: 'Execute rapid lane switches through tight openings to keep your forward trajectory clear.'
  },
  {
    step: '04',
    title: 'Push your speed higher.',
    description: 'Hold nerve as throttle increases automatically over distance, narrowing your reaction window.'
  },
  {
    step: '05',
    title: 'Survive the chase.',
    description: 'If you clip traffic, police interceptors join the highway with sirens flashing behind you.'
  },
  {
    step: '06',
    title: 'Complete the stage.',
    description: 'Survive the distance threshold to break through into the next distinct racing environment.'
  }
];

// Individual Screenshot Card with graceful fallback
function ScreenshotCard({ item, onOpenModal }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onOpenModal(item)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/90 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenModal(item)}
      aria-label={`View screenshot: ${item.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
        {/* Real image tag with fallback handler */}
        {!hasError && (
          <img
            src={item.path}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            onLoad={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Graceful placeholder fallback if image file is not yet dropped in */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center select-none bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900">
            {/* Retro 6-lane top-down miniature preview */}
            <div className="relative mb-3 h-20 w-44 overflow-hidden rounded-md border border-neutral-800 bg-neutral-900 shadow-inner">
              {/* Lane dashes */}
              <div className="absolute inset-0 flex justify-between px-3 py-1 opacity-25">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-full border-r border-dashed border-neutral-400" />
                ))}
              </div>

              {/* Oncoming vehicles (moving down) */}
              <div className="absolute top-2 left-5 h-4 w-3 rounded-xs bg-red-600/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="absolute top-5 left-16 h-4 w-3 rounded-xs bg-red-600/80 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="absolute top-3 right-6 h-4 w-3 rounded-xs bg-amber-600/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />

              {/* Player car (moving up against traffic) */}
              <div className="absolute bottom-2 left-26 h-5 w-3.5 rounded-xs bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)] animate-car-sway" />

              <div className="absolute bottom-1 right-2 text-[9px] font-mono text-neutral-500 tracking-widest uppercase">
                6 LANES
              </div>
            </div>

            <div className="text-[11px] font-bold tracking-widest text-orange-400 uppercase font-racing">
              GAMEPLAY SCREENSHOT
            </div>
            <div className="mt-1 text-xs text-neutral-400">
              Add screenshot here
            </div>
            <div className="mt-1 text-[10px] font-mono text-neutral-600">
              {item.path}
            </div>
          </div>
        )}

        {/* Hover zoom indicator */}
        <div className="absolute top-3 right-3 rounded-md bg-black/70 p-1.5 text-neutral-300 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 className="h-4 w-4 text-orange-400" />
        </div>

        {/* Stage label badge */}
        <div className="absolute bottom-3 left-3 rounded bg-neutral-950/80 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-neutral-300 backdrop-blur-xs border border-neutral-800">
          {item.stageName}
        </div>
      </div>

      {/* Card meta */}
      <div className="p-4 border-t border-neutral-800/80">
        <h3 className="font-racing text-base font-bold text-neutral-100 group-hover:text-orange-400 transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [activeLane, setActiveLane] = useState(3); // Interactive lane simulator (1 to 6)
  const [simSpeed, setSimSpeed] = useState(132); // Interactive speedometer demonstration

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Subtle speedometer fluctuation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSimSpeed((prev) => {
        const delta = (Math.random() - 0.48) * 4;
        const next = Math.round(prev + delta);
        return Math.min(185, Math.max(110, next));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-orange-500 selection:text-black">
      {/* ==================================================
          1. NAVIGATION BAR (Sticky, 3-zone contract)
      ================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand title wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-black font-racing font-black text-sm shadow-sm shadow-orange-600/50 group-hover:bg-orange-500 transition-colors">
              <Car className="h-4.5 w-4.5 text-neutral-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-racing text-lg font-extrabold tracking-wider text-neutral-100 group-hover:text-orange-400 transition-colors uppercase">
                Grand Theft Car
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              About
            </a>
            <a
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              Features
            </a>
            <a
              href="#stages"
              onClick={(e) => handleNavClick(e, 'stages')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              Stages
            </a>
            <a
              href="#screenshots"
              onClick={(e) => handleNavClick(e, 'screenshots')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              Screenshots
            </a>
            <a
              href="#download"
              onClick={(e) => handleNavClick(e, 'download')}
              className="hover:text-neutral-100 transition-colors py-1 hover:border-b-2 hover:border-orange-500 -mb-0.5"
            >
              Download
            </a>
          </nav>

          {/* Zone 3: Actions (Desktop & Mobile Menu trigger) */}
          <div className="flex items-center gap-3">
            <a
              href="/downloads/grand-theft-car.apk"
              download="grand-theft-car.apk"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-xs font-racing font-bold tracking-wider text-black uppercase transition-all duration-200 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-600/25 active:scale-98 whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download APK</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100 focus:outline-hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 md:hidden">
            <nav className="flex flex-col gap-3 font-racing text-base">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#stages"
                onClick={(e) => handleNavClick(e, 'stages')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                Stages
              </a>
              <a
                href="#screenshots"
                onClick={(e) => handleNavClick(e, 'screenshots')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                Screenshots
              </a>
              <a
                href="#download"
                onClick={(e) => handleNavClick(e, 'download')}
                className="py-2 text-neutral-300 hover:text-orange-400 transition-colors"
              >
                Download
              </a>
              <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
                <a
                  href="/downloads/grand-theft-car.apk"
                  download="grand-theft-car.apk"
                  className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-center text-sm font-bold uppercase text-black"
                >
                  <Download className="h-4 w-4" />
                  Download APK
                </a>
                <a
                  href="https://github.com/arghobis231/Grand-Theft-Car"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-center text-xs text-neutral-300"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* ==================================================
            2. HERO SECTION
        ================================================== */}
        <section
          id="home"
          className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-800/80 asphalt-texture py-16 lg:py-24"
        >
          {/* Subtle CSS Highway Road Backdrop Animation */}
          <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden flex justify-center">
            {/* Road Perspective with 6 lanes */}
            <div className="w-[640px] md:w-[840px] h-[150%] -top-[10%] relative road-perspective">
              <div className="w-full h-full road-surface border-x-4 border-neutral-700 bg-neutral-900/90 relative overflow-hidden shadow-2xl">
                {/* 5 dashed lane markers creating 6 highway lanes */}
                <div className="absolute inset-0 flex justify-between px-6">
                  {[1, 2, 3, 4, 5].map((lane) => (
                    <div
                      key={lane}
                      className="w-1 h-full border-r-2 border-dashed border-neutral-500/40 animate-road"
                    />
                  ))}
                </div>

                {/* Headlight beams streaming down (oncoming traffic) */}
                <div className="absolute top-[20%] left-[16%] w-6 h-36 bg-gradient-to-b from-transparent via-red-600/30 to-red-500/10 blur-xs" />
                <div className="absolute top-[35%] left-[50%] w-6 h-36 bg-gradient-to-b from-transparent via-red-600/30 to-red-500/10 blur-xs" />
                <div className="absolute top-[10%] right-[18%] w-6 h-36 bg-gradient-to-b from-transparent via-amber-600/30 to-amber-500/10 blur-xs" />

                {/* Player car heading upwards in wrong direction */}
                <div className="absolute bottom-[18%] left-[34%] w-8 h-14 rounded-xs bg-orange-600 border border-orange-400 shadow-[0_0_24px_rgba(249,115,22,0.8)]" />
              </div>
            </div>
          </div>

          {/* Vignette Gradients */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/80" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            {/* Top Tagline */}
            <div className="inline-flex items-center gap-2 mb-6 rounded-md border border-orange-500/30 bg-neutral-900/80 px-3.5 py-1.5 backdrop-blur-xs text-xs font-racing font-semibold tracking-widest text-orange-400 uppercase">
              <span>ANDROID</span>
              <span className="text-neutral-600">•</span>
              <span>RACING</span>
              <span className="text-neutral-600">•</span>
              <span>ACTION</span>
            </div>

            {/* Giant Title */}
            <h1 className="font-racing text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-neutral-100 uppercase leading-[0.95]">
              <span className="block text-neutral-100">GRAND</span>
              <span className="block text-neutral-200">THEFT</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-600">
                CAR
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 font-racing text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-neutral-200 uppercase">
              "Drive Against Traffic. Survive the Chase."
            </p>

            {/* Supporting Text */}
            <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed">
              An adrenaline-fueled retro highway racing experience for Android.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/downloads/grand-theft-car.apk"
                download="grand-theft-car.apk"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-orange-600 px-8 py-4 font-racing text-base font-extrabold uppercase tracking-wider text-black shadow-lg shadow-orange-600/30 transition-all duration-200 hover:bg-orange-500 hover:scale-[1.02] active:scale-98"
              >
                <Download className="h-5 w-5" />
                <span>DOWNLOAD APK</span>
              </a>

              <a
                href="https://github.com/arghobis231/Grand-Theft-Car"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-700 bg-neutral-900/90 px-8 py-4 font-racing text-base font-bold uppercase tracking-wider text-neutral-200 transition-all duration-200 hover:bg-neutral-800 hover:text-white hover:border-neutral-500"
              >
                <Github className="h-5 w-5" />
                <span>VIEW ON GITHUB</span>
                <ExternalLink className="h-4 w-4 opacity-60" />
              </a>
            </div>

            {/* Live HUD Quick Stat Ticker */}
            <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/50 p-3.5 backdrop-blur-xs">
                <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase block">TRAFFIC LANES</span>
                <span className="font-racing text-xl font-bold text-neutral-100 mt-0.5 block">6 Highway Lanes</span>
              </div>
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/50 p-3.5 backdrop-blur-xs">
                <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase block">ENVIRONMENTS</span>
                <span className="font-racing text-xl font-bold text-orange-400 mt-0.5 block">5 Unique Stages</span>
              </div>
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/50 p-3.5 backdrop-blur-xs">
                <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase block">DIRECTION</span>
                <span className="font-racing text-xl font-bold text-red-400 mt-0.5 block">Against Traffic</span>
              </div>
              <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/50 p-3.5 backdrop-blur-xs">
                <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase block">CONSEQUENCE</span>
                <span className="font-racing text-xl font-bold text-amber-400 mt-0.5 block">Police Pursuit</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            3. GAME INTRO / ABOUT
        ================================================== */}
        <section id="about" className="py-20 lg:py-28 border-b border-neutral-800/80 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col mb-12">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-500 uppercase">
                CONCEPT & MECHANICS
              </span>
              <h2 className="font-racing text-3xl sm:text-5xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                THE GAME
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Text explanation */}
              <div className="lg:col-span-6 space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed">
                <p>
                  <strong className="text-neutral-100 font-semibold">Grand Theft Car</strong> is a retro-style top-down highway racing game built natively for Android. The premise is unrelenting: you are the only car driving in the wrong direction on a massive six-lane highway while oncoming traffic speeds straight at you.
                </p>
                <p>
                  Survival demands razor-sharp reflexes. As distance racks up, traffic accelerates dynamically. You must read gaps between oncoming sedans, trucks, and blockers, threading near misses to sustain momentum.
                </p>
                <p>
                  Make a mistake and trigger a crash? The stakes multiply instantly: sirens wail as high-speed police interceptors engage in a relentless pursuit to take you down before you reach the stage transition threshold.
                </p>

                {/* 4 Interactive Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/80 p-4">
                    <div className="font-racing text-xl font-extrabold text-orange-400">6 LANES</div>
                    <div className="mt-1 text-xs text-neutral-400">Wide highway asphalt offering multi-lane evasive choices.</div>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/80 p-4">
                    <div className="font-racing text-xl font-extrabold text-neutral-100">5 STAGES</div>
                    <div className="mt-1 text-xs text-neutral-400">Atmospheric transitions from City Day to Neon Night.</div>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/80 p-4">
                    <div className="font-racing text-xl font-extrabold text-red-400">INCREASING SPEED</div>
                    <div className="mt-1 text-xs text-neutral-400">Escalating pace that reduces reaction time to milliseconds.</div>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/80 p-4">
                    <div className="font-racing text-xl font-extrabold text-amber-400">POLICE CHASE</div>
                    <div className="mt-1 text-xs text-neutral-400">Flashing squad cars deploy after collisions to catch you.</div>
                  </div>
                </div>
              </div>

              {/* Beside Card: Interactive 6-Lane Tactical Highway Simulator */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-racing text-sm font-bold tracking-wider text-neutral-200 uppercase">
                        INTERACTIVE LANE TESTER
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                      <Gauge className="h-3.5 w-3.5 text-orange-400" />
                      <span className="tabular-nums font-semibold text-neutral-200">{simSpeed} MPH</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-neutral-400">
                    Click any lane below to switch your vehicle position against oncoming traffic.
                  </p>

                  {/* 6-Lane Highway Mock Viewport */}
                  <div className="mt-4 relative h-64 w-full rounded-xl border border-neutral-700 bg-neutral-950 overflow-hidden shadow-inner flex flex-col justify-between p-2">
                    {/* Road lanes container */}
                    <div className="absolute inset-0 grid grid-cols-6 divide-x divide-dashed divide-neutral-700">
                      {[1, 2, 3, 4, 5, 6].map((lane) => (
                        <button
                          key={lane}
                          onClick={() => setActiveLane(lane)}
                          className={`h-full flex flex-col items-center justify-between py-2 transition-colors cursor-pointer group hover:bg-neutral-800/40 ${
                            activeLane === lane ? 'bg-orange-950/20' : ''
                          }`}
                          aria-label={`Select lane ${lane}`}
                        >
                          <span className="text-[10px] font-mono text-neutral-600 group-hover:text-orange-400">
                            L{lane}
                          </span>

                          {/* Oncoming car simulation in other lanes */}
                          {lane === 2 && (
                            <div className="h-8 w-5 rounded-xs bg-red-600/90 shadow-[0_0_12px_rgba(220,38,38,0.7)] flex items-center justify-center text-[7px] font-bold text-white uppercase animate-pulse">
                              ▼
                            </div>
                          )}
                          {lane === 5 && (
                            <div className="h-8 w-5 rounded-xs bg-amber-600/90 shadow-[0_0_12px_rgba(245,158,11,0.7)] flex items-center justify-center text-[7px] font-bold text-black uppercase">
                              ▼
                            </div>
                          )}

                          {/* Player car in active lane */}
                          {activeLane === lane ? (
                            <div className="h-9 w-6 rounded-xs bg-orange-500 border border-orange-300 shadow-[0_0_16px_rgba(249,115,22,1)] flex items-center justify-center text-[8px] font-black text-black">
                              ▲
                            </div>
                          ) : (
                            <div className="h-9 w-6 border border-neutral-800 rounded-xs opacity-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lane buttons for touch accessibility */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6].map((lane) => (
                      <button
                        key={lane}
                        onClick={() => setActiveLane(lane)}
                        className={`flex-1 py-1.5 rounded text-xs font-racing font-bold uppercase transition-all ${
                          activeLane === lane
                            ? 'bg-orange-500 text-black shadow-sm'
                            : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                        }`}
                      >
                        Lane {lane}
                      </button>
                    ))}
                  </div>

                  {/* Lane status note */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                    <span>Current Position: <strong className="text-orange-400 font-racing">Lane {activeLane} of 6</strong></span>
                    <span className="text-neutral-500 font-mono text-[11px]">Opposing Traffic Flow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            4. FEATURES
        ================================================== */}
        <section id="features" className="py-20 lg:py-28 border-b border-neutral-800/80 bg-neutral-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col mb-14 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-500 uppercase">
                ENGINEERED FOR ADRENALINE
              </span>
              <h2 className="font-racing text-3xl sm:text-5xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                BUILT FOR THE CHASE
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                Core gameplay mechanics crafted for tight mobile response, escalating danger, and intense near misses.
              </p>
            </div>

            {/* 8 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES_DATA.map((feat) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.id}
                    className="group relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:bg-neutral-900 hover:shadow-xl hover:shadow-orange-950/20"
                  >
                    <div>
                      {/* Top Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-800 text-neutral-200 group-hover:bg-neutral-700 transition-colors">
                          <IconComponent className={`h-5 w-5 ${feat.accent}`} />
                        </div>
                        <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-500 group-hover:text-neutral-300">
                          {feat.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-racing text-lg font-bold text-neutral-100 group-hover:text-orange-400 transition-colors">
                        {feat.id}. {feat.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>GT-CAR SPEC</span>
                      <span className="group-hover:translate-x-1 transition-transform text-orange-400">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================
            5. STAGES
        ================================================== */}
        <section id="stages" className="py-20 lg:py-28 border-b border-neutral-800/80 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col mb-14 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-500 uppercase">
                ATMOSPHERES & CHALLENGES
              </span>
              <h2 className="font-racing text-3xl sm:text-5xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                FIVE STAGES
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                Each stage brings distinct environmental lighting, unique visual identity, and escalating highway intensity.
              </p>
            </div>

            {/* 5 Distinct Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STAGES_DATA.map((stg) => (
                <div
                  key={stg.number}
                  className={`group relative flex flex-col justify-between rounded-xl border ${stg.accentBorder} ${stg.colorClass} p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl`}
                >
                  <div>
                    {/* Header: Stage Number & Time of Day */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-racing text-2xl font-black ${stg.accentText}`}>
                          STAGE {stg.number}
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-black/50 border border-neutral-800 text-neutral-300">
                        {stg.timeOfDay.toUpperCase()}
                      </div>
                    </div>

                    {/* Stage Name */}
                    <h3 className="font-racing text-xl font-bold text-neutral-100 group-hover:text-white transition-colors">
                      {stg.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {stg.description}
                    </p>

                    {/* Environmental Details */}
                    <div className="mt-5 rounded-lg bg-black/40 border border-neutral-800/80 p-3 text-xs">
                      <div className="flex items-center justify-between text-neutral-400 mb-1">
                        <span className="font-mono text-[10px] uppercase">Hazard Profile</span>
                        <span className={`font-semibold ${stg.accentText}`}>{stg.hazard}</span>
                      </div>
                      <p className="text-neutral-400 text-[11px] leading-normal">
                        {stg.atmosphere}
                      </p>
                    </div>
                  </div>

                  {/* Bottom highway visualization line */}
                  <div className="mt-6 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>6 LANES ACTIVE</span>
                    <span className={stg.accentText}>ESC. DIFFICULTY</span>
                  </div>
                </div>
              ))}

              {/* Bonus / Stage Progression Card */}
              <div className="flex flex-col justify-between rounded-xl border border-dashed border-neutral-800 bg-neutral-950/60 p-6 text-center sm:text-left">
                <div>
                  <div className="text-xs font-mono font-semibold text-neutral-500 uppercase">
                    PROGRESSION GOAL
                  </div>
                  <h3 className="font-racing text-xl font-bold text-neutral-200 mt-2">
                    Survive All 5 Stages
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    Complete consecutive distance milestones without critical collisions to conquer the full highway run from Day to Neon Night.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span>UNLOCKED IN-RUN</span>
                  <span className="text-orange-400 font-racing font-bold">ARCADE RUN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            6. GAMEPLAY SECTION
        ================================================== */}
        <section id="gameplay" className="py-20 lg:py-28 border-b border-neutral-800/80 bg-neutral-900/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col mb-14 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-500 uppercase">
                TACTICAL RULES
              </span>
              <h2 className="font-racing text-3xl sm:text-5xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                HOW TO SURVIVE
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                Follow this six-step survival loop to avoid oncoming collisions and evade police pursuit.
              </p>
            </div>

            {/* 6 Steps Progression */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SURVIVE_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  className="relative flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/80 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900"
                >
                  <div>
                    {/* Step indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-racing text-3xl font-black text-orange-500">
                        STEP {s.step}
                      </span>
                      {idx < SURVIVE_STEPS.length - 1 && (
                        <ArrowRight className="hidden lg:block h-4 w-4 text-neutral-600" />
                      )}
                    </div>

                    {/* Step Title */}
                    <h3 className="font-racing text-xl font-bold text-neutral-100">
                      {s.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                    <span>PHASE {s.step} / 06</span>
                    <span className="text-neutral-400 font-semibold">ACTION REQUIRED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================
            7. SCREENSHOTS GALLERY
        ================================================== */}
        <section id="screenshots" className="py-20 lg:py-28 border-b border-neutral-800/80 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col mb-14 text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono font-semibold tracking-widest text-orange-500 uppercase">
                GALLERY & PREVIEWS
              </span>
              <h2 className="font-racing text-3xl sm:text-5xl font-black text-neutral-100 uppercase tracking-tight mt-1">
                SCREENSHOTS
              </h2>
              <p className="mt-3 text-neutral-400 text-sm sm:text-base">
                Actual gameplay views across menu navigation and individual highway environments. Click any image to inspect details.
              </p>
            </div>

            {/* Screenshots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCREENSHOTS_DATA.map((item) => (
                <ScreenshotCard
                  key={item.id}
                  item={item}
                  onOpenModal={(selected) => setActiveModalItem(selected)}
                />
              ))}
            </div>

            {/* Note on screenshot drop-in */}
            <div className="mt-10 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-4 text-center text-xs text-neutral-400 max-w-xl mx-auto flex items-center justify-center gap-2">
              <Info className="h-4 w-4 text-orange-400 shrink-0" />
              <span>Screenshots loaded from <code className="text-neutral-300 font-mono">public/screenshots/</code>. Graceful HUD previews render automatically when images are being prepared.</span>
            </div>
          </div>
        </section>

        {/* ==================================================
            8. DOWNLOAD SECTION
        ================================================== */}
        <section id="download" className="py-20 lg:py-28 border-b border-neutral-800/80 bg-neutral-900/40 relative overflow-hidden">
          {/* Subtle glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 mb-4 rounded-md border border-orange-500/30 bg-neutral-900/80 px-3 py-1 text-xs font-mono font-semibold tracking-wider text-orange-400 uppercase">
              ANDROID APK DISTRIBUTION
            </div>

            {/* Title */}
            <h2 className="font-racing text-4xl sm:text-6xl font-black text-neutral-100 uppercase tracking-tight">
              READY TO DRIVE?
            </h2>

            {/* Text */}
            <p className="mt-4 text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
              Download Grand Theft Car for Android and take on the highway.
            </p>

            {/* Big Action Button */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3">
              <a
                href="/downloads/grand-theft-car.apk"
                download="grand-theft-car.apk"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-orange-600 px-10 py-5 font-racing text-lg font-black uppercase tracking-wider text-black shadow-xl shadow-orange-600/30 transition-all duration-200 hover:bg-orange-500 hover:scale-105 active:scale-98"
              >
                <Download className="h-6 w-6" />
                <span>DOWNLOAD APK</span>
              </a>

              {/* Required labels */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono text-neutral-400 mt-2">
                <span className="font-bold text-neutral-300">Android APK</span>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <span>Install on a compatible Android device.</span>
              </div>
            </div>

            {/* Simple 3-step installation guide */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="rounded-lg border border-neutral-800 bg-neutral-900/70 p-4">
                <div className="font-racing text-xs font-bold text-orange-400 uppercase">STEP 1</div>
                <div className="mt-1 font-semibold text-neutral-200 text-sm">Download the APK</div>
                <p className="mt-1 text-xs text-neutral-400">Save the APK file to your Android smartphone or tablet storage.</p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-900/70 p-4">
                <div className="font-racing text-xs font-bold text-orange-400 uppercase">STEP 2</div>
                <div className="mt-1 font-semibold text-neutral-200 text-sm">Allow Unknown Apps</div>
                <p className="mt-1 text-xs text-neutral-400">Enable "Install unknown apps" in system settings when prompted by your browser or file manager.</p>
              </div>
              <div className="rounded-lg border border-neutral-800 bg-neutral-900/70 p-4">
                <div className="font-racing text-xs font-bold text-orange-400 uppercase">STEP 3</div>
                <div className="mt-1 font-semibold text-neutral-200 text-sm">Launch & Drive</div>
                <p className="mt-1 text-xs text-neutral-400">Tap the package to install, start Grand Theft Car, and take on the incoming highway traffic.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            9. GITHUB SECTION
        ================================================== */}
        <section id="github" className="py-16 lg:py-24 border-b border-neutral-800/80 relative">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-semibold text-neutral-500 uppercase">
                  <Github className="h-4 w-4" />
                  <span>OPEN SOURCE REPOSITORY</span>
                </div>
                <h3 className="font-racing text-2xl sm:text-3xl font-black text-neutral-100 uppercase">
                  EXPLORE THE PROJECT
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                  View the source code and development history on GitHub.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a
                  href="https://github.com/arghobis231/Grand-Theft-Car"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-6 py-3.5 font-racing text-sm font-bold uppercase tracking-wider text-neutral-100 transition-all hover:border-neutral-500 hover:bg-neutral-700 active:scale-98"
                >
                  <Github className="h-5 w-5" />
                  <span>VIEW SOURCE CODE</span>
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            10. DEVELOPER SECTION
        ================================================== */}
        <section id="developer" className="py-16 lg:py-20 border-b border-neutral-800/80 bg-neutral-900/20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-mono font-semibold tracking-widest text-neutral-500 uppercase">
              CREATOR
            </span>
            <h2 className="font-racing text-2xl sm:text-3xl font-extrabold text-neutral-100 uppercase mt-1">
              DEVELOPER
            </h2>

            <div className="mt-8 rounded-xl border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8 max-w-md mx-auto shadow-md">
              <div className="font-racing text-2xl font-black text-neutral-100">
                Argho Biswas
              </div>
              <div className="mt-2 text-sm font-medium text-orange-400">
                Computer Science & Engineering
              </div>
              <div className="mt-1 text-xs text-neutral-400">
                Daffodil International University
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          11. FOOTER
      ================================================== */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand & Subtitle */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-orange-600 text-black font-racing font-bold text-xs">
                  <Car className="h-3.5 w-3.5 text-black" />
                </div>
                <span className="font-racing text-lg font-extrabold tracking-wider text-neutral-100 uppercase">
                  Grand Theft Car
                </span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-400 font-racing">
                "Drive Against Traffic. Survive the Chase."
              </p>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-neutral-400">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-neutral-200 transition-colors">
                Home
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-neutral-200 transition-colors">
                About
              </a>
              <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-neutral-200 transition-colors">
                Features
              </a>
              <a href="#stages" onClick={(e) => handleNavClick(e, 'stages')} className="hover:text-neutral-200 transition-colors">
                Stages
              </a>
              <a href="#screenshots" onClick={(e) => handleNavClick(e, 'screenshots')} className="hover:text-neutral-200 transition-colors">
                Screenshots
              </a>
              <a href="#download" onClick={(e) => handleNavClick(e, 'download')} className="hover:text-neutral-200 transition-colors">
                Download
              </a>
              <a
                href="https://github.com/arghobis231/Grand-Theft-Car"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-200 transition-colors inline-flex items-center gap-1 text-orange-400"
              >
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
            <span>© 2026 Grand Theft Car</span>
            <span className="font-mono text-[11px]">Android Top-Down Highway Racing</span>
          </div>
        </div>
      </footer>

      {/* ==================================================
          SCREENSHOT LIGHTBOX MODAL
      ================================================== */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActiveModalItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-orange-400 uppercase">
                  {activeModalItem.stageName}
                </span>
                <h3 className="font-racing text-xl font-bold text-neutral-100">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image / Preview Container */}
            <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
              <img
                src={activeModalItem.path}
                alt={activeModalItem.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement.querySelector('.modal-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
                className="h-full w-full object-contain"
              />

              {/* Fallback if file not yet added */}
              <div className="modal-fallback absolute inset-0 hidden flex-col items-center justify-center p-6 text-center bg-neutral-950">
                <div className="h-14 w-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-3">
                  <Car className="h-7 w-7 text-orange-500" />
                </div>
                <div className="font-racing text-lg font-bold text-neutral-200 uppercase">
                  GAMEPLAY SCREENSHOT
                </div>
                <div className="text-xs text-neutral-400 mt-1 max-w-md">
                  {activeModalItem.hint}
                </div>
                <div className="mt-3 text-[11px] font-mono text-neutral-600 bg-neutral-900 px-3 py-1 rounded">
                  File location: {activeModalItem.path}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
              <span>{activeModalItem.subtitle}</span>
              <span className="font-mono text-neutral-500">Press ESC or click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
