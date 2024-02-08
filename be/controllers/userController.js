const { Webhook } = require("svix");
const { supabase } = require("../config/supabaseClient");

exports.webhook = async (req, res) => {
  try {
    const payloadString = JSON.stringify(req.body);
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id } = evt.data;
    // Handle the webhooks
    const eventType = evt.type;
    if (eventType === "user.created") {
      console.log("User created", id);
      const { error } = await supabase.from("volunteers").insert([{ id }]);
      if (error) {
        throw new Error(error.message);
      }
    }
    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
