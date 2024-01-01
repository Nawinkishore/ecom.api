import conn from '../config/db.js';
import sqlString from "sqlstring"
export class authController{
    static  register(req, res,){
       let userData = req.body;
    //    console.log(userData);
    let query = sqlString.format(`SELECT
        (SELECT COUNT(*) FROM User WHERE email = ?) AS userCountemail,
        (SELECT COUNT(*) FROM User WHERE phone = ?) AS userCountphone`, [userData.email, userData.phone]);
    conn.query(query,(err,result)=>{
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
        });
      
    });
 
    }
}