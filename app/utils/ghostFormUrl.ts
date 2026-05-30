export function ghostFormUrl(useCategory: string, useSource: string, useId: string, useName: string, useEmail: string, useCalendar: string) {
    // For the questions (the source), valid question rendering is as follows:
    // default or data_entry
    // on_market (the house is on the market and lead wants their info to chat with realtor)
    // open_house (open house data gathering from lead)

    const category = useCategory ? `category=${useCategory}` : '';
    const source = useSource ? `&source=${useSource}` : '';
    const id = useCategory ? `id=${useId}` : '';
    const email = useEmail ? `&company_email=${useEmail}` : '';
    const name = useName ? `&company_name=${useName}` : '';
    const calendar = useCalendar ? `&calendar=${useCalendar}` : '';

    // <baseUrl>/?category=realtor&source=default&company_name=$2b$15$eXsdK5TP.TC/M8QXsUuwh.bddChSOn8vckNGoWzXljfIktJ9Zs80y&company_email=$2b$15$8kJfxGFr8anR5xLRxFSIeO8KnG2zH4asf27ZpRjz1X6xhFcmFORCq&calendar=https://calendly.com/whiteravendev90/30min&background_color=#09090B&font_color=#FFFFFF
    return `https://ghostform-zeta.vercel.app/?${category}${source}${id}${name}${email}${calendar}&background_color=0f0b0b&font_color=FFFFFF`
}