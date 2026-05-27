import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { _ as __nuxt_component_1 } from './ButtonNavigate-BmwF8RfC.mjs';
import { _ as __nuxt_component_1$1 } from './Section--EyTX4mh.mjs';
import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { K as useNuxtData, c as __nuxt_component_3$1 } from './server.mjs';
import './Auth-YSaql3Au.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "button",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Button"
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: "/"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 gap-1.5 ring ring-inset ring-accented hover:bg-accented/75 active:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all" }, _attrs))}>${ssrInterpolate(__props.text)}</button>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/button.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "BaseButton" });
function exportLeadsCSV(leads) {
  const headers = ["Name", "Email", "Phone", "Age", "Address", "Status", "Date", "buy | sell | both", "Estimated home price", "Sqft", "Bedrooms", "Bathrooms", "Budget"];
  const rows = leads.map((lead) => [
    lead?.name,
    lead?.email,
    lead?.phone,
    lead?.age,
    lead?.address?.replace(/[,.]/g, ""),
    lead?.status,
    lead?.date,
    lead?.buy_sell_both,
    lead?.price,
    lead?.sqft,
    lead?.bedrooms,
    lead?.bathrooms,
    lead?.budget?.toString()?.replace(/[^0-9.-]+/g, "")
    // Strip currency symbols for spreadsheet math
  ]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = (void 0).createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `GhostForm_Leads_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  (void 0).body.appendChild(link);
  link.click();
  (void 0).body.removeChild(link);
}
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: leads } = useNuxtData("leads");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_baseHeaderSection = __nuxt_component_1$1;
      const _component_baseButton = __nuxt_component_3;
      const _component_ClientOnly = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="flex flex-wrap justify-between">`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: "Lead Archive",
        subLabel: "Intake Intelligence"
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseButtonNavigate, {
        text: "+ Create Lead",
        path: "/dashboard/leads/create"
      }, null, _parent));
      _push(`</section><main class="max-w-7xl mx-auto relative z-10"><section class="flex flex-col gap-10"><!--[-->`);
      ssrRenderList(unref(leads)?.status, (item) => {
        _push(`<div class="space-y-6 w-full"><div class="flex justify-between items-end mb-4">`);
        if (unref(leads)) {
          _push(ssrRenderComponent(_component_baseHeaderSection, {
            text: unref(capitalizeFirstLetter)(item.label)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_baseButton, {
          onClick: ($event) => unref(exportLeadsCSV)(unref(leads).new),
          text: `Export ${item?.label} csv`
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><div class="space-y-6 w-full"><div class="flex justify-between items-end mb-4">`);
      if (unref(leads)) {
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "All Leads" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_baseButton, {
        onClick: ($event) => unref(exportLeadsCSV)(unref(leads).all),
        text: "EXPORT CSV"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CnYGNFjm.mjs.map
