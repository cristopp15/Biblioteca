import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchB'
})

@Injectable()
export class SearchBPipe implements PipeTransform {

  transform(books: any, termB: any): any {
    if(termB == undefined){
      return books;
    }else{
      return books.filter(function(book){
        return book.data.title.toLowerCase().includes(termB.toLowerCase());
      })
    }
  }

    

}