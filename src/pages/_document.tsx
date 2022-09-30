import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <body className="bg-gray-50 font-sans dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
