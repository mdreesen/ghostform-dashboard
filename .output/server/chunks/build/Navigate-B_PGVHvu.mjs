import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Navigate",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Button"
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: "/"
    },
    css: {
      type: String,
      defaut: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_nuxt_link, mergeProps({ to: __props.path }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass(`flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 border border-[#DDD6C9] hover:border-[#A9A39A] hover:bg-[#EFEAE0] text-[#8A847C] hover:text-[#1F1B16] text-[11px] font-semibold uppercase tracking-wider transition-all ${__props.css}`)}"${_scopeId}>${ssrInterpolate(__props.text)}</button>`);
          } else {
            return [
              createVNode("button", {
                class: `flex-1 md:flex-initial inline-flex items-center justify-center px-4 py-2 border border-[#DDD6C9] hover:border-[#A9A39A] hover:bg-[#EFEAE0] text-[#8A847C] hover:text-[#1F1B16] text-[11px] font-semibold uppercase tracking-wider transition-all ${__props.css}`
              }, toDisplayString(__props.text), 3)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Button/Navigate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "BaseButtonNavigate" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Navigate-B_PGVHvu.mjs.map
