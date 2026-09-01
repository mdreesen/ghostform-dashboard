import { a as useRoute, b as useFetch, u as useHead, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1, a as __nuxt_component_2 } from './DocumentList-BbWnJgAI.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import '../nitro/nitro.mjs';
import 'mongoose';
import 'node:crypto';
import 'openai';
import 'resend';
import 'node:http';
import 'node:https';
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
import 'unhead/plugins';
import 'unhead/utils';

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
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_appDocumentUpload = __nuxt_component_1;
      const _component_appDocumentList = __nuxt_component_2;
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
        _push(`<div class="text-[14px] text-[#8A847C]">Loading…</div>`);
      } else if (unref(home)) {
        _push(`<div class="flex flex-wrap items-start justify-between gap-5"><div class="min-w-0"><h1 class="font-display text-[clamp(28px,4vw,42px)] leading-[1.12] tracking-tight mb-2">${ssrInterpolate(unref(home).name || unref(home).address)}</h1>`);
        if (unref(home).name && unref(home).address) {
          _push(`<p class="text-[15px] text-[#8A847C]">${ssrInterpolate(unref(home).address)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-2"><!--[-->`);
        ssrRenderList(["active", "pending", "sold"], (s) => {
          _push(`<button class="${ssrRenderClass([unref(form).status === s ? "border-[#1F1B16] text-[#1F1B16]" : "border-[#DDD6C9] text-[#A9A39A] hover:border-[#8A847C]", "px-3.5 py-2 text-[11px] uppercase tracking-[0.1em] border transition-colors"])}"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(STATUS_LABEL[s])}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
      if (unref(home)) {
        _push(`<!--[--><section class="mb-14"><div class="flex items-baseline justify-between mb-5"><p class="gf-eyebrow">Details</p><button class="text-[12.5px] text-[#8A847C] hover:text-[#1F1B16]">${ssrInterpolate(unref(editing) ? "Cancel" : "Edit")}</button></div>`);
        if (!unref(editing)) {
          _push(`<div class="border-t border-[#DDD6C9]"><!--[-->`);
          ssrRenderList([
            { k: "Address", v: unref(home).address },
            { k: "Owner", v: unref(home).owner },
            { k: "Notes", v: unref(home).notes }
          ], (row) => {
            _push(`<div class="grid gap-4 py-4 border-b border-[#DDD6C9]" style="${ssrRenderStyle({ "grid-template-columns": "140px 1fr" })}"><p class="text-[12.5px] uppercase tracking-[0.1em] text-[#A9A39A]">${ssrInterpolate(row.k)}</p><p class="text-[14.5px] leading-relaxed whitespace-pre-line">${ssrInterpolate(row.v || "—")}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="space-y-5"><div class="grid sm:grid-cols-2 gap-5"><div><label class="block text-[12.5px] text-[#8A847C] mb-2">Name</label><input${ssrRenderAttr("value", unref(form).name)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-[#B5563A]"></div><div><label class="block text-[12.5px] text-[#8A847C] mb-2">Owner</label><input${ssrRenderAttr("value", unref(form).owner)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-[#B5563A]"></div></div><div><label class="block text-[12.5px] text-[#8A847C] mb-2">Address</label><input${ssrRenderAttr("value", unref(form).address)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-[#B5563A]"></div><div><label class="block text-[12.5px] text-[#8A847C] mb-2">Notes</label><textarea rows="4" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-3.5 py-2.5 text-[14.5px] resize-none focus:outline-none focus:border-[#B5563A]">${ssrInterpolate(unref(form).notes)}</textarea></div><button class="px-6 py-3 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] disabled:opacity-40"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(unref(saving) ? "Saving…" : "Save changes")}</button></div>`);
        }
        _push(`</section><section class="mb-14"><p class="gf-eyebrow mb-2">Documents</p><p class="text-[13.5px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> Contracts, inspections, disclosures. We&#39;ll pull out the dates that matter and you confirm each one before it becomes a reminder. </p>`);
        _push(ssrRenderComponent(_component_appDocumentUpload, {
          "home-id": unref(id),
          class: "mb-2"
        }, null, _parent));
        _push(ssrRenderComponent(_component_appDocumentList, { "home-id": unref(id) }, null, _parent));
        _push(`</section><section class="mb-14"><p class="gf-eyebrow mb-2">Interested</p><p class="text-[13.5px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> Anyone who enquired about this property, including open-house sign-ins. </p>`);
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
                  _push2(`<div class="min-w-0"${_scopeId}><p class="text-[15px] font-semibold truncate"${_scopeId}>${ssrInterpolate(lead.name || lead.email)}</p><p class="text-[12.5px] text-[#8A847C] truncate"${_scopeId}>${ssrInterpolate(lead.email)} `);
                  if (lead.phone) {
                    _push2(`<!--[--> · ${ssrInterpolate(lead.phone)}<!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</p></div><span class="text-[11px] uppercase tracking-[0.1em] text-[#A9A39A] shrink-0"${_scopeId}>${ssrInterpolate(lead.status || "new")}</span>`);
                } else {
                  return [
                    createVNode("div", { class: "min-w-0" }, [
                      createVNode("p", { class: "text-[15px] font-semibold truncate" }, toDisplayString(lead.name || lead.email), 1),
                      createVNode("p", { class: "text-[12.5px] text-[#8A847C] truncate" }, [
                        createTextVNode(toDisplayString(lead.email) + " ", 1),
                        lead.phone ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(" · " + toDisplayString(lead.phone), 1)
                        ], 64)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("span", { class: "text-[11px] uppercase tracking-[0.1em] text-[#A9A39A] shrink-0" }, toDisplayString(lead.status || "new"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-[13.5px] text-[#8A847C] py-4"> Nobody yet. Leads captured at this address will show up here. </p>`);
        }
        _push(`</section><section class="pb-16"><p class="gf-eyebrow mb-5">Marketing</p><div class="flex flex-wrap gap-2.5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/forms",
          class: "px-5 py-3 border border-[#B5563A] text-[#B5563A] text-[11px] uppercase tracking-[0.1em] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors"
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

export { _sfc_main as default };
//# sourceMappingURL=index-BxA4xZRN.mjs.map
