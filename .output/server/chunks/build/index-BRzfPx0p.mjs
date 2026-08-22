import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, useSlots, toRef, useTemplateRef, renderSlot, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, resolveDynamicComponent, nextTick, isRef, toRefs, createElementBlock, withModifiers, normalizeProps, guardReactiveProps, Teleport, toValue, createElementVNode, watchEffect, normalizeStyle, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import { u as useHead, p as useUserSession, K as useNuxtData, s as useComponentProps, t as useAppConfig, v as useForwardProps, w as reactivePick, x as usePortal, y as useFormField, z as useFieldGroup, A as useComponentIcons, B as tv, C as isArrayOfArray, D as _sfc_main$e, E as _sfc_main$b, F as FieldGroupReset, G as get, H as _sfc_main$c, e as useVModel, P as Primitive, q as _sfc_main$8, f as isNullish, g as useCollection, I as looseToNumber, k as useForwardExpose, J as getDisplayValue, T as Teleport_default, m as Presence_default, r as refreshNuxtData, d as unrefElement, h as createContext, V as VisuallyHidden_default, j as useForwardProps$1, i as injectConfigProviderContext, o as getActiveElement, l as useResizeObserver } from './server.mjs';
import { _ as _sfc_main$7 } from './Modal-D1BiXRFq.mjs';
import { _ as __nuxt_component_4 } from './Delete-DO58WZdX.mjs';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import { _ as _sfc_main$5 } from './FormField-Df5tB-4c.mjs';
import { _ as _sfc_main$6 } from './Input-CscOUpww.mjs';
import { u as useDirection, P as PopperRoot_default, a as useTypeahead, b as PopperAnchor_default, c as useForwardPropsEmits, d as PopperArrow_default, e as useFocusGuards, f as PopperContent_default } from './PopperArrow-2PR2JttJ.mjs';
import { H as defu, M as isEqual } from '../nitro/nitro.mjs';
import { u as useId, a as useBodyScrollLock, b as useHideOthers, F as FocusScope_default, D as DismissableLayer_default, f as focusFirst } from './utils-p1z9WBnI.mjs';
import { a as selection_campaign_status_lead, b as selection_days, c as selection_frequencies } from './selections-BJNl4IgR.mjs';
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
import 'mongoose';
import 'openai';
import 'resend';
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
import './overlay-CjyBzL1C.mjs';
import '@floating-ui/vue';
import 'aria-hidden';

