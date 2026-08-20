import { _ as __nuxt_component_1$1 } from './Navigate-B_PGVHvu.mjs';
import { _ as __nuxt_component_0, a as _sfc_main$4 } from './Modal-BDoaUPlC.mjs';
import { u as useHead, K as useNuxtData, q as _sfc_main$8, _ as __nuxt_component_0$1, w as reactivePick, L as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, ref, withCtx, createVNode, createTextVNode, useAttrs, toRef, h, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderVNode } from 'vue/server-renderer';
import { G as defu } from '../nitro/nitro.mjs';
import { encode } from 'uqr';
import './utils-y1felsNN.mjs';
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
import 'mongoose';
import 'openai';
import 'resend';
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
    description: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    badge: {
      type: String,
      default: ""
    },
    badgeClass: {
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
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const address = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderSection = __nuxt_component_0;
      const _component_UModal = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_baseQrCode = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<!--[--><div class="absolute inset-0 bg-radial from-slate-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div><div class="flex items-start gap-4 max-w-2xl relative z-10"><div class="p-3 bg-slate-900 border border-[#DDD6C9] text-[#8A847C] group-hover:text-[#B5563A] group-hover:border-[#DDD6C9] transition-colors shrink-0 hidden sm:block"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round"${ssrRenderAttr("d", __props.icon)}></path></svg></div><div class="space-y-1.5"><div class="flex items-center gap-3"><h3 class="text-base font-semibold text-[#1F1B16] tracking-wide group-hover:text-[#B5563A] transition-colors">${ssrInterpolate(__props.label)}</h3><span class="${ssrRenderClass([__props.badgeClass, "text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border"])}">${ssrInterpolate(__props.badge)}</span></div><p class="text-xs text-[#8A847C] leading-relaxed font-medium">${ssrInterpolate(__props.description)}</p>`);
      if (__props.data.length > 0) {
        _push(`<div class="text-center pt-2"><span>What home is this for?</span><select id="status-select" class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(unref(address)) ? ssrLooseContain(unref(address), "") : ssrLooseEqual(unref(address), "")) ? " selected" : ""}>Choose home</option><!--[-->`);
        ssrRenderList(__props.data, (item, index) => {
          _push(`<option${ssrRenderAttr("value", item.address)}${ssrIncludeBooleanAttr(Array.isArray(unref(address)) ? ssrLooseContain(unref(address), item.address) : ssrLooseEqual(unref(address), item.address)) ? " selected" : ""}>${ssrInterpolate(item.name ?? item?.address)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(address)) {
          _push(`<div class="pt-10">`);
          _push(ssrRenderComponent(_component_baseHeaderSection, {
            text: `Chosen Address<br>${unref(address)}`
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex sm:items-center gap-3 shrink-0 relative z-10 flex-row md:flex-col lg:flex-row w-full md:w-auto border-t border-[#DDD6C9]/50 md:border-none pt-4 md:pt-0">`);
      _push(ssrRenderComponent(_component_UModal, {
        fullscreen: "",
        title: `${__props.label} QR Code`
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseQrCode, {
              class: "relative top-[50%] max-w-150",
              value: `${__props.qr_code_url}${unref(address) ? `&${unref(address)}` : ""}`
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center gap-4" }, [
                createVNode(_component_baseQrCode, {
                  class: "relative top-[50%] max-w-150",
                  value: `${__props.qr_code_url}${unref(address) ? `&${unref(address)}` : ""}`
                }, null, 8, ["value"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "QR Code",
              color: "neutral",
              variant: "subtle",
              class: "bg-[#B5563A] text-[#F7F4EF] px-6 py-3 text-xs font-bold w-37.75 justify-center hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "QR Code",
                color: "neutral",
                variant: "subtle",
                class: "bg-[#B5563A] text-[#F7F4EF] px-6 py-3 text-xs font-bold w-37.75 justify-center hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.qr_code_url,
        target: "_blank",
        class: "flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 w-full border border-[#DDD6C9] hover:border-[#A9A39A] hover:bg-slate-800/40 text-[#8A847C] hover:text-[#1F1B16] text-[11px] font-semibold uppercase tracking-wider transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Launch Portal `);
          } else {
            return [
              createTextVNode(" Launch Portal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Card/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "BaseCardForm" });
function ghostFormUrl(useCategory, useSource, useId, useName, useEmail, useCalendar, options) {
  const base = "https://ghostform-zeta.vercel.app/";
  const stripHash = (c) => (c || "").replace(/^#/, "");
  const params = new URLSearchParams();
  if (useCategory) params.set("category", useCategory);
  if (useSource) params.set("source", useSource);
  if (useCategory && useId) params.set("id", useId);
  if (useName) params.set("company_name", useName);
  if (useEmail) params.set("company_email", useEmail);
  if (useCalendar) params.set("calendar", useCalendar);
  params.set("background_color", stripHash(options?.backgroundColor) || "0f0b0b");
  params.set("font_color", stripHash(options?.fontColor) || "FFFFFF");
  return `${base}?${params.toString()}`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Forms",
      meta: [{ name: "description", content: "Your lead capture forms and QR codes." }]
    });
    const { data: user } = useNuxtData("user");
    const { data: home } = useNuxtData("homes");
    const buildUrl = (source) => ghostFormUrl(
      user.value?.category,
      source,
      user.value?._id,
      user.value?.company_hashed,
      user.value?.email_hashed,
      user.value?.calendar_link
    );
    const formFunnels = computed(() => [
      {
        id: "open-house",
        label: "Open House Sign-In",
        description: "For the table by the door. Guests scan the QR code and sign in on their own phone — no clipboard, no handwriting to decipher later.",
        badge: "QR code",
        source: "open_house",
        icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        form_url: buildUrl("open_house"),
        data_home: home.value
      },
      {
        id: "house-on-market",
        label: "Listing Enquiry",
        description: "For a specific listing — put it on the sign, the flyer, or the listing page. Interested buyers leave their details and what they’re looking for.",
        badge: "Public",
        source: "on_market",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
        form_url: buildUrl("on_market"),
        data_home: home.value
      },
      {
        id: "data-entry",
        label: "Quick Entry",
        description: "For you, not the lead. Add someone you met in person or spoke to on the phone, without typing out the whole record.",
        badge: "Just for you",
        source: "data_entry",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586A1 1 0 0114 3.414L18.586 8A1 1 0 0119 8.586V19a2 2 0 01-2 2z",
        form_url: buildUrl("data_entry")
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseButtonNavigate = __nuxt_component_1$1;
      const _component_baseCardForm = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1100px] mx-auto" }, _attrs))}><header class="mb-20 pt-4"><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}">Capture</p><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6"><div><h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="${ssrRenderStyle({ "--d": ".12s" })}"> Three ways to collect a lead. </h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[48ch] gf-rise" style="${ssrRenderStyle({ "--d": ".2s" })}"> Each one asks a different set of questions. Print the QR code, share the link, or use the quick entry form yourself — every lead lands in the same place. </p></div><div class="gf-rise shrink-0" style="${ssrRenderStyle({ "--d": ".28s" })}">`);
      _push(ssrRenderComponent(_component_baseButtonNavigate, {
        text: "+ Create Lead",
        path: "/dashboard/leads/create"
      }, null, _parent));
      _push(`</div></div></header><!--[-->`);
      ssrRenderList(unref(formFunnels), (item, i) => {
        _push(`<section class="gf-depth mb-16" style="${ssrRenderStyle(`--d:${0.05 * i}s`)}"><div class="flex flex-wrap items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">${ssrInterpolate(String(i + 1).padStart(2, "0"))} — Form</span><span class="font-display text-[25px] font-semibold tracking-tight">${ssrInterpolate(item.label)}</span><span class="text-[10.5px] uppercase tracking-[0.14em] text-[#A9A39A]">${ssrInterpolate(item.badge)}</span></div><p class="text-[14.5px] text-[#8A847C] leading-relaxed max-w-[62ch] mb-8">${ssrInterpolate(item.description)}</p><div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7">`);
        _push(ssrRenderComponent(_component_baseCardForm, {
          label: item.label,
          description: item.description,
          icon: item.icon,
          badge: item.badge,
          badgeClass: "text-[#B5563A]",
          qr_code_url: item.form_url,
          data: item.data_home
        }, null, _parent));
        _push(`</div></section>`);
      });
      _push(`<!--]--></div>`);
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
//# sourceMappingURL=index-Dajmh8X8.mjs.map
