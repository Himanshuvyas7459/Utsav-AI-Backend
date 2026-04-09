import multer from "multer";

const storage = multer.memoryStorage(); 

const upload = multer({ storage });

export default upload;



// import multer from "multer";
// import crypto from "crypto";

// const storage = multer.diskStorage({
//     destination : (req , file , cb) => {
//         cb(null , "uploads/")
//     },
//     filename : (req , file , cb) => {
        
//         cb(null , `product-${crypto.randomUUID()}.${file.originalname.split(".")[1]}`)
//     }
// })

// const upload = multer ({ storage : storage})

// export default upload