Create database CSCE5350_Group22;



CREATE TABLE Activity_Code_Table (
   Activity_Code  int,
   Activity_Description varchar(255),
   Last_Updated_Date_of_Row datetime default now(),
   Last_Updated_Date_of_Table datetime default now(),
   PRIMARY KEY(Activity_Code)
);

CREATE TABLE `Event_Information` (
  `Event_ID` INT,
  `Event_Description` VARCHAR(255),
  `Date_of_Event` date,
  PRIMARY KEY(Event_ID)
);

CREATE TABLE `Offer_Code_Table` (
  `Offer_Code` VARCHAR(10),
  `Offer_Code_Description` VARCHAR(255),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  PRIMARY KEY(Offer_Code)
);

CREATE TABLE `Dealer_Info` (
  `Dealer_Code` int,
  `Dealer_Password` VARCHAR(255),
  `Sales_Service_Both_Flag` VARCHAR(20),
  `Number_of_Brands_Available` INT,
  `Number_of_employees` INT,
  `Dealer_Working_Days` INT,
  `Dealer_Working_Hours_1` VARCHAR(255),
  `Dealer_Working_Hours_2` VARCHAR(255),
  PRIMARY KEY(Dealer_Code)
);

CREATE TABLE `State_Code_Description` (
  `State_Code` VARCHAR(2),
  `State_Description` VARCHAR(255),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of Table` datetime default now(),
  PRIMARY KEY(State_Code)
);

CREATE TABLE `Country_Code_Info` (
  `Country_Code` VARCHAR(2),
  `Country_Description` VARCHAR(255),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  PRIMARY KEY(Country_Code)
);

CREATE TABLE `Dealer_Employee_Table` (
  `Dealer_Employee_ID` INT,
  `Dealer_Code` INT,
  `Dealer_Employee_Name` VARCHAR(255),
  `Dealer_Employee_Manager` VARCHAR(255),
  `Employee_Salary` VARCHAR(15),
  `Employee_Address_Line_1` VARCHAR(255),
  `Employee_Address_Line_2` VARCHAR(255),
  `Employee_State_Code` VARCHAR(2),
  `Employee_Country` VARCHAR(2),
  `Employee_Zip_Code` INT,
  FOREIGN KEY (`Employee_Country`) REFERENCES `Country_Code_Info`(`Country_Code`),
  FOREIGN KEY (`Employee_State_Code`) REFERENCES `State_Code_Description`(`State_Code`),
  FOREIGN KEY (`Dealer_Code`) REFERENCES `Dealer_Info`(`Dealer_Code`),
  PRIMARY KEY(Dealer_Employee_ID)
);

CREATE TABLE `Dealer_Location` (
  `Dealer_Code` INT,
  `Dealer_Location_Code` INT,
  `Dealer_Address_Line_1` VARCHAR(255),
  `Dealer_Address_Line_2` VARCHAR(255),
  `Dealer_State_Code` VARCHAR(2),
  `Dealer_Country` VARCHAR(2),
  `Dealer_Zip_Code` INT,
  FOREIGN KEY (`Dealer_State_Code`) REFERENCES `State_Code_Description`(`State_Code`),
  FOREIGN KEY (`Dealer_Country`) REFERENCES `Country_Code_Info`(`Country_Code`),
  FOREIGN KEY (`Dealer_Code`) REFERENCES `Dealer_Info`(`Dealer_Code`),
  PRIMARY KEY(Dealer_Code,Dealer_Location_Code)
);

CREATE TABLE `Dealer_Brands` (
  `Dealer_Code` INT,
  `Brand` VARCHAR(3),
  FOREIGN KEY (`Dealer_Code`) REFERENCES `Dealer_Info`(`Dealer_Code`),
  PRIMARY KEY(Dealer_Code,Brand)
);

CREATE TABLE `Customer_Table` (
  `Customer_ID` INT,
  `Customer_Password` VARCHAR(255),
  `Dealer_Code` INT,
  `Dealer_Employee_ID` INT,
  `Customer_Name` VARCHAR(255),
  `Customer_Age` INT,
  `Customer_Sex` VARCHAR(2),
  `Customer_Annual_Income` VARCHAR(255),
  `Offer_Flag` VARCHAR(2),
  `Offer_Code` VARCHAR(4),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`Offer_Code`) REFERENCES `Offer_Code_Table`(`Offer_Code`),
  FOREIGN KEY(Dealer_Employee_ID) REFERENCES DEALER_EMPLOYEE_TABLE(Dealer_Employee_ID),
  FOREIGN KEY (`Dealer_Code`) REFERENCES `Dealer_Info`(`Dealer_Code`),
  PRIMARY KEY(Customer_ID)
);

CREATE TABLE `Interested_Customer_Table` (
  `Activity_Code_ID` INT,
  `Customer_ID` INT,
  `Activity_code` INT,
  `Already_Existing_Owner_Flag` VARCHAR(1),
  `Owner_ID` INT,
  `Interested_Vechile_Brand` VARCHAR(3),
  `Interested_Model_Year` INT,
  `Type_of_Vechile` VARCHAR(4),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  FOREIGN KEY (Activity_code) REFERENCES ACTIVITY_CODE_TABLE(Activity_code),
  PRIMARY KEY (Activity_Code_ID)
);

CREATE TABLE `Customer_Address` (
  `Customer_ID` INT,
  `Household_ID` INT,
  `Address_Line_1` VARCHAR(255),
  `Address_Line_2` VARCHAR(255),
  `State_Code` VARCHAR(2),
  `Zip_Code` INT,
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`State_Code`) REFERENCES `State_Code_Description`(`State_Code`),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  PRIMARY KEY (Customer_ID,Household_ID)
);

CREATE TABLE `Customer_Email` (
  `Customer_ID` INT,
  `New_Old_Email` VARCHAR(255),
  `New_Old_Email_Flag` VARCHAR(2),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  PRIMARY KEY (Customer_ID)
);

CREATE TABLE `Customer_Phone` (
  `Customer_ID` INT,
  `Present_Old_Number_Flag` VARCHAR(1),
  `Country_Code` VARCHAR(2),
  `First_3_Digits_of_Number` INT,
  `Middle_3_Digits_of_Number` INT,
  `Last_4_Digits_of_Number` INT,
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`Country_Code`) REFERENCES `Country_Code_Info`(`Country_Code`),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  PRIMARY KEY(Customer_ID)
);


CREATE TABLE `Event_Table` (
  `Event_ID` INT,
  `Customer_ID` INT,
  `Date_of_Event` DATE,
  `Brand's_Promoted` VARCHAR(3),
  `Coupon_Code` VARCHAR(6),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  FOREIGN KEY (`Event_ID`) REFERENCES `Event_Information`(`Event_ID`),
  PRIMARY KEY(Event_ID,Customer_ID)
);

