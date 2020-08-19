import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../common/interfaces";

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {
  transform(posts: Post[], search: string): Post[] {
    if(!search.trim()){
      return posts;
    }
    return posts.filter(post => post.name.toLowerCase().includes(search.toLowerCase()))
  }

}
