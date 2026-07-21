/**
 * FloatingLines — official React Bits "Floating Lines" (WebGL/Three.js) component,
 * adapted for this portfolio.
 *
 * Adaptations vs. the stock demo (kept professional / ambient, not flashy):
 *  - Transparent canvas (alpha:true, clear alpha 0) so the section background and
 *    theme show through instead of an opaque black panel.
 *  - `uIntensity` uniform scales the final colour so the effect stays subtle
 *    (enterprise / elegant / ambient rather than the bright demo look).
 *  - Honours `prefers-reduced-motion`: the renderer draws a single static frame
 *    and the rAF loop is never started (zero ongoing CPU/GPU cost).
 *  - Decorative only: wrapper is `aria-hidden` and `pointer-events-none` so it is
 *    ignored by assistive tech and never traps keyboard focus.
 *
 * Performance:
 *  - Three.js renderer, geometry, material and listeners are fully disposed on unmount.
 *  - ResizeObserver is disconnected on cleanup.
 *  - The component is mounted lazily (see Hero.tsx) so Three.js stays out of the
 *    initial bundle and does not affect Lighthouse Performance.
 *  - Re-renders are avoided: all config is captured in the mount effect; props are
 *    memoised by the caller so the effect is not re-created.
 */

import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";

import "./floating-lines.css";

const vertexShader = `
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

uniform float uIntensity;

const vec3 BLACK = vec3(0.0);
const vec3 DARK_GRAY = vec3(64.0) / 255.0;
const vec3 SILVER    = vec3(192.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(DARK_GRAY, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(SILVER, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;

  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];

    gradientColor = mix(c1, c2, f);
  }

  return gradientColor * 0.6;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.026 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);

      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  // uIntensity keeps the effect subtle/ambient for a professional portfolio.
  fragColor = vec4(col * uIntensity, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`;

const MAX_GRADIENT_STOPS = 8;

type WavePosition = {
  x: number;
  y: number;
  rotate: number;
};

export type FloatingLinesProps = {
  /** Gradient stops applied along the lines. Defaults to the portfolio grayscale palette. */
  linesGradient?: string[];
  /** Which wave bands to render. All three are enabled by default for density. */
  enabledWaves?: Array<"top" | "middle" | "bottom">;
  /** Line count per wave (matches enabledWaves order) or a single number for all. */
  lineCount?: number | number[];
  /** Line spacing per wave (matches enabledWaves order) or a single number for all. */
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  /** Lower = slower, calmer motion. */
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  /** Overall brightness multiplier. Lower = more subtle. */
  intensity?: number;
  /** CSS mix-blend-mode for the canvas container. Defaults to 'screen' per the original React Bits component. */
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  /**
   * Optional external pointer-event target. Use this when the canvas must stay
   * pointer-events:none but should still react to movement over foreground UI.
   * If omitted, the component preserves the official ReactBits behavior and
   * listens on the WebGL canvas itself.
   */
  eventTargetRef?: RefObject<HTMLElement | null>;
  className?: string;
  style?: CSSProperties;
};

function hexToVec3(hex: string): Vector3 {
  let value = hex.trim();

  if (value.startsWith("#")) {
    value = value.slice(1);
  }

  let r = 255;
  let g = 255;
  let b = 255;

  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else if (value.length === 6) {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }

  return new Vector3(r / 255, g / 255, b / 255);
}

const PORTFOLIO_GRADIENT = ["#1A1A1A", "#737373", "#D4D4D4"];

