import {Trans, useTranslation} from "react-i18next";

export default function AboutUs() {
    const {t} = useTranslation();
    return (
        <>
            <h2 className="font-['Press_Start_2P'] font-normal text-base text-[#00274a]">{t('aboutAs.highline')}</h2>
            <Trans
                i18nKey='aboutAs.description'
                components={[
                    <p key="p"/>,
                    <i key="i"/>
                ]}
            />
        </>
    );
}
