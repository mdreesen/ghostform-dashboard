import { J as useRuntimeConfig, a3 as __nuxt_component_0$1 } from './server.mjs';
import { computed, mergeProps, unref, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { u as useToast } from './useToast-DPDL58XR.mjs';
import '../nitro/nitro.mjs';
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

const _sfc_main$1 = {
  __name: "Toast",
  __ssrInlineRender: true,
  props: {
    toast: { type: Object, required: true }
  },
  emits: ["remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const runtimeConfig = useRuntimeConfig();
    const progress = ref(100);
    ref(false);
    const colorClasses = {
      primary: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
        icon: "text-blue-500"
      },
      secondary: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500",
        icon: "text-purple-500"
      },
      success: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500",
        icon: "text-green-500"
      },
      info: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400",
        icon: "text-blue-400"
      },
      warning: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500",
        icon: "text-yellow-500"
      },
      error: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500",
        icon: "text-red-500"
      },
      neutral: {
        root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500",
        icon: "text-gray-900 dark:text-white"
      }
    };
    const progressColorClasses = {
      primary: "bg-blue-500",
      secondary: "bg-purple-500",
      success: "bg-green-500",
      info: "bg-blue-400",
      warning: "bg-yellow-500",
      error: "bg-red-500",
      neutral: "bg-gray-500"
    };
    const cx = (...parts) => parts.filter(Boolean).join(" ");
    const ui = computed(() => {
      const color = props.toast.color || "primary";
      const orientation = props.toast.orientation || "vertical";
      const o = props.toast.ui || {};
      return {
        root: cx(
          "w-full relative group overflow-hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 p-4 flex gap-2.5",
          "focus:outline-none transition-all duration-300 pointer-events-auto cursor-pointer",
          orientation === "horizontal" ? "items-center" : "items-start",
          colorClasses[color]?.root,
          o.root
        ),
        // universal wrapper that centers @nuxt/icon SVGs
        iconWrap: cx("inline-flex items-center justify-center shrink-0 leading-none"),
        wrapper: cx("w-0 flex-1 flex flex-col", o.wrapper),
        title: cx("text-sm font-medium text-gray-900 dark:text-white", o.title),
        description: cx(
          "text-sm text-gray-500 dark:text-gray-400",
          props.toast.title ? "mt-1" : "",
          o.description
        ),
        // toast icon
        icon: cx("w-5 h-5", colorClasses[color]?.icon, o.icon),
        // avatar
        avatar: cx(
          "shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center",
          o.avatar
        ),
        avatarIcon: cx("w-5 h-5", colorClasses[color]?.icon),
        actions: cx(
          "flex gap-1.5 shrink-0",
          orientation === "horizontal" ? "items-center" : "items-start mt-2.5",
          o.actions
        ),
        // action icon
        actionIconWrap: cx("inline-flex items-center justify-center leading-none"),
        actionIcon: "w-4 h-4",
        progress: cx(
          "absolute inset-x-0 bottom-0 h-1 transition-all duration-100",
          progressColorClasses[color],
          o.progress
        ),
        // fixed square close button (prevents tall look)
        close: cx(
          "h-8 w-8 inline-flex items-center justify-center",
          "shrink-0 rounded-md transition-colors leading-none",
          "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
          "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/50 dark:focus-visible:ring-gray-600/60",
          "cursor-pointer",
          o.close
        ),
        closeIcon: cx("w-4 h-4 block", o.close)
      };
    });
    const toastClasses = computed(() => ui.value.root);
    const shouldShowIcon = computed(() => {
      const globalShowIcon = runtimeConfig.public?.notify?.showIcon ?? true;
      if (props.toast.showIcon === false) return false;
      if (props.toast.showIcon === true) return true;
      return globalShowIcon;
    });
    const showClose = computed(() => props.toast.close !== false);
    const showProgress = computed(() => {
      return props.toast.progress !== false && !!props.toast.duration && props.toast.duration > 0;
    });
    const actionVariantClasses = (variant = "outline") => {
      const base = {
        solid: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
        outline: "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
        soft: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
        ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        link: "text-gray-700 dark:text-gray-300 hover:underline"
      };
      return base[variant];
    };
    const actionColorRing = (color = "neutral") => {
      const map = {
        primary: "focus-visible:ring-blue-500/50",
        secondary: "focus-visible:ring-purple-500/50",
        success: "focus-visible:ring-green-500/50",
        info: "focus-visible:ring-blue-400/50",
        warning: "focus-visible:ring-yellow-500/50",
        error: "focus-visible:ring-red-500/50",
        neutral: "focus-visible:ring-gray-400/50 dark:focus-visible:ring-gray-600/60"
      };
      return map[color];
    };
    const getActionClasses = (action) => {
      const variant = action.variant || "outline";
      const color = action.color || "neutral";
      const base = "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";
      return [
        base,
        actionVariantClasses(variant),
        actionColorRing(color),
        action.class
      ].filter(Boolean).join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: [toastClasses.value, "nuxt-notify-toast"]
      }, _attrs))}>`);
      if (__props.toast.avatar) {
        _push(`<div class="${ssrRenderClass(ui.value.avatar)}">`);
        if (__props.toast.avatar.src) {
          _push(`<img${ssrRenderAttr("src", __props.toast.avatar.src)}${ssrRenderAttr("alt", __props.toast.avatar.alt || "Avatar")} class="w-full h-full object-cover rounded-full">`);
        } else if (__props.toast.avatar.icon) {
          _push(`<span class="${ssrRenderClass(ui.value.iconWrap)}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: __props.toast.avatar.icon,
            class: ui.value.avatarIcon
          }, null, _parent));
          _push(`</span>`);
        } else if (__props.toast.avatar.text) {
          _push(`<span class="flex items-center justify-center w-full h-full text-sm font-medium">${ssrInterpolate(__props.toast.avatar.text)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else if (shouldShowIcon.value && __props.toast.icon) {
        _push(`<span class="${ssrRenderClass(ui.value.iconWrap)}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.toast.icon,
          class: ui.value.icon
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(ui.value.wrapper)}">`);
      if (__props.toast.title) {
        _push(`<div class="${ssrRenderClass(ui.value.title)}">${ssrInterpolate(__props.toast.title)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.toast.description) {
        _push(`<div class="${ssrRenderClass(ui.value.description)}">${ssrInterpolate(__props.toast.description)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.toast.actions && __props.toast.orientation === "vertical") {
        _push(`<div class="${ssrRenderClass(ui.value.actions)}"><!--[-->`);
        ssrRenderList(__props.toast.actions, (action, index) => {
          _push(`<button type="button" class="${ssrRenderClass(getActionClasses(action))}">`);
          if (action.icon) {
            _push(`<span class="${ssrRenderClass(ui.value.actionIconWrap)}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: action.icon,
              class: ui.value.actionIcon
            }, null, _parent));
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span>${ssrInterpolate(action.label)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.toast.actions && __props.toast.orientation === "horizontal") {
        _push(`<div class="${ssrRenderClass(ui.value.actions)}"><!--[-->`);
        ssrRenderList(__props.toast.actions, (action, index) => {
          _push(`<button type="button" class="${ssrRenderClass(getActionClasses(action))}">`);
          if (action.icon) {
            _push(`<span class="${ssrRenderClass(ui.value.actionIconWrap)}">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: action.icon,
              class: ui.value.actionIcon
            }, null, _parent));
            _push(`</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span>${ssrInterpolate(action.label)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showClose.value) {
        _push(`<button type="button" class="${ssrRenderClass(ui.value.close)}" aria-label="Close"><span class="${ssrRenderClass(ui.value.iconWrap)}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: __props.toast.closeIcon || "i-lucide-x",
          class: ui.value.closeIcon
        }, null, _parent));
        _push(`</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (showProgress.value) {
        _push(`<div class="${ssrRenderClass(ui.value.progress)}" style="${ssrRenderStyle({ width: `${progress.value}%` })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-notify/dist/runtime/components/Toast.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "ToastContainer",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts, remove } = useToast();
    const config = useRuntimeConfig();
    const containerClasses = computed(() => {
      const position = config.public?.notify?.position ?? "top-right";
      const base = "fixed pointer-events-none w-full max-w-md sm:max-w-sm md:max-w-md flex flex-col";
      const zIndex = "z-[99999]";
      const padding = "p-4";
      const positions = {
        "top-right": "top-0 right-0 items-end",
        "top-left": "top-0 left-0 items-start",
        "bottom-right": "bottom-0 right-0 items-end",
        "bottom-left": "bottom-0 left-0 items-start",
        "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center"
      };
      return [base, zIndex, padding, positions[position]].filter(Boolean).join(" ");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Toast = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: containerClasses.value }, _attrs))}><ul${ssrRenderAttrs({
        name: "toast",
        class: "flex flex-col gap-3 w-full"
      })}>`);
      ssrRenderList(unref(toasts), (toast) => {
        _push(ssrRenderComponent(_component_Toast, {
          key: toast.id,
          toast,
          onRemove: unref(remove)
        }, null, _parent));
      });
      _push(`</ul></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-notify/dist/runtime/components/ToastContainer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ToastContainer-D7WWRYt2.mjs.map
