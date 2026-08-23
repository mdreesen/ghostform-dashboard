import { b as useFetch, u as useHead, K as useNuxtData, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
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
  __name: "pricing",
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
        subtitle: "Solo agent",
        price: "29",
        description: "Everything you need to stop losing leads between the open house and the follow-up.",
        features: [
          "Unlimited leads and QR sign-ins",
          "Captures leads with no cell signal",
          "Tells you who to call each morning",
          "Instant alert the moment a lead comes in",
          "All three forms — open house, listing, quick entry",
          "1 automated follow-up campaign",
          "25 AI-written messages a month"
        ],
        cta: "Start free trial",
        stripe: `https://buy.stripe.com/8x2aEZe6D6j40B3cCn3wQ02?client_reference_id=${user?.value?._id}`,
        highlighted: true
      },
      {
        name: "Phantom",
        subtitle: "High volume",
        price: "59",
        description: "For agents running several listings at once who need the follow-up to happen without them.",
        // `upgrade: true` marks what you only get by moving up — rendered in the
        // accent colour so the difference is obvious at a glance.
        features: [
          { text: "Everything in Shadow" },
          { text: "Unlimited follow-up campaigns", upgrade: true },
          { text: "Unlimited AI-written messages", upgrade: true },
          { text: "A separate QR code for every listing", upgrade: true },
          { text: "Export your whole database anytime", upgrade: true },
          { text: "Same-day help from the developer", upgrade: true }
        ],
        cta: "Start free trial",
        stripe: `https://buy.stripe.com/aFaeVffaHcHs1F759V3wQ03?client_reference_id=${user?.value?._id}`,
        highlighted: false
      }
    ];
    const asFeature = (f) => typeof f === "string" ? { text: f, upgrade: false } : f;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ id: "pricing" }, _attrs))}><div class="max-w-4xl mx-auto text-center mb-20"><h2 class="gf-display text-4xl sm:text-5xl mb-4"> Choose your plan </h2><p class="text-[#8A847C] text-base leading-relaxed max-w-[42ch] mx-auto"> One saved deal pays for the year. Free for 30 days — no card to start. </p></div><div class="max-w-4xl mx-auto flex flex-wrap gap-8 items-stretch justify-center"><!--[-->`);
      ssrRenderList(tiers, (tier) => {
        _push(`<div class="${ssrRenderClass([
          "relative p-8 transition-all duration-500 border max-w-sm w-full flex flex-col",
          tier.highlighted ? "bg-[#F7F4EF] border-[#B5563A] lg:scale-105 z-10" : "bg-[#EFEAE0] border-[#DDD6C9] hover:border-[#A9A39A]"
        ])}">`);
        if (tier.highlighted) {
          _push(`<div class="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#B5563A] text-[#F7F4EF] text-[10px] font-semibold uppercase tracking-[0.14em] px-4 py-1 rounded-full"> Most Popular </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mb-8"><h3 class="font-display text-xl font-bold mb-1">${ssrInterpolate(tier.name)}</h3><span class="block text-[10.5px] uppercase tracking-[0.14em] text-[#A9A39A] mb-3">${ssrInterpolate(tier.subtitle)}</span><div class="flex items-baseline gap-1"><span class="font-display text-4xl font-semibold tracking-tight">$</span><span class="font-display text-6xl font-semibold tracking-tight leading-none tabular-nums">${ssrInterpolate(tier.price)}</span><span class="text-[#8A847C] text-sm">/mo</span></div><p class="mt-4 text-[#8A847C] text-sm leading-relaxed">${ssrInterpolate(tier.description)}</p></div><ul class="space-y-4 mb-10 flex-1"><!--[-->`);
        ssrRenderList(tier.features, (feature) => {
          _push(`<li class="${ssrRenderClass([asFeature(feature).upgrade ? "text-[#1F1B16] font-medium" : "text-[#1F1B16]", "flex items-start gap-3 text-[14px]"])}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="mt-1 shrink-0"${ssrRenderAttr("stroke", asFeature(feature).upgrade ? "#B5563A" : "#A9A39A")}><path d="M20 6 9 17l-5-5"></path></svg> ${ssrInterpolate(asFeature(feature).text)}</li>`);
        });
        _push(`<!--]--></ul>`);
        if (__props.stripe) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: tier.stripe,
            class: "mt-auto"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="${ssrRenderClass([
                  "w-full py-4 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors active:scale-[0.98]",
                  tier.highlighted ? "bg-[#B5563A] text-[#F7F4EF] hover:bg-[#9d4830]" : "bg-transparent text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#A9A39A]"
                ])}"${_scopeId}>${ssrInterpolate(tier.cta)}</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: [
                      "w-full py-4 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors active:scale-[0.98]",
                      tier.highlighted ? "bg-[#B5563A] text-[#F7F4EF] hover:bg-[#9d4830]" : "bg-transparent text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#A9A39A]"
                    ]
                  }, toDisplayString(tier.cta), 3)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/signup",
            class: "mt-auto"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button class="${ssrRenderClass([
                  "w-full py-4 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors active:scale-[0.98]",
                  tier.highlighted ? "bg-[#B5563A] text-[#F7F4EF] hover:bg-[#9d4830]" : "bg-transparent text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#A9A39A]"
                ])}"${_scopeId}>${ssrInterpolate(tier.cta)}</button>`);
              } else {
                return [
                  createVNode("button", {
                    class: [
                      "w-full py-4 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors active:scale-[0.98]",
                      tier.highlighted ? "bg-[#B5563A] text-[#F7F4EF] hover:bg-[#9d4830]" : "bg-transparent text-[#1F1B16] hover:bg-[#DDD6C9] border border-[#A9A39A]"
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
      _push(`<!--]--></div><p class="text-center text-[12.5px] text-[#A9A39A] mt-10 max-w-[46ch] mx-auto leading-relaxed"> Cancel anytime. Built and supported in Kalispell, Montana. </p></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/pricing.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppPricing" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "subscribe",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/user",
      { key: "user", lazy: true },
      "$5KbO3m_C-S"
      /* nuxt-injected */
    )), await __temp, __restore();
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
//# sourceMappingURL=subscribe-CErxWklZ.mjs.map
