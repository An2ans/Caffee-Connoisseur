import styles from "../styles/banner.module.css";

const Banner = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.coffee}>Coffee</span> 
                <span className={styles.connoisseur}>Connoisseur </span></h1>
            <p className={styles.subtitle}>Discover your local coffee shops!</p>
            <div className={styles.buttonWrapper}>
            <button onClick={props.handleClick} className={styles.button}>{props.buttonText}</button>
            </div>
        </div>
    );
};

export default Banner;