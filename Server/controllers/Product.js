import User from '../models/User'
import Category from '../models/Category'
import Product from '../models/Product'
import Brand, { brand } from '../models/Brand'

exports.createProduct = async(req,res) => {
    try{
        const {
            productName,
            category,
            user,
            brandName,
            modelName
        } = req.body;

        const productImage = req.files.productImageCloud;

        const invoiceImage = req.files.invoiceImageCloud;

        if(!productName || !category || !user || !brandName ||!invoiceImage ||!modelName ||!productImage){
            return res.status(200).json({
                sucess:false,
                message:"all fields are required when product is created"
            })
        };

        const userId = req.user.id;
        const individualDetails = await User.findById(userId, {
            Accounttype:"Individual"
        });

        if(!individualDetails){
            return res.status(404).json({
                success:false,
                message:"indivisula user not found"
            })
        }

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:"Category Details not found"
            })
        }

        const brandDetails = await Brand.findById(brand);

        if(!brandDetails) {
            return res.status(404).json({
                success:false,
                message:"Brand Not Found"
            })
        }

        //Upload image to cloudanary 

        // const productImageCloud = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // const invoiceImageCloud = await uploadImageToCloudinary(invoiceImage, process.env.FOLDER_NAME);

        //create an entry for new course

        const newProduct = await Product.create({
            productName,
            category,
            user:individualDetails._id,
            productImage: productImageCloud.secure_url,
            brandName:brandDetails._id,
            modelName,
            invoiceImage:invoiceImageCloud.secure_url,
        })

        await User.findByIdAndUpdate({
            _id : individualDetails._id
        },
        {
            $push: {
                products:newProduct._id
            }
        },
        {new:true})

        return res.status(200).json({
            success:true,
            message:"Product Created successfully",
            data: newProduct
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Product is not created",
            error:error.message
        })
    }
}

exports.getAllProducts = async(req,res) => {
    try {
        const allProducts = await Product.find({});

        return res.status(200).json({
            success:true,
            message:"get all Products Successfully",
            data:allProducts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in fetching the products",
            error:error.message
        })
    }
}

exports.getOneProduct = async(req,res) => {
    try{
        const {productId} = req.body;

        const productDetails = await Product.findById({_id:productId});

        if(!productDetails){
            return res.status(400).json({
                success:false,
                message:"product is not found",
                error:error.message
            })
        }

        return res.status(200).json({
            success:true,
            message:"product detail fetched successfully"
        })


    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success:false,
            message:"error in get one product details",
            error:error.message
        })
    }
}


exports.updateProduct = async(req,res) => {
    try {

        const {
            productName,
            category,
            user,
            brandName,
            modelName
        } = req.body;

        const productImage = req.files.productImageCloud;

        const invoiceImage = req.files.invoiceImageCloud;

        if(!productName || !category || !user || !brandName ||!invoiceImage ||!modelName ||!productImage){
            return res.status(200).json({
                sucess:false,
                message:"all fields are required when product is updated"
            })
        };

        const {productId} = req.body;

        if(!productId) {
            return res.status(400).json({
                success:false,
                message:"Product os not found"
            })
        }

        // const productImageCloud = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // const invoiceImageCloud = await uploadImageToCloudinary(invoiceImage, process.env.FOLDER_NAME);

        const updatedProduct = await findByIdAndUpdate({_id:productId},
            {
                productName:productName,
                category:category,
                user:user,
                brandName:brandName,
                modelName:modelName,
                productImage:productImageCloud,
                invoiceImage:invoiceImageCloud
            },{new:true});

        return res.staus(200).json({
            success:true,
            message:"Product updated successfully",
            data:updatedProduct,
        })

    } catch (error) {
        console.log(error);
        return res.staus(500).json({
            success:false,
            message:"Course is not updated",
            error:error.message
        })
    }
}

exports.deleteProduct = async(req,res) => {
    try{
        const {productId} = req.body;

        if(!productId){
            return res.status(400).json({
                success:false,
                message:"Product id not found"
            })
        }

        const product = await findByIdAndDelete({_id:productId});

        return res.status(200).json({
            success:true,
            message:"Product Deleted Successfully"
        });

    } catch (error) {
        console.log(error);
        return res.staus(200).json({
            success:false,
            message:"Product is not deleted",
            error:error.message
        })
    }
}