CREATE TABLE `Customer_Not_Interest_Brand` (
  `Customer_ID` INT,
  `Not_Interested_Brand_Code` VARCHAR(3),
  `New_Old_Email_Flag` VARCHAR(1),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (Customer_ID) REFERENCES CUSTOMER_TABLE(Customer_ID),
  PRIMARY KEY(Customer_ID,Not_Interested_Brand_Code)
);

CREATE TABLE `Coupon_Code_Table` (
  `Coupon_Code` VARCHAR(6),
  `Coupon_Code_Description` VARCHAR(255),
  `Coupon_Start_Date` DATE,
  `Coupon_End_Date` DATE,
  PRIMARY KEY(Coupon_Code)
);

CREATE TABLE `Non_Owner_Table` (
  `Customer_ID` INT,
  `Dealer_Code` INT,
  `Vechile_Brand_Code` VARCHAR(3),
  `Model_year` INT,
  `Type_Of_Vechile` VARCHAR(4),
  `Coupon_Flag` VARCHAR(1),
  `Coupon_Code` VARCHAR(6),
  FOREIGN KEY (`Coupon_Code`) REFERENCES `Coupon_Code_Table`(`Coupon_Code`),
  PRIMARY KEY (Customer_ID)
);

CREATE TABLE `Vehicle_Colour_Code_Table` (
  `Vehicle_Colour_Code` VARCHAR(10),
  `Colour_Description` VARCHAR(255),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  PRIMARY KEY(Vehicle_Colour_Code)
);

