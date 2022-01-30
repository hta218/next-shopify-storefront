const ProductCard = ({ product }) => {
	const firstVariant = product.variants[0]
	const { price, image: { src }, title } = firstVariant
	return (
		<div className="lg:w-1/4 md:w-1/2 p-4 w-full">
			<a className="block relative rounded overflow-hidden">
				<img src={src} alt={title} className="aspect-auto object-cover object-center block" />
			</a>
			<div className="mt-4">
				<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
				<h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
				<p className="mt-1">{price}</p>
			</div>
		</div>
	)
}

export default ProductCard
