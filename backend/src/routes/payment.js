


const payment = (app) => {



    app.route("/payment/config").get((req, res) => {
        return res.status(200).json({
            status: 'ok',
            data: process.env.CLIENT_ID
        })
    })
}


export default payment;
