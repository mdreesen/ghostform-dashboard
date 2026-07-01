import { _ as __nuxt_component_0 } from './Auth-YSaql3Au.mjs';
import { _ as _sfc_main$3 } from './Badge-BrjXz4Ri.mjs';
import { J as useNuxtData, s as useUserSession, d as _sfc_main$8, _ as __nuxt_component_0$2, t as useAppConfig, v as useComponentUI, B as tv, U as formBusInjectionKey, W as formStateInjectionKey, X as formErrorsInjectionKey, Y as formInputsInjectionKey, Z as formLoadingInjectionKey, $ as formOptionsInjectionKey, a0 as useEventBus } from './server.mjs';
import { defineComponent, reactive, ref, withCtx, createTextVNode, unref, openBlock, createBlock, toDisplayString, createVNode, createCommentVNode, computed, useId, useTemplateRef, inject, provide, readonly, resolveDynamicComponent, mergeProps, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderSlot, ssrRenderTeleport, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './FormField-U6Cmlg5P.mjs';
import { _ as _sfc_main$5 } from './Input-Bzrpkoao.mjs';
import { Trash2, AlertTriangle, X, ShieldAlert } from 'lucide-vue-next';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { z } from 'zod';
import { u as useToast } from './useToast-CoH-wKxE.mjs';
import '../nitro/nitro.mjs';
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

function timeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
function formatDate() {
  return (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    timeZone: timeZone(),
    year: "numeric",
    month: "long",
    // 'numeric', '2-digit', 'short'
    day: "numeric",
    hour12: true
    // true for AM/PM, false for 24-hour
  });
}
function isSuperStructSchema(schema) {
  return "schema" in schema && typeof schema.coercer === "function" && typeof schema.validator === "function" && typeof schema.refiner === "function";
}
function isStandardSchema(schema) {
  return "~standard" in schema;
}
async function validateStandardSchema(state, schema) {
  const result = await schema["~standard"].validate(state);
  if (result.issues) {
    return {
      errors: result.issues?.map((issue) => ({
        name: issue.path?.map((item) => typeof item === "object" ? item.key : item).join(".") || "",
        message: issue.message
      })) || [],
      result: null
    };
  }
  return {
    errors: null,
    result: result.value
  };
}
async function validateSuperstructSchema(state, schema) {
  const [err, result] = schema.validate(state);
  if (err) {
    const errors = err.failures().map((error) => ({
      message: error.message,
      name: error.path.join(".")
    }));
    return {
      errors,
      result: null
    };
  }
  return {
    errors: null,
    result
  };
}
function validateSchema(state, schema) {
  if (isStandardSchema(schema)) {
    return validateStandardSchema(state, schema);
  } else if (isSuperStructSchema(schema)) {
    return validateSuperstructSchema(state, schema);
  } else {
    throw new Error("Form validation failed: Unsupported form schema");
  }
}
function getAtPath(data, path) {
  if (!path) return data;
  const value = path.split(".").reduce(
    (value2, key) => value2?.[key],
    data
  );
  return value;
}
function setAtPath(data, path, value) {
  if (!path) return Object.assign(data, value);
  if (!data) return data;
  const keys = path.split(".");
  let current = data;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === void 0 || current[key] === null) {
      if (i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))) {
        current[key] = [];
      } else {
        current[key] = {};
      }
    }
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return data;
}
class FormValidationException extends Error {
  formId;
  errors;
  constructor(formId, errors) {
    super("Form validation exception");
    this.formId = formId;
    this.errors = errors;
    Object.setPrototypeOf(this, FormValidationException.prototype);
  }
}
const theme = {
  "base": ""
};
const _sfc_main$2 = {
  __name: "UForm",
  __ssrInlineRender: true,
  props: {
    id: { type: [String, Number], required: false },
    schema: { type: null, required: false },
    state: { type: null, required: false },
    validate: { type: Function, required: false },
    validateOn: { type: Array, required: false, default() {
      return ["input", "blur", "change"];
    } },
    disabled: { type: Boolean, required: false },
    name: { type: null, required: false },
    validateOnInputDelay: { type: Number, required: false, default: 300 },
    transform: { type: null, required: false, default: () => true },
    nested: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    onSubmit: { type: Function, required: false }
  },
  emits: ["submit", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("form", props);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.form || {} }));
    const formId = props.id ?? useId();
    const formRef = useTemplateRef("formRef");
    const bus = useEventBus(`form-${formId}`);
    const parentBus = props.nested === true && inject(
      formBusInjectionKey,
      void 0
    );
    const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
    const state = computed(() => {
      if (parentState?.value) {
        return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
      }
      return props.state;
    });
    provide(formBusInjectionKey, bus);
    provide(formStateInjectionKey, state);
    const nestedForms = ref(/* @__PURE__ */ new Map());
    const errors = ref([]);
    provide(formErrorsInjectionKey, errors);
    const inputs = ref({});
    provide(formInputsInjectionKey, inputs);
    const dirtyFields = reactive(/* @__PURE__ */ new Set());
    const touchedFields = reactive(/* @__PURE__ */ new Set());
    const blurredFields = reactive(/* @__PURE__ */ new Set());
    function resolveErrorIds(errs) {
      return errs.map((err) => ({
        ...err,
        id: err?.name ? inputs.value[err.name]?.id : void 0
      }));
    }
    const transformedState = ref(null);
    async function getErrors() {
      let errs = props.validate ? await props.validate(state.value) ?? [] : [];
      if (props.schema) {
        const { errors: errors2, result } = await validateSchema(state.value, props.schema);
        if (errors2) {
          errs = errs.concat(errors2);
        } else {
          transformedState.value = result;
        }
      }
      return resolveErrorIds(errs);
    }
    async function _validate(opts = { silent: false, nested: false, transform: false }) {
      const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
      let nestedResults = [];
      let nestedErrors = [];
      if (!names && opts.nested) {
        const validations = Array.from(nestedForms.value.values()).map(
          (form) => validateNestedForm(form, opts)
        );
        const results = await Promise.all(validations);
        nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
        nestedResults = results.filter((r) => r.output !== void 0);
      }
      const currentErrors = await getErrors();
      const allErrors = [...currentErrors, ...nestedErrors];
      if (names) {
        errors.value = filterErrorsByNames(allErrors, names);
      } else {
        errors.value = allErrors;
      }
      if (errors.value?.length) {
        if (opts.silent) return false;
        throw new FormValidationException(formId, errors.value);
      }
      if (opts.transform) {
        nestedResults.forEach((result) => {
          if (result.name) {
            setAtPath(transformedState.value, result.name, result.output);
          } else {
            Object.assign(transformedState.value, result.output);
          }
        });
        return transformedState.value ?? state.value;
      }
      return state.value;
    }
    const loading = ref(false);
    provide(formLoadingInjectionKey, readonly(loading));
    async function onSubmitWrapper(payload) {
      loading.value = props.loadingAuto && true;
      const event = payload;
      try {
        event.data = await _validate({ nested: true, transform: props.transform });
        await props.onSubmit?.(event);
        dirtyFields.clear();
      } catch (error) {
        if (!(error instanceof FormValidationException)) {
          throw error;
        }
        const errorEvent = {
          ...event,
          errors: error.errors
        };
        emits("error", errorEvent);
      } finally {
        loading.value = false;
      }
    }
    const disabled = computed(() => props.disabled || loading.value);
    provide(formOptionsInjectionKey, computed(() => ({
      disabled: disabled.value,
      validateOnInputDelay: props.validateOnInputDelay
    })));
    async function validateNestedForm(form, opts) {
      try {
        const result = await form.validate({ ...opts, silent: false });
        return { name: form.name, output: result };
      } catch (error) {
        if (!(error instanceof FormValidationException)) throw error;
        return { name: form.name, error };
      }
    }
    function addFormPath(error, formPath) {
      if (!formPath || !error.name) return error;
      return { ...error, name: formPath + "." + error.name };
    }
    function stripFormPath(error, formPath) {
      const prefix = formPath + ".";
      const name2 = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
      return { ...error, name: name2 };
    }
    function filterFormErrors(errors2, formPath) {
      if (!formPath) return errors2;
      return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
    }
    function getFormErrors(form) {
      return form.api.getErrors().map(
        (e) => form.name ? { ...e, name: form.name + "." + e.name } : e
      );
    }
    function matchesTarget(target, path) {
      if (!target || !path) return true;
      if (target instanceof RegExp) return target.test(path);
      return path === target || typeof target === "string" && target.startsWith(path + ".");
    }
    function getNestedTarget(target, formPath) {
      if (!target || target instanceof RegExp) return target;
      if (formPath === target) return void 0;
      if (typeof target === "string" && target.startsWith(formPath + ".")) {
        return target.substring(formPath.length + 1);
      }
      return target;
    }
    function filterErrorsByNames(allErrors, names) {
      const nameSet = new Set(names);
      const patterns = names.map((name2) => inputs.value?.[name2]?.pattern).filter(Boolean);
      const matchesNames = (error) => {
        if (!error.name) return false;
        if (nameSet.has(error.name)) return true;
        return patterns.some((pattern) => pattern.test(error.name));
      };
      const keepErrors = errors.value.filter((error) => !matchesNames(error));
      const newErrors = allErrors.filter(matchesNames);
      return [...keepErrors, ...newErrors];
    }
    function filterErrorsByTarget(currentErrors, target) {
      return currentErrors.filter(
        (err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target
      );
    }
    function isLocalError(error) {
      return !error.name || !!inputs.value[error.name];
    }
    const api = {
      validate: _validate,
      errors,
      setErrors(errs, name2) {
        const localErrors = resolveErrorIds(errs.filter(isLocalError));
        const nestedErrors = [];
        for (const form of nestedForms.value.values()) {
          if (matchesTarget(name2, form.name)) {
            const formErrors = filterFormErrors(errs, form.name);
            form.api.setErrors(formErrors, getNestedTarget(name2, form.name || ""));
            nestedErrors.push(...getFormErrors(form));
          }
        }
        if (name2) {
          const keepErrors = filterErrorsByTarget(errors.value, name2);
          errors.value = [...keepErrors, ...localErrors, ...nestedErrors];
        } else {
          errors.value = [...localErrors, ...nestedErrors];
        }
      },
      async submit() {
        if (formRef.value instanceof HTMLFormElement && formRef.value.reportValidity() === false) {
          return;
        }
        await onSubmitWrapper(new Event("submit"));
      },
      getErrors(name2) {
        if (!name2) return errors.value;
        return errors.value.filter(
          (err) => name2 instanceof RegExp ? err.name && name2.test(err.name) : err.name === name2
        );
      },
      clear(name2) {
        const localErrors = name2 ? errors.value.filter(
          (err) => isLocalError(err) && (name2 instanceof RegExp ? !(err.name && name2.test(err.name)) : err.name !== name2)
        ) : [];
        const nestedErrors = [];
        for (const form of nestedForms.value.values()) {
          if (matchesTarget(name2, form.name)) form.api.clear();
          nestedErrors.push(...getFormErrors(form));
        }
        errors.value = [...localErrors, ...nestedErrors];
      },
      disabled,
      loading,
      dirty: computed(() => !!dirtyFields.size),
      dirtyFields: readonly(dirtyFields),
      blurredFields: readonly(blurredFields),
      touchedFields: readonly(touchedFields)
    };
    __expose(api);
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(parentBus) ? "div" : "form"), mergeProps({
        id: unref(formId),
        ref_key: "formRef",
        ref: formRef,
        class: ui.value({ class: [unref(uiProp)?.base, props.class] }),
        onSubmit: onSubmitWrapper
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {
              errors: errors.value,
              loading: loading.value
            }, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {
                errors: errors.value,
                loading: loading.value
              })
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Form.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteProfile",
  __ssrInlineRender: true,
  emits: ["confirm-delete"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const isHolding = ref(false);
    const progress = ref(0);
    ref(null);
    const isDeleted = ref(false);
    useUserSession();
    ref(false);
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans" }, _attrs))} data-v-7f0ac2c1><button class="group relative px-6 py-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all w-full flex items-center justify-between overflow-hidden" data-v-7f0ac2c1><div class="flex items-center gap-3 relative z-10" data-v-7f0ac2c1><div class="p-2 bg-red-500/10 rounded-lg text-red-500 group-hover:text-red-400 transition-colors" data-v-7f0ac2c1>`);
      _push(ssrRenderComponent(unref(Trash2), { class: "w-5 h-5" }, null, _parent));
      _push(`</div><div class="text-left" data-v-7f0ac2c1><span class="block text-red-500 font-bold text-sm" data-v-7f0ac2c1>Delete Profile</span><span class="block text-red-500/50 text-[10px] uppercase font-bold tracking-wider" data-v-7f0ac2c1>Irreversible</span></div></div>`);
      _push(ssrRenderComponent(unref(AlertTriangle), { class: "w-5 h-5 text-red-500/20 group-hover:text-red-500 transition-colors relative z-10" }, null, _parent));
      _push(`</button>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center px-6" data-v-7f0ac2c1><div class="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" data-v-7f0ac2c1></div><div class="relative w-full bg-zinc-900 border border-white/10 rounded-4xl p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" data-v-7f0ac2c1><button class="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors z-20" data-v-7f0ac2c1>`);
          _push2(ssrRenderComponent(unref(X), { class: "w-6 h-6" }, null, _parent));
          _push2(`</button><div class="relative z-10 flex flex-col items-center text-center" data-v-7f0ac2c1><div class="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 ring-1 ring-red-500/30" data-v-7f0ac2c1>`);
          _push2(ssrRenderComponent(unref(ShieldAlert), { class: "w-8 h-8 text-red-500" }, null, _parent));
          _push2(`</div><h2 class="text-2xl font-bold text-white mb-2" data-v-7f0ac2c1>Final Warning</h2><p class="text-zinc-400 text-sm leading-relaxed mb-8" data-v-7f0ac2c1> This will wipe your history, metrics, and progress. There is no going back. </p><div class="w-full relative" data-v-7f0ac2c1><div data-v-7f0ac2c1><button class="relative w-full h-16 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center border border-white/5 group select-none touch-none" data-v-7f0ac2c1><div class="absolute bottom-0 left-0 h-full bg-red-600 transition-all duration-75 ease-linear" style="${ssrRenderStyle({ width: `${progress.value}%` })}" data-v-7f0ac2c1></div><div class="relative z-10 flex items-center gap-2 pointer-events-none" data-v-7f0ac2c1>`);
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(isDeleted.value ? "" : unref(Trash2)), {
            class: ["w-5 h-5 transition-colors", progress.value > 50 ? "text-white" : "text-red-500"]
          }, null), _parent);
          _push2(`<span class="${ssrRenderClass([progress.value > 50 ? "text-white" : "text-red-500", "font-bold uppercase tracking-widest text-sm transition-colors"])}" data-v-7f0ac2c1>${ssrInterpolate(isDeleted.value ? "Account Deleted" : isHolding.value ? "Hold to Delete..." : "Press & Hold")}</span></div></button></div>`);
          if (!isDeleted.value) {
            _push2(`<p class="mt-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest opacity-60" data-v-7f0ac2c1> Release to cancel </p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600/10 blur-[80px] pointer-events-none rounded-full" data-v-7f0ac2c1></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/base/DeleteProfile.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-7f0ac2c1"]]), { __name: "BaseDeleteProfile" });
const name = "ghostform-dashboard";
const type = "module";
const version = "0.0.0.1";
const scripts = { "build": 'NODE_OPTIONS="--max-old-space-size=4096" nuxt build', "dev": "nuxt dev", "generate": "nuxt generate", "preview": "nuxt preview", "postinstall": "nuxt prepare" };
const dependencies = { "@nuxt/eslint": "^1.15.2", "@nuxt/image": "^1.11.0", "@nuxt/kit": "^4.2.2", "@nuxt/ui": "^4.3.0", "@nuxtjs/tailwindcss": "^6.14.0", "@pinia/nuxt": "^0.11.3", "@tailwindcss/vite": "^4.1.13", "@vite-pwa/nuxt": "^1.0.4", "@vueuse/motion": "^3.0.3", "bcrypt": "^6.0.0", "date-fns": "^4.1.0", "dexie": "^4.4.2", "exceljs": "^4.4.0", "lucide-vue-next": "^0.556.0", "mongodb": "^6.21.0", "mongoose": "^8.23.1", "nuxt": "^4.2.2", "nuxt-auth-utils": "^0.5.25", "nuxt-charts": "^2.1.4", "nuxt-google-auth": "^0.1.7", "nuxt-notify": "^1.1.4", "nuxt-qrcode": "^0.4.10", "nuxt-vitalizer": "^2.0.0", "pinia": "^3.0.4", "reka-ui": "^2.6.1", "resend": "^6.12.3", "stripe": "^22.1.1", "tailwindcss": "^4.1.13", "vue": "^3.5.21", "vue-router": "^4.5.1", "xlsx": "^0.18.5", "zod": "^4.4.3" };
const devDependencies = { "@iconify-json/lucide": "^1.2.68", "@iconify-json/material-symbols": "^1.2.39", "@nuxtjs/color-mode": "^3.5.2", "@stripe/stripe-js": "^9.4.0", "@types/bcrypt": "^6.0.0", "@types/node": "^24.5.2", "baseline-browser-mapping": "^2.9.5", "sass": "^1.93.0", "typescript": "^5.9.2", "vue-tsc": "^3.0.8" };
const packageJson = {
  name,
  type,
  "private": true,
  version,
  scripts,
  dependencies,
  devDependencies
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { data } = useNuxtData("user");
    useUserSession();
    const schema = z.object({
      name: z.string().min(2, "Identity tag required"),
      email: z.string().email("Invalid intelligence routing link"),
      phone: z.string().min(10, "Contact telemetry sequence incomplete"),
      company: z.string().min(2, "Professional affiliation required"),
      region: z.string().min(2, "Operational area baseline required"),
      calendar_link: z.string().nullable()
    });
    const state = reactive({
      name: data.value?.name,
      email: data.value?.email,
      phone: data.value?.phone,
      company: data.value?.company,
      region: data.value.region,
      calendar_link: data.value.calendar_link
    });
    const isEditing = ref(false);
    const toast = useToast();
    const onSubmit = async (event) => {
      try {
        await $fetch("/api/user", {
          method: "PUT",
          body: event.data
        });
        isEditing.value = false;
        toast.success("Updated Profile");
      } catch (error) {
        toast.error("Failed to delete", "Try again");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_baseHeaderAuth = __nuxt_component_0;
      const _component_UBadge = _sfc_main$3;
      const _component_UButton = _sfc_main$8;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_baseDeleteProfile = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="max-w-4xl mx-auto py-10 flex flex-col gap-8"><header class="pb-8 border-b border-gray-700">`);
      _push(ssrRenderComponent(_component_baseHeaderAuth, {
        text: "Settings",
        subText: "Manage your profile"
      }, null, _parent));
      _push(`</header><div><main class="max-w-4xl mx-auto relative z-10"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><section class="lg:col-span-4 space-y-6"><div class="backdrop-blur-xl bg-white/1 border border-white/6 rounded-4xl p-6 space-y-4"><div class="flex justify-between items-center text-xs font-mono border-b border-white/5 pb-3"><span class="text-zinc-500 uppercase tracking-wider">Account Node</span>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "neutral",
        variant: "subtle",
        class: "font-black text-[9px] uppercase tracking-widest px-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Phantom Tier `);
          } else {
            return [
              createTextVNode("Phantom Tier ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex justify-between items-center text-xs font-mono"><span class="text-zinc-500 uppercase tracking-wider">Stripe Sync</span><span class="text-zinc-400 font-bold">Active</span></div></div></section><section class="lg:col-span-8"><div class="backdrop-blur-2xl bg-white/2 border border-white/8 rounded-[2.5rem] shadow-2xl"><div class="px-8 py-4">`);
      if (!isEditing.value) {
        _push(ssrRenderComponent(_component_UButton, {
          variant: "subtle",
          color: "neutral",
          icon: "i-heroicons-pencil-square",
          class: "rounded-xl px-5 py-2.5 text-xs font-black tracking-wider uppercase",
          onClick: ($event) => isEditing.value = true
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Modify Profile `);
            } else {
              return [
                createTextVNode(" Modify Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UForm, {
        schema: unref(schema),
        state: unref(state),
        class: "space-y-6 p-8 lg:p-10",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Name",
              name: "name"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).name,
                      "onUpdate:modelValue": ($event) => unref(state).name = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).name)}${_scopeId2}>${ssrInterpolate(unref(state).name || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).name,
                      "onUpdate:modelValue": ($event) => unref(state).name = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).name
                    }, toDisplayString(unref(state).name || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Email",
              name: "email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      disabled: !isEditing.value,
                      type: "email",
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).email)}${_scopeId2}>${ssrInterpolate(unref(state).email || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      disabled: !isEditing.value,
                      type: "email",
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).email
                    }, toDisplayString(unref(state).email || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Mobile (SMS)",
              name: "phone"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).phone,
                      "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                      disabled: !isEditing.value,
                      type: "tel",
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).phone)}${_scopeId2}>${ssrInterpolate(unref(state).phone || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).phone,
                      "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                      disabled: !isEditing.value,
                      type: "tel",
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).phone
                    }, toDisplayString(unref(state).phone || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Company",
              name: "brokerage"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).company,
                      "onUpdate:modelValue": ($event) => unref(state).company = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).company)}${_scopeId2}>${ssrInterpolate(unref(state).company || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).company,
                      "onUpdate:modelValue": ($event) => unref(state).company = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).company
                    }, toDisplayString(unref(state).company || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Primary Location",
              name: "region"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).region,
                      "onUpdate:modelValue": ($event) => unref(state).region = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).region)}${_scopeId2}>${ssrInterpolate(unref(state).region || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).region,
                      "onUpdate:modelValue": ($event) => unref(state).region = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).region
                    }, toDisplayString(unref(state).region || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Calendar Link",
              name: "calendar_link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isEditing.value) {
                    _push3(ssrRenderComponent(_component_UInput, {
                      modelValue: unref(state).calendar_link,
                      "onUpdate:modelValue": ($event) => unref(state).calendar_link = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<span class="block truncate text-sm font-medium text-slate-400 max-w-50"${ssrRenderAttr("title", unref(state).calendar_link)}${_scopeId2}>${ssrInterpolate(unref(state).calendar_link || "—")}</span>`);
                  }
                } else {
                  return [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).calendar_link,
                      "onUpdate:modelValue": ($event) => unref(state).calendar_link = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).calendar_link
                    }, toDisplayString(unref(state).calendar_link || "—"), 9, ["title"]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (isEditing.value) {
              _push2(`<div class="flex justify-end gap-3 pt-6 border-t border-white/5 mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "ghost",
                color: "neutral",
                class: "rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider",
                onClick: ($event) => isEditing.value = false
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cancel Changes `);
                  } else {
                    return [
                      createTextVNode(" Cancel Changes ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                type: "submit",
                color: "neutral",
                class: "rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(48,207,67,0.2)]"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Update Profile `);
                  } else {
                    return [
                      createTextVNode(" Update Profile ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode(_component_UFormField, {
                  label: "Name",
                  name: "name"
                }, {
                  default: withCtx(() => [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).name,
                      "onUpdate:modelValue": ($event) => unref(state).name = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).name
                    }, toDisplayString(unref(state).name || "—"), 9, ["title"]))
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: "Email",
                  name: "email"
                }, {
                  default: withCtx(() => [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      disabled: !isEditing.value,
                      type: "email",
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).email
                    }, toDisplayString(unref(state).email || "—"), 9, ["title"]))
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_UFormField, {
                label: "Mobile (SMS)",
                name: "phone"
              }, {
                default: withCtx(() => [
                  isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                    key: 0,
                    modelValue: unref(state).phone,
                    "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                    disabled: !isEditing.value,
                    type: "tel",
                    variant: "none",
                    class: "truncate"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                    key: 1,
                    class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                    title: unref(state).phone
                  }, toDisplayString(unref(state).phone || "—"), 9, ["title"]))
                ]),
                _: 1
              }),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" }, [
                createVNode(_component_UFormField, {
                  label: "Company",
                  name: "brokerage"
                }, {
                  default: withCtx(() => [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).company,
                      "onUpdate:modelValue": ($event) => unref(state).company = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).company
                    }, toDisplayString(unref(state).company || "—"), 9, ["title"]))
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: "Primary Location",
                  name: "region"
                }, {
                  default: withCtx(() => [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).region,
                      "onUpdate:modelValue": ($event) => unref(state).region = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).region
                    }, toDisplayString(unref(state).region || "—"), 9, ["title"]))
                  ]),
                  _: 1
                }),
                createVNode(_component_UFormField, {
                  label: "Calendar Link",
                  name: "calendar_link"
                }, {
                  default: withCtx(() => [
                    isEditing.value ? (openBlock(), createBlock(_component_UInput, {
                      key: 0,
                      modelValue: unref(state).calendar_link,
                      "onUpdate:modelValue": ($event) => unref(state).calendar_link = $event,
                      disabled: !isEditing.value,
                      variant: "none",
                      class: "truncate"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "block truncate text-sm font-medium text-slate-400 max-w-50",
                      title: unref(state).calendar_link
                    }, toDisplayString(unref(state).calendar_link || "—"), 9, ["title"]))
                  ]),
                  _: 1
                })
              ]),
              isEditing.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex justify-end gap-3 pt-6 border-t border-white/5 mt-8"
              }, [
                createVNode(_component_UButton, {
                  variant: "ghost",
                  color: "neutral",
                  class: "rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider",
                  onClick: ($event) => isEditing.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cancel Changes ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_UButton, {
                  type: "submit",
                  color: "neutral",
                  class: "rounded-xl px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(48,207,67,0.2)]"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Update Profile ")
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div></main></div><div class="flex flex-col mt-4 pt-8 border-t border-gray-700 text-gray-400"><span>Date: ${ssrInterpolate(unref(formatDate)())}</span><span>Time zone: ${ssrInterpolate(unref(timeZone)())}</span><span>Version: ${ssrInterpolate(unref(packageJson).version)}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy-policy",
        class: "underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col gap-8 mt-10 pt-8 border-t border-gray-700"><button class="px-6 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition duration-300"> Sign Out </button>`);
      _push(ssrRenderComponent(_component_baseDeleteProfile, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DtgZTUdO.mjs.map
