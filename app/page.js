import Image from "next/image";
import Link from "next/link";
import FAQs from "./components/general/faqs";
import GetContent from "@/lib/wp/get-content";
import TextHightlight from "./components/animated/text-highlight";
import LowPowerModeVideo from "./components/general/low-power-mode-video";
import GenerateSignature from "@/lib/dapp/generate-signature";
import EligibleConditionsCarousel from "./components/carousels/eligible-conditions-carousel";
import NewsCarousel from "./components/carousels/news-carousel";

export async function generateMetadata() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageContent {
            heroCelebrityPhoto {
                node {
                    sourceUrl
                }
            }
        }
    }
}
    `;
    const pageBy = (await GetContent(query)).pageBy;

    return {
        title: "Dr. Green: " + pageBy.title,
        description: "Your trusted source for medical cannabis.",
        openGraph: {
            images: [pageBy.pageContent.heroCelebrityPhoto.node.sourceUrl],
        },
    };
}

export default async function Home() {
    const query = `
{
    pageBy(pageId: ${process.env.PAGE_ID}) {
        title
        pageSide {
            featuredStrainId
        }
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
                title
            }
        }
        pageContent {
            heroPlanet {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            heroCelebrityPhoto {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            largeParagraphText
            madePossibleParagraphText
            madePossibleBackgroundImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            madePossibleCelebrityImage {
                node {
                    title
                    sourceUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
    globalContent {
        eligibleConditions {
            condition {
                condition
                description
            }
        }
        threeSteps {
            steps {
                description
                icon {
                    node {
                        mediaDetails {
                            height
                            width
                        }
                        sourceUrl
                        title
                    }
                }
                title
            }
        }
    }
}
    `;
    const content = (await GetContent(query)).pageBy;
    const global = (await GetContent(query)).globalContent;

    const featuredStrainId = content.pageSide.featuredStrainId;
    const payload = { strainId: featuredStrainId };
    const getStrains = await fetch(
        `https://stage-api.drgreennft.com/api/v1/dapp/strains/${payload.strainId}`,
        {
            method: "GET",
            redirect: "follow",
            headers: {
                "x-auth-apikey": process.env.DAPP_API,
                "x-auth-signature": GenerateSignature(payload),
                "Content-Type": "application/json",
            },
        }
    );
    const strain = await getStrains.json();

    const feed = await fetch(
        "https://rss.app/feeds/v1.1/uE6LV8h0fRax2HfE.json",
        {
            method: "GET",
        }
    );

    const rssItems = (await feed.json()).items;

    return (
        <main>
            <section id="hero" className="pt-48 sm:pt-32 bg-center">
                <Image
                    src={content.featuredImage.node.sourceUrl}
                    alt={content.featuredImage.node.title}
                    priority
                    width={content.featuredImage.node.mediaDetails.width}
                    height={content.featuredImage.node.mediaDetails.height}
                    className="absolute w-full h-auto object-cover z-[-1000] top-0 mask-top-bottom"
                />
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-[60px] sm:text-[80px] md:text-[90px] lg:text-[120px] 2xl:text-[140px] mb-4 sm:mb-8 relative z-10">
                            <span className="secondary-font h1-stroke">
                                Welcome to
                            </span>{" "}
                            <br />
                            <span className="text-white alt-font name-stroke origin-center rotate-[-4deg] block">
                                {content.title}
                            </span>
                        </h1>
                        <p className="text-lg sm:text-2xl font-medium relative z-10">
                            Your trusted source for medical cannabis
                        </p>
                        <p className="hidden lg:flex justify-center items-center gap-4 animate-bounce text-lg font-semibold mt-32 relative z-10">
                            Scroll to Discover
                        </p>
                    </div>
                </div>
                <div className="mt-0 lg:mt-[-15%] 2xl:mt-[-20%] w-fit-content ml-auto pointer-events-none max-w-[100%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] overflow-hidden z-[-10]">
                    <Image
                        src={
                            content.pageContent.heroCelebrityPhoto.node
                                .sourceUrl
                        }
                        alt={content.pageContent.heroCelebrityPhoto.node.title}
                        width={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.heroCelebrityPhoto.node
                                .mediaDetails.height
                        }
                        priority
                        className="object-contain object-right-bottom ml-[25%]"
                    />
                </div>
            </section>

            <section className="pt-20 sm:pt-0" id="process">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-center text-4xl sm:text-4xl sm:text-[50px] sm:leading-tight mb-8 secondary-font">
                            Access your treatment <br />
                            in three easy steps
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 xl:gap-x-20 gap-y-10 text-center">
                            {global.threeSteps.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={
                                        global.threeSteps.steps.length == i + 1
                                            ? "col-span-1 sm:col-span-2 lg:col-span-1 w-full sm:w-[50%] lg:w-full mx-auto"
                                            : ""
                                    }
                                >
                                    <Image
                                        className="mb-8 mx-auto h-auto w-[85px]"
                                        src={`/images/icons/access-${i}.svg`}
                                        alt={`${step.icon.node.title} Icon`}
                                        width={133}
                                        height={133}
                                    />
                                    <h3 className="text-4xl font-semibold mb-4 text-[#30e5f3] secondary-font">
                                        {step.title}
                                    </h3>
                                    <p className="text-xl font-light">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 sm:mt-20">
                            <Link href="/dashboard/eligibility">
                                <button
                                    className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                    title="Check Eligibility"
                                >
                                    Check Eligibility
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-40" id="eligibile-conditions">
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8 max-w-[700px] secondary-font">
                            What type of eligible conditions can we help with?
                        </h2>
                        <EligibleConditionsCarousel
                            conditions={global.eligibleConditions}
                        />
                    </div>
                </div>
            </section>

            {/* <section id="shop-by-strain" className="relative">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8">
                        Shop <br />
                        <span className="green-stroke">by strain</span>
                    </h2>
                    <ShopStrains />
                </div>
            </section> */}

            <section className="mt-40 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-lg font-semibold tracking-widest mb-8 text-[#fc69f8]">
                            NEED A PRESCRIPTION?
                        </p>
                        <h2 className="text-5xl sm:text-[74px] mb-12 secondary-font">
                            Check your eligibility
                        </h2>
                        <Link href="/dashboard/eligibility">
                            <button
                                className="secondary-font uppercase py-3 px-6 bg-transparent rounded-[7px] border border-[#fc69f8] border-2 text-[#fc69f8] text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="Check Eligibility"
                            >
                                Check Eligibility
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mt-12 pt-40 pb-52 relative">
                <div className="absolute top-0 left-0 w-full h-full z-[-10] pointer-events-none mask-top-bottom mix-blend-screen">
                    <LowPowerModeVideo
                        image={
                            <Image
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                src="/images/general/car.webp"
                                alt="Smoke"
                                width={1920}
                                height={1080}
                            />
                        }
                        video={
                            <video
                                className="absolute top-0 left-0 w-full h-full z-[-10] object-cover object-center"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="none"
                                poster="/images/general/car.webp"
                                width={1920}
                                height={1080}
                            >
                                <source
                                    src="/videos/car.mp4"
                                    type="video/mp4"
                                />
                                Your browser does not support the video tag.
                            </video>
                        }
                    />
                </div>
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="secondary-font">
                            Exclusive from {content.title}
                        </h2>
                    </div>
                    <div className="mx-auto sm:max-w-[80%] md:max-w-full backdrop-blur-[20px] rounded-[20px] border border-4 border-[#30e5f3] p-8 sm:p-16 mt-8 sm:mt-16 grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
                        <div className="relative w-[100%] lg:w-[80%] h-0 pb-[100%] lg:pb-[80%] mx-auto">
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_SERVER +
                                    strain.data.imageUrl
                                }
                                alt={strain.data.name}
                                fill
                                className="sm:p-10 animate-wiggle animate-duration-[4000ms] animate-infinite rounded-full"
                            />
                        </div>
                        <div>
                            <p className="text-6xl font-semibold secondary-font">
                                {strain.data.name}
                            </p>
                            <hr className="h-[2px] border-none bg-[#30e5f3] my-10" />
                            <p className="text-xl mb-4">
                                <span className="font-bold">FEELINGS: </span>
                                {strain.data.feelings}
                            </p>
                            <p className="text-xl mb-4">
                                <span className="font-bold">HELPS WITH: </span>
                                {strain.data.helpsWith}
                            </p>
                            <p className="text-xl mb-16">
                                <span className="font-bold">FLAVOURS: </span>
                                {strain.data.flavour}
                            </p>
                            <Link href="#eligibile-conditions">
                                <button
                                    className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                    title="Eligible Conditions"
                                >
                                    Eligible Conditions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-40 sm:pt-80 pb-80 relative">
                <div className="container mx-auto px-4">
                    <div className="">
                        <TextHightlight
                            text={
                                <p
                                    className="text-4xl sm:text-5xl lg:text-5xl font-medium lg:leading-snug"
                                    dangerouslySetInnerHTML={{
                                        __html: content.pageContent
                                            .largeParagraphText,
                                    }}
                                />
                            }
                            class="home-text"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-20 sm:mt-0">
                <div className="container mx-auto px-4">
                    <div>
                        <p className="text-[#fc69f8] text-lg font-semibold tracking-widest mb-2">
                            NEWS / UPDATES
                        </p>
                        <h2 className="text-4xl sm:text-[50px] leading-tight mb-8 secondary-font">
                            Dr. Green In The Press
                        </h2>
                        <NewsCarousel items={rssItems} />
                    </div>
                </div>
            </section>

            <section className="relative pb-32 pt-32 mt-40">
                <span className="absolute top-0 left-0 w-full h-full z-[-9] bg-[rgba(0,0,0,0.25)]" />
                <div className="mask-top-bottom absolute left-0 top-0 w-full h-full z-[-10] pointer-events-none">
                    <Image
                        className="absolute top-0 left-0 h-full w-full object-cover object-top"
                        src={
                            content.pageContent.madePossibleBackgroundImage.node
                                .sourceUrl
                        }
                        alt={
                            content.pageContent.madePossibleBackgroundImage.node
                                .title
                        }
                        width={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.width
                        }
                        height={
                            content.pageContent.madePossibleBackgroundImage.node
                                .mediaDetails.height
                        }
                    />
                </div>
                <div className="container mx-auto px-4">
                    <div>
                        <h2 className="text-4xl sm:text-[50px] leading-tight font-semibold mb-4 secondary-font">
                            Made possible <br />
                            by Dr. Green
                        </h2>
                        <p
                            className="text-[22px] font-light max-w-[750px] mb-8"
                            dangerouslySetInnerHTML={{
                                __html: content.pageContent
                                    .madePossibleParagraphText,
                            }}
                        />
                        <Link href="https://drgreennft.com/" target="_blank">
                            <button
                                className="secondary-font uppercase py-3 px-6 bg-[#fc69f8] rounded-[7px] border border-[#fc69f8] border-2 text-black text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                title="Learn More"
                            >
                                Learn More
                            </button>
                        </Link>
                        <div className="mt-10 sm:mt-0 xl:mt-[-10%] pointer-events-none">
                            <div className="ml-auto w-fit flex flex-col justify-center items-center max-w-full">
                                <div className="h-0 pb-[100%] relative max-w-full w-[800px]">
                                    <Image
                                        className="absolute top-0 left-0 h-full w-full object-cover object-center rounded-full"
                                        src={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .sourceUrl
                                        }
                                        alt={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .title
                                        }
                                        width={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.width
                                        }
                                        height={
                                            content.pageContent
                                                .madePossibleCelebrityImage.node
                                                .mediaDetails.height
                                        }
                                    />
                                </div>
                                <Image
                                    src="/images/general/shadow.webp"
                                    alt="Shadow"
                                    width={654}
                                    height={86}
                                    className="max-w-full w-[623px] h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative pt-40" id="faqs">
                <div className="container mx-auto px-4">
                    <div>
                        <div className="text-center mb-20">
                            <h2 className="text-5xl sm:text-7xl sm:leading-tight font-semibold secondary-font">
                                Questions?
                            </h2>
                            <p className="text-2xl font-semibold">
                                We&apos;ve got answers...
                            </p>
                        </div>
                        <FAQs />
                    </div>
                </div>
            </section>

            <section className="mt-20">
                <div className="container mx-auto px-4">
                    <div>
                        <div className=" text-center">
                            <p className="text-2xl font-semibold mb-6">
                                Something else on your mind? 🧐
                            </p>
                            <Link href="mailto:support@drgreennft.com">
                                <button
                                    className="secondary-font uppercase py-3 px-6 bg-transparent rounded-[7px] border border-[#fc69f8] border-2 text-[#fc69f8] text-3xl shadow hover:shadow-[0_0_15px_0px_#fc69f8] duration-200 ease-in-out"
                                    title="Reach Out"
                                >
                                    Reach Out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
