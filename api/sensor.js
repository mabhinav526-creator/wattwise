let latestData = {
  voltage: 0,
  current: 0,
  power: 0,
  status: "OFF"
};

export default async function handler(req, res) {

  // ESP32 sends data
  if (req.method === "POST") {
    latestData = {
      voltage: Number(req.body.voltage || 0),
      current: Number(req.body.current || 0),
      power: Number(req.body.power || 0),
      status: req.body.status || "ON"
    };

    console.log("Hardware data:", latestData);

    return res.status(200).json({
      success: true,
      data: latestData
    });
  }

  // WattWise website requests latest data
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: latestData
    });
  }

  return res.status(405).json({
    error: "Method not allowed"
  });
}
