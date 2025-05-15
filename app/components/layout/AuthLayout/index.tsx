import bannerImg from '@/public/assets/img/banner/auth.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  footerConfig: {
    description: string;
    link: string;
    linkText: string;
  };
};

export const AuthLayout = ({
  children,
  title,
  footerConfig,
}: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.authLayout}>
        <div className={styles.authLayout__banner}>
          <Image
            src={bannerImg}
            alt="Authentication illustration"
            width={460}
            className={styles.authLayout__banner__image}
          />
          <div className={styles.authLayout__banner__content}>
            <h1 className={styles.bannerTitle}>
              Generate &amp; Manage Your Invoices Instantly
            </h1>
            <p className={styles.bannerDescription}>
              Easily generate, store, and organize all your receipts and
              invoices with just one click.
              <br />
              Simplify your accounting and never lose a bill again!
            </p>
          </div>
        </div>
        <div className={styles.authLayout__formContainer}>
          <div className={styles.form}>
            <h2 className={styles.form__tag}>Invoify</h2>
            <div className={styles.form__title}>{title}</div>
            {children}

            <p className={styles.form__link}>
              {footerConfig.description}{' '}
              <Link href={footerConfig.link} className={styles.link}>
                {footerConfig.linkText}
              </Link>
            </p>
            <div className={styles.form__footer}>
              <div>
                ©{' '}
                <a href="#" className={styles.copyright}>
                  Invoify
                </a>
                . All rights reserved.
              </div>
              <div className={styles.support}>
                <a href="/support">
                  Support{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
