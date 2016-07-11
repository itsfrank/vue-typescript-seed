import { VueComponent } from 'vue-typescript'

@VueComponent({
    template: require('./home.html'),
    style: require('./home.scss')
})
export class HomeComponent extends Vue {

    package:string = 'vue-typescript';
    repo:string = 'https://github.com/itsFrank/vue-typescript';

}