import { Component, OnInit } from '@angular/core';
import { TrustedHtmlString } from '@angular/core/src/sanitization/sanitization';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.css']
})
export class BoardgameComponent implements OnInit {
  private submitOn: boolean = true;
  private nickName: string;
  private amount: number; // buy in money and total
  private onoffButtons: boolean = true;
  private hitstandBet: boolean = false;
  private Deck: string[][] = [['2club', '2'], ['2hearts', '2'], ['2_of_diamonds', '2'], ['2_of_spades', '2'],
  ['3_of_clubs', '3'], ['3_of_hearts', '3'], ['3_of_diamonds', '3'], ['3_of_spades', '3'],
  ['4_of_clubs', '4'], ['4_of_hearts', '4'], ['4_of_diamonds', '4'], ['4_of_spades', '4'],
  ['5_of_clubs', '5'], ['5_of_hearts', '5'], ['5_of_diamonds', '5'], ['5_of_spades', '5'],
  ['6_of_clubs', '6'], ['6_of_hearts', '6'], ['6_of_diamonds', '6'], ['6_of_spades', '6'],
  ['7_of_clubs', '7'], ['7_of_hearts', '7'], ['7_of_diamonds', '7'], ['7_of_spades', '7'],
  ['8_of_clubs', '8'], ['8_of_hearts', '8'], ['8_of_diamonds', '8'], ['8_of_spades', '8'],
  ['9_of_clubs', '9'], ['9_of_hearts', '9'], ['9_of_diamonds', '9'], ['9_of_spades', '9'],
  ['10_of_clubs', '10'], ['10_of_hearts', '10'], ['10_of_diamonds', '10'], ['10_of_spades', '10'],
  ['jack_of_clubs', '10'], ['jack_of_hearts', '10'], ['jack_of_diamonds', '10'], ['jack_of_spades', '10'],
  ['king_of_clubs', '10'], ['king_of_hearts', '10'], ['king_of_diamonds', '10'], ['king_of_spades', '10'],
  ['queen_of_clubs', '10'], ['queen_of_hearts', '10'], ['queen_of_diamonds', '10'], ['queen_of_spades', '10'],
  ['ace_of_clubs', '1'], ['ace_of_hearts', '1'], ['ace_of_diamonds', '1'], ['ace_of_spades', '1'],
  ];
  private deckInUse: string[][] = Object.assign(this.Deck); //  copy of deck
  private holdCard: string[] = [];
  private betamount: number;
  private playerSum: number = 0;
  private holdValue: number;
  private dealerHand: string[] = [];
  private dealerSum: number = 0;

  constructor() { }

  ngOnInit() {
  }
  buttonseat() {
    this.submitOn = !this.submitOn;
  }
  submitCheck() {
    if (this.nickName.length > 2 && this.amount >= 150 && this.amount <= 5000) {
      this.submitOn = !this.submitOn;
      this.onoffButtons = !this.onoffButtons;

    } else {
      alert('Please,check our inputs');
    }
  }
  leaveGame() {
    this.submitOn = true;
    this.nickName = undefined;
    this.amount = undefined; // buy in mon
    this.onoffButtons = true;
    this.hitstandBet = false;
    this.holdCard = [];
    this.betamount = undefined;
    this.playerSum = 0;
    this.holdValue = undefined;
    this.dealerHand = [];

  }
  pickCard() {// for the player
    this.holdValue = Math.floor(Math.random() * this.Deck.length);
    this.holdCard.push(this.Deck[this.holdValue][0]);
    this.playerSum = +(this.playerSum) + (+(this.Deck[this.holdValue][1]));
    if (this.playerSum > 21) {
      setTimeout(() => { alert('You lost'); }, 50);
      setTimeout(() => this.endGame(), 1500);
    }


  }
  dealerCard() {
    let dealHolder = Math.floor(Math.random() * this.Deck.length);
    this.dealerSum = this.dealerSum + (+(this.Deck[dealHolder][1]));
    this.dealerHand.push(this.Deck[dealHolder][0]);


  }

  betCheck() {
    if (this.betamount > 0 && this.betamount <= this.amount) {
      this.hitstandBet = !this.hitstandBet;
      this.pickCard();
      this.amount = this.amount - this.betamount;
      this.playerSum = +(this.Deck[this.holdValue][1]);
      this.dealerCard();

    } else {
      return false;
    }
  }
  repeatDealer() {// dealer repeat drawing

    while (this.dealerSum <= 17) {
        this.dealerCard();
    }
    if (this.dealerSum > 21) {
      setTimeout(() => { alert('You won'); }, 100);
      setTimeout(() => this.endGame(), 1500);
      this.amount = this.amount + (this.betamount * 3 );
    } else if (this.dealerSum < 21 && this.dealerSum > this.playerSum) {
      setTimeout(() => { alert('You lost'); }, 100);
      setTimeout(() => this.endGame(), 1500);
    } else if (this.dealerSum === this.playerSum) {
      setTimeout(() => { alert('Its a draw'); }, 100);
      this.amount = this.amount + (this.betamount );
      setTimeout(() => this.endGame(), 1500);
    } else {
      setTimeout(() => { alert('You won'); }, 100);
      this.amount = this.amount + (this.betamount * 3 );
      setTimeout(() => this.endGame(), 1500);
    }
  }


  endGame() {

    this.hitstandBet = false;
    this.holdCard = [];
    this.betamount = undefined;
    this.playerSum = 0;
    this.holdValue = undefined;
    this.holdCard = [];
    this.dealerHand = [];
    this.holdCard = [];
    this.dealerSum = 0;
  }

}
