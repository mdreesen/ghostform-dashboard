import { _ as __nuxt_component_0$1 } from './Base-nVsy7JGX.mjs';
import { u as useHead, h as useNuxtData, _ as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Pricing",
  __ssrInlineRender: true,
  props: {
    stripe: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const { data: user } = useNuxtData("user");
    const tiers = [
      {
        name: "Shadow",
        price: "25",
        description: "Light, entry-level, perfect for the solo agent just starting with QR capture.",
        features: ["Unlimited leads", "Advanced 90% Compression", "Custom Branding", "Conditional Logic", "Priority Email Support"],
        cta: "Get Started",
        color: "cyan-500",
        stripe: `https://buy.stripe.com/9B6fZj0fNazkerT6dZ3wQ00?client_reference_id=${user.value.id}`,
        highlighted: true
      },
      {
        name: "Phantom",
        price: "50",
        description: 'Powerful, ever-present, the "standard" for high-volume producers.',
        features: ["Unlimited leads", "Advanced 90% Compression", "Custom Branding", "Conditional Logic", "Priority Email Support"],
        cta: "Get Started",
        color: "blue-500",
        stripe: `https://buy.stripe.com/7sY5kFe6Dazk5Vn7i33wQ01?client_reference_id=${user.value.id}`,
        highlighted: false
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderBase = __nuxt_component_0$1;
      const _component_nuxtLink = __nuxt_component_0$2;
      const _component_nuxt_link = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ id: "pricing" }, _attrs))}><div class="max-w-4xl mx-auto text-center mb-20 reveal">`);
      _push(ssrRenderComponent(_component_baseHeaderBase, { text: "Choose your level of presence." }, null, _parent));
      _push(`<p class="text-zinc-400 text-lg">No hidden fees. Just weightless data and spectral speed.</p></div><div class="max-w-4xl mx-auto flex flex-wrap gap-8 items-center justify-center"><!--[-->`);
      ssrRenderList(tiers, (tier) => {
        _push(`<div class="${ssrRenderClass([
          "relative p-8 rounded-[2.5rem] transition-all duration-500 border reveal max-w-sm",
          tier.highlighted ? "bg-zinc-900 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.15)] scale-105 z-10" : "bg-zinc-950/50 border-white hover:border-white/20"
        ])}">`);
        if (tier.highlighted) {
          _push(`<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full"> Most Popular </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-8"><h3 class="text-xl font-bold mb-2">${ssrInterpolate(tier.name)}</h3><div class="flex items-baseline gap-1"><span class="text-4xl font-black tracking-tight">$</span><span class="text-6xl font-black tracking-tight">${ssrInterpolate(tier.price)}</span><span class="text-zinc-500 text-sm">/mo</span></div><p class="mt-4 text-zinc-400 text-sm leading-relaxed">${ssrInterpolate(tier.description)}</p></div><ul class="space-y-4 mb-10"><!--[-->`);
        ssrRenderList(tier.features, (feature) => {
          _push(`<li class="flex items-center gap-3 text-sm text-zinc-300"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"${ssrRenderAttr("stroke", tier.highlighted ? "#22d3ee" : "#52525b")} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg> ${ssrInterpolate(feature)}</li>`);
        });
        _push(`<!--]--></ul>`);
        if (__props.stripe) {
          _push(ssrRenderComponent(_component_nuxtLink, {
            to: tier.stripe
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="${ssrRenderClass([
                  "w-full py-4 rounded-2xl font-black transition-all transform active:scale-95",
                  tier.highlighted ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                ])}"${_scopeId}>${ssrInterpolate(tier.cta)}</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: [
                      "w-full py-4 rounded-2xl font-black transition-all transform active:scale-95",
                      tier.highlighted ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    ]
                  }, toDisplayString(tier.cta), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_nuxt_link, { to: "/signup" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="${ssrRenderClass([
                  "w-full py-4 rounded-2xl font-black transition-all transform active:scale-95",
                  tier.highlighted ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                ])}"${_scopeId}>${ssrInterpolate(tier.cta)}</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: [
                      "w-full py-4 rounded-2xl font-black transition-all transform active:scale-95",
                      tier.highlighted ? "bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    ]
                  }, toDisplayString(tier.cta), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Pricing.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppPricing" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "subscribe",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Subscribe",
      meta: [
        { name: "Subscribe", content: "GhostForm Subscribe" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appPricing = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_appPricing, { stripe: "" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(payment)/subscribe.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=subscribe-DIjeKx2l.mjs.map
