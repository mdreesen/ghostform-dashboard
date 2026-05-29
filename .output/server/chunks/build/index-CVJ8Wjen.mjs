import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { _ as __nuxt_component_1 } from './Section--EyTX4mh.mjs';
import { defineComponent, unref, mergeProps, withCtx, createVNode, createTextVNode, useSlots, toRef, computed, toHandlers, renderSlot, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, ref, toRefs, normalizeProps, guardReactiveProps, useAttrs, h, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { v as useNuxtData, q as _sfc_main$8, _ as __nuxt_component_0$2, i as useLocale, j as useAppConfig, k as useComponentUI, l as useForwardPropsEmits, m as reactivePick, o as usePortal, p as createReusableTemplate, t as tv, V as VisuallyHidden_default, d as useVModel, g as useEmitAsProps, f as useForwardExpose, h as Presence_default, P as Primitive, T as Teleport_default, e as createContext, s as useRuntimeConfig } from './server.mjs';
import { u as useId, a as useHideOthers, b as useBodyScrollLock, F as FocusScope_default, D as DismissableLayer_default, g as getOpenState } from './utils-C4PXEK7I.mjs';
import { p as pointerDownOutside } from './overlay-CjyBzL1C.mjs';
import { w as defu } from '../nitro/nitro.mjs';
import { encode } from 'uqr';
import './Auth-YSaql3Au.mjs';
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
import 'aria-hidden';

const [injectDialogRootContext, provideDialogRootContext] = createContext("DialogRoot");
var DialogRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    modal: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const contentElement = ref();
    const { modal } = toRefs(props);
    provideDialogRootContext({
      open,
      modal,
      openModal: () => {
        open.value = true;
      },
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement,
      contentElement
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", {
        open: unref(open),
        close: () => open.value = false
      });
    };
  }
});
var DialogRoot_default = DialogRoot_vue_vue_type_script_setup_true_lang_default;
var DialogClose_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogClose",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["type"]);
    };
  }
});
var DialogClose_default = DialogClose_vue_vue_type_script_setup_true_lang_default;
var DialogContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    rootContext.titleId ||= useId(void 0, "reka-dialog-title");
    rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FocusScope_default), {
        "as-child": "",
        loop: "",
        trapped: props.trapFocus,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [createVNode(unref(DismissableLayer_default), mergeProps({
          id: unref(rootContext).contentId,
          ref: unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": unref(rootContext).descriptionId,
          "aria-labelledby": unref(rootContext).titleId,
          "data-state": unref(getOpenState)(unref(rootContext).open.value)
        }, _ctx.$attrs, {
          onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
          onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
          onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
          onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
          onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "as",
          "as-child",
          "disable-outside-pointer-events",
          "aria-describedby",
          "aria-labelledby",
          "data-state"
        ])]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});
var DialogContentImpl_default = DialogContentImpl_vue_vue_type_script_setup_true_lang_default;
var DialogContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
        ...props,
        ...unref(emitsAsProps)
      }, {
        ref: unref(forwardRef),
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": true,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            event.preventDefault();
            unref(rootContext).triggerElement.value?.focus();
          }
        }),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: _cache[2] || (_cache[2] = (event) => {
          event.preventDefault();
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});
var DialogContentModal_default = DialogContentModal_vue_vue_type_script_setup_true_lang_default;
var DialogContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    const hasInteractedOutsideRef = ref(false);
    const hasPointerDownOutsideRef = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
        ...props,
        ...unref(emitsAsProps)
      }, {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.value = true;
            if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
          }
          const target = event.target;
          const targetIsTrigger = unref(rootContext).triggerElement.value?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DialogContentNonModal_default = DialogContentNonModal_vue_vue_type_script_setup_true_lang_default;
var DialogContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
        default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(DialogContentModal_default, mergeProps({
          key: 0,
          ref: unref(forwardRef)
        }, {
          ...props,
          ...unref(emitsAsProps),
          ..._ctx.$attrs
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)) : (openBlock(), createBlock(DialogContentNonModal_default, mergeProps({
          key: 1,
          ref: unref(forwardRef)
        }, {
          ...props,
          ...unref(emitsAsProps),
          ..._ctx.$attrs
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var DialogContent_default = DialogContent_vue_vue_type_script_setup_true_lang_default;
var DialogDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "p"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).descriptionId }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var DialogDescription_default = DialogDescription_vue_vue_type_script_setup_true_lang_default;
var DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    useBodyScrollLock(true);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        style: { "pointer-events": "auto" }
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-state"
      ]);
    };
  }
});
var DialogOverlayImpl_default = DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default;
var DialogOverlay_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const rootContext = injectDialogRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence_default), {
        key: 0,
        present: _ctx.forceMount || unref(rootContext).open.value
      }, {
        default: withCtx(() => [createVNode(DialogOverlayImpl_default, mergeProps(_ctx.$attrs, {
          ref: unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, ["as", "as-child"])]),
        _: 3
      }, 8, ["present"])) : createCommentVNode("v-if", true);
    };
  }
});
var DialogOverlay_default = DialogOverlay_vue_vue_type_script_setup_true_lang_default;
var DialogPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DialogPortal_default = DialogPortal_vue_vue_type_script_setup_true_lang_default;
var DialogTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "h2"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).titleId }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var DialogTitle_default = DialogTitle_vue_vue_type_script_setup_true_lang_default;
var DialogTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    const { forwardRef } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-dialog-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref: unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-haspopup": "dialog",
        "aria-expanded": unref(rootContext).open.value || false,
        "aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        onClick: unref(rootContext).onOpenToggle
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "aria-expanded",
        "aria-controls",
        "data-state",
        "onClick"
      ]);
    };
  }
});
var DialogTrigger_default = DialogTrigger_vue_vue_type_script_setup_true_lang_default;
const theme = {
  "slots": {
    "overlay": "fixed inset-0",
    "content": "bg-default divide-y divide-default flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)",
    "wrapper": "",
    "body": "flex-1 p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]",
        "content": "data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]"
      }
    },
    "fullscreen": {
      "true": {
        "content": "inset-0"
      },
      "false": {
        "content": "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default"
      }
    },
    "overlay": {
      "true": {
        "overlay": "bg-elevated/75"
      }
    },
    "scrollable": {
      "true": {
        "overlay": "overflow-y-auto",
        "content": "relative"
      },
      "false": {
        "content": "fixed",
        "body": "overflow-y-auto"
      }
    }
  },
  "compoundVariants": [
    {
      "scrollable": true,
      "fullscreen": false,
      "class": {
        "overlay": "grid place-items-center p-4 sm:py-8"
      }
    },
    {
      "scrollable": false,
      "fullscreen": false,
      "class": {
        "content": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
      }
    }
  ]
};
const _sfc_main$4 = {
  __name: "UModal",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    scrollable: { type: Boolean, required: false },
    transition: { type: Boolean, required: false, default: true },
    fullscreen: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("modal", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
      };
    });
    const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.modal || {} })({
      transition: props.transition,
      fullscreen: props.fullscreen,
      overlay: props.overlay,
      scrollable: props.scrollable
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot_default), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DefineContentTemplate), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DialogContent_default), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!__props.title && !slots.title || !__props.description && !slots.description || !!slots.content) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden_default), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (!__props.title && !slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle_default), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent(unref(DialogTitle_default), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (!__props.description && !slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription_default), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent(unref(DialogDescription_default), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  !__props.title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  !__props.description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass(ui.value.wrapper({ class: unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle_default), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription_default), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose_default), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$8, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("modal.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: unref(uiProp)?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
                            default: withCtx(() => [
                              !__props.title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              !__props.description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: unref(uiProp)?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: unref(uiProp)?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: unref(uiProp)?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("modal.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            !!slots.body ? (openBlock(), createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: unref(uiProp)?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2)) : createCommentVNode("", true),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: unref(uiProp)?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(DialogContent_default), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
                          default: withCtx(() => [
                            !__props.title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            !__props.description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: unref(uiProp)?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: unref(uiProp)?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: unref(uiProp)?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("modal.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          !!slots.body ? (openBlock(), createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: unref(uiProp)?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2)) : createCommentVNode("", true),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: unref(uiProp)?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger_default), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal_default), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.scrollable) {
                    _push3(ssrRenderComponent(unref(DialogOverlay_default), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ReuseContentTemplate))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    if (__props.overlay) {
                      _push3(ssrRenderComponent(unref(DialogOverlay_default), {
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(unref(ReuseContentTemplate), null, null, _parent3, _scopeId2));
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay_default), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ReuseContentTemplate))
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay_default), {
                        key: 0,
                        "data-slot": "overlay",
                        class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                      }, null, 8, ["class"])) : createCommentVNode("", true),
                      createVNode(unref(ReuseContentTemplate))
                    ], 64))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DefineContentTemplate), null, {
                default: withCtx(() => [
                  createVNode(unref(DialogContent_default), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 0 }, {
                        default: withCtx(() => [
                          !__props.title && !slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogTitle_default), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          !__props.description && !slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DialogDescription_default), { key: 3 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: unref(uiProp)?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle_default), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: unref(uiProp)?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription_default), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: unref(uiProp)?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose_default), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$8, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("modal.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        !!slots.body ? (openBlock(), createBlock("div", {
                          key: 1,
                          "data-slot": "body",
                          class: ui.value.body({ class: unref(uiProp)?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2)) : createCommentVNode("", true),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 2,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: unref(uiProp)?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1024),
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal_default), unref(portalProps), {
                default: withCtx(() => [
                  __props.scrollable ? (openBlock(), createBlock(unref(DialogOverlay_default), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(ReuseContentTemplate))
                    ]),
                    _: 1
                  }, 8, ["class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay_default), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(ReuseContentTemplate))
                  ], 64))
                ]),
                _: 1
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Modal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
function getColors(options) {
  const { whiteColor = "white", blackColor = "black", invert = false } = options;
  return {
    backgroundColor: invert ? blackColor : whiteColor,
    foregroundColor: invert ? whiteColor : blackColor
  };
}
function getSize(size, pixelSize = DEFAULT_PIXEL_SIZE) {
  return {
    height: size * pixelSize,
    width: size * pixelSize
  };
}
function getRadius(radius, defRadius = DEFAULT_RADIUS) {
  const pixelRadius = typeof radius === "number" ? radius : radius?.pixel ?? defRadius;
  const outer = typeof radius === "number" ? radius : radius?.marker ?? defRadius;
  const inner = typeof radius === "number" ? radius : radius?.inner ?? outer;
  return {
    pixelRadius,
    markerRadius: {
      outer,
      inner
    }
  };
}
function getVariant(variant, defVariant = "default") {
  const pixelVariant = typeof variant === "string" ? variant : variant?.pixel || defVariant;
  const outer = typeof variant === "string" ? variant : variant?.marker || defVariant;
  const inner = typeof variant === "string" ? variant : variant?.inner || outer;
  return {
    pixelVariant,
    markerVariant: {
      outer,
      inner
    }
  };
}
function limitInput(number) {
  return Math.max(0, Math.min(1, number));
}
function renderUtils(qrSize, qrBorder) {
  const innerSize = qrSize - qrBorder;
  const markerSize = 7;
  const markerPositions = [
    [qrBorder, qrBorder],
    [qrBorder, innerSize - markerSize],
    [innerSize - markerSize, qrBorder]
  ];
  const isInMarkerRange = (value, markerStart) => value >= markerStart && value < markerStart + markerSize;
  const isMarker = (row, col) => markerPositions.some(
    ([x, y]) => isInMarkerRange(row, x) && isInMarkerRange(col, y)
  );
  const isMarkerCenter = (row, col) => markerPositions.some(
    ([x, y]) => row >= x + 2 && row <= x + 4 && col >= y + 2 && col <= y + 4
  );
  return {
    isTopLeft: (row, col) => row < markerSize && col < markerSize,
    isTopRight: (row, col) => row < markerSize && col >= innerSize - markerSize,
    isBottomLeft: (row, col) => row >= innerSize - markerSize && col < markerSize,
    isMarker,
    isMarkerCenter,
    markerPositions,
    markerCenterPositions: markerPositions.map(([x, y]) => [x + 2, y + 2])
  };
}
const DEFAULT_RADIUS = 0.5;
const DEFAULT_PADDING = 0.1;
const DEFAULT_PIXEL_SIZE = 20;
function renderDotPixel(result, border, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size + actualPadding;
        const y = row * size + actualPadding;
        svg += createDotPixel(x, y, actualSize, actualRadius, color, clampedPadding);
      }
    }
  }
  return svg;
}
function renderDotMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (i >= 1 && i <= 5 && j >= 1 && j <= 5) continue;
      const _x = i * size + x + actualPadding;
      const _y = j * size + y + actualPadding;
      svg += createDotPixel(_x, _y, actualSize, actualRadius, color, clampedPadding);
    }
  }
  return svg;
}
function renderDotMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS, padding = DEFAULT_PADDING) {
  let svg = "";
  const clampedRadius = limitInput(radius);
  const clampedPadding = limitInput(padding);
  const actualPadding = clampedPadding * size / 2;
  const actualSize = size - 2 * actualPadding;
  const actualRadius = clampedRadius * actualSize / 2;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const _x = i * size + x + actualPadding;
      const _y = j * size + y + actualPadding;
      svg += createDotPixel(_x, _y, actualSize, actualRadius, color, clampedPadding);
    }
  }
  return svg;
}
function createDotPixel(x, y, size, radius, color, padding = 0) {
  const adjustedX = x + padding;
  const adjustedY = y + padding;
  const adjustedSize = size - 2 * padding;
  return `<rect
    x="${adjustedX}"
    y="${adjustedY}"
    width="${adjustedSize}"
    height="${adjustedSize}"
    rx="${radius}"
    fill="${color}"
  />`;
}
function renderCircleMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const _size = 6 * size;
  const maxOuterRadius = _size / 2;
  const outerRadius = clampedRadius * maxOuterRadius;
  return `<rect x="${x + size / 2}" y="${y + size / 2}" width="${_size}" height="${_size}" rx="${outerRadius}" fill="none" stroke="${color}" stroke-width="${size}"/>`;
}
function renderCircleMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const _size = size * 3;
  return createDotPixel(x, y, _size, clampedRadius * _size / 2, color);
}
function renderDefaultPixel(result, border, size, color) {
  const pixelPaths = [];
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size;
        const y = row * size;
        pixelPaths.push(`M${x},${y}h${size}v${size}h-${size}z`);
      }
    }
  }
  return `<path fill="${color}" d="${pixelPaths.join("")}" shape-rendering="crispEdges"/>`;
}
function renderDefaultMarkerOuter(x, y, size, color) {
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${7 * size}v${7 * size}h-${7 * size}z M${x + 6 * size},${y + size}h-${5 * size}v${5 * size}h${5 * size}z`);
  return `<path fill="${color}" d="${outerPaths.join("")}"/>`;
}
function renderDefaultMarkerInner(x, y, size, color) {
  return `<rect x="${x}" y="${y}" width="${3 * size}" height="${3 * size}" fill="${color}"/>`;
}
function renderPixelatedPixel(result, border, size, foregroundColor) {
  const notchSize = size / 4;
  const paths = [];
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col]) {
        const x = col * size;
        const y = row * size;
        paths.push(`M${x},${y}h${size}v${size}h-${size}z`);
        paths.push(addNotches(result.data, row, col, x, y, size, notchSize));
      }
    }
  }
  return `<g shape-rendering="crispEdges">
  <path fill="${foregroundColor}" d="${paths.join("")}"/>
</g>`;
}
function renderPixelatedMarkerOuter(x, y, size, color) {
  const notchSize = size / 4;
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${7 * size}v${7 * size}h-${7 * size}z M${x + 6 * size},${y + size}h-${5 * size}v${5 * size}h${5 * size}z M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x + 7 * size},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x},${y + 7 * size}h${notchSize}v-${notchSize}h-${notchSize}z M${x + 7 * size - notchSize},${y + 7 * size}h${notchSize}v-${notchSize}h-${notchSize}z`);
  return `<g shape-rendering="crispEdges">
  <path fill="${color}" d="${outerPaths.join("")}"/>
</g>`;
}
function renderPixelatedMarkerInner(x, y, size, color) {
  const notchSize = size / 4;
  const outerPaths = [];
  outerPaths.push(`M${x},${y}h${3 * size}v${3 * size}h-${3 * size}z M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x + 3 * size},${y}h-${notchSize}v${notchSize}h${notchSize}z M${x},${y + 3 * size}h${notchSize}v-${notchSize}h-${notchSize}z M${x + 3 * size - notchSize},${y + 3 * size}h${notchSize}v-${notchSize}h-${notchSize}z`);
  return `<g shape-rendering="crispEdges">
  <path fill="${color}" d="${outerPaths.join("")}"/>
</g>`;
}
function addNotches(data, row, col, x, y, size, notchSize) {
  const checkPixel = (r, c) => {
    if (r < 0 || r >= data.length || c < 0 || c >= data[0].length) return false;
    return data[r][c];
  };
  let notches = "";
  if (!checkPixel(row - 1, col) && !checkPixel(row, col - 1)) {
    notches += `M${x + notchSize},${y}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row - 1, col) && !checkPixel(row, col + 1)) {
    notches += `M${x + notchSize * 2},${y}h${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row + 0, col + 1) && !checkPixel(row + 1, col + 0)) {
    notches += `M${x + size},${y + size - notchSize}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  if (!checkPixel(row + 1, col) && !checkPixel(row + 0, col - 1)) {
    notches += `M${x + notchSize},${y + size - notchSize}h-${notchSize}v${notchSize}h${notchSize}v-${notchSize}z`;
  }
  return notches;
}
function renderRoundedPixel(result, border, size, color, radius = DEFAULT_RADIUS) {
  const paths = [];
  const visited = Array(result.size).fill(null).map(() => Array(result.size).fill(false));
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  for (let row = 0; row < result.size; row++) {
    for (let col = 0; col < result.size; col++) {
      if (!renderUtils(result.size, border).isMarker(row, col) && result.data[row]?.[col] && !visited[row]?.[col]) {
        paths.push(tracePath(result.data, visited, row, col, size, actualRadius));
      }
    }
  }
  return `<path fill="${color}" d="${paths.join(" ")}"/>`;
}
function renderRoundedMarkerOuter(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  const outerPath = createRoundedRectPath(x, y, 7 * size, 7 * size, actualRadius);
  const innerPath = createReversedRoundedRectPath(x + size, y + size, 5 * size, 5 * size, actualRadius);
  return `<path fill="${color}" d="${outerPath} ${innerPath}"/>`;
}
function renderRoundedMarkerInner(x, y, size, color, radius = DEFAULT_RADIUS) {
  const clampedRadius = limitInput(radius);
  const actualRadius = clampedRadius * size / 2;
  const path = createRoundedRectPath(x, y, 3 * size, 3 * size, actualRadius);
  return `<path fill="${color}" d="${path}"/>`;
}
function tracePath(data, visited, startRow, startCol, pixelSize, cornerRadius) {
  const path = [];
  const stack = [[startRow, startCol]];
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length || !data[row][col] || visited[row][col]) {
      continue;
    }
    visited[row][col] = true;
    const x = col * pixelSize;
    const y = row * pixelSize;
    const top = row > 0 && data[row - 1][col];
    const right = col < data[0].length - 1 && data[row][col + 1];
    const bottom = row < data.length - 1 && data[row + 1][col];
    const left = col > 0 && data[row][col - 1];
    path.push(createPixelPath(x, y, pixelSize, cornerRadius, { top, right, bottom, left }));
    stack.push([row - 1, col], [row, col + 1], [row + 1, col], [row, col - 1]);
  }
  return path.join(" ");
}
function createPixelPath(x, y, size, radius = DEFAULT_RADIUS, { top, right, bottom, left }) {
  const commands = [];
  const adjustedRadius = Math.min(radius, size / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  if (!left && !top) {
    commands.push(`M${x},${y + adjustedRadius}`);
    commands.push(`C${x},${y + adjustedRadius - curve} ${x + adjustedRadius - curve},${y} ${x + adjustedRadius},${y}`);
  } else {
    commands.push(`M${x},${y}`);
  }
  if (!top && !right) {
    commands.push(`L${x + size - adjustedRadius},${y}`);
    commands.push(`C${x + size - adjustedRadius + curve},${y} ${x + size},${y + adjustedRadius - curve} ${x + size},${y + adjustedRadius}`);
  } else {
    commands.push(`L${x + size},${y}`);
  }
  if (!right && !bottom) {
    commands.push(`L${x + size},${y + size - adjustedRadius}`);
    commands.push(`C${x + size},${y + size - adjustedRadius + curve} ${x + size - adjustedRadius + curve},${y + size} ${x + size - adjustedRadius},${y + size}`);
  } else {
    commands.push(`L${x + size},${y + size}`);
  }
  if (!bottom && !left) {
    commands.push(`L${x + adjustedRadius},${y + size}`);
    commands.push(`C${x + adjustedRadius - curve},${y + size} ${x},${y + size - adjustedRadius + curve} ${x},${y + size - adjustedRadius}`);
  } else {
    commands.push(`L${x},${y + size}`);
  }
  commands.push("Z");
  return commands.join(" ");
}
function createRoundedRectPath(x, y, width, height, radius = DEFAULT_RADIUS) {
  const adjustedRadius = Math.min(radius, Math.min(width, height) / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  return [
    `M${x + adjustedRadius},${y}`,
    `H${x + width - adjustedRadius}`,
    `C${x + width - adjustedRadius + curve},${y} ${x + width},${y + adjustedRadius - curve} ${x + width},${y + adjustedRadius}`,
    `V${y + height - adjustedRadius}`,
    `C${x + width},${y + height - adjustedRadius + curve} ${x + width - adjustedRadius + curve},${y + height} ${x + width - adjustedRadius},${y + height}`,
    `H${x + adjustedRadius}`,
    `C${x + adjustedRadius - curve},${y + height} ${x},${y + height - adjustedRadius + curve} ${x},${y + height - adjustedRadius}`,
    `V${y + adjustedRadius}`,
    `C${x},${y + adjustedRadius - curve} ${x + adjustedRadius - curve},${y} ${x + adjustedRadius},${y}`,
    "Z"
  ].join(" ");
}
function createReversedRoundedRectPath(x, y, width, height, radius = DEFAULT_RADIUS) {
  const adjustedRadius = Math.min(radius, Math.min(width, height) / 2);
  const curve = adjustedRadius * (4 / 3) * Math.tan(Math.PI / 8);
  return [
    `M${x + width - adjustedRadius},${y}`,
    `H${x + adjustedRadius}`,
    `C${x + adjustedRadius - curve},${y} ${x},${y + adjustedRadius - curve} ${x},${y + adjustedRadius}`,
    `V${y + height - adjustedRadius}`,
    `C${x},${y + height - adjustedRadius + curve} ${x + adjustedRadius - curve},${y + height} ${x + adjustedRadius},${y + height}`,
    `H${x + width - adjustedRadius}`,
    `C${x + width - adjustedRadius + curve},${y + height} ${x + width},${y + height - adjustedRadius + curve} ${x + width},${y + height - adjustedRadius}`,
    `V${y + adjustedRadius}`,
    `C${x + width},${y + adjustedRadius - curve} ${x + width - adjustedRadius + curve},${y} ${x + width - adjustedRadius},${y}`,
    "Z"
  ].join(" ");
}
function renderMarkers(result, border = 1, size, color, variant, radius, padding) {
  const { markerPositions } = renderUtils(result.size, border);
  let svg = "";
  markerPositions.forEach(([row, col]) => {
    const ox = col * size;
    const oy = row * size;
    const ix = ox + 2 * size;
    const iy = oy + 2 * size;
    svg += markerOuterVariants(variant.outer, ox, oy, size, color, radius?.outer, padding);
    svg += markerInnerVariants(variant.inner, ix, iy, size, color, radius?.inner, padding);
  });
  return svg;
}
function markerOuterVariants(variant = "default", x, y, size, color, radius, padding) {
  switch (variant) {
    case "dots":
      return renderDotMarkerOuter(x, y, size, color, radius, padding);
    case "circle":
      return renderCircleMarkerOuter(x, y, size, color, radius);
    case "rounded":
      return renderRoundedMarkerOuter(x, y, size, color, radius);
    case "pixelated":
      return renderPixelatedMarkerOuter(x, y, size, color);
    case "default":
    default:
      return renderDefaultMarkerOuter(x, y, size, color);
  }
}
function markerInnerVariants(variant = "default", x, y, size, color, radius, padding) {
  switch (variant) {
    case "dots":
      return renderDotMarkerInner(x, y, size, color, radius, padding);
    case "circle":
      return renderCircleMarkerInner(x, y, size, color, radius);
    case "rounded":
      return renderRoundedMarkerInner(x, y, size, color, radius);
    case "pixelated":
      return renderPixelatedMarkerInner(x, y, size, color);
    case "default":
    default:
      return renderDefaultMarkerInner(x, y, size, color);
  }
}
function renderPixels(result, border = 1, size, color, variant = "default", radius, padding) {
  switch (variant) {
    case "circle":
    case "dots":
      return renderDotPixel(result, border, size, color, radius, padding);
    case "rounded":
      return renderRoundedPixel(result, border, size, color, radius);
    case "pixelated":
      return renderPixelatedPixel(result, border, size, color);
    case "default":
    default:
      return renderDefaultPixel(result, border, size, color);
  }
}
function renderSVGBody(result, options = {}) {
  const {
    radius,
    pixelSize = DEFAULT_PIXEL_SIZE,
    pixelPadding,
    variant,
    border
  } = options;
  const { backgroundColor, foregroundColor } = getColors(options);
  const { width, height } = getSize(result.size, pixelSize);
  let svgBody = `<rect fill="${backgroundColor}" width="${width}" height="${height}"/>`;
  const { pixelRadius, markerRadius } = getRadius(radius);
  const { pixelVariant, markerVariant } = getVariant(variant);
  svgBody += renderPixels(result, border, pixelSize, foregroundColor, pixelVariant, pixelRadius, pixelPadding);
  svgBody += renderMarkers(result, border, pixelSize, foregroundColor, markerVariant, markerRadius, pixelPadding);
  return svgBody;
}
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Qrcode",
  __ssrInlineRender: true,
  props: {
    value: { type: [String, Array], required: true },
    width: { type: [Number, String], required: false },
    height: { type: [Number, String], required: false },
    preserveAspectRatio: { type: String, required: false },
    variant: { type: [String, Object], required: false },
    radius: { type: [Number, Object], required: false },
    pixelPadding: { type: Number, required: false },
    pixelSize: { type: Number, required: false },
    whiteColor: { type: String, required: false },
    blackColor: { type: String, required: false },
    ecc: { type: String, required: false },
    maskPattern: { type: Number, required: false },
    boostEcc: { type: Boolean, required: false },
    minVersion: { type: Number, required: false },
    maxVersion: { type: Number, required: false },
    border: { type: Number, required: false },
    invert: { type: Boolean, required: false }
  },
  emits: ["encoded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const attrs = useAttrs();
    const _options = reactivePick(props, (_, key) => key !== "value");
    const options = computed(() => {
      return defu(
        _options,
        useRuntimeConfig().public.qrcode.options
      );
    });
    const SVG = computed(() => {
      const {
        radius,
        pixelSize,
        pixelPadding,
        variant,
        width,
        height,
        preserveAspectRatio,
        whiteColor,
        blackColor,
        invert,
        ...opts
      } = options.value;
      const result = encode(toRef(() => props.value).value, {
        ...opts,
        onEncoded: (qr) => emits("encoded", qr)
      });
      const s = getSize(result.size, pixelSize);
      return h("svg", {
        ...attrs,
        xmlns: "http://www.w3.org/2000/svg",
        width,
        height,
        preserveAspectRatio,
        viewBox: `0 0 ${s.width} ${s.height}`,
        innerHTML: renderSVGBody(result, {
          radius,
          pixelSize,
          pixelPadding,
          variant,
          border: opts.border,
          whiteColor,
          blackColor,
          invert
        })
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SVG)), _attrs, null), _parent);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-qrcode/dist/runtime/app/components/qrcode.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "QrCode",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Qrcode = _sfc_main$3;
      _push(ssrRenderComponent(_component_Qrcode, mergeProps({ value: __props.value }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/QrCode.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "BaseQrCode" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    useForm: {
      type: Object,
      default: () => {
      }
    },
    qr_code_url: {
      type: String
    },
    value: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderSection = __nuxt_component_1;
      const _component_UModal = _sfc_main$4;
      const _component_UButton = _sfc_main$8;
      const _component_baseQrCode = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({
        key: __props.label,
        class: "flex flex-col gap-4 backdrop-blur-xl bg-white/2 border border-white/8 p-8 rounded-3xl w-full sm:w-full md:w-full lg:w-75"
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: __props.label }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_UModal, {
        fullscreen: "",
        title: `${__props.label} QR Code`
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_baseQrCode, {
              class: "p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130",
              value: __props.qr_code_url
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_baseQrCode, {
                class: "p-5 sm:p-10 md:p-40 lg:p-60 xl:p-130",
                value: __props.qr_code_url
              }, null, 8, ["value"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "QR Code",
              color: "neutral",
              variant: "subtle",
              class: "bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "QR Code",
                color: "neutral",
                variant: "subtle",
                class: "bg-cyan-400 text-black px-6 py-3 rounded-xl text-xs font-bold hover:shadow-[0_0_20px_rgba(48,207,67,0.4)] transition-all"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.qr_code_url,
        class: "flex items-center gap-3 group text-cyan-400 underline",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Open Standalone Form `);
          } else {
            return [
              createTextVNode(" Open Standalone Form ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-3xl font-bold tabular-nums">${ssrInterpolate(__props.value)}</p></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Card/Form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "BaseCardForm" });
function ghostFormUrl(useCategory, useSource, useName, useEmail, useCalendar) {
  const category = useCategory ? `category=${useCategory}` : "";
  const source = useSource ? `&source=${useSource}` : "";
  const email = useEmail ? `&company_email=${useEmail}` : "";
  const name = useName ? `&company_name=${useName}` : "";
  const calendar = useCalendar ? `&calendar=${useCalendar}` : "";
  return `https://ghostform-zeta.vercel.app/?${category}${source}${name}${email}${calendar}&background_color=0f0b0b&font_color=FFFFFF`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: user } = useNuxtData("user");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_baseHeaderSection = __nuxt_component_1;
      const _component_baseCardForm = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: "Forms",
        subLabel: "Form Selection"
      }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Select available forms" }, null, _parent));
      _push(`<section class="flex flex-wrap justify-between gap-6">`);
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "Data Entry",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "default", unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "Open House",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "open_house", unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseCardForm, {
        label: "House On Market",
        qr_code_url: unref(ghostFormUrl)(unref(user)?.category, "on_market", unref(user)?.company_hashed, unref(user)?.email_hashed, unref(user)?.calendar_link)
      }, null, _parent));
      _push(`</section></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/forms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CVJ8Wjen.mjs.map
