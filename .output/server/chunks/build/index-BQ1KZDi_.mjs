import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { _ as __nuxt_component_1 } from './Section-ArHxFPsW.mjs';
import { _ as _sfc_main$4 } from './Modal-CBaiWbYY.mjs';
import { J as useNuxtData, d as _sfc_main$8, _ as __nuxt_component_0$2, w as reactivePick, K as useRuntimeConfig } from './server.mjs';
import { defineComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, useAttrs, computed, toRef, h, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { y as defu } from '../nitro/nitro.mjs';
import { encode } from 'uqr';
import './Auth-YSaql3Au.mjs';
import './utils-BdoY2z9M.mjs';
import 'aria-hidden';
import './overlay-CjyBzL1C.mjs';
import 'vue-router';
import '@iconify/vue';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';

function getColors(options) {
  const { whiteColor = "white", blackColor = "black", invert = false } = options;
  return {
    backgroundColor: invert ? blackColor : whiteColor,
    foregroundColor: invert ? whiteColor : blackColor
  };
}
function getSize(size, pixelSize = DEFAULT_PIXEL_SIZE) {
  return {
    height: size * pixelSize,
    width: size * pixelSize
  };
}
function getRadius(radius, defRadius = DEFAULT_RADIUS) {
  const pixelRadius = typeof radius === "number" ? radius : radius?.pixel ?? defRadius;
  const outer = typeof radius === "number" ? radius : radius?.marker ?? defRadius;
  const inner = typeof radius === "number" ? radius : radius?.inner ?? outer;
  return {
    pixelRadius,
    markerRadius: {
      outer,
      inner
    }
  };
}
function getVariant(variant, defVariant = "default") {
  const pixelVariant = typeof variant === "string" ? variant : variant?.pixel || defVariant;
  const outer = typeof variant === "string" ? variant : variant?.marker || defVariant;
  const inner = typeof variant === "string" ? variant : variant?.inner || outer;
  return {
    pixelVariant,
    markerVariant: {
      outer,
      inner
    }
  };
}
function limitInput(number) {
  return Math.max(0, Math.min(1, number));
}
function renderUtils(qrSize, qrBorder) {
  const innerSize = qrSize - qrBorder;
  const markerSize = 7;
  const markerPositions = [
    [qrBorder, qrBorder],
    [qrBorder, innerSize - markerSize],
    [innerSize - markerSize, qrBorder]
  ];
  const isInMarkerRange = (value, markerStart) => value >= markerStart && value < markerStart + markerSize;
  const isMarker = (row, col) => markerPositions.some(
    ([x, y]) => isInMarkerRange(row, x) && isInMarkerRange(col, y)
  );
  const isMarkerCenter = (row, col) => markerPositions.some(
    ([x, y]) => row >= x + 2 && row <= x + 4 && col >= y + 2 && col <= y + 4
  );
  return {
    isTopLeft: (row, col) => row < markerSize && col < markerSize,
    isTopRight: (row, col) => row < markerSize && col >= innerSize - markerSize,
    isBottomLeft: (row, col) => row >= innerSize - markerSize && col < markerSize,
    isMarker,
    isMarkerCenter,
    markerPositions,
    markerCenterPositions: markerPositions.map(([x, y]) => [x + 2, y + 2])
  };
}
const DEFAULT_RADIUS = 0.5;
const DEFAULT_PADDING = 0.1;
const DEFAULT_PIXEL_SIZE = 20;
function renderDotPixel(result, border, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size + actualPadding;
        const y = row * size + actualPadding;
        svg += createDotPixel(x, y, actualSize, actualRadius, color, clampedPadding);
      }
    }
  }
  return svg;
}
function renderDotMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (i >= 1 && i <= 5 && j >= 1 && j <= 5) continue;
      const _x = i * size + x + actualPadding;
      const _y = j * size + y + actualPadding;
      svg += createDotPixel(_x, _y, actualSize, actualRadius, color, clampedPadding);
    }
  }
  return svg;
}
function renderDotMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const _x = i * size + x + actualPadding;
      const _y = j * size + y + actualPadding;
      svg += createDotPixel(_x, _y, actualSize, actualRadius, color, clampedPadding);
    }
  }
  return svg;
}
function createDotPixel(x, y, size, radius, color, padding = 0) {
  const adjustedX = x + padding;
  const adjustedY = y + padding;
  const adjustedSize = size - 2 * padding;
  return `<rect
    x="${adjustedX}"
    y="${adjustedY}"
    width="${adjustedSize}"
    height="${adjustedSize}"
    rx="${radius}"
    fill="${color}"
  />`;
}
function renderCircleMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const _size = 6 * size;
  const maxOuterRadius = _size / 2;
  const outerRadius = clampedRadius * maxOuterRadius;
  return `<rect x="${x + size / 2}" y="${y + size / 2}" width="${_size}" height="${_size}" rx="${outerRadius}" fill="none" stroke="${color}" stroke-width="${size}"/>`;
}
function renderCircleMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const _size = size * 3;
  return createDotPixel(x, y, _size, clampedRadius * _size / 2, color);
}
function renderDefaultPixel(result, border, size, color) {
  const pixelPaths = [];
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size;
        const y = row * size;
        pixelPaths.push(`M${x},${y}h${size}v${size}h-${size}z`);
      }
    }
  }
  return `<path fill="${color}" d="${pixelPaths.join("")}" shape-rendering="crispEdges"/>`;
}
function renderDefaultMarkerOuter(x, y, size, color) {
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${7 * size}v${7 * size}h-${7 * size}z M${x + 6 * size},${y + size}h-${5 * size}v${5 * size}h${5 * size}z`);
  return `<path fill="${color}" d="${outerPaths.join("")}"/>`;
}
function renderDefaultMarkerInner(x, y, size, color) {
  return `<rect x="${x}" y="${y}" width="${3 * size}" height="${3 * size}" fill="${color}"/>`;
}
function renderPixelatedPixel(result, border, size, foregroundColor) {
  const notchSize = size / 4;
  const paths = [];
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size;
        const y = row * size;
        paths.push(`M${x},${y}h${size}v${size}h-${size}z`);
        paths.push(addNotches(result.data, row, col, x, y, size, notchSize));
      }
    }
  }
  return `<g shape-rendering="crispEdges">
  <path fill="${foregroundColor}" d="${paths.join("")}"/>
</g>`;
}
function renderPixelatedMarkerOuter(x, y, size, color) {
  const notchSize = size / 4;
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${7 * size}v${7 * size}h-${7 * size}z M${x + 6 * size},${y + size}h-${5 * size}v${5 * size}h${5 * size}z M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x + 7 * size},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x},${y + 7 * size}h${notchSize}v-${notchSize}h-${notchSize}z M${x + 7 * size - notchSize},${y + 7 * size}h${notchSize}v-${notchSize}h-${notchSize}z`);
  return `<g shape-rendering="crispEdges">
  <path fill="${color}" d="${outerPaths.join("")}"/>
</g>`;
}
function renderPixelatedMarkerInner(x, y, size, color) {
  const notchSize = size / 4;
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${3 * size}v${3 * size}h-${3 * size}z M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x + 3 * size},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x},${y + 3 * size}h${notchSize}v-${notchSize}h-${notchSize}z M${x + 3 * size - notchSize},${y + 3 * size}h${notchSize}v-${notchSize}h-${notchSize}z`);
  return `<g shape-rendering="crispEdges">
  <path fill="${color}" d="${outerPaths.join("")}"/>
