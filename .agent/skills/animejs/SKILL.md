---
name: animejs
description: How to use the Anime.js v4 animation library — installation, API reference, React integration, and common patterns
---

# Anime.js v4 Skill

Anime.js is a fast, lightweight JavaScript animation engine. Version 4.0.0 is a complete rewrite with a new API.

- **Website**: https://animejs.com
- **Documentation**: https://animejs.com/documentation/
- **Easing Editor**: https://animejs.com/easing-editor
- **GitHub**: https://github.com/juliangarnier/anime

---

## Installation

```bash
npm install animejs
```

---

## Module Imports

### From the main module (recommended with bundlers like Vite)

```js
import { animate, createTimeline, createScope, stagger, spring } from 'animejs';
```

### From subpaths (for smaller bundles without tree-shaking)

```js
import { animate } from 'animejs/animation';
import { createTimer } from 'animejs/timer';
import { createTimeline } from 'animejs/timeline';
import { createAnimatable } from 'animejs/animatable';
import { createDraggable } from 'animejs/draggable';
import { createLayout } from 'animejs/layout';
import { createScope } from 'animejs/scope';
import { engine } from 'animejs/engine';
import * as events from 'animejs/events';
import * as easings from 'animejs/easings';
import * as utils from 'animejs/utils';
import * as svg from 'animejs/svg';
import * as text from 'animejs/text';
import * as waapi from 'animejs/waapi';
```

---

## Core API Reference

### 1. `animate()` — Basic Animation

The primary function. Animates CSS properties, transforms, attributes, or JS objects.

```js
import { animate } from 'animejs';

// Basic usage
animate('.target', {
  translateX: 250,
  rotate: '1turn',
  opacity: 0.5,
  duration: 800,
  ease: 'outExpo',
});
```

#### Targets (1st argument)

| Type | Example |
|------|---------|
| CSS Selector | `'.box'`, `'#myId'`, `'div.item'` |
| DOM Element | `document.querySelector('.box')` |
| NodeList | `document.querySelectorAll('.box')` |
| JS Object | `{ value: 0 }` |
| Array of targets | `['.box', el, { value: 0 }]` |

#### Animatable Properties (2nd argument object)

| Category | Examples |
|----------|---------|
| CSS Properties | `opacity`, `width`, `height`, `backgroundColor`, `borderRadius`, `padding` |
| CSS Transforms | `translateX`, `translateY`, `translateZ`, `rotate`, `rotateX`, `rotateY`, `scale`, `scaleX`, `scaleY`, `skew`, `skewX`, `skewY`, `perspective` |
| CSS Variables | `'--my-var'` |
| JS Object props | Any numeric property on a plain object |
| HTML Attributes | Numeric attributes like `value`, `data-*` |
| SVG Attributes | `d`, `cx`, `cy`, `r`, `stroke-dashoffset`, etc. |

#### Tween Value Formats

```js
animate('.el', {
  // Numerical (unitless or with unit)
  translateX: 250,
  width: '100px',

  // From → To array
  opacity: [0, 1],

  // Keyframes array
  scale: [
    { to: 1.25, ease: 'inOut(3)', duration: 200 },
    { to: 1, ease: spring({ bounce: 0.7 }) }
  ],

  // Function-based (per-target values)
  rotate: (el, i, total) => i * 45,

  // Relative values (JS engine only)
  translateY: '+=100',

  // Color values
  backgroundColor: '#FF0000',
  color: 'rgb(255, 0, 0)',
  borderColor: 'hsl(120, 100%, 50%)',
});
```

#### Tween Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `to` | `number \| string` | — | End value |
| `from` | `number \| string` | — | Start value |
| `delay` | `number \| function` | `0` | Delay before tween starts (ms) |
| `duration` | `number \| function` | `1000` | Tween duration (ms) |
| `ease` | `string \| function` | `'outQuad'` | Easing function |
| `composition` | `string` | `'replace'` | How tweens compose: `'replace'`, `'add'`, `'blend'` (JS only) |
| `modifier` | `function` | — | Transform the animated value (JS only) |

