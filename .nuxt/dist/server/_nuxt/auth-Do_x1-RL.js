import { Y as defineNuxtRouteMiddleware, e as useUserSession, n as navigateTo } from "../server.mjs";
import "vue";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/hookable/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/unctx/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@nuxt/nitro-server/dist/runtime/h3-compat.mjs";
import "vue-router";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/defu/dist/defu.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ufo/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/h3/dist/index.mjs";
import "@iconify/vue";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/klona/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/perfect-debounce/dist/index.mjs";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "tailwindcss/colors";
import "/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/node_modules/@unhead/vue/dist/index.mjs";
import "framesync";
import "popmotion";
import "style-value-types";
import "vue/server-renderer";
import "tailwind-variants";
import "@iconify/utils/lib/css/icon";
import "ohash/utils";
const auth = defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();
  if (!loggedIn.value) {
    return navigateTo("/login");
  } else {
    return navigateTo("/dashboard");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-Do_x1-RL.js.map
