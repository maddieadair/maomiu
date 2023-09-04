import './globals.css'
import localFont from 'next/font/local'
import Footer from './components/footer'


const walsheim = localFont({
src: './fonts/GTWalsheimPro-Regular.woff2',
variable: '--font-walsheim',
});

const walsheimMed = localFont({
src: './fonts/GTWalsheimPro-Medium.woff2',
variable: '--font-walsheimMed',
});

const walsheimBold = localFont({
src: './fonts/GTWalsheimPro-Bold.woff2',
variable: '--font-walsheimBold',
});

const walsheimBlack = localFont({
src: './fonts/GTWalsheimPro-Black.woff2',
variable: '--font-walsheimBlack',
});

const takeoffBold = localFont({
src: './fonts/Take off&Good luck Big Bold Rounded Chinese Font – Simplified Chinese Fonts.ttf',
variable: '--font-takeoffBold',
});

const takeoffBlack= localFont({
src: './fonts/Take off&Good luck Galli Bold Rounded Chinese Font – Simplified Chinese Fonts .ttf',
variable: '--font-takeoffBlack',
});


const takeoffSlim = localFont({
src: './fonts/Take off&Good luck Slim Rounded Chinese Font – Simplified Chinese Fonts.ttf',
variable: '--font-takeoffSlim',
});

const goodnight = localFont({
    src: './fonts/Good Night Retro Chinese Font-Simplified Chinese.ttf',
    variable: '--font-goodnight',
    });

export const metadata = {
  title: 'Chinese Stroke Order Worksheet Generator',
  description: 'by me! :)',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${walsheim.className} ${walsheimMed.variable} ${walsheimBold.variable} ${walsheimBlack.variable} ${takeoffSlim.variable} ${takeoffBold.variable} ${takeoffBlack.variable} ${goodnight.variable}` }>
            <main>
                {children}
            </main>
            <Footer />
      </body>
    </html>
  )
}
