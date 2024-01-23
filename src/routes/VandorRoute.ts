import express, { Request, Response, NextFunction } from 'express';
import { AddFood, AddOffer, EditOffer, GetFoods, GetOffers, GetOrderDetails, GetOrders, ProcessOrder, UpdateVendorCoverImage, UpdateVendorProfile, UpdateVendorService, VendorLogin } from '../controllers';
import { Authenticate } from '../middleware';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    //destination: This property specifies the directory where the uploaded files will be stored. In this case, it's set to the 'images' directory. The destination function receives three arguments: req (the request object), file (the uploaded file), and cb (a callback function). The callback function (cb) is called to specify the destination directory.
    destination: function(req,file, cb){
        cb(null, 'images')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+'_'+file.originalname);
    }
})

const images = multer({ storage: imageStorage}).array('images', 10);


router.get('/login', VendorLogin);

router.use(Authenticate)
router.get('/profile', VendorLogin);
router.patch('/profile', UpdateVendorProfile);
router.patch('/coverimage', images,UpdateVendorCoverImage);
router.patch('/service', UpdateVendorService);

router.post('/food', images,AddFood);
router.get('/food', GetFoods)


router.get('/orders', GetOrders);
router.put('/order/:id/process', ProcessOrder);
router.get('/order/:id', GetOrderDetails)
 

//Offers
router.get('/offers', GetOffers);
router.post('/offer', AddOffer);
router.put('/offer/:id', EditOffer)
 


router.get('/', (req: Request, res: Response, next: NextFunction) => {
 
res.json({ message: "Hello from Vandor"})

})



export { router as VandorRoute };