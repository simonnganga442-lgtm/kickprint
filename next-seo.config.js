// next-seo.config.js
const siteUrl = 'https://kickprints.netlify.app/'; // Update when you buy the domain

export default {
    title: 'Kick First | Shop the Latest Kicks',
    description: 'Buy the latest sneakers and streetwear at unbeatable prices.',
    canonical: siteUrl,
    openGraph: {
        type: 'website',
        locale: 'en_KE',
        url: siteUrl,
        site_name: 'Kick First',
    },
    twitter: {
        handle: '@simonngang53107',
        site: '@simonngang53107',
        cardType: 'summary_large_image',
    },
};
