import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                index: resolve(import.meta.dirname, "index.html"),
                settings: resolve(import.meta.dirname, "settings.html"),
                game: resolve(import.meta.dirname, "game.html"),
                impressum: resolve(import.meta.dirname, "impressum.html"),
            },
        },
    },
});
