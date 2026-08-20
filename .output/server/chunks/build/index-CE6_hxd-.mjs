import { u as useHead, K as useNuxtData, c as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../nitro/nitro.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Today",
      meta: [
        { name: "description", content: "GhostForm Main Dashboard." }
      ]
    });
    const { data: user } = useNuxtData("user");
    const { data: leads } = useNuxtData("leads");
    const { data: charts_lead } = useNuxtData("charts_lead");
    const { data: briefing } = useNuxtData("briefing");
    computed(() => {
      var _a;
      return (_a = charts_lead == null ? void 0 : charts_lead.value) == null ? void 0 : _a.monthly;
    });
    const firstName = computed(() => {
      var _a;
      return (((_a = user.value) == null ? void 0 : _a.name) || "").split(" ")[0] || "";
    });
    const today = computed(
      () => (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
      })
    );
    const heroLine = computed(() => {
      var _a;
      const t = (_a = briefing.value) == null ? void 0 : _a.totals;
      if (!t || t.total === 0) return "You\u2019re all caught up today.";
      const n = t.total;
      return n === 1 ? "One person is waiting to hear from you." : `${n} people are waiting to hear from you.`;
    });
    const pipeline = computed(() => {
      var _a, _b;
      const all = (_b = (_a = leads.value) == null ? void 0 : _a.all) != null ? _b : [];
      const count = (s) => all.filter((l) => l.status === s).length;
      const stages = [
        { label: "New", value: count("new") },
        { label: "Appointment", value: count("appointment") },
        { label: "Under contract", value: count("under contract") },
        { label: "Closed", value: count("closed") }
      ];
      const max = Math.max(1, ...stages.map((s) => s.value));
      return stages.map((s) => ({ ...s, ratio: s.value / max }));
    });
    const activeLeads = computed(
      () => {
        var _a, _b;
        return ((_b = (_a = leads.value) == null ? void 0 : _a.all) != null ? _b : []).filter((l) => !["closed", "archive"].includes(l.status)).length;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1240px] mx-auto" }, _attrs))} data-v-ab5b145c><section class="gf-hero relative -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12 mb-24" data-v-ab5b145c>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="relative z-[2] py-16 sm:py-24" data-v-ab5b145c><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}" data-v-ab5b145c>${ssrInterpolate(unref(today))}`);
      if (unref(firstName)) {
        _push(`<!--[--> \u2014 Hello, ${ssrInterpolate(unref(firstName))}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><h1 class="gf-display text-[clamp(36px,5.2vw,68px)] max-w-[15ch] mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".14s" })}" data-v-ab5b145c>${ssrInterpolate(unref(heroLine))}</h1><p class="text-[16px] text-[#8A847C] leading-relaxed max-w-[42ch] gf-rise" style="${ssrRenderStyle({ "--d": ".24s" })}" data-v-ab5b145c> Everyone below has gone quiet, come in new, or slipped past a follow-up you meant to make. Start at the top. </p></div></section><section class="gf-depth mb-28" style="${ssrRenderStyle({ "--d": ".05s" })}" data-tour="briefing" data-v-ab5b145c>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section><section class="gf-depth mb-28 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]" data-v-ab5b145c><div class="bg-[#F7F4EF] p-8 transition-transform duration-500 hover:translate-z-6" data-v-ab5b145c><p class="gf-eyebrow mb-4" data-v-ab5b145c>Active leads</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-ab5b145c><span${ssrRenderAttr("data-count", unref(activeLeads))} data-v-ab5b145c>0</span></p><p class="text-[12.5px] text-[#8A847C] mt-2.5" data-v-ab5b145c>Not closed or archived</p></div><div class="bg-[#F7F4EF] p-8" data-v-ab5b145c><p class="gf-eyebrow mb-4" data-v-ab5b145c>Needing attention</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-ab5b145c><span${ssrRenderAttr("data-count", (_c = (_b = (_a = unref(briefing)) == null ? void 0 : _a.totals) == null ? void 0 : _b.total) != null ? _c : 0)} data-v-ab5b145c>0</span></p><p class="text-[12.5px] text-[#8A847C] mt-2.5" data-v-ab5b145c>Surfaced in today\u2019s briefing</p></div><div class="bg-[#F7F4EF] p-8" data-v-ab5b145c><p class="gf-eyebrow mb-4" data-v-ab5b145c>Going cold</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-ab5b145c><span${ssrRenderAttr("data-count", (_f = (_e = (_d = unref(briefing)) == null ? void 0 : _d.totals) == null ? void 0 : _e.cold) != null ? _f : 0)} data-v-ab5b145c>0</span></p><p class="text-[12.5px] text-[#8A847C] mt-2.5" data-v-ab5b145c>Quiet past your threshold</p></div></section><section class="gf-depth mb-28" data-v-ab5b145c><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-ab5b145c><span class="gf-eyebrow" data-v-ab5b145c>02 \u2014 Pipeline</span><span class="font-display text-[25px] font-semibold tracking-tight" data-v-ab5b145c>Where everyone stands</span></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6C9] border border-[#DDD6C9]" data-v-ab5b145c><!--[-->`);
      ssrRenderList(unref(pipeline), (stage, i) => {
        _push(`<div class="bg-[#F7F4EF] p-7" data-v-ab5b145c><p class="font-display text-[34px] font-semibold tabular-nums mb-2" data-v-ab5b145c><span${ssrRenderAttr("data-count", stage.value)} data-v-ab5b145c>0</span></p><p class="text-[10.5px] uppercase tracking-[0.14em] text-[#8A847C]" data-v-ab5b145c>${ssrInterpolate(stage.label)}</p><div class="h-0.5 bg-[#DDD6C9] mt-4 overflow-hidden" data-v-ab5b145c><i class="gf-bar block h-full bg-[#B5563A] origin-left" style="${ssrRenderStyle({ "--w": stage.ratio, "--bd": `${0.1 * i}s` })}" data-v-ab5b145c></i></div></div>`);
      });
      _push(`<!--]--></div></section><section class="gf-depth mb-28" data-v-ab5b145c><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-ab5b145c><span class="gf-eyebrow" data-v-ab5b145c>03 \u2014 Trend</span><span class="font-display text-[25px] font-semibold tracking-tight" data-v-ab5b145c>Leads over time</span></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-[14px] text-[#8A847C] py-10" data-v-ab5b145c${_scopeId}>Loading chart data\u2026</p>`);
          } else {
            return [
              createVNode("p", { class: "text-[14px] text-[#8A847C] py-10" }, "Loading chart data\u2026")
            ];
          }
        })
      }, _parent));
      _push(`</section><section class="gf-depth" data-v-ab5b145c><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-ab5b145c><span class="gf-eyebrow" data-v-ab5b145c>04 \u2014 Everyone</span><span class="font-display text-[25px] font-semibold tracking-tight" data-v-ab5b145c>All leads</span></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ab5b145c"]]);

export { index as default };
//# sourceMappingURL=index-CE6_hxd-.mjs.map
