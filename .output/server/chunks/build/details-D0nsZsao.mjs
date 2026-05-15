import { _ as __nuxt_component_1 } from './Auth-BV9RYU2X.mjs';
import { _ as __nuxt_component_1$1 } from './ButtonNavigate-BydwpjZB.mjs';
import { _ as __nuxt_component_5 } from './Section-B46_LQt-.mjs';
import { a as useRoute, b as useFetch, c as __nuxt_component_3$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
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
  __name: "details",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data, pending: pending_data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/leads/${route.params.id}`,
      "$H-3835jjPy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const lead = ref(data.value);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      const _component_baseHeaderAuth = __nuxt_component_1;
      const _component_baseButtonNavigate = __nuxt_component_1$1;
      const _component_baseHeaderSection = __nuxt_component_5;
      const _component_ClientOnly = __nuxt_component_3$1;
      if (!unref(pending_data)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden" }, _attrs))}><main class="max-w-5xl mx-auto relative z-10"><section class="flex flex-wrap gap-8 mb-12"><div><div class="flex items-center gap-6">`);
        _push(ssrRenderComponent(_component_baseHeaderAuth, {
          text: (_a = unref(lead)) == null ? void 0 : _a.name
        }, null, _parent));
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          class: "w-25",
          text: "Edit",
          path: `/dashboard/leads/${unref(route).params.id}/edit`
        }, null, _parent));
        _push(`</div><div class="flex flex-wrap gap-6 mt-5 text-zinc-400"><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, {
          text: "Email",
          subText: (_b = unref(lead)) == null ? void 0 : _b.email
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, {
          text: "Phone",
          subText: (_c = unref(lead)) == null ? void 0 : _c.phone
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, {
          text: "Address",
          subText: (_d = unref(lead)) == null ? void 0 : _d.address
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, {
          text: "Status",
          subText: (_e = unref(lead)) == null ? void 0 : _e.status
        }, null, _parent));
        _push(`</div></div></div></section><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><div class="lg:col-span-4 space-y-8"><div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Lead Submission" }, null, _parent));
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList({
          "Est. Value": ((_f = unref(lead)) == null ? void 0 : _f.price) ? `$${(_h = (_g = unref(lead)) == null ? void 0 : _g.price) == null ? void 0 : _h.toLocaleString()}` : "",
          "Budget": `$${(_k = (_j = (_i = unref(lead)) == null ? void 0 : _i.budget) == null ? void 0 : _j.toLocaleString()) != null ? _k : ""}`,
          "Sq Footage": ((_l = unref(lead)) == null ? void 0 : _l.sqft) ? `${(_m = unref(lead)) == null ? void 0 : _m.sqft} ft\xB2` : "",
          "Intent (Buy, Sell, or Both)": (_n = unref(lead)) == null ? void 0 : _n.buy_sell_both
        }, (val, label) => {
          _push(`<div class="flex justify-between items-end border-b border-white/5 pb-2"><span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">${ssrInterpolate(label)}</span><span class="text-sm font-bold">${ssrInterpolate(val)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Other Details" }, null, _parent));
        _push(`<p class="text-sm text-zinc-300 leading-relaxed italic-none">&quot;${ssrInterpolate(((_o = unref(lead)) == null ? void 0 : _o.message) ? (_p = unref(lead)) == null ? void 0 : _p.message : "No other details")}&quot;</p></div></div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div></main></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/[id]/details.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=details-D0nsZsao.mjs.map
