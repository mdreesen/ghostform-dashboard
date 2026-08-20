import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { a as useRoute, u as useHead } from "../server.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "tailwindcss/colors";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "ohash/utils";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useHead({
      meta: [{ property: "og:title", content: `GhostForm - ${route.meta.title}` }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "bg-[#F7F4EF] text-zinc-100 selection:bg-[#B5563A]/30 font-sans" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-D6BhmMrf.js.map
