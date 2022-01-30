import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { client } from '../utils/shopify-client';

export const getServerSideProps = async () => {
	const products = await client.product.fetchAll(); // Fetch product
	const infos = await client.shop.fetchInfo(); // Fetch shop Info if you think about SEO and title and ... to your page
	const policies = await client.shop.fetchPolicies(); // fetch shop policy if you have any
	return {
		props: {
			infos: JSON.parse(JSON.stringify(infos)),
			policies: JSON.parse(JSON.stringify(policies)),
			products: JSON.parse(JSON.stringify(products)),
		},
	};
};

export default function Home({ infos, policies, products }) {
  console.log("=========> - infos", infos)
  console.log("=========> - products", products)
	return (
		<>
			<Header />
			<section className="text-gray-600 body-font">
				<div className="container px-5 py-24 mx-auto">
					<div className="flex flex-wrap -m-4">
						{products.map(pro => <ProductCard key={pro.id} product={pro} />)}
					</div>
				</div>
			</section>
		</>
	)
}
