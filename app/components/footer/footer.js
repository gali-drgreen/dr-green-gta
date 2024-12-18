import Image from "next/image";
import Link from "next/link";
import LowPowerModeVideo from "../general/low-power-mode-video";

export default async function Footer() {
    return (
        <footer className="relative pt-32 pb-4 sm:pb-16">
            <div className="absolute top-0 left-0 bottom-0 w-full z-[-100] pointer-events-none mask-top-long mix-blend-screen">
                <Image
                    className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                    src="/images/general/bg-squares.svg"
                    alt="Smoke"
                    width={1920}
                    height={736}
                />
            </div>
            <div className="container mx-auto px-4">
                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-8 items-center">
                    <Image
                        className=""
                        src="/images/general/dr-green-logo.webp"
                        alt="Dr Green Digital Key"
                        width={217}
                        height={85}
                    />
                    <div>
                        <p className="uppercase text-[19px] font-semibold tracking-wider mb-4">
                            SOCIALS
                        </p>
                        <div className="flex items-center gap-x-8 xl:gap-x-8 gap-y-4 flex-wrap">
                            <Link
                                href="https://www.facebook.com/drgreennftportugal"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Facebook.svg"
                                    alt="Facebook"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://twitter.com/DrGreen_nft"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/x.svg"
                                    alt="X"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://www.instagram.com/drgreen"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Insta.svg"
                                    alt="Insta"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/company/drgreennft"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Linkedin.svg"
                                    alt="LinkedIn"
                                    width={16}
                                    height={16}
                                />
                            </Link>
                            <Link
                                href="https://www.youtube.com/@DrGreen_NFT"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Youtube.svg"
                                    alt="YouTube"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://discord.gg/DrGreen"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Discord.svg"
                                    alt="Discord"
                                    width={16}
                                    height={13}
                                />
                            </Link>
                            <Link
                                href="https://opensea.io/collection/dr-green-digital-key"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Opensea.svg"
                                    alt="Opensea"
                                    width={17}
                                    height={15}
                                />
                            </Link>
                            <Link
                                href="https://www.pinterest.co.uk/DrGreenNFT"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/Pinterest.svg"
                                    alt="Pinterest"
                                    width={17}
                                    height={17}
                                />
                            </Link>
                            <Link
                                href="https://t.me/DrGreenNFTentry"
                                target="_blank"
                                rel="noreferrer"
                                className="p-1"
                            >
                                <Image
                                    src="/images/icons/telegram.svg"
                                    alt="Telegram"
                                    width={18}
                                    height={17}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-x-8 gap-y-20 mt-16 sm:mt-20">
                    <div className="flex flex-col sm:flex-row items-start gap-16">
                        <div className="grid gap-4">
                            <p className="uppercase text-[19px] font-semibold tracking-wider">
                                Pages
                            </p>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <Link
                                    href="/"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="https://drgreennft.com/"
                                    target="_blank"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/#process"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    The Process
                                </Link>
                                <Link
                                    href="/#faqs"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    FAQs
                                </Link>
                                <Link
                                    href="#news"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    News
                                </Link>
                                <Link
                                    href="mailto:support@drgreennft.com"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    Contact
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <Link
                                    href="/"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    TERMS & CONDITIONS
                                </Link>
                                <Link
                                    href="/"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    PRIVACY POLICY
                                </Link>
                                <Link
                                    href="/"
                                    className="uppercase text-base font-medium font-montserrat"
                                >
                                    COOKIE POLICY
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="uppercase text-[19px] font-semibold tracking-wider mb-4">
                            Join the community
                        </p>
                        <p className="text-base font-normal mb-2">
                            Register your details today to ensure you&apos;re
                            among the chosen few who get to witness the dawn of
                            a new era in Cannabis Delivery. Your Digital Key
                            awaits you!
                        </p>
                        <p className="text-[13px] font-light tracking-tight">
                            Your data will be used to process your submission,
                            support your experience throughout this website, and
                            for other purposes described in our{" "}
                            <Link href="/">privacy policy.</Link>
                        </p>
                    </div>
                </div>
                <div className="mt-16 sm:mt-20 flex justify-between">
                    <p className="text-xs font-bold">
                        2024 &copy; DR GREEN NFT
                    </p>
                    <Link
                        className="text-xs font-bold"
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        BY ALPHAGEEK
                    </Link>
                </div>
            </div>
        </footer>
    );
}
