import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { client } from '../utils/shopify-client';

export const getServerSideProps = async () => {
	const products = await client.product.fetchAll(); // Fetch product
	const infos = await client.shop.fetchInfo(); // Fetch shop Info if you think about SEO and title and ... to your page
	// const policies = await client.shop.fetchPolicies(); // fetch shop policy if you have any

	// Build a custom products query using the unoptimized version of the SDK
	const productsQuery = client.graphQLClient.query((root) => {
		root.addConnection('products', { args: { first: 10 } }, (product) => {
			product.add('title');
			product.add('handle');
			product.add('vendor');
		});
	});

	// Call the send method with the custom products query
	const grapqlData = await client.graphQLClient.send(productsQuery)

	return {
		props: {
			products: JSON.parse(JSON.stringify(products)),
			shopInfos: JSON.parse(JSON.stringify(infos)),
			// policies: JSON.parse(JSON.stringify(policies)),
			// grapqlData: JSON.parse(JSON.stringify(grapqlData)),
		},
	};
};

export default function Home({ shopInfos, products }) {
	return (
		<>
			<Header />
			<section className="text-gray-600 body-font">
				<div className="flex flex-col text-center w-full mt-20 px-20">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">NextJS Shopify Storefront</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">A custom Shopify storefront built with NextJS, Shopify Buy SDK and TailwindCSS</p>
				</div>
				<div className="container px-5 py-24 mx-auto mb-20">
					<div className="flex flex-wrap -m-4">
						{products.map(pro => <ProductCard key={pro.id} product={pro} moneyFormat={shopInfos.moneyFormat} />)}
					</div>
				</div>
			</section>
			<Footer />
		</>
	)
}
