import Head from "next/head";
import { Navbar } from "routes";

function DefaultLayout({ children, title = "Tutur" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
