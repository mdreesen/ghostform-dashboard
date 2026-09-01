import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "bg-[#F7F4EF] text-[#1F1B16] selection:bg-[#B5563A]/30 font-sans min-h-screen relative overflow-hidden" }, _attrs))}><main class="py-20 p-6 lg:py-18 relative z-10">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/payment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const payment = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  payment as default
};
//# sourceMappingURL=payment-Cp8Rb9d4.js.map
