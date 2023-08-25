class AuthService {
    constructor(client) {
        this.User = client.db().collection('users');
    }
    async getUser(email) {
        try {
            const data = await this.User.findOne({ email: email });
            return data;
        } catch {
            return null;
        }
    }

    async createUser(user) {
        try {
            await this.User.insertOne(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateRefreshToken(email, refreshToken) {
        try {
            await db.get(TABLENAME).find({ email: email }).assign({ refreshToken: refreshToken }).write();
            return true;
        } catch {
            return false;
        }
    }
}
module.exports = AuthService;
