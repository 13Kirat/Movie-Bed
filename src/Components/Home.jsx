import SideNav from "./Templates/SideNav";
import TopNav from "./Templates/TopNav";

const Home = () => {
	document.title = "Home Page";
	return (
		<>
			<SideNav />
			<div className="w-[80%] h-full">
				<TopNav />
			</div>
		</>
	);
};

export default Home;
