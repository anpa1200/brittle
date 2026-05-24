// @ts-check

const config = {
  title: 'BrittleBench',
  tagline: "A Defender's Audit of Public Detection Content Robustness",
  favicon: 'img/favicon.svg',

  url: 'https://anpa1200.github.io',
  baseUrl: '/brittle/',

  organizationName: 'anpa1200',
  projectName: 'brittle',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/anpa1200/brittle/edit/main/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    navbar: {
      title: 'BrittleBench',
      logo: {
        alt: 'BrittleBench mark',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/anpa1200/brittle',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/users/anpa1200/projects/3',
          label: 'Project Board',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Research',
          items: [
            {
              label: 'Protocol',
              to: '/docs/protocol',
            },
            {
              label: 'Research Plan',
              to: '/docs/research-plan',
            },
            {
              label: 'Open Questions',
              to: '/docs/open-questions',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/anpa1200/brittle',
            },
            {
              label: 'Task Board',
              href: 'https://github.com/users/anpa1200/projects/3',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andrey Pautov. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'yaml'],
    },
  },
};

module.exports = config;
