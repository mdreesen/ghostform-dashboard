import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { _ as __nuxt_component_1 } from './Navigate-DXoGGEaX.mjs';
import { _ as __nuxt_component_1$1 } from './Section-ArHxFPsW.mjs';
import { J as useNuxtData, e as __nuxt_component_1$1$1, d as _sfc_main$8, t as useAppConfig, v as useComponentUI, o as useForwardPropsEmits, w as reactivePick, B as tv, L as useLocale, x as usePortal, M as reactiveOmit, N as createReusableTemplate, C as isArrayOfArray, D as _sfc_main$e, E as _sfc_main$b, F as get, O as _sfc_main$9, Q as pickLinkProps, R as _sfc_main$a, S as omit } from './server.mjs';
import { defineComponent, unref, ref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSlots, useModel, toRef, computed, renderSlot, createSlots, openBlock, createBlock, createCommentVNode, renderList, mergeModels, Fragment, resolveDynamicComponent, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { y as defu } from '../nitro/nitro.mjs';
import { D as DropdownMenuRoot_default, a as DropdownMenuTrigger_default, b as DropdownMenuArrow_default, _ as _sfc_main$4, c as DropdownMenu } from './Kbd-B9RCMXxh.mjs';
import { _ as _sfc_main$5 } from './Input-Bzrpkoao.mjs';
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
import '@iconify/utils';
import 'consola';
import 'ipx';
import './PopperArrow-DwLFqynP.mjs';
import '@floating-ui/vue';
import './utils-BdoY2z9M.mjs';
import 'aria-hidden';

function useFilter$1(options) {
  const computedOptions = computed(() => unref(options));
  const collator = computed(() => new Intl.Collator("en", {
    usage: "search",
    ...computedOptions.value
  }));
  const startsWith = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    return collator.value.compare(string.slice(0, substring.length), substring) === 0;
  };
  const endsWith = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    return collator.value.compare(string.slice(-substring.length), substring) === 0;
  };
  const contains = (string, substring) => {
    if (substring.length === 0) return true;
    string = string.normalize("NFC");
    substring = substring.normalize("NFC");
    let scan = 0;
    const sliceLen = substring.length;
    for (; scan + sliceLen <= string.length; scan++) {
      const slice = string.slice(scan, scan + sliceLen);
      if (collator.value.compare(substring, slice) === 0) return true;
    }
    return false;
  };
  return {
    startsWith,
    endsWith,
    contains
  };
}
function useFilter() {
  const { contains, startsWith } = useFilter$1({ sensitivity: "base" });
  function score(value, searchTerm) {
    if (!contains(value, searchTerm)) return null;
    if (contains(searchTerm, value)) return 0;
    if (startsWith(value, searchTerm)) return 1;
    return 2;
  }
  function scoreItem(item, searchTerm, fields) {
    if (typeof item !== "object" || item === null) {
      return score(String(item), searchTerm);
    }
    let bestScore = null;
    for (const field of fields) {
      const value = get(item, field);
      if (value == null) continue;
      const values = Array.isArray(value) ? value.map(String) : [String(value)];
      for (const v of values) {
        const s = score(v, searchTerm);
        if (s !== null && (bestScore === null || s < bestScore)) bestScore = s;
        if (bestScore === 0) return 0;
      }
    }
    return bestScore;
  }
  function filter(items, searchTerm, fields) {
    if (!searchTerm) return items;
    const scored = [];
    for (const item of items) {
      const s = scoreItem(item, searchTerm, fields);
      if (s !== null) {
        scored.push({ item, score: s });
      }
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.map(({ item }) => item);
  }
  function filterGroups(groups, searchTerm, options) {
    if (!searchTerm) return groups;
    return groups.map((group) => {
      const result = [];
      for (const item of group) {
        if (item === void 0 || item === null) continue;
        if (options.isStructural?.(item)) {
          result.push({ item, score: -1 });
          continue;
        }
        const s = scoreItem(item, searchTerm, options.fields);
        if (s !== null) {
          result.push({ item, score: s });
        }
      }
      result.sort((a, b) => a.score - b.score);
      return result.map(({ item }) => item);
    }).filter((group) => group.some((item) => !options.isStructural?.(item)));
  }
  return { score, scoreItem, filter, filterGroups };
}
const _sfc_main$3 = {
  __name: "UDropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    items: { type: null, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true },
    sub: { type: Boolean, required: false },
    labelKey: { type: null, required: true },
    descriptionKey: { type: null, required: true },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
    size: { type: null, required: false },
    filter: { type: [Boolean, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    searchTerm: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: true },
    uiOverride: { type: null, required: false },
    loop: { type: Boolean, required: false },
    side: { type: null, required: false },
    sideOffset: { type: Number, required: false },
    sideFlip: { type: Boolean, required: false },
    align: { type: null, required: false },
    alignOffset: { type: Number, required: false },
    alignFlip: { type: Boolean, required: false },
    avoidCollisions: { type: Boolean, required: false },
    collisionBoundary: { type: null, required: false },
    collisionPadding: { type: [Number, Object], required: false },
    arrowPadding: { type: Number, required: false },
    hideShiftedArrow: { type: Boolean, required: false },
    sticky: { type: String, required: false },
    hideWhenDetached: { type: Boolean, required: false },
    positionStrategy: { type: String, required: false },
    updatePositionStrategy: { type: String, required: false },
    disableUpdateOnLayoutShift: { type: Boolean, required: false },
    prioritizePosition: { type: Boolean, required: false },
    reference: { type: null, required: false }
  },
  emits: ["update:searchTerm", "escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t, dir } = useLocale();
    const appConfig = useAppConfig();
    const { filterGroups } = useFilter();
    const _searchTerm = ref("");
    const searchTerm = computed({
      get: () => props.searchTerm ?? _searchTerm.value,
      set: (value) => {
        _searchTerm.value = value;
        emits("update:searchTerm", value);
      }
    });
    const inputProps = toRef(() => defu(props.filter, { placeholder: t("dropdownMenu.search"), variant: "none" }));
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "size", "filter", "filterFields", "ignoreFilter", "searchTerm", "class", "ui", "uiOverride"), emits);
    const getProxySlots = () => omit(slots, ["default"]);
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
    const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
    const groups = computed(() => {
      if (!props.items?.length) return [];
      return isArrayOfArray(props.items) ? props.items : [props.items];
    });
    const isStructuralItem = (item) => !!item.type && ["label", "separator"].includes(item.type);
    const filteredGroups = computed(() => {
      if (!props.filter || props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey];
      return filterGroups(groups.value, searchTerm.value, {
        fields,
        isStructural: isStructuralItem
      });
    });
    const hasFilteredItems = computed(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
        default: withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index,
              ui: __props.ui
            }, () => {
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.loading) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$b, mergeProps({
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"])) {
                _push2(`<span data-slot="itemWrapper" class="${ssrRenderClass(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && __props.externalIcon !== false) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                    "data-slot": "itemLabelExternalIcon",
                    class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
                if (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
                  _push2(`<span data-slot="itemDescription" class="${ssrRenderClass(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
                  ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                    item,
                    active,
                    index
                  }, () => {
                    _push2(`${ssrInterpolate(unref(get)(item, props.descriptionKey))}`);
                  }, _push2, _parent2, _scopeId);
                  _push2(`</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-slot="itemTrailing" class="${ssrRenderClass(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.children?.length) {
                  _push2(ssrRenderComponent(_sfc_main$e, {
                    name: childrenIcon.value,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.kbds?.length) {
                  _push2(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
                  ssrRenderList(item.kbds, (kbd, kbdIndex) => {
                    _push2(ssrRenderComponent(_sfc_main$4, mergeProps({
                      key: kbdIndex,
                      size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                    }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></span>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(ssrRenderComponent(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$e, {
                      name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$e, {
                        name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                ui: __props.ui
              }, () => [
                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index,
                  ui: __props.ui
                }, () => [
                  item.loading ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 0,
                    name: __props.loadingIcon || unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, 8, ["name", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                    key: 1,
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                    key: 2,
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                ]),
                unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) ? (openBlock(), createBlock("span", {
                  key: 0,
                  "data-slot": "itemWrapper",
                  class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
                }, [
                  createVNode("span", {
                    "data-slot": "itemLabel",
                    class: __props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                      item,
                      active,
                      index
                    }, () => [
                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                    ]),
                    item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e, {
                      key: 0,
                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                      "data-slot": "itemLabelExternalIcon",
                      class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ], 2),
                  unref(get)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (openBlock(), createBlock("span", {
                    key: 0,
                    "data-slot": "itemDescription",
                    class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
                  }, [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                      item,
                      active,
                      index
                    }, () => [
                      createTextVNode(toDisplayString(unref(get)(item, props.descriptionKey)), 1)
                    ])
                  ], 2)) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                createVNode("span", {
                  "data-slot": "itemTrailing",
                  class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
                }, [
                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                    item,
                    active,
                    index,
                    ui: __props.ui
                  }, () => [
                    item.children?.length ? (openBlock(), createBlock(_sfc_main$e, {
                      key: 0,
                      name: childrenIcon.value,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : item.kbds?.length ? (openBlock(), createBlock("span", {
                      key: 1,
                      "data-slot": "itemTrailingKbds",
                      class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.kbds, (kbd, kbdIndex) => {
                        return openBlock(), createBlock(_sfc_main$4, mergeProps({
                          key: kbdIndex,
                          size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                      }), 128))
                    ], 2)) : createCommentVNode("", true)
                  ]),
                  createVNode(unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$e, {
                        name: __props.checkedIcon || unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1024)
                ], 2)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DropdownMenu).Portal, unref(portalProps), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
              "data-slot": "content",
              class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
            }, unref(contentProps)), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!__props.filter) {
                    _push3(ssrRenderComponent(unref(DropdownMenu).Filter, {
                      modelValue: searchTerm.value,
                      "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                      "as-child": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$5, mergeProps({
                            autofocus: "",
                            autocomplete: "off",
                            size: __props.size
                          }, inputProps.value, {
                            "data-slot": "input",
                            class: __props.ui.input({ class: __props.uiOverride?.input }),
                            onChange: () => {
                            }
                          }), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$5, mergeProps({
                              autofocus: "",
                              autocomplete: "off",
                              size: __props.size
                            }, inputProps.value, {
                              "data-slot": "input",
                              class: __props.ui.input({ class: __props.uiOverride?.input }),
                              onChange: withModifiers(() => {
                              }, ["stop"])
                            }), null, 16, ["size", "class", "onChange"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  ssrRenderSlot(_ctx.$slots, "content-top", {
                    sub: __props.sub ?? false
                  }, null, _push3, _parent3, _scopeId2);
                  if (!searchTerm.value || hasFilteredItems.value) {
                    _push3(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId2}><!--[-->`);
                    ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                      _push3(ssrRenderComponent(unref(DropdownMenu).Group, {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: __props.ui.group({ class: __props.uiOverride?.group })
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(group, (item, index) => {
                              _push4(`<!--[-->`);
                              if (item.type === "label") {
                                _push4(ssrRenderComponent(unref(DropdownMenu).Label, {
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else if (item.type === "separator") {
                                _push4(ssrRenderComponent(unref(DropdownMenu).Separator, {
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, _parent4, _scopeId3));
                              } else if (item?.children?.length) {
                                _push4(ssrRenderComponent(unref(DropdownMenu).Sub, {
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(unref(DropdownMenu).SubTrigger, {
                                        as: "button",
                                        type: "button",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                      }, {
                                        default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(ReuseItemTemplate), {
                                              item,
                                              index
                                            }, null, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              createVNode(unref(ReuseItemTemplate), {
                                                item,
                                                index
                                              }, null, 8, ["item", "index"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(ssrRenderComponent(_sfc_main$3, mergeProps({
                                        sub: "",
                                        class: item.ui?.content,
                                        ui: __props.ui,
                                        "ui-override": __props.uiOverride,
                                        portal: __props.portal,
                                        items: item.children,
                                        align: "start",
                                        "align-offset": -4,
                                        "side-offset": 3,
                                        "label-key": __props.labelKey,
                                        "description-key": __props.descriptionKey,
                                        "checked-icon": __props.checkedIcon,
                                        "loading-icon": __props.loadingIcon,
                                        "external-icon": __props.externalIcon,
                                        size: __props.size,
                                        filter: item.filter,
                                        "filter-fields": item.filterFields || __props.filterFields,
                                        "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                      }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                        renderList(getProxySlots(), (_5, name) => {
                                          return {
                                            name,
                                            fn: withCtx((slotData, _push6, _parent6, _scopeId5) => {
                                              if (_push6) {
                                                ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push6, _parent6, _scopeId5);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                                ];
                                              }
                                            })
                                          };
                                        })
                                      ]), _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(unref(DropdownMenu).SubTrigger, {
                                          as: "button",
                                          type: "button",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item,
                                              index
                                            }, null, 8, ["item", "index"])
                                          ]),
                                          _: 2
                                        }, 1032, ["disabled", "text-value", "class"]),
                                        createVNode(_sfc_main$3, mergeProps({
                                          sub: "",
                                          class: item.ui?.content,
                                          ui: __props.ui,
                                          "ui-override": __props.uiOverride,
                                          portal: __props.portal,
                                          items: item.children,
                                          align: "start",
                                          "align-offset": -4,
                                          "side-offset": 3,
                                          "label-key": __props.labelKey,
                                          "description-key": __props.descriptionKey,
                                          "checked-icon": __props.checkedIcon,
                                          "loading-icon": __props.loadingIcon,
                                          "external-icon": __props.externalIcon,
                                          size: __props.size,
                                          filter: item.filter,
                                          "filter-fields": item.filterFields || __props.filterFields,
                                          "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                        }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                          renderList(getProxySlots(), (_5, name) => {
                                            return {
                                              name,
                                              fn: withCtx((slotData) => [
                                                renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                              ])
                                            };
                                          })
                                        ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else if (item.type === "checkbox") {
                                _push4(ssrRenderComponent(unref(DropdownMenu).CheckboxItem, {
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": unref(get)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(ssrRenderComponent(_sfc_main$9, mergeProps({ ref_for: true }, unref(pickLinkProps)(item), { custom: "" }), {
                                  default: withCtx(({ active, ...slotProps }, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(unref(DropdownMenu).Item, {
                                        "as-child": "",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                            }), {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(unref(ReuseItemTemplate), {
                                                    item,
                                                    active,
                                                    index
                                                  }, null, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(unref(ReuseItemTemplate), {
                                                      item,
                                                      active,
                                                      index
                                                    }, null, 8, ["item", "active", "index"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              createVNode(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                                "data-slot": "item",
                                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode(unref(ReuseItemTemplate), {
                                                    item,
                                                    active,
                                                    index
                                                  }, null, 8, ["item", "active", "index"])
                                                ]),
                                                _: 2
                                              }, 1040, ["class"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(unref(DropdownMenu).Item, {
                                          "as-child": "",
                                          disabled: item.disabled,
                                          "text-value": unref(get)(item, props.labelKey),
                                          onSelect: item.onSelect
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                            }), {
                                              default: withCtx(() => [
                                                createVNode(unref(ReuseItemTemplate), {
                                                  item,
                                                  active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["disabled", "text-value", "onSelect"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              }
                              _push4(`<!--]-->`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                    key: 0,
                                    "data-slot": "label",
                                    class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                    key: 1,
                                    "data-slot": "separator",
                                    class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                  }, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                    key: 2,
                                    open: item.open,
                                    "default-open": item.defaultOpen
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(DropdownMenu).SubTrigger, {
                                        as: "button",
                                        type: "button",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item,
                                            index
                                          }, null, 8, ["item", "index"])
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "text-value", "class"]),
                                      createVNode(_sfc_main$3, mergeProps({
                                        sub: "",
                                        class: item.ui?.content,
                                        ui: __props.ui,
                                        "ui-override": __props.uiOverride,
                                        portal: __props.portal,
                                        items: item.children,
                                        align: "start",
                                        "align-offset": -4,
                                        "side-offset": 3,
                                        "label-key": __props.labelKey,
                                        "description-key": __props.descriptionKey,
                                        "checked-icon": __props.checkedIcon,
                                        "loading-icon": __props.loadingIcon,
                                        "external-icon": __props.externalIcon,
                                        size: __props.size,
                                        filter: item.filter,
                                        "filter-fields": item.filterFields || __props.filterFields,
                                        "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                      }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                        renderList(getProxySlots(), (_4, name) => {
                                          return {
                                            name,
                                            fn: withCtx((slotData) => [
                                              renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                            ])
                                          };
                                        })
                                      ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                    ]),
                                    _: 2
                                  }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                    key: 3,
                                    "model-value": item.checked,
                                    disabled: item.disabled,
                                    "text-value": unref(get)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                    "onUpdate:modelValue": item.onUpdateChecked,
                                    onSelect: item.onSelect
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 2
                                  }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (openBlock(), createBlock(_sfc_main$9, mergeProps({
                                    key: 4,
                                    ref_for: true
                                  }, unref(pickLinkProps)(item), { custom: "" }), {
                                    default: withCtx(({ active, ...slotProps }) => [
                                      createVNode(unref(DropdownMenu).Item, {
                                        "as-child": "",
                                        disabled: item.disabled,
                                        "text-value": unref(get)(item, props.labelKey),
                                        onSelect: item.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(unref(ReuseItemTemplate), {
                                                item,
                                                active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "text-value", "onSelect"])
                                    ]),
                                    _: 2
                                  }, 1040))
                                ], 64);
                              }), 128))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (searchTerm.value && !hasFilteredItems.value) {
                    _push3(`<div data-slot="empty" class="${ssrRenderClass(__props.ui.empty({ class: __props.uiOverride?.empty }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                      _push3(`${ssrInterpolate(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value }))}`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  ssrRenderSlot(_ctx.$slots, "content-bottom", {
                    sub: __props.sub ?? false
                  }, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    !!__props.filter ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
                      key: 0,
                      modelValue: searchTerm.value,
                      "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$5, mergeProps({
                          autofocus: "",
                          autocomplete: "off",
                          size: __props.size
                        }, inputProps.value, {
                          "data-slot": "input",
                          class: __props.ui.input({ class: __props.uiOverride?.input }),
                          onChange: withModifiers(() => {
                          }, ["stop"])
                        }), null, 16, ["size", "class", "onChange"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "content-top", {
                      sub: __props.sub ?? false
                    }),
                    !searchTerm.value || hasFilteredItems.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      role: "presentation",
                      "data-slot": "viewport",
                      class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                        return openBlock(), createBlock(unref(DropdownMenu).Group, {
                          key: `group-${groupIndex}`,
                          "data-slot": "group",
                          class: __props.ui.group({ class: __props.uiOverride?.group })
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                              return openBlock(), createBlock(Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                  key: 2,
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": unref(get)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "class"]),
                                    createVNode(_sfc_main$3, mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon,
                                      size: __props.size,
                                      filter: item.filter,
                                      "filter-fields": item.filterFields || __props.filterFields,
                                      "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                    }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                      renderList(getProxySlots(), (_3, name) => {
                                        return {
                                          name,
                                          fn: withCtx((slotData) => [
                                            renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                          ])
                                        };
                                      })
                                    ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                  ]),
                                  _: 2
                                }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                  key: 3,
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": unref(get)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (openBlock(), createBlock(_sfc_main$9, mergeProps({
                                  key: 4,
                                  ref_for: true
                                }, unref(pickLinkProps)(item), { custom: "" }), {
                                  default: withCtx(({ active, ...slotProps }) => [
                                    createVNode(unref(DropdownMenu).Item, {
                                      "as-child": "",
                                      disabled: item.disabled,
                                      "text-value": unref(get)(item, props.labelKey),
                                      onSelect: item.onSelect
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(unref(ReuseItemTemplate), {
                                              item,
                                              active,
                                              index
                                            }, null, 8, ["item", "active", "index"])
                                          ]),
                                          _: 2
                                        }, 1040, ["class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "onSelect"])
                                  ]),
                                  _: 2
                                }, 1040))
                              ], 64);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ], 2)) : createCommentVNode("", true),
                    searchTerm.value && !hasFilteredItems.value ? (openBlock(), createBlock("div", {
                      key: 2,
                      "data-slot": "empty",
                      class: __props.ui.empty({ class: __props.uiOverride?.empty })
                    }, [
                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                        createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default"),
                    renderSlot(_ctx.$slots, "content-bottom", {
                      sub: __props.sub ?? false
                    })
                  ];
                }
              }),
              _: 3
            }), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(__props.sub ? unref(DropdownMenu).SubContent : unref(DropdownMenu).Content), mergeProps({
                "data-slot": "content",
                class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
              }, unref(contentProps)), {
                default: withCtx(() => [
                  !!__props.filter ? (openBlock(), createBlock(unref(DropdownMenu).Filter, {
                    key: 0,
                    modelValue: searchTerm.value,
                    "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$5, mergeProps({
                        autofocus: "",
                        autocomplete: "off",
                        size: __props.size
                      }, inputProps.value, {
                        "data-slot": "input",
                        class: __props.ui.input({ class: __props.uiOverride?.input }),
                        onChange: withModifiers(() => {
                        }, ["stop"])
                      }), null, 16, ["size", "class", "onChange"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "content-top", {
                    sub: __props.sub ?? false
                  }),
                  !searchTerm.value || hasFilteredItems.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    role: "presentation",
                    "data-slot": "viewport",
                    class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                      return openBlock(), createBlock(unref(DropdownMenu).Group, {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: __props.ui.group({ class: __props.uiOverride?.group })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                            return openBlock(), createBlock(Fragment, {
                              key: `group-${groupIndex}-${index}`
                            }, [
                              item.type === "label" ? (openBlock(), createBlock(unref(DropdownMenu).Label, {
                                key: 0,
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["class"])) : item.type === "separator" ? (openBlock(), createBlock(unref(DropdownMenu).Separator, {
                                key: 1,
                                "data-slot": "separator",
                                class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                              }, null, 8, ["class"])) : item?.children?.length ? (openBlock(), createBlock(unref(DropdownMenu).Sub, {
                                key: 2,
                                open: item.open,
                                "default-open": item.defaultOpen
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(DropdownMenu).SubTrigger, {
                                    as: "button",
                                    type: "button",
                                    disabled: item.disabled,
                                    "text-value": unref(get)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "text-value", "class"]),
                                  createVNode(_sfc_main$3, mergeProps({
                                    sub: "",
                                    class: item.ui?.content,
                                    ui: __props.ui,
                                    "ui-override": __props.uiOverride,
                                    portal: __props.portal,
                                    items: item.children,
                                    align: "start",
                                    "align-offset": -4,
                                    "side-offset": 3,
                                    "label-key": __props.labelKey,
                                    "description-key": __props.descriptionKey,
                                    "checked-icon": __props.checkedIcon,
                                    "loading-icon": __props.loadingIcon,
                                    "external-icon": __props.externalIcon,
                                    size: __props.size,
                                    filter: item.filter,
                                    "filter-fields": item.filterFields || __props.filterFields,
                                    "ignore-filter": item.ignoreFilter ?? __props.ignoreFilter
                                  }, { ref_for: true }, item.content), createSlots({ _: 2 }, [
                                    renderList(getProxySlots(), (_2, name) => {
                                      return {
                                        name,
                                        fn: withCtx((slotData) => [
                                          renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))
                                        ])
                                      };
                                    })
                                  ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
                                ]),
                                _: 2
                              }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (openBlock(), createBlock(unref(DropdownMenu).CheckboxItem, {
                                key: 3,
                                "model-value": item.checked,
                                disabled: item.disabled,
                                "text-value": unref(get)(item, props.labelKey),
                                "data-slot": "item",
                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                "onUpdate:modelValue": item.onUpdateChecked,
                                onSelect: item.onSelect
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (openBlock(), createBlock(_sfc_main$9, mergeProps({
                                key: 4,
                                ref_for: true
                              }, unref(pickLinkProps)(item), { custom: "" }), {
                                default: withCtx(({ active, ...slotProps }) => [
                                  createVNode(unref(DropdownMenu).Item, {
                                    "as-child": "",
                                    disabled: item.disabled,
                                    "text-value": unref(get)(item, props.labelKey),
                                    onSelect: item.onSelect
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$a, mergeProps({ ref_for: true }, slotProps, {
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                      }), {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseItemTemplate), {
                                            item,
                                            active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "text-value", "onSelect"])
                                ]),
                                _: 2
                              }, 1040))
                            ], 64);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"]);
                    }), 128))
                  ], 2)) : createCommentVNode("", true),
                  searchTerm.value && !hasFilteredItems.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    "data-slot": "empty",
                    class: __props.ui.empty({ class: __props.uiOverride?.empty })
                  }, [
                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                      createTextVNode(toDisplayString(unref(t)("dropdownMenu.noMatch", { searchTerm: searchTerm.value })), 1)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "default"),
                  renderSlot(_ctx.$slots, "content-bottom", {
                    sub: __props.sub ?? false
                  })
                ]),
                _: 3
              }, 16, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "input": "border-b border-default",
    "empty": "text-center text-muted",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-bg stroke-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "empty": "p-2 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "empty": "p-2.5 text-xs",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "empty": "p-2.5 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "empty": "p-3 text-sm",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "empty": "p-3 text-base",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$2 = {
  __name: "UDropdownMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    size: { type: null, required: false },
    items: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    filter: { type: [Boolean, Object], required: false, default: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open"], ["update:searchTerm"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dropdownMenu", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
    const getProxySlots = () => omit(slots, ["default"]);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dropdownMenu || {} })({
      size: props.size
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot_default), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DropdownMenuTrigger_default), {
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
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
            _push2(ssrRenderComponent(_sfc_main$3, mergeProps({
              "search-term": searchTerm.value,
              "onUpdate:searchTerm": ($event) => searchTerm.value = $event,
              class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] }),
              ui: ui.value,
              "ui-override": unref(uiProp)
            }, contentProps.value, {
              items: __props.items,
              portal: __props.portal,
              "label-key": __props.labelKey,
              "description-key": __props.descriptionKey,
              "checked-icon": __props.checkedIcon,
              "loading-icon": __props.loadingIcon,
              "external-icon": __props.externalIcon,
              size: __props.size,
              filter: __props.filter,
              "filter-fields": __props.filterFields,
              "ignore-filter": __props.ignoreFilter
            }), createSlots({
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!__props.arrow) {
                    _push3(ssrRenderComponent(unref(DropdownMenuArrow_default), mergeProps(arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                    }), null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!__props.arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                    }), null, 16, ["class"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, [
              renderList(getProxySlots(), (_, name) => {
                return {
                  name,
                  fn: withCtx((slotData, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, name, slotData)
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(DropdownMenuTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class", "disabled"])) : createCommentVNode("", true),
              createVNode(_sfc_main$3, mergeProps({
                "search-term": searchTerm.value,
                "onUpdate:searchTerm": ($event) => searchTerm.value = $event,
                class: ui.value.content({ class: [!slots.default && props.class, unref(uiProp)?.content] }),
                ui: ui.value,
                "ui-override": unref(uiProp)
              }, contentProps.value, {
                items: __props.items,
                portal: __props.portal,
                "label-key": __props.labelKey,
                "description-key": __props.descriptionKey,
                "checked-icon": __props.checkedIcon,
                "loading-icon": __props.loadingIcon,
                "external-icon": __props.externalIcon,
                size: __props.size,
                filter: __props.filter,
                "filter-fields": __props.filterFields,
                "ignore-filter": __props.ignoreFilter
              }), createSlots({
                default: withCtx(() => [
                  !!__props.arrow ? (openBlock(), createBlock(unref(DropdownMenuArrow_default), mergeProps({ key: 0 }, arrowProps.value, {
                    "data-slot": "arrow",
                    class: ui.value.arrow({ class: unref(uiProp)?.arrow })
                  }), null, 16, ["class"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, [
                renderList(getProxySlots(), (_, name) => {
                  return {
                    name,
                    fn: withCtx((slotData) => [
                      renderSlot(_ctx.$slots, name, slotData)
                    ])
                  };
                })
              ]), 1040, ["search-term", "onUpdate:searchTerm", "class", "ui", "ui-override", "items", "portal", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon", "size", "filter", "filter-fields", "ignore-filter"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const nameSpreadsheet = (format) => `GhostForm_Leads_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
function useCSV(leads) {
  const headers = ["Name", "Email", "Phone", "Age", "Address", "Status", "Date", "buy | sell | both", "Estimated home price", "Sqft", "Bedrooms", "Bathrooms", "Budget"];
  const rows = leads.map((lead) => [
    lead?.name,
    lead?.email,
    lead?.phone,
    lead?.age,
    lead?.address?.replace(/[,.]/g, ""),
    lead?.status,
    lead?.date,
    lead?.buy_sell_both,
    lead?.price,
    lead?.sqft,
    lead?.bedrooms,
    lead?.bathrooms,
    lead?.budget?.toString()?.replace(/[^0-9.-]+/g, "")
    // Strip currency symbols for spreadsheet math
  ]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(","))
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = (void 0).createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", nameSpreadsheet("csv"));
  link.style.visibility = "hidden";
  (void 0).body.appendChild(link);
  link.click();
  (void 0).body.removeChild(link);
}
function useSpreadsheet() {
  const isGenerating = ref(false);
  const exportLeadsToXLSX = async (leadsArray, fileName = nameSpreadsheet("xlsx")) => {
    if (!leadsArray || leadsArray.length === 0) {
      console.warn("Excel pipeline process skipped: Array payload empty.");
      return;
    }
    isGenerating.value = true;
    try {
      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();
      const wsData = workbook.addWorksheet("Lead Telemetry", { views: [{ showGridLines: true }] });
      wsData.columns = [
        { header: "Name", key: "name", width: 22 },
        { header: "Email", key: "email", width: 28 },
        { header: "Phone", key: "phone", width: 16 },
        { header: "Age", key: "age", width: 10 },
        { header: "Address", key: "address", width: 35 },
        { header: "Status", key: "status", width: 14 },
        { header: "Date", key: "date", width: 14 },
        { header: "buy | sell | both", key: "intent", width: 18 },
        { header: "Estimated home price", key: "price", width: 22 },
        { header: "Sqft", key: "sqft", width: 12 },
        { header: "Bedrooms", key: "beds", width: 12 },
        { header: "Bathrooms", key: "baths", width: 12 },
        { header: "Budget", key: "budget", width: 16 }
      ];
      leadsArray.forEach((lead) => {
        wsData.addRow({
          name: lead.name || "Anonymous Node",
          email: lead.email || "",
          // Data Scrubbing: If value is 0 or empty string, keep cell unpopulated
          phone: lead.phone && lead.phone !== "" && lead.phone !== "0" ? lead.phone.toString() : "",
          age: lead.age && lead.age !== 0 && lead.age !== "0" ? Number(lead.age) : "",
          address: lead.address || "",
          status: lead.status ? lead.status.toLowerCase() : "new",
          // Formats time strings to flat YYYY-MM-DD format if valid
          date: lead.date && lead.date !== "Invalid Date" ? new Date(lead.date).toISOString().split("T")[0] : "",
          intent: lead.buy_sell_both || "",
          price: lead.price && lead.price !== 0 && lead.price !== "0" ? Number(lead.price) : "",
          sqft: lead.sqft && lead.sqft !== 0 && lead.sqft !== "0" ? Number(lead.sqft) : "",
          beds: lead.bedrooms && lead.bedrooms !== 0 && lead.bedrooms !== "0" ? Number(lead.bedrooms) : "",
          baths: lead.bathrooms && lead.bathrooms !== 0 && lead.bathrooms !== "0" ? Number(lead.bathrooms) : "",
          budget: lead.budget && lead.budget !== 0 && lead.budget !== "0" ? Number(lead.budget) : ""
        });
      });
      wsData.getRow(1).eachCell((cell) => {
        cell.font = { name: "Segoe UI", bold: true, color: { argb: "FFFFFF" }, size: 11 };
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "121214" } };
        cell.alignment = { vertical: "middle", horizontal: "left" };
      });
      wsData.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        row.getCell("phone").alignment = { horizontal: "left" };
        row.getCell("age").alignment = { horizontal: "center" };
        row.getCell("status").alignment = { horizontal: "center" };
        row.getCell("date").alignment = { horizontal: "center" };
        row.getCell("intent").alignment = { horizontal: "center" };
        row.getCell("sqft").alignment = { horizontal: "right" };
        row.getCell("beds").alignment = { horizontal: "center" };
        row.getCell("baths").alignment = { horizontal: "center" };
        row.getCell("price").numFmt = '$#,##0;($#,##0);""';
        row.getCell("budget").numFmt = '$#,##0;($#,##0);""';
        row.getCell("price").alignment = { horizontal: "right" };
        row.getCell("budget").alignment = { horizontal: "right" };
        if (rowNumber % 2 === 0) {
          row.eachCell((cell) => {
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "F8F9FA" } };
          });
        }
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin", color: { argb: "E5E7EB" } },
            left: { style: "thin", color: { argb: "E5E7EB" } },
            bottom: { style: "thin", color: { argb: "E5E7EB" } },
            right: { style: "thin", color: { argb: "E5E7EB" } }
          };
        });
      });
      wsData.getColumn("name").width = 24;
      wsData.getColumn("email").width = 30;
      wsData.getColumn("phone").width = 16;
      wsData.getColumn("age").width = 10;
      wsData.getColumn("address").width = 38;
      wsData.getColumn("status").width = 12;
      wsData.getColumn("date").width = 14;
      wsData.getColumn("intent").width = 18;
      wsData.getColumn("price").width = 22;
      wsData.getColumn("sqft").width = 12;
      wsData.getColumn("beds").width = 12;
      wsData.getColumn("baths").width = 12;
      wsData.getColumn("budget").width = 18;
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = (void 0).createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      link.download = fileName;
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Spreadsheet assembly phase halted via aligned composable:", error);
    } finally {
      isGenerating.value = false;
    }
  };
  return {
    exportLeadsToXLSX,
    isGenerating
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Export",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const isExporting = ref(false);
    const currentFormat = ref("XLSX");
    const items = ref([
      [
        {
          label: "Formatted Spreadsheet (.xlsx)",
          icon: "i-heroicons-table-cells",
          onSelect: () => {
            currentFormat.value = "XLSX";
            executeExport();
          }
        },
        {
          label: "Raw Comma Separated (.csv)",
          icon: "i-heroicons-document-text",
          onSelect: () => {
            currentFormat.value = "CSV";
            executeExport();
          }
        }
      ]
    ]);
    const executeExport = async () => {
      const { exportLeadsToXLSX } = useSpreadsheet();
      isExporting.value = true;
      try {
        switch (true) {
          case currentFormat.value.includes("CSV"):
            return useCSV(props.data);
          default:
            return exportLeadsToXLSX(props.data);
        }
        ;
      } catch (error) {
        console.error("Data pipeline extraction phase aborted.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UDropdownMenu = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-xl overflow-hidden shadow-[0_0_20px_rgba(48,207,67,0.1)] bg-white/2 border border-white/8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UButton, {
        loading: unref(isExporting),
        color: "neutral",
        variant: "ghost",
        icon: "i-heroicons-arrow-down-tray",
        class: "rounded-none px-4 py-2.5 text-xs font-black tracking-wider uppercase text-white hover:bg-cyan/10",
        onClick: executeExport
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Export ${ssrInterpolate(unref(currentFormat))}`);
          } else {
            return [
              createTextVNode(" Export " + toDisplayString(unref(currentFormat)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UDropdownMenu, {
        items: unref(items),
        content: { align: "end", side: "bottom", sideOffset: 8 }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              icon: "i-heroicons-chevron-down",
              class: "rounded-none border-l border-white/8 px-2.5 py-2.5 text-white hover:bg-cyan/10"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                icon: "i-heroicons-chevron-down",
                class: "rounded-none border-l border-white/8 px-2.5 py-2.5 text-white hover:bg-cyan/10"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Button/Export.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "BaseButtonExport" });
function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: leads } = useNuxtData("leads");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_baseHeaderSection = __nuxt_component_1$1;
      const _component_baseButtonExport = __nuxt_component_3;
      const _component_ClientOnly = __nuxt_component_1$1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="flex flex-wrap justify-between">`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: "Lead Archive",
        subLabel: "Intake Intelligence"
      }, null, _parent));
      _push(ssrRenderComponent(_component_baseButtonNavigate, {
        text: "+ Create Lead",
        path: "/dashboard/leads/create"
      }, null, _parent));
      _push(`</section><main class="max-w-7xl mx-auto relative z-10"><section class="flex flex-col gap-10"><!--[-->`);
      ssrRenderList(unref(leads)?.status, (item) => {
        _push(`<div class="space-y-6 w-full"><div class="flex justify-between items-end mb-4">`);
        if (unref(leads)) {
          _push(ssrRenderComponent(_component_baseHeaderSection, {
            text: unref(capitalizeFirstLetter)(item.label)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_baseButtonExport, {
          data: item.leads
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--><div class="space-y-6 w-full"><div class="flex justify-between items-end mb-4">`);
      if (unref(leads)) {
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "All Leads" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_baseButtonExport, {
        data: unref(leads)?.all
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></section></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D3VpKn9U.mjs.map
