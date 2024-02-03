const { supabase } = require("../config/supabaseClient");

exports.getAllReviews = async (req, res) => {
    const { data, error } = await supabase
        .from("reviews")
        .select("*");
    
    if (error) {
        return res.status(500).json({message: error.message});
    }
    
    return res.status(200).json({reviews: data});
}