import { defineComponent, useSSRContext } from 'vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Auth",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Header"
    },
    subText: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><h1 class="text-4xl md:text-5xl font-bold tracking-tighter">${(_a = __props.text) != null ? _a : ""}</h1>`);
      if (__props.subText) {
        _push(`<span class="font-bold tracking-tighter">${(_b = __props.subText) != null ? _b : ""}</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Header/Auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "BaseHeaderAuth" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=Auth-BV9RYU2X.mjs.map
