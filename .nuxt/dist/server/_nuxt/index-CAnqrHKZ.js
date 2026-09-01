import { u as useHead, K as useNuxtData, c as __nuxt_component_1 } from "../server.mjs";
import { _ as __nuxt_component_1$1 } from "./VoiceCapture-DHH8Pf3F.js";
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "tailwindcss/colors";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "ohash/utils";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
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
    computed(() => charts_lead?.value?.monthly);
    const firstName = computed(() => (user.value?.name || "").split(" ")[0] || "");
    const today = computed(
      () => (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
      })
    );
    const heroLine = computed(() => {
      const t = briefing.value?.totals;
      if (!t || t.total === 0) return "You’re all caught up today.";
      const n = t.total;
      return n === 1 ? "One person is waiting to hear from you." : `${n} people are waiting to hear from you.`;
    });
    const pipeline = computed(() => {
      const all = leads.value?.all ?? [];
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
      () => (leads.value?.all ?? []).filter((l) => !["closed", "archive"].includes(l.status)).length
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_1;
      const _component_appVoiceCapture = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1240px] mx-auto" }, _attrs))} data-v-41452c63><section class="gf-hero relative -mx-6 sm:-mx-10 lg:-mx-12 px-6 sm:px-10 lg:px-12 mb-24" data-v-41452c63>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="relative z-[2] py-16 sm:py-24" data-v-41452c63><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}" data-v-41452c63>${ssrInterpolate(unref(today))}`);
      if (unref(firstName)) {
        _push(`<!--[--> — Hello, ${ssrInterpolate(unref(firstName))}<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><h1 class="gf-display text-[clamp(36px,5.2vw,68px)] max-w-[15ch] mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".14s" })}" data-v-41452c63>${ssrInterpolate(unref(heroLine))}</h1><p class="gf-body text-[#8A847C] leading-relaxed max-w-[42ch] gf-rise" style="${ssrRenderStyle({ "--d": ".24s" })}" data-v-41452c63> Everyone below has gone quiet, come in new, or slipped past a follow-up you meant to make. Start at the top. </p></div></section><section class="gf-depth mb-28" style="${ssrRenderStyle({ "--d": ".05s" })}" data-tour="briefing" data-v-41452c63><div class="mb-8" data-v-41452c63>`);
      _push(ssrRenderComponent(_component_appVoiceCapture, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section><section class="gf-depth mb-28 grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]" data-v-41452c63><div class="bg-[#F7F4EF] p-8 transition-transform duration-500 hover:translate-z-6" data-v-41452c63><p class="gf-eyebrow mb-4" data-v-41452c63>Active leads</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-41452c63><span${ssrRenderAttr("data-count", unref(activeLeads))} data-v-41452c63>0</span></p><p class="gf-meta text-[#8A847C] mt-2.5" data-v-41452c63>Not closed or archived</p></div><div class="bg-[#F7F4EF] p-8" data-v-41452c63><p class="gf-eyebrow mb-4" data-v-41452c63>Needing attention</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-41452c63><span${ssrRenderAttr("data-count", unref(briefing)?.totals?.total ?? 0)} data-v-41452c63>0</span></p><p class="gf-meta text-[#8A847C] mt-2.5" data-v-41452c63>Surfaced in today’s briefing</p></div><div class="bg-[#F7F4EF] p-8" data-v-41452c63><p class="gf-eyebrow mb-4" data-v-41452c63>Going cold</p><p class="font-display text-[44px] font-semibold leading-none tabular-nums" data-v-41452c63><span${ssrRenderAttr("data-count", unref(briefing)?.totals?.cold ?? 0)} data-v-41452c63>0</span></p><p class="gf-meta text-[#8A847C] mt-2.5" data-v-41452c63>Quiet past your threshold</p></div></section><section class="gf-depth mb-28" data-v-41452c63><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-41452c63><span class="gf-eyebrow" data-v-41452c63>02 — Pipeline</span><span class="font-display gf-title font-semibold tracking-tight" data-v-41452c63>Where everyone stands</span></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#DDD6C9] border border-[#DDD6C9]" data-v-41452c63><!--[-->`);
      ssrRenderList(unref(pipeline), (stage, i) => {
        _push(`<div class="bg-[#F7F4EF] p-7" data-v-41452c63><p class="font-display text-[34px] font-semibold tabular-nums mb-2" data-v-41452c63><span${ssrRenderAttr("data-count", stage.value)} data-v-41452c63>0</span></p><p class="gf-label uppercase tracking-[0.14em] text-[#8A847C]" data-v-41452c63>${ssrInterpolate(stage.label)}</p><div class="h-0.5 bg-[#DDD6C9] mt-4 overflow-hidden" data-v-41452c63><i class="gf-bar block h-full bg-[#B5563A] origin-left" style="${ssrRenderStyle({ "--w": stage.ratio, "--bd": `${0.1 * i}s` })}" data-v-41452c63></i></div></div>`);
      });
      _push(`<!--]--></div></section><section class="gf-depth mb-28" data-v-41452c63><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-41452c63><span class="gf-eyebrow" data-v-41452c63>03 — Trend</span><span class="font-display gf-title font-semibold tracking-tight" data-v-41452c63>Leads over time</span></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="gf-body text-[#8A847C] py-10" data-v-41452c63${_scopeId}>Loading chart data…</p>`);
          } else {
            return [
              createVNode("p", { class: "gf-body text-[#8A847C] py-10" }, "Loading chart data…")
            ];
          }
        })
      }, _parent));
      _push(`</section><section class="gf-depth" data-v-41452c63><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8" data-v-41452c63><span class="gf-eyebrow" data-v-41452c63>04 — Everyone</span><span class="font-display gf-title font-semibold tracking-tight" data-v-41452c63>All leads</span></div>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41452c63"]]);
export {
  index as default
};
//# sourceMappingURL=index-CAnqrHKZ.js.map
