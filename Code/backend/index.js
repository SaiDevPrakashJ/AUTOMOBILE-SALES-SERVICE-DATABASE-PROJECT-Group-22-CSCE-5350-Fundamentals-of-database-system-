
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2')


const app = express();

app.use(cors());
app.use(bodyparser.json());

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pranay1242@F!',
    database: 'cardealership',
    port:3306
});

//Check database connection

const port = process.env.PORT || 3000;

db.connect(err=>{
    if(err){console.log('error');}
    console.log('Database connected...');
})


//Customer Login
app.post('/api/login',(req,res)=>{
    console.log(req.body, 'login')

    let Customer_ID = req.body.userName
    let Customer_Password = req.body.userPassword

    if(Customer_ID && Customer_Password){
        let qr = `select * from Customer_Table where Customer_ID = ${Customer_ID} and Customer_Password = '${Customer_Password}';`
        db.query(qr,(err,result)=>{
            if(err){
                console.log(err,'Invalid Username or Password')
                res.send()
            }
            console.log(result)
            if(result && Object.keys(result).length > 0 && result.length > 0){
                console.log('Login information retrieved');
                res.send(result);
            }
            if(result && Object.keys(result).length == 0 && result.length == 0){
                res.send('Invalid Username or Password')
            }
        })
    }
})

//Dealer Login
app.post('/api/dealer/login',(req,res)=>{
    console.log(req.body, 'login')

    let Dealer_ID = req.body.userName
    let Dealer_Password = req.body.userPassword

    if(Dealer_ID && Dealer_Password){
        let qr = `select * from Dealer_Info where Dealer_Code = ${Dealer_ID} and Dealer_Password = '${Dealer_Password}';`
        db.query(qr,(err,result)=>{
            if(err){
                console.log(err,'Invalid Username or Password')
            }
            console.log(result)
            if(result && Object.keys(result).length > 0 && result.length > 0){
                console.log('Login information retrieved');
                res.send(result);
            }
            else{
                let errormsg = 'Invalid Username or Password'
                res.send(errormsg)
            }
        })
    }
})


//Customer Dashboard
app.post('/api/customer-dashboard',(req,res)=>{
    console.log(req.body)
    let Customer_ID = req.body.userId
    let qr=`select A.Customer_ID,A.Customer_Name,A.Customer_Age,A.Customer_Sex,B.New_Old_Email AS 'Customer_Email',
    concat(E.First_3_Digits_of_Number,"-",E.Middle_3_Digits_of_Number,"-",E.Last_4_Digits_of_Number) AS "Customer_Phone_Number",
    A.Customer_Annual_Income,G.Vehicle_Identification_Number,
    C.Address_Line_1,C.Address_Line_2,D.State_Description,C.Zip_Code,A.Dealer_Code,A.Dealer_Employee_ID,F.Offer_Code_Description,I.Coupon_Code_Description,
    CASE WHEN A.Customer_ID IN (SELECT Customer_ID FROM Owner_Table) THEN 'Y' ELSE 'N' END AS 'OWNER_NON_OWNER_FLAG'
    from Customer_Table A inner join Customer_Email B on A.Customer_ID=B.Customer_ID
    INNER JOIN (SELECT DISTINCT Customer_ID,Address_Line_1,Address_Line_2,State_Code,Zip_Code FROM Customer_Address where Household_ID != '99100102') C 
    on A.Customer_ID=C.Customer_ID INNER JOIN State_Code_Description D ON C.State_Code= D.State_Code
    INNER JOIN Customer_Phone E ON A.Customer_ID=E.Customer_ID inner join Offer_Code_Table F on A.Offer_Code=F.Offer_Code
    LEFT OUTER JOIN Owner_Table G ON A.Customer_ID=G.Customer_ID  
    LEFT OUTER JOIN Non_Owner_Table H ON A.Customer_ID=H.Customer_ID
    LEFT OUTER JOIN Coupon_Code_Table I ON H.Coupon_Code=I.Coupon_Code
    where A.Customer_ID=${Customer_ID}`

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
            res.send(404);
        }
        console.log(result)
        if (result && Object.keys(result).length > 0 && result.length > 0) {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});

