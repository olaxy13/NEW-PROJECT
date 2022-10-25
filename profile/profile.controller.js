const Profile = require("./profile.model");
const User = require("../auth/auth.model");
const _ = require("underscore");
const multer = require('multer');
const path = require("path")
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads');
   },
   
  filename: function (req, file, cb) {
      cb(null , file.originalname);
  },
});

const upload = multer({
   storage: storage,
  //  fileFilter: function (req, file, cb) {
  //   const filetypes = "jpeg"|"jpg"|"png";
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //   const mimetype = filetypes.test(file.mimetype);
    
  //   if(mimetype && extname) {
  //     return cb(null, true);
  //   } else {
  //     cb("Error: images Only")
  //   }

  // }

  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname).toLocaleLowerCase();
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jfif' && ext !== '.jpeg') {
      callback(new Error('Only images are allowed'))
   return res.json(callback)
    }
    callback(null, true)
},
// limits:{
//     fileSize: 1024 * 1024
// }
}).single("profile_image");


// 
//CREATE ACCOUNT
exports.CreateProfile = async (req, res, next) => {
  try {
    const find_profile = await User.findById(req.user._id)
    console.log(find_profile, "dfghjkl")
    if(find_profile) {
      return res.status(200).json({ message: "Profile exists for User you can edit profile by going to the edit profile"})
    }
      const create_profile = new Profile (req.body);
      _.extend(req.body, { user: find_profile._id})
      const save_profile = await create_profile.save();
      if (!save_profile) {
        return res.status(404).json({ profile_error: "No Profile created contact the admin for support" })
    }
    else {

        return res.json(save_profile)
    }
}   catch (error) {
  if(error.isJoi === true) {
      return res.status(400).json({
          status: false,
              code: 400,
              message: "There's error in your inputs",
      })
  }
  return next(error);
}
};

  exports.GetProfile  = async () => {
  try {
    
    Profile.findOne({ user: req.user.id }) // here we want to get the user with the requested token
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        // errors.noprofile = "There is no Profile for this user";
        return res.status(404).json("There is no profile for this user");
      } else {
        return res.status(200).json(profile);
      }
    })
  }
      catch (error) {
        if(error) {
          return res.status(400).json({
              status: false,
                  code: 400,
                  message: "There's error in your inputs",
          })
      }
      return next(error);
      } 
    }



    exports.EditProfile  = async () => {
      try {
          const user = await User.findById(req.user._id)
          console.log("saved-err:");
          if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
          }
          if (user) {
            Object.assign(user, req.body);
            user.save((err, savedUser) => {
              if (err) {
                console.log("saved-err:", err);
                return next();
              }
              return res.status(200).json({ status: "true", msg: "You have successfuly updated your profile", savedUser })
            });
          }
        
      }
          catch (error) {
            if(error) {
              return res.status(400).json({
                  status: false,
                      code: 400,
                      message: "There's error in your inputs",
              })
          }
          return next(error);
          } 
        }


        //UPLOAD PROFILE IMAGE
exports.UploadprofileImage =  async (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if(err) {
        console.log(err, "Fff")
        res.status(400).send("something went wrong")
      }
      res.send(req.file)
    })  
  } catch (error) {
      if (error) {
          return res.status(400)
              .json({
                  status: false,
                  code: 400,
                  message: "There's error in your inputs",
              })
      }
      return next(error);
  }

} 