import { defineComponent, ref, unref, useSSRContext, computed, watch } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { a as useToast } from "../server.mjs";
import { u as useFetch } from "./fetch-M6ewPHCZ.js";
import "/Users/mdreesen/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
const ACCEPT = ".pdf,image/jpeg,image/png,image/webp,image/heic";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DocumentUpload",
  __ssrInlineRender: true,
  props: {
    homeId: {},
    leadId: {}
  },
  emits: ["uploaded"],
  setup(__props, { emit: __emit }) {
    useToast();
    ref(null);
    const busy = ref(false);
    const stage = ref("");
    const error = ref("");
    const dragging = ref(false);
    const { data: storage } = useFetch(
      "/api/storage-mode",
      {
        key: "storage-mode",
        server: false,
        lazy: true,
        default: () => ({ driver: "r2" })
      },
      "$dWT_tAk-kG"
      /* nuxt-injected */
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><input type="file"${ssrRenderAttr("accept", ACCEPT)} class="hidden"><div class="${ssrRenderClass([[
        unref(dragging) ? "border-[#B5563A] bg-[#B5563A]/5" : "border-[#DDD6C9] hover:border-[#A9A39A]",
        unref(busy) ? "cursor-default opacity-70" : ""
      ], "w-full border border-dashed py-9 px-5 text-center cursor-pointer transition-colors"])}">`);
      if (unref(busy)) {
        _push(`<!--[--><p class="text-[14.5px] font-semibold mb-1">${ssrInterpolate(unref(stage))}…</p><p class="text-[12.5px] text-[#8A847C]">Keep this page open</p><!--]-->`);
      } else if (unref(dragging)) {
        _push(`<!--[--><p class="text-[15px] font-semibold text-[#B5563A] mb-1">Drop it here</p><p class="text-[12.5px] text-[#8A847C]">We&#39;ll read the dates out of it</p><!--]-->`);
      } else {
        _push(`<!--[--><svg class="mx-auto mb-3.5" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#A9A39A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg><p class="text-[14.5px] font-semibold mb-1"> Drag a document here, or click to browse </p><p class="text-[12.5px] text-[#8A847C]"> PDF or a photo — contracts, inspections, disclosures. You can paste too. </p><!--]-->`);
      }
      _push(`</div>`);
      if (unref(error)) {
        _push(`<p class="text-[12.5px] text-[#B5563A] mt-2.5">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(storage)?.driver === "local") {
        _push(`<p class="text-[11.5px] text-[#A9A39A] mt-2.5 leading-relaxed"> Saving to this machine while you test. Add your R2 keys to <code>.env</code> before going live — local files don&#39;t survive a deploy. </p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/DocumentUpload.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "AppDocumentUpload" });
const PRIORITIES = {
  high: {
    value: "high",
    label: "Do now",
    hint: "Today or already overdue",
    color: "#C0392B",
    // warm red, sits with the terracotta
    bg: "#FBEDEA",
    shape: "filled"
  },
  medium: {
    value: "medium",
    label: "This week",
    hint: "Coming up — plan for it",
    color: "#C08A2E",
    // amber, not yellow — yellow on cream is unreadable
    bg: "#FBF3E4",
    shape: "half"
  },
  low: {
    value: "low",
    label: "No rush",
    hint: "Far enough out to leave alone",
    color: "#5A6349",
    // the existing moss green
    bg: "#EDF0E7",
    shape: "hollow"
  }
};
function effectivePriority(date, assigned) {
  const days = daysUntil(date);
  if (days === null) return assigned;
  if (days <= 0) return "high";
  if (days <= 1) return assigned === "high" ? "high" : "medium";
  if (days <= 7) return "medium";
  if (days <= 21) return assigned === "high" ? "medium" : "low";
  return "low";
}
function isHighStakes(assigned) {
  return assigned === "high";
}
function daysUntil(date) {
  const t = new Date(date).getTime();
  if (Number.isNaN(t)) return null;
  const start = /* @__PURE__ */ new Date();
  start.setHours(0, 0, 0, 0);
  return Math.round((new Date(t).setHours(0, 0, 0, 0) - start.getTime()) / 864e5);
}
function whenLabel(date) {
  const d = daysUntil(date);
  if (d === null) return "";
  if (d < -1) return `${Math.abs(d)} days overdue`;
  if (d === -1) return "Overdue since yesterday";
  if (d === 0) return "Today";
  if (d === 1) return "Tomorrow";
  if (d <= 7) return `In ${d} days`;
  if (d <= 14) return "Next week";
  return new Date(date).toLocaleDateString(void 0, { month: "short", day: "numeric" });
}
function sortDeadlines(items) {
  const rank = { high: 0, medium: 1, low: 2 };
  return [...items].sort((a, b) => {
    if (!!a.completed !== !!b.completed) return a.completed ? 1 : -1;
    const da = daysUntil(a.date) ?? 9999;
    const db = daysUntil(b.date) ?? 9999;
    if (da !== db) return da - db;
    return rank[effectivePriority(a.date, a.priority)] - rank[effectivePriority(b.date, b.priority)];
  });
}
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DocumentList",
  __ssrInlineRender: true,
  props: {
    homeId: {},
    leadId: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    useToast();
    const query = computed(() => ({ homeId: props.homeId, leadId: props.leadId }));
    const { data: docs, refresh } = useFetch(
      "/api/documents",
      {
        key: `docs-${props.homeId || props.leadId || "all"}`,
        query,
        // Client-only: the SSR pass has no session cookie, so this 401s on a hard
        // reload and the list renders empty. Same bug as the briefing deadlines.
        server: false,
        lazy: true
      },
      "$MEpuVHrOr3"
      /* nuxt-injected */
    );
    const list = computed(() => docs.value ?? []);
    const editing = ref(null);
    const editDate = ref("");
    const confirmingDelete = ref(null);
    const deleting = ref(false);
    function liveDeadlineCount(doc) {
      return (doc.deadlines ?? []).filter(
        (d) => d.confirmed && !d.dismissed && !d.completed
      ).length;
    }
    let poll = null;
    function startPolling() {
      if (poll) clearInterval(poll);
      poll = setInterval();
    }
    watch(list, (l) => {
      if (l.some((d) => d.status === "reading") && !poll) startPolling();
    }, { immediate: true });
    function deadlinesOf(doc) {
      const live = (doc.deadlines ?? []).filter((d) => !d.dismissed);
      return sortDeadlines(live);
    }
    function unconfirmedCount(doc) {
      return (doc.deadlines ?? []).filter((d) => !d.confirmed && !d.dismissed).length;
    }
    function styleFor(d) {
      return PRIORITIES[effectivePriority(d.date, d.priority)];
    }
    __expose({ refresh });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(list).length) {
        _push(`<div class="text-[13.5px] text-[#8A847C] py-6"> No documents yet. Add a contract or inspection report and we&#39;ll pull out the dates you need to watch. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(list), (doc) => {
        _push(`<div class="border-t border-[#DDD6C9] py-6"><div class="flex items-start justify-between gap-4 mb-1.5"><div class="min-w-0"><p class="text-[15px] font-semibold truncate">${ssrInterpolate(doc.filename)}</p><p class="text-[12.5px] text-[#8A847C]">`);
        if (doc.docType) {
          _push(`<span>${ssrInterpolate(doc.docType)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (doc.docType && doc.deadlines?.length) {
          _push(`<span> · </span>`);
        } else {
          _push(`<!---->`);
        }
        if (doc.deadlines?.length) {
          _push(`<span>${ssrInterpolate(doc.deadlines.length)} dates found</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="flex items-center gap-3 shrink-0">`);
        if (unconfirmedCount(doc)) {
          _push(`<span class="text-[10.5px] uppercase tracking-[0.1em] font-semibold px-2.5 py-1 border" style="${ssrRenderStyle({ "color": "#B5563A", "border-color": "#B5563A" })}">${ssrInterpolate(unconfirmedCount(doc))} to check </span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(confirmingDelete) !== doc._id) {
          _push(`<button class="text-[12px] text-[#A9A39A] hover:text-[#B5563A] transition-colors"> Remove </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (doc.summary) {
          _push(`<p class="text-[13px] text-[#8A847C] leading-relaxed mb-4 max-w-[62ch]">${ssrInterpolate(doc.summary)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(confirmingDelete) === doc._id) {
          _push(`<div class="p-4 mb-4 border-l-2 border-[#B5563A] bg-[#B5563A]/5"><p class="text-[14px] font-semibold mb-1.5">Remove this document?</p><p class="text-[13px] text-[#8A847C] leading-relaxed mb-4 max-w-[54ch]"> The file is deleted from storage and can&#39;t be recovered — you&#39;d need the original again. `);
          if (liveDeadlineCount(doc)) {
            _push(`<!--[--><strong class="text-[#1F1B16]">${ssrInterpolate(liveDeadlineCount(doc))} confirmed deadline${ssrInterpolate(liveDeadlineCount(doc) === 1 ? "" : "s")}</strong> will also disappear from your daily briefing. <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><div class="flex gap-2.5"><button class="px-4 py-2 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] disabled:opacity-40"${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""}>${ssrInterpolate(unref(deleting) ? "Removing…" : "Remove")}</button><button class="px-4 py-2 border border-[#DDD6C9] text-[#8A847C] text-[11px] uppercase tracking-[0.1em] font-semibold hover:border-[#1F1B16] hover:text-[#1F1B16] disabled:opacity-40"${ssrIncludeBooleanAttr(unref(deleting)) ? " disabled" : ""}> Keep it </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (doc.status === "reading") {
          _push(`<p class="text-[13px] text-[#8A847C]">Reading the document…</p>`);
        } else if (doc.status === "failed") {
          _push(`<p class="text-[13px] text-[#B5563A]">${ssrInterpolate(doc.failureReason)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(deadlinesOf(doc), (d) => {
          _push(`<div class="mt-3"><div class="p-4 border-l-2" style="${ssrRenderStyle({
            borderLeftColor: styleFor(d).color,
            background: d.completed ? "transparent" : styleFor(d).bg,
            opacity: d.completed ? 0.5 : 1
          })}"><div class="flex items-start justify-between gap-4"><div class="min-w-0"><div class="flex items-center flex-wrap gap-2 mb-1"><span class="inline-block w-2.5 h-2.5 shrink-0" style="${ssrRenderStyle({
            background: styleFor(d).shape === "filled" ? styleFor(d).color : "transparent",
            border: `1.5px solid ${styleFor(d).color}`
          })}"></span><span class="text-[10.5px] uppercase tracking-[0.1em] font-semibold" style="${ssrRenderStyle({ color: styleFor(d).color })}">${ssrInterpolate(styleFor(d).label)}</span><span class="text-[12.5px] text-[#8A847C]">${ssrInterpolate(unref(whenLabel)(d.date))}</span>`);
          if (unref(isHighStakes)(d.priority) && styleFor(d).value !== "high") {
            _push(`<span class="text-[10.5px] uppercase tracking-[0.1em] text-[#A9A39A] border border-[#DDD6C9] px-1.5 py-0.5" title="Missing this costs money or the deal"> High stakes </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="${ssrRenderClass([d.completed ? "line-through" : "", "text-[14.5px]"])}">${ssrInterpolate(d.label)}</p>`);
          if (d.sourceText && !d.confirmed) {
            _push(`<p class="text-[12px] text-[#8A847C] italic mt-2 leading-relaxed max-w-[58ch]"> From the document: &quot;${ssrInterpolate(d.sourceText)}&quot; </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (!d.confirmed && !d.completed) {
            _push(`<div class="flex flex-wrap items-center gap-2 mt-3.5">`);
            if (unref(editing) === d._id) {
              _push(`<!--[--><input${ssrRenderAttr("value", unref(editDate))} type="date" class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 text-[13px]"><button class="text-[12px] font-semibold text-[#B5563A]">Save</button><button class="text-[12px] text-[#8A847C]">Cancel</button><!--]-->`);
            } else {
              _push(`<!--[--><button class="text-[11px] uppercase tracking-[0.08em] font-semibold px-3 py-1.5 bg-[#1F1B16] text-[#F7F4EF]"> That&#39;s right </button><button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]"> Wrong date </button><button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]"> Not a deadline </button><!--]-->`);
            }
            _push(`</div>`);
          } else if (!d.completed) {
            _push(`<div class="mt-3"><button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]"> Mark done </button></div>`);
          } else {
            _push(`<div class="mt-3"><button class="text-[12px] text-[#8A847C] hover:text-[#1F1B16]"> Undo </button></div>`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/DocumentList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "AppDocumentList" });
export {
  __nuxt_component_1 as _,
  __nuxt_component_2 as a
};
//# sourceMappingURL=DocumentList-DnGo_-cJ.js.map
