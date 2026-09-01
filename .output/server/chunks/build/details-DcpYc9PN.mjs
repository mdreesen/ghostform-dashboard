import { a as useRoute, b as useFetch, u as useHead, _ as __nuxt_component_0$1, c as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './Navigate-B_PGVHvu.mjs';
import { defineComponent, withAsyncContext, ref, computed, unref, withCtx, createTextVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderList, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_1$2, a as __nuxt_component_2 } from './DocumentList-BbWnJgAI.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Message",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    },
    communication_type: {
      type: String,
      required: true
    },
    message_type: {
      type: String,
      default: "sms",
      required: true
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: `${__props.message_type}:${__props.communication_type}`,
        class: "text-[#B5563A] hover:text-[#8f4229] underline font-medium"
      }, _attrs))}><span>${__props.label ?? ""}</span></a>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/Message.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "BaseMessage" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "maps",
  __ssrInlineRender: true,
  props: {
    address: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col" }, _attrs))}><a${ssrRenderAttr("href", `https://maps.google.com/?q=${encodeURIComponent(__props.address)}`)} target="_blank" rel="noopener noreferrer" class="text-[#B5563A] hover:text-[#8f4229] underline font-medium"><span>${ssrInterpolate(__props.address)}</span></a></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/maps.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "BaseMaps" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "details",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useToast();
    const { data, pending: pending_data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/leads/${route.params.id}`,
      "$VHUveJw_Rm"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const lead = ref(data.value);
    useHead({ title: () => `GhostForm | ${lead.value?.name || "Lead"}` });
    const marking = ref(false);
    const sendingQuestionnaire = ref(false);
    const analysing = ref(false);
    const qual = computed(() => lead.value?.qualification || {});
    const analysis = computed(() => lead.value?.ai_analysis);
    const answeredCount = computed(
      () => Object.values(qual.value?.answers || {}).filter((v) => String(v ?? "").trim()).length
    );
    const qualificationAnswer = (key) => lead.value?.qualification?.answers?.[key];
    const intent = ref(
      String(lead.value?.buy_sell_both || "").toLowerCase().includes("sell") ? "sell" : "buy"
    );
    const lastContact = computed(() => {
      const raw = lead.value?.lastContactedAt;
      if (!raw) return "Never contacted";
      const days = Math.floor((Date.now() - new Date(raw).getTime()) / 864e5);
      if (days <= 0) return "Contacted today";
      if (days === 1) return "Contacted 1 day ago";
      return `Contacted ${days} days ago`;
    });
    const money = (n) => n && n > 0 ? `$${n.toLocaleString("en-US")}` : null;
    const facts = computed(() => {
      const l = lead.value || {};
      return [
        { label: "Est. value", value: money(l.price) },
        { label: "Budget", value: money(l.budget) },
        { label: "Square footage", value: l.sqft ? `${l.sqft} ft²` : null },
        { label: "Bedrooms", value: l.bedrooms || null },
        { label: "Bathrooms", value: l.bathrooms || null },
        { label: "Intent", value: l.buy_sell_both || null },
        { label: "Timeline", value: l.want_to_move || null },
        { label: "Working with an agent", value: l.seeing_an_agent || null },
        { label: "Source", value: l.source || null },
        { label: "Aquired at", value: l.seen_at || null }
      ].filter((f) => f.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ClientOnly = __nuxt_component_1$1;
      const _component_baseButtonNavigate = __nuxt_component_1;
      const _component_baseMessage = __nuxt_component_3;
      const _component_baseMaps = __nuxt_component_4;
      const _component_appDocumentUpload = __nuxt_component_1$2;
      const _component_appDocumentList = __nuxt_component_2;
      _push(`<!--[-->`);
      if (!unref(pending_data)) {
        _push(`<div class="max-w-[1100px] mx-auto"><header class="mb-16 pt-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/leads",
          class: "gf-eyebrow inline-block mb-6 hover:text-[#B5563A] transition-colors gf-rise",
          style: { "--d": ".04s" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← All leads `);
            } else {
              return [
                createTextVNode(" ← All leads ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6"><div class="gf-rise" style="${ssrRenderStyle({ "--d": ".1s" })}"><h1 class="gf-display text-[clamp(34px,4.4vw,54px)] mb-3">${ssrInterpolate(unref(lead)?.name || "Unnamed lead")}</h1><div class="flex flex-wrap items-center gap-3 text-[13px] text-[#8A847C]"><span class="inline-flex items-center gap-2"><span class="w-[7px] h-[7px] bg-[#B5563A]"></span><span class="uppercase tracking-[0.14em] text-[10.5px]">${ssrInterpolate(unref(lead)?.status)}</span></span><span class="text-[#DDD6C9]">·</span><span>${ssrInterpolate(unref(lastContact))}</span></div></div><div class="flex gap-2.5 gf-rise shrink-0" style="${ssrRenderStyle({ "--d": ".18s" })}">`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`<button${ssrIncludeBooleanAttr(unref(marking)) ? " disabled" : ""} class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#B5563A] text-[#B5563A] hover:bg-[#B5563A] hover:text-[#F7F4EF] transition-colors disabled:opacity-40">${ssrInterpolate(unref(marking) ? "Saving…" : "Contacted")}</button>`);
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          text: "Edit",
          path: `/dashboard/leads/${unref(route).params.id}/edit`
        }, null, _parent));
        _push(`</div></div></header><section class="gf-depth mb-20"><div class="flex flex-col items-baseline gap-4 pb-3.5 mb-8">`);
        if (unref(lead).qualification && unref(lead).qualification?.answers) {
          _push(`<div class="flex flex-col gap-4"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">Qualifying</span><span class="font-display text-[25px] font-semibold tracking-tight">How serious are they?</span></div><div class="flex flex-col"><span class="gf-eyebrow">Lead is looking to ${ssrInterpolate(unref(lead).qualification.intent)}</span><span class="font-display text-[25px] font-semibold tracking-tight">Qualifying Details</span></div><div>`);
          if (unref(lead).qualification.intent === "buy") {
            _push(`<div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Time Line</span><span>${ssrInterpolate(qualificationAnswer("q_timeline"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Financing</span><span>${ssrInterpolate(qualificationAnswer("q_financing"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Lender</span><span>${ssrInterpolate(qualificationAnswer("q_lender"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Budget</span><span>${ssrInterpolate(qualificationAnswer("q_budget_max"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Must Haves</span><span>${ssrInterpolate(qualificationAnswer("q_must_haves"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Deal Breakers</span><span>${ssrInterpolate(qualificationAnswer("q_deal_breakers"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Current Situation</span><span>${ssrInterpolate(qualificationAnswer("q_current_situation"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Areas they are considering</span><span>${ssrInterpolate(qualificationAnswer("q_areas"))}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(lead).qualification.intent === "sell") {
            _push(`<div class="flex flex-col gap-2"><div><span class="text-[18px] font-semibold tracking-tight pr-2">Time Line</span><span>${ssrInterpolate(qualificationAnswer("q_timeline"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Reason</span><span>${ssrInterpolate(qualificationAnswer("q_reason"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Price Expectation</span><span>${ssrInterpolate(qualificationAnswer("q_price_expectation"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Price Basis</span><span>${ssrInterpolate(qualificationAnswer("q_price_basis"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Mortage</span><span>${ssrInterpolate(`$${qualificationAnswer("q_mortgage")}`)}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Conditions</span><span>${ssrInterpolate(qualificationAnswer("q_condition"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Improvements Done</span><span>${ssrInterpolate(qualificationAnswer("q_improvements"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Listed Before</span><span>${ssrInterpolate(qualificationAnswer("q_listed_before"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Also Buying</span><span>${ssrInterpolate(qualificationAnswer("q_buying_too"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Flexibility</span><span>${ssrInterpolate(qualificationAnswer("q_flexibility"))}</span></div><div><span class="text-[18px] font-semibold tracking-tight pr-2">Decision</span><span>${ssrInterpolate(qualificationAnswer("q_decision"))}</span></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-wrap items-center gap-3"><button${ssrIncludeBooleanAttr(unref(analysing)) ? " disabled" : ""} class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors disabled:opacity-40">${ssrInterpolate(unref(analysing) ? "Thinking…" : unref(analysis) ? "Re-run analysis" : "Run analysis")}</button>`);
          if (unref(analysis)?.source === "scorecard-only") {
            _push(`<p class="text-[12.5px] text-[#A9A39A]"> Scorecard only — add an AI key for the written read. </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(lead).qualification?.sentAt && !unref(lead).qualification.answers) {
          _push(`<div class="flex flex-col gap-2"><span class="gf-eyebrow">Sent detailed questions</span><span class="font-display text-[25px] font-semibold tracking-tight">Awaiting detailed response</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!unref(qual).sentAt && !unref(qual).completedAt) {
          _push(`<div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7"><p class="font-display text-[18px] mb-2">Send them the deep-dive questions</p><p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> About twelve questions — timeline, financing, what would rule a house out. Takes them five minutes and gives you enough to actually read the situation before your next call. </p><div class="flex flex-wrap items-center gap-3"><select class="bg-[#F7F4EF] border border-[#DDD6C9] px-4 py-3.5 text-[14px] focus:outline-none focus:border-[#B5563A]"><option value="buy"${ssrIncludeBooleanAttr(Array.isArray(unref(intent)) ? ssrLooseContain(unref(intent), "buy") : ssrLooseEqual(unref(intent), "buy")) ? " selected" : ""}>Buyer questions</option><option value="sell"${ssrIncludeBooleanAttr(Array.isArray(unref(intent)) ? ssrLooseContain(unref(intent), "sell") : ssrLooseEqual(unref(intent), "sell")) ? " selected" : ""}>Seller questions</option></select><button${ssrIncludeBooleanAttr(unref(sendingQuestionnaire) || !unref(lead)?.email) ? " disabled" : ""} class="px-6 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">${ssrInterpolate(unref(sendingQuestionnaire) ? "Sending…" : "Send questionnaire")}</button></div>`);
          if (!unref(lead)?.email) {
            _push(`<p class="text-[12.5px] text-[#B5563A] mt-3"> This lead has no email address, so there&#39;s nowhere to send it. </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else if (unref(qual).sentAt && !unref(qual).completedAt) {
          _push(`<div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7"><p class="font-display text-[18px] mb-2">Sent — waiting on their answers</p><p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[56ch] mb-6"> They haven&#39;t finished it yet. Worth a mention next time you speak — it&#39;s the fastest way to make your next conversation useful. </p><button${ssrIncludeBooleanAttr(unref(sendingQuestionnaire)) ? " disabled" : ""} class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors disabled:opacity-40">${ssrInterpolate(unref(sendingQuestionnaire) ? "Sending…" : "Send it again")}</button></div>`);
        } else {
          _push(`<div>`);
          if (unref(analysis)) {
            _push(`<div class="grid sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9] mb-8"><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Readiness</p><p class="font-display text-[42px] font-semibold leading-none tabular-nums">${ssrInterpolate(unref(analysis).scorecard.readiness)}<span class="text-[18px] text-[#A9A39A]">/100</span></p><p class="text-[13px] text-[#8A847C] mt-2">${ssrInterpolate(unref(analysis).scorecard.readinessLabel)}</p></div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Financing</p><p class="${ssrRenderClass([unref(analysis).scorecard.financingRisk === "high" ? "text-[#B5563A]" : "", "font-display text-[26px] font-semibold capitalize"])}">${ssrInterpolate(unref(analysis).scorecard.financingRisk)}</p><p class="text-[13px] text-[#8A847C] mt-2">${ssrInterpolate(unref(analysis).scorecard.financingRisk === "high" ? "Most likely thing to stall this" : unref(analysis).scorecard.financingRisk === "low" ? "Not a concern" : "Worth confirming")}</p></div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Answered</p><p class="font-display text-[42px] font-semibold leading-none tabular-nums">${ssrInterpolate(unref(answeredCount))}</p><p class="text-[13px] text-[#8A847C] mt-2">questions completed</p></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(analysis)?.read) {
            _push(`<div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7 mb-6"><p class="gf-eyebrow mb-3">The read</p><p class="text-[15px] leading-[1.75] max-w-[70ch]">${ssrInterpolate(unref(analysis).read)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="grid sm:grid-cols-2 gap-6 mb-6">`);
          if (unref(analysis)?.scorecard?.signals?.length) {
            _push(`<div><p class="gf-eyebrow mb-3">What stands out</p><ul class="space-y-2.5"><!--[-->`);
            ssrRenderList(unref(analysis)?.scorecard.signals, (s) => {
              _push(`<li class="flex gap-3 text-[13.5px] leading-relaxed"><span class="w-1.5 h-1.5 bg-[#B5563A] mt-2 shrink-0"></span><span>${ssrInterpolate(s)}</span></li>`);
            });
            _push(`<!--]--></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(analysis)?.scorecard?.gaps?.length) {
            _push(`<div><p class="gf-eyebrow mb-3">Still unknown</p><ul class="space-y-2.5"><!--[-->`);
            ssrRenderList(unref(analysis)?.scorecard.gaps, (g) => {
              _push(`<li class="flex gap-3 text-[13.5px] leading-relaxed text-[#8A847C]"><span class="w-1.5 h-1.5 border border-[#A9A39A] mt-2 shrink-0"></span><span>${ssrInterpolate(g)}</span></li>`);
            });
            _push(`<!--]--></ul></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (unref(analysis)?.nextSteps?.length) {
            _push(`<div class="border-t border-[#DDD6C9] pt-6 mb-6"><p class="gf-eyebrow mb-4">Do this next</p><ol class="space-y-3"><!--[-->`);
            ssrRenderList(unref(analysis).nextSteps, (n, i) => {
              _push(`<li class="flex gap-4 text-[14.5px] leading-relaxed"><span class="font-display text-[13px] text-[#B5563A] border border-[#B5563A] w-6 h-6 flex items-center justify-center shrink-0">${ssrInterpolate(Number(i) + 1)}</span><span>${ssrInterpolate(n)}</span></li>`);
            });
            _push(`<!--]--></ol></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</section><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">01 — Contact</span><span class="font-display text-[25px] font-semibold tracking-tight">How to reach them</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9]"><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Email</p>`);
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.email,
          message_type: "mailto",
          communication_type: "email"
        }, null, _parent));
        _push(`</div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Phone</p>`);
        _push(ssrRenderComponent(_component_baseMessage, {
          label: unref(lead)?.phone,
          message_type: "sms",
          communication_type: "phone"
        }, null, _parent));
        _push(`</div><div class="bg-[#F7F4EF] p-7"><p class="gf-eyebrow mb-3">Prefers</p><p class="text-[15px]">${ssrInterpolate(unref(lead)?.best_communication_method || "Not specified")}</p></div></div></section><section class="gf-depth mb-20"><div class="flex items-baseline gap-4 border-b border-[#DDD6C9] pb-3.5 mb-8"><span class="gf-eyebrow">02 — Submission</span><span class="font-display text-[25px] font-semibold tracking-tight">What they told you</span></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-10"><div class="lg:col-span-7">`);
        if (unref(facts).length) {
          _push(`<div><!--[-->`);
          ssrRenderList(unref(facts), (f) => {
            _push(`<div class="flex justify-between items-baseline gap-6 border-b border-[#DDD6C9] py-3.5"><span class="gf-eyebrow">${ssrInterpolate(f.label)}</span><span class="font-display text-[17px] font-semibold text-right">${ssrInterpolate(f.value)}</span></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-[14px] text-[#8A847C] py-6"> They didn&#39;t fill in any details beyond their contact info. </p>`);
        }
        if (unref(lead)?.address) {
          _push(`<div class="mt-8"><p class="gf-eyebrow mb-3">Address</p>`);
          _push(ssrRenderComponent(_component_baseMaps, {
            address: unref(lead)?.address
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-5"><p class="gf-eyebrow mb-3">Notes</p><div class="bg-[#EFEAE0] border border-[#DDD6C9] p-7"><p class="text-[14.5px] leading-relaxed">${ssrInterpolate(unref(lead)?.notes || "No notes yet.")}</p></div></div></div></section></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="mt-14 pt-10 border-t border-[#DDD6C9]"><p class="gf-eyebrow mb-2">Documents</p><p class="text-[13.5px] text-[#8A847C] leading-relaxed max-w-[54ch] mb-6"> Add a contract or pre-approval and we&#39;ll pull out the dates you need to watch. You confirm each one before it becomes a reminder. </p>`);
      _push(ssrRenderComponent(_component_appDocumentUpload, {
        "lead-id": String(_ctx.$route.params.id),
        class: "mb-2"
      }, null, _parent));
      _push(ssrRenderComponent(_component_appDocumentList, {
        "lead-id": String(_ctx.$route.params.id)
      }, null, _parent));
      _push(`</section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/[id]/details.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=details-DcpYc9PN.mjs.map
