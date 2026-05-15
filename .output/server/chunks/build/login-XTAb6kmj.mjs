import { f as formVarient, i as inputVarient, _ as __nuxt_component_0 } from './varients-BuwxFdnl.mjs';
import { defineComponent, ref, reactive, resolveDirective, mergeProps, unref, withCtx, createVNode, withModifiers, withDirectives, openBlock, createBlock, vModelText, createTextVNode, useSlots, toRef, computed, resolveDynamicComponent, renderSlot, toHandlers, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrGetDirectiveProps, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { e as useUserSession, X as useMotion, K as _sfc_main$8, _ as __nuxt_component_0$2, C as useAppConfig, D as useComponentUI, F as useForwardPropsEmits, G as reactivePick, H as usePortal, J as tv, V as VisuallyHidden_default } from './server.mjs';
import { DrawerRootNested, DrawerRoot, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerHandle, DrawerTitle, DrawerDescription } from 'vaul-vue';
import { p as pointerDownOutside } from './overlay-CjyBzL1C.mjs';
import { _ as __nuxt_component_1 } from './ButtonSubmit-DXjXto94.mjs';
import { u as useToast } from './useToast-BpBVDIQ9.mjs';
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

const theme = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default ring ring-default flex focus:outline-none",
    "handle": [
      "shrink-0 !bg-accented",
      "transition-opacity"
    ],
    "container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
    "header": "",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "flex-1",
    "footer": "flex flex-col gap-1.5"
  },
  "variants": {
    "direction": {
      "top": {
        "content": "mb-24 flex-col-reverse",
        "handle": "mb-4"
      },
      "right": {
        "content": "flex-row",
        "handle": "!ml-4"
      },
      "bottom": {
        "content": "mt-24 flex-col",
        "handle": "mt-4"
      },
      "left": {
        "content": "flex-row-reverse",
        "handle": "!mr-4"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]"
      }
    },
    "snapPoints": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "direction": [
        "top",
        "bottom"
      ],
      "class": {
        "content": "h-auto max-h-[96%]",
        "handle": "!w-12 !h-1.5 mx-auto"
      }
    },
    {
      "direction": [
        "top",
        "bottom"
      ],
      "snapPoints": true,
      "class": {
        "content": "h-full"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "class": {
        "content": "w-auto max-w-[calc(100%-2rem)]",
        "handle": "!h-12 !w-1.5 mt-auto mb-auto"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "snapPoints": true,
      "class": {
        "content": "w-full"
      }
    },
    {
      "direction": "top",
      "inset": true,
      "class": {
        "content": "inset-x-4 top-4"
      }
    },
    {
      "direction": "top",
      "inset": false,
      "class": {
        "content": "inset-x-0 top-0 rounded-b-lg"
      }
    },
    {
      "direction": "bottom",
      "inset": true,
      "class": {
        "content": "inset-x-4 bottom-4"
      }
    },
    {
      "direction": "bottom",
      "inset": false,
      "class": {
        "content": "inset-x-0 bottom-0 rounded-t-lg"
      }
    },
    {
      "direction": "left",
      "inset": true,
      "class": {
        "content": "inset-y-4 left-4"
      }
    },
    {
      "direction": "left",
      "inset": false,
      "class": {
        "content": "inset-y-0 left-0 rounded-r-lg"
      }
    },
    {
      "direction": "right",
      "inset": true,
      "class": {
        "content": "inset-y-4 right-4"
      }
    },
    {
      "direction": "right",
      "inset": false,
      "class": {
        "content": "inset-y-0 right-0 rounded-l-lg"
      }
    }
  ]
};
const _sfc_main$1 = {
  __name: "UDrawer",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    inset: { type: Boolean, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    handle: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    nested: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    activeSnapPoint: { type: [Number, String, null], required: false },
    closeThreshold: { type: Number, required: false },
    shouldScaleBackground: { type: Boolean, required: false },
    setBackgroundColorOnScale: { type: Boolean, required: false },
    scrollLockTimeout: { type: Number, required: false },
    fixed: { type: Boolean, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    modal: { type: Boolean, required: false, default: true },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    direction: { type: String, required: false, default: "bottom" },
    noBodyStyles: { type: Boolean, required: false },
    handleOnly: { type: Boolean, required: false },
    preventScrollRestoration: { type: Boolean, required: false },
    snapPoints: { type: Array, required: false }
  },
  emits: ["close:prevent", "drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("drawer", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
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
        pointerDownOutside
      };
    });
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.drawer) || {} })({
        direction: props.direction,
        inset: props.inset,
        snapPoints: props.snapPoints && props.snapPoints.length > 0
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.nested ? unref(DrawerRootNested) : unref(DrawerRoot)), mergeProps(unref(rootProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DrawerTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DrawerPortal), unref(portalProps), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent(unref(DrawerOverlay), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: (_a = unref(uiProp)) == null ? void 0 : _a.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(DrawerContent), mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, (_b = unref(uiProp)) == null ? void 0 : _b.content] })
                  }, contentProps.value, toHandlers(contentEvents.value)), {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        if (__props.handle) {
                          _push4(ssrRenderComponent(unref(DrawerHandle), {
                            "data-slot": "handle",
                            class: ui.value.handle({ class: (_a2 = unref(uiProp)) == null ? void 0 : _a2.handle })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!__props.title && !slots.title || !__props.description && !slots.description || !!slots.content) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden_default), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (!__props.title && !slots.title) {
                                  _push5(ssrRenderComponent(unref(DrawerTitle), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent(unref(DrawerTitle), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
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
                                    _: 3
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (!__props.description && !slots.description) {
                                  _push5(ssrRenderComponent(unref(DrawerDescription), null, null, _parent5, _scopeId4));
                                } else if (!!slots.content) {
                                  _push5(ssrRenderComponent(unref(DrawerDescription), null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
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
                                    _: 3
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  !__props.title && !slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerTitle), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  !__props.description && !slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerDescription), { key: 3 }, {
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
                            _: 3
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                          var _a3, _b3, _c2, _d2;
                          _push4(`<div data-slot="container" class="${ssrRenderClass(ui.value.container({ class: (_a3 = unref(uiProp)) == null ? void 0 : _a3.container }))}"${_scopeId3}>`);
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass(ui.value.header({ class: (_b3 = unref(uiProp)) == null ? void 0 : _b3.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
                              var _a4, _b4;
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DrawerTitle), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: (_a4 = unref(uiProp)) == null ? void 0 : _a4.title })
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
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
                                  _: 3
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DrawerDescription), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: (_b4 = unref(uiProp)) == null ? void 0 : _b4.description })
                                }, {
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
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
                                  _: 3
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
                            _push4(`<div data-slot="body" class="${ssrRenderClass(ui.value.body({ class: (_c2 = unref(uiProp)) == null ? void 0 : _c2.body }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "body", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass(ui.value.footer({ class: (_d2 = unref(uiProp)) == null ? void 0 : _d2.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          __props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: (_b2 = unref(uiProp)) == null ? void 0 : _b2.handle })
                          }, null, 8, ["class"])) : createCommentVNode("", true),
                          !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
                            default: withCtx(() => [
                              !__props.title && !slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerTitle), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              !__props.description && !slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerDescription), { key: 3 }, {
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
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b3, _c2, _d2;
                            return [
                              createVNode("div", {
                                "data-slot": "container",
                                class: ui.value.container({ class: (_a3 = unref(uiProp)) == null ? void 0 : _a3.container })
                              }, [
                                !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  "data-slot": "header",
                                  class: ui.value.header({ class: (_b3 = unref(uiProp)) == null ? void 0 : _b3.header })
                                }, [
                                  renderSlot(_ctx.$slots, "header", {}, () => {
                                    var _a4, _b4;
                                    return [
                                      __props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: (_a4 = unref(uiProp)) == null ? void 0 : _a4.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true),
                                      __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: (_b4 = unref(uiProp)) == null ? void 0 : _b4.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true)
                                    ];
                                  })
                                ], 2)) : createCommentVNode("", true),
                                !!slots.body ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  "data-slot": "body",
                                  class: ui.value.body({ class: (_c2 = unref(uiProp)) == null ? void 0 : _c2.body })
                                }, [
                                  renderSlot(_ctx.$slots, "body")
                                ], 2)) : createCommentVNode("", true),
                                !!slots.footer ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  "data-slot": "footer",
                                  class: ui.value.footer({ class: (_d2 = unref(uiProp)) == null ? void 0 : _d2.footer })
                                }, [
                                  renderSlot(_ctx.$slots, "footer")
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ];
                          })
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DrawerOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: (_c = unref(uiProp)) == null ? void 0 : _c.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DrawerContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, (_d = unref(uiProp)) == null ? void 0 : _d.content] })
                    }, contentProps.value, toHandlers(contentEvents.value)), {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          __props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: (_a2 = unref(uiProp)) == null ? void 0 : _a2.handle })
                          }, null, 8, ["class"])) : createCommentVNode("", true),
                          !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
                            default: withCtx(() => [
                              !__props.title && !slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerTitle), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              !__props.description && !slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerDescription), { key: 3 }, {
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
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b2, _c2, _d2;
                            return [
                              createVNode("div", {
                                "data-slot": "container",
                                class: ui.value.container({ class: (_a3 = unref(uiProp)) == null ? void 0 : _a3.container })
                              }, [
                                !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  "data-slot": "header",
                                  class: ui.value.header({ class: (_b2 = unref(uiProp)) == null ? void 0 : _b2.header })
                                }, [
                                  renderSlot(_ctx.$slots, "header", {}, () => {
                                    var _a4, _b3;
                                    return [
                                      __props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: (_a4 = unref(uiProp)) == null ? void 0 : _a4.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true),
                                      __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: (_b3 = unref(uiProp)) == null ? void 0 : _b3.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true)
                                    ];
                                  })
                                ], 2)) : createCommentVNode("", true),
                                !!slots.body ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  "data-slot": "body",
                                  class: ui.value.body({ class: (_c2 = unref(uiProp)) == null ? void 0 : _c2.body })
                                }, [
                                  renderSlot(_ctx.$slots, "body")
                                ], 2)) : createCommentVNode("", true),
                                !!slots.footer ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  "data-slot": "footer",
                                  class: ui.value.footer({ class: (_d2 = unref(uiProp)) == null ? void 0 : _d2.footer })
                                }, [
                                  renderSlot(_ctx.$slots, "footer")
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ];
                          })
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(DrawerTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DrawerPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DrawerOverlay), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: (_a = unref(uiProp)) == null ? void 0 : _a.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DrawerContent), mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, (_b = unref(uiProp)) == null ? void 0 : _b.content] })
                    }, contentProps.value, toHandlers(contentEvents.value)), {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          __props.handle ? (openBlock(), createBlock(unref(DrawerHandle), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: (_a2 = unref(uiProp)) == null ? void 0 : _a2.handle })
                          }, null, 8, ["class"])) : createCommentVNode("", true),
                          !__props.title && !slots.title || !__props.description && !slots.description || !!slots.content ? (openBlock(), createBlock(unref(VisuallyHidden_default), { key: 1 }, {
                            default: withCtx(() => [
                              !__props.title && !slots.title ? (openBlock(), createBlock(unref(DrawerTitle), { key: 0 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerTitle), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              !__props.description && !slots.description ? (openBlock(), createBlock(unref(DrawerDescription), { key: 2 })) : !!slots.content ? (openBlock(), createBlock(unref(DrawerDescription), { key: 3 }, {
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
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b2, _c, _d;
                            return [
                              createVNode("div", {
                                "data-slot": "container",
                                class: ui.value.container({ class: (_a3 = unref(uiProp)) == null ? void 0 : _a3.container })
                              }, [
                                !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  "data-slot": "header",
                                  class: ui.value.header({ class: (_b2 = unref(uiProp)) == null ? void 0 : _b2.header })
                                }, [
                                  renderSlot(_ctx.$slots, "header", {}, () => {
                                    var _a4, _b3;
                                    return [
                                      __props.title || !!slots.title ? (openBlock(), createBlock(unref(DrawerTitle), {
                                        key: 0,
                                        "data-slot": "title",
                                        class: ui.value.title({ class: (_a4 = unref(uiProp)) == null ? void 0 : _a4.title })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true),
                                      __props.description || !!slots.description ? (openBlock(), createBlock(unref(DrawerDescription), {
                                        key: 1,
                                        "data-slot": "description",
                                        class: ui.value.description({ class: (_b3 = unref(uiProp)) == null ? void 0 : _b3.description })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ]),
                                        _: 3
                                      }, 8, ["class"])) : createCommentVNode("", true)
                                    ];
                                  })
                                ], 2)) : createCommentVNode("", true),
                                !!slots.body ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  "data-slot": "body",
                                  class: ui.value.body({ class: (_c = unref(uiProp)) == null ? void 0 : _c.body })
                                }, [
                                  renderSlot(_ctx.$slots, "body")
                                ], 2)) : createCommentVNode("", true),
                                !!slots.footer ? (openBlock(), createBlock("div", {
                                  key: 2,
                                  "data-slot": "footer",
                                  class: ui.value.footer({ class: (_d = unref(uiProp)) == null ? void 0 : _d.footer })
                                }, [
                                  renderSlot(_ctx.$slots, "footer")
                                ], 2)) : createCommentVNode("", true)
                              ], 2)
                            ];
                          })
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      const _component_baseButtonSubmit = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _directive_motion = resolveDirective("motion");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center py-20 relative overflow-hidden" }, _attrs))} data-v-7e82e131><main class="w-full max-w-110 z-10" data-v-7e82e131><div class="backdrop-blur-xl bg-white/3 border border-white/8 rounded-3xl p-10 shadow-2xl" data-v-7e82e131><header class="text-center mb-12" data-v-7e82e131><h1 class="text-3xl font-bold tracking-tight text-white mb-2" data-v-7e82e131>GhostForm</h1><p class="text-zinc-400 text-sm" data-v-7e82e131>Intelligence for the Unseen.</p></header><div class="space-y-6" data-v-7e82e131><form class="space-y-6" data-v-7e82e131><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-7e82e131>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent));
      _push(`<input id="email" type="email"${ssrRenderAttr("value", credentials.email)} placeholder="Email" required class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" data-v-7e82e131></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-7e82e131>`);
      _push(ssrRenderComponent(_component_baseLabel, { text: "Password" }, null, _parent));
      _push(`<input id="password" type="password"${ssrRenderAttr("value", credentials.password)} placeholder="Password" required class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" data-v-7e82e131></div><div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center w-full mx-auto" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-7e82e131><div class="w-full relative flex justify-end" data-v-7e82e131>`);
      _push(ssrRenderComponent(_component_UDrawer, {
        title: "Reset your password",
        overlay: false,
        class: "bg-black"
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-6" data-v-7e82e131${_scopeId}><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-7e82e131${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseLabel, { text: "Email" }, null, _parent2, _scopeId));
            _push2(`<input id="email" type="email"${ssrRenderAttr("value", input.email)} placeholder="Email" required class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" data-v-7e82e131${_scopeId}></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-7e82e131${_scopeId}>`);
            _push2(ssrRenderComponent(_component_baseLabel, { text: "Question" }, null, _parent2, _scopeId));
            _push2(`<input id="question" type="text"${ssrRenderAttr("value", input.question)} placeholder="What is 4 + 3" required class="w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis" data-v-7e82e131${_scopeId}></div><div class="flex flex-col gap-8 pb-4" data-v-7e82e131${_scopeId}>`);
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
                    class: "w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis"
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
                    class: "w-full bg-white/3 border border-white/10 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-zinc-700 text-ellipsis"
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
      _push(`</div></div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() }))} data-v-7e82e131>`);
      _push(ssrRenderComponent(_component_baseButtonSubmit, {
        text: "Log in",
        isLoading: isLoading.value
      }, null, _parent));
      _push(`</div></form><div${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-center py-4" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-7e82e131><div class="absolute w-full border-t border-gray-700" data-v-7e82e131></div><span class="relative z-10 bg-gray-800/80 backdrop-blur-md px-4 text-gray-400 text-sm" data-v-7e82e131>OR</span></div><div${ssrRenderAttrs(mergeProps({ class: "text-center" }, ssrGetDirectiveProps(_ctx, _directive_motion, { ...unref(inputVarient)() })))} data-v-7e82e131><p class="text-gray-400 text-sm" data-v-7e82e131> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/signup",
        class: "text-blue-400 hover:underline transition-colors"
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
      _push(`</p></div><div class="relative flex items-center py-2" data-v-7e82e131><div class="grow border-t border-white/10" data-v-7e82e131></div><span class="shrink mx-4 text-zinc-500 text-[10px] uppercase tracking-widest font-bold" data-v-7e82e131>Encrypted Session</span><div class="grow border-t border-white/10" data-v-7e82e131></div></div><p class="text-center text-xs text-zinc-500 leading-relaxed" data-v-7e82e131> Authorized personnel only. Sessions are logged and analyzed for regional compliance. </p></div></div><footer class="mt-8 flex justify-between items-center px-4" data-v-7e82e131><div class="flex items-center gap-2" data-v-7e82e131><div class="w-1.5 h-1.5 rounded-full bg-[#30cf43] shadow-[0_0_8px_#30cf43]" data-v-7e82e131></div><span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" data-v-7e82e131>Ghost-Node Active</span></div><span class="text-[10px] font-mono text-zinc-600 italic-none" data-v-7e82e131>v3.0.4-LITE</span></footer></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(authentication)/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e82e131"]]);

export { login as default };
//# sourceMappingURL=login-XTAb6kmj.mjs.map
