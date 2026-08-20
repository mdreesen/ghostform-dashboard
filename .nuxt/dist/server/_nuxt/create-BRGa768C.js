import { _ as __nuxt_component_0 } from "./Base-CmUHGY2S.js";
import { i as inputVarient, _ as __nuxt_component_0$1 } from "./varients-BuwxFdnl.js";
import { _ as __nuxt_component_3 } from "./Submit-Czy5AZLo.js";
import { _ as __nuxt_component_1 } from "./Navigate-B_PGVHvu.js";
import { defineComponent, ref, reactive, resolveDirective, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderAttr } from "vue/server-renderer";
import { u as useToast } from "./useToast-LG3isBA-.js";
import "../server.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const isLoading = ref(false);
    ref("");
    const input = reactive({
      name: "",
      owner: "",
      email: "",
      address: "",
      notes: "",
      date: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderBase = __nuxt_component_0;
      const _component_baseLabel = __nuxt_component_0$1;
      const _component_baseButtonSubmit = __nuxt_component_3;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_baseHeaderBase, { text: `Create New Home` }, null, _parent));
      _push(`<form class="space-y-6"><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Name" }, null, _parent));
      _push(`<input id="name" type="text"${ssrRenderAttr("value", unref(input).name)} placeholder="Name of home (nickname)" class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Address" }, null, _parent));
      _push(`<input id="address" type="text"${ssrRenderAttr("value", unref(input).address)} placeholder="Address" required class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Owners name" }, null, _parent));
      _push(`<input id="owners" type="text"${ssrRenderAttr("value", unref(input).owner)} placeholder="Who owns the home" class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Notes" }, null, _parent));
      _push(`<input id="owners" type="text"${ssrRenderAttr("value", unref(input).notes)} placeholder="Notes about the home" class="w-full border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-[#F7F4EF] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#B5563A]"></div><div class="flex flex-col gap-8 pb-4">`);
      _push(ssrRenderComponent(_component_baseButtonSubmit, {
        text: "Save",
        isLoading: unref(isLoading)
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseButtonNavigate, {
        text: "Cancel",
        path: `/dashboard/forms`,
        isLoading: unref(isLoading)
      }, null, _parent));
      _push(`</div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/home/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-BRGa768C.js.map