#### Playback Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `delay` | `number` | `0` | Global animation delay |
| `duration` | `number` | `1000` | Animation duration |
| `loop` | `number \| boolean` | `false` | Number of loops (`true` = infinite) |
| `loopDelay` | `number` | `0` | Delay between loops (JS only) |
| `alternate` | `boolean` | `false` | Alternate direction each loop |
| `reversed` | `boolean` | `false` | Play in reverse |
| `autoplay` | `boolean` | `true` | Start automatically |
| `frameRate` | `number` | `120` | Frame rate cap (JS only) |
| `playbackRate` | `number` | `1` | Speed multiplier |
| `playbackEase` | `string` | — | Ease applied to overall progress (JS only) |
| `persist` | `boolean` | `false` | Keep WAAPI fills active (WAAPI only) |

#### Callbacks

| Callback | Description |
|----------|-------------|
| `onBegin` | Fires when animation starts (JS only) |
| `onComplete` | Fires when animation completes |
| `onUpdate` | Fires on each frame update (JS only) |
| `onBeforeUpdate` | Fires before each update (JS only) |
| `onRender` | Fires when values are rendered (JS only) |
| `onLoop` | Fires on each loop iteration (JS only) |
| `onPause` | Fires when paused (JS only) |
| `then()` | Promise-like, fires on completion |

#### Methods (returned animation instance)

| Method | Description |
|--------|-------------|
| `play()` | Start or resume playback |
| `pause()` | Pause playback |
| `restart()` | Restart from beginning |
| `reverse()` | Reverse playback direction |
| `alternate()` | Toggle direction |
| `resume()` | Resume from current position |
| `complete()` | Jump to end |
| `cancel()` | Cancel the animation |
| `revert()` | Cancel and restore original values |
| `reset()` | Reset to initial state (JS only) |
| `seek(time)` | Seek to specific time in ms |
| `stretch(newDuration)` | Stretch animation to new duration (JS only) |
| `refresh()` | Refresh targets and values (JS only) |

---

### 2. `createTimeline()` — Sequenced Animations

Chain multiple animations with precise timing control.

```js
import { createTimeline, stagger } from 'animejs';

const tl = createTimeline({
  defaults: {
    duration: 600,
    ease: 'outExpo',
  }
});

// Add animations sequentially
tl.add('.header', {
  translateY: [-50, 0],
  opacity: [0, 1],
});

tl.add('.content', {
  translateY: [30, 0],
  opacity: [0, 1],
}, '-=200'); // Overlap with previous by 200ms

tl.add('.items .item', {
  scale: [0, 1],
  delay: stagger(80),
}, '+=100'); // Start 100ms after previous ends
```

#### Timeline Position Syntax

| Syntax | Description |
|--------|-------------|
| (none) | After previous animation ends |
| `'-=200'` | 200ms before previous ends (overlap) |
| `'+=100'` | 100ms after previous ends (gap) |
| `500` | Absolute time at 500ms |
| `'<<'` | Same start as previous animation |
| `'<<=200'` | 200ms after previous starts |

#### Timeline also supports:
- All **Playback Settings** (loop, alternate, etc.)
- All **Callbacks** (onBegin, onComplete, etc.)
- All **Methods** (play, pause, restart, etc.)
- A `defaults` object that applies to all added animations

---

### 3. `createTimer()` — Callback Timer

Lightweight timer without animation targets. Useful for periodic callbacks.

```js
import { createTimer } from 'animejs';

const timer = createTimer({
  duration: 2000,
  loop: true,
  onUpdate: (self) => {
    console.log(self.progress); // 0 to 1
  },
});
```

---

### 4. `stagger()` — Staggered Values

Create incrementing values across multiple targets.

```js
import { animate, stagger } from 'animejs';

// Basic delay stagger
animate('.items .item', {
  translateY: [-20, 0],
  opacity: [0, 1],
  delay: stagger(100),        // 0ms, 100ms, 200ms, 300ms...
});

// Range stagger
animate('.items .item', {
  rotate: stagger([0, 360]),   // evenly distributed 0→360
});

// Stagger from center
animate('.items .item', {
  scale: [0, 1],
  delay: stagger(50, { from: 'center' }),
});

// Grid stagger
animate('.grid-item', {
  scale: [0, 1],
  delay: stagger(50, {
    grid: [14, 5],
    from: 'center',
    axis: 'x',
  }),
});
```

