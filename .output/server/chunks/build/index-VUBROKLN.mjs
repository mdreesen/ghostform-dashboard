import { _ as __nuxt_component_1 } from './Navigate-B_PGVHvu.mjs';
import { u as useHead, b as useFetch, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "GhostForm | Properties",
      meta: [{ name: "description", content: "The listings you can attach to a capture form." }]
    });
    const { data: homes, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/homes",
      { key: "homes", lazy: true },
      "$WguXEwSQ9k"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useToast();
    const search = ref("");
    const statusFilter = ref("all");
    const busyId = ref(null);
    const list = computed(() => homes.value ?? []);
    const filtered = computed(
      () => list.value.filter((h) => {
        const hay = `${h.name ?? ""} ${h.address ?? ""} ${h.owner ?? ""}`.toLowerCase();
        const matchesSearch = hay.includes(search.value.toLowerCase().trim());
        const status = h.status || "active";
        const matchesStatus = statusFilter.value === "all" || status === statusFilter.value;
        return matchesSearch && matchesStatus;
      })
    );
    const activeCount = computed(
      () => list.value.filter((h) => (h.status || "active") === "active").length
    );
    const STATUS_LABEL = {
      active: "Active",
      pending: "Pending",
      sold: "Sold"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1100px] mx-auto" }, _attrs))} data-v-a4c77a3d><header class="mb-16 pt-4" data-v-a4c77a3d><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}" data-v-a4c77a3d>Properties</p><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6" data-v-a4c77a3d><div data-v-a4c77a3d><h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="${ssrRenderStyle({ "--d": ".12s" })}" data-v-a4c77a3d> The listings you&#39;re working. </h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="${ssrRenderStyle({ "--d": ".2s" })}" data-v-a4c77a3d>`);
      if (unref(list).length) {
        _push(`<!--[-->${ssrInterpolate(unref(activeCount))} active. Add one here and it appears in the property picker on your forms, so every lead is tagged to the right listing. <!--]-->`);
      } else {
        _push(`<!--[--> Add a listing here and you&#39;ll be able to attach it to an open house QR code — so you know which property each lead came from. <!--]-->`);
      }
      _push(`</p></div><div class="gf-rise shrink-0" style="${ssrRenderStyle({ "--d": ".28s" })}" data-v-a4c77a3d>`);
      _push(ssrRenderComponent(_component_baseButtonNavigate, {
        text: "+ Add a property",
        path: "/dashboard/home/create"
      }, null, _parent));
      _push(`</div></div></header>`);
      if (unref(list).length) {
        _push(`<section class="gf-depth mb-10" data-v-a4c77a3d><div class="flex flex-col sm:flex-row gap-4 sm:items-center justify-between" data-v-a4c77a3d><input${ssrRenderAttr("value", unref(search))} placeholder="Search by address, nickname or owner…" class="w-full sm:max-w-xs bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A] transition-colors" data-v-a4c77a3d><div class="flex gap-2" data-v-a4c77a3d><!--[-->`);
        ssrRenderList(["all", "active", "pending", "sold"], (s) => {
          _push(`<button class="${ssrRenderClass([unref(statusFilter) === s ? "bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]" : "border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]", "px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] border transition-colors"])}" data-v-a4c77a3d>${ssrInterpolate(s === "all" ? "All" : STATUS_LABEL[s])}</button>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="gf-depth" data-v-a4c77a3d>`);
      if (unref(filtered).length) {
        _push(`<div data-v-a4c77a3d><!--[-->`);
        ssrRenderList(unref(filtered), (home) => {
          _push(`<div class="gf-home-row group border-t border-[#DDD6C9] last:border-b py-7" data-v-a4c77a3d><div class="min-w-0" data-v-a4c77a3d><div class="flex flex-wrap items-baseline gap-3 mb-1.5" data-v-a4c77a3d><p class="font-display text-[21px] font-semibold tracking-tight" data-v-a4c77a3d>${ssrInterpolate(home.name || home.address)}</p><span class="${ssrRenderClass([(home.status || "active") === "sold" ? "text-[#A9A39A]" : "text-[#5A6349]", "text-[10.5px] uppercase tracking-[0.14em]"])}" data-v-a4c77a3d>${ssrInterpolate(STATUS_LABEL[home.status || "active"])}</span></div>`);
          if (home.name) {
            _push(`<p class="text-[14px] text-[#8A847C]" data-v-a4c77a3d>${ssrInterpolate(home.address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (home.owner) {
            _push(`<p class="text-[13px] text-[#A9A39A] mt-1" data-v-a4c77a3d>Owner: ${ssrInterpolate(home.owner)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (home.notes) {
            _push(`<p class="text-[13.5px] text-[#8A847C] mt-2.5 leading-relaxed max-w-[60ch]" data-v-a4c77a3d>${ssrInterpolate(home.notes)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="gf-home-actions flex flex-wrap gap-2.5" data-v-a4c77a3d><select${ssrRenderAttr("value", home.status || "active")}${ssrIncludeBooleanAttr(unref(busyId) === home._id) ? " disabled" : ""} class="flex-1 sm:flex-initial bg-[#F7F4EF] border border-[#DDD6C9] px-3 py-2.5 text-[11px] uppercase tracking-[0.1em] text-[#8A847C] focus:outline-none focus:border-[#B5563A] disabled:opacity-40" data-v-a4c77a3d><option value="active" data-v-a4c77a3d>Active</option><option value="pending" data-v-a4c77a3d>Pending</option><option value="sold" data-v-a4c77a3d>Sold</option></select>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/dashboard/forms",
            class: "flex-1 sm:flex-initial text-center px-4 py-2.5 border border-[#B5563A] text-[#B5563A] text-[11px] uppercase tracking-[0.1em] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors whitespace-nowrap"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Make a QR code `);
              } else {
                return [
                  createTextVNode(" Make a QR code ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button${ssrIncludeBooleanAttr(unref(busyId) === home._id) ? " disabled" : ""} class="px-4 py-2.5 border border-[#DDD6C9] text-[#A9A39A] text-[11px] uppercase tracking-[0.1em] hover:border-[#B5563A] hover:text-[#B5563A] transition-colors disabled:opacity-40 whitespace-nowrap" data-v-a4c77a3d> Remove </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(list).length) {
        _push(`<div class="border-t border-b border-[#DDD6C9] py-14 text-center" data-v-a4c77a3d><p class="text-[14px] text-[#8A847C]" data-v-a4c77a3d>Nothing matches that search.</p></div>`);
      } else {
        _push(`<div class="border-t border-b border-[#DDD6C9] py-16 text-center" data-v-a4c77a3d><p class="text-[14px] text-[#8A847C] mb-6 max-w-[44ch] mx-auto leading-relaxed" data-v-a4c77a3d> No properties yet. You don&#39;t need one to collect leads — but adding a listing lets you tag each lead to the house they walked through. </p>`);
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          text: "+ Add your first property",
          path: "/dashboard/home/create"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a4c77a3d"]]);

export { index as default };
//# sourceMappingURL=index-VUBROKLN.mjs.map