</g>`;
}
function addNotches(data, row, col, x, y, size, notchSize) {
  const checkPixel = (r, c) => {
    if (r < 0 || r >= data.length || c < 0 || c >= data[0].length) return false;
    return data[r][c];
  };
  let notches = "";
  if (!checkPixel(row - 1, col) && !checkPixel(row, col - 1)) {
    notches += `M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row - 1, col) && !checkPixel(row, col + 1)) {
    notches += `M${x + notchSize * 2},${y}h${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row + 0, col + 1) && !checkPixel(row + 1, col + 0)) {
    notches += `M${x + size},${y + size - notchSize}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row + 1, col) && !checkPixel(row + 0, col - 1)) {
    notches += `M${x + notchSize},${y + size - notchSize}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  return notches;
}
function renderRoundedPixel(result, border, size, color, radius = DEFAULT_RADIUS) {
  const paths = [];
  const visited = Array(result.size).fill(null).map(() => Array(result.size).fill(false));
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col] && !visited[row]?.[col]) {
        paths.push(tracePath(result.data, visited, row, col, size, actualRadius));
      }
    }
  }
  return `<path fill="${color}" d="${paths.join(" ")}"/>`;
}
function renderRoundedMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  const outerPath = createRoundedRectPath(x, y, 7 * size, 7 * size, actualRadius);
  const innerPath = createReversedRoundedRectPath(x + size, y + size, 5 * size, 5 * size, actualRadius);
  return `<path fill="${color}" d="${outerPath} ${innerPath}"/>`;
}
function renderRoundedMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  const path = createRoundedRectPath(x, y, 3 * size, 3 * size, actualRadius);
  return `<path fill="${color}" d="${path}"/>`;
}
function tracePath(data, visited, startRow, startCol, pixelSize, cornerRadius) {
  const path = [];
  const stack = [[startRow, startCol]];
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length || !data[row][col] || visited[row][col]) {
      continue;
    }
    visited[row][col] = true;
    const x = col * pixelSize;
    const y = row * pixelSize;
    const top = row > 0 && data[row - 1][col];
    const right = col < data[0].length - 1 && data[row][col + 1];
    const bottom = row < data.length - 1 && data[row + 1][col];
    const left = col > 0 && data[row][col - 1];
    path.push(createPixelPath(x, y, pixelSize, cornerRadius, { top, right, bottom, left }));
    stack.push([row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]);
  }
  return path.join(" ");
}
function createPixelPath(x, y, size, radius = DEFAULT_RADIUS, { top, right, bottom, left }) {
  const commands = [];
  const adjustedRadius = Math.min(radius, size / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  if (!left && !top) {
    commands.push(`M${x},${y + adjustedRadius}`);
    commands.push(`C${x},${y + adjustedRadius - curve} ${x + adjustedRadius - curve},${y} ${x + adjustedRadius},${y}`);
  } else {
    commands.push(`M${x},${y}`);
  }
  if (!top && !right) {
    commands.push(`L${x + size - adjustedRadius},${y}`);
    commands.push(`C${x + size - adjustedRadius + curve},${y} ${x + size},${y + adjustedRadius - curve} ${x + size},${y + adjustedRadius}`);
  } else {
    commands.push(`L${x + size},${y}`);
  }
  if (!right && !bottom) {
    commands.push(`L${x + size},${y + size - adjustedRadius}`);
    commands.push(`C${x + size},${y + size - adjustedRadius + curve} ${x + size - adjustedRadius + curve},${y + size} ${x + size - adjustedRadius},${y + size}`);
  } else {
    commands.push(`L${x + size},${y + size}`);
  }
  if (!bottom && !left) {
    commands.push(`L${x + adjustedRadius},${y + size}`);
    commands.push(`C${x + adjustedRadius - curve},${y + size} ${x},${y + size - adjustedRadius + curve} ${x},${y + size - adjustedRadius}`);
  } else {
    commands.push(`L${x},${y + size}`);
  }
  commands.push("Z");
  return commands.join(" ");
}
function createRoundedRectPath(x, y, width, height, radius = DEFAULT_RADIUS) {
  const adjustedRadius = Math.min(radius, Math.min(width, height) / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  return [
    `M${x + adjustedRadius},${y}`,
    `H${x + width - adjustedRadius}`,
    `C${x + width - adjustedRadius + curve},${y} ${x + width},${y + adjustedRadius - curve} ${x + width},${y + adjustedRadius}`,
    `V${y + height - adjustedRadius}`,
    `C${x + width},${y + height - adjustedRadius + curve} ${x + width - adjustedRadius + curve},${y + height} ${x + width - adjustedRadius},${y + height}`,
    `H${x + adjustedRadius}`,
    `C${x + adjustedRadius - curve},${y + height} ${x},${y + height - adjustedRadius + curve} ${x},${y + height - adjustedRadius}`,
    `V${y + adjustedRadius}`,
    `C${x},${y + adjustedRadius - curve} ${x + adjustedRadius - curve},${y} ${x + adjustedRadius},${y}`,
    "Z"
  ].join(" ");
}
function createReversedRoundedRectPath(x, y, width, height, radius = DEFAULT_RADIUS) {
  const adjustedRadius = Math.min(radius, Math.min(width, height) / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  return [
    `M${x + width - adjustedRadius},${y}`,
    `H${x + adjustedRadius}`,
    `C${x + adjustedRadius - curve},${y} ${x},${y + adjustedRadius - curve} ${x},${y + adjustedRadius}`,
    `V${y + height - adjustedRadius}`,
    `C${x},${y + height - adjustedRadius + curve} ${x + adjustedRadius - curve},${y + height} ${x + adjustedRadius},${y + height}`,
    `H${x + width - adjustedRadius}`,
    `C${x + width - adjustedRadius + curve},${y + height} ${x + width},${y + height - adjustedRadius + curve} ${x + width},${y + height - adjustedRadius}`,
    `V${y + adjustedRadius}`,
    `C${x + width},${y + adjustedRadius - curve} ${x + width - adjustedRadius + curve},${y} ${x + width - adjustedRadius},${y}`,
    "Z"
  ].join(" ");
}
function renderMarkers(result, border = 1, size, color, variant, radius, padding) {
  const { markerPositions } = renderUtils(result.size, border);
  let svg = "";
  markerPositions.forEach(([row, col]) => {
    const ox = col * size;
    const oy = row * size;
    const ix = ox + 2 * size;
    const iy = oy + 2 * size;
    svg += markerOuterVariants(variant.outer, ox, oy, size, color, radius?.outer, padding);
    svg += markerInnerVariants(variant.inner, ix, iy, size, color, radius?.inner, padding);
  });
  return svg;
}
function markerOuterVariants(variant = "default", x, y, size, color, radius, padding) {
  switch (variant) {
    case "dots":
      return renderDotMarkerOuter(x, y, size, color, radius, padding);
    case "circle":
      return renderCircleMarkerOuter(x, y, size, color, radius);
    case "rounded":
      return renderRoundedMarkerOuter(x, y, size, color, radius);
    case "pixelated":
      return renderPixelatedMarkerOuter(x, y, size, color);
    case "default":
    default:
      return renderDefaultMarkerOuter(x, y, size, color);
  }
}
function markerInnerVariants(variant = "default", x, y, size, color, radius, padding) {
  switch (variant) {
    case "dots":
      return renderDotMarkerInner(x, y, size, color, radius, padding);
    case "circle":
      return renderCircleMarkerInner(x, y, size, color, radius);
    case "rounded":
      return renderRoundedMarkerInner(x, y, size, color, radius);
    case "pixelated":
      return renderPixelatedMarkerInner(x, y, size, color);
    case "default":
    default:
      return renderDefaultMarkerInner(x, y, size, color);
  }
}
function renderPixels(result, border = 1, size, color, variant = "default", radius, padding) {
  switch (variant) {
    case "circle":
    case "dots":
      return renderDotPixel(result, border, size, color, radius, padding);
    case "rounded":
      return renderRoundedPixel(result, border, size, color, radius);
    case "pixelated":
      return renderPixelatedPixel(result, border, size, color);
    case "default":
    default:
      return renderDefaultPixel(result, border, size, color);
  }
}
function renderSVGBody(result, options = {}) {
  const {
    radius,
    pixelSize = DEFAULT_PIXEL_SIZE,
    pixelPadding,
    variant,
    border
  } = options;
  const { backgroundColor, foregroundColor } = getColors(options);
  const { width, height } = getSize(result.size, pixelSize);
  let svgBody = `<rect fill="${backgroundColor}" width="${width}" height="${height}"/>`;
  const { pixelRadius, markerRadius } = getRadius(radius);
  const { pixelVariant, markerVariant } = getVariant(variant);
  svgBody += renderPixels(result, border, pixelSize, foregroundColor, pixelVariant, pixelRadius, pixelPadding);
  svgBody += renderMarkers(result, border, pixelSize, foregroundColor, markerVariant, markerRadius, pixelPadding);
  return svgBody;
}
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Qrcode",
  __ssrInlineRender: true,
  props: {
    value: { type: [String, Array], required: true },
    width: { type: [Number, String], required: false },
    height: { type: [Number, String], required: false },
    preserveAspectRatio: { type: String, required: false },
    variant: { type: [String, Object], required: false },
    radius: { type: [Number, Object], required: false },
    pixelPadding: { type: Number, required: false },
    pixelSize: { type: Number, required: false },
    whiteColor: { type: String, required: false },
    blackColor: { type: String, required: false },
    ecc: { type: String, required: false },
    maskPattern: { type: Number, required: false },
    boostEcc: { type: Boolean, required: false },
    minVersion: { type: Number, required: false },
    maxVersion: { type: Number, required: false },
    border: { type: Number, required: false },
    invert: { type: Boolean, required: false }
  },
  emits: ["encoded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const attrs = useAttrs();
    const _options = reactivePick(props, (_, key) => key !== "value");
    const options = computed(() => {
      return defu(
        _options,
        useRuntimeConfig().public.qrcode.options
      );
    });
    const SVG = computed(() => {
      const {
        radius,
        pixelSize,
        pixelPadding,
        variant,
        width,
        height,
        preserveAspectRatio,
        whiteColor,
        blackColor,
        invert,
        ...opts
      } = options.value;
      const result = encode(toRef(() => props.value).value, {
        ...opts,
        onEncoded: (qr) => emits("encoded", qr)
      });
      const s = getSize(result.size, pixelSize);
      return h("svg", {
        ...attrs,
        xmlns: "http://www.w3.org/2000/svg",
        width,
        height,
        preserveAspectRatio,
        viewBox: `0 0 ${s.width} ${s.height}`,
        innerHTML: renderSVGBody(result, {
          radius,
          pixelSize,
          pixelPadding,
          variant,
          border: opts.border,
          whiteColor,
          blackColor,
          invert
        })
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SVG)), _attrs, null), _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-qrcode/dist/runtime/app/components/qrcode.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "QrCode",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Qrcode = _sfc_main$3;
      _push(ssrRenderComponent(_component_Qrcode, mergeProps({ value: __props.value }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/QrCode.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "BaseQrCode" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    useForm: {
      type: Object,
      default: () => {
      }
    },
    qr_code_url: {
      type: String
    },
    value: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderSection = __nuxt_component_1;
      const _component_UModal = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_baseQrCode = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: __props.label,
        class: "flex flex-col gap-4 backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: __props.label }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_UModal, {
        fullscreen: "",
        title: `${__props.label} QR Code`
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_baseQrCode, {
              class: "p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130",
              value: __props.qr_code_url
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_baseQrCode, {
                class: "p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130",
                value: __props.qr_code_url
              }, null, 8, ["value"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "QR Code",
              color: "neutral",
              variant: "subtle",
              class: "bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "QR Code",
                color: "neutral",
                variant: "subtle",
                class: "bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.qr_code_url,
        class: "flex items-center gap-3 group text-cyan-400 underline",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Open Standalone Form `);
          } else {
            return [
              createTextVNode(" Open Standalone Form ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-3xl font-bold tabular-nums">${ssrInterpolate(__props.value)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Card/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "BaseCardForm" });
function ghostFormUrl(useCategory, useSource, useId, useName, useEmail, useCalendar) {
  const category = useCategory ? `category=${useCategory}` : "";
  const source = useSource ? `&source=${useSource}` : "";
  const id = useCategory ? `id=${useId}` : "";
  const email = useEmail ? `&company_email=${useEmail}` : "";
  const name = useName ? `&company_name=${useName}` : "";
  const calendar = useCalendar ? `&calendar=${useCalendar}` : "";
  return `https://ghostform-zeta.vercel.app/?${category}${source}${id}${name}${email}${calendar}&background_color=0f0b0b&font_color=FFFFFF`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: user } = useNuxtData("user");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_baseHeaderSection = __nuxt_component_1;
      const _component_baseCardForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: "Forms",
        subLabel: "Form Selection"
      }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Select available forms" }, null, _parent));
      _push(`<section class="flex flex-wrap justify-between gap-6">`);
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "Data Entry",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "default", unref(user)?._id, unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "Open House",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "open_house", unref(user)?._id, unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "House On Market",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "on_market", unref(user)?._id, unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(`</section></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/forms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BQ1KZDi_.mjs.map
