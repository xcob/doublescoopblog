import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div id="bgMain">
      <Head>
        <title>The Double Scoop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image 
            src="/the-double-scoop.png"
            width={500}
            height={250}
            alt="double scoop logo"
            />
          </div>
          <h1>The Double Scoop</h1>
          <p>
            Check out the articles below!
          </p>
        </header>

        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            //console.log(post)
            const date = new Date(post.properties.Date.date.start).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`} className={styles.postLink}>Read post →</Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);
  

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
