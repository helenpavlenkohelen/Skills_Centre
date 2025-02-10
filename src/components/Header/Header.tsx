import { NavLink } from "react-router-dom";
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.header__nav}>
				<a className={styles.header__logo}>
					<img src='/images/Union.png' alt='teg'></img>
				</a>
				<ul className={styles.header__list}>
					<li className={styles.header__listLink}>
						<NavLink
							className={styles.header__listLink_home}
							to={"/"}
						>
							home
						</NavLink>
					</li>
					<li className={styles.header__listLink}>
						<NavLink
							className={styles.header__listLink_skills}
							to={"/skills"}
						>
							skills
						</NavLink>
					</li>
					<li className={styles.header__listLink}>
						<NavLink
							className={styles.header__listLink_education}
							to={"/education"}
						>
							education
						</NavLink>
					</li>
					<li className={styles.header__listLink}>
						<NavLink
							className={styles.header__listLink_languages}
							to={"/languages"}
						>
							languages
						</NavLink>
					</li>

					<li className={styles.header__listLink}>
						<NavLink
							className={styles.header__listLink_contact}
							to={"/Contact"}
						>
							Contact
						</NavLink>
					</li>
					<li className={styles.header__listLink}>
						<FontAwesomeIcon
							className={styles.header__listLink_button}
							icon={faCircleHalfStroke}
							size='2x'
							style={{ color: "	rgb(208 203 203)" }}
						/>
					</li>
				</ul>
			</nav>
			<button className={styles.header__menu}>
				<FontAwesomeIcon
					icon={faBars}
					size='2x'
					style={{ color: "rgb(208 203 203)" }}
				></FontAwesomeIcon>
			</button>
		</header>
	);
};

export default Header;
