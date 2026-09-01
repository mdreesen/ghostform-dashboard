import { b as useRoute, a as useToast, u as useHead, _ as __nuxt_component_0 } from "../server.mjs";
import { u as useVoiceInput, _ as __nuxt_component_1 } from "./VoiceCapture-DHH8Pf3F.js";
import { defineComponent, ref, watch, unref, useSSRContext, withAsyncContext, computed, reactive, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as __nuxt_component_3, a as __nuxt_component_4 } from "./DocumentList-kS4d7UQC.js";
import { u as useFetch } from "./fetch-M6ewPHCZ.js";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "tailwindcss/colors";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/nuxt/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "ohash/utils";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "@vue/shared";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AskDocuments",
  __ssrInlineRender: true,
  props: {
    homeId: {},
    leadId: {}
  },
  setup(__props) {
    const question = ref("");
    const answer = ref("");
    const asking = ref(false);
    const error = ref("");
    const { supported, listening, displayText, error: voiceError, reset } = useVoiceInput();
    let base = "";
    watch(listening, (on) => {
      if (on) {
        base = question.value;
        reset();
      }
    });
    watch(displayText, (t) => {
      if (listening.value && t) question.value = [base, t].filter(Boolean).join(" ").trim();
    });
    const EXAMPLES = [
      "When's the inspection deadline?",
      "What still needs doing this week?",
      "Has the earnest money been paid?"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-baseline justify-between gap-3 mb-2"><p class="gf-eyebrow">Ask about these documents</p>`);
      if (unref(supported)) {
        _push(`<button type="button" class="${ssrRenderClass([unref(listening) ? "text-[#B5563A]" : "text-[#A9A39A] hover:text-[#1F1B16]", "flex items-center gap-1.5 gf-label transition-colors"])}"><svg width="12" height="12" viewBox="0 0 24 24"${ssrRenderAttr("fill", unref(listening) ? "currentColor" : "none")} stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none"></path></svg> ${ssrInterpolate(unref(listening) ? "Listening" : "Speak")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex gap-2"><input${ssrRenderAttr("value", unref(question))} class="${ssrRenderClass([unref(listening) ? "border-[#B5563A]" : "border-[#DDD6C9] focus:border-[#B5563A]", "flex-1 bg-[#F7F4EF] border px-3.5 py-2.5 gf-body focus:outline-none transition-colors"])}" placeholder="When&#39;s the inspection deadline?"><button class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40 whitespace-nowrap"${ssrIncludeBooleanAttr(unref(asking) || unref(question).trim().length < 3) ? " disabled" : ""}>${ssrInterpolate(unref(asking) ? "Checking…" : "Ask")}</button></div>`);
      if (unref(voiceError)) {
        _push(`<p class="gf-label text-[#B5563A] mt-1.5">${ssrInterpolate(unref(voiceError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(answer) && !unref(asking)) {
        _push(`<div class="flex flex-wrap gap-1.5 mt-2.5"><!--[-->`);
        ssrRenderList(EXAMPLES, (ex) => {
          _push(`<button class="gf-label gf-muted border border-[#DDD6C9] px-2.5 py-1 hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors">${ssrInterpolate(ex)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(answer)) {
        _push(`<div class="mt-4 p-4 bg-[#EFEAE0] border-l-2 border-[#B5563A]"><p class="gf-body leading-relaxed">${ssrInterpolate(unref(answer))}</p><p class="gf-label gf-muted mt-2.5"> From what&#39;s been extracted and confirmed — open the document to check anything critical. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<p class="gf-meta text-[#B5563A] mt-3">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/AskDocuments.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AppAskDocuments" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = route.params.id;
    useToast();
    const { data, refresh, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/homes/${id}`,
      {
        key: `home-${id}`,
        // Client-only for the same reason: no cookie during SSR means a 404/401 on
        // hard reload, and the property page would render as 'not found'.
        server: false,
        lazy: true
      },
      "$pOZ9al6RKa"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const home = computed(() => data.value?.home ?? null);
    const leads = computed(() => data.value?.leads ?? []);
    useHead({ title: () => `GhostForm | ${home.value?.name || home.value?.address || "Property"}` });
    const STATUS_LABEL = {
      active: "Active",
      pending: "Pending",
      sold: "Sold"
    };
    const saving = ref(false);
    const editing = ref(false);
    const form = reactive({ name: "", address: "", owner: "", notes: "", status: "active" });
    watch(home, (h) => {
      if (!h) return;
      form.name = h.name ?? "";
      form.address = h.address ?? "";
      form.owner = h.owner ?? "";
      form.notes = h.notes ?? "";
      form.status = h.status ?? "active";
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_appVoiceCapture = __nuxt_component_1;
      const _component_appAskDocuments = __nuxt_component_2;
      const _component_appDocumentUpload = __nuxt_component_3;
      const _component_appDocumentList = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto" }, _attrs))}><header class="pt-4 mb-12">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/home",
        class: "gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Properties `);
          } else {
            return [
              createTextVNode(" ← Properties ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(pending) && !unref(home)) {
        _push(`<div class="gf-body text-[#8A847C]">Loading…</div>`);
      } else if (unref(home)) {
        _push(`<div class="flex flex-wrap items-start justify-between gap-5"><div class="min-w-0"><h1 class="font-display text-[clamp(28px,4vw,42px)] leading-[1.12] tracking-tight mb-2">${ssrInterpolate(unref(home).name || unref(home).address)}</h1>`);
        if (unref(home).name && unref(home).address) {
          _push(`<p class="gf-body text-[#8A847C]">${ssrInterpolate(unref(home).address)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-2"><!--[-->`);
        ssrRenderList(["active", "pending", "sold"], (s) => {
          _push(`<button class="${ssrRenderClass([unref(form).status === s ? "border-[#1F1B16] text-[#1F1B16]" : "border-[#DDD6C9] text-[#A9A39A] hover:border-[#8A847C]", "px-3.5 py-2 gf-label uppercase tracking-[0.1em] border transition-colors"])}"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(STATUS_LABEL[s])}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (unref(home)) {
        _push(`<!--[--><section class="mb-14"><div class="flex items-baseline justify-between mb-5"><p class="gf-eyebrow">Details</p><button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]">${ssrInterpolate(unref(editing) ? "Cancel" : "Edit")}</button></div>`);
        if (!unref(editing)) {
          _push(`<div class="border-t border-[#DDD6C9]"><!--[-->`);
          ssrRenderList([
            { k: "Address", v: unref(home).address },
            { k: "Owner", v: unref(home).owner },
            { k: "Notes", v: unref(home).notes }
          ], (row) => {
            _push(`<div class="grid gap-4 py-4 border-b border-[#DDD6C9]" style="${ssrRenderStyle({ "grid-template-columns": "140px 1fr" })}"><p class="gf-meta uppercase tracking-[0.1em] text-[#A9A39A]">${ssrInterpolate(row.k)}</p><p class="gf-body leading-relaxed whitespace-pre-line">${ssrInterpolate(row.v || "—")}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="space-y-5"><div class="grid sm:grid-cols-2 gap-5"><div><label class="block gf-meta text-[#8A847C] mb-2">Name</label><input${ssrRenderAttr("value", unref(form).name)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#B5563A]"></div><div><label class="block gf-meta text-[#8A847C] mb-2">Owner</label><input${ssrRenderAttr("value", unref(form).owner)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#B5563A]"></div></div><div><label class="block gf-meta text-[#8A847C] mb-2">Address</label><input${ssrRenderAttr("value", unref(form).address)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body focus:outline-none focus:border-[#B5563A]"></div><div><label class="block gf-meta text-[#8A847C] mb-2">Notes</label><textarea rows="4" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 gf-body resize-none focus:outline-none focus:border-[#B5563A]">${ssrInterpolate(unref(form).notes)}</textarea></div><button class="px-6 py-3 bg-[#B5563A] text-[#F7F4EF] gf-label uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] disabled:opacity-40"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(unref(saving) ? "Saving…" : "Save changes")}</button></div>`);
        }
        _push(`</section><section class="mb-14"><p class="gf-eyebrow mb-2">Documents</p><p class="gf-meta text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> Contracts, inspections, disclosures. We&#39;ll pull out the dates that matter and you confirm each one before it becomes a reminder. </p><div class="mb-6">`);
        _push(ssrRenderComponent(_component_appVoiceCapture, { "home-id": unref(id) }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_appAskDocuments, {
          "home-id": unref(id),
          class: "mb-8"
        }, null, _parent));
        _push(ssrRenderComponent(_component_appDocumentUpload, {
          "home-id": unref(id),
          class: "mb-2"
        }, null, _parent));
        _push(ssrRenderComponent(_component_appDocumentList, { "home-id": unref(id) }, null, _parent));
        _push(`</section><section class="mb-14"><p class="gf-eyebrow mb-2">Interested</p><p class="gf-meta text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> Anyone who enquired about this property, including open-house sign-ins. </p>`);
        if (unref(leads).length) {
          _push(`<div class="border-t border-[#DDD6C9]"><!--[-->`);
          ssrRenderList(unref(leads), (lead) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: lead._id,
              to: `/dashboard/leads/${lead._id}/details`,
              class: "flex items-center justify-between gap-4 py-4 border-b border-[#DDD6C9] hover:bg-[#DDD6C9]/25 transition-colors px-1.5"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="min-w-0"${_scopeId}><p class="gf-body font-semibold truncate"${_scopeId}>${ssrInterpolate(lead.name || lead.email)}</p><p class="gf-meta text-[#8A847C] truncate"${_scopeId}>${ssrInterpolate(lead.email)} `);
                  if (lead.phone) {
                    _push2(`<!--[--> · ${ssrInterpolate(lead.phone)}<!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</p></div><span class="gf-label uppercase tracking-[0.1em] text-[#A9A39A] shrink-0"${_scopeId}>${ssrInterpolate(lead.status || "new")}</span>`);
                } else {
                  return [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("p", { class: "gf-body font-semibold truncate" }, toDisplayString(lead.name || lead.email), 1),
                      createVNode("p", { class: "gf-meta text-[#8A847C] truncate" }, [
                        createTextVNode(toDisplayString(lead.email) + " ", 1),
                        lead.phone ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(" · " + toDisplayString(lead.phone), 1)
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("span", { class: "gf-label uppercase tracking-[0.1em] text-[#A9A39A] shrink-0" }, toDisplayString(lead.status || "new"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="gf-meta text-[#8A847C] py-4"> Nobody yet. Leads captured at this address will show up here. </p>`);
        }
        _push(`</section><section class="pb-16"><p class="gf-eyebrow mb-5">Marketing</p><div class="flex flex-wrap gap-2.5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/forms",
          class: "px-5 py-3 border border-[#B5563A] text-[#B5563A] gf-label uppercase tracking-[0.1em] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Make a QR code `);
            } else {
              return [
                createTextVNode(" Make a QR code ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/home/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-D4qh0bXp.js.map
