const { supabase } = require("../config/supabaseClient");

exports.getAllCampaign = async (req, res) => {
    const { data, error } = await supabase
        .from("campaigns")
        .select("*");
    if (error) {
        return res.status(500).json({message: error.message});
    }
    
    return res.status(200).json(data);
}

exports.getCampaignById = async (req, res) => {
    const campaignId = req.params.id;

    try {
        const { data, error } = await supabase
            .from("campaigns")
            .select("*")
            .eq("id", campaignId)
            .single();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        return res.status(200).json({ campaign: data });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
