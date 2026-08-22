import { i as inputVarient, _ as __nuxt_component_0 } from "./varients-Dloq31-n.js";
import { _ as __nuxt_component_3 } from "./Submit-Czy5AZLo.js";
import { p as useUserSession, _ as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, reactive, ref, resolveDirective, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useToast } from "./useToast-LG3isBA-.js";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/unctx/dist/index.mjs";
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
  __name: "signup",
  __ssrInlineRender: true,
  setup(__props) {
    useToast();
    const credentials = reactive({
      company: "",
      category: "",
      email: "",
      password: "",
      confirm_password: "",
      privacy_policy: false
    });
    const isLoading = ref(false);
    ref("");
    useUserSession();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseLabel = __nuxt_component_0;
      const _component_baseButtonSubmit = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-20 relative overflow-hidden" }, _attrs))} data-v-05526822><main class="w-full max-w-120 z-10" data-v-05526822><div class="backdrop-blur-2xl bg-[#F7F4EF] border border-[#DDD6C9] p-10 shadow-2xl" data-v-05526822><header class="mb-10" data-v-05526822><div class="flex items-center gap-3 mb-6" data-v-05526822><h1 class="text-2xl font-bold tracking-tight text-[#1F1B16]" data-v-05526822>Initialize Account</h1></div><p class="text-[#8A847C] text-sm italic-none" data-v-05526822>Join the network of high-velocity intelligence.</p></header><div class="space-y-6" data-v-05526822><form class="space-y-6" data-v-05526822><div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() })))} data-v-05526822><div data-v-05526822>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Company Name" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(credentials).company)} type="text" placeholder="e.g. Company name" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-05526822></div><div data-v-05526822><span class="text-[10px] text-[#8A847C] font-bold uppercase tracking-widest ml-1 mb-2 block" data-v-05526822>Primary Category</span><select class="w-full bg-white/60 text-[#8A847C] border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-05526822><option value="realtor" data-v-05526822${ssrIncludeBooleanAttr(Array.isArray(unref(credentials).category) ? ssrLooseContain(unref(credentials).category, "realtor") : ssrLooseEqual(unref(credentials).category, "realtor")) ? " selected" : ""}>Realtor</option></select></div></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))} data-v-05526822>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent));
      _push(`<input id="email" type="email"${ssrRenderAttr("value", unref(credentials).email)} placeholder="Email" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-05526822></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))} data-v-05526822>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", unref(credentials).password)} placeholder="Password" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-05526822></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() }))} data-v-05526822>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Confirm password" }, null, _parent));
      _push(`<input id="confirm_password" type="password"${ssrRenderAttr("value", unref(credentials).confirm_password)} placeholder="Password" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-05526822></div><div${ssrRenderAttrs(mergeProps({ class: "flex items-center space-x-2" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...("inputVarient" in _ctx ? _ctx.inputVarient : unref(inputVarient))() })))} data-v-05526822><label class="flex items-start gap-3 cursor-pointer group mt-4" data-v-05526822><div class="relative flex items-center bg-black/9" data-v-05526822><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(credentials).privacy_policy) ? ssrLooseContain(unref(credentials).privacy_policy, null) : unref(credentials).privacy_policy) ? " checked" : ""} class="sr-only peer" required data-v-05526822><div class="w-5 h-5 border border-white/20 rounded-md peer-checked:bg-[#30cf43] peer-checked:border-[#30cf43] transition-all" data-v-05526822></div><svg class="absolute w-3 h-3 text-[#1F1B16] scale-0 peer-checked:scale-100 transition-transform left-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-05526822><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-v-05526822></path></svg></div><span class="text-xs text-[#8A847C] group-hover:text-[#1F1B16] transition-colors leading-snug" data-v-05526822> I accept the data processing protocols and AI analysis terms. </span></label></div>`);
      _push(ssrRenderComponent(_component_baseButtonSubmit, {
        text: "Save",
        isLoading: unref(isLoading)
      }, null, _parent));
      _push(`</form><p class="text-center text-xs text-[#8A847C]" data-v-05526822> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-[#B5563A] hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Access Login `);
          } else {
            return [
              createTextVNode("Access Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(authentication)/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-05526822"]]);
export {
  signup as default
};
//# sourceMappingURL=signup-zQAqrsV8.js.map
