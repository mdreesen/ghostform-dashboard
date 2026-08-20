import { u as useHead, K as useNuxtData, b as useFetch, _ as __nuxt_component_0$1, c as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useToast } from './useToast-LG3isBA-.mjs';
import '../nitro/nitro.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "GhostForm | Social posts",
      meta: [{ name: "description", content: "Post drafts written in your voice." }]
    });
    const { data: user } = useNuxtData("user");
    useToast();
    const platform = ref("facebook");
    const topic = ref("open_house");
    const details = ref("");
    const generating = ref(false);
    const drafts = ref([]);
    const source = ref(null);
    const savingId = ref(null);
    const copiedIdx = ref(null);
    const { data: queue, refresh: refreshQueue } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/social",
      {
        key: "social",
        lazy: true
      },
      "$wYn8wV-nc8"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const topics = [
      { value: "open_house", label: "Open house this weekend" },
      { value: "just_listed", label: "New listing" },
      { value: "just_sold", label: "Just sold / closed" },
      { value: "market_note", label: "Local market note" },
      { value: "tip", label: "Advice for buyers or sellers" },
      { value: "personal", label: "Something personal / local" },
      { value: "testimonial", label: "Client thank-you" }
    ];
    const platforms = [
      { value: "facebook", label: "Facebook" },
      { value: "instagram", label: "Instagram" },
      { value: "x", label: "X" }
    ];
    const voiceSet = computed(() => {
      const v = user.value?.voice;
      return Boolean(v?.about || v?.samples || v?.focus);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ClientOnly = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1100px] mx-auto" }, _attrs))}><header class="mb-16 pt-4"><p class="gf-eyebrow mb-5 gf-rise" style="${ssrRenderStyle({ "--d": ".05s" })}">Social</p><h1 class="gf-display text-[clamp(34px,4.6vw,58px)] max-w-[16ch] mb-4 gf-rise" style="${ssrRenderStyle({ "--d": ".12s" })}"> Posts written the way you talk. </h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[50ch] gf-rise" style="${ssrRenderStyle({ "--d": ".2s" })}"> Pick what you want to post about. Edit anything that doesn&#39;t sound like you, then copy it across. </p></header>`);
      if (!unref(voiceSet)) {
        _push(`<section class="gf-depth mb-16"><div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7 flex flex-col sm:flex-row sm:items-center gap-5 justify-between"><div><p class="font-display text-[18px] font-semibold mb-1.5">Tell it how you talk first</p><p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[52ch]"> Two minutes of setup is the difference between posts that sound like you and posts that sound like every other agent&#39;s feed. </p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/profile#voice",
          class: "shrink-0 px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Set up my voice `);
            } else {
              return [
                createTextVNode(" Set up my voice ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">01 — Write</span><span class="font-display text-[25px] font-semibold tracking-tight">What&#39;s this about?</span></div><div class="grid lg:grid-cols-3 gap-6 mb-8"><div><label class="gf-eyebrow block mb-3">Where it&#39;s going</label><div class="flex gap-2"><!--[-->`);
      ssrRenderList(platforms, (p) => {
        _push(`<button class="${ssrRenderClass([unref(platform) === p.value ? "bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]" : "border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]", "flex-1 py-3 text-[11px] uppercase tracking-[0.1em] border transition-colors"])}">${ssrInterpolate(p.label)}</button>`);
      });
      _push(`<!--]--></div></div><div><label class="gf-eyebrow block mb-3">Topic</label><select class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A] transition-colors"><!--[-->`);
      ssrRenderList(topics, (t) => {
        _push(`<option${ssrRenderAttr("value", t.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(topic)) ? ssrLooseContain(unref(topic), t.value) : ssrLooseEqual(unref(topic), t.value)) ? " selected" : ""}>${ssrInterpolate(t.label)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="gf-eyebrow block mb-3">Anything specific? (optional)</label><input${ssrRenderAttr("value", unref(details))} placeholder="Saturday 11–1, the cabin on Whitefish Stage" class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3 text-[15px] focus:outline-none focus:border-[#B5563A] transition-colors"></div></div><button${ssrIncludeBooleanAttr(unref(generating)) ? " disabled" : ""} class="px-7 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40">${ssrInterpolate(unref(generating) ? "Writing…" : "Write me 3 posts")}</button>`);
      if (unref(drafts).length) {
        _push(`<div class="mt-10 space-y-5">`);
        if (unref(source) === "template") {
          _push(`<p class="text-[12.5px] text-[#A9A39A]"> Written from a template — add an AI key for posts tailored to your voice. </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(drafts), (d, i) => {
          _push(`<div class="border border-[#DDD6C9] bg-[#EFEAE0] p-6"><textarea${ssrRenderAttr("rows", unref(platform) === "x" ? 3 : 6)} class="w-full bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[15px] leading-relaxed resize-none focus:outline-none focus:border-[#B5563A]">${ssrInterpolate(d.edited)}</textarea><div class="flex flex-wrap items-center justify-between gap-4 mt-3"><div class="text-[12px] text-[#A9A39A] space-y-1">`);
          if (d.hashtags) {
            _push(`<p>${ssrInterpolate(d.hashtags)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (d.imageIdea) {
            _push(`<p>Photo: ${ssrInterpolate(d.imageIdea)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(platform) === "x") {
            _push(`<p class="${ssrRenderClass((d.edited?.length ?? 0) > 260 ? "text-[#B5563A]" : "")}">${ssrInterpolate(d.edited?.length ?? 0)} / 260 characters </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex gap-2.5"><button class="px-5 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors">${ssrInterpolate(unref(copiedIdx) === i ? "Copied" : "Copy")}</button><button class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] transition-colors"> Keep it </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">02 — Image</span><span class="font-display text-[25px] font-semibold tracking-tight">Make something to post with it</span></div><p class="text-[14.5px] text-[#8A847C] leading-relaxed max-w-[62ch] mb-9"> For listings and sold posts, use your own photos — nothing beats the real house. These are for the posts you can&#39;t photograph: market notes, advice, open house announcements. </p>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">03 — Ready</span><span class="font-display text-[25px] font-semibold tracking-tight">Approved and waiting</span><span class="text-[13px] text-[#A9A39A] tabular-nums">${ssrInterpolate(unref(queue)?.approved?.length ?? 0)}</span></div>`);
      if (unref(queue)?.approved?.length) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(queue).approved, (post) => {
          _push(`<div class="border border-[#DDD6C9] p-6 flex flex-col lg:flex-row lg:items-start gap-6 justify-between"><div class="min-w-0 flex-1"><p class="gf-eyebrow mb-2.5">${ssrInterpolate(post.platform)}</p><p class="text-[15px] leading-relaxed whitespace-pre-line">${ssrInterpolate(post.body)}</p>`);
          if (post.hashtags) {
            _push(`<p class="text-[13px] text-[#A9A39A] mt-2.5">${ssrInterpolate(post.hashtags)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex gap-2.5 shrink-0"><button class="px-5 py-2.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors">${ssrInterpolate(post.platform === "x" ? "Open in X" : "Copy & open")}</button><button${ssrIncludeBooleanAttr(unref(savingId) === post._id) ? " disabled" : ""} class="px-5 py-2.5 border border-[#5A6349] text-[11px] uppercase tracking-[0.1em] text-[#5A6349] hover:bg-[#5A6349] hover:text-[#F7F4EF] transition-colors disabled:opacity-40"> Posted </button></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="border-t border-b border-[#DDD6C9] py-14 text-center"><p class="text-[14px] text-[#8A847C]"> Nothing queued yet. Write a few above and keep the ones you like. </p></div>`);
      }
      _push(`</section>`);
      if (unref(queue)?.posted?.length) {
        _push(`<section class="gf-depth"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">04 — History</span><span class="font-display text-[25px] font-semibold tracking-tight">Already posted</span></div><div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(queue).posted, (post) => {
          _push(`<div class="border-t border-[#DDD6C9] pt-4 flex items-start gap-5 justify-between"><p class="text-[14px] text-[#8A847C] leading-relaxed line-clamp-2 flex-1">${ssrInterpolate(post.body)}</p><span class="text-[11px] uppercase tracking-[0.14em] text-[#A9A39A] shrink-0">${ssrInterpolate(post.platform)}</span></div>`);
        });
        _push(`<!--]--></div></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/social/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-rpNUmlcf.mjs.map
