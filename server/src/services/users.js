class UserService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }

    async getUserByLogin(login) {
        try {
            const user = await this.usersModel.findOne({
                where: {
                    u_name: login
                }
            });
            return user;
        } catch (e) {
            return null;
        }
    }

    async authUser(login, password) {
        const { dataValues: user } = await this.getUserByLogin(login);
        console.log(user);

        if (user && user.u_password === password) {
            return user;
        }
        return null;
    }
}

export default UserService;
