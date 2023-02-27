import { NextFunction, Request, Response } from "express"
import { playChances } from "../data/chances";
import decodeWallet from "../utils/decodeWallet";
import generateSignature from "../utils/generateSignature";
import getImageRuletka from "../utils/getImageRuletka";
import { Logger } from "../utils/logger";

const logger = new Logger('nft-back');
class SignController {

    async getSign(req: Request, res: Response, next: NextFunction) {
        try {
            const { key } = req.query;
            if (!key || typeof key !== 'string') {
                throw new Error('not detected key')
            }

            const wallet = decodeWallet(key);
            const { signature } = generateSignature(wallet);
            const itemId = getImageRuletka(playChances).id
    

            res.status(200).json({
                success: true,
                data: {
                    signature,
                    itemId
                },
            });
        } catch (err: any) {
            next(err)
        }
    }
}

export default new SignController();