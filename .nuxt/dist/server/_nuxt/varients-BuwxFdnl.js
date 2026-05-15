import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Label",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        for: "text",
        class: "block text-sm font-medium mb-1"
      }, _attrs))}>${ssrInterpolate(props.text)}</label>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Label.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "BaseLabel" });
const formVarient = () => {
  return {
    initial: { opacity: 0, y: 50 },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        mass: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
};
const containerVarient = () => {
  return {
    initial: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.8 } }
  };
};
const inputVarient = () => {
  return {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 }
  };
};
export {
  __nuxt_component_0 as _,
  containerVarient as c,
  formVarient as f,
  inputVarient as i
};
//# sourceMappingURL=varients-BuwxFdnl.js.map
