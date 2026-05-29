import { _ as __nuxt_component_0 } from './Auth-YSaql3Au.mjs';
import { _ as __nuxt_component_1 } from './ButtonNavigate-BmwF8RfC.mjs';
import { _ as __nuxt_component_1$1 } from './Section-ArHxFPsW.mjs';
import { defineComponent, withAsyncContext, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a as useRoute, b as useFetch, c as __nuxt_component_3$1 } from './server.mjs';
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
        class: "text-cyan-400 hover:text-cyan-700 underline font-medium"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><a${ssrRenderAttr("href", `https://maps.google.com/?q=${encodeURIComponent(__props.address)}`)} target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:text-cyan-700 underline font-medium"><span>${ssrInterpolate(__props.address)}</span></a></div>`);
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
    const { data, pending: pending_data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/leads/${route.params.id}`,
      "$H-3835jjPy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const lead = ref(data.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderAuth = __nuxt_component_0;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_baseHeaderSection = __nuxt_component_1$1;
      const _component_baseMessage = __nuxt_component_3;
      const _component_baseMaps = __nuxt_component_4;
      const _component_ClientOnly = __nuxt_component_3$1;
      if (!unref(pending_data)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><main class="max-w-5xl mx-auto relative z-10"><section class="flex flex-wrap gap-8 mb-12"><div><div class="flex items-center gap-6">`);
        _push(ssrRenderComponent(_component_baseHeaderAuth, {
          text: unref(lead)?.name
        }, null, _parent));
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          class: "w-25",
          text: "Edit",
          path: `/dashboard/leads/${unref(route).params.id}/edit`
        }, null, _parent));
        _push(`</div><div class="flex flex-wrap gap-6 mt-5 text-zinc-400"><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Email" }, null, _parent));
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.email,
          message_type: "mailto",
          communication_type: "email"
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Phone" }, null, _parent));
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.phone,
          message_type: "sms",
          communication_type: "phone"
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Address" }, null, _parent));
        _push(ssrRenderComponent(_component_baseMaps, {
          address: unref(lead).address
        }, null, _parent));
        _push(`</div><div class="flex flex-col">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, {
          text: "Status",
          subText: unref(lead)?.status
        }, null, _parent));
        _push(`</div></div></div></section><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><div class="lg:col-span-4 space-y-8"><div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Lead Submission" }, null, _parent));
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList({
          "Est. Value": unref(lead)?.price ? `$${unref(lead)?.price?.toLocaleString()}` : "",
          "Budget": `$${unref(lead)?.budget?.toLocaleString() ?? ""}`,
          "Sq Footage": unref(lead)?.sqft ? `${unref(lead)?.sqft} ft²` : "",
          "Intent (Buy, Sell, or Both)": unref(lead)?.buy_sell_both
        }, (val, label) => {
          _push(`<div class="flex justify-between items-end border-b border-white/5 pb-2"><span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">${ssrInterpolate(label)}</span><span class="text-sm font-bold">${ssrInterpolate(val)}</span></div>`);
        });
        _push(`<!--]--></div></div><div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-3xl p-8">`);
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Other Notes" }, null, _parent));
        _push(`<p class="text-sm text-zinc-300 leading-relaxed italic-none">&quot;${ssrInterpolate(unref(lead)?.notes ? unref(lead)?.notes : "No other notes")}&quot;</p></div></div>`);
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
//# sourceMappingURL=details-NAtmrH6w.mjs.map
