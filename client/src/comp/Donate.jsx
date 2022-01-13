import React,{useState} from 'react'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export default function Donate({user}) {

    // const __DEV__ = document.domain === 'localhost'

    const [name, setName] = useState('Yash Sahu')
    const [ amt, setAmt ] = useState(0);

    async function displayRazorpay() {


		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		// if res is not defind means we failed to load razorpay sdk or this script
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
        // console.log("hello dataSend",dataSend)
		const data = await fetch('/api/razorpay', { 
            method: 'POST', 
            body: JSON.stringify({
                amount:amt
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

            })
        
            .then((t) =>
			t.json()
		)

		// console.log(data)

		const options = {
			// key: __DEV__ ? 'rzp_test_FbGfHh97AaWWxS' : 'PRODUCTION_KEY',
			key:'rzp_test_FbGfHh97AaWWxS',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for Donation.',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: user.email,
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}



    return (
        <div className="flex items-center h-4/6 m-5">
            
    <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
        <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
            <div className="px-6 py-6 md:px-8 md:py-0">
                <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Donate to <span className="text-blue-600 dark:text-blue-400 md:text-blue-300">Fund</span> Projects</h2>
                
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">We promise to keep bringing awesome content for you. Please help the community to keep spreading happiness</p>
            </div>
        </div>

        <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
            {/* <form> */}
                <div className="flex flex-col p-1 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
                    <input className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" 
                        type="number" 
                        name="amount" 
                        placeholder="Donation Amount" 
                        aria-label="Donation Amount" 
                        onChange={(event) => {
                            setAmt(event.target.value);
                        }}
                    />
                    
                    <button onClick={displayRazorpay} className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">Donate</button>
                </div>
            {/* </form> */}
        </div>
    </section>
        
        </div>
    )
}
