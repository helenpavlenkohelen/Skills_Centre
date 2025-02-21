import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLinkedinIn,
	faGithub,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./layout.module.scss";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

interface ICoordMouse {
	x: number;
	y: number;
}

const Layout = () => {
	const [images] = useState([
		{
			className: styles.about__teg,
			src: "/images/teg.png",
			alt: "teg",
			reverse: true,
		},
		{
			className: styles.about__tegEm,
			src: "/images/tegEm.png",
			alt: "teg",
			reverse: false,
		},
		{
			className: styles.about__tegP,
			src: "/images/tegP.png",
			alt: "teg",
			reverse: true,
		},
		{
			className: styles.about__tegMain,
			src: "/images/tegMain.png",
			alt: "teg",
			reverse: true,
		},
		{
			className: styles.about__tegUl,
			src: "/images/tegUl.png",
			alt: "teg",
			reverse: false,
		},
		{
			className: styles.about__tegI,
			src: "/images/tegI.png",
			alt: "teg",
			reverse: true,
		},
		{
			className: styles.about__tegUlX,
			src: "/images/tegUl.png",
			alt: "teg",
			reverse: false,
		},
		{
			className: styles.about__tegEmX,
			src: "/images/tegEm.png",
			alt: "teg",
			reverse: false,
		},
		{
			className: styles.about__tegPX,
			src: "/images/tegP.png",
			alt: "teg",
			reverse: true,
		},
		{
			className: styles.about__tegMainX,
			src: "/images/tegMain.png",
			alt: "teg",
			reverse: false,
		},
	]);

	const imagesRefs = useRef<HTMLImageElement[]>([]);
	const coordMouse = useRef<ICoordMouse>({ x: 0, y: 0 });

	useEffect(() => {
		const div = document.querySelector(`.${styles.about__wrap}`);
		if (!div) return;

		const speed = 0.1; // Скорость движения
		const friction = 0.95; // Трение (чтобы не останавливалось резко)
		const maxRotation = 15; // Максимальный угол поворота
		const maxOffset = 100; // Максимальное отклонение от начальной позиции
		const positions = new Map();
		let changeSpeed = { x: 0, y: 0 };
		let isMoving = false;

		const updatePositions = () => {
			if (!isMoving) {
				changeSpeed.x *= friction;
				changeSpeed.y *= friction;
			}

			imagesRefs.current.forEach((img, i) => {
				if (!img) return;

				let startPos = positions.get(img)?.start || {
					x: img.offsetLeft,
					y: img.offsetTop,
				};
				let prevPos = positions.get(img) || {
					x: startPos.x,
					y: startPos.y,
					angle: 0,
				};
				const direction = images[i].reverse ? -1 : 1;

				let newX = prevPos.x + changeSpeed.x * speed * direction;
				let newY = prevPos.y + changeSpeed.y * speed * direction;
				let newAngle = prevPos.angle + changeSpeed.x * 0.2;

				// Ограничение вращения
				newAngle = Math.max(
					-maxRotation,
					Math.min(newAngle, maxRotation)
				);

				// Ограничение движения в пределах maxOffset
				newX = Math.max(
					startPos.x - maxOffset,
					Math.min(newX, startPos.x + maxOffset)
				);
				newY = Math.max(
					startPos.y - maxOffset,
					Math.min(newY, startPos.y + maxOffset)
				);

				// Ограничиваем движение в пределах окна
				const { width, height } = img.getBoundingClientRect();
				const maxX = window.innerWidth - width;
				const maxY = window.innerHeight - height;

				newX = Math.max(0, Math.min(newX, maxX));
				newY = Math.max(0, Math.min(newY, maxY));

				img.style.transform = `translate(${newX - startPos.x}px, ${
					newY - startPos.y
				}px) rotate(${newAngle}deg)`;
				positions.set(img, {
					x: newX,
					y: newY,
					angle: newAngle,
					start: startPos,
				});
			});

			if (
				Math.abs(changeSpeed.x) > 0.01 ||
				Math.abs(changeSpeed.y) > 0.01
			) {
				requestAnimationFrame(updatePositions);
			} else {
				isMoving = false;
			}
		};

		div.addEventListener("mousemove", (e) => {
			const { clientX, clientY } = e;
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;

			// Определяем центр окна
			const centerX = windowWidth / 2;
			const centerY = windowHeight / 2;

			// Границы зоны активности (700x500px)
			const zoneLeft = centerX - 750;
			const zoneRight = centerX + 750;
			const zoneTop = centerY - 250;
			const zoneBottom = centerY + 550;

			// Проверяем, находится ли курсор в зоне активности
			const inZone =
				clientX >= zoneLeft &&
				clientX <= zoneRight &&
				clientY >= zoneTop &&
				clientY <= zoneBottom;

			if (inZone) {
				changeSpeed.x = clientX - coordMouse.current.x;
				changeSpeed.y = clientY - coordMouse.current.y;

				if (!isMoving) {
					isMoving = true;
					requestAnimationFrame(updatePositions);
				}

				coordMouse.current.x = clientX;
				coordMouse.current.y = clientY;
			}
		});
	}, []);

	// useEffect(() => {
	// 	const div = document.querySelector(`.${styles.about__wrap}`);
	// 	if (div) {
	// 		div.addEventListener("mousemove", (e) => {
	// 			const coordinateX = e.clientX;
	// 			const coordinateY = e.clientY;

	// 			if (coordMouse.current.x < coordinateX) {
	// 				for (let i = 0; i < images.length; i++) {
	// 					const coordImage =
	// 						imagesRefs.current[i].getBoundingClientRect();
	// 					if (images[i].reverse == true) {
	// 						imagesRefs.current[i].style.left =
	// 							coordImage.x - 0.5 + "px";
	// 					} else {
	// 						imagesRefs.current[i].style.left =
	// 							coordImage.x + 0.5 + "px";
	// 					}
	// 				}
	// 			} else if (coordMouse.current.y < coordinateY) {
	// 				for (let i = 0; i < images.length; i++) {
	// 					const coordImage =
	// 						imagesRefs.current[i].getBoundingClientRect();
	// 					if (images[i].reverse == true) {
	// 						imagesRefs.current[i].style.top =
	// 							coordImage.top - 0.5 + "px";
	// 					} else {
	// 						imagesRefs.current[i].style.top =
	// 							coordImage.top + 0.5 + "px";
	// 					}
	// 				}
	// 			} else if (coordinateX > coordMouse.current.x) {
	// 				for (let i = 0; i < images.length; i++) {
	// 					const coordImage =
	// 						imagesRefs.current[i].getBoundingClientRect();
	// 					if (images[i].reverse == true) {
	// 						imagesRefs.current[i].style.right =
	// 							window.innerWidth -
	// 							coordImage.right -
	// 							0.5 +
	// 							"px";
	// 					} else {
	// 						imagesRefs.current[i].style.right =
	// 							window.innerWidth -
	// 							coordImage.right +
	// 							0.5 +
	// 							"px";
	// 					}
	// 				}
	// 			} else if (coordinateY > coordMouse.current.y) {
	// 				for (let i = 0; i < images.length; i++) {
	// 					const coordImage =
	// 						imagesRefs.current[i].getBoundingClientRect();
	// 					if (images[i].reverse == true) {
	// 						imagesRefs.current[i].style.bottom =
	// 							window.innerWidth -
	// 							coordImage.right -
	// 							0.5 +
	// 							"px";
	// 					} else {
	// 						imagesRefs.current[i].style.bottom =
	// 							window.innerWidth -
	// 							coordImage.right +
	// 							0.5 +
	// 							"px";
	// 					}
	// 				}
	// 			}

	// 			coordMouse.current.x = coordinateX;
	// 			coordMouse.current.y = coordinateY;
	// 		});
	// 	}
	// }, []);

	return (
		<>
			<Header />
			<section className={styles.about}>
				<div className={styles.about__wrap}>
					<div className={styles.about__container}>
						<div className={styles.about__wrap__discripshion}>
							<img
								className={styles.about__wrap__img}
								src={"./images/mainFoto.jpg"}
							/>
							<h1
								className={
									styles.about__wrap__discripshion_title
								}
							>
								Elena Pavlenko
							</h1>
							<h3
								className={
									styles.about__wrap__discripshion_text
								}
							>
								Front-end Developer
							</h3>
						</div>
						<div className={styles.about__wrap__social}>
							<FontAwesomeIcon
								icon={faGithub}
								size='2x'
								style={{ color: "white" }}
							/>
							<FontAwesomeIcon
								icon={faLinkedinIn}
								size='2x'
								style={{ color: "white" }}
							/>
							<FontAwesomeIcon
								icon={faTwitter}
								size='2x'
								style={{ color: "white" }}
							/>
						</div>
					</div>
				</div>
				<div className='test'>
					{images.map((item, idx) => (
						<img
							key={idx}
							ref={(img) => {
								if (img) imagesRefs.current[idx] = img;
							}}
							className={item.className}
							src={item.src}
							alt={item.alt}
						/>
					))}
				</div>
			</section>
			<section className={styles.project}></section>
			<Footer />
		</>
	);
};

export default Layout;

/*
  PLAN
  1 - Повесить событие движения мышки на блок                            +
  2 - Сохранять ее позицю                                                +
  3 - По тракэктории движения мышки сдвигать элементы                    -
      1) Определить траэкторию движения мышки (верх низ лево право)      -
           1) Получить координаты мышки (х 31 у 53)                      +
           2) Если х увеличился то мы пошли вправо                       +
              1) сохранить новые координаты на позицию                   +
      2) Сдвигать каждый элемент на 1 пиксель по траэктории мышки        -
         1) Получить доступ к каждому параграфу
         2) Получить его координаты item.getBoundingClientRect -> {top,left,right,bottom}
         3) элементу задаем его координаты + 1 пиксель исходя из траэктории
*/
