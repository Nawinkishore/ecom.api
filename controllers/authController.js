import conn from '../config/db.js';
import sqlString from "sqlstring"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export class authController{
    static async login(req,res){
        let userData  = req.body;
        let query = sqlString.format(`SELECT * FROM User WHERE email = ?`, [userData.email]);

        conn.query(query,async (err,result) => {
            if(err){ 
                return res.json({
                    success: false,
                    message:"incorrect email address",
                });
            }
            if(result.length == 0){
                return res.json({
                    success: false,
                    message:"user not found",
                });
             

            }
            
            let isMatch = await bcrypt.compare(userData.password, result[0].password);

            if(!isMatch){
                return res.json({
                    success: false,
                    message:"incorrect password",
                });
            }
            else{
                if(result[0].isVerified == 0){
                    return res.json({
                        success: false,
                        message:"did not verified"
                    });
                }  
                let user = {
                    userId: result[0].userId,
                    name:result[0].name,
                    email:result[0].email,
                } 
                return res.json({
                    success:true,
                    message:"User login successful",
                    data:result[0],
                });
            }
            
        });
       
    }
    static async register(req, res){
       let userData = req.body;
      
       console.log(userData);
    let query = sqlString.format(`SELECT
        (SELECT COUNT(*) FROM User WHERE email = ?) AS userCountemail,
        (SELECT COUNT(*) FROM User WHERE phone = ?) AS userCountphone`, [userData.email, userData.phone]);
    conn.query(query,async (err,result)=>{
        if(err){
            return res.json({

                success:false,
                message:"User unable to login",
            });
        }
       if(result[0].userCountemail > 0 || result[0].userCountphone >0){
            return res.json({
                success:false,
                message:"User already exists",
            });
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(userData.password, salt);
        userData.password = hash;
        let query = sqlString.format(`insert into User set?`,[userData]);
        conn.query(query,(err,result)=>{
            if(err){
                return res.json({
                    success:false,
                    message:"Unable to insert",
                });
            }
            return res.json({
                success:true,
                message:"User insert successfully",
            });
            console.log(result);
        });
      
    });
 
    }
}