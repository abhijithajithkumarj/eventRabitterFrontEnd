import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../core/service/auth/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-booking-page-cards',
  templateUrl: './event-booking-page-cards.component.html',
  styleUrls: ['./event-booking-page-cards.component.css']
})
export class EventBookingPageCardsComponent implements OnInit {
  orderForm: FormGroup;
  userId: string | undefined;
  cards: any[] = [];
  paginatedCards: any[] = [];
  eventId: string | undefined;

  
  currentPage: number = 1;
  itemsPerPage: number = 16;
  totalPages: number = 0;
  pageRange: number[] = [];

  constructor(
    private service: AuthserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.service.getUserFromLocalStorage();
    this.getEventCardData();
  }

  getEventCardData(): void {
    this.service.getEventCards().subscribe((data) => {
      this.cards = data;
      this.totalPages = Math.ceil(this.cards.length / this.itemsPerPage);
      this.pageRange = Array.from({ length: this.totalPages }, (_, k) => k + 1);
      this.paginateCards();
    });
  }

  paginateCards(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCards = this.cards.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.paginateCards();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateCards();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateCards();
    }
  }
}
