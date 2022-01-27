import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

export async function getStaticProps({params}){
  const coffeeStores = await fetchCoffeeStores();
  return{
    props: {
      coffeeStores: coffeeStores.find( store => {
        return store.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths(){
  const coffeeStores = await fetchCoffeeStores();
  const paths = await coffeeStores.map(store => {
    return{
      params: {
        id: store.id.toString(),
      },
    };
  });
  return{
    paths,
      fallback: true
  };
}

const Store = (props) => {
    const router = useRouter();

    if(router.isFallback) {
      return <div>Loading...</div>
    }

    const {address, neighborhood, name, imgUrl} = props.coffeeStores;

    const handleUpvote = () => {
    }

    return (
      <div className={styles.layout}>
        <Head>
          <title>{name}</title>
        </Head>
        <div className={styles.container} >
          <div className={styles.col1}>
            <Link href="/" className={styles.backToHomeLink} >
                <a>&#8592; Back to home</a>
            </Link>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt={name} />
          </div>
          <div className={cls(styles.col2, "glass")}>
            <div className={styles.iconWrapper}>
              <Image src={"/icons/places.svg"} width={24} height={24} alt={address} />
              <p className={styles.text}>{address}</p>
            </div>
            {neighborhood && (<div className={styles.iconWrapper}>
              <Image src={"/icons/nearMe.svg"} width={24} height={24} alt={neighborhood} />
              <p className={styles.text}>{neighborhood}</p>
            </div>)}
            <div className={styles.iconWrapper}>
              <Image src={"/icons/star.svg"} width={24} height={24} alt="score" />
              <p className={styles.text}>{1}</p>
            </div>
            <button className={styles.upvoteButton} onClick={handleUpvote} >Vote now!</button>
          </div>
        </div>       
      </div>
    );
}

export default Store;