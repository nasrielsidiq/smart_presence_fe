'use client'
import '../globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect, useState, useCallback } from 'react';
import { initializeSidebar } from '../../utils/sidebar';
import Link from 'next/link';
import Head from 'next/head';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function DashboardLayout({ children }) {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const cleanup = initializeSidebar();
    return cleanup;
  }, []);

  const handleItemClick = useCallback((item) => {
    setActiveItem(item);
  }, []);

  return (
    <>
      <Head>
        <title>Smart Presence | Dashboard</title>
        <meta name="description" content="Dashboard management employee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen bg-[linear-gradient(to_bottom,#0163C6_50%,#FFFFFF_50%)] bg-fixed">
        <aside id="sidebar" className="bg-white shadow-lg rounded-xl overflow-hidden w-[280px] h-screen m-3 font-normal flex flex-col fixed">
          <div className="pt-10 w-full flex flex-col items-center justify-center">
            <span className="font-poppins text-[20px] font-bold text-black">Smart Presence</span>
          </div>
          <div className="mt-10 w-full flex-1">
            <ul className="w-full">
              <li className="mb-2 w-full">
                <button
                  data-dropdown
                  className={`flex justify-between w-full py-3 hover:bg-[rgba(0,170,255,0.1)] rounded-lg px-8 ${activeItem === 'dashboard' ? 'bg-blue-100' : ''}`}
                  onClick={() => handleItemClick('dashboard')}
                >
                  <div className="flex gap-4 items-center">
                    <i className="bi bi-house-door-fill text-goldenYellow text-lg"></i>
                    <span className="text-gray-500">Dashboard</span>
                  </div>
                  <i className="bi bi-chevron-down text-dodgerBlue rotate-0 transition-transform"></i>
                </button>
                <ul className="rounded-md w-full hidden">
                  <li>
                    <Link href="/dashboard" legacyBehavior>
                      <a className="menu-item flex gap-4 items-center px-12 py-2 rounded-lg hover:bg-blue-100 transition group" data-page="pages/overview.html">
                        <i className="bi bi-file-earmark-text text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                        <span className="text-gray-500">Overview</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/allReport" legacyBehavior>
                      <a className="menu-item flex gap-4 items-center px-12 py-2 rounded-lg hover:bg-blue-100 transition group" data-page="pages/allReport.html">
                        <i className="bi bi-bar-chart-steps text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                        <span className="text-gray-500">All Report</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/individualReport" legacyBehavior>
                      <a className="menu-item flex gap-4 items-center px-12 py-2 rounded-lg hover:bg-blue-100 transition group" data-page="pages/individualReport.html">
                        <i className="bi bi-person-lines-fill text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                        <span className="text-gray-500">Individual Report</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mb-2 w-full">
                <button
                  data-dropdown
                  className={`flex justify-between w-full py-3 hover:bg-[rgba(0,170,255,0.1)] rounded-lg px-8 ${activeItem === 'management' ? 'bg-blue-100' : ''}`}
                  onClick={() => handleItemClick('management')}
                >
                  <div className="flex gap-4 items-center">
                    <i className="bi bi-folder-symlink-fill text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                    <span className="text-gray-500">Management</span>
                  </div>
                  <i className="bi bi-chevron-down text-dodgerBlue rotate-0 transition-transform"></i>
                </button>
                <ul className="rounded-md w-full hidden">
                  <li>
                    <Link href="/dashboard/employeeData" legacyBehavior>
                      <a className="menu-item flex gap-4 items-center px-12 py-2 rounded-lg hover:bg-blue-100 transition group" data-page="pages/employeeData.html">
                        <i className="bi bi-people-fill text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                        <span className="text-gray-500 group-active:text-blue-600">Employee Data</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/accounts" legacyBehavior>
                      <a className="menu-item flex gap-4 items-center px-12 py-2 rounded-lg hover:bg-blue-100 transition group" data-page="pages/account.html">
                        <i className="bi bi-person-badge text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                        <span className="text-gray-500">Account</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mt-auto w-full">
            <ul className="w-full">
              <li className="mb-2 w-full">
                <Link href="/dashboard/settings" legacyBehavior>
                  <a className={`flex gap-4 items-center hover:bg-[rgba(0,170,255,0.1)] px-8 py-3 rounded-lg transition ${activeItem === 'settings' ? 'bg-blue-100' : ''}`} onClick={() => handleItemClick('settings')}>
                    <i className="bi bi-gear-fill text-goldenYellow text-lg group-hover:text-blue-500 transition"></i>
                    <p className="text-gray-500">Settings</p>
                  </a>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link href="#" legacyBehavior>
                  <a className="flex gap-4 items-center hover:bg-[rgba(255,0,0,0.1)] px-8 py-3 rounded-lg">
                    <i className="bi bi-box-arrow-right text-red-500 text-lg"></i>
                    <p className="text-gray-500">Logout</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <div className="flex-grow flex flex-col ml-[300px]">
          <main className="flex-grow p-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}