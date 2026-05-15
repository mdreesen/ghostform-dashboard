import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    authenticated: ComponentProps<typeof import("/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/app/layouts/authenticated.vue").default>
    default: ComponentProps<typeof import("/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/app/layouts/default.vue").default>
    form: ComponentProps<typeof import("/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/app/layouts/form.vue").default>
    payment: ComponentProps<typeof import("/Users/mdreesen/Documents/Programming/projects/ghostform-dashboard/app/layouts/payment.vue").default>
  }
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false> | {
      [K in LayoutKey]: {
        name?: MaybeRef<K | false> | ComputedRef<K | false>
        props?: NuxtLayouts[K]
      }
    }[LayoutKey]
  }
}