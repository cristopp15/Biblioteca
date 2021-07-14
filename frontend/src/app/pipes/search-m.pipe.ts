import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchM'
})

@Injectable()
export class SearchMPipe implements PipeTransform {

  transform(magazines: any, termM: any): any {
    if(termM == undefined){
      return magazines;
    }else{
      return magazines.filter(function(magazine){
        return magazine.data.title.toLowerCase().includes(termM.toLowerCase());
      })
    }
  }

    

}