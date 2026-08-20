import { ref, computed, defineComponent, renderSlot, watchPostEffect, openBlock, createBlock, unref, withCtx, createElementBlock, normalizeStyle, createVNode, mergeProps, watchEffect, withMemo, mergeDefaults } from 'vue';
import { i as injectConfigProviderContext, Z as refAutoReset, k as useForwardExpose, P as Primitive, j as useForwardProps$1, M as useEmitAsProps, h as createContext, o as getActiveElement } from './server.mjs';
import { offset, flip, shift, limitShift, size, arrow, hide, useFloating, autoUpdate } from '@floating-ui/vue';

function useDirection(dir) {
  const context = injectConfigProviderContext({ dir: ref("ltr") });
  return computed(() => {
    var _a;
    return (dir == null ? void 0 : dir.value) || ((_a = context.dir) == null ? void 0 : _a.value) || "ltr";
  });
}
function useFocusGuards() {
  watchEffect((cleanupFn) => {
    return;
  });
}
function useForwardPropsEmits(props, emit) {
  const parsedProps = useForwardProps$1(props);
  const emitsAsProps = emit ? useEmitAsProps(emit) : {};
  return computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps
  }));
}
function useSize(element) {
  const size2 = ref();
  const width = computed(() => {
    var _a, _b;
    return (_b = (_a = size2.value) == null ? void 0 : _a.width) != null ? _b : 0;
  });
  const height = computed(() => {
    var _a, _b;
    return (_b = (_a = size2.value) == null ? void 0 : _a.height) != null ? _b : 0;
  });
  return {
    width,
    height
  };
}
function useTypeahead(callback) {
  const search = refAutoReset("", 1e3);
  const handleTypeaheadSearch = (key, items) => {
    search.value = search.value + key;
    {
      const currentItem = getActiveElement();
      const itemsWithTextValue = items.map((item) => {
        var _a, _b, _c, _d;
        return {
          ...item,
          textValue: (_d = (_c = (_a = item.value) == null ? void 0 : _a.textValue) != null ? _c : (_b = item.ref.textContent) == null ? void 0 : _b.trim()) != null ? _d : ""
        };
      });
      const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
      const values = itemsWithTextValue.map((item) => item.textValue);
      const nextMatch = getNextMatch(values, search.value, currentMatch == null ? void 0 : currentMatch.textValue);
      const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
      if (newItem) newItem.ref.focus();
      return newItem == null ? void 0 : newItem.ref;
    }
  };
  const resetTypeahead = () => {
    search.value = "";
  };
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
const [injectPopperRootContext, providePopperRootContext] = /* @__PURE__ */ createContext("PopperRoot");
var PopperRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperRoot",
  setup(__props) {
    const anchor = ref();
    providePopperRootContext({
      anchor,
      onAnchorChange: (element) => anchor.value = element
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
var PopperRoot_default = PopperRoot_vue_vue_type_script_setup_true_lang_default;
var PopperAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopperAnchor",
  props: {
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
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectPopperRootContext();
    watchPostEffect(() => {
      var _a;
      rootContext.onAnchorChange((_a = props.reference) != null ? _a : currentElement.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, ["as", "as-child"]);
    };
  }
});
var PopperAnchor_default = PopperAnchor_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$1 = {
  key: 0,
  d: "M0 0L6 6L12 0"
};
const _hoisted_2 = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "Arrow",
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
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        width: _ctx.width,
        height: _ctx.height,
        viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
        preserveAspectRatio: _ctx.asChild ? void 0 : "none"
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1$1)) : (openBlock(), createElementBlock("path", _hoisted_2))])]),
        _: 3
      }, 16, [
        "width",
        "height",
        "viewBox",
        "preserveAspectRatio"
      ]);
    };
  }
});
var Arrow_default = Arrow_vue_vue_type_script_setup_true_lang_default;
function isNotNull(value) {
  return value !== null;
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      var _a, _b, _c, _d, _e;
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlignX = {
        start: options.dir === "rtl" ? "100%" : "0%",
        center: "50%",
        end: options.dir === "rtl" ? "0%" : "100%"
      }[placedAlign];
      const noArrowAlignY = {
        start: "0%",
        center: "50%",
        end: "100%"
      }[placedAlign];
      const arrowXCenter = ((_c = (_b = middlewareData.arrow) == null ? void 0 : _b.x) != null ? _c : 0) + arrowWidth / 2;
      const arrowYCenter = ((_e = (_d = middlewareData.arrow) == null ? void 0 : _d.y) != null ? _e : 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlignX : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlignX : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlignY : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlignY : `${arrowYCenter}px`;
      }
      return { data: {
        x,
        y
      } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
const _hoisted_1 = ["dir"];
const PopperContentPropsDefaultValue = {
  side: "bottom",
  sideOffset: 0,
  sideFlip: true,
  align: "center",
  alignOffset: 0,
  alignFlip: true,
  arrowPadding: 0,
  hideShiftedArrow: true,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  positionStrategy: "fixed",
  updatePositionStrategy: "optimized",
  prioritizePosition: false
};
const [injectPopperContentContext, providePopperContentContext] = /* @__PURE__ */ createContext("PopperContent");
var PopperContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperContent",
  props: /* @__PURE__ */ mergeDefaults({
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
    }
  }, { ...PopperContentPropsDefaultValue }),
  emits: ["placed"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectPopperRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const dir = useDirection(computed(() => props.dir));
    const floatingRef = ref();
    const arrow$1 = ref();
    const { width: arrowWidth, height: arrowHeight } = useSize();
    const desiredPlacement = computed(() => props.side + (props.align !== "center" ? `-${props.align}` : ""));
    const collisionPadding = computed(() => {
      return typeof props.collisionPadding === "number" ? props.collisionPadding : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...props.collisionPadding
      };
    });
    const boundary = computed(() => {
      return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
    });
    const detectOverflowOptions = computed(() => {
      return {
        padding: collisionPadding.value,
        boundary: boundary.value.filter(isNotNull),
        altBoundary: boundary.value.length > 0
      };
    });
    const flipOptions = computed(() => {
      return {
        mainAxis: props.sideFlip,
        crossAxis: props.alignFlip
      };
    });
    const computedMiddleware = computed(() => {
      return [
        offset({
          mainAxis: props.sideOffset + arrowHeight.value,
          alignmentAxis: props.alignOffset
        }),
        props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value,
          ...flipOptions.value
        }),
        props.avoidCollisions && shift({
          mainAxis: true,
          crossAxis: !!props.prioritizePosition,
          limiter: props.sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions.value
        }),
        !props.prioritizePosition && props.avoidCollisions && flip({
          ...detectOverflowOptions.value,
          ...flipOptions.value
        }),
        size({
          ...detectOverflowOptions.value,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--reka-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--reka-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--reka-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--reka-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$1.value && arrow({
          element: arrow$1.value,
          padding: props.arrowPadding
        }),
        transformOrigin({
          arrowWidth: arrowWidth.value,
          arrowHeight: arrowHeight.value,
          dir: dir.value
        }),
        props.hideWhenDetached && hide({
          strategy: "referenceHidden",
          ...detectOverflowOptions.value
        })
      ];
    });
    const reference = computed(() => {
      var _a;
      return (_a = props.reference) != null ? _a : rootContext.anchor.value;
    });
    const { floatingStyles, placement, isPositioned, middlewareData, update } = useFloating(reference, floatingRef, {
      strategy: props.positionStrategy,
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          layoutShift: !props.disableUpdateOnLayoutShift,
          animationFrame: props.updatePositionStrategy === "always"
        });
        return cleanup;
      },
      middleware: computedMiddleware
    });
    const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
    const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
    watchPostEffect(() => {
      if (isPositioned.value) emits("placed");
    });
    const shouldHideArrow = computed(() => {
      var _a;
      const cannotCenterArrow = ((_a = middlewareData.value.arrow) == null ? void 0 : _a.centerOffset) !== 0;
      return props.hideShiftedArrow && cannotCenterArrow;
    });
    const contentZIndex = ref("");
    watchEffect(() => {
      if (contentElement.value) contentZIndex.value = (void 0).getComputedStyle(contentElement.value).zIndex;
    });
    const arrowX = computed(() => {
      var _a, _b;
      return (_b = (_a = middlewareData.value.arrow) == null ? void 0 : _a.x) != null ? _b : 0;
    });
    const arrowY = computed(() => {
      var _a, _b;
      return (_b = (_a = middlewareData.value.arrow) == null ? void 0 : _a.y) != null ? _b : 0;
    });
    providePopperContentContext({
      placedSide,
      onArrowChange: (element) => arrow$1.value = element,
      arrowX,
      arrowY,
      shouldHideArrow
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return openBlock(), createElementBlock("div", {
        ref_key: "floatingRef",
        ref: floatingRef,
        "data-reka-popper-content-wrapper": "",
        dir: unref(dir),
        style: normalizeStyle({
          ...unref(floatingStyles),
          transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: contentZIndex.value,
          ["--reka-popper-transform-origin"]: [(_a = unref(middlewareData).transformOrigin) == null ? void 0 : _a.x, (_b = unref(middlewareData).transformOrigin) == null ? void 0 : _b.y].join(" "),
          ...((_c = unref(middlewareData).hide) == null ? void 0 : _c.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [props.memoDependencies ? withMemo([
        props.asChild,
        props.as,
        placedSide.value,
        placedAlign.value,
        unref(isPositioned),
        ...Object.values(_ctx.$attrs),
        ...props.memoDependencies
      ], () => (openBlock(), createBlock(unref(Primitive), mergeProps({
        key: 0,
        ref: unref(forwardRef)
      }, _ctx.$attrs, {
        "as-child": props.asChild,
        as: props.as,
        "data-side": placedSide.value,
        "data-align": placedAlign.value,
        style: { animation: !unref(isPositioned) ? "none" : void 0 }
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as-child",
        "as",
        "data-side",
        "data-align",
        "style"
      ])), _cache, 0) : (openBlock(), createBlock(unref(Primitive), mergeProps({
        key: 1,
        ref: unref(forwardRef)
      }, _ctx.$attrs, {
        "as-child": props.asChild,
        as: props.as,
        "data-side": placedSide.value,
        "data-align": placedAlign.value,
        dir: unref(dir),
        style: { animation: !unref(isPositioned) ? "none" : void 0 }
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as-child",
        "as",
        "data-side",
        "data-align",
        "dir",
        "style"
      ]))], 12, _hoisted_1);
    };
  }
});
var PopperContent_default = PopperContent_vue_vue_type_script_setup_true_lang_default;
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperArrow",
  props: {
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
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
    const { forwardRef } = useForwardExpose();
    const contentContext = injectPopperContentContext();
    const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return openBlock(), createElementBlock("span", {
        ref: (el) => {
          unref(contentContext).onArrowChange(el != null ? el : void 0);
          return void 0;
        },
        style: normalizeStyle({
          position: "absolute",
          left: ((_a = unref(contentContext).arrowX) == null ? void 0 : _a.value) ? `${(_b = unref(contentContext).arrowX) == null ? void 0 : _b.value}px` : void 0,
          top: ((_c = unref(contentContext).arrowY) == null ? void 0 : _c.value) ? `${(_d = unref(contentContext).arrowY) == null ? void 0 : _d.value}px` : void 0,
          [baseSide.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[unref(contentContext).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[unref(contentContext).placedSide.value],
          visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [createVNode(Arrow_default, mergeProps(_ctx.$attrs, {
        ref: unref(forwardRef),
        style: { display: "block" },
        as: _ctx.as,
        "as-child": _ctx.asChild,
        rounded: _ctx.rounded,
        width: _ctx.width,
        height: _ctx.height
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "rounded",
        "width",
        "height"
      ])], 4);
    };
  }
});
var PopperArrow_default = PopperArrow_vue_vue_type_script_setup_true_lang_default;

export { PopperRoot_default as P, useTypeahead as a, PopperAnchor_default as b, useForwardPropsEmits as c, PopperArrow_default as d, useFocusGuards as e, PopperContent_default as f, PopperContentPropsDefaultValue as g, useDirection as u };
//# sourceMappingURL=PopperArrow-DeVkHboT.mjs.map
