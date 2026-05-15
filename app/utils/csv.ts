export function exportLeadsCSV(leads: Array<any>) {
    // 1. Define Headers
    const headers = ['Name', 'Email', 'Phone', 'Age', 'Address', 'Status', 'Date', 'buy | sell | both', 'Estimated home price', 'Sqft', 'Bedrooms', 'Bathrooms', 'Budget',];

    // 2. Map data to rows
    const rows = leads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.age,
        lead.address,
        lead.status,
        lead.date,
        lead.buy_sell_both,
        lead.price,
        lead.sqft,
        lead.bedrooms,
        lead.bathrooms,
        lead.budget.toString().replace(/[^0-9.-]+/g, ""), // Strip currency symbols for spreadsheet math
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
    link.setAttribute('download', `GhostForm_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


// Could take the more Pro route below?
// export function exportLeadsCSV(leads: Array<any>) {
//     const dataToExport = leads.map(lead => ({
//         Entity: lead.name,
//         Tier: `Tier ${lead.tier}`,
//         'Quality Score': lead.score,
//         Budget: lead.budget,
//         Source: lead.source,
//         Status: lead.status,
//         Date: lead.date
//     }));

//     // Create a worksheet from the JSON data
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);

//     // Create a new workbook and append the worksheet
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Lead Archive");

//     // Trigger the download with a clean filename
//     const datestamp = new Date().toISOString().split('T')[0];
//     XLSX.writeFile(workbook, `GhostForm_Intake_${datestamp}.xlsx`);
// };