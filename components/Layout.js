import Head from 'next/head';
import Image from 'next/image';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';


export default function Layout({children, page}) {
  return (
    <div className={`${styles.layout}`}>
      <Head>
        <title>{page}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css" rel="stylesheet"/>
      </Head>

      <div className={`${styles.header}`}>
        <Navbar />
      </div>

      <div className="container mx-auto px-4">
      <main className={`${styles.main}`}>
        {children}
      </main>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>


      <style jsx>{`  
        p {
          color: grey
        }
      `}
      </style>
    </div>
  )
}