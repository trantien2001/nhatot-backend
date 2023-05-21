import addressModel from '../models/address.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const addressController = {
  getWard: catchAsync(async (req, res) => {
    const { IdDistrict } = req.params;
    const result = await addressModel.getWard(IdDistrict);
    return res.status(200).send(result);
  }),
  getDistric: catchAsync(async (req, res) => {
    const { IdProvince } = req.params;
    const result = await addressModel.getDistric(IdProvince);
    return res.status(200).send(result);
  }),
  getProvince: catchAsync(async (req, res) => {
    const result = await addressModel.getProvince();
    return res.status(200).send(result);
  }),
  getDistrictByProvinceName: catchAsync(async (req, res) => {
    const { ProvinceName } = req.body;
    const result = await addressModel.getDistrictByProvinceName(ProvinceName);
    return res.status(200).send(result);
  }),
  getWardByDistrictName: catchAsync(async (req, res) => {
    const { DistrictName } = req.body;
    const result = await addressModel.getWardByDistrictName(DistrictName);
    return res.status(200).send(result);
  }),
};

export default addressController;
