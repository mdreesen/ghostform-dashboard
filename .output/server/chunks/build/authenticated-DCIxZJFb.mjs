import { b as useFetch, K as useNuxtData, n as navigateTo, a as useRoute, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, ref, watch, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0$2 } from './Base-CmUHGY2S.mjs';
import { _ as __nuxt_component_1$1 } from './Navigate-B_PGVHvu.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      { label: "Today", to: "/dashboard" },
      { label: "Leads", to: "/dashboard/leads" },
      { label: "Campaigns", to: "/dashboard/campaigns" },
      { label: "Forms", to: "/dashboard/forms" },
      { label: "Profile", to: "/dashboard/profile" }
    ];
    const route = useRoute();
    const stuck = ref(false);
    const open = ref(false);
    const isActive = (to) => to === "/dashboard" ? route.path === to : route.path.startsWith(to);
    watch(() => route.path, () => {
      open.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 backdrop-blur-md", unref(stuck) ? "border-[#DDD6C9] bg-[#F7F4EF]/85" : "border-transparent bg-[#F7F4EF]/70"]
      }, _attrs))}><div class="flex items-center justify-between px-6 sm:px-10 lg:px-12 py-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "font-display font-bold text-[17px] tracking-tight"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` GhostForm `);
          } else {
            return [
              createTextVNode(" GhostForm ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-9"><!--[-->`);
      ssrRenderList(items, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: ["relative pb-1 text-[11.5px] uppercase tracking-[0.14em] transition-colors duration-200", isActive(link.to) ? "text-[#1F1B16]" : "text-[#A9A39A] hover:text-[#1F1B16]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)} `);
              if (isActive(link.to)) {
                _push2(`<span class="absolute left-0 right-0 -bottom-0.5 h-px bg-[#B5563A]"${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createTextVNode(toDisplayString(link.label) + " ", 1),
                isActive(link.to) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "absolute left-0 right-0 -bottom-0.5 h-px bg-[#B5563A]"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex md:hidden items-center gap-2"><button class="w-10 h-10 flex flex-col items-center justify-center gap-[5px]"${ssrRenderAttr("aria-expanded", unref(open))} aria-label="Menu"><span class="${ssrRenderClass([unref(open) ? "translate-y-[3px] rotate-45" : "", "block w-5 h-px bg-[#1F1B16] transition-transform duration-300"])}"></span><span class="${ssrRenderClass([unref(open) ? "-translate-y-[3px] -rotate-45" : "", "block w-5 h-px bg-[#1F1B16] transition-transform duration-300"])}"></span></button></div></div>`);
      if (unref(open)) {
        _push(`<nav class="md:hidden border-t border-[#DDD6C9] bg-[#F7F4EF] px-6 py-4 flex flex-col"><!--[-->`);
        ssrRenderList(items, (link) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: link.to,
            to: link.to,
            class: ["py-3 text-[12px] uppercase tracking-[0.14em] border-b border-[#DDD6C9] last:border-0", isActive(link.to) ? "text-[#B5563A]" : "text-[#8A847C]"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(link.label)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(link.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
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
  const _component_baseHeaderBase = __nuxt_component_0$2;
  const _component_baseButtonNavigate = __nuxt_component_1$1;
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
      "$xNnncsMaJf"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/leads",
      { key: "leads", lazy: true },
      "$bnrOSEvZz0"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/charts/lead",
      { key: "charts_lead", lazy: true },
      "$Lpznypld4p"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/campaigns",
      { key: "campaigns", lazy: true },
      "$8fO1aHlKuI"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/homes",
      { key: "homes", lazy: true },
      "$juR4BfPzct"
      /* nuxt-injected */
    )), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/briefing",
      { key: "briefing", lazy: true },
      "$2UZX3UjVEF"
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
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "bg-[#F7F4EF] text-[#1F1B16] selection:bg-[#B5563A]/15 min-h-screen" }, _attrs))}>`);
      if (unref(authenticated)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_baseNavBar, null, null, _parent));
        _push(`<div class="gf-stage pt-24 pb-28 px-6 sm:px-10 lg:px-12">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><!--]-->`);
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
//# sourceMappingURL=authenticated-DCIxZJFb.mjs.map
