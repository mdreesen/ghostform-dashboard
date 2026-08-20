import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ref, computed, useSSRContext } from 'vue';
import { K as useNuxtData } from './server.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: home } = useNuxtData("homes");
    const homes = ref(home.value ?? []);
    const isLoading = ref(true);
    const searchQuery = ref("");
    const statusFilter = ref("all");
    const filteredHomes = computed(() => {
      return homes.value.filter((home2) => {
        const matchString = `${home2.title} ${home2.addressDetails?.fullAddress} ${home2.addressDetails?.zipCode}`.toLowerCase();
        const matchesSearch = matchString.includes(searchQuery.value.toLowerCase());
        const matchesStatus = statusFilter.value === "all" || home2.status === statusFilter.value;
        return matchesSearch && matchesStatus;
      });
    });
    function formatCurrency(value) {
      if (!value) return "$0";
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-6xl mx-auto space-y-6"><header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5"><div class="space-y-0.5"><h1 class="text-xl font-semibold tracking-tight text-[#1F1B16]">Property Model Inventory</h1><p class="text-xs text-gray-400 font-medium">Manage and refer to your standardized real estate models for dynamic content repurposing.</p></div><button class="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-[#1F1B16] font-extrabold text-xs uppercase tracking-wider shadow-xs transition-all active:scale-[0.99] gap-2 self-start md:self-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg> Add New Home </button></header><div class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3 border border-gray-100 shadow-xs"><div class="relative w-full sm:max-w-xs"><span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></span><input type="text"${ssrRenderAttr("value", searchQuery.value)} placeholder="Search matching listings..." class="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-100 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors"></div><div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end"><div class="flex items-center gap-1.5 bg-gray-50 p-1 border border-gray-100 text-[11px] font-bold"><button class="${ssrRenderClass([statusFilter.value === "all" ? "bg-white text-[#1F1B16] shadow-xs" : "text-gray-400", "px-2.5 py-1 rounded-lg transition-all"])}">All</button><button class="${ssrRenderClass([statusFilter.value === "active" ? "bg-white text-[#1F1B16] shadow-xs" : "text-gray-400", "px-2.5 py-1 rounded-lg transition-all"])}">Active</button><button class="${ssrRenderClass([statusFilter.value === "sold" ? "bg-white text-[#1F1B16] shadow-xs" : "text-gray-400", "px-2.5 py-1 rounded-lg transition-all"])}">Sold</button></div><span class="text-[10px] font-mono font-semibold uppercase text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-lg"> Total: ${ssrInterpolate(filteredHomes.value.length)}</span></div></div>`);
      if (isLoading.value) {
        _push(`<div class="py-32 text-center space-y-3"><div class="w-8 h-8 border-[3px] border-gray-100 border-t-gray-900 rounded-full animate-spin mx-auto"></div><p class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Hydrating property vault components...</p></div>`);
      } else if (filteredHomes.value.length === 0) {
        _push(`<div class="py-24 text-center border border-dashed border-gray-200 bg-white space-y-4"><div class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400 border border-gray-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 005.25 19.5h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5H5.25M10.5 6h3m-3 3h3m-3 3h3m-3 3h3M4.5 19.5h15"></path></svg></div><div class="space-y-1"><h3 class="text-xs font-semibold text-gray-700 uppercase tracking-wide">No Properties Found</h3><p class="text-[11px] text-gray-400 max-w-70 mx-auto leading-normal">Adjust your lookup values or populate your array map with a brand-new inventory entry card.</p></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"><!--[-->`);
        ssrRenderList(filteredHomes.value, (home2) => {
          _push(`<div class="bg-white border border-gray-100 p-5 shadow-xs flex flex-col justify-between group hover:border-gray-300 transition-all hover:shadow-md"><div class="space-y-4"><div class="flex items-start justify-between gap-2"><div class="space-y-0.5 max-w-[70%]"><h3 class="font-extrabold text-sm text-[#1F1B16] group-hover:text-[#B5563A] transition-colors truncate"${ssrRenderAttr("title", home2.title)}>${ssrInterpolate(home2.title || "Unnamed Listing")}</h3><p class="text-[10px] font-mono text-gray-400">ID: #${ssrInterpolate(home2._id.substring(18))}</p></div><span class="${ssrRenderClass([home2.status === "sold" ? "bg-gray-100 text-gray-500" : "bg-emerald-50 text-emerald-600 border-emerald-100", "text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border"])}">${ssrInterpolate(home2.status || "Active")}</span></div><div class="p-3.5 bg-gray-50/80 space-y-3 border border-gray-50"><div class="text-xs flex gap-2.5 items-start"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg><div class="space-y-0.5"><p class="text-[9px] font-semibold uppercase tracking-wider text-gray-400 leading-none">Mapbox Verified Address</p><p class="font-bold text-gray-700 leading-snug">${ssrInterpolate(home2.addressDetails?.fullAddress || "Address field unmapped.")}</p></div></div><div class="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px] font-medium text-gray-400"><div>City: <span class="text-gray-700 font-bold">${ssrInterpolate(home2.addressDetails?.city || "N/A")}</span></div><div>Zip Code: <span class="text-gray-700 font-mono font-bold">${ssrInterpolate(home2.addressDetails?.zipCode || "N/A")}</span></div></div></div></div><div class="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between gap-4"><span class="text-base font-semibold tracking-tight text-[#1F1B16]">${ssrInterpolate(formatCurrency(home2.price))}</span><div class="flex items-center gap-1.5"><button class="px-3 py-2 border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-[#1F1B16] text-[10px] font-semibold uppercase tracking-wider transition-colors"> Modify </button><button class="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-[#1F1B16] text-[10px] font-semibold uppercase tracking-wider transition-colors"> Launch Lead Run </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C-LMPpcO.mjs.map
