import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Card from "../components/card.jsx";
import Banner from "../components/banner.jsx";
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../lib/use-track-location';
import { useEffect, useState, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from '../store/store-context';


export async function getStaticProps(context){
  const coffeeStores = await fetchCoffeeStores();
  return{
    props:{
      coffeeStores: coffeeStores,
    }
  };
}



export default function Home(props) {

  const {handleTrackLocation, errorMsg, isFinding} = useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {dispatch, state} = useContext(StoreContext);
  const {coffeeStores, latLong} = state;



  useEffect(async () => {
    if(latLong){
      try{
        const response = await fetch(`api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`)
        const coffeeStores = await response.json();
        console.log({response});
        dispatch({
          type:ACTION_TYPES.SET_COFFEE_STORES,
          payload:{
            coffeeStores,
          }
        });
        setCoffeeStoresError("");
      }catch(error){
        console.log({error})
        setCoffeeStoresError(error.message);
      }
    }
  }, [latLong]);


  const handleBannerClick = (e) => {
    handleTrackLocation();
  };


  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Coffee Connoisseur is the ultimate app to find the best coffee stores nearby." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner handleClick={handleBannerClick} buttonText={isFinding ? "Locating..." : "View stores nearby"} />
        <div className={styles.heroImage}>
          <Image src="/coffee.png" alt="coffee" width={300} height={200} />
        </div>
        {errorMsg && <p>Something went wrong: {errorMsg} </p>}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError} </p>}


        <div className={styles.sectionWrapper}>
          {coffeeStores.length > 0 && (
            <h2 className={styles.heading2} > Stores near me </h2>
          )}
          <div className={styles.cardLayout}>
            {coffeeStores.map(store => <Card 
              name={store.name}
              imgUrl={store.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} 
              href={`/store/${store.id}`}
              className={styles.card}
              key={store.id} />
            )}
          </div>
        </div>
        <div className={styles.sectionWrapper}>
          {props.coffeeStores.length > 0 && (
            <h2 className={styles.heading2} > Toronto stores </h2>
          )}
          <div className={styles.cardLayout}>
            {props.coffeeStores.map(store => <Card 
              name={store.name}
              imgUrl={store.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} 
              href={`/store/${store.id}`}
              className={styles.card}
              key={store.id} />
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
