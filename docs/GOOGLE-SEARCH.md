# Google Search setup

The public canonical website is **https://www.stratumcorporate.com**. The bare domain redirects there. The website code prepares search metadata; it does not submit or verify a Google account.

## Business and search information

The site describes Stratum Corporate Ltd., its office at Plot 1611/1612 Oka-Akoko Street, Garki, Abuja, Nigeria, and services for businesses operating across Nigeria and international investors entering the Nigerian market. The address comes from the existing published project configuration.

Search titles, descriptions and visible copy cover:

- CAC company registration, business name registration and Nigerian market entry.
- Company restructuring and CAC post-incorporation changes.
- HR consulting, workplace policies and employee handbooks.
- Trademark and patent registration in Nigeria.
- CAC annual returns, SCUML and statutory compliance.
- NAFDAC registration, SON certification and industry licensing.

`LocalBusiness`, `WebSite`, `Service` and breadcrumb JSON-LD connect the office, service catalog and website. Real public phone, email and social profiles are included when configured. Unknown prices, ratings, coordinates and opening hours are not invented.

Google does not use the meta keywords tag for indexing or ranking. Relevant page titles, descriptions and useful visible content are used instead. Sources: [supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags), [local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Deploy and check

1. Deploy these changes to the production Vercel project connected to the live domain. Keep its existing HTTPS redirect from `stratumcorporate.com` to `www.stratumcorporate.com`.
2. Leave `SITE_URL` unset to use the default, or set it to `https://www.stratumcorporate.com`. Remove any old override pointing to `stratumgov.vercel.app`.
3. Keep the actual `OWNER_EMAIL`, `OWNER_PHONE_NUMBER`, address and social URLs configured. If the office changes, update `OWNER_OFFICE_ADDRESS`, `OWNER_LOCATION`, `OWNER_CITY`, `OWNER_REGION`, the embedded map and any Abuja-specific page copy.
4. Check the homepage source. The canonical URL should use `www.stratumcorporate.com` and the production robots meta tag should allow indexing.
5. Check [robots.txt](https://www.stratumcorporate.com/robots.txt): allow `/`, disallow `/api/`, and reference the public sitemap. Vercel previews and local development remain excluded.
6. Check [sitemap.xml](https://www.stratumcorporate.com/sitemap.xml). URLs should use the live domain, with confirmed service pages included and sample insights, the draft privacy page and unpublished news excluded.
7. Test the public homepage and a service URL with [Google's Rich Results Test](https://search.google.com/test/rich-results). Local tests cannot prove what Google can fetch from a deployment.

## Google Search Console

Open [Google Search Console](https://search.google.com/search-console/about) using the business owner's Google account.

You can add a **Domain property** for `stratumcorporate.com` and add the exact DNS TXT record supplied by Google at your DNS provider. Domain properties use DNS verification and cover both the bare domain and `www`.

Alternatively, add a **URL-prefix property** for `https://www.stratumcorporate.com/` and select **HTML tag** verification. Google gives you a tag like:

```html
<meta name="google-site-verification" content="YOUR_GOOGLE_TOKEN" />
```

Set `GOOGLE_SITE_VERIFICATION` in Vercel's Production environment to only the **real content value**, not the whole tag. Rebuild/redeploy, confirm the tag in the live homepage source, and click **Verify** in Search Console. Keep the token after verification. This code does not publish a placeholder token.

See [Google's ownership-verification instructions](https://support.google.com/webmasters/answer/9008080).

After verification:

1. In **Sitemaps**, submit `https://www.stratumcorporate.com/sitemap.xml` (or just `sitemap.xml` when the interface already supplies the domain).
2. In **URL inspection**, inspect `https://www.stratumcorporate.com/`, run **Test live URL**, and choose **Request indexing** when the page is accessible and indexable. Repeat for `/services`, `/contact` and priority service pages.
3. Monitor **Page indexing** for exclusions and unexpected canonical URLs. Use **Performance** to track searches for the business name, services and Abuja/Nigeria combinations.
4. Create or claim the business's [Google Business Profile](https://www.google.com/business/) if eligible. Use the same real business name, address, phone, hours and website. Business Profile verification is separate from Search Console.

Submitting a sitemap does not guarantee indexing or a particular ranking. Sources: [sitemap submission](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl), [structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
