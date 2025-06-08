// import { load } from "@cashfreepayments/cashfree-js";

// async function initializeCashfree() {
//   const cashfree = await load({
//     mode: "production",
//   });

//   return cashfree;
// }
// export default initializeCashfree;

import { load } from "@cashfreepayments/cashfree-js";
const cashfree = await load({
	mode: "sandbox" //or production
});

export default cashfree;