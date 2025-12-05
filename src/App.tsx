/*
File: src/App.tsx
Purpose: Main application component with routing and analytics integration using environment variables
*/

import { Routes, Route } from 'react-router-dom';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import GoogleAnalytics from './components/GoogleAnalytics';
import Analytics from './components/Analytics';
import ErrorBoundary from './components/ErrorBoundary';
import MicrosoftClarity from './components/MicrosoftClarity';
import { config } from './lib/config';
import Chat from './pages/chat';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/index';
import Tools from './pages/tools';
import OneTime from './pages/one-time';
import OneTimeRetrieve from './pages/one-time-retrieve';
import Sign from './pages/sign';
import FileEncrypt from './pages/file-encrypt';
import PasswordKey from './pages/password-key';
import MAC from './pages/mac';
import Hash from './pages/hash';
import Random from './pages/random';
import SplitKey from './pages/split-key';
import TextEncrypt from './pages/text-encrypt';
import Keys from './pages/keys';
import PasswordGenerator from './pages/password-generator';
import SecureNotes from './pages/secure-notes';
import NotFound from './pages/404';
import IKryptCode from './pages/ikrypt-code';
import Contact from './pages/contact';
import IKryptGuard from './pages/ikrypt-guard';
import IKryptShield from './pages/ikrypt-shield';
import PasswordGeneratorLanding from './pages/password-generator-landing';
import FileEncryptionLanding from './pages/file-encryption-landing';
import OneTimeSecretLanding from './pages/one-time-secret-landing';
import DigitalSignatureLanding from './pages/digital-signature-landing';
import IKryptGuardLanding from './pages/ikrypt-guard-landing';
import HashGeneratorLanding from './pages/hash-generator-landing';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-900">
        <ScrollToTop />

        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="one-time" element={<OneTime />} />
          <Route path="one-time/:id" element={<OneTimeRetrieve />} />
          <Route path="sign" element={<Sign />} />
          <Route path="file-encrypt" element={<FileEncrypt />} />
          <Route path="password-key" element={<PasswordKey />} />
          <Route path="mac" element={<MAC />} />
          <Route path="hash" element={<Hash />} />
          <Route path="random" element={<Random />} />
          <Route path="split-key" element={<SplitKey />} />
          <Route path="text-encrypt" element={<TextEncrypt />} />
          <Route path="keys" element={<Keys />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="secure-notes" element={<SecureNotes />} />
          <Route path="chat" element={<Chat />} />
          <Route path="ikrypt-code" element={<IKryptCode />} />
          <Route path="contact" element={<Contact />} />
          <Route path="ikrypt-guard" element={<IKryptGuard />} />
          <Route path="ikrypt-shield" element={<IKryptShield />} />
          <Route path="tools/password-generator" element={<PasswordGeneratorLanding />} />
          <Route path="tools/file-encryption" element={<FileEncryptionLanding />} />
          <Route path="tools/one-time-secret" element={<OneTimeSecretLanding />} />
          <Route path="tools/digital-signature" element={<DigitalSignatureLanding />} />
          <Route path="tools/2fa-authenticator" element={<IKryptGuardLanding />} />
          <Route path="tools/hash-generator" element={<HashGeneratorLanding />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        </Routes>

        <GoogleAnalytics trackingId={config.analytics.googleAnalyticsId} />
        <Analytics
          googleAnalyticsId={config.analytics.googleAnalyticsId}
          searchConsoleId={import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_ID}
        />
        <VercelAnalytics />
        <MicrosoftClarity projectId="ugt3vmzw48" />
      </div>
    </ErrorBoundary>
  );
}