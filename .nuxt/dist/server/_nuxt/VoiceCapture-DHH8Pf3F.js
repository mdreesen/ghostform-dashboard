import { ref, computed, defineComponent, watch, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { a as useToast } from "../server.mjs";
function useVoiceInput() {
  const listening = ref(false);
  const transcript = ref("");
  const interim = ref("");
  const error = ref("");
  const supported = ref(false);
  let recognition = null;
  function start() {
    error.value = "";
    const SR = (void 0).SpeechRecognition || (void 0).webkitSpeechRecognition;
    if (!SR) {
      error.value = "This browser can't do voice. Chrome, Edge or Safari will work.";
      return;
    }
    recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = (void 0).language || "en-US";
    recognition.onresult = (event) => {
      let final = "";
      let partial = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) final += r[0].transcript;
        else partial += r[0].transcript;
      }
      if (final) transcript.value = (transcript.value + " " + final).trim();
      interim.value = partial;
    };
    recognition.onerror = (e) => {
      const map = {
        "not-allowed": "Microphone access was blocked. Allow it in your browser settings.",
        "service-not-allowed": "Microphone access was blocked.",
        "no-speech": "",
        "audio-capture": "No microphone found.",
        "network": "Voice needs a connection. Type it instead for now."
      };
      const msg = map[e.error];
      if (msg !== "") error.value = msg ?? "Voice stopped unexpectedly.";
      listening.value = false;
    };
    recognition.onend = () => {
      listening.value = false;
      interim.value = "";
    };
    try {
      recognition.start();
      listening.value = true;
    } catch {
      listening.value = true;
    }
  }
  function stop() {
    try {
      recognition?.stop();
    } catch {
    }
    listening.value = false;
    interim.value = "";
  }
  function toggle() {
    listening.value ? stop() : start();
  }
  function reset() {
    transcript.value = "";
    interim.value = "";
    error.value = "";
  }
  const displayText = computed(
    () => [transcript.value, interim.value].filter(Boolean).join(" ")
  );
  return { supported, listening, transcript, interim, displayText, error, start, stop, toggle, reset };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VoiceCapture",
  __ssrInlineRender: true,
  props: {
    homeId: {},
    leadId: {}
  },
  setup(__props) {
    const props = __props;
    useToast();
    const open = ref(false);
    const sending = ref(false);
    const result = ref(null);
    const editing = ref(null);
    const editDate = ref("");
    const { supported, listening, displayText, error: voiceError } = useVoiceInput();
    const text = ref("");
    watch(displayText, (t) => {
      if (listening.value && t) text.value = t;
    });
    const answer = ref("");
    const answering = ref(false);
    async function answerQuestion() {
      answering.value = true;
      try {
        const res = await $fetch("/api/documents/ask", {
          method: "POST",
          body: { question: result.value.question, homeId: props.homeId, leadId: props.leadId }
        });
        answer.value = res.answer;
      } catch {
        answer.value = "Could not check that just now.";
      } finally {
        answering.value = false;
      }
    }
    watch(result, (r) => {
      if (r?.question) answerQuestion();
    });
    const liveReminders = computed(() => (result.value?.reminders ?? []).filter((r) => !r.dismissed));
    const INTENT_LABEL = {
      note: "Saved as a note",
      question: "Read as a question",
      reminder: "Set as a reminder",
      mixed: "Saved, with a reminder",
      unclear: "Wasn't sure what you meant — kept as a note"
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(open)) {
        _push(`<button class="flex items-center gap-2 px-4 py-2.5 border border-[#DDD6C9] gf-label uppercase tracking-[0.1em] font-semibold text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3"></path></svg> Voice note </button>`);
      } else {
        _push(`<div class="border border-[#DDD6C9] p-5"><div class="flex items-baseline justify-between gap-4 mb-4"><p class="gf-eyebrow">Voice note</p><button class="gf-meta text-[#A9A39A] hover:text-[#1F1B16]">Close</button></div>`);
        if (!unref(result)) {
          _push(`<!--[--><div class="flex items-start gap-3 mb-3">`);
          if (unref(supported)) {
            _push(`<button class="${ssrRenderClass([unref(listening) ? "bg-[#B5563A] border-[#B5563A] text-[#F7F4EF]" : "border-[#DDD6C9] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16]", "shrink-0 w-11 h-11 flex items-center justify-center border transition-colors"])}"><svg width="17" height="17" viewBox="0 0 24 24"${ssrRenderAttr("fill", unref(listening) ? "currentColor" : "none")} stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="9" y="2" width="6" height="12" rx="3"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none"></path></svg></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<textarea rows="3" class="${ssrRenderClass([unref(listening) ? "border-[#B5563A]" : "border-[#DDD6C9] focus:border-[#B5563A]", "flex-1 bg-[#F7F4EF] border px-3.5 py-2.5 gf-body resize-none focus:outline-none transition-colors"])}"${ssrRenderAttr("placeholder", unref(supported) ? "Tap the mic, or type it" : "Type your note")}>${ssrInterpolate(unref(text))}</textarea></div>`);
          if (unref(listening)) {
            _push(`<p class="gf-label text-[#B5563A] mb-3"> Listening — say what you need, then tap the mic again. </p>`);
          } else if (unref(voiceError)) {
            _push(`<p class="gf-label text-[#B5563A] mb-3">${ssrInterpolate(unref(voiceError))}</p>`);
          } else {
            _push(`<p class="gf-label gf-muted mb-3"> Notes, questions and reminders all work. &quot;Remind me to call the Chens Thursday.&quot; </p>`);
          }
          _push(`<button class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] disabled:opacity-40"${ssrIncludeBooleanAttr(unref(sending) || unref(text).trim().length < 2) ? " disabled" : ""}>${ssrInterpolate(unref(sending) ? "Working…" : "Save")}</button><!--]-->`);
        } else {
          _push(`<!--[--><p class="gf-meta mb-1">${ssrInterpolate(INTENT_LABEL[unref(result).intent] || "Saved")}</p>`);
          if (unref(result).degraded) {
            _push(`<p class="gf-label text-[#B5563A] mb-3"> We saved what you said but couldn&#39;t work out what to do with it. </p>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).note) {
            _push(`<div class="p-3.5 bg-[#EFEAE0] mb-4"><p class="gf-body leading-relaxed">${ssrInterpolate(unref(result).note)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(result).question) {
            _push(`<div class="mb-4"><p class="gf-label gf-muted mb-1.5">You asked: &quot;${ssrInterpolate(unref(result).question)}&quot;</p><div class="p-3.5 border-l-2 border-[#B5563A] bg-[#EFEAE0]">`);
            if (unref(answering)) {
              _push(`<p class="gf-body text-[#8A847C]">Checking your documents…</p>`);
            } else {
              _push(`<p class="gf-body leading-relaxed">${ssrInterpolate(unref(answer))}</p>`);
            }
            _push(`</div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(liveReminders).length) {
            _push(`<div class="mb-4"><p class="gf-label gf-muted mb-2">${ssrInterpolate(unref(liveReminders).length === 1 ? "Reminder" : "Reminders")} — check the day before confirming </p><!--[-->`);
            ssrRenderList(unref(liveReminders), (r) => {
              _push(`<div class="p-3.5 border-l-2 mb-2" style="${ssrRenderStyle({ borderLeftColor: r.confirmed ? "#5A6349" : "#C08A2E", background: "#EFEAE0" })}"><p class="gf-body">${ssrInterpolate(r.text)}</p><p class="gf-meta mt-0.5">${ssrInterpolate(new Date(r.dueAt).toLocaleDateString(void 0, { weekday: "long", month: "short", day: "numeric" }))}</p>`);
              if (r.heardAs) {
                _push(`<p class="gf-label gf-muted italic mt-1.5"> heard: &quot;${ssrInterpolate(r.heardAs)}&quot; </p>`);
              } else {
                _push(`<!---->`);
              }
              if (unref(editing) === r._id) {
                _push(`<div class="flex flex-wrap items-center gap-2 mt-2.5"><input${ssrRenderAttr("value", unref(editDate))} type="date" class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 gf-meta focus:outline-none focus:border-[#B5563A]"><button class="gf-meta font-semibold text-[#B5563A]">Save</button><button class="gf-meta text-[#8A847C]">Cancel</button></div>`);
              } else if (!r.confirmed) {
                _push(`<div class="flex flex-wrap items-center gap-3 mt-2.5"><button class="gf-label uppercase tracking-[0.08em] font-semibold px-3 py-1.5 bg-[#1F1B16] text-[#F7F4EF]"> That&#39;s right </button><button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]">Wrong day</button><button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]">Not a reminder</button></div>`);
              } else {
                _push(`<p class="gf-label mt-2" style="${ssrRenderStyle({ "color": "#5A6349" })}">Confirmed — it&#39;ll be in your briefing</p>`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex gap-3"><button class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830]"> Add another </button><button class="px-5 py-2.5 border border-[#DDD6C9] gf-label uppercase tracking-[0.1em] font-semibold text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16]"> Done </button></div><!--]-->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/VoiceCapture.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "AppVoiceCapture" });
export {
  __nuxt_component_1 as _,
  useVoiceInput as u
};
//# sourceMappingURL=VoiceCapture-DHH8Pf3F.js.map
