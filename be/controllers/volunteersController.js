const { supabase } = require("../config/supabaseClient");

exports.register = async (req, res) => {
    const id = req.body.id;

    const { data: existingUser } = await supabase
        .from('volunteers')
        .select()
        .eq("id", id);

    if (existingUser.length != 0) {
        return res.status(400).json({message: "User already exists"});
    }

    const { error } = await supabase
        .from('volunteers')
        .insert([
            { 
                id: id
            },
        ])
        .select()


    if (error) {
        return res.status(500).json({message: error.message});
    }
    
    return res.status(200).json({message: "Volunteer registered!"});
}

exports.getLevel = async (req, res) => {
    var id = req.params.id;

    const { data, error } = await supabase
        .from('volunteers')
        .select()
        .eq("id", id);

    if (error) {
        return res.status(500).json({message: error.message});
    }
    
    return res.status(200).json({ points: data[0].exp, level: data[0].exp / 500 });
}


exports.postReview = async (req, res) => {
    const volunteerId = req.fields.id;
    const token = req.params.token;
    const file = req.files.file; 

    const {data: existingUser, error: userError} = await supabase
        .from('volunteers')
        .select()
        .eq("id", volunteerId);


    if (userError) {
        return res.status(500).json({message: error.message});
    }

    if (existingUser.length == 0) {
        return res.status(400).json({message: "User does not exist"});
    }

    const { data: existingCampaign, error: campaignError} = await supabase
        .from('campaigns')
        .select()
        .eq("token", token);

    if (campaignError) {
        return res.status(500).json({message: error.message});
    }

    if (existingCampaign.length == 0) {
        return res.status(400).json({message: "Campaign does not exist"});
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from('reviewImages').upload(filePath, file)
    if (uploadError) {
        return res.status(500).json({message: uploadError.message});
    }

    const {data: review, error: reviewError} = await supabase
        .from('reviews')
        .insert([
            { 
                volunteerId: volunteerId,
                campaignId: existingCampaign[0].id,
                review: req.fields.review, 
                rating: req.fields.rating, 
                img: filePath
            }
        ])
        .select()

    if (reviewError) {
            return res.status(500).json({message: reviewError.message});
        }

    const newExp = existingUser[0].exp + existingCampaign[0].exp_attained;
    const { error: updateExpError } = await supabase
        .from('volunteers')
        .update([
            { 
                exp: newExp
            },
        ])
        .eq("id", volunteerId)
        .select();


    if (updateExpError) {
        return res.status(500).json({message: updateExpError.message});
    }
    
    return res.status(200).json({message: "Review posted!"});
}
