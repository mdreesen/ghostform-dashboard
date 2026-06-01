import { _ as __nuxt_component_0$1 } from './Auth-YSaql3Au.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    subLabel: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderAuth = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6" }, _attrs))}><div>`);
      _push(ssrRenderComponent(_component_baseHeaderAuth, {
        text: __props.label,
        subText: __props.subLabel
      }, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "AppHeader" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Header-p0bLgg1D.mjs.map
