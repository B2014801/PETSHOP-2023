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
            const updatedUser = await this.User.findOneAndUpdate(
                { email: email },
                { $set: { refreshToken: refreshToken } },
                { new: true },
            );

            if (updatedUser) {
                return true; // Return true if user is found and updated
            } else {
                return false; // Return false if user is not found
            }
        } catch (error) {
            console.error('Error updating refresh token:', error);
            return false; // Return false on error
        }
    }
}
module.exports = AuthService;
