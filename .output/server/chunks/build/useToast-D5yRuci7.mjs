import { computed, ref } from 'vue';
import { N as useRuntimeConfig } from './server.mjs';

const toasts = ref([]);
const useToast = () => {
  const config = useRuntimeConfig();
  const globalMaxToasts = computed(() => config.public.notify?.maxToasts ?? 5);
  const defaultDuration = computed(
    () => config.public.notify?.duration ?? 5e3
  );
  const showIcon = computed(
    () => config.public.notify?.showIcon !== void 0 ? config.public.notify.showIcon : true
  );
  const add = (options) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const duration = options.duration !== void 0 ? options.duration : defaultDuration.value;
    const effectiveMaxToasts = options.maxToasts !== void 0 ? options.maxToasts : globalMaxToasts.value;
    if (typeof effectiveMaxToasts === "number" && effectiveMaxToasts > 0 && toasts.value.length >= effectiveMaxToasts) {
      const excess = toasts.value.length - effectiveMaxToasts + 1;
      if (excess > 0) {
        toasts.value.splice(0, excess);
      }
    }
    const toast = {
      id,
      color: "primary",
      orientation: "vertical",
      close: true,
      closeIcon: "i-lucide-x",
      progress: true,
      ...options,
      duration
    };
    toasts.value.push(toast);
    return id;
  };
  const remove = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };
  const clear = () => {
    toasts.value = [];
  };
  const success = (title, description, options) => add({
    title,
    description,
    color: "success",
    ...showIcon.value ? { icon: "i-lucide-circle-check" } : {},
    ...options
  });
  const error = (title, description, options) => add({
    title,
    description,
    color: "error",
    ...showIcon.value ? { icon: "i-lucide-circle-x" } : {},
    ...options
  });
  const info = (title, description, options) => add({
    title,
    description,
    color: "info",
    ...showIcon.value ? { icon: "i-lucide-info" } : {},
    ...options
  });
  const warning = (title, description, options) => add({
    title,
    description,
    color: "warning",
    ...showIcon.value ? { icon: "i-lucide-triangle-alert" } : {},
    ...options
  });
  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    info,
    warning
  };
};

export { useToast as u };
//# sourceMappingURL=useToast-D5yRuci7.mjs.map