//Dealer Dashboard
app.post('/api/dealer-dashboard',(req,res)=>{
    console.log(req.body)
    let Dealer_Code = req.body.userId
    let qr=`Select 
    A.Dealer_Code,
    A.Dealer_Address_Line_1,A.Dealer_Address_Line_2,B.State_Description as "Dealer State Description",A.Dealer_Country,A.Dealer_Zip_Code,
    CASE WHEN A.Dealer_Code=6501 THEN 'SALES' WHEN  A.Dealer_Code=6502 THEN 'SERVICE' WHEN  A.Dealer_Code=6503 THEN 'SALES,SERVICE' END AS "SALES_SERVICE"
    from Dealer_Location A
    INNER JOIN State_Code_Description B ON A.Dealer_State_Code= B.State_Code
    WHERE A.Dealer_Location_Code=1 AND A.Dealer_Code= ${Dealer_Code}
    order by dealer_Code`;

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
        console.log(result)
        if (result && Object.keys(result).length > 0 && result.length > 0) {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });
});

//Get vehicle info

app.post('/api/vehicles',(req,res)=>{
    let qr = `select A.Vehicle_Identification_Number,Vehicle_Brand_Code,Vehicle_Model_Code,Vehicle_Model_Sub_Code,Vehicle_Model_Year,Type_of_Vehicle_Code,B.Colour_Description,A.Type_of_Tyre
    ,C.Price FROM Vehicle_Info A inner join Vehicle_Colour_Code_Table B ON A.Vehicle_Colour_Code=B.Vehicle_Colour_Code
    INNER JOIN Vehicle_Price C ON A.Vehicle_Identification_Number=C.Vehicle_Identification_Number`
    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
        console.log(result)
        if (result && Object.keys(result).length > 0 && result.length > 0) {
            res.send({
                message:'all vehicle data',
                data:result
            });
        }
    });

})

//Get service tickets info

app.post('/api/service-tickets',(req,res)=>{
    let Customer_ID = req.body.userId
    let qr = `select 
    Active_Service_Ticket_Number,Customer_ID,Owner_ID,Vechile_Identification_Number,pt.Service_Center_Code,Service_Center_Name,
    Type_of_Service,Mechanic_ID_Number,Start_Date_of_Service,End_Date_of_Service,Cost_of_Service,
    Service_Center_Address_1,Service_Center_Address_2,Country_Code,Zip_Code,Type_of_Service_available
    from service_customer_table as pt
     ,service_center_information as pi where pi.service_center_code=pt.service_center_code
     and Customer_ID=${Customer_ID}`;

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
        console.log(result)
        if (result && Object.keys(result).length > 0 && result.length > 0) {
            res.send({
                message:'all Service data',
                data:result
            });
        }
    });

})

//Get all service tickets info
app.post('/api/all-service-tickets',(req,res)=>{
    let qr = `select 
    Active_Service_Ticket_Number,Customer_ID,Owner_ID,Vechile_Identification_Number,pt.Service_Center_Code,Service_Center_Name,
    Type_of_Service,Mechanic_ID_Number,Start_Date_of_Service,End_Date_of_Service,Cost_of_Service,
    Service_Center_Address_1,Service_Center_Address_2,Country_Code,Zip_Code,Type_of_Service_available
    from service_customer_table as pt
     ,service_center_information as pi where pi.service_center_code=pt.service_center_code`;

    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err);
        }
        console.log(result)
        if (result && Object.keys(result).length > 0 && result.length > 0) {
            res.send({
                message:'all Service data',
                data:result
            });
        }
    });

})

app.listen(port,()=>{
     console.log(`server running..${port}`);
     
});