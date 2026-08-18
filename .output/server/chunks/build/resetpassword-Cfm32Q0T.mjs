import { f as formVarient, i as inputVarient, _ as __nuxt_component_0 } from './varients-BuwxFdnl.mjs';
import { _ as __nuxt_component_3 } from './Submit-Czy5AZLo.mjs';
import { u as useHead, s as useUserSession, a as useRoute, ac as useMotion, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToast } from './useToast-D5yRuci7.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'vue-router';
import '@iconify/vue';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import 'framesync';
import 'popmotion';
import 'style-value-types';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "resetpassword",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Resetting Password",
      meta: [
        { name: "description", content: "GhostForm Resetting Password." }
      ]
    });
    const formRef = ref();
    const isLoading = ref(false);
    ref("");
    useUserSession();
    const route = useRoute();
    route.params.id;
    useToast();
    const input = reactive({
      password: "",
      confirm_password: ""
    });
    useMotion(formRef, { ...formVarient() });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseLabel = __nuxt_component_0;
      const _component_baseButtonSubmit = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-20 relative overflow-hidden" }, _attrs))}><main class="w-full max-w-110 z-10"><div class="backdrop-blur-xl bg-white/60 border border-[#DDD6C9] p-10 shadow-2xl"><header class="text-center mb-12"><h1 class="text-3xl font-bold tracking-tight text-[#1F1B16] mb-2">GhostForm</h1><p class="text-[#8A847C] text-sm">Reset your password</p></header><div class="space-y-6"><form class="space-y-6"><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", unref(input).password)} placeholder="Password" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Confirm Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", unref(input).confirm_password)} placeholder="Confirm Password" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}>`);
      _push(ssrRenderComponent(_component_baseButtonSubmit, {
        text: "Update",
        isLoading: isLoading.value
      }, null, _parent));
      _push(`</div></form><div${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-center py-4" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))}><div class="absolute w-full border-t border-gray-700"></div><span class="relative z-10 bg-gray-800/80 backdrop-blur-md px-4 text-gray-400 text-sm">OR</span></div><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))}><p class="text-center text-xs text-[#8A847C]"> Already have an account? `);
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
      _push(`</p></div></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(authentication)/[id]/resetpassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resetpassword-Cfm32Q0T.mjs.map
