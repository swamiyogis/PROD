import {load} from "@cashfreepayments/cashfree-js"

const cashfree = await load({
	mode: "production" //or production
});

export default cashfree;