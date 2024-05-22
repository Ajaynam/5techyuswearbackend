
// const express = require('express');
// const axios = require('axios');
// const app = express();
// const port = 5000; // You can use any available port
// const cors = require('cors');


// app.use(cors({
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }));

// app.use(express.json());

// app.get('/track', async (req, res) => {
//   const trackingNumber = req.query.trackingNumber;

//   try {
//     const response = await axios.get(`http://www.smespl.in/Frm_DocTrackWeb.aspx?docno=${trackingNumber}&Tmp=1716360625895`, {
//       headers: {
//         'Content-Type': 'text/html',
//       },
//     });

//     res.send(response.data);
//   } catch (error) {
//     res.status(500).send('Error fetching tracking details');
//   }
// });

// app.listen(port, () => {
//   console.log(`Proxy server running on http://localhost:${port}`);
// });
