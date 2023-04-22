import logo from "../assets/logo.svg";

const Header = () => {
	return (
		<header className="w-full flex">
			<nav className="w-full py-4 flex justify-between items-center">
				<img src={logo} alt="sumz_logo" className="w-28 object-contain" />
				<button
					type="button"
					className="black_btn"
					onClick={() =>
						window.open(
							"https://jahmd.github.io/OpenAI_Article_Summarizer/",
							"_blank"
						)
					}
				>
					GitHub
				</button>
			</nav>
		</header>
	);
};

export default Header;
