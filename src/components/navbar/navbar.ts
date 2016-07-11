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

    @Prop({default: true})
    inverted:boolean;

    links:Link[] = [
        new Link('Home', '/'),
        new Link('About', '/about')
    ]

    @Watch('$route.path')
    pathChanged(){
        console.log('Changed current pathe to: ' + this.$route.path);
    }
} 
