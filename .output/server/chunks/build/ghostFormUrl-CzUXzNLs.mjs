function ghostFormUrl(useCategory, useName, useEmail, useCalendar) {
  const category = useCategory ? `category=${useCategory}` : "";
  const email = useEmail ? `&company_email=${useEmail}` : "";
  const name = useName ? `&company_name=${useName}` : "";
  const calendar = useCalendar ? `&calendar=${useCalendar}` : "";
  return `https://ghostform-zeta.vercel.app/?${category}${name}${email}${calendar}&background_color=0f0b0b&font_color=FFFFFF`;
}

export { ghostFormUrl as g };
//# sourceMappingURL=ghostFormUrl-CzUXzNLs.mjs.map
