// server/api/qr/[id].get.ts

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  // 1. Define the unique destination
  const scanUrl = `https://ghostform.com/capture?ref=${id}`
  
  // 2. Generate the QR as a Buffer or DataURL
  // In a real implementation, use a library like 'qrcode'
  const QRCode = require('qrcode')
  
  try {
    const pngBuffer = await QRCode.toBuffer(scanUrl, {
      color: {
        dark: '#30cf43', // Ghost Green
        light: '#0a0a0c', // Ghost Dark
         margin: 2
    }})

    // 3. Return as a proper image response
    setResponseHeader(event, 'Content-Type', 'image/png')
    return pngBuffer
  } catch (err) {
    throw createError({ statusCode: 500, message: 'QR Generation Failed' })
  }
})