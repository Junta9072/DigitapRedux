export default function handler(req, res) {
  const body = req.body;
  res.json({ data: body });
}