#### Stagger Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `start` | `number` | Starting value offset |
| `from` | `number \| 'first' \| 'center' \| 'last'` | Origin index or keyword |
| `reversed` | `boolean` | Reverse order |
| `ease` | `string` | Apply easing to distribution |
| `grid` | `[cols, rows]` | Enable 2D grid staggering |
| `axis` | `'x' \| 'y'` | Grid axis constraint |
| `modifier` | `function` | Transform stagger value |
| `use` | `function` | Custom stagger function |
| `total` | `number` | Override the total elements count |

---

### 5. `spring()` — Spring Easing

Create physics-based spring easings.

```js
import { animate, spring } from 'animejs';

animate('.el', {
  translateX: 250,
  ease: spring({ mass: 1, stiffness: 100, damping: 10, velocity: 0 }),
});

// Shorthand with bounce
animate('.el', {
  scale: [0, 1],
  ease: spring({ bounce: 0.7 }),
});
```

---

### 6. `createScope()` — Scoped Animations (essential for React)

Scope animations to a DOM subtree based on a root ref. **Critical for React apps.**

```js
import { createScope, animate } from 'animejs';

const scope = createScope({ root: rootRef }).add(self => {
  // All animate() calls here are scoped to rootRef's subtree
  animate('.child', { opacity: [0, 1] });

  // Register methods callable from outside
  self.add('fadeIn', () => {
    animate('.child', { opacity: [0, 1], duration: 500 });
  });
});

// Call registered methods
scope.methods.fadeIn();

// Cleanup — reverts all animations in scope
scope.revert();
```

---

### 7. `createAnimatable()` — Persistent Animatable (JS only)

Create a persistent animatable object for frequently changing properties.

```js
import { createAnimatable } from 'animejs';

const animatable = createAnimatable('.el', {
  translateX: 0,
  translateY: 0,
  duration: 500,
  ease: 'outExpo',
});

// Set values (automatically animated)
animatable.translateX = 100;
animatable.translateY = 200;
```

---

### 8. `createDraggable()` — Drag Interactions

Make elements draggable with physics-based releasing.

```js
import { createDraggable, spring } from 'animejs';

const draggable = createDraggable('.draggable', {
  container: '.container',                   // constrain to container
  snap: 50,                                   // snap to 50px grid
  releaseEase: spring({ bounce: 0.5 }),       // bouncy release
  onDrag: (self) => console.log(self.x, self.y),
  onSettle: () => console.log('settled'),
});
```

---

### 9. `createLayout()` — FLIP Layout Animations

Animate DOM layout changes (reflows) smoothly.

```js
import { createLayout } from 'animejs';

const layout = createLayout('.container', {
  duration: 500,
  ease: 'outExpo',
  enterFrom: { opacity: 0, scale: 0.5 },
  leaveTo: { opacity: 0, scale: 0.5 },
});

// Record current state
layout.record();

// Make DOM changes...
container.appendChild(newItem);

// Animate from recorded state to new state
layout.animate();
```

---

### 10. `splitText()` — Text Splitting

Split text elements into animated characters, words, or lines.

```js
import { animate, splitText, stagger } from 'animejs';

const split = splitText('.heading');

// Animate per character
animate(split.chars, {
  opacity: [0, 1],
  translateY: [20, 0],
  delay: stagger(30),
});

// Animate per word
animate(split.words, {
  opacity: [0, 1],
  delay: stagger(50),
});
```

---

## Easing Reference

### Built-in Easings

