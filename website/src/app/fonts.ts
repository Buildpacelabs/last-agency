import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * Body font — Inter.
 * Standard zero-config Google font.
 */
export const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
});

/**
 * Display font — Space Grotesk (temporary).
 *
 * IMPORTANT: The brand spec calls for Cabinet Grotesk (Fontshare). Cabinet
 * Grotesk is not on Google Fonts, so it must be self-hosted via woff2 files
 * dropped into ./public/fonts/cabinet-grotesk/ and loaded with next/font/local.
 *
 * Until those files exist, we use Space Grotesk — closest free Google
 * equivalent (geometric grotesk, similar voice).
 *
 * Swap procedure when Cabinet Grotesk is available:
 *   1. Drop CabinetGrotesk-Variable.woff2 + CabinetGrotesk-VariableItalic.woff2
 *      into website/public/fonts/cabinet-grotesk/.
 *   2. Replace the `display` export below with:
 *
 *      import localFont from 'next/font/local';
 *      export const display = localFont({
 *        src: [
 *          { path: '../../public/fonts/cabinet-grotesk/CabinetGrotesk-Variable.woff2',
 *            style: 'normal', weight: '500 700' },
 *          { path: '../../public/fonts/cabinet-grotesk/CabinetGrotesk-VariableItalic.woff2',
 *            style: 'italic', weight: '500 700' },
 *        ],
 *        display: 'swap',
 *        variable: '--font-display',
 *        preload: true,
 *      });
 *
 *   3. Remove the Space Grotesk import.
 *
 * No other file needs to change — every consumer reads `--font-display`.
 */
export const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-display',
});