export default function FloatingLines({
  linesGradient = PORTFOLIO_GRADIENT,
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = [5, 6, 5],
  lineDistance = [6, 6, 6],
  topWavePosition,
  middleWavePosition,
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: -1 },
  animationSpeed = 0.5,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.15,
  intensity = 0.35,
  mixBlendMode = "screen",
  eventTargetRef,
  className,
  style,
}: FloatingLinesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const currentMouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef<number>(0);
  const currentInfluenceRef = useRef<number>(0);
  const targetParallaxRef = useRef<Vector2>(new Vector2(0, 0));
  const currentParallaxRef = useRef<Vector2>(new Vector2(0, 0));

  const getLineCount = (waveType: "top" | "middle" | "bottom"): number => {
    if (typeof lineCount === "number") return lineCount;
    if (!enabledWaves.includes(waveType)) return 0;
    const index = enabledWaves.indexOf(waveType);
    return lineCount[index] ?? 6;
  };

  const getLineDistance = (waveType: "top" | "middle" | "bottom"): number => {
    if (typeof lineDistance === "number") return lineDistance;
    if (!enabledWaves.includes(waveType)) return 0.1;
    const index = enabledWaves.indexOf(waveType);
    return lineDistance[index] ?? 0.1;
  };

  const topLineCount = enabledWaves.includes("top") ? getLineCount("top") : 0;
  const middleLineCount = enabledWaves.includes("middle")
    ? getLineCount("middle")
    : 0;
  const bottomLineCount = enabledWaves.includes("bottom")
    ? getLineCount("bottom")
    : 0;

  const topLineDistance = enabledWaves.includes("top")
    ? getLineDistance("top") * 0.01
    : 0.01;
  const middleLineDistance = enabledWaves.includes("middle")
    ? getLineDistance("middle") * 0.01
    : 0.01;
  const bottomLineDistance = enabledWaves.includes("bottom")
    ? getLineDistance("bottom") * 0.01
    : 0.01;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion: render one static frame, never start the loop.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let active = true;

    const scene = new Scene();

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    // alpha:true keeps the section background visible through the canvas.
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    // Make the canvas itself a full-bleed block so it never inherits a
    // constrained/smaller size from layout timing or inline-display gaps.
    Object.assign(renderer.domElement.style, {
      display: "block",
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: animationSpeed },

      enableTop: { value: enabledWaves.includes("top") },
      enableMiddle: { value: enabledWaves.includes("middle") },
      enableBottom: { value: enabledWaves.includes("bottom") },

      topLineCount: { value: topLineCount },
      middleLineCount: { value: middleLineCount },
      bottomLineCount: { value: bottomLineCount },

      topLineDistance: { value: topLineDistance },
      middleLineDistance: { value: middleLineDistance },
      bottomLineDistance: { value: bottomLineDistance },

      topWavePosition: {
        value: new Vector3(
          topWavePosition?.x ?? 10.0,
          topWavePosition?.y ?? 0.5,
          topWavePosition?.rotate ?? -0.4,
        ),
      },
      middleWavePosition: {
        value: new Vector3(
          middleWavePosition?.x ?? 5.0,
          middleWavePosition?.y ?? 0.0,
          middleWavePosition?.rotate ?? 0.2,
        ),
      },
      bottomWavePosition: {
        value: new Vector3(
          bottomWavePosition?.x ?? 2.0,
          bottomWavePosition?.y ?? -0.7,
          bottomWavePosition?.rotate ?? 0.4,
        ),
      },

      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },

      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },

      lineGradient: {
        value: Array.from(
          { length: MAX_GRADIENT_STOPS },
          () => new Vector3(1, 1, 1),
        ),
      },
      lineGradientCount: { value: 0 },

      uIntensity: { value: intensity },
    };

    if (linesGradient && linesGradient.length > 0) {
      const stops = linesGradient.slice(0, MAX_GRADIENT_STOPS);
      uniforms.lineGradientCount.value = stops.length;

      stops.forEach((hex, i) => {
        const color = hexToVec3(hex);
        uniforms.lineGradient.value[i].set(color.x, color.y, color.z);
      });
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const setSize = () => {
      const el = containerRef.current;
      if (!el) return;
      // getBoundingClientRect reflects the true laid-out box (full section
      // width) and is more reliable than clientWidth, which can briefly read
      // 0 while the lazy chunk mounts and before layout settles.
      const rect = el.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));

      renderer.setSize(width, height, false);

      const canvasWidth = renderer.domElement.width;
      const canvasHeight = renderer.domElement.height;
      uniforms.iResolution.value.set(canvasWidth, canvasHeight, 1);
    };

    // Defer the first measurement to the next frame so the section has its
    // final full width before we size the drawing buffer. A wrong early
    // measurement is what previously left the right side of the Hero empty.
    const initialRaf = requestAnimationFrame(() => {
      if (!active) return;
      setSize();
      if (prefersReduced) renderFrame();
    });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!active) return;
            setSize();
          })
        : null;

    if (ro) ro.observe(container);

    // Fallback for viewport changes that ResizeObserver may miss (e.g. mobile
    // URL-bar show/hide, orientation change).
    const handleWindowResize = () => setSize();
    window.addEventListener("resize", handleWindowResize);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const dpr = renderer.getPixelRatio();

      targetMouseRef.current.set(x * dpr, (rect.height - y) * dpr);
      targetInfluenceRef.current = 1.0;

      if (parallax) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const offsetX = (x - centerX) / rect.width;
        const offsetY = -(y - centerY) / rect.height;
        targetParallaxRef.current.set(
          offsetX * parallaxStrength,
          offsetY * parallaxStrength,
        );
      }
    };

    const handlePointerLeave = () => {
      targetInfluenceRef.current = 0.0;
    };

    const pointerEventTarget = eventTargetRef?.current ?? renderer.domElement;

    if (interactive) {
      pointerEventTarget.addEventListener("pointermove", handlePointerMove);
      pointerEventTarget.addEventListener("pointerleave", handlePointerLeave);
    }

    const renderFrame = () => {
      uniforms.iTime.value = clock.getElapsedTime();

      if (interactive) {
        currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
        uniforms.iMouse.value.copy(currentMouseRef.current);

        currentInfluenceRef.current +=
          (targetInfluenceRef.current - currentInfluenceRef.current) *
          mouseDamping;
        uniforms.bendInfluence.value = currentInfluenceRef.current;
      }

      if (parallax) {
        currentParallaxRef.current.lerp(
          targetParallaxRef.current,
          mouseDamping,
        );
        uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      }

      renderer.render(scene, camera);
    };

    let raf = 0;

    if (prefersReduced) {
      // Static ambient frame only — no ongoing animation, no CPU/GPU loop.
      renderFrame();
    } else {
      const renderLoop = () => {
        if (!active) return;
        renderFrame();
        raf = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    return () => {
      active = false;

      cancelAnimationFrame(raf);
      cancelAnimationFrame(initialRaf);
      window.removeEventListener("resize", handleWindowResize);

      if (ro) ro.disconnect();

      if (interactive) {
        pointerEventTarget.removeEventListener(
          "pointermove",
          handlePointerMove,
        );
        pointerEventTarget.removeEventListener(
          "pointerleave",
          handlePointerLeave,
        );
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    linesGradient,
    enabledWaves,
    lineCount,
    lineDistance,
    topWavePosition,
    middleWavePosition,
    bottomWavePosition,
    animationSpeed,
    interactive,
    bendRadius,
    bendStrength,
    mouseDamping,
    parallax,
    parallaxStrength,
    intensity,
    eventTargetRef,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={["floating-lines-canvas", className].filter(Boolean).join(" ")}
      style={{
        mixBlendMode,
        ...style,
      }}
    />
  );
}