| Easing | Usage |
|--------|-------|
| Linear | `'linear'` |
| Quad | `'inQuad'`, `'outQuad'`, `'inOutQuad'` |
| Cubic | `'inCubic'`, `'outCubic'`, `'inOutCubic'` |
| Quart | `'inQuart'`, `'outQuart'`, `'inOutQuart'` |
| Quint | `'inQuint'`, `'outQuint'`, `'inOutQuint'` |
| Sine | `'inSine'`, `'outSine'`, `'inOutSine'` |
| Expo | `'inExpo'`, `'outExpo'`, `'inOutExpo'` |
| Circ | `'inCirc'`, `'outCirc'`, `'inOutCirc'` |
| Back | `'inBack'`, `'outBack'`, `'inOutBack'` |
| Elastic | `'inElastic'`, `'outElastic'`, `'inOutElastic'` |
| Bounce | `'inBounce'`, `'outBounce'`, `'inOutBounce'` |
| Spring | `spring({ mass, stiffness, damping, velocity, bounce })` |
| Parametric | `'in(3)'`, `'out(4)'`, `'inOut(2)'` — custom exponent |

Use the [easing editor](https://animejs.com/easing-editor) to preview and customize.

---

## Using with React — Complete Pattern

> [!IMPORTANT]
> Always use `createScope()` with a root ref and clean up with `scope.revert()` in the effect cleanup. This ensures animations are properly scoped and cleaned up on unmount.

```tsx
import { useEffect, useRef } from 'react';
import { animate, createScope, stagger, spring } from 'animejs';

function AnimatedComponent() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // All animations here are scoped to the root ref
      animate('.fade-in', {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100),
        duration: 600,
        ease: 'outExpo',
      });

      // Register reusable methods
      self.add('highlight', () => {
        animate('.highlight-target', {
          scale: [
            { to: 1.1, duration: 150 },
            { to: 1, ease: spring({ bounce: 0.5 }) },
          ],
        });
      });
    });

    // Cleanup on unmount
    return () => scope.current?.revert();
  }, []);

  const handleClick = () => {
    scope.current?.methods.highlight();
  };

  return (
    <div ref={root}>
      <h1 className="fade-in">Hello</h1>
      <p className="fade-in">World</p>
      <button className="fade-in highlight-target" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
```

### Key React Rules

1. **Always use `createScope()`** — never call `animate()` at top level in React
2. **Always clean up** — return `scope.current.revert()` from your `useEffect`
3. **Use refs for root** — pass `{ root: rootRef }` to `createScope()`
4. **Register methods** — use `self.add('name', fn)` for functions called outside the effect
5. **Call methods via `scope.current.methods.name()`** from event handlers

---

## Common Animation Recipes

### Fade in on mount
```js
animate('.el', {
  opacity: [0, 1],
  translateY: [20, 0],
  duration: 600,
  ease: 'outExpo',
});
```

### Staggered list entrance
```js
animate('.list-item', {
  opacity: [0, 1],
  translateX: [-30, 0],
  delay: stagger(80, { ease: 'outQuad' }),
  duration: 500,
  ease: 'outExpo',
});
```

### Pulse / heartbeat
```js
animate('.pulse', {
  scale: [1, 1.15, 1],
  duration: 800,
  loop: true,
  ease: 'inOutSine',
});
```

### Number counter
```js
const obj = { count: 0 };
animate(obj, {
  count: 1000,
  duration: 2000,
  ease: 'outExpo',
  onUpdate: () => {
    el.textContent = Math.round(obj.count);
  },
});
```

### SVG path drawing
```js
import { animate } from 'animejs';

animate('path', {
  strokeDashoffset: [animate.setDashoffset, 0],
  duration: 2000,
  ease: 'inOutSine',
});
```

### Morphing with keyframes
```js
animate('.el', {
  translateX: [
    { to: 100, duration: 500  },
    { to: 200, duration: 300  },
    { to: 150, duration: 400  },
  ],
  rotate: [
    { to: 45,  duration: 500  },
    { to: 90,  duration: 300  },
    { to: 0,   duration: 400  },
  ],
});
```

### Scroll-triggered entrance (with IntersectionObserver)
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animate(entry.target, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        ease: 'outExpo',
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## Tips

- Use `'outExpo'` or `'outQuart'` for smooth deceleration
- Use `spring()` for natural, bouncy motion
- Use `stagger()` for sequential multi-element effects
- Keep durations between 300–800ms for UI animations
- Use `autoplay: false` + `.play()` for on-demand animations
- Always call `.revert()` to clean up (especially in React/SPA)
- Use the [easing editor](https://animejs.com/easing-editor) to visualize easings
