export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests are allowed"
    });
  }

  try {
    const data = req.body;

    console.log("Sensor data received:", data);

    return res.status(200).json({
      success: true,
      message: "WattWise received sensor data",
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to process sensor data"
    });
  }
}
