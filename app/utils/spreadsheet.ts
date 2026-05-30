import { ref } from 'vue'
import { nameSpreadsheet } from '~/utils/names'
export interface LeadRecord {
  _id?: string
  name?: string
  email?: string
  phone?: string | string
  age?: number | string
  address?: string
  status?: string
  date?: string
  buy_sell_both?: string
  price?: number | string
  sqft?: number | string
  bedrooms?: number | string
  bathrooms?: number | string
  budget?: number | string
}

export function useSpreadsheet() {
  const isGenerating = ref(false)

  const exportLeadsToXLSX = async (leadsArray: LeadRecord[], fileName = nameSpreadsheet('xlsx')) => {
    if (!leadsArray || leadsArray.length === 0) {
      console.warn('Excel pipeline process skipped: Array payload empty.')
      return
    }

    isGenerating.value = true

    try {
      const ExcelJS = (await import('exceljs')).default
      const workbook = new ExcelJS.Workbook()
      
      // Setup Sheet Views with Visible Gridlines explicitly declared
      const wsData = workbook.addWorksheet('Lead Telemetry', { views: [{ showGridLines: true }] })

      // =========================================================
      // STRICT ALIGNMENT: 13 MAPPED COLUMNS MATCHING THE CSV SPEC
      // =========================================================
      wsData.columns = [
        { header: 'Name', key: 'name', width: 22 },
        { header: 'Email', key: 'email', width: 28 },
        { header: 'Phone', key: 'phone', width: 16 },
        { header: 'Age', key: 'age', width: 10 },
        { header: 'Address', key: 'address', width: 35 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Date', key: 'date', width: 14 },
        { header: 'buy | sell | both', key: 'intent', width: 18 },
        { header: 'Estimated home price', key: 'price', width: 22 },
        { header: 'Sqft', key: 'sqft', width: 12 },
        { header: 'Bedrooms', key: 'beds', width: 12 },
        { header: 'Bathrooms', key: 'baths', width: 12 },
        { header: 'Budget', key: 'budget', width: 16 }
      ]

      // Iterate through records and clear out unentered zero parameters safely
      leadsArray.forEach((lead) => {
        wsData.addRow({
          name: lead.name || 'Anonymous Node',
          email: lead.email || '',
          
          // Data Scrubbing: If value is 0 or empty string, keep cell unpopulated
          phone: lead.phone && lead.phone !== '' && lead.phone !== '0' ? lead.phone.toString() : '',
          age: lead.age && lead.age !== 0 && lead.age !== '0' ? Number(lead.age) : '',
          address: lead.address || '',
          status: lead.status ? lead.status.toLowerCase() : 'new',
          
          // Formats time strings to flat YYYY-MM-DD format if valid
          date: lead.date && lead.date !== 'Invalid Date' ? new Date(lead.date).toISOString().split('T')[0] : '',
          
          intent: lead.buy_sell_both || '',
          price: lead.price && lead.price !== 0 && lead.price !== '0' ? Number(lead.price) : '',
          sqft: lead.sqft && lead.sqft !== 0 && lead.sqft !== '0' ? Number(lead.sqft) : '',
          beds: lead.bedrooms && lead.bedrooms !== 0 && lead.bedrooms !== '0' ? Number(lead.bedrooms) : '',
          baths: lead.bathrooms && lead.bathrooms !== 0 && lead.bathrooms !== '0' ? Number(lead.bathrooms) : '',
          budget: lead.budget && lead.budget !== 0 && lead.budget !== '0' ? Number(lead.budget) : ''
        })
      })

      // Stylize Data Header Row (GhostForm Minimal Swiss Charcoal Theme)
      wsData.getRow(1).eachCell((cell) => {
        cell.font = { name: 'Segoe UI', bold: true, color: { argb: 'FFFFFF' }, size: 11 }
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '121214' } }
        cell.alignment = { vertical: 'middle', horizontal: 'left' }
      })

      // Apply Explicit Column Masks and Alternating Zebra Striping
      wsData.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return

        // Alignments & Number Format Masks
        row.getCell('phone').alignment = { horizontal: 'left' }
        row.getCell('age').alignment = { horizontal: 'center' }
        row.getCell('status').alignment = { horizontal: 'center' }
        row.getCell('date').alignment = { horizontal: 'center' }
        row.getCell('intent').alignment = { horizontal: 'center' }
        row.getCell('sqft').alignment = { horizontal: 'right' }
        row.getCell('beds').alignment = { horizontal: 'center' }
        row.getCell('baths').alignment = { horizontal: 'center' }
        
        // Dynamic Number Formatting for currency rows (hides values completely if cell is blank)
        row.getCell('price').numFmt = '$#,##0;($#,##0);""'
        row.getCell('budget').numFmt = '$#,##0;($#,##0);""'
        row.getCell('price').alignment = { horizontal: 'right' }
        row.getCell('budget').alignment = { horizontal: 'right' }

        // Muted Zebra Striping on alternative lines
        if (rowNumber % 2 === 0) {
          row.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8F9FA' } }
          })
        }
        
        // Clean structural border frame tracking lines
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'E5E7EB' } },
            left: { style: 'thin', color: { argb: 'E5E7EB' } },
            bottom: { style: 'thin', color: { argb: 'E5E7EB' } },
            right: { style: 'thin', color: { argb: 'E5E7EB' } }
          }
        })
      })

      // Explicit Width Safe Overrides for Aligned Columns
      wsData.getColumn('name').width = 24
      wsData.getColumn('email').width = 30
      wsData.getColumn('phone').width = 16
      wsData.getColumn('age').width = 10
      wsData.getColumn('address').width = 38
      wsData.getColumn('status').width = 12
      wsData.getColumn('date').width = 14
      wsData.getColumn('intent').width = 18
      wsData.getColumn('price').width = 22
      wsData.getColumn('sqft').width = 12
      wsData.getColumn('beds').width = 12
      wsData.getColumn('baths').width = 12
      wsData.getColumn('budget').width = 18

      // =========================================================
      // EXECUTE STREAM DOWNSTREAM LINK CAPTURE
      // =========================================================
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      
      const link = document.createElement('a')
      const blobUrl = URL.createObjectURL(blob)
      
      link.href = blobUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      
      // Cleanup browser cache tracking
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)

    } catch (error) {
      console.error('Spreadsheet assembly phase halted via aligned composable:', error)
    } finally {
      isGenerating.value = false
    }
  }

  return {
    exportLeadsToXLSX,
    isGenerating
  }
}