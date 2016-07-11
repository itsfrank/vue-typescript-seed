import { VueComponent } from 'vue-typescript'

@VueComponent({
    template: require('./about.html')
})
export class AboutComponent {
    ready(){
        console.log('about is ready!');
    }
}