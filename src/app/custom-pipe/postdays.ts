import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
   name: 'postDays'
})
export class PostDaysPipe implements PipeTransform {
    transform(date: any, args?: any): any {
        let getDate;
        let currentDate = new Date();
        let days = new Date(date)
        date = Math.floor((currentDate.getTime() - days.getTime()) / 1000 / 60 / 60 / 24);
        if(date === 0){
            return date = "Today";
        }else{
            return date + " " +"day ago";
        }
        

    }
}