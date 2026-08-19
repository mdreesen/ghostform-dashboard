import { a as useRoute, b as useFetch, u as useHead, _ as __nuxt_component_0$1, c as __nuxt_component_0$2 } from './server.mjs';
import { _ as __nuxt_component_1 } from './Navigate-B_PGVHvu.mjs';
import { defineComponent, withAsyncContext, ref, computed, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Message",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    },
    communication_type: {
      type: String,
      required: true
    },
    message_type: {
      type: String,
      default: "sms",
      required: true
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: `${__props.message_type}:${__props.communication_type}`,
        class: "text-[#B5563A] hover:text-[#8f4229] underline font-medium"
      }, _attrs))}><span>${__props.label ?? ""}</span></a>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Message.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "BaseMessage" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "maps",
  __ssrInlineRender: true,
  props: {
    address: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><a${ssrRenderAttr("href", `https://maps.google.com/?q=${encodeURIComponent(__props.address)}`)} target="_blank" rel="noopener noreferrer" class="text-[#B5563A] hover:text-[#8f4229] underline font-medium"><span>${ssrInterpolate(__props.address)}</span></a></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/maps.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "BaseMaps" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "details",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useToast();
    const { data, pending: pending_data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/leads/${route.params.id}`,
      "$VHUveJw_Rm"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const lead = ref(data.value);
    useHead({ title: () => `GhostForm | ${lead.value?.name || "Lead"}` });
    const marking = ref(false);
    const lastContact = computed(() => {
      const raw = lead.value?.lastContactedAt;
      if (!raw) return "Never contacted";
      const days = Math.floor((Date.now() - new Date(raw).getTime()) / 864e5);
      if (days <= 0) return "Contacted today";
      if (days === 1) return "Contacted 1 day ago";
      return `Contacted ${days} days ago`;
    });
    const money = (n) => n && n > 0 ? `$${n.toLocaleString("en-US")}` : null;
    const facts = computed(() => {
      const l = lead.value || {};
      return [
        { label: "Est. value", value: money(l.price) },
        { label: "Budget", value: money(l.budget) },
        { label: "Square footage", value: l.sqft ? `${l.sqft} ft²` : null },
        { label: "Bedrooms", value: l.bedrooms || null },
        { label: "Bathrooms", value: l.bathrooms || null },
        { label: "Intent", value: l.buy_sell_both || null },
        { label: "Timeline", value: l.want_to_move || null },
        { label: "Working with an agent", value: l.seeing_an_agent || null },
        { label: "Source", value: l.source || null }
      ].filter((f) => f.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_baseMessage = __nuxt_component_3;
      const _component_baseMaps = __nuxt_component_4;
      if (!unref(pending_data)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1100px] mx-auto" }, _attrs))}><header class="mb-16 pt-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/leads",
          class: "gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors gf-rise",
          style: { "--d": ".04s" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← All leads `);
            } else {
              return [
                createTextVNode(" ← All leads ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6"><div class="gf-rise" style="${ssrRenderStyle({ "--d": ".1s" })}"><h1 class="gf-display text-[clamp(34px,4.4vw,54px)] mb-3">${ssrInterpolate(unref(lead)?.name || "Unnamed lead")}</h1><div class="flex flex-wrap items-center gap-3 text-[13px] text-[#8A847C]"><span class="inline-flex items-center gap-2"><span class="w-[7px] h-[7px] bg-[#B5563A]"></span><span class="uppercase tracking-[0.14em] text-[10.5px]">${ssrInterpolate(unref(lead)?.status)}</span></span><span class="text-[#DDD6C9]">·</span><span>${ssrInterpolate(unref(lastContact))}</span></div></div><div class="flex gap-2.5 gf-rise shrink-0" style="${ssrRenderStyle({ "--d": ".18s" })}">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`<button${ssrIncludeBooleanAttr(unref(marking)) ? " disabled" : ""} class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#B5563A] text-[#B5563A] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors disabled:opacity-40">${ssrInterpolate(unref(marking) ? "Saving…" : "Contacted")}</button>`);
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          text: "Edit",
          path: `/dashboard/leads/${unref(route).params.id}/edit`
        }, null, _parent));
        _push(`</div></div></header><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">01 — Contact</span><span class="font-display text-[25px] font-semibold tracking-tight">How to reach them</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]"><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Email</p>`);
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.email,
          message_type: "mailto",
          communication_type: "email"
        }, null, _parent));
        _push(`</div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Phone</p>`);
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.phone,
          message_type: "sms",
          communication_type: "phone"
        }, null, _parent));
        _push(`</div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Prefers</p><p class="text-[15px]">${ssrInterpolate(unref(lead)?.best_communication_method || "Not specified")}</p></div></div></section><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">02 — Submission</span><span class="font-display text-[25px] font-semibold tracking-tight">What they told you</span></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-10"><div class="lg:col-span-7">`);
        if (unref(facts).length) {
          _push(`<div><!--[-->`);
          ssrRenderList(unref(facts), (f) => {
            _push(`<div class="flex justify-between items-baseline gap-6 border-b border-[#DDD6C9] py-3.5"><span class="gf-eyebrow">${ssrInterpolate(f.label)}</span><span class="font-display text-[17px] font-semibold text-right">${ssrInterpolate(f.value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-[14px] text-[#8A847C] py-6"> They didn&#39;t fill in any details beyond their contact info. </p>`);
        }
        if (unref(lead)?.address) {
          _push(`<div class="mt-8"><p class="gf-eyebrow mb-3">Address</p>`);
          _push(ssrRenderComponent(_component_baseMaps, {
            address: unref(lead)?.address
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-5"><p class="gf-eyebrow mb-3">Notes</p><div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7"><p class="text-[14.5px] leading-relaxed">${ssrInterpolate(unref(lead)?.notes || "No notes yet.")}</p></div></div></div></section>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div>`);
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
//# sourceMappingURL=details-_XipJ5hW.mjs.map
