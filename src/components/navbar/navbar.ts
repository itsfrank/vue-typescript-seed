import { VueComponent, Prop, Watch } from 'vue-typescript'

//This is overkill but typescript is great! :)
class Link {
    name:string;
    path:string;

    constructor(name:string, path:string){
        this.name = name;
        this.path = path;
    }
}

@VueComponent({
    template: require('./navbar.html')
})
export class Navbar extends Vue {

    @Prop
    inverted:boolean = true; //default value

    @Prop
    object:{default:string} = {default: 'Default object property!'}; //objects as default values don't need to be wrapped into functions

    links:Link[] = [
        new Link('Home', '/'),
        new Link('About', '/about')
    ]

    @Watch('$route.path')
    pathChanged(){
        console.log('Changed current path to: ' + this.$route.path);
    }

    ready(){
        console.log(this.object.default);
    }
} 
