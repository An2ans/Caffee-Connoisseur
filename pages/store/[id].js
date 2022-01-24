import {useRouter} from "next/router";
import Link from "next/link";
import coffeeStore from "../../data/coffee-stores.json";

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
  return{
    paths: [
      {params: {id:"0"}}, {params: {id:"1"}}],
      fallback: false
  };
}

const Store = (props) => {
    const router = useRouter();

    return (
      <div>
          Coffee Store Page {router.query.id}
          <Link href="/" >
              <a>Back to home</a>
          </Link>

          <p>{props.coffeeStore.address}</p>
          <p>{props.coffeeStore.name}</p>

      
      </div>
    );
}

export default Store;