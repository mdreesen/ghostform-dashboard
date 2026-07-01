import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Section",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Header"
    },
    subText: {
      type: String
    },
    css: {
      type: String,
      default: "mb-6"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2 class="${ssrRenderClass(`text-lg font-bold tracking-tighter ${__props.css}`)}">${__props.text ?? ""}</h2>`);
      if (__props.subText) {
        _push(`<span class="font-bold tracking-tighter">${__props.subText ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Header/Section.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "BaseHeaderSection" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Section-DcEM7TqR.mjs.map
