import styles from "../styles/banner.module.css";

const Banner = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}><span className={styles.coffee}>Coffee</span> Connoisseur</h1>
            <p className={styles.subtitle}>Discover your local coffee shops!</p>
            <button onClick={props.handleClick} className={styles.button}>{props.buttonText}</button>
        </div>
    );
};

export default Banner;