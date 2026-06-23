"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site-config";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${siteConfig.basePath}/sw.js`, {
        scope: `${siteConfig.basePath}/`,
      });
    }
  }, []);

  return null;
}
