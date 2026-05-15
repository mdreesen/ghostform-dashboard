import { _ as __nuxt_component_1$1 } from "./Auth-BV9RYU2X.js";
import { defineComponent, mergeProps, useSSRContext, unref } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as __nuxt_component_6 } from "./Table-CmHAbaK9.js";
import { d as useNuxtData } from "../server.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/scule/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "@tanstack/vue-table";
import "@tanstack/vue-virtual";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "tailwindcss/colors";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
import "ohash/utils";
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
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "BaseButton" });
function exportLeadsCSV(leads) {
  const headers = ["Name", "Email", "Phone", "Age", "Address", "Status", "Date", "buy | sell | both", "Estimated home price", "Sqft", "Bedrooms", "Bathrooms", "Budget"];
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.phone,
    lead.age,
    lead.address,
    lead.status,
    lead.date,
    lead.buy_sell_both,
    lead.price,
    lead.sqft,
    lead.bedrooms,
    lead.bathrooms,
    lead.budget.toString().replace(/[^0-9.-]+/g, "")
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: leads } = useNuxtData("leads");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderAuth = __nuxt_component_1$1;
      const _component_baseButton = __nuxt_component_1;
      const _component_baseTable = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden" }, _attrs))}><div class="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#30cf43] rounded-full blur-[180px] opacity-[0.03]"></div><main class="max-w-7xl mx-auto relative z-10"><header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"><div>`);
      _push(ssrRenderComponent(_component_baseHeaderAuth, {
        text: "LEAD ARCHIVE",
        subText: "Intake Intelligence"
      }, null, _parent));
      _push(`</div><div class="flex gap-4">`);
      _push(ssrRenderComponent(_component_baseButton, {
        onClick: ($event) => unref(exportLeadsCSV)(unref(leads)),
        text: "EXPORT CSV"
      }, null, _parent));
      _push(`</div></header><div class="backdrop-blur-2xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden shadow-2xl">`);
      _push(ssrRenderComponent(_component_baseTable, { data: unref(leads) }, null, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CX8QAs_O.js.map
