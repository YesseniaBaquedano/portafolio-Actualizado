import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from 'glob';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import HtmlCssPurgePlugin from 'vite-plugin-purgecss';

// función para obtener todas las entradas HTML
function obtenerEntradas() {
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file) => {
            return [
                file.slice(0, file.length - path.extname(file).length),
                resolve(__dirname, file)
            ]
        })
    );
}

export default defineConfig(
    {
        appType: 'mpa',
        base: process.env.DEPLOY_BASE_URL ,
        build: {
            minify: true,
            rollupOptions: {
                input: obtenerEntradas()
            }
        },
    
    plugins: [
        HtmlCssPurgePlugin(),
        ViteMinifyPlugin()
    ]
});