CREATE TABLE `Vehicle_Info` (
  `Vehicle_Identification_Number` VARCHAR(25),
  `Vehicle_Brand_Code` VARCHAR(3),
  `Vehicle_Model_Code` VARCHAR(4),
  `Vehicle_Model_Sub_Code` VARCHAR(10),
  `Vehicle_Model_Year` INT,
  `Type_of_Vehicle_Code` VARCHAR(4),
  `Vehicle_Colour_Code` VARCHAR(10),
  `Type_of_Tyre` VARCHAR(25),
  `Last_Updated_Date_of_Row` datetime default now(),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`Vehicle_Colour_Code`) REFERENCES `Vehicle_Colour_Code_Table`(`Vehicle_Colour_Code`),
  PRIMARY KEY(Vehicle_Identification_Number)
);

CREATE TABLE `Vehicle_Price` (
  `Vehicle_Identification_Number` VARCHAR(25),
  `Dealer_Manufactor_Date` DATE,
  `Car_Condition` VARCHAR(4),
  `Price` VARCHAR(10),
  FOREIGN KEY (`Vehicle_Identification_Number`) REFERENCES `Vehicle_Info`(`Vehicle_Identification_Number`),
  PRIMARY KEY (Vehicle_Identification_Number)
);

CREATE TABLE `Owner_Table` (
  `Customer_ID` INT,
  `Vehicle_Identification_Number` VARCHAR(25),
  `Dealer_Employee_ID` INT,
  `Customer_Name` VARCHAR(50),
  `Customer_Age` INT,
  `Customer_Sex` VARCHAR(1),
  `Customer_Annual_Income` VARCHAR(10),
  `Offer_Flag` VARCHAR(1),
  `Offer_Code` VARCHAR(4),
  `Last_Updated_Date_of_Table` datetime default now(),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  FOREIGN KEY (`Vehicle_Identification_Number`) REFERENCES `Vehicle_Info`(`Vehicle_Identification_Number`),
  PRIMARY KEY(Customer_ID,Vehicle_Identification_Number)
);

CREATE TABLE `Service_Center_Information` (
  `Service_Center_Code` VARCHAR(5),
  `Service_Center_Name` VARCHAR(50),
  `Dealer_Code` VARCHAR(25),
  `Service_Center_Address_1` VARCHAR(50),
  `Service_Center_Address_2` VARCHAR(50),
  `State_Code(FK)` VARCHAR(2),
  `Country_Code` VARCHAR(2),
  `Zip_Code` INT,
  `Type_of_Service_available` VARCHAR(100),
 -- FOREIGN KEY (`Dealer_Code`) REFERENCES `Dealer_Info`(`Dealer_Code`),
  FOREIGN KEY (`State_Code(FK)`) REFERENCES `State_Code_Description`(`State_Code`),
  PRIMARY KEY (Service_Center_Code)
);

CREATE TABLE `Mechanic_Details_Table` (
  `Mechanic_ID_Number` INT,
  `Mechanic_Password` VARCHAR(255),
  `Service_Center_Code` VARCHAR(255),
  `Mechanic_First_Name` VARCHAR(10),
  `Mechanic_Last_Name` VARCHAR(10),
  `Mechanic_Phone_Number` VARCHAR(15),
  `Mechanic_Address_Line_1` VARCHAR(255),
  `Mechanic_Address_Line_2` VARCHAR(255),
  `Mechanic_State_Code(FK)` VARCHAR(2),
  `Country_Code` VARCHAR(2),
  `Zip_Code` INT,
  FOREIGN KEY (`Country_Code`) REFERENCES `Country_Code_Info`(`Country_Code`),
  FOREIGN KEY (`Mechanic_State_Code(FK)`) REFERENCES `State_Code_Description`(`State_Code`),
  PRIMARY KEY (Mechanic_ID_Number)
);

