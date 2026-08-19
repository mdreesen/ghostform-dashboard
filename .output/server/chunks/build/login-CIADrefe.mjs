import { f as formVarient, i as inputVarient, _ as __nuxt_component_0 } from './varients-BuwxFdnl.mjs';
import { _ as _sfc_main$1 } from './Drawer-CeTUXb0R.mjs';
import { p as useUserSession, ai as useMotion, q as _sfc_main$8, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_3 } from './Submit-Czy5AZLo.mjs';
import { defineComponent, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createVNode, withModifiers, withDirectives, openBlock, createBlock, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'vaul-vue';
import './overlay-CjyBzL1C.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useUserSession();
    const formRef = ref();
    const isLoading = ref(false);
    let errorMessage = ref("");
    const { fetch: refreshSession } = useUserSession();
    useToast();
    const credentials = reactive({
      email: "",
      password: ""
    });
    const input = reactive({
      email: "",
      question: ""
    });
    async function forgotpassword() {
      isLoading.value = true;
      $fetch(`/api/authentication/forgot`, {
        method: "POST",
        body: {
          ...input
        }
      }).then(async () => {
        await refreshSession();
        isLoading.value = false;
      }).catch(async (error) => {
        console.log(error);
        errorMessage.value = error.statusMessage;
        isLoading.value = false;
      });
    }
    useMotion(formRef, { ...formVarient() });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseLabel = __nuxt_component_0;
      const _component_UDrawer = _sfc_main$1;
      const _component_UButton = _sfc_main$8;
      const _component_baseButtonSubmit = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-20 relative overflow-hidden" }, _attrs))} data-v-4e93b159><main class="w-full max-w-110 z-10" data-v-4e93b159><div class="backdrop-blur-xl bg-white/60 border border-[#DDD6C9] p-10 shadow-2xl" data-v-4e93b159><header class="text-center mb-12" data-v-4e93b159><h1 class="text-3xl font-bold tracking-tight text-[#1F1B16] mb-2" data-v-4e93b159>GhostForm</h1><p class="text-[#8A847C] text-sm" data-v-4e93b159>Intelligence for the Unseen.</p></header><div class="space-y-6" data-v-4e93b159><form class="space-y-6" data-v-4e93b159><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-4e93b159>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent));
      _push(`<input id="email" type="email"${ssrRenderAttr("value", credentials.email)} placeholder="Email" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-4e93b159></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-4e93b159>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", credentials.password)} placeholder="Password" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-4e93b159></div><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center w-full mx-auto" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-4e93b159><div class="w-full relative flex justify-end" data-v-4e93b159>`);
      _push(ssrRenderComponent(_component_UDrawer, {
        title: "Reset your password",
        overlay: false,
        class: "bg-white"
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6" data-v-4e93b159${_scopeId}><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-4e93b159${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent2, _scopeId));
            _push2(`<input id="email" type="email"${ssrRenderAttr("value", input.email)} placeholder="Email" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-4e93b159${_scopeId}></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-4e93b159${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseLabel, { text: "Question" }, null, _parent2, _scopeId));
            _push2(`<input id="question" type="text"${ssrRenderAttr("value", input.question)} placeholder="What is 4 + 3" required class="w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis" data-v-4e93b159${_scopeId}></div><div class="flex flex-col gap-8 pb-4" data-v-4e93b159${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseButtonSubmit, {
              text: "Reset",
              isLoading: isLoading.value,
              isLoadingText: "Submitting..."
            }, null, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(forgotpassword, ["prevent"]),
                class: "space-y-6"
              }, [
                withDirectives((openBlock(), createBlock("div", null, [
                  createVNode(_component_baseLabel, { text: "Email" }),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    "onUpdate:modelValue": ($event) => input.email = $event,
                    placeholder: "Email",
                    required: "",
                    class: "w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, input.email]
                  ])
                ])), [
                  [_directive_motion, { ...unref(inputVarient)() }]
                ]),
                withDirectives((openBlock(), createBlock("div", null, [
                  createVNode(_component_baseLabel, { text: "Question" }),
                  withDirectives(createVNode("input", {
                    id: "question",
                    type: "text",
                    "onUpdate:modelValue": ($event) => input.question = $event,
                    placeholder: "What is 4 + 3",
                    required: "",
                    class: "w-full bg-white/60 border border-[#DDD6C9] px-5 py-3 text-sm focus:outline-none focus:border-[#B5563A] transition-colors placeholder:text-[#A9A39A] text-ellipsis"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, input.question]
                  ])
                ])), [
                  [_directive_motion, { ...unref(inputVarient)() }]
                ]),
                createVNode("div", { class: "flex flex-col gap-8 pb-4" }, [
                  createVNode(_component_baseButtonSubmit, {
                    text: "Reset",
                    isLoading: isLoading.value,
                    isLoadingText: "Submitting..."
                  }, null, 8, ["isLoading"])
                ])
              ], 32)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "Forgot password",
              color: "neutral",
              variant: "subtle"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "Forgot password",
                color: "neutral",
                variant: "subtle"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-4e93b159>`);
      _push(ssrRenderComponent(_component_baseButtonSubmit, {
        text: "Log in",
        isLoading: isLoading.value
      }, null, _parent));
      _push(`</div></form><div${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-center py-4" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-4e93b159><div class="absolute w-full border-t border-gray-700" data-v-4e93b159></div><span class="relative z-10 bg-gray-900/80 backdrop-blur-md px-4 text-white-800 text-sm" data-v-4e93b159>OR</span></div><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-4e93b159><p class="text-gray-400 text-sm" data-v-4e93b159> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-[#B5563A] hover:underline transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign up`);
          } else {
            return [
              createTextVNode("Sign up")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div><div class="relative flex items-center py-2" data-v-4e93b159><div class="grow border-t border-[#DDD6C9]" data-v-4e93b159></div><span class="shrink mx-4 text-[#8A847C] text-[10px] uppercase tracking-widest font-bold" data-v-4e93b159>Encrypted Session</span><div class="grow border-t border-[#DDD6C9]" data-v-4e93b159></div></div><p class="text-center text-xs text-[#8A847C] leading-relaxed" data-v-4e93b159> Authorized personnel only. Sessions are logged and analyzed for regional compliance. </p></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(authentication)/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4e93b159"]]);

export { login as default };
//# sourceMappingURL=login-CIADrefe.mjs.map
