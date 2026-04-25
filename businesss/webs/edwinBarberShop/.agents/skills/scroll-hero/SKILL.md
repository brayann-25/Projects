---
name: video-to-website
description: Turn a source video into a premium scroll-driven landing page with extracted frames, fixed canvas playback, GSAP ScrollTrigger choreography, Lenis smooth scrolling, animated counters, and strong editorial typography. Use when Codex needs to convert a product/demo/lifestyle video into an immersive marketing website without a bundler.
---

# Video to Website

Build a premium scroll-driven website from a video file. Favor intentional motion, large typography, and section-by-section choreography over generic landing page patterns.

## Inputs

Expect:

- Video path (`.mp4`, `.mov`, or similar)
- Optional brand/theme
- Optional section copy
- Optional color direction
- Optional CTA text/link
- Optional text alignment: `left`, `right`, or `alternating`

If alignment is unspecified, default to `left`.
If copy is missing, generate concise premium marketing copy that matches the product shown in the video.

## Deliverable

Create a static project with:

```text
project-root/
  index.html
  css/style.css
  js/app.js
  frames/frame_0001.webp ...
```

Use vanilla HTML/CSS/JS with CDN scripts only. Do not introduce a bundler unless the user explicitly asks for one.

## Non-Negotiables

1. Use Lenis for smooth scroll.
2. Keep the canvas fixed and visible from frame 1. Do not reveal it with `clip-path`.
3. Place hero copy in a fixed overlay outside the scroll container.
4. Use at least 4 section animation types and never repeat the same one back-to-back.
5. Animate section internals in sequence: label, heading, body, CTA/stats.
6. Keep text in side zones on desktop. Never center regular content over the product.
7. Use a dark overlay for stats sections with `0.88`-`0.92` opacity.
8. Count all metrics up from `0`.
9. Keep the final CTA visible with `data-persist="true"`.
10. Give the hero at least 20% of the scroll story and use generous total scroll height.
11. Finish frame playback around 70%-80% of scroll progress.
12. Prefer bold editorial typography over cards or glassmorphism.

## Workflow

### 1. Inspect the video

Run:

```bash
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate,nb_frames -of csv=p=0 "<VIDEO_PATH>"
```

Use the result to choose:

- Target frames: `150-300`
- Short video under `10s`: near source FPS, cap around `300`
- Medium video `10-30s`: `10-15fps`
- Long video over `30s`: `5-10fps`
- Max output width: `1920`

### 2. Extract frames

If FFmpeg is unavailable, install it first or use a local static package workflow.

Run:

```bash
mkdir -p frames
ffmpeg -i "<VIDEO_PATH>" -vf "fps=<FPS>,scale=<WIDTH>:-1" -c:v libwebp -quality 80 "frames/frame_%04d.webp"
```

Verify the frame count after extraction.

### 3. Scaffold

Create `index.html`, `css/style.css`, `js/app.js`, and a `frames/` directory.

### 4. Build the page

Required structure:

1. `#loader`
2. `.site-header`
3. `.canvas-wrap > canvas#canvas`
4. `#hero-overlay`
5. `#dark-overlay`
6. `#scroll-container`

Inside `#scroll-container`, add content sections, one stats section, and a final CTA section.

## HTML Rules

- Put the hero outside the scroll section system.
- Put the canvas behind everything and keep it fixed.
- Give every section `data-enter`, `data-leave`, and `data-animation`.
- Use `data-persist="true"` on the final CTA.
- Use `.stat-number[data-value][data-decimals]` for counters.

Example content section:

```html
<section class="scroll-section section-content align-left"
  data-enter="22"
  data-leave="38"
  data-animation="fade-up">
  <div class="section-inner">
    <span class="section-label">002 / Feature</span>
    <h2 class="section-heading">Feature headline</h2>
    <p class="section-body">Description text here.</p>
  </div>
</section>
```

Example stats section:

```html
<section class="scroll-section section-stats"
  data-enter="54"
  data-leave="72"
  data-animation="stagger-up">
  <div class="stats-grid">
    <div class="stat">
      <span class="stat-number" data-value="24" data-decimals="0">0</span>
      <span class="stat-suffix">hrs</span>
      <span class="stat-label">Cold retention</span>
    </div>
  </div>
</section>
```

Scripts at end of `body`, in this order:

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="js/app.js"></script>
```

## CSS Rules

Define variables for palette and typography. Prefer a distinctive display font and a separate body font.

Base side alignment:

```css
.align-left { padding-left: 5vw; padding-right: 55vw; }
.align-right { padding-left: 55vw; padding-right: 5vw; }
.align-left .section-inner,
.align-right .section-inner { max-width: 40vw; }
```

Required styling behavior:

- Keep `.canvas-wrap` fixed, full-viewport, and unclipped.
- Style `#hero-overlay` as fixed, above the canvas, with strong text shadow.
- Animate hero words with CSS keyframes, not ScrollTrigger, for the initial entrance.
- Position scroll sections absolutely inside the scroll container at the midpoint of their active range.
- On mobile under `768px`, collapse side alignment and add darker text backdrops for legibility.
- Keep body text readable; avoid low-contrast gray for important copy.

