import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    

    cb(null, file.originalname)   //+ '-' + uniqueSuffix)
  }
})


//file name unique bhi rakh sakte hai like byusing nano -ids kinds [learn it later  ]


export const upload = multer({ storage,})