<template>
  <v-container fluid fill-height class="split-view">
    <v-row class="split-row" no-gutters>
      <v-col cols="6" class="blue-section">
        <v-card tile elevation="0" height="100%" color="primary" class="d-flex justify-center align-center" dark>
            <span class="text-h5">PROFESSOR GRADING</span>
        </v-card>
      </v-col>
      <v-col cols="6" class="white-section">
        <v-card tile elevation="0" height="100%" class="d-flex justify-center align-center">
            <v-row justify="center">
                <v-col cols="6">
                    <v-card class="border-primary-bottom" elevation="0">
                        Iniciar sesión
                    </v-card>
                </v-col>
                <v-col cols="7">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field dense label="Usuario" v-model="user" :rules="userRules"></v-text-field>
                        <v-text-field dense label="Contraseña" v-model="password" :rules="passwordRules"></v-text-field>
                        <v-checkbox dense label="Manternerme logeado"></v-checkbox>
                        <v-btn color="warning" block depressed @click="login">
                            Iniciar sesión
                        </v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: false,
        user:null,
        password:null,
        userRules:[
            v => !!v || 'Usuario requerido'
        ],
        passwordRules:[
            v => !!v || 'Password requerido'
        ]
    }),
    methods:{
        async login(){
            if (this.$refs.form.validate()) {
                var body = new Object()
                body.email = this.user
                body.password = this.password

                let response = await this.$provider.signin(body)
                
                if(response.status == 200){
                    this.$store.commit('createJwt',response.data.token)
                    this.$router.push({name:'dashboard'})
                }
            }
        }
    }
};
</script>

<style>
.border-primary-bottom{
    border-bottom: 4px solid var(--v-primary-base);
    border-color: var(--v-primary-base)!important;
}
.split-view {
  height: 100vh;
  padding: 0px!important;
}

.split-row {
  height: 100%;
}

.blue-section {
  background-color: blue;
  height: 100%;
}

.white-section {
  background-color: white;
  height: 100%;
}
</style>
