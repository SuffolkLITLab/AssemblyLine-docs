module.exports = {
  title: 'Document Assembly Line',
  tagline: 'Open-source tools for court forms, guided interviews, and e-filing',
  url: 'https://assemblyline.suffolklitlab.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  'markdown': {
    'hooks': {
      onBrokenMarkdownLinks: 'warn',
    }
  },
  favicon: 'img/favicon.ico',
  organizationName: 'SuffolkLITLab', // the GitHub org name.
  projectName: 'AssemblyLine-docs', // the repo name.
  themeConfig: {
    // Keep for the next LIT Con
    // announcementBar: {
    //   id: 'lit_con',
    //   content:
    //     'Save the date for Suffolk\'s annual 🔥LIT Conference🔥 on April 7th, 2025! <strong><a target="_blank" rel="noopener noreferrer" href="https://suffolklitlab.org/events/lit-con/">Learn more</a></strong>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: false,
    // },
    navbar: {
      title: 'Document Assembly Line',
      logo: {
        alt: 'The Suffolk LIT Lab Logo',
        src: 'img/lit-lab-logo-small-inverted.svg',
        srcDark: 'img/lit-lab-logo-small-inverted.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'get_started',
          label: 'Get started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          label: 'Documentation',
        },
        {
          href: 'https://suffolklitlab.org/legal-tech-class/docs/introduction-to-docassemble',
          label: 'Legal tech class',
          position: 'right',
        },
        {
          href: 'https://docassemble.org/docs.html',
          label: 'Docassemble docs',
          position: 'right',
        },
        {
          href: 'https://www.givecampus.com/campaigns/70271/donations/new',
          label: 'Donate',
          position: 'right',
          className: 'navbar-donate-button',
        },
        {
          href: 'https://github.com/SuffolkLITLab/docassemble-AssemblyLine',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'More',
          items: [
            {
              label: 'Suffolk LIT Lab',
              href: 'https://suffolklitlab.org',
            },
          ],
        },
      ],
      copyright: `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> | This documentation website is built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a>.`,
    },
  },
  plugins: [
    '@docusaurus/plugin-ideal-image',
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: '/docs'
          },
          {
            from: '/docs/pdfs',
            to: '/docs/authoring/pdfs'
          },
          {
            from: '/docs/label_variables',
            to: '/docs/authoring/label_variables'
          },
          {
            from: '/docs/docx',
            to: '/docs/authoring/docx'
          },
          {
            from: '/docs/alkiln/intro',
            to: '/docs/components/ALKiln/intro'
          },
          {
            // Original
            from: '/docs/automated_integrated_testing',
            to: '/docs/components/ALKiln/alkiln'
          },
          {
            from: '/docs/alkiln',
            to: '/docs/components/ALKiln/alkiln'
          },
          {
            from: '/docs/alkiln/advanced',
            to: '/docs/components/ALKiln/advanced'
          },
          {
            from: '/docs/alkiln/writing',
            to: '/docs/components/ALKiln/writing'
          },
          {
            from: '/docs/alkiln/setup',
            to: '/docs/components/ALKiln/setup'
          },
          {
            from: '/docs/alkiln/troubleshooting',
            to: '/docs/components/ALKiln/trouble'
          },
          {
            from: '/docs/alkiln/security',
            to: '/docs/components/ALKiln/security'
          },
          {
            from: '/docs/get_started/working_with_teams',
            to: '/docs/archive/working_with_teams'
          },
          {
            from: '/docs/volunteer',
            to: '/docs/volunteer/sign_up'
          },
          {
            from: '/docs/volunteer/resources',
            to: '/docs/get_started/resources'
          }
        ],
        

      },
      
    ],
  ],
  themes: [
	  [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
      }
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/SuffolkLITLab/AssemblyLine-docs/edit/main/',
        },
        blog: false,
        pages: {
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-622Z2D6Q3Q',
          anonymizeIP: true
        }
      },
    ],
  ],
};
