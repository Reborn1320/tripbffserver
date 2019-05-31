import Users from "../models/users";
import uuid from "uuid/v4";
import { ILoginDevice, ILoginLocal } from "../../_core/models/IUser";
import _ from "lodash";
import { toUserVM } from "./utils";
import { UserService } from "./UserService";

function getUserName(uniqueDeviceId: string) {
  return `device:${uniqueDeviceId}`;
}

function validatePassword(userLogin: ILoginDevice, uniqueDeviceId: string) {
  return userLogin.device.uniqueDeviceId === uniqueDeviceId;
};

export class UserDeviceService {

  constructor(private _userService: UserService) {

  }

  async getById(uniqueDeviceId: string) {
    const userDb = await Users.findOne({ userName: getUserName(uniqueDeviceId) });
    return toUserVM(userDb);
  }

  async register(uniqueDeviceId: any) {
    const userDb = await Users.findOne({ userName: uniqueDeviceId });
    if (userDb) throw "user existed";

    let userLogin: ILoginDevice = {
      loginType: "DEVICE",
      device: {
        uniqueDeviceId,
      }
    };

    const finalUser = new Users({
      userId: uuid(),
      userName: getUserName(uniqueDeviceId),
      fullName: "Quest",
      logins: [userLogin]
    });

    return finalUser.save().then(() => toUserVM(finalUser));
  }

  async authenticate(uniqueDeviceId) {
    const user = await Users.findOne({ userName: getUserName(uniqueDeviceId) });
    const userLoginLocal = _.find(user.logins, login => login.loginType == "DEVICE") as ILoginDevice;

    if (!user || !validatePassword(userLoginLocal, uniqueDeviceId)) {
      throw { "uniqueDeviceId": "is invalid" };
    }
    return toUserVM(user);
  }

  //generate jwt
  async login(uniqueDeviceId: any) {
    const user = await Users.findOne({ userName: getUserName(uniqueDeviceId) });
    if (!user) {
      throw "uniqueDeviceId is invalid";
    }

    return this._userService.getAuthObject(user);
  }
}