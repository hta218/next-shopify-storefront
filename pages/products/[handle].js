import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { formatMoney } from '../../utils/format-money'
import { client } from '../../utils/shopify-client'

export async function getServerSideProps(context) {
	const { params: { handle } } = context
	const product = JSON.parse(JSON.stringify(await client.product.fetchByHandle(handle)))
	const infos = JSON.parse(JSON.stringify(await client.shop.fetchInfo()))
	return {
		props: {
			product,
			shopInfos: infos
		}
	}
}

const Product = ({ product, shopInfos }) => {
	const { moneyFormat } = shopInfos
	const [loading, setLoading] = useState(false)

	const handleByNow = async () => {
		setLoading(true)
		const checkout = await (await fetch('/api/checkout', {
			method: 'POST',
			body: JSON.stringify([{
				variantId: product.variants[0].id,
				quantity: 1
			}])
		})).json()
		setLoading(false)
		window.open(checkout.webUrl)
	}

	return (
		<>
			<Header />
			<section className="text-gray-600 body-font pb-20">
				<div className="container px-5 py-12 lg:py-24 mx-auto">
					<div className="lg:w-4/5 mx-auto flex flex-wrap">
						<div className="lg:w-1/2">
							{
								product.images.map(image => {
									return <img
										key={image.id}
										src={image.src}
										alt={product.title}
										className="aspect-auto object-cover object-center rounded"
									/>
								})
							}
						</div>
						<div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
							<div className="sticky top-10">
								<h2 className="text-sm title-font text-gray-500 tracking-widest">{product.vendor}</h2>
								<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
								<div className="flex mb-4">
									<span className="flex items-center">
										<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
										<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
										<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
										<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
										<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
										</svg>
										<span className="text-gray-600 ml-3">4 Reviews</span>
									</span>
									<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
										<a className="text-gray-500">
											<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
												<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
											</svg>
										</a>
										<a className="text-gray-500">
											<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
												<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
											</svg>
										</a>
										<a className="text-gray-500">
											<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
												<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
											</svg>
										</a>
									</span>
								</div>
								<p className="leading-relaxed">
									{product.description}
								</p>
								<div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
									<div className="flex items-center">
										<span className="mr-3">Variant:</span>
										<div className="relative">
											<select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
												{product.variants.map(variant => <option key={variant.id}>{formatMoney(variant.price, moneyFormat)} - {variant.title}</option>)}
											</select>
											<span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
												<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
													<path d="M6 9l6 6 6-6"></path>
												</svg>
											</span>
										</div>
									</div>
								</div>
								<div className="flex items-center">
									<button
										onClick={handleByNow}
										className={`${loading && 'pointer-events-none opacity-70'} flex-1 font-medium text-center ml-auto text-white bg-indigo-500 border-0 py-2.5 px-6 focus:outline-none hover:bg-indigo-600 rounded`}
									>
										{
											loading ? <svg className="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg> : <span>Buy it now</span>
										}
									</button>
									<button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
										<svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
											<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default Product
