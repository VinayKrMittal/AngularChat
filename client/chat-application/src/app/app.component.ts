import { Component,OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	private url = 'http://localhost:5000';
	private socket = io(this.url);
	private messages = ["Hi Server","Where are you?","I am running on 4200 Hahaha..","Bye Bye.."];
	chats = [];
  	msgCount = 0;
  	constructor(){}
  	sendMessage(message){
  		this.socket.emit('add-message',message);
  	}
  	getMessage(){
  		let observable = new Observable(observer =>{
  			this.socket.on('message',(data) =>{
  				console.log('message received'+JSON.stringify(data));
  				observer.next(data);
  			});
  			return() =>{
  				this.socket.disconnect();
  			};
  		})
  		return observable;
  	}
  	ngOnInit() {
     this.sendMessage(this.messages[this.msgCount]);	
     this.chats.push({sent :1,"msg": this.messages[this.msgCount]});

    this.getMessage().subscribe(message => {
    	this.chats.push({sent :0,"msg": message});
    	if(this.msgCount < this.messages.length-1){
    		this.msgCount = this.msgCount+1;
    		console.log('Message received');
    		this.sendMessage(this.messages[this.msgCount]);
    	    this.chats.push({sent :1,"msg": this.messages[this.msgCount]});

    	}
    		

	 });

  }

}
