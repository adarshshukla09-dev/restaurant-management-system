import QRCode from "qrcode";

export const generateTableQR = async (tableId: string) => {
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/table/${tableId}`;

  const qr = await QRCode.toDataURL(url);

  return qr; // base64 image
};