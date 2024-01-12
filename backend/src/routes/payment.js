


const payment = (app) => {



    app.route("/payment/config").get((req, res) => {
        return res.status(200).json({
            status: 'ok',
            data: "AaSUalQU7e902SaApX_Ja9DtcJPw9Y3sR6vNQa6sKKP1pAkbN4WuKIW2jzyEyHTsvXX5-ICgWFweEU44"
        })
    })
}


export default payment;
