const { supabase } = require("../config/supabaseClient");

exports.coordinatorLogin = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
        email: 'someone@email.com',
        password: 'lkSIeeMsdCxLvZEOkwCI'
      })
};

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
    const coordinatorId = req.fields.id;
    //const token = req.params.token; 
    const { name, capacity, description, exp_attained, token } = req.body;

    try {
        const { data, error } = await supabase
        .from('campaigns')
        .insert([
            { name: name, capacity: capacity, description: description, exp_attained: exp_attained, token: token },
        ])
        .select()
        
        return res.status(201).json({ campaign: createdCampaign });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.editCampaign = async (req, res) => {
    const coordinatorId = req.params.coordinatorId; 
    const { id } = req.params; // Assuming campaign ID is provided in the request parameters
    const { name, capacity, description, exp_attained, token } = req.body;

    const { data, error } = await supabase
        .from('campaigns')
        .update({ name: name, capacity: capacity, description: description, exp_attained: exp_attained, token: token })
        .eq('id', id)
        .select()
        
    if (error || !data) {
        console.error(error);
        return res.status(500).json({ message: 'Unable to edit campaign' });
    }
    if (data) {
        console.log(data);
        
    }

    return res.status(200).json({ campaign: editedCampaign });
    };