import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/*
    crypto in built module used to create a base64 encrypting secret
    => code:
        require("crypto").randomBytes(64, function(err, buffer) {
            let token = buffer.toString("hex"); 
            console.log(token); 
        });

*/

export default generateToken;
