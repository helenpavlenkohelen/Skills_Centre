import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Education from "./pages/Education/Education";
import Skills from "./pages/Skills/Skills";
import Languages from "./pages/Languages/Languages";
import Contact from "./pages/Contact/Contact";

const RouterSystem = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='education' element={<Education />} />
					<Route path='skills' element={<Skills />} />
					<Route path='languages' element={<Languages />} />
					<Route path='contact' element={<Contact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RouterSystem;