function clamp(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
  return Math.min(max, Math.max(min, value));
}
function handleAndDispatchCustomEvent(name, handler, detail) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, {
    bubbles: false,
    cancelable: true,
    detail
  });
  if (handler) target.addEventListener(name, handler, { once: true });
  target.dispatchEvent(event);
}
function useFormControl(el) {
  return computed(() => {
    var _a;
    return toValue(el) ? Boolean((_a = unrefElement(el)) == null ? void 0 : _a.closest("form")) : true;
  });
}
function useNonce(nonce) {
  const context = injectConfigProviderContext({ nonce: ref() });
  return computed(() => {
    var _a;
    return (nonce == null ? void 0 : nonce.value) || ((_a = context.nonce) == null ? void 0 : _a.value);
  });
}
const OPEN_KEYS = [
  " ",
  "Enter",
  "ArrowUp",
  "ArrowDown"
];
const SELECTION_KEYS = [" ", "Enter"];
const CONTENT_MARGIN = 10;
function valueComparator(value, currentValue, comparator) {
  if (value === void 0) return false;
  else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
  else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
  if (value === void 0 || currentValue === void 0) return false;
  if (typeof value === "string") return value === currentValue;
  if (typeof comparator === "function") return comparator(value, currentValue);
  if (typeof comparator === "string") return (value == null ? void 0 : value[comparator]) === (currentValue == null ? void 0 : currentValue[comparator]);
  return isEqual(value, currentValue);
}
function shouldShowPlaceholder(value) {
  return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
const _hoisted_1$1 = ["value"];
const [injectSelectRootContext, provideSelectRootContext] = /* @__PURE__ */ createContext("SelectRoot");
var SelectRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SelectRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    nullableValue: {
      type: String,
      required: false,
      default: ""
    },
    by: {
      type: [String, Function],
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emits = __emit;
    const { required, disabled, multiple, dir: propDir } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: (_a = props.defaultValue) != null ? _a : multiple.value ? [] : void 0,
      passive: props.modelValue === void 0,
      deep: true
    });
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const valueElement = ref();
    const triggerPointerDownPosRef = ref({
      x: 0,
      y: 0
    });
    const isEmptyModelValue = computed(() => {
      var _a2;
      if (multiple.value && Array.isArray(modelValue.value)) return ((_a2 = modelValue.value) == null ? void 0 : _a2.length) === 0;
      else return isNullish(modelValue.value);
    });
    useCollection({ isProvider: true });
    const dir = useDirection(propDir);
    const isFormControl = useFormControl(triggerElement);
    const optionsSet = ref(/* @__PURE__ */ new Set());
    const nativeSelectKey = computed(() => {
      return Array.from(optionsSet.value).map((option) => option.value).join(";");
    });
    function handleValueChange(value) {
      if (multiple.value) {
        const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
        const index = array.findIndex((i) => compare(i, value, props.by));
        index === -1 ? array.push(value) : array.splice(index, 1);
        modelValue.value = [...array];
      } else modelValue.value = value;
    }
    function getOption(value) {
      return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
    }
    provideSelectRootContext({
      triggerElement,
      onTriggerChange: (node) => {
        triggerElement.value = node;
      },
      valueElement,
      onValueElementChange: (node) => {
        valueElement.value = node;
      },
      contentId: "",
      modelValue,
      onValueChange: handleValueChange,
      by: props.by,
      open,
      multiple,
      required,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      triggerPointerDownPosRef,
      disabled,
      isEmptyModelValue,
      optionsSet,
      onOptionAdd: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
        optionsSet.value.add(option);
      },
      onOptionRemove: (option) => {
        const existingOption = getOption(option.value);
        if (existingOption) optionsSet.value.delete(existingOption);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperRoot_default), null, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
          modelValue: unref(modelValue),
          open: unref(open)
        }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(BubbleSelect_default, {
          key: nativeSelectKey.value,
          "aria-hidden": "true",
          tabindex: "-1",
          multiple: unref(multiple),
          required: unref(required),
          name: _ctx.name,
          autocomplete: _ctx.autocomplete,
          disabled: unref(disabled),
          value: unref(modelValue)
        }, {
          default: withCtx(() => [unref(isNullish)(unref(modelValue)) ? (openBlock(), createElementBlock("option", {
            key: 0,
            value: _ctx.nullableValue
          }, null, 8, _hoisted_1$1)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(optionsSet.value), (option) => {
            var _a2;
            return openBlock(), createElementBlock("option", mergeProps({ key: (_a2 = option.value) != null ? _a2 : "" }, { ref_for: true }, option), null, 16);
          }), 128))]),
          _: 1
        }, 8, [
          "multiple",
          "required",
          "name",
          "autocomplete",
          "disabled",
          "value"
        ])) : createCommentVNode("v-if", true)]),
        _: 3
      });
    };
  }
});
var SelectRoot_default = SelectRoot_vue_vue_type_script_setup_true_lang_default;
var BubbleSelect_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "BubbleSelect",
  props: {
    autocomplete: {
      type: String,
      required: false
    },
    autofocus: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    form: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    size: {
      type: Number,
      required: false
    },
    value: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const selectElement = ref();
    const rootContext = injectSelectRootContext();
    watch(() => props.value, (cur, prev) => {
      const selectProto = (void 0).HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(selectProto, "value");
      const setValue = descriptor.set;
      if (cur !== prev && setValue && selectElement.value) {
        const event = new Event("change", { bubbles: true });
        setValue.call(selectElement.value, cur);
        selectElement.value.dispatchEvent(event);
      }
    });
    function handleInput(event) {
      rootContext.onValueChange(event.target.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(VisuallyHidden_default), { "as-child": "" }, {
        default: withCtx(() => [createElementVNode("select", mergeProps({
          ref_key: "selectElement",
          ref: selectElement
        }, props, { onInput: handleInput }), [renderSlot(_ctx.$slots, "default")], 16)]),
        _: 3
      });
    };
  }
});
var BubbleSelect_default = BubbleSelect_vue_vue_type_script_setup_true_lang_default;
var SelectPopperPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectPopperPosition",
  props: {
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false,
      default: CONTENT_MARGIN
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
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
    const props = __props;
    const forwarded = useForwardProps$1(props);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperContent_default), mergeProps(unref(forwarded), { style: {
        "boxSizing": "border-box",
        "--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-select-content-available-width": "var(--reka-popper-available-width)",
        "--reka-select-content-available-height": "var(--reka-popper-available-height)",
        "--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectPopperPosition_default = SelectPopperPosition_vue_vue_type_script_setup_true_lang_default;
const SelectContentDefaultContextValue = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
};
const [injectSelectContentContext, provideSelectContentContext] = /* @__PURE__ */ createContext("SelectContent");
var SelectContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectContentImpl",
  props: {
    position: {
      type: String,
      required: false,
      default: "item-aligned"
    },
    bodyLock: {
      type: Boolean,
      required: false,
      default: true
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false,
      default: "start"
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectSelectRootContext();
    useFocusGuards();
    useBodyScrollLock(props.bodyLock);
    const { CollectionSlot, getItems } = useCollection();
    const content = ref();
    useHideOthers(content);
    const { search, handleTypeaheadSearch } = useTypeahead();
    const viewport = ref();
    const selectedItem = ref();
    const selectedItemText = ref();
    const isPositioned = ref(false);
    const firstValidItemFoundRef = ref(false);
    const firstSelectedItemInArrayFoundRef = ref(false);
    function focusSelectedItem() {
      if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
    }
    watch(isPositioned, () => {
      focusSelectedItem();
    });
    const { onOpenChange, triggerPointerDownPosRef } = rootContext;
    watchEffect((cleanupFn) => {
      if (!content.value) return;
      let pointerMoveDelta = {
        x: 0,
        y: 0
      };
      const handlePointerMove = (event) => {
        var _a, _b, _c, _d;
        pointerMoveDelta = {
          x: Math.abs(Math.round(event.pageX) - ((_b = (_a = triggerPointerDownPosRef.value) == null ? void 0 : _a.x) != null ? _b : 0)),
          y: Math.abs(Math.round(event.pageY) - ((_d = (_c = triggerPointerDownPosRef.value) == null ? void 0 : _c.y) != null ? _d : 0))
        };
      };
      const handlePointerUp = (event) => {
        var _a;
        if (event.pointerType === "touch") return;
        if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
        else if (!((_a = content.value) == null ? void 0 : _a.contains(event.target))) onOpenChange(false);
        (void 0).removeEventListener("pointermove", handlePointerMove);
        triggerPointerDownPosRef.value = null;
      };
      if (triggerPointerDownPosRef.value !== null) {
        (void 0).addEventListener("pointermove", handlePointerMove);
        (void 0).addEventListener("pointerup", handlePointerUp, {
          capture: true,
          once: true
        });
      }
      cleanupFn(() => {
        (void 0).removeEventListener("pointermove", handlePointerMove);
        (void 0).removeEventListener("pointerup", handlePointerUp, { capture: true });
      });
    });
    function handleKeyDown(event) {
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      if (event.key === "Tab") event.preventDefault();
      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
      if ([
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End"
      ].includes(event.key)) {
        const collectionItems = getItems().map((i) => i.ref);
        let candidateNodes = [...collectionItems];
        if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
          const currentElement = event.target;
          const currentIndex = candidateNodes.indexOf(currentElement);
          candidateNodes = candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(() => focusFirst(candidateNodes));
        event.preventDefault();
      }
    }
    const pickedProps = computed(() => {
      if (props.position === "popper") return props;
      else return {};
    });
    const forwardedProps = useForwardProps$1(pickedProps.value);
    provideSelectContentContext({
      content,
      viewport,
      onViewportChange: (node) => {
        viewport.value = node;
      },
      itemRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (rootContext.multiple.value) {
          if (firstSelectedItemInArrayFoundRef.value) return;
          if (isSelectedItem || isFirstValidItem) {
            selectedItem.value = node;
            if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
          }
        } else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
        if (isFirstValidItem) firstValidItemFoundRef.value = true;
      },
      selectedItem,
      selectedItemText,
      onItemLeave: () => {
        var _a;
        (_a = content.value) == null ? void 0 : _a.focus();
      },
      itemTextRefCallback: (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
        const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
        if (isSelectedItem || isFirstValidItem) selectedItemText.value = node;
      },
      focusSelectedItem,
      position: props.position,
      isPositioned,
      searchRef: search
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [createVNode(unref(FocusScope_default), {
          "as-child": "",
          onMountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {
          }, ["prevent"])),
          onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
            var _a;
            emits("closeAutoFocus", event);
            if (event.defaultPrevented) return;
            (_a = unref(rootContext).triggerElement.value) == null ? void 0 : _a.focus({ preventScroll: true });
            event.preventDefault();
          })
        }, {
          default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
            "as-child": "",
            "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
            onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {
            }, ["prevent"])),
            onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onOpenChange(false)),
            onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
            onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
          }, {
            default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), mergeProps({
              ..._ctx.$attrs,
              ...unref(forwardedProps)
            }, {
              id: unref(rootContext).contentId,
              ref: (vnode) => {
                if (!vnode) return void 0;
                const el = unref(unrefElement)(vnode);
                if (el == null ? void 0 : el.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
                else content.value = el;
                return void 0;
              },
              role: "listbox",
              "data-state": unref(rootContext).open.value ? "open" : "closed",
              dir: unref(rootContext).dir.value,
              style: {
                display: "flex",
                flexDirection: "column",
                outline: "none"
              },
              onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {
              }, ["prevent"])),
              onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
              onKeydown: handleKeyDown
            }), {
              default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 16, [
              "id",
              "data-state",
              "dir",
              "onKeydown"
            ]))]),
            _: 3
          }, 8, ["disable-outside-pointer-events"])]),
          _: 3
        })]),
        _: 3
      });
    };
  }
});
var SelectContentImpl_default = SelectContentImpl_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = /* @__PURE__ */ createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SelectItemAlignedPosition",
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
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { getItems } = useCollection();
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const shouldExpandOnScrollRef = ref(false);
    const shouldRepositionRef = ref(true);
    const contentWrapperElement = ref();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
    function position() {
      if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && (viewport == null ? void 0 : viewport.value) && (selectedItem == null ? void 0 : selectedItem.value) && (selectedItemText == null ? void 0 : selectedItemText.value)) {
        const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
        const contentRect = contentElement.value.getBoundingClientRect();
        const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
        const itemTextRect = selectedItemText.value.getBoundingClientRect();
        if (rootContext.dir.value !== "rtl") {
          const itemTextOffset = itemTextRect.left - contentRect.left;
          const left = valueNodeRect.left - itemTextOffset;
          const leftDelta = triggerRect.left - left;
          const minContentWidth = triggerRect.width + leftDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const rightEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedLeft = clamp(left, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.left = `${clampedLeft}px`;
        } else {
          const itemTextOffset = contentRect.right - itemTextRect.right;
          const right = (void 0).innerWidth - valueNodeRect.right - itemTextOffset;
          const rightDelta = (void 0).innerWidth - triggerRect.right - right;
          const minContentWidth = triggerRect.width + rightDelta;
          const contentWidth = Math.max(minContentWidth, contentRect.width);
          const leftEdge = (void 0).innerWidth - CONTENT_MARGIN;
          const clampedRight = clamp(right, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth));
          contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
          contentWrapperElement.value.style.right = `${clampedRight}px`;
        }
        const items = getItems().map((i) => i.ref);
        const availableHeight = (void 0).innerHeight - CONTENT_MARGIN * 2;
        const itemsHeight = viewport.value.scrollHeight;
        const contentStyles = (void 0).getComputedStyle(contentElement.value);
        const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
        const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
        const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
        const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
        const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
        const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
        const viewportStyles = (void 0).getComputedStyle(viewport.value);
        const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
        const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
        const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
        const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
        const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
        const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
        const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
        const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
        const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
        if (willAlignWithoutTopOverflow) {
          const isLastItem = selectedItem.value === items.at(-1);
          contentWrapperElement.value.style.bottom = `0px`;
          const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
          const clampedTriggerMiddleToBottomEdge = Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
          const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
          contentWrapperElement.value.style.height = `${height}px`;
        } else {
          const isFirstItem = selectedItem.value === items[0];
          contentWrapperElement.value.style.top = `0px`;
          const clampedTopEdgeToTriggerMiddle = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight);
          const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
          contentWrapperElement.value.style.height = `${height}px`;
          viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
        }
        contentWrapperElement.value.style.margin = `${CONTENT_MARGIN}px 0`;
        contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
        contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
        emits("placed");
        requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
      }
    }
    const contentZIndex = ref("");
    function handleScrollButtonChange(node) {
      if (node && shouldRepositionRef.value === true) {
        position();
        focusSelectedItem == null ? void 0 : focusSelectedItem();
        shouldRepositionRef.value = false;
      }
    }
    useResizeObserver(rootContext.triggerElement, () => {
      position();
    });
    provideSelectItemAlignedPositionContext({
      contentWrapper: contentWrapperElement,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "contentWrapperElement",
        ref: contentWrapperElement,
        style: normalizeStyle({
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          zIndex: contentZIndex.value
        })
      }, [createVNode(unref(Primitive), mergeProps({
        ref: unref(forwardRef),
        style: {
          boxSizing: "border-box",
          maxHeight: "100%"
        }
      }, {
        ..._ctx.$attrs,
        ...props
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)], 4);
    };
  }
});
var SelectItemAlignedPosition_default = SelectItemAlignedPosition_vue_vue_type_script_setup_true_lang_default;
var SelectArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectArrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    const contentContext = injectSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return unref(contentContext).position === "popper" ? (openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(mergeProps({ key: 0 }, props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : createCommentVNode("v-if", true);
    };
  }
});
var SelectArrow_default = SelectArrow_vue_vue_type_script_setup_true_lang_default;
var SelectProvider_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SelectProvider",
  props: { context: {
    type: Object,
    required: true
  } },
  setup(__props) {
    const props = __props;
    provideSelectRootContext(props.context);
    provideSelectContentContext(SelectContentDefaultContextValue);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
var SelectProvider_default = SelectProvider_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = { key: 1 };
var SelectContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SelectContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false
    },
    bodyLock: {
      type: Boolean,
      required: false
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const rootContext = injectSelectRootContext();
    const fragment = ref();
    const presenceRef = ref();
    const present = computed(() => props.forceMount || rootContext.open.value);
    const renderPresence = ref(present.value);
    let renderPresenceTimeout;
    function clearRenderPresenceTimeout() {
      if (renderPresenceTimeout) {
        clearTimeout(renderPresenceTimeout);
        renderPresenceTimeout = void 0;
      }
    }
    watch(present, (_value, _oldValue, onCleanup) => {
      clearRenderPresenceTimeout();
      renderPresenceTimeout = setTimeout(() => {
        renderPresence.value = present.value;
        renderPresenceTimeout = void 0;
      });
      onCleanup(clearRenderPresenceTimeout);
    });
    return (_ctx, _cache) => {
      var _a;
      return present.value || renderPresence.value || ((_a = presenceRef.value) == null ? void 0 : _a.present) ? (openBlock(), createBlock(unref(Presence_default), {
        key: 0,
        ref_key: "presenceRef",
        ref: presenceRef,
        present: present.value
      }, {
        default: withCtx(() => [createVNode(SelectContentImpl_default, normalizeProps(guardReactiveProps({
          ...unref(forwarded),
          ..._ctx.$attrs
        })), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)]),
        _: 3
      }, 8, ["present"])) : fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(Teleport, { to: fragment.value }, [createVNode(SelectProvider_default, { context: unref(rootContext) }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["context"])], 8, ["to"]))])) : createCommentVNode("v-if", true);
    };
  }
});
var SelectContent_default = SelectContent_vue_vue_type_script_setup_true_lang_default;
const [injectSelectGroupContext, provideSelectGroupContext] = /* @__PURE__ */ createContext("SelectGroup");
var SelectGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectGroup",
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
    const props = __props;
    const id = useId(void 0, "reka-select-group");
    provideSelectGroupContext({ id });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props, { "aria-labelledby": unref(id) }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["aria-labelledby"]);
    };
  }
});
var SelectGroup_default = SelectGroup_vue_vue_type_script_setup_true_lang_default;
const [injectSelectItemContext, provideSelectItemContext] = /* @__PURE__ */ createContext("SelectItem");
var SelectItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectItem",
  props: {
    value: {
      type: null,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false
    },
    textValue: {
      type: String,
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
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emits = __emit;
    const { disabled } = toRefs(props);
    const rootContext = injectSelectRootContext();
    const contentContext = injectSelectContentContext();
    const { forwardRef } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isSelected = computed(() => {
      var _a2;
      return valueComparator((_a2 = rootContext.modelValue) == null ? void 0 : _a2.value, props.value, rootContext.by);
    });
    const isFocused = ref(false);
    const textValue = ref((_a = props.textValue) != null ? _a : "");
    const textId = useId(void 0, "reka-select-item-text");
    const SELECT_SELECT = "select.select";
    async function handleSelectCustomEvent(ev) {
      if (ev.defaultPrevented) return;
      const eventDetail = {
        originalEvent: ev,
        value: props.value
      };
      handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
    }
    async function handleSelect(ev) {
      await nextTick();
      emits("select", ev);
      if (ev.defaultPrevented) return;
      if (!disabled.value) {
        rootContext.onValueChange(props.value);
        if (!rootContext.multiple.value) rootContext.onOpenChange(false);
      }
    }
    async function handlePointerMove(event) {
      var _a2, _b;
      await nextTick();
      if (event.defaultPrevented) return;
      if (disabled.value) (_a2 = contentContext.onItemLeave) == null ? void 0 : _a2.call(contentContext);
      else (_b = event.currentTarget) == null ? void 0 : _b.focus({ preventScroll: true });
    }
    async function handlePointerLeave(event) {
      var _a2;
      await nextTick();
      if (event.defaultPrevented) return;
      if (event.currentTarget === getActiveElement()) (_a2 = contentContext.onItemLeave) == null ? void 0 : _a2.call(contentContext);
    }
    async function handleKeyDown(event) {
      var _a2;
      await nextTick();
      if (event.defaultPrevented) return;
      const isTypingAhead = ((_a2 = contentContext.searchRef) == null ? void 0 : _a2.value) !== "";
      if (isTypingAhead && event.key === " ") return;
      if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
      if (event.key === " ") event.preventDefault();
    }
    if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
    provideSelectItemContext({
      value: props.value,
      disabled,
      textId,
      isSelected,
      onItemTextChange: (node) => {
        var _a2;
        textValue.value = ((_a2 = textValue.value || (node == null ? void 0 : node.textContent)) != null ? _a2 : "").trim();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: textValue.value } }, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          ref: unref(forwardRef),
          role: "option",
          "aria-labelledby": unref(textId),
          "data-highlighted": isFocused.value ? "" : void 0,
          "aria-selected": isSelected.value,
          "data-state": isSelected.value ? "checked" : "unchecked",
          "aria-disabled": unref(disabled) || void 0,
          "data-disabled": unref(disabled) ? "" : void 0,
          tabindex: unref(disabled) ? void 0 : -1,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
          onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
          onPointerup: handleSelectCustomEvent,
          onPointerdown: _cache[2] || (_cache[2] = (event) => {
            event.currentTarget.focus({ preventScroll: true });
          }),
          onTouchend: _cache[3] || (_cache[3] = withModifiers(() => {
          }, ["prevent", "stop"])),
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onKeydown: handleKeyDown
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "aria-labelledby",
          "data-highlighted",
          "aria-selected",
          "data-state",
          "aria-disabled",
          "data-disabled",
          "tabindex",
          "as",
          "as-child"
        ])]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var SelectItem_default = SelectItem_vue_vue_type_script_setup_true_lang_default;
var SelectItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectItemIndicator",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const itemContext = injectSelectItemContext();
    return (_ctx, _cache) => {
      return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
        key: 0,
        "aria-hidden": "true"
      }, props), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16)) : createCommentVNode("v-if", true);
    };
  }
});
var SelectItemIndicator_default = SelectItemIndicator_vue_vue_type_script_setup_true_lang_default;
var SelectItemText_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SelectItemText",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    injectSelectRootContext();
    injectSelectContentContext();
    const itemContext = injectSelectItemContext();
    const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
    computed(() => {
      var _a, _b, _c, _d;
      return {
        value: itemContext.value,
        disabled: itemContext.disabled.value,
        textContent: (_d = (_c = (_a = itemTextElement.value) == null ? void 0 : _a.textContent) != null ? _c : (_b = itemContext.value) == null ? void 0 : _b.toString()) != null ? _d : ""
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({
        id: unref(itemContext).textId,
        ref: unref(forwardRef)
      }, {
        ...props,
        ..._ctx.$attrs
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectItemText_default = SelectItemText_vue_vue_type_script_setup_true_lang_default;
var SelectLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectLabel",
  props: {
    for: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    }
  },
  setup(__props) {
    const props = __props;
    const groupContext = injectSelectGroupContext({ id: "" });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(groupContext).id }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var SelectLabel_default = SelectLabel_vue_vue_type_script_setup_true_lang_default;
var SelectPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectPortal",
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
var SelectPortal_default = SelectPortal_vue_vue_type_script_setup_true_lang_default;
var SelectSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectSeparator",
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
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps({ "aria-hidden": "true" }, props), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var SelectSeparator_default = SelectSeparator_vue_vue_type_script_setup_true_lang_default;
var SelectTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
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
    const rootContext = injectSelectRootContext();
    const { forwardRef } = useForwardExpose();
    const isDisabled = computed(() => {
      var _a;
      return ((_a = rootContext.disabled) == null ? void 0 : _a.value) || props.disabled;
    });
    rootContext.contentId || (rootContext.contentId = useId(void 0, "reka-select-content"));
    const { getItems } = useCollection();
    const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
    function handleOpen() {
      if (!isDisabled.value) {
        rootContext.onOpenChange(true);
        resetTypeahead();
      }
    }
    function handlePointerOpen(event) {
      handleOpen();
      rootContext.triggerPointerDownPosRef.value = {
        x: Math.round(event.pageX),
        y: Math.round(event.pageY)
      };
    }
    function isPlainLeftClick(event) {
      return event.button === 0 && event.ctrlKey === false;
    }
    let openedFromPointerDown = false;
    function onTriggerPointerDown(event) {
      if (event.pointerType === "touch") return event.preventDefault();
      const target = event.target;
      if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
      if (isPlainLeftClick(event)) {
        handlePointerOpen(event);
        openedFromPointerDown = true;
      }
    }
    function onTriggerMouseDown(event) {
      if (isPlainLeftClick(event)) event.preventDefault();
    }
    function onTriggerClick(event) {
      var _a;
      if (!openedFromPointerDown) (_a = event.currentTarget) == null ? void 0 : _a.focus();
      openedFromPointerDown = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperAnchor_default), {
        "as-child": "",
        reference: _ctx.reference
      }, {
        default: withCtx(() => {
          var _a, _b, _c, _d;
          return [createVNode(unref(Primitive), {
            ref: unref(forwardRef),
            role: "combobox",
            type: _ctx.as === "button" ? "button" : void 0,
            "aria-controls": unref(rootContext).contentId,
            "aria-expanded": unref(rootContext).open.value || false,
            "aria-required": (_a = unref(rootContext).required) == null ? void 0 : _a.value,
            "aria-autocomplete": "none",
            disabled: isDisabled.value,
            dir: (_b = unref(rootContext)) == null ? void 0 : _b.dir.value,
            "data-state": ((_c = unref(rootContext)) == null ? void 0 : _c.open.value) ? "open" : "closed",
            "data-disabled": isDisabled.value ? "" : void 0,
            "data-placeholder": unref(shouldShowPlaceholder)((_d = unref(rootContext).modelValue) == null ? void 0 : _d.value) ? "" : void 0,
            "as-child": _ctx.asChild,
            as: _ctx.as,
            onClick: onTriggerClick,
            onPointerdown: onTriggerPointerDown,
            onMousedown: onTriggerMouseDown,
            onPointerup: _cache[0] || (_cache[0] = withModifiers((event) => {
              if (event.pointerType === "touch") handlePointerOpen(event);
            }, ["prevent"])),
            onKeydown: _cache[1] || (_cache[1] = (event) => {
              const isTypingAhead = unref(search) !== "";
              const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
              if (!isModifierKey && event.key.length === 1) {
                if (isTypingAhead && event.key === " ") return;
              }
              unref(handleTypeaheadSearch)(event.key, unref(getItems)());
              if (unref(OPEN_KEYS).includes(event.key)) {
                handleOpen();
                event.preventDefault();
              }
            })
          }, {
            default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
            _: 3
          }, 8, [
            "type",
            "aria-controls",
            "aria-expanded",
            "aria-required",
            "disabled",
            "dir",
            "data-state",
            "data-disabled",
            "data-placeholder",
            "as-child",
            "as"
          ])];
        }),
        _: 3
      }, 8, ["reference"]);
    };
  }
});
var SelectTrigger_default = SelectTrigger_vue_vue_type_script_setup_true_lang_default;
var SelectValue_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectValue",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef } = useForwardExpose();
    const rootContext = injectSelectRootContext();
    const selectedLabel = computed(() => {
      var _a, _b;
      let list = [];
      const options = Array.from(rootContext.optionsSet.value);
      const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
      if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => {
        var _a2, _b2;
        return (_b2 = (_a2 = getOption(value)) == null ? void 0 : _a2.textContent) != null ? _b2 : "";
      });
      else list = [(_b = (_a = getOption(rootContext.modelValue.value)) == null ? void 0 : _a.textContent) != null ? _b : ""];
      return list.filter(Boolean);
    });
    const slotText = computed(() => {
      return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        style: { pointerEvents: "none" },
        "data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
          selectedLabel: selectedLabel.value,
          modelValue: unref(rootContext).modelValue.value
        }, () => [createTextVNode(toDisplayString(slotText.value), 1)])]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-placeholder"
      ]);
    };
  }
});
var SelectValue_default = SelectValue_vue_vue_type_script_setup_true_lang_default;
var SelectViewport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SelectViewport",
  props: {
    nonce: {
      type: String,
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
    const props = __props;
    const { nonce: propNonce } = toRefs(props);
    const nonce = useNonce(propNonce);
    const contentContext = injectSelectContentContext();
    const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
    const { forwardRef } = useForwardExpose();
    const prevScrollTopRef = ref(0);
    function handleScroll(event) {
      const viewport = event.currentTarget;
      const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext != null ? alignedPositionContext : {};
      if ((shouldExpandOnScrollRef == null ? void 0 : shouldExpandOnScrollRef.value) && (contentWrapper == null ? void 0 : contentWrapper.value)) {
        const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
        if (scrolledBy > 0) {
          const availableHeight = (void 0).innerHeight - CONTENT_MARGIN * 2;
          const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
          const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
          const prevHeight = Math.max(cssMinHeight, cssHeight);
          if (prevHeight < availableHeight) {
            const nextHeight = prevHeight + scrolledBy;
            const clampedNextHeight = Math.min(availableHeight, nextHeight);
            const heightDiff = nextHeight - clampedNextHeight;
            contentWrapper.value.style.height = `${clampedNextHeight}px`;
            if (contentWrapper.value.style.bottom === "0px") {
              viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
              contentWrapper.value.style.justifyContent = "flex-end";
            }
          }
        }
      }
      prevScrollTopRef.value = viewport.scrollTop;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
        ref: unref(forwardRef),
        "data-reka-select-viewport": "",
        role: "presentation"
      }, {
        ..._ctx.$attrs,
        ...props
      }, {
        style: {
          position: "relative",
          flex: 1,
          overflow: "hidden auto"
        },
        onScroll: handleScroll
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16), createVNode(unref(Primitive), {
        as: "style",
        nonce: unref(nonce)
      }, {
        default: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
        _: 1,
        __: [0]
      }, 8, ["nonce"])], 64);
    };
  }
});
var SelectViewport_default = SelectViewport_vue_vue_type_script_setup_true_lang_default;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Section",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      required: true,
      default: "Header"
    },
    subText: {
      type: String
    },
    css: {
      type: String,
      default: "mb-6"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<!--[--><h2 class="${ssrRenderClass(`text-lg font-bold tracking-tighter ${__props.css}`)}">${(_a = __props.text) != null ? _a : ""}</h2>`);
      if (__props.subText) {
        _push(`<span class="font-bold tracking-tighter">${(_b = __props.subText) != null ? _b : ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Header/Section.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$4, { __name: "BaseHeaderSection" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Campaign",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { fetch: refreshSession } = useUserSession();
    const toast = useToast();
    const loading = ref(false);
    const toggling = ref(false);
    const togglingVary = ref(false);
    const open = ref(false);
    const cadenceLabel = computed(() => {
      var _a;
      switch ((_a = props.data) == null ? void 0 : _a.timesPerMonth) {
        case 4:
          return "Weekly";
        case 2:
          return "Every other week";
        case 1:
          return "Monthly";
        default:
          return "Monthly";
      }
    });
    const dayLabel = computed(() => {
      var _a, _b;
      const days = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
      return (_b = days[(_a = props.data) == null ? void 0 : _a.dayOfWeek]) != null ? _b : "";
    });
    const isActive = computed(() => {
      var _a;
      return ((_a = props.data) == null ? void 0 : _a.active) !== false;
    });
    const useToggle = async () => {
      toggling.value = true;
      try {
        await $fetch("/api/campaigns/toggle", {
          method: "POST",
          body: { _id: props.data._id, active: !isActive.value }
        });
        await refreshNuxtData("campaigns");
        toast.success(isActive.value ? "Campaign paused" : "Campaign resumed");
      } catch (error) {
        toast.error("Could not update campaign.");
      } finally {
        toggling.value = false;
      }
    };
    const varying = computed(() => {
      var _a;
      return ((_a = props.data) == null ? void 0 : _a.varyWording) !== false;
    });
    const useDelete = async () => {
      loading.value = true;
      try {
        await $fetch("/api/campaigns", {
          method: "DELETE",
          body: props.data
        });
        await refreshSession();
        await refreshNuxtData("campaigns");
        toast.success("Automation Deleted");
        open.value = false;
      } catch (error) {
        toast.error("Failed to mount criteria templates.");
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_baseHeaderSection = __nuxt_component_0$1;
      const _component_UButton = _sfc_main$8;
      const _component_UModal = _sfc_main$7;
      const _component_baseButtonDelete = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#F7F4EF] border border-[#DDD6C9] p-8 w-full sm:w-full md:w-full lg:w-75" }, _attrs))}><div class="flex items-center justify-between mb-2">`);
      _push(ssrRenderComponent(_component_baseHeaderSection, {
        text: (_a = __props.data) == null ? void 0 : _a.title,
        css: "mb-0"
      }, null, _parent));
      _push(`<span class="${ssrRenderClass([unref(isActive) ? "bg-[#5A6349]/10 text-[#5A6349]" : "bg-zinc-500/10 text-[#8A847C]", "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"])}">${ssrInterpolate(unref(isActive) ? "Active" : "Paused")}</span></div><div class="flex flex-col gap-6"><div class="text-md font-bold tabular-nums"> Campaign for <span class="text-[#B5563A]">${ssrInterpolate((_b = __props.data) == null ? void 0 : _b.targetStatus)}</span> leads </div><div class="text-xs text-[#8A847C] -mt-4">${ssrInterpolate(unref(cadenceLabel))} \xB7 ${ssrInterpolate(unref(dayLabel))}</div><p class="text-md font-bold tabular-nums">${ssrInterpolate((_c = __props.data) == null ? void 0 : _c.subject)}</p><div class="flex flex-col gap-3"><p class="text-[12px] text-[#8A847C] leading-relaxed -mt-2">${ssrInterpolate(unref(varying) ? "Reworded slightly each send so it doesn\u2019t read as automated." : "Sent word-for-word as you wrote it, every time.")} <button${ssrIncludeBooleanAttr(unref(togglingVary)) ? " disabled" : ""} class="text-[#B5563A] hover:underline disabled:opacity-40">${ssrInterpolate(unref(varying) ? "Send it verbatim instead" : "Let it vary")}</button></p>`);
      _push(ssrRenderComponent(_component_UButton, {
        label: unref(isActive) ? "Pause Campaign" : "Resume Campaign",
        loading: unref(toggling),
        color: "neutral",
        variant: "subtle",
        onClick: useToggle
      }, null, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        title: `Delete ${(_d = __props.data) == null ? void 0 : _d.title} Campaign?`,
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_baseButtonDelete, {
              label: "Delete",
              onClick: useDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_baseButtonDelete, {
                label: "Delete",
                onClick: useDelete
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              label: "Delete Campaign",
              color: "error",
              variant: "subtle",
              class: "w-full justify-center"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                label: "Delete Campaign",
                color: "error",
                variant: "subtle",
                class: "w-full justify-center"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Card/Campaign.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "BaseCardCampaign" });
const theme$1 = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-bg stroke-default",
    "content": "max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-3 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-3 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "position": {
      "popper": {
        "content": "data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]"
      },
      "item-aligned": {
        "content": ""
      }
    },
    "multiple": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-primary/25 focus-visible:outline-3"
    },
    {
      "color": "secondary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3"
    },
    {
      "color": "success",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-success/25 focus-visible:outline-3"
    },
    {
      "color": "info",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-info/25 focus-visible:outline-3"
    },
    {
      "color": "warning",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-warning/25 focus-visible:outline-3"
    },
    {
      "color": "error",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-error/25 focus-visible:outline-3"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline",
    "position": "popper"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelect",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    nullableValue: { type: String, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["change", "blur", "focus", "update:modelValue", "update:open"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = useSlots();
    const props = useComponentProps("select", _props);
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple", "nullableValue"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const position = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      return (_g = (_e = (_a = props.content) == null ? void 0 : _a.position) != null ? _e : (_d = (_c = (_b = appConfig.ui) == null ? void 0 : _b.select) == null ? void 0 : _c.defaultVariants) == null ? void 0 : _d.position) != null ? _g : (_f = theme$1.defaultVariants) == null ? void 0 : _f.position;
    });
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: position.value }));
    const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => fieldGroupSize.value || formFieldSize.value);
    const isItemAligned = computed(() => position.value === "item-aligned");
    const ui = computed(() => {
      var _a, _b, _c, _d;
      return tv({ extend: theme$1, ...((_a = appConfig.ui) == null ? void 0 : _a.select) || {} })({
        color: (_b = color.value) != null ? _b : props.color,
        variant: props.variant,
        size: (_c = selectSize.value) != null ? _c : props.size,
        loading: props.loading,
        highlight: (_d = highlight.value) != null ? _d : props.highlight,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing,
        fieldGroup: orientation.value,
        position: position.value,
        multiple: props.multiple
      });
    });
    const groups = computed(
      () => {
        var _a;
        return ((_a = props.items) == null ? void 0 : _a.length) ? isArrayOfArray(props.items) ? props.items : [props.items] : [];
      }
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const triggerRef = useTemplateRef("triggerRef");
    function onUpdate(value) {
      var _a, _b, _c, _d, _e, _f;
      if (((_a = props.modelModifiers) == null ? void 0 : _a.trim) && (typeof value === "string" || value === null || value === void 0)) {
        value = (_b = value == null ? void 0 : value.trim()) != null ? _b : null;
      }
      if ((_c = props.modelModifiers) == null ? void 0 : _c.number) {
        value = looseToNumber(value);
      }
      if ((_d = props.modelModifiers) == null ? void 0 : _d.nullable) {
        value != null ? value : value = null;
      }
      if (((_e = props.modelModifiers) == null ? void 0 : _e.optional) && !((_f = props.modelModifiers) == null ? void 0 : _f.nullable) && value !== null) {
        value != null ? value : value = void 0;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    function onTriggerClick(open) {
      var _a, _b;
      if (!open) {
        (_b = (_a = triggerRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0 }));
      }
    }
    const viewportRef = useTemplateRef("viewportRef");
    __expose({
      triggerRef: toRef(() => {
        var _a;
        return (_a = triggerRef.value) == null ? void 0 : _a.$el;
      }),
      viewportRef: toRef(() => {
        const instance = viewportRef.value;
        return instance && typeof instance === "object" && "$el" in instance ? instance.$el : instance;
      })
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectRoot_default), mergeProps({ name: unref(name) }, unref(rootProps), {
        autocomplete: unref(props).autocomplete,
        disabled: unref(disabled),
        "default-value": unref(props).defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger_default), mergeProps({
              id: unref(id),
              ref_key: "triggerRef",
              ref: triggerRef,
              "data-slot": "base",
              class: ui.value.base({ class: [(_a = unref(props).ui) == null ? void 0 : _a.base, unref(props).class] })
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              onClick: ($event) => onTriggerClick(open)
            }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c, _d;
                if (_push3) {
                  if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
                    _push3(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.leading }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      var _a3, _b3, _c2;
                      if (unref(isLeading) && unref(leadingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(leadingIconName),
                          "data-slot": "leadingIcon",
                          class: ui.value.leadingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!unref(props).avatar) {
                        _push3(ssrRenderComponent(_sfc_main$b, mergeProps({
                          size: ((_b3 = unref(props).ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                        }, unref(props).avatar, {
                          "data-slot": "itemLeadingAvatar",
                          class: ui.value.itemLeadingAvatar({ class: (_c2 = unref(props).ui) == null ? void 0 : _c2.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                    var _a3, _b3;
                    _push3(ssrRenderComponent(unref(SelectValue_default), {
                      "data-slot": displayedModelValue != null ? "value" : "placeholder",
                      class: displayedModelValue != null ? ui.value.value({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.value }) : ui.value.placeholder({ class: (_b3 = unref(props).ui) == null ? void 0 : _b3.placeholder })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a4;
                            _push4(`${ssrInterpolate(displayedModelValue != null ? displayedModelValue : (_a4 = unref(props).placeholder) != null ? _a4 : "\xA0")}`);
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a4;
                              return [
                                createTextVNode(toDisplayString(displayedModelValue != null ? displayedModelValue : (_a4 = unref(props).placeholder) != null ? _a4 : "\xA0"), 1)
                              ];
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.trailing }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      var _a3;
                      if (unref(trailingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(trailingIconName),
                          "data-slot": "trailingIcon",
                          class: ui.value.trailingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: (_c = unref(props).ui) == null ? void 0 : _c.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3, _b3, _c2;
                        return [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                            key: 1,
                            size: ((_b3 = unref(props).ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                          }, unref(props).avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: (_c2 = unref(props).ui) == null ? void 0 : _c2.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                      var _a3, _b3;
                      return openBlock(), createBlock(unref(SelectValue_default), {
                        key: displayedModelValue,
                        "data-slot": displayedModelValue != null ? "value" : "placeholder",
                        class: displayedModelValue != null ? ui.value.value({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.value }) : ui.value.placeholder({ class: (_b3 = unref(props).ui) == null ? void 0 : _b3.placeholder })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a4;
                            return [
                              createTextVNode(toDisplayString(displayedModelValue != null ? displayedModelValue : (_a4 = unref(props).placeholder) != null ? _a4 : "\xA0"), 1)
                            ];
                          })
                        ]),
                        _: 2
                      }, 1032, ["data-slot", "class"]);
                    }), 128)),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: (_d = unref(props).ui) == null ? void 0 : _d.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3;
                        return [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectPortal_default), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FieldGroupReset), null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(SelectContent_default), mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.content })
                        }, contentProps.value), {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3, _c, _d;
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
                                ref_key: "viewportRef",
                                ref: viewportRef,
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.viewport })
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(groups.value, (group, groupIndex) => {
                                      var _a4;
                                      _push6(ssrRenderComponent(unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`<!--[-->`);
                                            ssrRenderList(group, (item, index) => {
                                              var _a5, _b4, _c2, _d2, _e, _f;
                                              _push7(`<!--[-->`);
                                              if (isSelectItem(item) && item.type === "label") {
                                                _push7(ssrRenderComponent(unref(SelectLabel_default), {
                                                  "data-slot": "label",
                                                  class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                                }, {
                                                  default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(`${ssrInterpolate(unref(get)(item, unref(props).labelKey))}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else if (isSelectItem(item) && item.type === "separator") {
                                                _push7(ssrRenderComponent(unref(SelectSeparator_default), {
                                                  "data-slot": "separator",
                                                  class: ui.value.separator({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                _push7(ssrRenderComponent(unref(SelectItem_default), {
                                                  "data-slot": "item",
                                                  class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                  disabled: isSelectItem(item) && item.disabled,
                                                  value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                  onSelect: ($event) => {
                                                    var _a6;
                                                    return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                  }
                                                }, {
                                                  default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      ssrRenderSlot(_ctx.$slots, "item", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        var _a6, _b5, _c3, _d3, _e2, _f2, _g, _h;
                                                        ssrRenderSlot(_ctx.$slots, "item-leading", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => {
                                                          var _a7, _b6, _c4, _d4, _e3, _f3, _g2, _h2, _i, _j;
                                                          if (isSelectItem(item) && item.icon) {
                                                            _push8(ssrRenderComponent(_sfc_main$e, {
                                                              name: item.icon,
                                                              "data-slot": "itemLeadingIcon",
                                                              class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                            }, null, _parent8, _scopeId7));
                                                          } else if (isSelectItem(item) && item.avatar) {
                                                            _push8(ssrRenderComponent(_sfc_main$b, mergeProps({
                                                              size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = unref(props).ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                            }, { ref_for: true }, item.avatar, {
                                                              "data-slot": "itemLeadingAvatar",
                                                              class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                            }), null, _parent8, _scopeId7));
                                                          } else if (isSelectItem(item) && item.chip) {
                                                            _push8(ssrRenderComponent(_sfc_main$c, mergeProps({
                                                              size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                              inset: "",
                                                              standalone: ""
                                                            }, { ref_for: true }, item.chip, {
                                                              "data-slot": "itemLeadingChip",
                                                              class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                            }), null, _parent8, _scopeId7));
                                                          } else {
                                                            _push8(`<!---->`);
                                                          }
                                                        }, _push8, _parent8, _scopeId7);
                                                        _push8(`<span data-slot="itemWrapper" class="${ssrRenderClass(ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] }))}"${_scopeId7}>`);
                                                        _push8(ssrRenderComponent(unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [(_c3 = unref(props).ui) == null ? void 0 : _c3.itemLabel, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemLabel)] })
                                                        }, {
                                                          default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              ssrRenderSlot(_ctx.$slots, "item-label", {
                                                                item,
                                                                index
                                                              }, () => {
                                                                _push9(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item)}`);
                                                              }, _push9, _parent9, _scopeId8);
                                                            } else {
                                                              return [
                                                                renderSlot(_ctx.$slots, "item-label", {
                                                                  item,
                                                                  index
                                                                }, () => [
                                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                                ])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                        if (isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"])) {
                                                          _push8(`<span data-slot="itemDescription" class="${ssrRenderClass(ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] }))}"${_scopeId7}>`);
                                                          ssrRenderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => {
                                                            _push8(`${ssrInterpolate(unref(get)(item, unref(props).descriptionKey))}`);
                                                          }, _push8, _parent8, _scopeId7);
                                                          _push8(`</span>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</span><span data-slot="itemTrailing" class="${ssrRenderClass(ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] }))}"${_scopeId7}>`);
                                                        ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, null, _push8, _parent8, _scopeId7);
                                                        _push8(ssrRenderComponent(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                            var _a7, _b6, _c4, _d4;
                                                            if (_push9) {
                                                              _push9(ssrRenderComponent(_sfc_main$e, {
                                                                name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                              }, null, _parent9, _scopeId8));
                                                            } else {
                                                              return [
                                                                createVNode(_sfc_main$e, {
                                                                  name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                  "data-slot": "itemTrailingIcon",
                                                                  class: ui.value.itemTrailingIcon({ class: [(_c4 = unref(props).ui) == null ? void 0 : _c4.itemTrailingIcon, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailingIcon)] })
                                                                }, null, 8, ["name", "class"])
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                        _push8(`</span>`);
                                                      }, _push8, _parent8, _scopeId7);
                                                    } else {
                                                      return [
                                                        renderSlot(_ctx.$slots, "item", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => {
                                                          var _a6, _b5, _c3, _d3, _e2, _f2, _g, _h;
                                                          return [
                                                            renderSlot(_ctx.$slots, "item-leading", {
                                                              item,
                                                              index,
                                                              ui: ui.value
                                                            }, () => {
                                                              var _a7, _b6, _c4, _d4, _e3, _f3, _g2, _h2, _i, _j;
                                                              return [
                                                                isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                                  key: 0,
                                                                  name: item.icon,
                                                                  "data-slot": "itemLeadingIcon",
                                                                  class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                                  key: 1,
                                                                  size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = unref(props).ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                                }, { ref_for: true }, item.avatar, {
                                                                  "data-slot": "itemLeadingAvatar",
                                                                  class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                                  key: 2,
                                                                  size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                                  inset: "",
                                                                  standalone: ""
                                                                }, { ref_for: true }, item.chip, {
                                                                  "data-slot": "itemLeadingChip",
                                                                  class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                              ];
                                                            }),
                                                            createVNode("span", {
                                                              "data-slot": "itemWrapper",
                                                              class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] })
                                                            }, [
                                                              createVNode(unref(SelectItemText_default), {
                                                                "data-slot": "itemLabel",
                                                                class: ui.value.itemLabel({ class: [(_c3 = unref(props).ui) == null ? void 0 : _c3.itemLabel, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemLabel)] })
                                                              }, {
                                                                default: withCtx(() => [
                                                                  renderSlot(_ctx.$slots, "item-label", {
                                                                    item,
                                                                    index
                                                                  }, () => [
                                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                                  ])
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["class"]),
                                                              isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                                key: 0,
                                                                "data-slot": "itemDescription",
                                                                class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                              }, [
                                                                renderSlot(_ctx.$slots, "item-description", {
                                                                  item,
                                                                  index
                                                                }, () => [
                                                                  createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                                ])
                                                              ], 2)) : createCommentVNode("", true)
                                                            ], 2),
                                                            createVNode("span", {
                                                              "data-slot": "itemTrailing",
                                                              class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                            }, [
                                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                                item,
                                                                index,
                                                                ui: ui.value
                                                              }),
                                                              createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                                default: withCtx(() => {
                                                                  var _a7, _b6;
                                                                  return [
                                                                    createVNode(_sfc_main$e, {
                                                                      name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                      "data-slot": "itemTrailingIcon",
                                                                      class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                                    }, null, 8, ["name", "class"])
                                                                  ];
                                                                }),
                                                                _: 2
                                                              }, 1024)
                                                            ], 2)
                                                          ];
                                                        })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              }
                                              _push7(`<!--]-->`);
                                            });
                                            _push7(`<!--]-->`);
                                          } else {
                                            return [
                                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                                var _a5, _b4, _c2, _d2, _e, _f;
                                                return openBlock(), createBlock(Fragment, {
                                                  key: `group-${groupIndex}-${index}`
                                                }, [
                                                  isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                                    key: 0,
                                                    "data-slot": "label",
                                                    class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                                    key: 1,
                                                    "data-slot": "separator",
                                                    class: ui.value.separator({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                                  }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                                    key: 2,
                                                    "data-slot": "item",
                                                    class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                    disabled: isSelectItem(item) && item.disabled,
                                                    value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                    onSelect: ($event) => {
                                                      var _a6;
                                                      return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                    }
                                                  }, {
                                                    default: withCtx(() => [
                                                      renderSlot(_ctx.$slots, "item", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        var _a6, _b5, _c3, _d3, _e2, _f2, _g, _h;
                                                        return [
                                                          renderSlot(_ctx.$slots, "item-leading", {
                                                            item,
                                                            index,
                                                            ui: ui.value
                                                          }, () => {
                                                            var _a7, _b6, _c4, _d4, _e3, _f3, _g2, _h2, _i, _j;
                                                            return [
                                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                                key: 0,
                                                                name: item.icon,
                                                                "data-slot": "itemLeadingIcon",
                                                                class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                                key: 1,
                                                                size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = unref(props).ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                              }, { ref_for: true }, item.avatar, {
                                                                "data-slot": "itemLeadingAvatar",
                                                                class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                                key: 2,
                                                                size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                                inset: "",
                                                                standalone: ""
                                                              }, { ref_for: true }, item.chip, {
                                                                "data-slot": "itemLeadingChip",
                                                                class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                            ];
                                                          }),
                                                          createVNode("span", {
                                                            "data-slot": "itemWrapper",
                                                            class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] })
                                                          }, [
                                                            createVNode(unref(SelectItemText_default), {
                                                              "data-slot": "itemLabel",
                                                              class: ui.value.itemLabel({ class: [(_c3 = unref(props).ui) == null ? void 0 : _c3.itemLabel, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemLabel)] })
                                                            }, {
                                                              default: withCtx(() => [
                                                                renderSlot(_ctx.$slots, "item-label", {
                                                                  item,
                                                                  index
                                                                }, () => [
                                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                                ])
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["class"]),
                                                            isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                              key: 0,
                                                              "data-slot": "itemDescription",
                                                              class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                            }, [
                                                              renderSlot(_ctx.$slots, "item-description", {
                                                                item,
                                                                index
                                                              }, () => [
                                                                createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                              ])
                                                            ], 2)) : createCommentVNode("", true)
                                                          ], 2),
                                                          createVNode("span", {
                                                            "data-slot": "itemTrailing",
                                                            class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                          }, [
                                                            renderSlot(_ctx.$slots, "item-trailing", {
                                                              item,
                                                              index,
                                                              ui: ui.value
                                                            }),
                                                            createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                              default: withCtx(() => {
                                                                var _a7, _b6;
                                                                return [
                                                                  createVNode(_sfc_main$e, {
                                                                    name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                    "data-slot": "itemTrailingIcon",
                                                                    class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                                  }, null, 8, ["name", "class"])
                                                                ];
                                                              }),
                                                              _: 2
                                                            }, 1024)
                                                          ], 2)
                                                        ];
                                                      })
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["class", "disabled", "value", "onSelect"]))
                                                ], 64);
                                              }), 128))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                                        var _a4;
                                        return openBlock(), createBlock(unref(SelectGroup_default), {
                                          key: `group-${groupIndex}`,
                                          "data-slot": "group",
                                          class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                              var _a5, _b4, _c2, _d2, _e, _f;
                                              return openBlock(), createBlock(Fragment, {
                                                key: `group-${groupIndex}-${index}`
                                              }, [
                                                isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                                  key: 0,
                                                  "data-slot": "label",
                                                  class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                                  key: 1,
                                                  "data-slot": "separator",
                                                  class: ui.value.separator({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                                }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                                  key: 2,
                                                  "data-slot": "item",
                                                  class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                  disabled: isSelectItem(item) && item.disabled,
                                                  value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                  onSelect: ($event) => {
                                                    var _a6;
                                                    return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                  }
                                                }, {
                                                  default: withCtx(() => [
                                                    renderSlot(_ctx.$slots, "item", {
                                                      item,
                                                      index,
                                                      ui: ui.value
                                                    }, () => {
                                                      var _a6, _b5, _c3, _d3, _e2, _f2, _g, _h;
                                                      return [
                                                        renderSlot(_ctx.$slots, "item-leading", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }, () => {
                                                          var _a7, _b6, _c4, _d4, _e3, _f3, _g2, _h2, _i, _j;
                                                          return [
                                                            isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                              key: 0,
                                                              name: item.icon,
                                                              "data-slot": "itemLeadingIcon",
                                                              class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                            }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                              key: 1,
                                                              size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = unref(props).ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                            }, { ref_for: true }, item.avatar, {
                                                              "data-slot": "itemLeadingAvatar",
                                                              class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                            }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                              key: 2,
                                                              size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                              inset: "",
                                                              standalone: ""
                                                            }, { ref_for: true }, item.chip, {
                                                              "data-slot": "itemLeadingChip",
                                                              class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                          ];
                                                        }),
                                                        createVNode("span", {
                                                          "data-slot": "itemWrapper",
                                                          class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] })
                                                        }, [
                                                          createVNode(unref(SelectItemText_default), {
                                                            "data-slot": "itemLabel",
                                                            class: ui.value.itemLabel({ class: [(_c3 = unref(props).ui) == null ? void 0 : _c3.itemLabel, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemLabel)] })
                                                          }, {
                                                            default: withCtx(() => [
                                                              renderSlot(_ctx.$slots, "item-label", {
                                                                item,
                                                                index
                                                              }, () => [
                                                                createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                              ])
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["class"]),
                                                          isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                            key: 0,
                                                            "data-slot": "itemDescription",
                                                            class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                          }, [
                                                            renderSlot(_ctx.$slots, "item-description", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                            ])
                                                          ], 2)) : createCommentVNode("", true)
                                                        ], 2),
                                                        createVNode("span", {
                                                          "data-slot": "itemTrailing",
                                                          class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                        }, [
                                                          renderSlot(_ctx.$slots, "item-trailing", {
                                                            item,
                                                            index,
                                                            ui: ui.value
                                                          }),
                                                          createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                            default: withCtx(() => {
                                                              var _a7, _b6;
                                                              return [
                                                                createVNode(_sfc_main$e, {
                                                                  name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                  "data-slot": "itemTrailingIcon",
                                                                  class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                                }, null, 8, ["name", "class"])
                                                              ];
                                                            }),
                                                            _: 2
                                                          }, 1024)
                                                        ], 2)
                                                      ];
                                                    })
                                                  ]),
                                                  _: 2
                                                }, 1032, ["class", "disabled", "value", "onSelect"]))
                                              ], 64);
                                            }), 128))
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 2
                              }), _parent5, _scopeId4);
                              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                              if (!!unref(props).arrow) {
                                _push5(ssrRenderComponent(unref(SelectArrow_default), mergeProps(arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: (_b3 = unref(props).ui) == null ? void 0 : _b3.arrow })
                                }), null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                (openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
                                  ref_key: "viewportRef",
                                  ref: viewportRef,
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: (_c = unref(props).ui) == null ? void 0 : _c.viewport })
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                                      var _a4;
                                      return openBlock(), createBlock(unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                            var _a5, _b4, _c2, _d2, _e, _f;
                                            return openBlock(), createBlock(Fragment, {
                                              key: `group-${groupIndex}-${index}`
                                            }, [
                                              isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                                key: 0,
                                                "data-slot": "label",
                                                class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                                key: 1,
                                                "data-slot": "separator",
                                                class: ui.value.separator({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                              }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                                key: 2,
                                                "data-slot": "item",
                                                class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                disabled: isSelectItem(item) && item.disabled,
                                                value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                onSelect: ($event) => {
                                                  var _a6;
                                                  return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }, () => {
                                                    var _a6, _b5, _c3, _d3, _e2, _f2, _g, _h;
                                                    return [
                                                      renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        var _a7, _b6, _c4, _d4, _e3, _f3, _g2, _h2, _i, _j;
                                                        return [
                                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                            key: 0,
                                                            name: item.icon,
                                                            "data-slot": "itemLeadingIcon",
                                                            class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                            key: 1,
                                                            size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = unref(props).ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            "data-slot": "itemLeadingAvatar",
                                                            class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                            key: 2,
                                                            size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            "data-slot": "itemLeadingChip",
                                                            class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      createVNode("span", {
                                                        "data-slot": "itemWrapper",
                                                        class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] })
                                                      }, [
                                                        createVNode(unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [(_c3 = unref(props).ui) == null ? void 0 : _c3.itemLabel, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemLabel)] })
                                                        }, {
                                                          default: withCtx(() => [
                                                            renderSlot(_ctx.$slots, "item-label", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["class"]),
                                                        isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                          key: 0,
                                                          "data-slot": "itemDescription",
                                                          class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                        }, [
                                                          renderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                          ])
                                                        ], 2)) : createCommentVNode("", true)
                                                      ], 2),
                                                      createVNode("span", {
                                                        "data-slot": "itemTrailing",
                                                        class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }),
                                                        createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: withCtx(() => {
                                                            var _a7, _b6;
                                                            return [
                                                              createVNode(_sfc_main$e, {
                                                                name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                              }, null, 8, ["name", "class"])
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1024)
                                                      ], 2)
                                                    ];
                                                  })
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "disabled", "value", "onSelect"]))
                                            ], 64);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128))
                                  ]),
                                  _: 3
                                }, 8, ["class"])),
                                renderSlot(_ctx.$slots, "content-bottom"),
                                !!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: (_d = unref(props).ui) == null ? void 0 : _d.arrow })
                                }), null, 16, ["class"])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(SelectContent_default), mergeProps({
                            "data-slot": "content",
                            class: ui.value.content({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.content })
                          }, contentProps.value), {
                            default: withCtx(() => {
                              var _a3, _b3;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                (openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
                                  ref_key: "viewportRef",
                                  ref: viewportRef,
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.viewport })
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                                      var _a4;
                                      return openBlock(), createBlock(unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                            var _a5, _b4, _c, _d, _e, _f;
                                            return openBlock(), createBlock(Fragment, {
                                              key: `group-${groupIndex}-${index}`
                                            }, [
                                              isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                                key: 0,
                                                "data-slot": "label",
                                                class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                                key: 1,
                                                "data-slot": "separator",
                                                class: ui.value.separator({ class: [(_c = unref(props).ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                              }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                                key: 2,
                                                "data-slot": "item",
                                                class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                disabled: isSelectItem(item) && item.disabled,
                                                value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                onSelect: ($event) => {
                                                  var _a6;
                                                  return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }, () => {
                                                    var _a6, _b5, _c2, _d2, _e2, _f2, _g, _h;
                                                    return [
                                                      renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        var _a7, _b6, _c3, _d3, _e3, _f3, _g2, _h2, _i, _j;
                                                        return [
                                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                            key: 0,
                                                            name: item.icon,
                                                            "data-slot": "itemLeadingIcon",
                                                            class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                            key: 1,
                                                            size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = unref(props).ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            "data-slot": "itemLeadingAvatar",
                                                            class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                            key: 2,
                                                            size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            "data-slot": "itemLeadingChip",
                                                            class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      createVNode("span", {
                                                        "data-slot": "itemWrapper",
                                                        class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemWrapper)] })
                                                      }, [
                                                        createVNode(unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.itemLabel, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemLabel)] })
                                                        }, {
                                                          default: withCtx(() => [
                                                            renderSlot(_ctx.$slots, "item-label", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["class"]),
                                                        isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                          key: 0,
                                                          "data-slot": "itemDescription",
                                                          class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                        }, [
                                                          renderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                          ])
                                                        ], 2)) : createCommentVNode("", true)
                                                      ], 2),
                                                      createVNode("span", {
                                                        "data-slot": "itemTrailing",
                                                        class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }),
                                                        createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: withCtx(() => {
                                                            var _a7, _b6;
                                                            return [
                                                              createVNode(_sfc_main$e, {
                                                                name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                              }, null, 8, ["name", "class"])
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1024)
                                                      ], 2)
                                                    ];
                                                  })
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "disabled", "value", "onSelect"]))
                                            ], 64);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128))
                                  ]),
                                  _: 3
                                }, 8, ["class"])),
                                renderSlot(_ctx.$slots, "content-bottom"),
                                !!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: (_b3 = unref(props).ui) == null ? void 0 : _b3.arrow })
                                }), null, 16, ["class"])) : createCommentVNode("", true)
                              ];
                            }),
                            _: 3
                          }, 16, ["class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(FieldGroupReset), null, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode(unref(SelectContent_default), mergeProps({
                            "data-slot": "content",
                            class: ui.value.content({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.content })
                          }, contentProps.value), {
                            default: withCtx(() => {
                              var _a3, _b2;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                (openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
                                  ref_key: "viewportRef",
                                  ref: viewportRef,
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.viewport })
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                                      var _a4;
                                      return openBlock(), createBlock(unref(SelectGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                            var _a5, _b3, _c, _d, _e, _f;
                                            return openBlock(), createBlock(Fragment, {
                                              key: `group-${groupIndex}-${index}`
                                            }, [
                                              isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                                key: 0,
                                                "data-slot": "label",
                                                class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label, item.class] })
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                                key: 1,
                                                "data-slot": "separator",
                                                class: ui.value.separator({ class: [(_c = unref(props).ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                              }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                                key: 2,
                                                "data-slot": "item",
                                                class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                                disabled: isSelectItem(item) && item.disabled,
                                                value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                                onSelect: ($event) => {
                                                  var _a6;
                                                  return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                                }
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index,
                                                    ui: ui.value
                                                  }, () => {
                                                    var _a6, _b4, _c2, _d2, _e2, _f2, _g, _h;
                                                    return [
                                                      renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }, () => {
                                                        var _a7, _b5, _c3, _d3, _e3, _f3, _g2, _h2, _i, _j;
                                                        return [
                                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                            key: 0,
                                                            name: item.icon,
                                                            "data-slot": "itemLeadingIcon",
                                                            class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                            key: 1,
                                                            size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = unref(props).ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            "data-slot": "itemLeadingAvatar",
                                                            class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                            key: 2,
                                                            size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            "data-slot": "itemLeadingChip",
                                                            class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      createVNode("span", {
                                                        "data-slot": "itemWrapper",
                                                        class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b4 = item.ui) == null ? void 0 : _b4.itemWrapper)] })
                                                      }, [
                                                        createVNode(unref(SelectItemText_default), {
                                                          "data-slot": "itemLabel",
                                                          class: ui.value.itemLabel({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.itemLabel, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemLabel)] })
                                                        }, {
                                                          default: withCtx(() => [
                                                            renderSlot(_ctx.$slots, "item-label", {
                                                              item,
                                                              index
                                                            }, () => [
                                                              createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                            ])
                                                          ]),
                                                          _: 2
                                                        }, 1032, ["class"]),
                                                        isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                          key: 0,
                                                          "data-slot": "itemDescription",
                                                          class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                        }, [
                                                          renderSlot(_ctx.$slots, "item-description", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                          ])
                                                        ], 2)) : createCommentVNode("", true)
                                                      ], 2),
                                                      createVNode("span", {
                                                        "data-slot": "itemTrailing",
                                                        class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index,
                                                          ui: ui.value
                                                        }),
                                                        createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                          default: withCtx(() => {
                                                            var _a7, _b5;
                                                            return [
                                                              createVNode(_sfc_main$e, {
                                                                name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                                "data-slot": "itemTrailingIcon",
                                                                class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemTrailingIcon)] })
                                                              }, null, 8, ["name", "class"])
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1024)
                                                      ], 2)
                                                    ];
                                                  })
                                                ]),
                                                _: 2
                                              }, 1032, ["class", "disabled", "value", "onSelect"]))
                                            ], 64);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128))
                                  ]),
                                  _: 3
                                }, 8, ["class"])),
                                renderSlot(_ctx.$slots, "content-bottom"),
                                !!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                                  "data-slot": "arrow",
                                  class: ui.value.arrow({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.arrow })
                                }), null, 16, ["class"])) : createCommentVNode("", true)
                              ];
                            }),
                            _: 3
                          }, 16, ["class"])
                        ];
                      }),
                      _: 3
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(SelectTrigger_default), mergeProps({
                id: unref(id),
                ref_key: "triggerRef",
                ref: triggerRef,
                "data-slot": "base",
                class: ui.value.base({ class: [(_b = unref(props).ui) == null ? void 0 : _b.base, unref(props).class] })
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onClick: ($event) => onTriggerClick(open)
              }), {
                default: withCtx(() => {
                  var _a2, _b2;
                  return [
                    unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      "data-slot": "leading",
                      class: ui.value.leading({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3, _b3, _c;
                        return [
                          unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                            key: 1,
                            size: ((_b3 = unref(props).ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                          }, unref(props).avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: (_c = unref(props).ui) == null ? void 0 : _c.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                      var _a3, _b3;
                      return openBlock(), createBlock(unref(SelectValue_default), {
                        key: displayedModelValue,
                        "data-slot": displayedModelValue != null ? "value" : "placeholder",
                        class: displayedModelValue != null ? ui.value.value({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.value }) : ui.value.placeholder({ class: (_b3 = unref(props).ui) == null ? void 0 : _b3.placeholder })
                      }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a4;
                            return [
                              createTextVNode(toDisplayString(displayedModelValue != null ? displayedModelValue : (_a4 = unref(props).placeholder) != null ? _a4 : "\xA0"), 1)
                            ];
                          })
                        ]),
                        _: 2
                      }, 1032, ["data-slot", "class"]);
                    }), 128)),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => {
                        var _a3;
                        return [
                          unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                            key: 0,
                            name: unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.trailingIcon })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ];
                      })
                    ], 2)) : createCommentVNode("", true)
                  ];
                }),
                _: 2
              }, 1040, ["id", "class", "onClick"]),
              createVNode(unref(SelectPortal_default), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(FieldGroupReset), null, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode(unref(SelectContent_default), mergeProps({
                          "data-slot": "content",
                          class: ui.value.content({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.content })
                        }, contentProps.value), {
                          default: withCtx(() => {
                            var _a3, _b2;
                            return [
                              renderSlot(_ctx.$slots, "content-top"),
                              (openBlock(), createBlock(resolveDynamicComponent(isItemAligned.value ? unref(SelectViewport_default) : "div"), {
                                ref_key: "viewportRef",
                                ref: viewportRef,
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.viewport })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(SelectGroup_default), {
                                      key: `group-${groupIndex}`,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: (_a4 = unref(props).ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b3, _c, _d, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel_default), {
                                              key: 0,
                                              "data-slot": "label",
                                              class: ui.value.label({ class: [(_a5 = unref(props).ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, unref(props).labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator_default), {
                                              key: 1,
                                              "data-slot": "separator",
                                              class: ui.value.separator({ class: [(_c = unref(props).ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem_default), {
                                              key: 2,
                                              "data-slot": "item",
                                              class: ui.value.item({ class: [(_e = unref(props).ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: isSelectItem(item) ? unref(get)(item, unref(props).valueKey) : item,
                                              onSelect: ($event) => {
                                                var _a6;
                                                return isSelectItem(item) && ((_a6 = item.onSelect) == null ? void 0 : _a6.call(item, $event));
                                              }
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index,
                                                  ui: ui.value
                                                }, () => {
                                                  var _a6, _b4, _c2, _d2, _e2, _f2, _g, _h;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index,
                                                      ui: ui.value
                                                    }, () => {
                                                      var _a7, _b5, _c3, _d3, _e3, _f3, _g2, _h2, _i, _j;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                          key: 0,
                                                          name: item.icon,
                                                          "data-slot": "itemLeadingIcon",
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemLeadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = unref(props).ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          "data-slot": "itemLeadingAvatar",
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e3 = unref(props).ui) == null ? void 0 : _e3.itemLeadingAvatar, (_f3 = item.ui) == null ? void 0 : _f3.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g2 = item.ui) == null ? void 0 : _g2.itemLeadingChipSize) || ((_h2 = unref(props).ui) == null ? void 0 : _h2.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          "data-slot": "itemLeadingChip",
                                                          class: ui.value.itemLeadingChip({ class: [(_i = unref(props).ui) == null ? void 0 : _i.itemLeadingChip, (_j = item.ui) == null ? void 0 : _j.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      "data-slot": "itemWrapper",
                                                      class: ui.value.itemWrapper({ class: [(_a6 = unref(props).ui) == null ? void 0 : _a6.itemWrapper, isSelectItem(item) && ((_b4 = item.ui) == null ? void 0 : _b4.itemWrapper)] })
                                                    }, [
                                                      createVNode(unref(SelectItemText_default), {
                                                        "data-slot": "itemLabel",
                                                        class: ui.value.itemLabel({ class: [(_c2 = unref(props).ui) == null ? void 0 : _c2.itemLabel, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemLabel)] })
                                                      }, {
                                                        default: withCtx(() => [
                                                          renderSlot(_ctx.$slots, "item-label", {
                                                            item,
                                                            index
                                                          }, () => [
                                                            createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, unref(props).labelKey) : item), 1)
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["class"]),
                                                      isSelectItem(item) && (unref(get)(item, unref(props).descriptionKey) || !!slots["item-description"]) ? (openBlock(), createBlock("span", {
                                                        key: 0,
                                                        "data-slot": "itemDescription",
                                                        class: ui.value.itemDescription({ class: [(_e2 = unref(props).ui) == null ? void 0 : _e2.itemDescription, isSelectItem(item) && ((_f2 = item.ui) == null ? void 0 : _f2.itemDescription)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-description", {
                                                          item,
                                                          index
                                                        }, () => [
                                                          createTextVNode(toDisplayString(unref(get)(item, unref(props).descriptionKey)), 1)
                                                        ])
                                                      ], 2)) : createCommentVNode("", true)
                                                    ], 2),
                                                    createVNode("span", {
                                                      "data-slot": "itemTrailing",
                                                      class: ui.value.itemTrailing({ class: [(_g = unref(props).ui) == null ? void 0 : _g.itemTrailing, isSelectItem(item) && ((_h = item.ui) == null ? void 0 : _h.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index,
                                                        ui: ui.value
                                                      }),
                                                      createVNode(unref(SelectItemIndicator_default), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b5;
                                                          return [
                                                            createVNode(_sfc_main$e, {
                                                              name: unref(props).selectedIcon || unref(appConfig).ui.icons.check,
                                                              "data-slot": "itemTrailingIcon",
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = unref(props).ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128))
                                ]),
                                _: 3
                              }, 8, ["class"])),
                              renderSlot(_ctx.$slots, "content-bottom"),
                              !!unref(props).arrow ? (openBlock(), createBlock(unref(SelectArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                                "data-slot": "arrow",
                                class: ui.value.arrow({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.arrow })
                              }), null, 16, ["class"])) : createCommentVNode("", true)
                            ];
                          }),
                          _: 3
                        }, 16, ["class"])
                      ];
                    }),
                    _: 3
                  })
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute start-0 flex items-start",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute end-0 flex items-start",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2 inset-y-1",
        "trailing": "pe-2 inset-y-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5 inset-y-1.5",
        "trailing": "pe-2.5 inset-y-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3 inset-y-2",
        "trailing": "pe-3 inset-y-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "autoresize": {
      "true": {
        "base": "resize-none"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-primary/25 focus-visible:outline-3"
    },
    {
      "color": "secondary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3"
    },
    {
      "color": "success",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-success/25 focus-visible:outline-3"
    },
    {
      "color": "info",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-info/25 focus-visible:outline-3"
    },
    {
      "color": "warning",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-warning/25 focus-visible:outline-3"
    },
    {
      "color": "error",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-error/25 focus-visible:outline-3"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UTextarea",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    autoresize: { type: Boolean, required: false },
    autoresizeDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    rows: { type: Number, required: false, default: 3 },
    maxrows: { type: Number, required: false, default: 0 },
    highlight: { type: Boolean, required: false },
    fixed: { type: Boolean, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const _props = __props;
    const emits = __emit;
    const slots = useSlots();
    const props = useComponentProps("textarea", _props);
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size, color, id, name, highlight, disabled, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const ui = computed(() => {
      var _a, _b, _c, _d;
      return tv({ extend: theme, ...((_a = appConfig.ui) == null ? void 0 : _a.textarea) || {} })({
        color: (_b = color.value) != null ? _b : props.color,
        variant: props.variant,
        size: (_c = size == null ? void 0 : size.value) != null ? _c : props.size,
        loading: props.loading,
        highlight: (_d = highlight.value) != null ? _d : props.highlight,
        fixed: props.fixed,
        autoresize: props.autoresize,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing
      });
    });
    const textareaRef = useTemplateRef("textareaRef");
    function updateInput(value) {
      var _a, _b, _c, _d, _e, _f;
      if (((_a = props.modelModifiers) == null ? void 0 : _a.trim) && (typeof value === "string" || value === null || value === void 0)) {
        value = (_b = value == null ? void 0 : value.trim()) != null ? _b : null;
      }
      if ((_c = props.modelModifiers) == null ? void 0 : _c.number) {
        value = looseToNumber(value);
      }
      if ((_d = props.modelModifiers) == null ? void 0 : _d.nullable) {
        value || (value = null);
      }
      if (((_e = props.modelModifiers) == null ? void 0 : _e.optional) && !((_f = props.modelModifiers) == null ? void 0 : _f.nullable) && value !== null) {
        value || (value = void 0);
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      var _a;
      autoResize();
      if (!((_a = props.modelModifiers) == null ? void 0 : _a.lazy)) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      var _a, _b;
      const value = event.target.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.lazy) {
        updateInput(value);
      }
      if ((_b = props.modelModifiers) == null ? void 0 : _b.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    function autoResize() {
      if (props.autoresize && textareaRef.value) {
        textareaRef.value.rows = props.rows;
        const overflow = textareaRef.value.style.overflow;
        textareaRef.value.style.overflow = "hidden";
        const styles = (void 0).getComputedStyle(textareaRef.value);
        const paddingTop = Number.parseInt(styles.paddingTop);
        const paddingBottom = Number.parseInt(styles.paddingBottom);
        const padding = paddingTop + paddingBottom;
        const lineHeight = Number.parseInt(styles.lineHeight);
        const { scrollHeight } = textareaRef.value;
        const newRows = (scrollHeight - padding) / lineHeight;
        if (newRows > props.rows) {
          textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
        }
        textareaRef.value.style.overflow = overflow;
      }
    }
    watch(modelValue, () => {
      nextTick(autoResize);
    });
    __expose({
      textareaRef,
      autoResize
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      let _temp0;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: unref(props).as,
        "data-slot": (_a = _ctx.$attrs["data-slot"]) != null ? _a : "root",
        class: ui.value.root({ class: [(_b = unref(props).ui) == null ? void 0 : _b.root, unref(props).class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
              id: unref(id),
              ref_key: "textareaRef",
              ref: textareaRef,
              value: unref(modelValue),
              name: unref(name),
              rows: unref(props).rows,
              placeholder: unref(props).placeholder,
              class: ui.value.base({ class: (_a2 = unref(props).ui) == null ? void 0 : _a2.base }),
              disabled: unref(disabled),
              required: unref(props).required
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, { "data-slot": "base" }), "textarea")}${_scopeId}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
            ssrRenderSlot(_ctx.$slots, "default", { ui: ui.value }, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!unref(props).avatar || !!slots.leading) {
              _push2(`<span data-slot="leading" class="${ssrRenderClass(ui.value.leading({ class: (_b2 = unref(props).ui) == null ? void 0 : _b2.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                var _a3, _b3, _c2;
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(leadingIconName),
                    "data-slot": "leadingIcon",
                    class: ui.value.leadingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!unref(props).avatar) {
                  _push2(ssrRenderComponent(_sfc_main$b, mergeProps({
                    size: ((_b3 = unref(props).ui) == null ? void 0 : _b3.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, unref(props).avatar, {
                    "data-slot": "leadingAvatar",
                    class: ui.value.leadingAvatar({ class: (_c2 = unref(props).ui) == null ? void 0 : _c2.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span data-slot="trailing" class="${ssrRenderClass(ui.value.trailing({ class: (_c = unref(props).ui) == null ? void 0 : _c.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                var _a3;
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: unref(trailingIconName),
                    "data-slot": "trailingIcon",
                    class: ui.value.trailingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("textarea", mergeProps({
                id: unref(id),
                ref_key: "textareaRef",
                ref: textareaRef,
                value: unref(modelValue),
                name: unref(name),
                rows: unref(props).rows,
                placeholder: unref(props).placeholder,
                class: ui.value.base({ class: (_d = unref(props).ui) == null ? void 0 : _d.base }),
                disabled: unref(disabled),
                required: unref(props).required
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                "data-slot": "base",
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "value", "name", "rows", "placeholder", "disabled", "required", "onFocus"]),
              renderSlot(_ctx.$slots, "default", { ui: ui.value }),
              unref(isLeading) || !!unref(props).avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                "data-slot": "leading",
                class: ui.value.leading({ class: (_e = unref(props).ui) == null ? void 0 : _e.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", { ui: ui.value }, () => {
                  var _a3, _b3, _c2;
                  return [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                      key: 0,
                      name: unref(leadingIconName),
                      "data-slot": "leadingIcon",
                      class: ui.value.leadingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.leadingIcon })
                    }, null, 8, ["name", "class"])) : !!unref(props).avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                      key: 1,
                      size: ((_b3 = unref(props).ui) == null ? void 0 : _b3.leadingAvatarSize) || ui.value.leadingAvatarSize()
                    }, unref(props).avatar, {
                      "data-slot": "leadingAvatar",
                      class: ui.value.leadingAvatar({ class: (_c2 = unref(props).ui) == null ? void 0 : _c2.leadingAvatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                "data-slot": "trailing",
                class: ui.value.trailing({ class: (_f = unref(props).ui) == null ? void 0 : _f.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", { ui: ui.value }, () => {
                  var _a3;
                  return [
                    unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                      key: 0,
                      name: unref(trailingIconName),
                      "data-slot": "trailingIcon",
                      class: ui.value.trailingIcon({ class: (_a3 = unref(props).ui) == null ? void 0 : _a3.trailingIcon })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Textarea.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TOKEN_NAME = "{{name}}";
const TOKEN_AGENT = "{{agent}}";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Campaigns",
      meta: [{ name: "description", content: "Automated follow-up emails that run on their own." }]
    });
    const isSaving = ref(false);
    useToast();
    useUserSession();
    const { data: campaigns } = useNuxtData("campaigns");
    const useCampaigns = computed(() => {
      var _a;
      return (_a = campaigns.value) != null ? _a : [];
    });
    const activeCount = computed(
      () => useCampaigns.value.filter((c) => (c == null ? void 0 : c.active) !== false).length
    );
    const form = ref({
      title: "",
      // On by default — identical copy every week reads as automated and
      // scores badly with spam filters.
      varyWording: true,
      targetStatus: "new",
      subject: "",
      messageBody: "",
      dayOfWeek: "1",
      timesPerMonth: "4"
    });
    watch(() => form.value.targetStatus, (newStatus) => {
      if (form.value.messageBody !== "") return;
      if (newStatus === "new") {
        form.value.subject = "Quick question regarding your property search";
        form.value.messageBody = "Hi {{name}},\n\nI wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}";
      } else if (newStatus === "active") {
        form.value.subject = "Quick market update for you";
        form.value.messageBody = "Hi {{name}},\n\nWe've been keeping a close eye on the market for you. As we keep sorting through local inventory, do you have any quick questions about recent listings or pricing adjustments?\n\nJust reply straight to this email whenever you have a second.\n\nBest,\n\n{{agent}}";
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseCardCampaign = __nuxt_component_0;
      const _component_UFormField = _sfc_main$5;
      const _component_UInput = _sfc_main$6;
      const _component_USelect = _sfc_main$2;
      const _component_UTextarea = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1240px] mx-auto" }, _attrs))}><header class="mb-20 pt-4"><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}">Follow-up on autopilot</p><h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="${ssrRenderStyle({ "--d": ".12s" })}"> Stay in touch without remembering to. </h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[48ch] gf-rise" style="${ssrRenderStyle({ "--d": ".2s" })}">`);
      if (unref(activeCount)) {
        _push(`<!--[-->${ssrInterpolate(unref(activeCount))} campaign${ssrInterpolate(unref(activeCount) === 1 ? "" : "s")} running. Each one emails every lead at a chosen stage, on the day and rhythm you set. <!--]-->`);
      } else {
        _push(`<!--[--> Set up an email that goes out on a schedule to every lead at a given stage \u2014 weekly, every other week, or monthly. <!--]-->`);
      }
      _push(`</p></header><section class="gf-depth mb-24"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">01 \u2014 Running</span><span class="font-display text-[25px] font-semibold tracking-tight">Your campaigns</span><span class="text-[13px] text-[#A9A39A] tabular-nums">${ssrInterpolate(unref(useCampaigns).length)}</span></div>`);
      if (unref(useCampaigns).length) {
        _push(`<div class="flex flex-wrap gap-6"><!--[-->`);
        ssrRenderList(unref(useCampaigns), (item) => {
          _push(ssrRenderComponent(_component_baseCardCampaign, {
            key: item._id,
            data: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="border-t border-b border-[#DDD6C9] py-14 text-center"><p class="text-[14px] text-[#8A847C]"> No campaigns yet. Build your first one below \u2014 it starts sending automatically. </p></div>`);
      }
      _push(`</section><section class="gf-depth"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">02 \u2014 New</span><span class="font-display text-[25px] font-semibold tracking-tight">Build a campaign</span></div><form class="grid lg:grid-cols-3 gap-8"><div class="space-y-6 bg-[#EFEAE0] border border-[#DDD6C9] p-7 h-fit"><p class="gf-eyebrow">Who and when</p>`);
      _push(ssrRenderComponent(_component_UFormField, { label: "Name it (just for you)" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(form).title,
              "onUpdate:modelValue": ($event) => unref(form).title = $event,
              placeholder: "Monday check-in",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: unref(form).title,
                "onUpdate:modelValue": ($event) => unref(form).title = $event,
                placeholder: "Monday check-in",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Send to leads at this stage" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(form).targetStatus,
              "onUpdate:modelValue": ($event) => unref(form).targetStatus = $event,
              items: unref(selection_campaign_status_lead),
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                modelValue: unref(form).targetStatus,
                "onUpdate:modelValue": ($event) => unref(form).targetStatus = $event,
                items: unref(selection_campaign_status_lead),
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Which day" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(form).dayOfWeek,
              "onUpdate:modelValue": ($event) => unref(form).dayOfWeek = $event,
              items: unref(selection_days),
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                modelValue: unref(form).dayOfWeek,
                "onUpdate:modelValue": ($event) => unref(form).dayOfWeek = $event,
                items: unref(selection_days),
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "How often" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(form).timesPerMonth,
              "onUpdate:modelValue": ($event) => unref(form).timesPerMonth = $event,
              items: unref(selection_frequencies),
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                modelValue: unref(form).timesPerMonth,
                "onUpdate:modelValue": ($event) => unref(form).timesPerMonth = $event,
                items: unref(selection_frequencies),
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-[12px] text-[#A9A39A] leading-relaxed pt-1"> Emails go out in the morning on the day you pick. </p><label class="flex items-start gap-3 pt-2 cursor-pointer"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).varyWording) ? ssrLooseContain(unref(form).varyWording, null) : unref(form).varyWording) ? " checked" : ""} type="checkbox" class="mt-1 accent-[#B5563A]"><span><span class="block text-[13px] font-medium">Reword it slightly each time</span><span class="block text-[12px] text-[#A9A39A] leading-relaxed mt-0.5"> Keeps the same meaning, but says it a bit differently each send \u2014 so people on a long sequence don&#39;t get the identical email every week. </span></span></label></div><div class="lg:col-span-2 space-y-6 bg-[#EFEAE0] border border-[#DDD6C9] p-7"><p class="gf-eyebrow">What it says</p>`);
      _push(ssrRenderComponent(_component_UFormField, { label: "Subject line" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(form).subject,
              "onUpdate:modelValue": ($event) => unref(form).subject = $event,
              placeholder: "Checking in on your home search",
              class: "w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: unref(form).subject,
                "onUpdate:modelValue": ($event) => unref(form).subject = $event,
                placeholder: "Checking in on your home search",
                class: "w-full"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Message" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: unref(form).messageBody,
              "onUpdate:modelValue": ($event) => unref(form).messageBody = $event,
              rows: 12,
              class: "w-full text-sm leading-relaxed"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UTextarea, {
                modelValue: unref(form).messageBody,
                "onUpdate:modelValue": ($event) => unref(form).messageBody = $event,
                rows: 12,
                class: "w-full text-sm leading-relaxed"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-wrap items-center justify-between gap-4 pt-1"><p class="text-[12px] text-[#A9A39A] leading-relaxed"> Use <code class="text-[#B5563A]">${ssrInterpolate(TOKEN_NAME)}</code> for the lead&#39;s first name and <code class="text-[#B5563A]">${ssrInterpolate(TOKEN_AGENT)}</code> for yours. </p><button type="submit"${ssrIncludeBooleanAttr(unref(isSaving) || !unref(form).subject || !unref(form).messageBody) ? " disabled" : ""} class="px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">${ssrInterpolate(unref(isSaving) ? "Saving\u2026" : "Save & start")}</button></div></div></form></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/campaigns/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BRzfPx0p.mjs.map
