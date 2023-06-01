import adminModel from '../models/admin.model.js';
import { catchAsync } from '../utils/catchAsync.js';

const adminController = {
  // ADMIN
  getAllUser: catchAsync(async (req, res) => {
    const result = await adminModel.getAllUser();
    return res.status(200).send(result);
  }),
  adminAddUser: catchAsync(async (req, res) => {
    const adminAddUser = await adminModel.adminAddUser(req.body);
    return res.status(200).send(adminAddUser);
  }),
  adminUpdateUser: catchAsync(async (req, res) => {
    const adminUpdateUser = await adminModel.adminUpdateUser(req.body);
    return res.status(200).send(adminUpdateUser);
  }),
  adminChangeStatusUser: catchAsync(async (req, res) => {
    console.log(req.body);
    const adminChangeStatusUser = await adminModel.adminChangeStatusUser(req.body);
    return res.status(200).send(adminChangeStatusUser);
  }),
  // ADMIN
  adminGetDataDashboard: catchAsync(async (req, res) => {
    const result = await adminModel.adminGetDataDashboard();
    return res.status(200).send(result);
  }),

  // BANNER
  adminGetAllBanner: catchAsync(async (req, res) => {
    const result = await adminModel.adminGetAllBanner();
    return res.status(200).send(result);
  }),
  adminRemoveBanner: catchAsync(async (req, res) => {
    const result = await adminModel.adminRemoveBanner(req.params);
    return res.status(200).send(result);
  }),
  adminAddBanner: catchAsync(async (req, res) => {
    console.log(req.files, req.body.banner);

    const result = await adminModel.adminAddBanner({ ...req.body, banner: req.files });
    return res.status(200).send(result);
  }),
  adminUpdateBanner: catchAsync(async (req, res) => {
    console.log(req.files, 'res.body: ', req.body);

    const result = await adminModel.adminUpdateBanner({ ...req.body, banner: req.files });
    return res.status(200).send(result);
  }),

  adminGetBanner: catchAsync(async (req, res) => {
    const result = await adminModel.adminGetBanner(req.params.IdBanner);
    return res.status(200).send(result);
  }),
};

export default adminController;
