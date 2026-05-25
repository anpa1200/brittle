// @ts-check

const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Protocol',
      collapsed: false,
      items: ['protocol', 'research-plan', 'preregistration-summary', 'rule-source-inventory', 'glossary', 'threats-to-validity'],
    },
    {
      type: 'category',
      label: 'Project Logs',
      collapsed: false,
      items: ['decisions', 'open-questions', 'costs', 'changelog', 'reproducibility', 'local-corpus-build-scenario'],
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
