/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'SMA Technologies Help',
  tagline: 'AWSEC2',
  url: 'https://help.smatechnologies.com',
  baseUrl: '/opcon/connectors/awsec2/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'smatechnologies',
  projectName: 'awsec2-docs',
  markdown: {
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themeConfig: {
    navbar: {
      title: 'Help',
      logo: {
        alt: 'SMA Technologies Help Logo',
        src: 'img/logo.svg',
        href: 'https://help.smatechnologies.com',
      },
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} SMA Technologies.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          breadcrumbs: true,
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/smatechnologies/awsec2-docs/blob/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-7XYMFXX81Y',
        },
      },
    ],
  ],
  //plugins: [[require.resolve('@cmfcmf/docusaurus-search-local'), {}]],
};
