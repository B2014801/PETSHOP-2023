<template>
    <div class="signup-buttons">
        <!-- <div id="fb-root"></div> -->
        <button class="google-signup" @click.prevent="handleSignIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <title>Google</title>
                <g fill="none" fill-rule="evenodd">
                    <path
                        fill="#4285F4"
                        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"
                    ></path>
                    <path
                        fill="#FBBC05"
                        d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"
                    ></path>
                    <path
                        fill="#EA4335"
                        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
                    ></path>
                </g>
            </svg>
            Google
        </button>
        <!-- <a href="#" class="facebook-signup" @click.prevent="loginWithFacebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5">
                <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                />
            </svg>
            Facebook
        </a> -->
    </div>
</template>

<script>
import { inject } from 'vue';
export default {
    data() {
        return {
            formData: {},
        };
    },
    methods: {
        async handleSignIn() {
            try {
                const googleUser = await this.$gAuth.signIn();
                // console.log(this.$gAuth.signIn);

                if (!googleUser) {
                    return null;
                }
                this.user = googleUser.getBasicProfile().getEmail();
                console.log(googleUser);
                if (this.Vue3GoogleOauth.isAuthorized) {
                    this.formData.email = googleUser.wt.cu;
                    this.formData.name = googleUser.wt.Ad;
                    this.formData.img = googleUser.wt.hK;
                    this.formData.OAuthtype = 'gg';
                }
                this.$emit('submit:oauthdata', this.formData);
                // await UserService.loginWithGG({ email: googleUser.wt.cu, isgglogin: true });
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    },
    setup() {
        const Vue3GoogleOauth = inject('Vue3GoogleOauth');

        return {
            Vue3GoogleOauth,
        };
    },
};
</script>

<style lang="scss" scoped>
.signup-buttons {
    margin-top: 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    position: relative;
}
.facebook-signup,
.google-signup {
    color: #031b4e;
    background: #f2f8ff;
    border: 1px solid rgba(0, 105, 255, 0.2);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 3px;
    display: inline-block;
    margin-top: 0;
    width: 47.5%;
    padding: 15px;
    text-align: center;
    position: inherit;
}
.signup-buttons a {
    vertical-align: middle;
    text-decoration: none;
}
.signup-buttons svg {
    left: 16px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
