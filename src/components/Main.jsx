import { useEffect, useMemo, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";

const BASE_URL = "https://article-extractor-and-summarizer.p.rapidapi.com/";
const apiKey = import.meta.env.VITE_ARTICLE_API_KEY;

const Main = () => {
	const [article, setArticle] = useState({ url: "", summary: "" });
	const [allArticles, setAllArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isCopied, setIsCopied] = useState("");
	const options = useMemo(() => {
		return {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": `${apiKey}`,
				"X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
			},
		};
	}, []);

	useEffect(() => {
		const articles = JSON.parse(localStorage.getItem("articles")) || [];
		setAllArticles(articles);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const URL = `${BASE_URL}summarize?url=${encodeURIComponent(
			article.url
		)}&length=3`;

		const res = await fetch(URL, options);
		const data = await res.json();
		if (data?.summary && res.ok) {
			const newArticle = {
				url: article.url,
				summary: data.summary,
			};
			const updatedArticles = [newArticle, ...allArticles].slice(0, 5);
			setArticle({ ...newArticle, url: "" });
			setAllArticles(updatedArticles);
			localStorage.setItem("articles", JSON.stringify(updatedArticles));
		} else {
			setError(data?.error);
		}
		setIsLoading(false);
	};

	const handleCopy = (url) => {
		setIsCopied(url);
		navigator.clipboard.writeText(url);
		setTimeout(() => {
			setIsCopied("");
		}, 2000);
	};

	return (
		<main className="mt-20 max-w-full">
			<h1 className="head_text">
				Summarize Articles with <br className="max-md:hidden" />
				<span className="orange_gradient ">OpenAI GPT-4</span>
			</h1>
			<p className="desc">
				Simplify your reading with Summize, an open-source article summarizer
				that transforms lengthy articles into clear and concise summaries
			</p>
			<section className="mt-16 w-full max-w-xl mx-auto">
				<div className="flex flex-col w-full gap-2 mb-20">
					<form
						className="relative flex justify-center items-center"
						onSubmit={handleSubmit}
					>
						<img
							src={linkIcon}
							alt="link icon"
							className="absolute top-1/2 left-2  -translate-y-1/2"
						/>
						<input
							type="url"
							value={article.url}
							onChange={(e) => setArticle({ ...article, url: e.target.value })}
							placeholder="Enter the article URL"
							className="url_input peer"
							required
						/>
						<button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 ">
							↵
						</button>
					</form>
					{/* browse links */}
					<div className="flex flex-col gap-2">
						{allArticles.map((article, index) => (
							<div key={`link-${index}`} className="link_card">
								<div
									className="copy_btn"
									onClick={() => handleCopy(article.url)}
								>
									<img
										src={isCopied === article.url ? tick : copy}
										alt="copy icon"
										className="w-[40%] h-[40%] object-contain"
									/>
								</div>
								<p
									className="font-poppins flex-1 text-blue-700 font-medium text-sm truncate cursor-pointer"
									onClick={() => {
										setArticle({
											url: "",
											summary: article.summary,
										});
									}}
								>
									{article.url}
								</p>
							</div>
						))}
					</div>

					{/* summary */}
					<div className="my-10 max-w-full flex justify-center items-center flex-col">
						{isLoading ? (
							<img
								src={loader}
								alt="loader"
								className="w-20 h-20 object-contain"
							/>
						) : error ? (
							<p className="font-inter font-bold text-black text-center">
								Well, that was not supposed to happen...
								<br />
								<span className="font-satoshi font-normal text-gray-700">
									{error}
								</span>
							</p>
						) : (
							article.summary && (
								<div className="flex flex-col gap-4">
									<h2 className="w-full text-center font-poppins font-bold text-gray-600 text-2xl">
										Article <span className="blue_gradient">Summary</span>
									</h2>

									<div className="summary_box">
										<p className="font-poppins font-medium text-base text-gray-700 leading-7 text-justify">
											{article.summary}
										</p>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Main;
