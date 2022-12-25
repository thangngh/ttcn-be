import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (_req, file, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};


export const editFileName = (_req, file, callback) => {
	const fileExtName = file.originalname.split('.');
	const fileExt = fileExtName[fileExtName.length - 1]
	callback(null, `${uuidv4().split("-").join("")}.${fileExt}`);
};


// export const uploadMultipleFiles = (_rep, file, callback) => {
// 	const fileExtName = file.originalname.split('.');
// 	const fileNameExt = fileExtName[fileExtName.length - 1];

// 	callback(null, `${uuidv4().split("-").join("") + Date.now()}.${fileNameExt}`);
// }