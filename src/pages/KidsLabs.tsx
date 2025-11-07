import {useTranslation} from "react-i18next";
import Footer from "../component/footer";
import TranslateBtn from "../component/translateBtn";
import Navigation from "../component/navigation";
import BorderedBox from "../component/borderedBox";

function KidsLabs() {
    const {t} = useTranslation();

    return (
        <div className="">
            <main className="flex-1">
                <Navigation />
                <nav
                    className="fixed top-4 z-50 px-2 py-2 sm:px-4 right-4sm:right-8 md:right-12 lg:right-16 xl:right-1/2 xl:translate-x-[560px]"
                >
                    <TranslateBtn />
                </nav>

                <section className="bg-white w-full max-w-[1120px] mx-auto px-8 py-16">
                    <div className="flex flex-col items-center gap-8">
                        <h1 className="font-['Press_Start_2P'] font-normal text-2xl md:text-3xl text-center text-[#00274a]">
                            {t('kidsLabs.title')}
                        </h1>

                        <div className="w-full max-w-3xl">
                            <BorderedBox>
                                <div className="p-6 space-y-4">
                                    <div className="text-center">
                                        <p className="font-['Press_Start_2P'] text-sm text-[#00274a] mb-2">
                                            {t('kidsLabs.date')}
                                        </p>
                                        <p className="text-lg">
                                            {t('kidsLabs.duration')}
                                        </p>
                                    </div>
                                </div>
                            </BorderedBox>
                        </div>

                        <div className="w-full max-w-3xl space-y-6">
                            <div>
                                <h2 className="font-['Press_Start_2P'] font-normal text-lg text-[#00274a] mb-4">
                                    {t('kidsLabs.about.title')}
                                </h2>
                                <p className="text-base leading-relaxed">
                                    {t('kidsLabs.about.description')}
                                </p>
                            </div>

                            <div>
                                <h2 className="font-['Press_Start_2P'] font-normal text-lg text-[#00274a] mb-4">
                                    {t('kidsLabs.ageGroups.title')}
                                </h2>
                                <ul className="list-none space-y-2 pl-4">
                                    <ListItem>{t('kidsLabs.ageGroups.group1')}</ListItem>
                                    <ListItem>{t('kidsLabs.ageGroups.group2')}</ListItem>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-['Press_Start_2P'] font-normal text-lg text-[#00274a] mb-4">
                                    {t('kidsLabs.activities.title')}
                                </h2>
                                <ul className="list-none space-y-3 pl-4">
                                    <ActivityItem
                                        title={t('kidsLabs.activities.circuits.title')}
                                        description={t('kidsLabs.activities.circuits.description')}
                                    />
                                    <ActivityItem
                                        title={t('kidsLabs.activities.hourOfCode.title')}
                                        description={t('kidsLabs.activities.hourOfCode.description')}
                                    />
                                    <ActivityItem
                                        title={t('kidsLabs.activities.minecraft.title')}
                                        description={t('kidsLabs.activities.minecraft.description')}
                                    />
                                </ul>
                            </div>

                            <div className="pt-6 text-center">
                                <p className="text-lg mb-6">
                                    {t('kidsLabs.callToAction')}
                                </p>
                                <a
                                    href="https://www.meetup.com/havelland-technology-falkensee/"
                                    className="inline-block no-underline uppercase font-['Press_Start_2P'] bg-[#fefefe] text-[#00274a] border-4 border-[#00274a] px-6 py-3 text-sm cursor-pointer shadow-[4px_4px_0_#0d1b21] transition-all duration-100 ease-in-out hover:transform hover:-translate-x-1 hover:-translate-y-1 focus:outline-none focus:ring-0"
                                >
                                    {t('kidsLabs.registerButton')}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

function ListItem({children}: { children: React.ReactNode }) {
    return (
        <li className="pb-1.5 before:content-['■'] before:text-[#008000] before:inline-block before:w-[1.3em] before:ml-[-0.5em]">
            {children}
        </li>
    )
}

function ActivityItem({title, description}: { title: string, description: string }) {
    return (
        <li className="pb-1.5 before:content-['■'] before:text-[#008000] before:inline-block before:w-[1.3em] before:ml-[-0.5em]">
            <span className="font-bold">{title}</span> – {description}
        </li>
    )
}

export default KidsLabs
