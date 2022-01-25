import {useRouter} from "next/router";
import Link from "next/link";
import coffeeStore from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/store.module.css";
import Image from "next/image";
import cls from "classnames";

export function getStaticProps({params}){
  return{
    props: {
      coffeeStore: coffeeStore.find( store => {
        return store.id == params.id;
      }),
    },
  };
}

export function getStaticPaths(){
  const paths = coffeeStore.map(store => {
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

    const {address, name, neighbourhood, imgUrl} = props.coffeeStore;

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
                <a>Back to home</a>
            </Link>
            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>{name}</h1>
            </div>
            <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
          </div>
          <div className={cls(styles.col2, "glass")}>
            <div className={styles.iconWrapper}>
              <Image src={"/icons/nearMe.svg"} width={24} height={24} alt={address} />
              <p className={styles.text}>{address}</p>
            </div>
            <div className={styles.iconWrapper}>
              <Image src={"/icons/places.svg"} width={24} height={24} alt={neighbourhood} />
              <p className={styles.text}>{neighbourhood}</p>
            </div>
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