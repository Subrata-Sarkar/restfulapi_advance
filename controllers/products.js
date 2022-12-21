const Product = require("../models/product");

const getAllProducts = async(req, res) => {
    const { company, name, price, rating, featured, sort, select } = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(name){
        queryObject.name = { $regex: name, $options: "i" };
    }

    if(price){
        queryObject.price = price;
    }

    if(rating){
        queryObject.rating = rating;
    }

    if(featured){
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        //let selectFix = select.replace(","," ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    //console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({ Products, number_of_results: Products.length });
};

const getAllProductsTesting = async(req, res) => {
    const Products = await Product.find(req.query);
    res.status(200).json({ Products });
};

module.exports = { getAllProducts, getAllProductsTesting };