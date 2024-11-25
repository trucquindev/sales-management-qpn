export default function OrderDetails() {
    const orderSummary = {
        orderId: "#4102",
        paymentMethod: "Paypal",
        subtotal: "$385.00",
        discount: "20%",
        shipping: "Free",
        total: "$84.00",
    };

    const statusSteps = ["Order received", "Processing", "On the way", "Delivered"];
    const currentStep = 1; // Step đang ở "Processing"

    const products = [
        { name: "Red Capsicum", price: "$14.00", quantity: "x5", subtotal: "$70.00" },
        { name: "Green Capsicum", price: "$14.00", quantity: "x2", subtotal: "$28.00" },
        { name: "Green Chili", price: "$26.70", quantity: "x10", subtotal: "$267.00" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                    Order Details ·{" "}
                    <span className="text-gray-500">April 24, 2021 · 3 Products</span>
                </h2>
                <a href="/orderhistory" className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Back to List
                </a>
            </div>

            {/* Billing, Shipping, and Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Billing Address */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="text-sm font-medium uppercase text-gray-600 mb-2">Billing Address</h3>
                    <div className="space-y-1">
                        <p className="font-medium">Dianne Russell</p>
                        <p className="text-sm text-gray-500">
                            4140 Parker Rd. Allentown, New Mexico 31134
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>Email: dianne.russell@gmail.com</p>
                            <p>Phone: (671) 555-0110</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="text-sm font-medium uppercase text-gray-600 mb-2">Shipping Address</h3>
                    <div className="space-y-1">
                        <p className="font-medium">Dianne Russell</p>
                        <p className="text-sm text-gray-500">
                            4140 Parker Rd. Allentown, New Mexico 31134
                        </p>
                        <div className="text-sm text-gray-500">
                            <p>Email: dianne.russell@gmail.com</p>
                            <p>Phone: (671) 555-0110</p>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium">Order ID</p>
                            <p className="text-sm text-gray-500">{orderSummary.orderId}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Payment Method</p>
                            <p className="text-sm text-gray-500">{orderSummary.paymentMethod}</p>
                        </div>
                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{orderSummary.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Discount</span>
                                <span>{orderSummary.discount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping</span>
                                <span>{orderSummary.shipping}</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg">
                                <span>Total</span>
                                <span className="text-green-600">{orderSummary.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline Order Progress */}
            <div className="border rounded-lg p-4 bg-white shadow-sm mb-8">
                <div className="relative mb-6">
                    <div className="absolute left-0 top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2">
                        <div
                            className="absolute left-0 top-0 h-full bg-green-600"
                            style={{ width: `${((currentStep + 1) / statusSteps.length) * 100}%` }}
                        />
                    </div>
                    <div className="relative z-10 flex justify-between">
                        {statusSteps.map((step, index) => (
                            <div key={step} className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? "bg-green-600 text-white" : "bg-gray-200 text-green-600 border border-green-600"
                                        }`}
                                >
                                    {index < currentStep ? "✓" : index + 1}
                                </div>
                                <p className={`mt-2 text-sm ${index <= currentStep ? "text-green-600 font-medium" : "text-gray-500"}`}>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Details */}
            <div className="border rounded-lg p-4 bg-white shadow-sm">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-3 text-sm font-medium">Product</th>
                            <th className="text-right p-3 text-sm font-medium">Price</th>
                            <th className="text-right p-3 text-sm font-medium">Quantity</th>
                            <th className="text-right p-3 text-sm font-medium">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-3">{product.name}</td>
                                <td className="p-3 text-right">{product.price}</td>
                                <td className="p-3 text-right">{product.quantity}</td>
                                <td className="p-3 text-right">{product.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
