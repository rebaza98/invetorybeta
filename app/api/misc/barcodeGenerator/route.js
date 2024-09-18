// app/api/misc/barcodeGenerator/route.js
import bwipjs from 'bwip-js';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  console.log("TEST = text = ", text)

  if (!text) {
    return new Response('Text query parameter is required', { status: 400 });
  }

  try {
    const png = await new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',       // Barcode type
        text: text,            // Text to encode
        scale: 3,              // 3x scaling factor
        //height: 10,            // Bar height, in millimeters
        includetext: true,     // Show human-readable text
        textyoffset: 1,
        textxalign: 'center',  // Always good to set this
      }, (err, png) => {
        if (err) {
          reject(err);
        } else {
          resolve(png);
        }
      });
    });

    return new Response(png, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    return new Response(error.toString(), { status: 500 });
  }
}
