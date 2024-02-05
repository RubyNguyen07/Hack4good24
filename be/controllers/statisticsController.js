const { supabase } = require("../config/supabaseClient");

exports.getTotalStats = async (req, res) => {
    const { data, error } = await supabase
        .from("outputs")
        .sum("quantity", { as: 'totalQuantity' })
        .group("type");

        if (error) {
            return res.status(500).json({message: error.message});
        }
        return res.status(200).json({outputs: data});
}