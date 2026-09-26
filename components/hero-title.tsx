'use client';

import { useRef, useEffect, type MouseEvent } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion';

export function HeroTitle() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Core physics motion values
  const beamX = useMotionValue(-30);
  const beamIntensity = useMotionValue(0);
  const beamSpread = useMotionValue(1.0);

  // Active animation controllers & timers
  const animX = useRef<AnimationPlaybackControls | null>(null);
  const animIntensity = useRef<AnimationPlaybackControls | null>(null);
  const animSpread = useRef<AnimationPlaybackControls | null>(null);
  const patrolTimer = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  function stopAllAnimations() {
    if (animX.current) animX.current.stop();
    if (animIntensity.current) animIntensity.current.stop();
    if (animSpread.current) animSpread.current.stop();
    if (patrolTimer.current) clearTimeout(patrolTimer.current);
  }

  // Idle Patrol Sweep: runs only when completely untouched
  function startPatrolSweep() {
    if (isHovering.current) return;
    stopAllAnimations();

    beamX.set(-25);
    beamSpread.set(1.0);
    beamIntensity.set(0);

    // Fade in as it enters from the left
    animIntensity.current = animate(beamIntensity, 1, {
      duration: 0.5,
      ease: 'linear',
    });

    // Sweep across to right
    animX.current = animate(beamX, 125, {
      duration: 2.8,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        // Fade out at right edge
        if (animIntensity.current) animIntensity.current.stop();
        animIntensity.current = animate(beamIntensity, 0, {
          duration: 0.4,
          ease: 'easeOut',
          onComplete: () => {
            beamX.set(-25);
            // Rest in darkness for 3.6 seconds, then repeat if still idle
            patrolTimer.current = setTimeout(() => {
              if (!isHovering.current) {
                startPatrolSweep();
              }
            }, 3600);
          },
        });
      },
    });
  }

  // Mouse Enter: Crisp In-place Focus / Materialization (显形聚焦)
  function handleMouseEnter(e: MouseEvent<HTMLDivElement>) {
    isHovering.current = true;
    stopAllAnimations();

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const targetPct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Instantly anchor to cursor position — NEVER drag across from left or right!
    beamX.set(targetPct);

    // Quick, crisp optical focus-in (显形聚光)
    animIntensity.current = animate(beamIntensity, 1, {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    });

    animSpread.current = animate(beamSpread, 1.0, {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    });
  }

  // Mouse Move: Follow cursor with responsive spring tracking
  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    isHovering.current = true;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const targetPct = Math.max(0, Math.min(100, (x / rect.width) * 100));

    // Ensure fully visible while actively tracking
    if (beamIntensity.get() < 0.95 && animIntensity.current) {
      animIntensity.current = animate(beamIntensity, 1, { duration: 0.15 });
    }

    if (animX.current) animX.current.stop();
    animX.current = animate(beamX, targetPct, {
      type: 'spring',
      stiffness: 520,
      damping: 34,
      mass: 0.45,
    });
  }

  // Mouse Leave: Long, ethereal, cinematic movie dissolve in place (电影镜头隐身消散)
  function handleMouseLeave() {
    isHovering.current = false;
    if (animX.current) animX.current.stop();

    // Beam STAYS at release position — does NOT dart away!
    // Lingering atmospheric fade-out over 0.85s
    animIntensity.current = animate(beamIntensity, 0, {
      duration: 0.85,
      ease: [0.25, 1, 0.5, 1], // long dreamy ease-out curve
      onComplete: () => {
        if (!isHovering.current) {
          // Once completely dissolved, wait 3.5s then resume idle patrol
          patrolTimer.current = setTimeout(() => {
            if (!isHovering.current) {
              startPatrolSweep();
            }
          }, 3500);
        }
      },
    });

    // Optical dispersion: light slightly expands/softens as it evaporates into darkness
    animSpread.current = animate(beamSpread, 1.25, {
      duration: 0.85,
      ease: [0.25, 1, 0.5, 1],
    });
  }

  useEffect(() => {
    // Initial start
    startPatrolSweep();
    return () => {
      stopAllAnimations();
    };
  }, []);

  // Motion transforms
  const beamLeft = useTransform(beamX, (v) => `${v}%`);

  // Volumetric searchlight opacity
  const searchlightOpacity = useTransform(beamIntensity, (val) => val * 0.85);

  // Text highlight overlay opacity
  const textHighlightOpacity = useTransform(beamIntensity, (val) => val);

  // Exact background-position mapping for text specular peak
  const textBgPos = useTransform(beamX, (v) => `${(125 - Number(v)) / 1.5}% 0`);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-5xl mx-auto select-none py-2 cursor-default"
    >
      {/* Layer 0: Volumetric Atmospheric Light Cone (with lens expansion) */}
      <motion.div
        style={{
          left: beamLeft,
          opacity: searchlightOpacity,
          scale: beamSpread,
        }}
        className="pointer-events-none absolute -inset-y-10 w-52 -translate-x-1/2 skew-x-[-22deg] rounded-full blur-2xl bg-gradient-to-r from-transparent via-[#a9bd88]/25 via-white/40 to-transparent transition-none origin-center"
      />

      {/* Primary Typographic Block */}
      <div className="relative z-10">
        {/* Layer 1: Crisp Base Text (always stable, fully accessible) */}
        <h1 className="text-[19px] min-[390px]:text-[21px] sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.25] sm:leading-[1.25]">
          <span className="inline-block whitespace-nowrap text-[#eceee9]">
            科学把控安全库存，告别缺货与积压
          </span>
          <br />
          <span className="inline-block whitespace-nowrap text-[#a9bd88] mt-1 sm:mt-2">
            用日常业务数据，秒级算出精准补货量
          </span>
        </h1>

        {/* Layer 2: Additive Specular Highlight Overlay (illuminates or dissolves) */}
        <motion.div
          style={{ opacity: textHighlightOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-[19px] min-[390px]:text-[21px] sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight leading-[1.25] sm:leading-[1.25]"
        >
          {/* Line 1 Specular Gleam: Diamond White Flare */}
          <motion.span
            style={{
              backgroundImage:
                'linear-gradient(115deg, transparent 0%, transparent 28%, #ffffff 50%, transparent 72%, transparent 100%)',
              backgroundSize: '250% 100%',
              backgroundPosition: textBgPos,
            }}
            className="inline-block whitespace-nowrap [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          >
            科学把控安全库存，告别缺货与积压
          </motion.span>

          <br />

          {/* Line 2 Specular Gleam: Luminescent Emerald Gold Flare */}
          <motion.span
            style={{
              backgroundImage:
                'linear-gradient(115deg, transparent 0%, transparent 28%, #f8fff0 44%, #ffffff 50%, #e2ffd0 56%, transparent 72%, transparent 100%)',
              backgroundSize: '250% 100%',
              backgroundPosition: textBgPos,
            }}
            className="inline-block whitespace-nowrap mt-1 sm:mt-2 [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          >
            用日常业务数据，秒级算出精准补货量
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
