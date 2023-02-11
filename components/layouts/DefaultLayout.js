import Head from "next/head";

function DefaultLayout({ children, title = "Tutur" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        <nav className="bg-red-300 p-4">ini navbar</nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;
