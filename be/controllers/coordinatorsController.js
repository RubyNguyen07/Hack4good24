const { supabase } = require("../config/supabaseClient");

exports.getCoordinatorProfile = async (req, res) => {
    const coordinatorId = req.params.id; //assume coord id given in request?

    try {
        const { data, error } = await supabase
            .from("coordinators")
            .select("*")
            .eq("id", coordinatorId)
            .single();

        if (error) {
            return res.status(500).json({ message: error.message });
        }

        if (!data) {
            return res.status(404).json({ message: 'Coordinator profile not found' });
        }

        return res.status(200).json({ profile: data });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createCampaign = async (req, res) => {
    const coordinatorId = req.params.id;

    try {
        const { data, error } = await supabase
        .from('campaigns')
        .insert([
            { title: req.fields.title, 
                description: req.fields.description,
                date: req.fields.date, points: req.fields.points },
        ])
        .select()

        if (error) {
            return res.status(500).json({message: error.message});
        }
        
        return res.status(200).json({ campaign: data });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editCampaign = async (req, res) => {
    //const coordinatorId = req.params.coordinatorId; 
    const id = req.params.campaignId; // Assuming campaign ID is provided in the request parameters

    const { data, error } = await supabase
        .from('campaigns')
        .update({ title: req.fields.title, 
            description: req.fields.description,
            date: req.fields.date, points: req.fields.points })
        .eq('id', id)
        .select()
        
    if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to edit campaign' });
    }
    if (data) {
        console.log(data);   
    } else {
        return res.status(500).json({ message: 'Campaign does not exist' });
    }

    return res.status(200).json({ campaign: data });
    };