## JavaScript Rules

### Lenis

Always wire Lenis to ScrollTrigger:

```js
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Loader

Use two-phase loading:

- Load the first 10 frames first for fast first paint
- Load the rest in the background
- Hide the loader only when all frames are ready

### Canvas rendering

Use padded cover mode:

```js
const IMAGE_SCALE = 0.85;
```

Implementation requirements:

- Scale by `devicePixelRatio`
- Draw a filled background before the frame
- Sample a background color from edge pixels every ~20 frames if feasible
- Keep the video centered and avoid clipping into the header

### Frame-to-scroll binding

Use:

```js
const FRAME_SPEED = 1.5;
```

Target behavior:

- Finish frame playback before the story ends
- Avoid dead scroll zones caused by values above `1.6`
- Redraw only when the frame index changes

### Section animation system

Supported animation types:

- `fade-up`
- `scale-up`
- `rotate-in`
- `stagger-up`
- `clip-reveal`
- `blur-up`

Rules:

- All entrances originate from below on the `y` axis
- Do not use side-entry animations
- Use staggered children
- Use a reveal window around `0.07-0.10`
- If `data-persist="true"`, never reverse the final CTA out

### Counters

Do not animate counters with `gsap.from(el, { textContent: 0 })`.
Use a proxy object and `gsap.fromTo(...)` so values animate reliably from `0` to the target.

### Dark overlay

Fade the dark overlay in and out around the stats section and hold it near `0.9` opacity while stats are active.

### Hero fade

The hero should animate in via CSS on load and fade out via scroll during roughly the first `15%` of total scroll progress.

## Motion Catalog

Use this reference for section entrances:

| Type | Initial state | Target state | Duration |
| --- | --- | --- | --- |
| `fade-up` | `y: 50, opacity: 0` | `y: 0, opacity: 1` | `0.9s` |
| `scale-up` | `y: 40, scale: 0.85, opacity: 0` | `y: 0, scale: 1, opacity: 1` | `1.0s` |
| `rotate-in` | `y: 40, rotation: 3, opacity: 0` | `y: 0, rotation: 0, opacity: 1` | `0.9s` |
| `stagger-up` | `y: 60, opacity: 0` | `y: 0, opacity: 1` | `0.8s` |
| `clip-reveal` | `clip-path: inset(100% 0 0 0), opacity: 0` | `clip-path: inset(0 0 0 0), opacity: 1` | `1.2s` |
| `blur-up` | `y: 50, opacity: 0, filter: blur(8px)` | `y: 0, opacity: 1, filter: blur(0)` | `1.0s` |

## Testing

Serve over HTTP:

```bash
npx serve .
```

Or:

```bash
python -m http.server 8000
```

Verify:

1. Scroll is smooth.
2. Frames advance smoothly and end before the CTA.
3. The hero is visible immediately on load.
4. No two adjacent sections use the same entrance style.
5. Stats counters animate up.
6. Dark overlay only appears for stats.
7. Final CTA remains visible.
8. Mobile layout is legible and stable.

## Anti-Patterns

- Using `slide-left` or `slide-right`
- Putting the hero inside the normal scroll-section animation system
- Hiding the canvas on load with `clip-path`
- Reusing the same animation in consecutive sections
- Centering normal body copy over the product
- Using glassmorphism cards over the video
- Using pure contain mode that leaves mismatched borders
- Using `FRAME_SPEED < 1.0`
- Using `FRAME_SPEED > 1.6`
- Making the hero too short
- Compressing a 6-section story into less than `800vh`
- Using `gsap.from` for counters when the DOM already starts at `0`

## Troubleshooting

- Frames do not load: serve via HTTP, not `file://`
- Scroll feels choppy: reduce frame count or tune scrub/render frequency
- White flashes appear: keep loader until all frames are available
- Canvas is blurry: apply `devicePixelRatio` scaling
- ScrollTrigger and Lenis feel desynced: confirm `lenis.on("scroll", ScrollTrigger.update)`
- Counters stay at `0`: use a proxy object with `gsap.fromTo`
- Hero is missing on load: keep it as a fixed overlay outside the scroll sections
- Video finishes too early: reduce `FRAME_SPEED`
- Sections feel rushed: increase the reveal window
- Mobile memory is high: reduce frames and cap width near `1280`
