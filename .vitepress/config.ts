import { sidebar } from './sidebar';
import { defineConfig } from 'vitepress'
import { socials } from './socials';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Eisvana",
  description: "Eisvana Government Portal",
  srcDir: 'pages',
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#280033' }],
    ['meta', { name: 'msapplication-config', content: '/icons/browserconfig.xml' }],
    ['meta', { name: 'msapplication-TileColor', content: '#280033' }],
    ['link', { rel: 'manifest', href: '/icons/site.webmanifest' }],
    ['link', { rel: 'icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/globalStyle.css' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Wiki', link: 'https://nomanssky.fandom.com/wiki/Eisvana' },
    ],

    sidebar: sidebar(),
    socialLinks: socials(),

    footer: {
      message: 'Released under the <a href="https://github.com/Eisvana/eisvana.github.io/blob/main/LICENSE">GPLv3 License</a>.',
      copyright: 'Copyright © 2023-present <a href="https://github.com/Eisvana">Eisvana</a>'
    }
  }
})
