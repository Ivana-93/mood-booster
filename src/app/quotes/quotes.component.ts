import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { QuoteData } from '../model/quote.model';
import { SingleResponse } from '../model/responses.model';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit{

  constructor(private router: Router, private apiService: ApiService) {}

  quote: string = "";
  isLoading = false;
  quotes: QuoteData[] = [];

  ngOnInit(){
    this.getQuotes();
  }

  onGetQuote() {
    this.getQuote();
    this.isLoading = true;
  }

  public getQuote(): void {
    this.apiService.getQuotes().subscribe(
      //success
      {
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      }
    );
  }

  private handleSuccess(responseData: SingleResponse<QuoteData>): void {
    
    var quoteData= responseData.data;
    console.log(quoteData);
    this.quote = quoteData.content;
    console.log(this.quote);
    this.isLoading = false;
  }

  private handleError(error: Error): void {
    console.log(error.message);
  }


  public getQuotes():void {
    this.apiService.getUserQuotes().subscribe({
      next: this.handleGetQuotesSuccess.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleGetQuotesSuccess(response: SingleResponse<QuoteData[]>){
    this.quotes = response.data
    }
  }


