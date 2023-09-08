<template>
    <v-container>
        <v-app-bar app dense elevation="0">
            <v-btn icon small class="ml-1" @click="sidebar = !sidebar">
                <v-icon small>
                   fas fa-bars
                </v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app v-model="sidebar" class="px-0">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        Professor Grading
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
                <v-list nav>
                    <v-list-item v-for="item in menuDrawer" :key="item.link" link :to="{name:item.link}">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{item.text}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
        </v-navigation-drawer>
<router-view />
    </v-container>
</template>

<script>
export default {
    data: () => ({
        sidebar: true,
        menuDrawer:[
            {text:'Estudiante',link:'student'},
            {text:'Matrículas',link:'enrollment'},
            {text:'Calificacion',link:'scores'},
            {text:'Inspecciones',link:'inspections'},
            {text:'Tutorias',link:'tutorships'}
        ]
    })
}
</script>