// @ts-check

const config = {
  title: 'BrittleBench',
  tagline: "A Defender's Audit of Public Detection Content Robustness",
  favicon: 'img/favicon.svg',

  url: 'https://anpa1200.github.io',
  baseUrl: '/brittle/',

  organizationName: 'anpa1200',
  projectName: 'brittle',

  headTags: [
    {
      tagName: 'script',
      attributes: {
        async: 'true',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-TMTG21RVHM',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TMTG21RVHM');
      `,
    },
  ],
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
            title: 'Ecosystem',
            items: [
              {label: 'CTI Analyst Field Manual', href: 'https://anpa1200.github.io/cti-analyst-field-manual/'},
              {label: 'CTI as a Code', href: 'https://anpa1200.github.io/CTI_as_a_Code/'},
              {label: 'Operation Desert Hydra', href: 'https://anpa1200.github.io/operation-desert-hydra/'},
              {label: 'Customer-Driven AI CTI', href: 'https://anpa1200.github.io/customer-driven-ai-cti-project/'},
              {label: 'Israel Threat Actors CTI', href: 'https://anpa1200.github.io/israel-government-threat-actors-cti/'},
              {label: 'AI vs Defense', href: 'https://anpa1200.github.io/ai-vs-defense/'},
              {label: 'HexStrike AI', href: 'https://github.com/0x4m4/hexstrike-ai'},
            ],
          },
          {
            title: 'Author',
            items: [
              {label: 'Medium', href: 'https://medium.com/@1200km'},
              {label: 'GitHub', href: 'https://github.com/anpa1200'},
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrey-pautov/'},
              {label: 'Main Page', href: 'https://anpa1200.github.io/'},
            ],
          },
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