CREATE TABLE `Service_Customer_Table` (
  `Active_Service_Ticket_Number` VARCHAR(8),
  `Customer_ID` INT,
  `Owner_ID` INT,
  `Vechile_Identification_Number` VARCHAR(25),
  `Service_Center_Code` VARCHAR(5),
  `Type_of_Service` VARCHAR(50),
  `Mechanic_ID_Number` INT,
  `Start_Date_of_Service` DATE,
  `End_Date_of_Service` DATE,
  `Cost_of_Service` VARCHAR(10),
  FOREIGN KEY (`Service_Center_Code`) REFERENCES `Service_Center_Information`(`Service_Center_Code`),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customer_Table`(`Customer_ID`),
  FOREIGN KEY (`Mechanic_ID_Number`) REFERENCES `Mechanic_Details_Table`(`Mechanic_ID_Number`),
  PRIMARY KEY(Active_Service_Ticket_Number)
);


Create table Cust_Buy_Info (
Vehicle_Identification_Number varchar(255)
,Vehicle_Brand_Code varchar(255)
,Vehicle_Model_Code varchar(255)
,Vehicle_Model_Sub_Code varchar(255)
,Vehicle_Model_Year varchar(255)
,Type_of_Vehicle_Code varchar(255)
,Colour_Description varchar(255)
,Type_of_Tyre varchar(255)
,Price varchar(255)
)

Mechanic view info:-
select Mechanic_ID_Number,Service_Center_Code,Service_Center_Name,
case when Service_Center_Code='SERV1' then 'SERV1201' 
when Service_Center_Code='SERV2' then 'SERV1202' 
 when Service_Center_Code='SERV3' then 'SERV1202' 
end as 'Working_ServiceTicket',
dealer,Service_Center_Address_1,Service_Center_Address_2,
Mechanic_First_Name, Mechanic_Last_Name,scc from
(select new_scc.Mechanic_ID_Number,new_sci.Service_Center_Code,new_sci.Service_Center_Name,
new_sci.dealer,new_sci.Service_Center_Address_1,new_sci.Service_Center_Address_2,
new_scc.Mechanic_First_Name, new_scc.Mechanic_Last_Name,new_scc.scc
from 
(select *,SUBSTRING_INDEX(Dealer_Code,',',1)  as dealer from Service_Center_Information) as new_sci,
(select *,SUBSTRING_INDEX(Service_Center_Code,',',1)  as scc from mechanic_details_table) as new_scc)
 as outer_table,dealer_info where dealer_info.Dealer_Code=outer_table.dealer
 ;
 
Update Price query:-
 select 
Vehicle_Identification_Number,
case when (Customer_ID in
(select Customer_ID from Owner_Table where Offer_Flag='Y'
UNION ALL
SELECT Customer_ID FROM Non_Owner_Table WHERE Coupon_Flag='Y') ) then '$40,000' else Previous_Price end as New_Price,
Previous_Price,
Vehicle_Brand_Code,
Type_of_Vehicle_Code, 
Vehicle_Colour_Code,
Vehicle_Model_Code,
Last_Updated_Date_of_Row,
Last_Updated_Date_of_Table,
Type_of_Tyre,
Vehicle_Model_Sub_Code,
Vehicle_Model_Year
from 
(
select vehicle_info.Vehicle_Identification_Number,
vehicle_price.price as previous_price,
'99105101' AS Customer_ID,
vehicle_info.Vehicle_Brand_Code,
vehicle_info.Type_of_Vehicle_Code, 
vehicle_info.Vehicle_Colour_Code,
vehicle_info.Vehicle_Model_Code,
vehicle_info.Last_Updated_Date_of_Row,
vehicle_info.Last_Updated_Date_of_Table,
vehicle_info.Type_of_Tyre,
vehicle_info.Vehicle_Model_Sub_Code,
vehicle_info.Vehicle_Model_Year
from vehicle_info, vehicle_price where vehicle_info.Vehicle_Identification_Number=vehicle_price.Vehicle_Identification_Number
) as B
where customer_id='99105101' and Vehicle_Identification_Number='VIN99105101'


Employee Under them:-
select Dealer_Employee_Name,Employee_Salary,Employee_Address_Line_1,Employee_Address_Line_2,Employee_State_Code,Employee_Country,Employee_Zip_Code
 from Dealer_Employee_Table where Dealer_Employee_Manager='Quinn N. Canada'