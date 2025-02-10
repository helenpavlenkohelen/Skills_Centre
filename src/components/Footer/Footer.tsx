import { NavLink } from "react-router-dom";
import styles from "./footer.module.scss";
const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__wrap}>
				<div className={styles.footer__container}>
					<a className={styles.footer__logo}>
						<img src='/images/Union.png' alt='teg'></img>
					</a>
					<ul className={styles.footer__list}>
						<li>
							<NavLink
								className={styles.footer__listLink}
								to={"/"}
							>
								Twitter
							</NavLink>
						</li>
						<li>
							<NavLink
								className={styles.footer__listLink}
								to={"/"}
							>
								Linkedin
							</NavLink>
						</li>
						<li>
							<NavLink
								className={styles.footer__listLink}
								to={"/"}
							>
								GitHub
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
