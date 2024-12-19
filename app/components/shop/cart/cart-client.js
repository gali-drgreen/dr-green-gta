"use client";
import { useState } from "react";
import CartItem from "./cart-item";

export default function CartClient(props) {
    const [cart, setCart] = useState(props?.cart);
    const [total, setTotal] = useState(props?.cart?.totalAmount);

    const [clearCartLoading, setClearCartLoading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const [checkoutError, setCheckoutError] = useState(null);
    const [checkoutSuccess, setCheckoutSuccess] = useState(null);

    const removeHandler = async () => {
        if (clearCartLoading) return;
        setClearCartLoading(true);

        const payload = {
            cartId: cart?.id,
        };

        const removeCart = await fetch("/api/shop/cart/clear-cart-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const res = await removeCart.json();

        if (res.success) {
            setTotal(0);
            setCart(null);
        }

        return setClearCartLoading(false);
    };

    const updateTotalHandler = (add) => {
        setTotal((total) => total + add);
    };

    const checkoutHandler = async () => {
        setCheckoutLoading(true);
        setCheckoutError(null);
        setCheckoutSuccess(null);

        const payload = {
            clientId: props.clientId,
        };

        const checkoutReq = await fetch("/api/shop/cart/checkout-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const checkoutRes = await checkoutReq.json();

        if (checkoutRes.success) {
            setCheckoutSuccess("Thank you for your order!");
            await refreshCartHandler();
        } else {
            if (checkoutRes.errorCode == 409) {
                setCheckoutError("Your account is not active.");
            } else {
                setCheckoutError(checkoutRes.message + ".");
            }
        }

        return setCheckoutLoading(false);
    };

    const refreshCartHandler = async () => {
        const payload = {
            clientId: props.clientId,
        };

        const getCartReq = await fetch("/api/shop/cart/get-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const getCartRes = await getCartReq.json();

        if (getCartRes.success) {
            setCart(getCartRes?.data?.clients[0]?.clientCart[0]);
            setTotal(getCartRes?.data?.clients[0]?.clientCart[0]?.totalAmount);
        }
    };

    return (
        <div className="grid xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
                <div className="rounded-[20px] border-2 border-[#30e5f3]">
                    <div className="grid grid-cols-3 sm:grid-cols-4 px-4 sm:px-8 py-4 border-b-2 border-[#30e5f3]">
                        <p className="text-lg sm:text-2xl font-semibold sm:col-span-2 secondary-font text-[#30e5f3]">
                            Product
                        </p>
                        <p className="text-lg sm:text-2xl font-semibold text-center secondary-font text-[#30e5f3]">
                            Quantity
                        </p>
                        <p className="text-lg sm:text-2xl font-semibold text-end secondary-font text-[#30e5f3]">
                            Total
                        </p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8 px-4 sm:px-8 py-8 items-center">
                        {cart?.cartItems ? (
                            cart?.cartItems
                                .sort((a, b) =>
                                    a.strain.name < b.strain.name ? -1 : 1
                                )
                                .map((item, i) => (
                                    <CartItem
                                        key={i}
                                        details={item}
                                        cart={cart}
                                        updateTotal={updateTotalHandler}
                                        image={props.images[item.strain.id]}
                                        refreshCart={refreshCartHandler}
                                    />
                                ))
                        ) : (
                            <p className="col-span-2 text-white">
                                No items in your cart.
                            </p>
                        )}
                    </div>
                </div>
                {cart?.cartItems && (
                    <button
                        className="mt-4 float-right secondary-font uppercase py-3 px-6 text-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                        onClick={removeHandler}
                        title="CLEAR CART"
                    >
                        CLEAR CART
                        <svg
                            className={`animate-spin ml-2 h-4 w-4 text-[#fc69f8] ${
                                clearCartLoading ? "inline" : "hidden"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </button>
                )}
            </div>
            <div className="rounded-[20px] border-2 border-[#30e5f3] p-4 sm:p-8 flex flex-col justify-between items-start gap-16">
                <div>
                    <p className="text-3xl font-semibold mb-2 secondary-font">
                        Order Total
                    </p>
                    <p className="h2">${total?.toFixed(2) || "0.00"}</p>
                </div>
                <div className="relative w-full">
                    {cart?.cartItems && (
                        <div>
                            <p className="mb-4 leading-tight">
                                Tax included. Shipping calculated at checkout.
                            </p>
                            <button
                                className="w-full secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="CHECKOUT"
                                onClick={checkoutHandler}
                            >
                                CHECKOUT
                                <svg
                                    className={`animate-spin ml-2 h-4 w-4 text-black ${
                                        checkoutLoading ? "inline" : "hidden"
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    {checkoutError && (
                        <p className="text-[#30E5F3]">{checkoutError}</p>
                    )}
                    {checkoutSuccess && (
                        <p className="text-[#FC69F8]">{checkoutSuccess}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
