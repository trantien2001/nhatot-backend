import { io } from '../index.js';
import motelModel from '../models/motel.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const motelController = {
  getMotelFavourite: catchAsync(async (req, res) => {
    const result = await motelModel.getMotelFavourite(req.params);
    return res.status(200).send(result);
  }),
  getMotelByIdUser: catchAsync(async (req, res) => {
    const result = await motelModel.getMotelByIdUser(req.params);
    return res.status(200).send(result);
  }),
  getMotel: catchAsync(async (req, res) => {
    const { IdMotel } = req.params;
    const { IdUser } = req.body;
    console.log('motel IdMotel controller:', IdMotel);
    console.log('motel IdUser controller:', IdUser);
    const result = await motelModel.getMotel({ IdMotel, IdUser });
    return res.status(200).send(result);
  }),
  getInfoMotelByIdRoom: catchAsync(async (req, res) => {
    const { IdRoom } = req.params;
    console.log(IdRoom);
    const result = await motelModel.getInfoMotelByIdRoom(IdRoom);
    return res.status(200).send(result);
  }),

  getMotelsByIdWard: catchAsync(async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser } = req.body;
    const { IdWard } = req.params;
    const motel = await motelModel.getMotelsByIdWard({
      IdUser,
      IdWard,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  }),

  getMotelsByIdDistrict: catchAsync(async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser } = req.body;
    const { IdDistrict } = req.params;
    const motel = await motelModel.getMotelsByIdDistrict({
      IdUser,
      IdDistrict,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  }),

  getMotelsByIdProvince: catchAsync(async (req, res) => {
    const { start, quantity, priceMin, priceMax, acreageMin, acreageMax, IdUser } = req.body;
    const { IdProvince } = req.params;
    const motel = await motelModel.getMotelsByIdProvince({
      IdUser,
      IdProvince,
      start,
      quantity,
      priceMin,
      priceMax,
      acreageMin,
      acreageMax,
    });
    return res.status(200).send(motel);
  }),
  getLimitInfoMotelActive: catchAsync(async (req, res) => {
    const motel = await motelModel.getLimitInfoMotelActive(req.body);
    return res.status(200).send(motel);
  }),
  getAllInfoMotelActive: catchAsync(async (req, res) => {
    const motel = await motelModel.getAllInfoMotelActive();
    return res.status(200).send(motel);
  }),

  add: catchAsync(async (req, res) => {
    const { notifi } = req.body;
    console.log('media: ', req.files);
    const result = await motelModel.add({
      ...req.body,
      media: req.files,
    });
    io.emit('post_motel', { notifi, followers: result.followers });
    return res.status(200).send(result);
  }),
  update: catchAsync(async (req, res) => {
    const result = await motelModel.update({
      ...req.body,
      mediaDelete: JSON.parse(req.body.mediaDelete),
      media: req.files,
    });

    // io.emit('post_motel', { notifi, followers: result.followers });
    // return res.status(200).send(result);
  }),
};

export default motelController;
