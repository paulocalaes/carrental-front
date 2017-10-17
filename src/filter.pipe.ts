import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  	transform(items: any[], searchText: string): any[] {
	    if(!items) return [];
	    if(!searchText) return items;
	    //console.log(items[0].make);
		searchText = searchText.toLowerCase();
		return items.filter( it => {
	      return it.model.toString().toLowerCase().includes(searchText) || it.make.toString().toLowerCase().includes(searchText);
	    });
	}
}