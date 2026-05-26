import { _ as __nuxt_component_6 } from './Section-DTivodY8.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { d as useNuxtData } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderSection = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: __props.label,
        class: "backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: __props.label }, null, _parent));
      _push(`<p class="text-3xl font-bold tabular-nums">${ssrInterpolate(__props.value)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Card/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "BaseCardForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useNuxtData("get_user");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseCardForm = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden" }, _attrs))} data-v-20b1f06c><section class="flex flex-wrap justify-between gap-6 mb-12" data-v-20b1f06c><div data-v-20b1f06c>`);
      _push(ssrRenderComponent(_component_baseCardForm, { label: "Data Entry" }, null, _parent));
      _push(`</div><div data-v-20b1f06c>`);
      _push(ssrRenderComponent(_component_baseCardForm, { label: "Open House" }, null, _parent));
      _push(`</div><div data-v-20b1f06c>`);
      _push(ssrRenderComponent(_component_baseCardForm, { label: "House Details" }, null, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/forms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-20b1f06c"]]);

export { index as default };
//# sourceMappingURL=index-CUooST8L.mjs.map
