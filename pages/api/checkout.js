import { client } from "../../utils/shopify-client"

export default async function checkout(req, res) {
	try {
		const lineItems = JSON.parse(req.body)
		const checkout = await client.checkout.create()
		await client.checkout.addLineItems(checkout.id, lineItems)
		res.status(200).json(checkout)
	} catch (error) {
    console.error(error)
		res.status(500).json({ error: "Failed to create checkout!" })
	}
}
