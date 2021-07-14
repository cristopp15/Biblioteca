import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})

@Injectable()
export class SearchPipe implements PipeTransform {

  transform(items: any[], term: any  ): any {
    if(term == undefined){
      return items;
    }else{
      return items.filter(function(item){
        if(item.data.title){
         return item.data.title.toLowerCase().includes(term.toLowerCase());
        }else if(item.data.name){
          return item.data.name.toLowerCase().includes(term.toLowerCase()) 
        }else if(item.data.clues){
          return item.data.clues.includes(term) 
        }else if(item.data.themes){
          return item.data.themes.includes(term) 
        }
 
      })
    }
  }

    

}
