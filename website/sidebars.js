// @ts-check

const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Protocol',
      collapsed: false,
      items: ['protocol', 'research-plan', 'glossary', 'threats-to-validity'],
    },
    {
      type: 'category',
      label: 'Project Logs',
      collapsed: false,
      items: ['decisions', 'open-questions', 'costs', 'changelog', 'reproducibility'],
    },
    {
      type: 'category',
      label: 'Community',
      collapsed: true,
      items: ['contributing', 'security', 'code-of-conduct'],
    },
    'github-project-pipeline',
  ],
};

module.exports = sidebars;
