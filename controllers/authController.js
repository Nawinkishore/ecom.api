import conn from '../config/db.js';
import sqlString from "sqlstring"
export class authController{
    static  register(req, res,){
       let userData = req.body;
    //    console.log(userData);
    let query = sqlString.format('INSERT INTO User SET?',[userData]);
    conn.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return res.json({
                success:false,
                message:'Error inserting',
            });
        
        }
        return res.json({
            success:true,
            message:'Success inserting',
        });
    })
        

    }
}