import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { u as useHead, K as useNuxtData, c as __nuxt_component_1$2 } from './server.mjs';
import { _ as __nuxt_component_2 } from './Section-D5LAJ1ec.mjs';
import { defineComponent, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import './Auth-YSaql3Au.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "GhostForm | Main",
      meta: [
        { name: "description", content: "GhostForm Main Dashboard." }
      ]
    });
    const { data: user } = useNuxtData("user");
    const { data: leads } = useNuxtData("leads");
    const cardData = computed(
      () => [
        { title: "Total Intake", value: `${leads.value.all?.length ?? 0}` },
        { title: "Active Leads", value: `${leads.value?.active?.length ?? 0}` },
        { title: "New Leads", value: `${leads.value?.new?.length ?? 0}` }
      ]
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_ClientOnly = __nuxt_component_1$2;
      const _component_baseHeaderSection = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: unref(user)?.company,
        subLabel: unref(user)?.category
      }, null, _parent));
      _push(`<main class="max-w-350 mx-auto relative z-10"><section class="flex flex-wrap justify-between gap-6 mb-12">`);
      if (unref(leads)) {
        _push(`<!--[-->`);
        ssrRenderList(unref(cardData), (data) => {
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section><div class="flex w-full"><div class="space-y-6 w-full"><div class="flex justify-between items-end mb-4">`);
      if (unref(leads)) {
        _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Lead Tracking" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="backdrop-blur-xl bg-white/2 border border-white/8 rounded-[2.5rem] overflow-hidden w-full">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DRwCcsk8.mjs.map
