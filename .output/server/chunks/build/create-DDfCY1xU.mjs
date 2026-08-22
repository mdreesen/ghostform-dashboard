import { u as useHead, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "GhostForm | Add a property" });
    useToast();
    const isLoading = ref(false);
    const errorMessage = ref("");
    const input = reactive({
      name: "",
      address: "",
      owner: "",
      notes: "",
      status: "active"
    });
    const canSave = computed(() => input.address.trim().length > 3);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[720px] mx-auto" }, _attrs))}><header class="mb-14 pt-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/home",
        class: "gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors gf-rise",
        style: { "--d": ".04s" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← All properties `);
          } else {
            return [
              createTextVNode(" ← All properties ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="gf-display text-[clamp(32px,4.2vw,52px)] mb-4 gf-rise" style="${ssrRenderStyle({ "--d": ".1s" })}"> Add a property. </h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="${ssrRenderStyle({ "--d": ".18s" })}"> Once it&#39;s here, you can attach it to an open house QR code and every lead who signs in gets tagged to this address. </p></header><section class="gf-depth"><form class="space-y-8"><div><label for="address" class="gf-eyebrow block mb-3">Address <span class="text-[#B5563A]">*</span></label><input id="address"${ssrRenderAttr("value", unref(input).address)} placeholder="348 Whitefish Stage Rd, City, State" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#B5563A] transition-colors"><p class="text-[12.5px] text-[#A9A39A] mt-2.5"> This is what gets attached to each lead, so write it how you&#39;d say it. </p></div><div class="grid sm:grid-cols-2 gap-6"><div><label for="name" class="gf-eyebrow block mb-3">Nickname</label><input id="name"${ssrRenderAttr("value", unref(input).name)} placeholder="The lake cabin" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#B5563A] transition-colors"><p class="text-[12.5px] text-[#A9A39A] mt-2.5"> Optional — makes it easier to spot in the picker. </p></div><div><label for="status" class="gf-eyebrow block mb-3">Status</label><select id="status" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#B5563A] transition-colors"><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(input).status) ? ssrLooseContain(unref(input).status, "active") : ssrLooseEqual(unref(input).status, "active")) ? " selected" : ""}>Active</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(input).status) ? ssrLooseContain(unref(input).status, "pending") : ssrLooseEqual(unref(input).status, "pending")) ? " selected" : ""}>Pending</option><option value="sold"${ssrIncludeBooleanAttr(Array.isArray(unref(input).status) ? ssrLooseContain(unref(input).status, "sold") : ssrLooseEqual(unref(input).status, "sold")) ? " selected" : ""}>Sold</option></select></div></div><div><label for="owner" class="gf-eyebrow block mb-3">Owner</label><input id="owner"${ssrRenderAttr("value", unref(input).owner)} placeholder="Who you&#39;re representing" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] focus:outline-none focus:border-[#B5563A] transition-colors"></div><div><label for="notes" class="gf-eyebrow block mb-3">Notes</label><textarea id="notes" rows="5" placeholder="Anything you want to remember — showing times, quirks, what buyers keep asking about." class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[16px] leading-relaxed resize-none focus:outline-none focus:border-[#B5563A] transition-colors">${ssrInterpolate(unref(input).notes)}</textarea></div>`);
      if (unref(errorMessage)) {
        _push(`<div class="p-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5"><p class="text-[13.5px] text-[#1F1B16]">${ssrInterpolate(unref(errorMessage))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap gap-3 pt-2"><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading) || !unref(canSave)) ? " disabled" : ""} class="px-7 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">${ssrInterpolate(unref(isLoading) ? "Saving…" : "Save property")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/home",
        class: "px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cancel `);
          } else {
            return [
              createTextVNode(" Cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/home/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-DDfCY1xU.mjs.map
