import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  totalGold: any
  activities: any

  constructor(private _httpService: HttpService) { }

  ngOnInit(){
    this.getActivities()
  }
  
  getActivities(){
    this._httpService.getAct().subscribe(data => {
      console.log(data)
      this.totalGold = data['users'][0].totalgold
      this.activities = data['users'][0].activities
    })
  }

  farm(){
    let obs = this._httpService.getFarm()
    obs.subscribe(data =>{
      console.log(data)
      this.totalGold = data['user'].totalgold
      this.activities = data['user'].activities
    })
    this.getActivities()
  }
  cave(){
    let randNum = Math.floor((Math.random() * 6) + 5)
    console.log("Random Number: ",randNum)
    this.totalGold += randNum
    console.log("Total Gold: ", this.totalGold)
    let str = `You earned ${randNum} gold at the Cave`
    this.activities.push(str)
    console.log(this.activities)
  }
  house(){
    let randNum = Math.floor((Math.random() * 9) + 7)
    console.log("Random Number: ",randNum)
    this.totalGold += randNum
    console.log("Total Gold: ", this.totalGold)
    let str = `You earned ${randNum} gold at the House`
    this.activities.push(str)
    console.log(this.activities)
  }
  casino(){
    let randNum = Math.floor((Math.random() * 201) - 100)
    console.log("Random Number: ",randNum)
    this.totalGold += randNum
    console.log("Total Gold: ", this.totalGold)
    if(randNum <0){
      var str = `You lost ${randNum} gold at the Casino`
    }else{
      var str = `You earned ${randNum} gold at the Casino`
    }
    this.activities.push(str)
    console.log(this.activities)
  }
}