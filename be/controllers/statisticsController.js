const { supabase } = require("../config/supabaseClient");

exports.getTotalStats = async (req, res) => {
    // const { data, error } = await supabase
    //     .from("outputs")
    //     .select("sum(quantity) as totalQuantity")
    //     .groupBy("type");

    //     if (error) {
    //         return res.status(500).json({message: error.message});
    //     }
    //     return res.status(200).json({outputs: data});

    const { data, error } = await supabase
    .from("outputs")
    .select("*");

    if (error) {
    return res.status(500).json({ message: error.message });
    }

    const groupedData = data.reduce((result, row) => {
    const key = row.type;
    
    if (!result[key]) {
        result[key] = {
        type: row.type,
        totalQuantity: 0,
        };
    }

    result[key].totalQuantity += row.quantity;

    return result;
    }, {});

    const resultArray = Object.values(groupedData);

    return res.status(200).json({ statistics: resultArray });
}

