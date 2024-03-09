exports.auth = async(req,res,next) => {
    try{

        const token = req.cookies.token || req.body.token || req.header("authorisation").replace("Bearer ","");

        if(!token){
            return res.status(400).json({
                success:false,
                message:"token is missing"
            });
        }

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success:false,
                message:"token is invalid",
                error:error.message
            })
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


exports.isIndividual = async (req,res) => {
    try{
        if(req.user.Accounttype !== "Individual"){
            return res.staus(400).json({
                success:false,
                message:"This protected route for individual users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

exports.isVendor = async (req,res) => {
    try{
        if(req.user.Accounttype !== "Vendor"){
            return res.staus(400).json({
                success:false,
                message:"This protected route for Vendor users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

exports.isOrganization = async (req,res) => {
    try{
        if(req.user.Accounttype !== "Organization"){
            return res.staus(400).json({
                success:false,
                message:"This protected route for Organization users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}

exports.isAdmin = async (req,res) => {
    try{
        if(req.user.Accounttype !== "Admin"){
            return res.staus(400).json({
                success:false,
                message:"This protected route for admin users only"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"user role not verify"
        })
    }
}