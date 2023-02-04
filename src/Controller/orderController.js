const orderModel = require("../Model/orderModel");
const userModel = require("../Model/userModel");


const isvalidPhone = function (mobile) {
    if (/^(\+91[\-\s]?)?[0]?[6789]\d{9}$/.test(mobile)) return true;
    return false;
  };


const createOrder = async (req, res) => {
    try {

        let data = req.body

        let { user_id, sub_total, phone_Number } = data


        if (!user_id) return res.status(400).send({ status: false, message: 'user_id is required' })
      //  console.log(user_id,req.loggedInUserId);

        if( req.loggedInUserId !=user_id.toString())return res.status(403).send({ status: false, message: 'user_id is no authorized' })
       
        if (!sub_total) return res.status(400).send({ status: false, message: 'sub_total is required' })

        if (!phone_Number) return res.status(400).send({ status: false, message: 'phone_Number is required' })
        if (!isvalidPhone(phone_Number)) return res.status(400).send({ status: false, message: 'phone_Number should be valid ' })

        let phone = await userModel.findById(user_id)
        if(phone.phone_Number!=phone_Number) return res.status(400).send({ status: false, message: 'user phone_Number should be same ' })

    

        const order = await orderModel.create(data)
        return res.status(201).send({ status: true, message: "order Created sucessfully ", data: order })
    } catch (error) {
        return res.status(500).send({ status: false, message: "server error" });

    }
}


/////////////////////////////////////////////////////////////////

const getorder = async (req, res) => {
    try {
        let userId = req.params.id

        if( req.loggedInUserId !=userId.toString())return res.status(403).send({ status: false, message: 'user_id is no authorized' })

        const data = await orderModel.find({ user_id: userId })
        if(!data)return res.status(404).send({ status: false, message: "order not found " })

        return res.status(200).send({ status: true, message: "order Created sucessfully ", data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: "server error" });

    }

}


module.exports = { createOrder, getorder }