/*
Copyright (c) Facebook, Inc. and its affiliates.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './styles.module.css';
 
function Home() {
  const {
    siteConfig: {
      customFields: {description},
      tagline,
    },
  } = useDocusaurusContext();

  return (
    <Layout title={tagline} description={description as string}>
      <main className="front-page-main">
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1 dangerouslySetInnerHTML={{
                __html: translate({
                  id: 'homepage.hero.title',
                  description:
                    'Open-source tools for court forms, guided interviews, and e-filing',
                  message:
                    'Open-source tools for <strong>court forms</strong>, <strong>guided interviews</strong>, and <strong>e-filing</strong>',
                }),
              }}></h1>
              <div className={styles.heroCTAButtons}>
                <Link className="button button--primary" to="/docs/get_started">
                  <Translate>Get started</Translate>
                </Link>
                <Link className="button button--primary button--outline" to="/docs/volunteer/sign_up">
                  <Translate>Volunteer</Translate>
                </Link>
              </div>
            </div>
            <img
              alt={translate({message: 'The Document Assembly Line'})}
              className={styles.heroImage}
              src={useBaseUrl('/img/undraw_sync-files_64mj.svg')}
              width="100%"
            />
          </div>
        </header>
        <section className={clsx(['container', styles.indexSection])}>
          <blockquote className={styles.pullQuote}>
            <p><Translate>A well-designed form allows people to express themselves in a way the court can understand.</Translate></p>
            <p><cite
             dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.benefits.davidColarusso',
                description:
                  'David Colarusso, Suffolk LIT Lab Co-Director',
                message:
                  '<strong>David Colarusso</strong>, <a href="https://suffolklitlab.org" target="_blank">Suffolk LIT Lab</a> Co-Director',
              }),
            }}></cite></p>
          </blockquote>
        </section>
        <section className={styles.indexSection}>
          <div className={clsx([
            'container',
            'row',
            'margin-bottom--xl',
            styles.dalBenefitsContainerRow
          ])}>
            <div className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalBenefitsImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_portfolio-update_6bro.svg')}/>
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalBenefitsHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>Guided interviews for court forms</Translate>
                  </h2>
                </div>
              </div>
              <div className={styles.dalBenefitsText}>  
                <p><Translate>
                  Build beautiful, responsive, accessible online guided interviews with docassemble and the Document Assembly Line tools.
                </Translate></p>
                <ul>
                  <li><Translate>Accessible and responsive by design</Translate></li>
                  <li><Translate>Library of pre-built, user-tested questions and interview components</Translate></li>
                  <li><Translate>Gentle learning curve</Translate></li>
                  <li><Translate>Code handles complex court forms better than drag-and-drop tools</Translate></li>
                  <li dangerouslySetInnerHTML={{
                    __html: translate({
                      id: 'homepage.benefits.visitCourtFormsOnline',
                      description:
                        'See examples at Court Forms Online',
                      message:
                        'See examples at <a href="https://courtformsonline.org" target="_blank">Court Forms Online</a>',
                    }),
                  }}></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalBenefitsImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_judge_hyqv.svg')} />
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalBenefitsHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>E-filing for guided interviews</Translate>
                  </h2>
                </div>
              </div>
              <div className={styles.dalBenefitsText}>  
                <p><Translate>
                  Suffolk's open-source e-filing service provider (EFSP) delivers completed forms to court e-filing systems directly from docassemble interviews.
                </Translate></p>
                <ul>
                  <li><Translate>Removes a major obstacle for self-represented litigants (SRLs)</Translate></li>
                  <li><Translate>Reduces the burden on court staff</Translate></li>
                  <li><Translate>Certified for Tyler eFile & Serve, and customizable for other e-filing systems</Translate></li>
                  <li><strong>
                    <Translate>Coming soon: simplified e-filing tool for SRLs</Translate>
                  </strong></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={clsx([
            'container',
            'row',
            styles.dalBenefitsContainerRow
          ])}>
            <div className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalBenefitsImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_group-hangout_o22u.svg')}/>
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalBenefitsHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>Community built and supported</Translate>
                  </h2>
                </div>
              </div>
              <div className={styles.dalBenefitsText}>  
                <p><Translate>
                  Learn and get help from the Suffolk LIT Lab and an active community of courts, legal aid organizations, and volunteers.
                </Translate></p>
                <ul>
                  <li><Translate>Training for new interview builders</Translate></li>
                  <li><Translate>Weekly community meetings to share tips and troubleshoot issues</Translate></li>
                  <li><Translate>Online community support forum</Translate></li>
                  <li><a href="https://suffolklitlab.org/tag/first-wednesday-workshops/" target="_blank">
                    <Translate>Monthly workshops</Translate>
                  </a></li>
                  <li><Translate>Documentation</Translate></li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalBenefitsImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_code-review_ept3.svg')} />
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalBenefitsHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>Free and open source software</Translate>
                  </h2>
                </div>
              </div>
              <div className={styles.dalBenefitsText}>  
                <p dangerouslySetInnerHTML={{
                  __html: translate({
                    id: 'homepage.benefits.dalIsFOSS',
                    description:
                      'All Document Assembly Line and docassemble code is free and open source, released under the MIT license.',
                    message:
                      'All Document Assembly Line and docassemble code is free and open source, released under the <a href="https://opensource.org/license/MIT" target="_blank">MIT license</a>.',
                  }),
                }}></p>
                <ul>
                  <li><Translate>No vendor lock-in</Translate></li>
                  <li><Translate>Customizable for specific requirements</Translate></li>
                  <li><Translate>Community-driven development roadmap</Translate></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div id="partners" className={styles.indexSection}>
          <div className={clsx([
            'container',
            'row',
            'margin-bottom--xl',
            styles.dalPartnersContainerRow
          ])}>
            <section className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalPartnersImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_showing-support_ixfc.svg')} />
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalPartnersHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>Partners</Translate>
                  </h2>
                </div>
              </div>
              <p className={styles.dalPartnersText}><Translate>The Document Assembly Line is funded by a grant from the State Justice Institute and service contracts with the following courts and legal aid organizations:</Translate></p>
              <ul className={styles.dalPartnersText}>
                <li>Legal Services Vermont (<Translate>through a grant from the Legal Services Corporation</Translate>)</li>
                <li>The Massachusetts Trial Court</li>
                <li>The Alaska Court System</li>
                <li>Legal Services State Support (Mid-Minnesota Legal Aid)</li>
                <li>Illinois Supreme Court Commission on Access to Justice</li>
                <li>Illinois Legal Aid Online (ILAO)</li>
                <li>Michigan Legal Help (Michigan Statewide Advocacy Services)</li>
                <li>Lagniappe Law Lab</li>
              </ul>
            </section>
            <section className="col">
              <div className="row row--align-center flex-wrap--nowrap margin-bottom--md">
                <div className={clsx([
                  'col', 
                  'col--4',
                  'padding-horiz--sm',
                  styles.dalServicesImageCol
                ])}>
                  <img src={useBaseUrl('/img/undraw_maintenance_4unj.svg')} />
                </div>
                <div className={clsx([
                  'col',
                  'padding-horiz--sm',
                  styles.dalServicesHeaderCol
                ])}>
                  <h2 className="margin-bottom--md">
                    <Translate>Services</Translate>
                  </h2>
                </div>
              </div>
              <p className={styles.dalPartnersText}><Translate>
                To facilitate the adoption of open-source access-to-justice tools, we offer affordable docassemble hosting and e-filing tools for courts and legal aid organizations. If you are interested, send us an email.
              </Translate></p>
              <Link
                className={clsx([
                  'button', 
                  'button--primary', 
                  styles.dalPartnersText
                ])}
                to="mailto:litlab@suffolk.edu"
              >
                <Translate>Email us</Translate>
              </Link>
            </section>
          </div>
        </div>
        <section className={clsx(['container', styles.indexFullWidthSection])}>
          <a className={styles.litLabLogo} href="https://suffolklitlab.org" target="_blank">
            <img className="light" alt="Suffolk LIT Lab logo" src={useBaseUrl('/img/lit-lab-logo-stacked.svg')}/>
            <img className="dark"  alt="Suffolk LIT Lab logo" src={useBaseUrl('/img/lit-lab-logo-stacked-inverted.svg')}/>
          </a>
        </section>
      </main>
    </Layout>
  );
}
 
export default Home;
 