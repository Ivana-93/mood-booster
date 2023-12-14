import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { QuoteData } from '../model/quote.model';
import { ListResponse, SingleResponse } from '../model/responses.model';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}

  quote: string = '';
  isLoading = false;
  quotes: QuoteData[] = [];

  ngOnInit() {
    this.getQuotes();
  }

  // Method for handling quote button click
  public onGetQuote() {
    this.getQuote();
    this.isLoading = true;
  }

  //Retrieves a quote from the API service.
  private getQuote(): void {
    this.apiService.getQuote().subscribe({
      next: this.handleGetQuoteSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // Method for handling quote data response
  private handleGetQuoteSuccess(responseData: SingleResponse<QuoteData>): void {
    var quoteData = responseData.data;
    console.log(quoteData);
    this.quote = quoteData.content;
    console.log(this.quote);
    this.isLoading = false;
  }

  // Method for handling response error in all methods in this component
  private handleError(error: Error): void {
    console.log(error.message);
  }

  // Method for retriving list of quotes from the API service
  private getQuotes(): void {
    this.apiService.getUserQuotes().subscribe({
      next: this.handleGetQuotesSuccess.bind(this),
      error: this.handleError.bind(this),
    });
  }

  // Method for handling list of quotes response
  private handleGetQuotesSuccess(response: ListResponse<QuoteData>) {
    this.quotes = response.data.reverse();
  }
}
