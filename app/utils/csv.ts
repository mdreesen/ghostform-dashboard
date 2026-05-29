import { nameSpreadsheet } from "./names";

export function useCSV(leads: Array<any>) {
    // 1. Define Headers
    const headers = ['Name', 'Email', 'Phone', 'Age', 'Address', 'Status', 'Date', 'buy | sell | both', 'Estimated home price', 'Sqft', 'Bedrooms', 'Bathrooms', 'Budget',];

    // 2. Map data to rows
    const rows = leads.map(lead => [
        lead?.name,
        lead?.email,
        lead?.phone,
        lead?.age,
        lead?.address?.replace(/[,.]/g, ""),
        lead?.status,
        lead?.date,
        lead?.buy_sell_both,
        lead?.price,
        lead?.sqft,
        lead?.bedrooms,
        lead?.bathrooms,
        lead?.budget?.toString()?.replace(/[^0-9.-]+/g, ""), // Strip currency symbols for spreadsheet math
    ]);

    // 3. Construct CSV String
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    // 4. Create Download Link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', nameSpreadsheet('csv'));
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};