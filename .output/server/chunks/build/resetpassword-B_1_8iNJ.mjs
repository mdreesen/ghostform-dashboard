import { f as formVarient, c as containerVarient, i as inputVarient, _ as __nuxt_component_0 } from './varients-BuwxFdnl.mjs';
import { u as useHead, e as useUserSession, a as useRoute, X as useMotion, _ as __nuxt_component_0$2 } from './server.mjs';
import { defineComponent, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useToast } from './useToast-BpBVDIQ9.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'jose';
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
    let errorMessage = ref("");
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
      const _component_NuxtLink = __nuxt_component_0$2;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen items-center justify-center bg-gray-950 p-4 overflow-hidden" }, _attrs))}><div class="absolute inset-0 z-0 bg-linear-to-br from-gray-950 via-gray-800 to-purple-950 opacity-70"></div><section class="flex flex-col items-center gap-8"><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(containerVarient)() })))}><h1 class="flex flex-col text-4xl sm:text-6xl font-extrabold text-white leading-tight"><span>Welcome to</span><span class="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400"> ASCΞND </span></h1><p class="mt-2 text-lg sm:text-xl text-gray-400">Create a new password</p></div><div class="relative z-20 w-full rounded-3xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl backdrop-blur-md space-y-6 transform transition-all duration-300">`);
      if (unref(errorMessage)) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["text-center py-2 px-4 rounded-lg", "bg-red-600/30 text-red-400"]
        }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))}>${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="space-y-6"><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", unref(input).password)} placeholder="Password" required class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Confirm password" }, null, _parent));
      _push(`<input id="confirm_password" type="password"${ssrRenderAttr("value", unref(input).confirm_password)} placeholder="Confirm password" required class="w-full rounded-xl border border-gray-600 bg-gray-700/50 py-3 px-4 text-lg text-white shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))}><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="${ssrRenderClass(`${isLoading.value ? "bg-linear-to-r from-gray-500 to-gray-600" : "bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"} w-full rounded-xl py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out`)}">${ssrInterpolate(isLoading.value ? "Submitting..." : "Submit")}</button></div></form><div${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-center py-4" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))}><div class="absolute w-full border-t border-gray-700"></div><span class="relative z-10 bg-gray-800/80 backdrop-blur-md px-4 text-gray-400 text-sm">OR</span></div><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))}><p class="text-gray-400 text-sm"> Log into your account `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-blue-400 hover:underline transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`log in `);
          } else {
            return [
              createTextVNode("log in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></section></div>`);
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
//# sourceMappingURL=resetpassword-B_1_8iNJ.mjs.map
