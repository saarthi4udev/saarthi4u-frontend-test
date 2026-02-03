import React from "react";
import Link from "next/link";

const Location = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/contact", text: "Contact" },
    ];
    return (
        <section className="bg-primary py-24">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
                <div className="">
                    <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11">
                        <div className="col-span-3">
                            <h2 className="text-white max-w-56 text-40 font-bold">Delhi Head Office</h2>
                        </div>
                        <div className="col-span-3">
                            <p className="sm:text-24 text-xl text-IceBlue font-normal max-w-64 leading-10 text-white text-opacity-50">1st Floor G-69, Sector-63 Noida – 201301</p>
                        </div>
                        <div className="col-span-3">
                            <Link href="mailto:headoffice@saarthi4u.com" className="sm:text-24 text-xl text-white font-medium underline">headoffice@saarthi4u.com</Link>
                            <Link href="tel:+91 9930718925" className="sm:text-24 text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white text-opacity-40!">Call</span>+91 9930718925</Link>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
                        <div className="col-span-3">
                            <h2 className="text-white max-w-52 text-40 font-bold">Mumbai Office</h2>
                        </div>
                        <div className="col-span-3">
                            <p className="sm:text-24 text-xl text-white text-opacity-50 font-normal max-w-64 leading-10">Mumbai</p>
                        </div>
                        <div className="col-span-3">
                            <Link href="mailto:Office@saarthi4u.com" className="sm:text-24 text-xl text-white font-medium underline">Office@saarthi4u.com</Link>
                            <Link href="tel:+91 9930718925" className="sm:text-24 text-white text-opacity-80 text-xl text-IceBlue flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white text-opacity-40!">Call</span>+91 9930718925</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
