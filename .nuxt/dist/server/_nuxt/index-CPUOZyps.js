import { _ as __nuxt_component_1 } from "./Auth-BV9RYU2X.js";
import { e as useUserSession, d as useNuxtData, _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderTeleport, ssrRenderStyle, ssrRenderVNode, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { Trash2, AlertTriangle, X, ShieldAlert } from "lucide-vue-next";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "tailwindcss/colors";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
import "ohash/utils";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteProfile",
  __ssrInlineRender: true,
  emits: ["confirm-delete"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const isHolding = ref(false);
    const progress = ref(0);
    ref(null);
    const isDeleted = ref(false);
    useUserSession();
    ref(false);
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans" }, _attrs))} data-v-7f0ac2c1><button class="group relative px-6 py-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all w-full flex items-center justify-between overflow-hidden" data-v-7f0ac2c1><div class="flex items-center gap-3 relative z-10" data-v-7f0ac2c1><div class="p-2 bg-red-500/10 rounded-lg text-red-500 group-hover:text-red-400 transition-colors" data-v-7f0ac2c1>`);
      _push(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><div class="text-left" data-v-7f0ac2c1><span class="block text-red-500 font-bold text-sm" data-v-7f0ac2c1>Delete Profile</span><span class="block text-red-500/50 text-[10px] uppercase font-bold tracking-wider" data-v-7f0ac2c1>Irreversible</span></div></div>`);
      _push(ssrRenderComponent(unref(AlertTriangle), { class: "w-5 h-5 text-red-500/20 group-hover:text-red-500 transition-colors relative z-10" }, null, _parent));
      _push(`</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center px-6" data-v-7f0ac2c1><div class="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" data-v-7f0ac2c1></div><div class="relative w-full bg-zinc-900 border border-white/10 rounded-4xl p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" data-v-7f0ac2c1><button class="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors z-20" data-v-7f0ac2c1>`);
          _push2(ssrRenderComponent(unref(X), { class: "w-6 h-6" }, null, _parent));
          _push2(`</button><div class="relative z-10 flex flex-col items-center text-center" data-v-7f0ac2c1><div class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/30" data-v-7f0ac2c1>`);
          _push2(ssrRenderComponent(unref(ShieldAlert), { class: "w-8 h-8 text-red-500" }, null, _parent));
          _push2(`</div><h2 class="text-2xl font-bold text-white mb-2" data-v-7f0ac2c1>Final Warning</h2><p class="text-zinc-400 text-sm leading-relaxed mb-8" data-v-7f0ac2c1> This will wipe your history, metrics, and progress. There is no going back. </p><div class="w-full relative" data-v-7f0ac2c1><div data-v-7f0ac2c1><button class="relative w-full h-16 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center border border-white/5 group select-none touch-none" data-v-7f0ac2c1><div class="absolute bottom-0 left-0 h-full bg-red-600 transition-all duration-75 ease-linear" style="${ssrRenderStyle({ width: `${progress.value}%` })}" data-v-7f0ac2c1></div><div class="relative z-10 flex items-center gap-2 pointer-events-none" data-v-7f0ac2c1>`);
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(isDeleted.value ? "" : unref(Trash2)), {
            class: ["w-5 h-5 transition-colors", progress.value > 50 ? "text-white" : "text-red-500"]
          }, null), _parent);
          _push2(`<span class="${ssrRenderClass([progress.value > 50 ? "text-white" : "text-red-500", "font-bold uppercase tracking-widest text-sm transition-colors"])}" data-v-7f0ac2c1>${ssrInterpolate(isDeleted.value ? "Account Deleted" : isHolding.value ? "Hold to Delete..." : "Press & Hold")}</span></div></button></div>`);
          if (!isDeleted.value) {
            _push2(`<p class="mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest opacity-60" data-v-7f0ac2c1> Release to cancel </p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/10 blur-[80px] pointer-events-none rounded-full" data-v-7f0ac2c1></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/DeleteProfile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-7f0ac2c1"]]), { __name: "BaseDeleteProfile" });
const name = "ghostforminfo";
const type = "module";
const version = "0.0.0.1";
const scripts = { "build": "nuxt build", "dev": "nuxt dev", "generate": "nuxt generate", "preview": "nuxt preview", "postinstall": "nuxt prepare" };
const dependencies = { "@nuxt/image": "^1.11.0", "@nuxt/kit": "^4.2.2", "@nuxt/ui": "^4.3.0", "@nuxtjs/tailwindcss": "^6.14.0", "@pinia/nuxt": "^0.11.3", "@tailwindcss/vite": "^4.1.13", "@vite-pwa/nuxt": "^1.0.4", "@vueuse/motion": "^3.0.3", "bcrypt": "^6.0.0", "date-fns": "^4.1.0", "lucide-vue-next": "^0.556.0", "mongodb": "^6.21.0", "mongoose": "^8.23.1", "nuxt": "^4.2.2", "nuxt-auth-utils": "^0.5.25", "nuxt-charts": "^0.2.4", "nuxt-google-auth": "^0.1.7", "nuxt-notify": "^1.1.4", "nuxt-qrcode": "^0.4.10", "nuxt-vitalizer": "^2.0.0", "pinia": "^3.0.4", "reka-ui": "^2.6.1", "resend": "^6.12.3", "stripe": "^22.1.1", "tailwindcss": "^4.1.13", "vue": "^3.5.21", "vue-router": "^4.5.1", "xlsx": "^0.18.5", "zod": "^4.4.3" };
const devDependencies = { "@iconify-json/lucide": "^1.2.68", "@iconify-json/material-symbols": "^1.2.39", "@nuxtjs/color-mode": "^3.5.2", "@stripe/stripe-js": "^9.4.0", "@types/bcrypt": "^6.0.0", "@types/node": "^24.5.2", "baseline-browser-mapping": "^2.9.5", "sass": "^1.93.0", "typescript": "^5.9.2", "vue-tsc": "^3.0.8" };
const packageJson = {
  name,
  type,
  "private": true,
  version,
  scripts,
  dependencies,
  devDependencies
};
function timeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function formatDate() {
  return (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    timeZone: timeZone(),
    year: "numeric",
    month: "long",
    // 'numeric', '2-digit', 'short'
    day: "numeric",
    hour12: true
    // true for AM/PM, false for 24-hour
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useNuxtData("profile");
    useUserSession();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderAuth = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_baseDeleteProfile = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-4 sm:p-8" }, _attrs))}><div class="max-w-4xl mx-auto py-10 flex flex-col gap-8"><header class="pb-8 border-b border-gray-700">`);
      _push(ssrRenderComponent(_component_baseHeaderAuth, {
        text: "Settings",
        subText: "Manage your profile"
      }, null, _parent));
      _push(`</header><div> CONSTRUCTION ZONE<br> WORK IN PROGRESS </div><div class="flex flex-col mt-4 pt-8 border-t border-gray-700 text-gray-400"><span>Date: ${ssrInterpolate(unref(formatDate)())}</span><span>Time zone: ${ssrInterpolate(unref(timeZone)())}</span><span>Version: ${ssrInterpolate(unref(packageJson).version)}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/privacy-policy",
        class: "underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col gap-8 mt-10 pt-8 border-t border-gray-700"><button class="px-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition duration-300"> Sign Out </button>`);
      _push(ssrRenderComponent(_component_baseDeleteProfile, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CPUOZyps.js.map
