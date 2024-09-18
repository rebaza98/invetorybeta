import { connectToDB } from "@/utils/databse"
import Ubigeo from "@/models/core/ubigeo";

export const GET = async (req, context) => {
  console.log("REQ = ", req);

  try {
    await connectToDB();

    if (req.method === "GET") {
      const queryParams = new URLSearchParams(req.url.split('?')[1]);
      const q = queryParams.get('q');

      if (q) {
        const ubigeos = await Ubigeo.find({
          $or: [
            { ubigeoInei: { $regex: q, $options: "i" } },
            { ubigeoReniec: { $regex: q, $options: "i" } },
            { distrito: { $regex: q, $options: "i" } },
          ]
        });
        
        return new Response(JSON.stringify(ubigeos), { status: 200 });
        
      } else {
        console.log("Missing query parameter 'q'");
        return new Response("ERROR 400: Missing query parameter 'q'", {
          status: 400
        });
      }
    }

    console.log("Method not allowed");
    return new Response("ERROR 405: Method not allowed", { status: 405 });
  } catch (error) {
    console.error("Error fetching personas:", error);
    return new Response("ERROR 500: Failed to fetch personas", { status: 500 });
  }
};




// import ubigeos from "@/public/static/ubigeo"

// export const GET = async (req, context) => {

//   try {
//     if (req.method === 'GET') {
//       const queryParams = new URLSearchParams(req.url.split('?')[1]);
//       const q = queryParams.get('q');

//       if (q) {
//         const filteredUbigeos = ubigeos.filter((ubigeo) => {
//             return (
//                 (ubigeo.ubigeoReniec && typeof ubigeo.ubigeoReniec === 'string' && ubigeo.ubigeoReniec.toLowerCase().includes(q.toLowerCase())) ||
//                 (ubigeo.ubigeoInei && typeof ubigeo.ubigeoInei === 'string' && ubigeo.ubigeoInei.toLowerCase().includes(q.toLowerCase())) ||
//                 (ubigeo.distrito && typeof ubigeo.distrito === 'string' && ubigeo.distrito.toLowerCase().includes(q.toLowerCase()))
//               );
//         });
//         return new Response(JSON.stringify(filteredUbigeos), { status: 200 });
//       } else {
//         return new Response("ERROR 400: Missing query parameter 'q'", {
//           status: 400
//         });
//       }
//     }

//     return new Response("ERROR 405: Method not allowed", { status: 405 });
//   } catch (error) {
//     console.error("Error fetching ubigeos:", error);
//     return new Response("ERROR 500: Failed to fetch ubigeos", { status: 500 });
//   }
// };

