import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const content = {
  en: {
    description: "A defender's audit of public detection content robustness",
    status: 'Phase R1 - Pre-implementation',
    subtitle: "A defender's audit of public detection content robustness.",
    summary:
      'A research project measuring how robust public Sigma, YARA, Elastic, and Splunk detection content remains under validated, functionally equivalent mutations of the behaviors those rules are intended to detect.',
    primaryAction: 'Read the protocol',
    secondaryAction: 'View task pipeline',
    focusAreas: [
      {
        title: 'Protocol first',
        text: 'The project starts with a locked research protocol before corpus collection, mutation generation, evaluation, or analysis begins.',
      },
      {
        title: 'Detection robustness',
        text: 'BrittleBench studies whether public detection rules generalize across functionally equivalent variants of the behaviors they target.',
      },
      {
        title: 'Responsible release',
        text: 'Raw mutation artifacts and dual-use details are handled separately from sanitized public benchmark outputs.',
      },
    ],
  },
  he: {
    description: 'מחקר ממוקד defenders על robustness של public detection content',
    status: 'שלב R1 - לפני implementation',
    subtitle: 'מחקר ממוקד defenders על robustness של public detection content.',
    summary:
      'BrittleBench הוא פרויקט מחקר למדידת robustness של public Sigma, YARA, Elastic ו-Splunk detection content מול validated, functionally equivalent mutations של ההתנהגויות שה-rules אמורים לזהות.',
    primaryAction: 'קריאת ה-protocol',
    secondaryAction: 'צפייה בצינור המשימות',
    focusAreas: [
      {
        title: 'קודם protocol',
        text: 'הפרויקט מתחיל ב-research protocol נעול לפני corpus collection, mutation generation, evaluation או analysis.',
      },
      {
        title: 'Robustness של detection',
        text: 'BrittleBench בודק האם public detection rules מכלילים מעבר לייצוג המקורי וממשיכים לזהות functionally equivalent variants.',
      },
      {
        title: 'פרסום אחראי',
        text: 'Raw mutation artifacts ו-dual-use details מנוהלים בנפרד מ-sanitized public benchmark outputs.',
      },
    ],
  },
};

function FocusCard({title, text}) {
  return (
    <article className={styles.focusCard}>
      <Heading as="h3">{title}</Heading>
      <p>{text}</p>
    </article>
  );
}

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const page = content[i18n.currentLocale] ?? content.en;

  return (
    <Layout
      title="BrittleBench"
      description={page.description}>
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.status}>{page.status}</p>
            <Heading as="h1">BrittleBench</Heading>
            <p className={styles.subtitle}>{page.subtitle}</p>
            <p className={styles.summary}>{page.summary}</p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/protocol">
                {page.primaryAction}
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/github-project-pipeline">
                {page.secondaryAction}
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.focusSection}>
          <div className={styles.focusGrid}>
            {page.focusAreas.map((item) => (
              <FocusCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
