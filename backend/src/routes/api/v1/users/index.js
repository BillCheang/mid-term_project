import { Router } from "express";
import { createOneUser , signIn,signOut,getAvatar} from "./handlers.js";
import multer from 'multer';
import auth from "./auth.js";

// config multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./src/i");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]; // 获取文件扩展名
        const timestamp = Date.now(); // 获取当前时间戳
        return cb(null, `${timestamp}_.${ext}`); // 构建文件名
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        // 只接受三種圖片格式
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error(' image error'));
        }
        cb(null, true);
    }
});

const router = Router();
router.post(`/create`, upload.single('file'), createOneUser);
router.post(`/signIn`, signIn);
router.post(`/signOut`, signOut);
router.get(`/img/:img`, getAvatar);
router.get('/checkSigned',auth);

export default router;