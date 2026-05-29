import { _ as __nuxt_component_0 } from './Header-p0bLgg1D.mjs';
import { _ as __nuxt_component_1 } from './Section--EyTX4mh.mjs';
import { u as useHead, K as useNuxtData, c as __nuxt_component_3$1 } from './server.mjs';
import { defineComponent, unref, computed, useSSRContext } from 'vue';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CardsOverview",
  __ssrInlineRender: true,
  props: {
    leads: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const leads_new = props.leads?.status.find((item) => item.label.includes("new"));
    const leads_active = props.leads?.status.find((item) => item.label.includes("active"));
    const cardData = computed(
      () => [
        { title: "Total Intake", value: `${props.leads.all?.length ?? 0}` },
        { title: "Active Leads", value: `${leads_active.leads.length ?? 0}` },
        { title: "New Leads", value: `${leads_new.leads.length ?? 0}` }
      ]
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_3$1;
      if (__props.leads) {
        _push(`<!--[-->`);
        ssrRenderList(unref(cardData), (data) => {
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/CardsOverview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AppCardsOverview" });
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_appHeader = __nuxt_component_0;
      const _component_baseHeaderSection = __nuxt_component_1;
      const _component_appCardsOverview = __nuxt_component_2;
      const _component_ClientOnly = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_appHeader, {
        label: unref(user)?.company,
        subLabel: unref(user)?.category
      }, null, _parent));
      _push(`<main class="max-w-350 mx-auto relative z-10"><section class="flex flex-wrap justify-between gap-6 mb-12">`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Overview" }, null, _parent));
      if (unref(leads)?.all) {
        _push(ssrRenderComponent(_component_appCardsOverview, { leads: unref(leads) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="space-y-6 w-full">`);
      _push(ssrRenderComponent(_component_baseHeaderSection, { text: "Lead Tracking" }, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</section></main></div>`);
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
//# sourceMappingURL=index-DVpA8_Tr.mjs.map
