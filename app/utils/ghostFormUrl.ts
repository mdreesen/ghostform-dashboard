/**
 * Build a configured GhostForm capture link.
 *
 * Every value is URL-encoded. This matters because:
 *  - company_name / company_email are bcrypt hashes containing `$`, `.` and `/`
 *  - calendar is a full URL containing `://` and possibly `?`/`&`
 *  - a raw `#` (e.g. a hex colour) starts the URL FRAGMENT, so everything after
 *    it is never sent to the server and silently disappears
 * Unencoded, any of these can truncate or corrupt the query string, which shows
 * up as a form that can't identify the realtor.
 */
export function ghostFormUrl(
    useCategory: string,
    useSource: string,
    useId: string,
    useName: string,
    useEmail: string,
    useCalendar?: string,
    useAddress?: string,
    useLead?: string,
    options?: { backgroundColor?: string; fontColor?: string; baseUrl?: string }
) {
    // For the questions (the source), valid question rendering is as follows:
    // default or data_entry
    // on_market (the house is on the market and lead wants their info to chat with realtor)
    // open_house (open house data gathering from lead)

    const base = options?.baseUrl || 'https://ghostform-zeta.vercel.app/';

    // Hex colours are stored WITHOUT the leading '#'. Strip it if one is passed
    // — an unencoded '#' would turn the rest of the link into a fragment.
    const stripHash = (c?: string) => (c || '').replace(/^#/, '');

    const params = new URLSearchParams();
    if (useCategory) params.set('category', useCategory);
    if (useSource) params.set('source', useSource);
    if (useCategory && useId) params.set('id', useId);
    if (useName) params.set('company_name', useName);
    if (useEmail) params.set('company_email', useEmail);
    if (useCalendar) params.set('calendar', useCalendar);
    if (useLead) params.set('lead', useLead);
    if (useAddress) params.set('address', useAddress);
    // params.set('background_color', stripHash(options?.backgroundColor) || 'F7F4EF');
    // params.set('font_color', stripHash(options?.fontColor) || '1F1B16');

    return `${base}?${params.toString()}`;
}
