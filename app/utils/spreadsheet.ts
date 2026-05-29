import { ref } from 'vue'
import { nameSpreadsheet } from '~/utils/names';
export interface LeadRecord {
    _id: string
    name: string
    email: string
    phone: number | string
    source: string
    address: string
    budget: number
    price: number
    sqft: number
    bedrooms: number
    bathrooms: number
    status: string
    date: string
    notes?: string
    ai_analysis?: string
}

export function useSpreadsheet() {
    const isGenerating = ref(false)

    const exportLeadsToXLSX = async (leadsArray: LeadRecord[], fileName = nameSpreadsheet('xlsx')) => {
        // Drop execution gracefully if user has empty pipeline tables
        if (!leadsArray || leadsArray.length === 0) {
            console.warn('Excel pipeline process skipped: Array payload empty.')
            return
        }

        isGenerating.value = true

        try {
            // FIX: Lazy-load exceljs explicitly on the client side inside this lifecycle block.
            // This bypasses top-level build errors and keeps Vite running smoothly.
            const ExcelJS = (await import('exceljs')).default
            const workbook = new ExcelJS.Workbook()

            // 1. Setup Sheet Views with Visible Gridlines Explicitly Handshaked
            const wsDash = workbook.addWorksheet('Executive Dashboard', { views: [{ showGridLines: true }] })
            const wsData = workbook.addWorksheet('Lead Telemetry', { views: [{ showGridLines: true }] })

            // =========================================================
            // TAB 2: RAW LEAD TELEMETRY POPULATION
            // =========================================================
            wsData.columns = [
                { header: 'System ID', key: 'id', width: 12 },
                { header: 'Entity Name', key: 'name', width: 22 },
                { header: 'Email Routing', key: 'email', width: 28 },
                { header: 'Phone Telemetry', key: 'phone', width: 16 },
                { header: 'Capture Source', key: 'source', width: 16 },
                { header: 'Property Target Address', key: 'address', width: 35 },
                { header: 'Allocated Budget', key: 'budget', width: 16 },
                { header: 'Pipeline Status', key: 'status', width: 16 },
                { header: 'Capture Date', key: 'date', width: 14 }
            ]

            // FIXED: Safely parsing elements from the unified functional payload parameter
            leadsArray.forEach((lead) => {
                wsData.addRow({
                    id: lead._id ? lead._id.substring(0, 8).toUpperCase() : 'N/A',
                    name: lead.name || 'Anonymous Node',
                    email: lead.email || 'N/A',
                    phone: lead.phone && lead.phone !== 0 ? lead.phone.toString() : 'N/A',
                    source: lead.source || 'Direct Scan',
                    address: lead.address || 'N/A',
                    // Handle your zero fallbacks cleanly if data records came in unmapped
                    budget: Number(lead.budget) || Number(lead.price) || 0,
                    status: lead.status ? lead.status.toUpperCase() : 'ACTIVE',
                    date: lead.date ? new Date(lead.date).toISOString().split('T')[0] : 'N/A'
                })
            })

            // Stylize Data Header Row (GhostForm Tactical Charcoal Theme)
            wsData.getRow(1).eachCell((cell) => {
                cell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FFFFFF' }, size: 11 }
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '121214' } }
                cell.alignment = { vertical: 'middle', horizontal: 'left' }
            })

            // Mask Data Formats and Apply Alternating Zebra Striping
            wsData.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return

                row.getCell('budget').numFormat = '$#,##0'
                row.getCell('status').alignment = { horizontal: 'center' }
                row.getCell('date').alignment = { horizontal: 'center' }

                // Alternating background tinting
                if (rowNumber % 2 === 0) {
                    row.eachCell((cell) => {
                        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8F9FA' } }
                    })
                }

                // Apply thin borders to all records uniformly
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin', color: { argb: 'E5E7EB' } },
                        left: { style: 'thin', color: { argb: 'E5E7EB' } },
                        bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
                        right: { style: 'thin', color: { argb: 'E5E7EB' } }
                    }
                })
            })

            // =========================================================
            // TAB 1: EXECUTIVE DASHBOARD POPULATION (USING FORMULAS)
            // =========================================================
            const totalRows = leadsArray.length + 1

            // Title Card Typography Blocks
            wsDash.mergeCells('B2:E2')
            const titleCell = wsDash.getCell('B2')
            titleCell.value = 'GHOSTFORM LEAD OVERVIEW METRICS'
            titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: '111827' } }

            wsDash.mergeCells('B3:E3')
            const subCell = wsDash.getCell('B3')
            subCell.value = 'Authorized Personnel Only // Real Estate Conversion Analytics'
            subCell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: '6B7280' } }

            // KPI Metric Highlights Table Block
            wsDash.getCell('B5').value = 'PIPELINE KPI HIGHLIGHTS'
            wsDash.getCell('B5').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: '111827' } }

            const kpis = [
                { label: 'TOTAL CAPTURED RADAR VOLUME', formula: `=SUM('Lead Telemetry'!G2:G${totalRows})`, format: '$#,##0' },
                { label: 'MAX VALUE CAPACITY SPEC', formula: `=MAX('Lead Telemetry'!G2:G${totalRows})`, format: '$#,##0' },
                { label: 'TOTAL REGISTERED OPERATIONS', formula: `=COUNTA('Lead Telemetry'!A2:A${totalRows})`, format: '0' }
            ]

            let currentKpiRow = 6
            kpis.forEach((kpi) => {
                wsDash.getCell(`B${currentKpiRow}`).value = kpi.label
                wsDash.getCell(`B${currentKpiRow}`).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: '4B5563' } }

                const valCell = wsDash.getCell(`D${currentKpiRow}`)
                valCell.value = kpi.formula
                valCell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: '1E6B27' } }
                valCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'EAF9EC' } } // Soft Tech-Green Tint
                valCell.numFormat = kpi.format
                valCell.alignment = { horizontal: 'right' }
                valCell.border = {
                    top: { style: 'thin', color: { argb: '30CF43' } },
                    bottom: { style: 'thin', color: { argb: '30CF43' } },
                    left: { style: 'thin', color: { argb: '30CF43' } },
                    right: { style: 'thin', color: { argb: '30CF43' } }
                }
                currentKpiRow++
            })

            // Pipeline Status Distribution Sub-Table
            wsDash.getCell('B11').value = 'PIPELINE STATE DISTRIBUTION'
            wsDash.getCell('B11').font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: '111827' } }

            wsDash.getRow(12).values = ['', 'Status Matrix', 'Record Volume Metric']
            wsDash.getRow(12).eachCell((cell, colIdx) => {
                if (colIdx < 2) return
                cell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FFFFFF' }, size: 10 }
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '121214' } }
            })

            const statuses = ['ACTIVE', 'UNDER CONTRACT', 'ARCHIVED']
            let currentStatusRow = 13
            statuses.forEach((status) => {
                wsDash.getCell(`B${currentStatusRow}`).value = status
                wsDash.getCell(`B${currentStatusRow}`).font = { name: 'Segoe UI', size: 11, color: { argb: '374151' } }

                const countCell = wsDash.getCell(`C${currentStatusRow}`)
                countCell.value = `=COUNTIF('Lead Telemetry'!H2:H${totalRows}, "${status}")`
                countCell.font = { name: 'Segoe UI', size: 11, font: 'mono' }
                countCell.alignment = { horizontal: 'right' }

                // Borders for metric rows
                wsDash.getCell(`B${currentStatusRow}`).border = { bottom: { style: 'thin', color: { argb: 'E5E7EB' } } }
                countCell.border = { bottom: { style: 'thin', color: { argb: 'E5E7EB' } } }

                currentStatusRow++
            })

            // Fixed Layout Width Overrides for Dashboard Tab
            //  CORRECT EXCELJS REPLACEMENT MATRIX:
            wsDash.getColumn('A').width = 4
            wsDash.getColumn('B').width = 34
            wsDash.getColumn('C').width = 26
            wsDash.getColumn('D').width = 20

            // =========================================================
            // WRITE STREAM FILE DISPATCH
            // =========================================================
            const buffer = await workbook.xlsx.writeBuffer()
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

            const link = document.createElement('a')
            const blobUrl = URL.createObjectURL(blob)

            link.href = blobUrl
            link.download = fileName
            document.body.appendChild(link)
            link.click()

            // Cleanup garbage allocations to preserve memory space
            document.body.removeChild(link)
            URL.revokeObjectURL(blobUrl)

        } catch (error) {
            console.error('Spreadsheet assembly phase halted via composable:', error)
        } finally {
            isGenerating.value = false
        }
    }

    return {
        exportLeadsToXLSX,
        isGenerating
    }
}