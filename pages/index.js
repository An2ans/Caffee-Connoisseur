import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from "../components/card.jsx";
import Banner from "../components/banner.jsx";
import coffeeStores from "../data/coffee-stores.json";

export async function getStaticProps(context){
  return{
    props:{
      coffeeStores,
    },
  };
}



export default function Home(props) {

  const handleBannerClick = (e) => {
    console.log(e);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Coffee Connoisseur is the ultimate app to find the best coffee stores nearby." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner handleClick={handleBannerClick} buttonText="View stores nearby" />
        <div className={styles.heroImage}>
          <Image src="/coffee.png" alt="coffee" width={300} height={200} />
        </div>
        {props.coffeeStores.length > 0 && (
          <h2 className={styles.heading2} > Toronto stores </h2>
        )}
        <div className={styles.cardLayout}>
          {props.coffeeStores.map(store => <Card 
            name={store.name}
            imgUrl={store.imgUrl} 
            href={`/store/${store.id}`}
            className={styles.card}
            key={store.id} />
          )}
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
