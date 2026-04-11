import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type SeoOptions = {
    title: string;
    description?: string;
    path: string;
};

const SITE_URL = 'https://hvltech.de';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!el) {
        el = document.createElement('link');
        el.rel = 'canonical';
        document.head.appendChild(el);
    }
    el.href = href;
}

export function useSeo({ title, description, path }: SeoOptions) {
    const { i18n } = useTranslation();

    useEffect(() => {
        const lang = i18n.resolvedLanguage || i18n.language || 'en';
        document.documentElement.lang = lang;
        document.title = title;
        const url = `${SITE_URL}${path}`;
        upsertCanonical(url);
        upsertMeta('property', 'og:title', title);
        upsertMeta('property', 'og:url', url);
        upsertMeta('name', 'twitter:title', title);
        if (description) {
            upsertMeta('name', 'description', description);
            upsertMeta('property', 'og:description', description);
            upsertMeta('name', 'twitter:description', description);
        }
    }, [title, description, path, i18n.resolvedLanguage, i18n.language]);
}
