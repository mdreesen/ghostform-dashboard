import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Submit",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Save"
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isLoadingText: {
      type: String,
      default: "Please wait..."
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "submit",
        disabled: __props.isLoading,
        class: `${__props.isLoading ? "bg-linear-to-r from-gray-500 to-gray-600" : "bg-[#B5563A] hover:bg-[#8f4229] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B5563A] focus:ring-offset-2 focus:ring-offset-[#F7F4EF]"} w-full py-3 text-lg font-semibold text-[#F7F4EF] shadow-none transition-all duration-300 ease-in-out`
      }, _attrs))}>${ssrInterpolate(__props.isLoading ? props.isLoadingText : __props.text)}</button>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Button/Submit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "BaseButtonSubmit" });
export {
  __nuxt_component_3 as _
};
//# sourceMappingURL=Submit-Czy5AZLo.js.map
