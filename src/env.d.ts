/// <reference types="vite/client" />

import type { Router, RouteLocationNormalizedLoaded } from "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded;
    $router: Router;
  }
}
