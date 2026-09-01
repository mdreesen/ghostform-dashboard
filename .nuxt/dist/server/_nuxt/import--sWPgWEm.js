import { u as useHead, a as useToast, _ as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_1 } from "./Navigate-B_PGVHvu.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
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
const norm = (s) => String(s || "").trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
function normaliseIntent(v) {
  const s = norm(v);
  if (!s) return "";
  const buys = /buy|buyer|purchas/.test(s);
  const sells = /sell|seller|listing|list/.test(s);
  if (s.includes("both") || buys && sells) return "both";
  if (sells) return "sell";
  if (buys) return "buy";
  return "";
}
function parseBudget(v) {
  const digits = String(v || "").replace(/[^0-9.]/g, "");
  if (!digits) return void 0;
  const n = Number(digits);
  if (!Number.isFinite(n) || n <= 0) return void 0;
  return n < 1e4 ? Math.round(n * 1e3) : Math.round(n);
}
function mapRows(rows, mapping) {
  const [, ...body] = rows;
  const ready = [];
  const skipped = [];
  const seenEmails = /* @__PURE__ */ new Set();
  let duplicatesInFile = 0;
  body.forEach((cells, idx) => {
    const rowNo = idx + 2;
    const lead = {};
    let first = "", last = "";
    Object.entries(mapping).forEach(([colIdx, field]) => {
      if (!field) return;
      const raw = (cells[Number(colIdx)] ?? "").trim();
      if (!raw) return;
      switch (field) {
        case "first_name":
          first = raw;
          break;
        case "last_name":
          last = raw;
          break;
        case "name":
          lead.name = raw;
          break;
        case "email":
          lead.email = raw.toLowerCase();
          break;
        case "phone":
          lead.phone = raw;
          break;
        case "buy_sell_both":
          lead.buy_sell_both = normaliseIntent(raw);
          break;
        case "budget":
          lead.budget = parseBudget(raw);
          break;
        case "address":
        case "city":
          lead.address = lead.address ? `${lead.address}, ${raw}` : raw;
          break;
        case "notes":
          lead.notes = lead.notes ? `${lead.notes}
${raw}` : raw;
          break;
        case "source":
          lead.source = raw;
          break;
      }
    });
    if (!lead.name && (first || last)) lead.name = [first, last].filter(Boolean).join(" ");
    if (!lead.email) {
      skipped.push({ row: rowNo, reason: "no email address" });
      return;
    }
    if (!EMAIL_RE.test(lead.email)) {
      skipped.push({ row: rowNo, reason: `email doesn't look valid (${lead.email})` });
      return;
    }
    if (seenEmails.has(lead.email)) {
      duplicatesInFile++;
      return;
    }
    seenEmails.add(lead.email);
    if (!lead.name) lead.name = lead.email.split("@")[0];
    ready.push(lead);
  });
  return { ready, skipped, duplicatesInFile };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "import",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "GhostForm | Import leads" });
    useToast();
    ref(null);
    const step = ref("file");
    const importing = ref(false);
    const rows = ref([]);
    const guesses = ref([]);
    const mapping = ref({});
    const onDuplicate = ref("skip");
    const result = ref(null);
    const FIELDS = [
      { value: null, label: "Don't import" },
      { value: "name", label: "Full name" },
      { value: "first_name", label: "First name" },
      { value: "last_name", label: "Last name" },
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
      { value: "buy_sell_both", label: "Buying or selling" },
      { value: "budget", label: "Budget" },
      { value: "address", label: "Address" },
      { value: "notes", label: "Notes" },
      { value: "source", label: "Where they came from" }
    ];
    const preview = computed(() => {
      if (!rows.value.length) return null;
      return mapRows(rows.value, mapping.value);
    });
    const hasEmail = computed(() => Object.values(mapping.value).includes("email"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_baseButtonNavigate = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto" }, _attrs))}><header class="mb-12 pt-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/leads",
        class: "gf-eyebrow inline-block mb-5 hover:text-[#B5563A] transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Leads `);
          } else {
            return [
              createTextVNode(" ← Leads ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="gf-display text-[clamp(30px,4vw,44px)] mb-4">Bring your leads across.</h1><p class="text-[15.5px] text-[#8A847C] leading-relaxed max-w-[52ch]"> Export a CSV from wherever your leads live now — a spreadsheet, your old CRM, Zillow — and we&#39;ll match up the columns for you. </p></header>`);
      if (unref(step) === "file") {
        _push(`<section><div class="border border-dashed border-[#DDD6C9] p-14 text-center cursor-pointer hover:border-[#A9A39A] transition-colors"><input type="file" accept=".csv,text/csv" class="hidden"><p class="font-display text-[19px] mb-2">Choose a CSV file</p><p class="text-[13.5px] text-[#8A847C]"> Most tools have an &quot;Export&quot; option that produces one. </p></div><div class="mt-8 p-5 bg-[#EFEAE0] border border-[#DDD6C9]"><p class="gf-eyebrow mb-2.5">What we need</p><p class="text-[13.5px] text-[#8A847C] leading-relaxed"> An email address for each lead — that&#39;s what makes them contactable, and rows without one can&#39;t be imported. Everything else is optional and can be filled in later. </p></div></section>`);
      } else if (unref(step) === "map") {
        _push(`<section><div class="flex items-baseline justify-between mb-6"><p class="gf-eyebrow">Check the columns</p><button class="text-[12.5px] text-[#8A847C] hover:text-[#1F1B16]"> Choose a different file </button></div><p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[54ch] mb-8"> We&#39;ve guessed what each column is. Anything marked <span class="text-[#B5563A]">check this</span> is a guess worth confirming before you import. </p><div class="border-t border-[#DDD6C9] mb-8"><!--[-->`);
        ssrRenderList(unref(guesses), (g, i) => {
          _push(`<div class="grid gap-4 py-4 border-b border-[#DDD6C9] items-center" style="${ssrRenderStyle({ "grid-template-columns": "1fr auto" })}"><div class="min-w-0"><p class="text-[14.5px] font-semibold truncate">${ssrInterpolate(g.column)}</p><p class="text-[12.5px] text-[#A9A39A] truncate"> e.g. ${ssrInterpolate(g.sample || "(empty)")} `);
          if (g.confidence === "low") {
            _push(`<span class="text-[#B5563A]"> · check this</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div><select class="bg-[#F7F4EF] border border-[#DDD6C9] px-3 py-2.5 text-[13.5px] focus:outline-none focus:border-[#B5563A]"><!--[-->`);
          ssrRenderList(FIELDS, (f) => {
            _push(`<option${ssrRenderAttr("value", f.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(mapping)[i]) ? ssrLooseContain(unref(mapping)[i], f.value) : ssrLooseEqual(unref(mapping)[i], f.value)) ? " selected" : ""}>${ssrInterpolate(f.label)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        });
        _push(`<!--]--></div>`);
        if (!unref(hasEmail)) {
          _push(`<div class="p-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5 mb-8"><p class="text-[13.5px]"> No column is set to Email. Pick one before importing — a lead without an email can&#39;t be followed up. </p></div>`);
        } else if (unref(preview)) {
          _push(`<div class="mb-8"><p class="gf-eyebrow mb-4">What will happen</p><div class="grid sm:grid-cols-3 gap-px bg-[#DDD6C9] border border-[#DDD6C9] mb-5"><div class="bg-[#F7F4EF] p-5"><p class="font-display text-[30px] leading-none">${ssrInterpolate(unref(preview).ready.length)}</p><p class="text-[12.5px] text-[#8A847C] mt-1.5">will be imported</p></div><div class="bg-[#F7F4EF] p-5"><p class="font-display text-[30px] leading-none">${ssrInterpolate(unref(preview).skipped.length)}</p><p class="text-[12.5px] text-[#8A847C] mt-1.5">skipped</p></div><div class="bg-[#F7F4EF] p-5"><p class="font-display text-[30px] leading-none">${ssrInterpolate(unref(preview).duplicatesInFile)}</p><p class="text-[12.5px] text-[#8A847C] mt-1.5">duplicates in the file</p></div></div>`);
          if (unref(preview).skipped.length) {
            _push(`<details class="mb-5"><summary class="text-[13px] text-[#B5563A] cursor-pointer"> Why ${ssrInterpolate(unref(preview).skipped.length)} were skipped </summary><ul class="mt-3 space-y-1.5"><!--[-->`);
            ssrRenderList(unref(preview).skipped.slice(0, 25), (s) => {
              _push(`<li class="text-[12.5px] text-[#8A847C]"> Row ${ssrInterpolate(s.row)} — ${ssrInterpolate(s.reason)}</li>`);
            });
            _push(`<!--]-->`);
            if (unref(preview).skipped.length > 25) {
              _push(`<li class="text-[12.5px] text-[#A9A39A]"> …and ${ssrInterpolate(unref(preview).skipped.length - 25)} more </li>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</ul></details>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<p class="gf-eyebrow mb-3">If a lead is already in your database</p><div class="flex gap-2.5"><!--[-->`);
          ssrRenderList([
            { v: "skip", l: "Leave it alone", h: "Keeps what you already have" },
            { v: "update", l: "Fill in blanks", h: "Adds missing details only" }
          ], (opt) => {
            _push(`<button class="${ssrRenderClass([unref(onDuplicate) === opt.v ? "border-[#B5563A] bg-[#B5563A]/5" : "border-[#DDD6C9]", "flex-1 text-left px-4 py-3 border transition-colors"])}"><span class="block text-[14px] font-semibold">${ssrInterpolate(opt.l)}</span><span class="block text-[12px] text-[#A9A39A] mt-0.5">${ssrInterpolate(opt.h)}</span></button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="px-7 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.12em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40"${ssrIncludeBooleanAttr(unref(importing) || !unref(hasEmail) || !unref(preview)?.ready.length) ? " disabled" : ""}>${ssrInterpolate(unref(importing) ? "Importing…" : `Import ${unref(preview)?.ready.length ?? 0} leads`)}</button></section>`);
      } else {
        _push(`<section class="border border-[#DDD6C9] p-12 text-center"><p class="font-display text-[24px] mb-3">${ssrInterpolate(unref(result)?.inserted)} leads added </p><p class="text-[14px] text-[#8A847C] leading-relaxed max-w-[44ch] mx-auto mb-8">`);
        if (unref(result)?.updated) {
          _push(`<!--[-->${ssrInterpolate(unref(result).updated)} existing leads were updated. <!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(` They&#39;re on your list now and will appear in tomorrow&#39;s briefing. </p><div class="flex flex-wrap gap-3 justify-center">`);
        _push(ssrRenderComponent(_component_baseButtonNavigate, {
          text: "See your leads",
          path: "/dashboard/leads"
        }, null, _parent));
        _push(`<button class="px-6 py-3.5 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.12em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16]"> Import another file </button></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/leads/import.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=import--sWPgWEm.js.map
