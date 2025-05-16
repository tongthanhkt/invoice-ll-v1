import bannerImg from '@/public/assets/img/banner/auth.svg';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
    <div className="min-h-screen bg-blue-50  relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-40 before:bg-blue-100 before:bg-[url('/assets/img/banner/auth.svg')] before:bg-center before:bg-[center_10%] before:bg-no-repeat before:bg-[length:200px] before:opacity-40 lg:before:hidden">
      <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center p-4 pt-16 sm:p-6 sm:pt-20 lg:p-6 relative z-10">
        <div className="hidden sm:block flex-1 p-4">
          <Image
            src={bannerImg}
            alt="Authentication illustration"
            width={460}
            className="mx-auto"
          />
          <div className="text-center mt-8">
            <h1 className="text-xl font-semibold text-neutral-700 mb-1">
              Generate &amp; Manage Your Invoices Instantly
            </h1>
            <p className="text-sm text-neutral-500">
              Easily generate, store, and organize all your receipts and
              invoices with just one click.
              <br />
              Simplify your accounting and never lose a bill again!
            </p>
          </div>
        </div>
        <div className="w-full flex-1  bg-white rounded-2xl p-6 sm:p-10 lg:p-16 !text-gray-900 shadow-md flex items-center justify-center relative">
          <div className="flex flex-col justify-center mx-auto w-full">
            <h2 className="text-white text-center bg-blue-600 text-2xl sm:text-3xl font-semibold rounded-lg px-4 py-1 leading-tight w-fit mx-auto mb-2 sm:mb-2">
              Invoify
            </h2>
            <div className="text-2xl sm:text-3xl font-bold py-2 sm:py-4 text-blue-500 text-center">
              {title}
            </div>
            {children}

            <p className="text-center text-sm text-gray-600 mt-4">
              {footerConfig.description}{' '}
              <Link
                href={footerConfig.link}
                className="text-indigo-600 hover:underline font-medium"
              >
                {footerConfig.linkText}
              </Link>
            </p>
            <div className="text-center text-sm text-gray-500 mt-8 lg:absolute lg:bottom-4 lg:right-6 lg:left-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                ©{' '}
                <a href="#" className="text-blue-700 hover:underline">
                  Invoify
                </a>
                . All rights reserved.
              </div>
              <div className="flex gap-2">
                <a
                  href="/support"
                  className="text-blue-700 hover:underline flex flex-row-reverse items-center gap-1"
                >
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
                    className="inline-block ml-1 -mb-1"
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
