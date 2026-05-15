import { b as useFetch, d as useNuxtData, n as navigateTo, _ as __nuxt_component_0$2, $ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, ref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './Base-nVsy7JGX.mjs';
import { _ as __nuxt_component_1$2 } from './ButtonNavigate-BydwpjZB.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const navLinks = [
      { name: "Overview", href: "/dashboard", target: "" },
      { name: "Leads", href: "/dashboard/leads", target: "" },
      { name: "GhostForm", href: "/dashboard/form", target: "_blank" },
      { name: "Profile", href: "/dashboard/profile", target: "" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_NuxtImg = __nuxt_component_1$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: [
          "fixed top-0 w-full z-100 transition-all duration-300 border-b",
          isScrolled.value ? "bg-black/60 backdrop-blur-xl border-white/10 py-3" : "bg-transparent border-transparent py-5"
        ]
      }, _attrs))}><div class="max-w-7xl mx-auto px-6 flex items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-10 h-10 flex items-center justify-center"${_scopeId}><div class="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/40 transition-all"${_scopeId}></div>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "relative z-10 h-20 w-full object-contain drop-shadow-md",
              src: "/images/logo-icon.webp",
              format: "webp",
              preload: "",
              loading: "eager",
              "fetch-priority": "high"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-xl font-black tracking-tighter text-white"${_scopeId}>GhostForm</span>`);
          } else {
            return [
              createVNode("div", { class: "relative w-10 h-10 flex items-center justify-center" }, [
                createVNode("div", { class: "absolute inset-0 bg-cyan-500/20 blur-lg rounded-full group-hover:bg-cyan-500/40 transition-all" }),
                createVNode(_component_NuxtImg, {
                  class: "relative z-10 h-20 w-full object-contain drop-shadow-md",
                  src: "/images/logo-icon.webp",
                  format: "webp",
                  preload: "",
                  loading: "eager",
                  "fetch-priority": "high"
                })
              ]),
              createVNode("span", { class: "text-xl font-black tracking-tighter text-white" }, "GhostForm")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-8"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.name,
          to: link.href,
          target: link.target,
          class: "text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center gap-4"><button class="md:hidden text-zinc-400 hover:text-white transition-colors">`);
      if (!isMobileMenuOpen.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`);
      }
      _push(`</button></div></div>`);
      if (isMobileMenuOpen.value) {
        _push(`<div class="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"><!--[-->`);
        ssrRenderList(navLinks, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.name,
            to: link.href,
            onClick: ($event) => isMobileMenuOpen.value = false,
            class: "text-lg font-bold text-zinc-300 hover:text-cyan-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/NavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "BaseNavBar" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_baseHeaderBase = __nuxt_component_0$1;
  const _component_baseButtonNavigate = __nuxt_component_1$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-20 p-6 lg:py-18 relative overflow-hidden" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_baseHeaderBase, { text: "Login to gain access" }, null, _parent));
  _push(ssrRenderComponent(_component_baseButtonNavigate, {
    text: "Home",
    path: "/"
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/Access.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]), { __name: "AppAccess" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "authenticated",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/user",
      { key: "user", lazy: true },
      "$-KC9LV5WMn"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/leads",
      { key: "leads", lazy: true },
      "$f-ZsZMQa5l"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/leads/status",
      { key: "status", lazy: true },
      "$5ulToc5O0m"
      /* nuxt-injected */
    )), await __temp, __restore();
    const { data: user } = useNuxtData("user");
    const authenticated = computed(() => {
      if (user) return true;
      else {
        return navigateTo(`/login`);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseNavBar = __nuxt_component_0;
      const _component_appAccess = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "bg-[#020203] text-zinc-100 selection:bg-cyan-500/30 font-sans" }, _attrs))}><div class="fixed inset-0 pointer-events-none"><div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full"></div><div class="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div></div>`);
      if (unref(authenticated)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_baseNavBar, null, null, _parent));
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_appAccess, null, null, _parent));
      }
      _push(`</main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/authenticated.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=authenticated-1OHOrpv4.mjs.map
