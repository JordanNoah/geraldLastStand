<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>
                    Formulario de Busqueda
                </h1>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="4">
                        <v-text-field v-model="national_identification_number" outlined dense hide-details="auto" label="Cedula"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model="personal_email" outlined dense hide-details="auto" label="Email personal"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field v-model="institutional_email" outlined dense hide-details="auto" label="Email institucional"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn depressed @click="getDataFromApi()">
                            Buscar
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-space-between">
                        <div class="d-flex align-center">
                            Estudiantes
                        </div>
                        <v-btn depressed @click="newStudent()">
                            <v-icon small class="mr-1">
                                fas fa-plus
                            </v-icon>
                            <span>
                                Crear
                            </span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-card :disabled="disableCard">
                            <v-data-table :headers="headers" :items="items">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon @click="editStudent(item)" small class="mr-2">
                                        fas fa-pen
                                    </v-icon>
                                    <v-icon @click="deleteStudent(item)" small>
                                        fas fa-trash
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="800">
            <v-card>
                <v-container>
                    <v-row>
                        <v-col v-if="defaultItem.id != null">
                            Edit students
                        </v-col>
                        <v-col v-else>
                            Create students
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-col cols="12">
                                <v-text-field v-model="defaultItem.id" dense outlined hide-details="auto" label="ID"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="defaultItem.full_name" dense outlined hide-details="auto" label="Full name"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="defaultItem.institutional_email" dense outlined hide-details="auto" label="Correo institucional"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="defaultItem.personal_email" dense outlined hide-details="auto" label="Correo personal"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="defaultItem.national_identification_number" dense outlined hide-details="auto" label="Identificación"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="defaultItem.mobile_number" dense outlined hide-details="auto" label="Numero Telefono"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="defaultItem.landline_number" dense outlined hide-details="auto" label="Numero fijo"></v-text-field>
                            </v-col>
                        </v-form>
                    </v-row>
                </v-container>
                <v-card-actions class="d-flex justify-center">
                    <v-btn depressed class="mr-2" color="primary" v-if="defaultItem.id != null">
                        Edit
                    </v-btn>
                    <v-btn depressed class="mr-2" color="primary" v-else>
                        Guardar
                    </v-btn>
                    <v-btn depressed @click="closeDialog()">
                        Salir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            headers:[
                {
                    text: 'Nombre Completo',
                    align: '',
                    sortable: false,
                    value: 'full_name'
                },
                {
                    text: 'Correo Institucional',
                    align: '',
                    sortable: false,
                    value: 'personal_email'
                },
                {
                    text: 'ID',
                    align: '',
                    sortable: false,
                    value: 'id'
                },
                {
                    text: 'Carrera',
                    align: '',
                    sortable: false,
                    value: ''
                },
                {
                    text: 'Teléfono Principal',
                    align: '',
                    sortable: false,
                    value: 'mobile_number'
                },
                {
                    text: 'Acciones',
                    align: '',
                    sortable: false,
                    value: 'actions'
                }
            ],
            items:[],
            disableCard:true,
            national_identification_number: null,
            personal_email: null,
            institutional_email: null,
            dialog:false,
            //
            defaultItem: {
                id: null,
                full_name: null,
                institutional_email: null,
                landline_number: null,
                mobile_number: null,
                national_identification_number: null,
                personal_email: null,
                registered_at:null
            },
            //rules and validations
            valid:true,
            idRules:[
                v => !!v || 'Id is required'
            ],
            fullnameRules:[
                v => !!v || 'Full name is required'
            ],
            institutionalEmailRules:[
                v => !!v || 'Institutional email is required'
            ],
            mobileNumberRules:[
                v => !!v || 'Mobile number is required'
            ],
            nationalIdentificationNumberRules:[
                v => !!v || 'National identification number is required'
            ],
            personalEmailRules:[
                v => !!v || 'Name is required'
            ],
            registeredAtRules:[
                v => !!v || 'Name is required'
            ]
        }
    },
    mounted: async function(){
        await this.getDataFromApi()
    },
    methods:{
        async getDataFromApi () {
            const filters = {
                'filters[national_identification_number]':this.national_identification_number,
                'filters[personal_email]':this.personal_email,
                'filters[institutional_email]':this.institutional_email
            }

            // Filtra los parámetros que no son null o undefined
            const filteredFilters = {};
            for (const key in filters) {
            if (filters[key] !== null && filters[key] !== undefined) {
                filteredFilters[key] = filters[key];
            }
            }

            var response = await this.$provider.getStudents(filteredFilters)
            if (response.code == 'ERR_BAD_RESPONSE') {
                this.disableCard = true
            }else{
                this.disableCard = false
                this.items = response.data._embedded.students
            }
        },
        editStudent(item){
            this.defaultItem = item
            this.dialog = true
        },
        newStudent(){
            this.dialog = true
        },
        deleteStudent(item){console.log(item);},
        closeDialog(){
            this.dialog = false
            this.resetDefault()
        },
        resetDefault(){
            this.defaultItem = {
                id:null,
                full_name:null,
                institutional_email:null,
                landline_number:null,
                mobile_number:null,
                national_identification_number:null,
                personal_email:null,
                registered_at:null
            }
        }
    }
}
</script>