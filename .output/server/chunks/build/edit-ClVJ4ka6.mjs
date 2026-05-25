import { _ as __nuxt_component_0 } from './Base-nVsy7JGX.mjs';
import { i as inputVarient, _ as __nuxt_component_0$1 } from './varients-BuwxFdnl.mjs';
import { _ as __nuxt_component_3 } from './ButtonSubmit-BlqwCv3V.mjs';
import { _ as __nuxt_component_1 } from './ButtonNavigate-BydwpjZB.mjs';
import { defineComponent, withAsyncContext, ref, reactive, resolveDirective, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { a as useRoute, b as useFetch, r as refreshNuxtData, n as navigateTo } from './server.mjs';
import { u as useToast } from './useToast-DwtrOYg5.mjs';
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

const selection_status_lead = [
  { label: "new", value: "new" },
  { label: "active", value: "active" },
  { label: "archive", value: "archive" }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data, pending: pending_data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/leads/${route.params.id}`,
      "$QRRwj0Kvky"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const toast = useToast();
    const lead = ref(data.value);
    const isLoading = ref(false);
    let errorMessage = ref("");
    const input = reactive({
      address: "",
      age: 0,
      bathrooms: 0,
      bedrooms: 0,
      budget: 0,
      buy_sell_both: "",
      date: "",
      email: "",
      message: "",
      name: "",
      phone: "",
      price: 0,
      sqft: 0,
      status: "",
      want_to_move: ""
    });
    if (data.value) {
      input.address = data.value.address;
      input.age = data.value.age;
      input.bathrooms = data.value.bathrooms;
      input.bedrooms = data.value.bedrooms;
      input.budget = data.value.budget;
      input.buy_sell_both = data.value.buy_sell_both;
      input.date = data.value.date;
      input.email = data.value.email;
      input.message = data.value.message;
      input.name = data.value.name;
      input.phone = data.value.phone;
      input.price = data.value.price;
      input.sqft = data.value.sqft;
      input.status = data.value.status;
      input.want_to_move = data.value.want_to_move;
    }
    async function delete_log() {
      isLoading.value = true;
      $fetch(`/api/leads/${route.params.id}`, {
        method: "DELETE",
        body: input
      }).then(async () => {
        await refreshNuxtData();
        await navigateTo(`/dashboard/leads`);
      }).catch(async (error) => {
        toast.error("Failed to delete", "Try again");
        console.log(error);
        errorMessage.value = error.statusMessage;
        isLoading.value = false;
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderBase = __nuxt_component_0;
      const _component_baseLabel = __nuxt_component_0$1;
      const _component_baseButtonSubmit = __nuxt_component_3;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _directive_motion = resolveDirective("motion");
      if (!unref(pending_data)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_baseHeaderBase, {
          text: `Edit ${unref(lead)?.name}`
        }, null, _parent));
        _push(`<form class="space-y-6"><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Status" }, null, _parent));
        _push(`<select id="status-select" required class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(unref(input).status) ? ssrLooseContain(unref(input).status, "") : ssrLooseEqual(unref(input).status, "")) ? " selected" : ""}>Status</option><!--[-->`);
        ssrRenderList(unref(selection_status_lead), (status) => {
          _push(`<option${ssrRenderAttr("value", status.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(input).status) ? ssrLooseContain(unref(input).status, status.value) : ssrLooseEqual(unref(input).status, status.value)) ? " selected" : ""}>${ssrInterpolate(status.label)}</option>`);
        });
        _push(`<!--]--></select></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Name" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).name)} placeholder="Name" required class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Age" }, null, _parent));
        _push(`<input id="text" type="number"${ssrRenderAttr("value", unref(input).age)} placeholder="Age" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).email)} placeholder="Email" required class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Address" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).address)} placeholder="Address" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Wants to move" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).want_to_move)} placeholder="Wants to move" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Buy, sell, or both" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).buy_sell_both)} placeholder="Buy, sell, or both" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Estimated home price" }, null, _parent));
        _push(`<input id="text" type="number"${ssrRenderAttr("value", unref(input).price)} placeholder="Estimated home price" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Sqft of home" }, null, _parent));
        _push(`<input id="text" type="number"${ssrRenderAttr("value", unref(input).sqft)} placeholder="Sqft of home" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Bedrooms" }, null, _parent));
        _push(`<input id="text" type="number"${ssrRenderAttr("value", unref(input).bedrooms)} placeholder="Bedrooms" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Bathrooms" }, null, _parent));
        _push(`<input id="text" type="number"${ssrRenderAttr("value", unref(input).bathrooms)} placeholder="Bathrooms" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Budget" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).budget)} placeholder="Budget" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
        _push(ssrRenderComponent(_component_baseLabel, { text: "Message" }, null, _parent));
        _push(`<input id="text" type="text"${ssrRenderAttr("value", unref(input).message)} placeholder="Message" class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div class="flex flex-col gap-8 pb-4">`);
        _push(ssrRenderComponent(_component_baseButtonSubmit, {
          text: "Save",
          isLoading: unref(isLoading)
        }, null, _parent));
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          text: "Cancel",
          path: `/dashboard/leads/${unref(route).params.id}/details`,
          isLoading: unref(isLoading)
        }, null, _parent));
        _push(ssrRenderComponent(_component_baseButtonSubmit, {
          onClick: delete_log,
          text: "Delete",
          isLoading: unref(isLoading)
        }, null, _parent));
        _push(`</div></form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-ClVJ4ka6.mjs.map
