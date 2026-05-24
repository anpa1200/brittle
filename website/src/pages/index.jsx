import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const focusAreas = [
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
];

function FocusCard({title, text}) {
  return (
    <article className={styles.focusCard}>
      <Heading as="h3">{title}</Heading>
      <p>{text}</p>
    </article>
  );
}

export default function Home() {
  return (
    <Layout
      title="BrittleBench"
      description="A defender's audit of public detection content robustness">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.status}>Phase R1 - Pre-implementation</p>
            <Heading as="h1">BrittleBench</Heading>
            <p className={styles.subtitle}>
              A defender's audit of public detection content robustness.
            </p>
            <p className={styles.summary}>
              A research project measuring how robust public Sigma, YARA,
              Elastic, and Splunk detection content remains under validated,
              functionally equivalent mutations of the behaviors those rules are
              intended to detect.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/protocol">
                Read the protocol
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/github-project-pipeline">
                View task pipeline
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.focusSection}>
          <div className={styles.focusGrid}>
            {focusAreas.map((item) => (
              <FocusCard key={item.title} {...item} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
