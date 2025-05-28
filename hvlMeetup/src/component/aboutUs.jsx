import React from 'react';
import {Trans, useTranslation} from "react-i18next";

const AboutUs = () => {
    const{t} = useTranslation();
    return (
        <>
            <h2>{t('aboutAs.highline')}</h2>
            <Trans i18nKey='aboutAs.description'>
                <p>Welcome to <i> Havelland Technology Meetup</i> the premier meetup group for software
                    developers
                    in
                    Falkensee &
                    the surrounding area! We believe that Falkensee is home to some of the best developers,
                    and we
                    invite all tech enthusiasts to join us. No matter what language or platform you work
                    with,
                    everyone is welcome here.</p>
            </Trans>
        </>
    );
};

export default AboutUs;