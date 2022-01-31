import Link from "next/link"

const Footer = () => {
	return (
		<footer className="fixed bottom-0 inset-x-0">
			<div className="bg-gray-200">
				<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
					<p className="text-gray-500 text-sm text-center sm:text-left">© 2022 made by Leo @
						<a href="https://leohuynh.dev" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
							https://leohuynh.dev
						</a>
					</p>
					<span className="text-sm inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
						<a href="https://twitter.com/hta218_" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
							@twitter
						</a>
						<a href="https://github.com/hta218" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">
							@github
						</a>
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
