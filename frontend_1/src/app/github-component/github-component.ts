import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUsers,
  faGlobe,
  faCircleExclamation,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GithubService } from '../service/github-service.service';
import { FollowersChartService } from '../service/followers-chart.service';

import { GithubUserDetail } from '../interfaces/github.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-github-component',
  templateUrl: './github-component.html',
  styleUrls: ['./github-component.css'],
  imports: [ReactiveFormsModule, AsyncPipe, FontAwesomeModule],
  standalone: true,
})
export class GithubComponent implements OnInit {
  faSearch = faSearch;
  faError = faCircleExclamation;
  faUsers = faUsers;
  faGlobe = faGlobe;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  users$!: Observable<GithubUserDetail[]>;
  searchForm: FormGroup;

  currentPage = 1;
  perPage = 10;
  lastQuery = '';

  @ViewChild('followersChart') followersChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private githubService: GithubService,
    private fb: FormBuilder,
    private chartService: FollowersChartService
  ) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {}

  search(page: number = 1) {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const query: string = this.searchForm.value.query;
    if (query.length < 4) return;

    this.lastQuery = query;
    this.currentPage = page;

    this.users$ = this.githubService
      .searchUsersWithDetails(query, this.currentPage, this.perPage)
      .pipe(
        tap((users) => {
          if (this.followersChartRef) {
            this.chartService.render(this.followersChartRef.nativeElement, users, this.currentPage);
          }
        })
      );
  }

  checkScore(user: GithubUserDetail) {
    if (user.score < 30) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'El usuario no cumple con el puntaje mínimo (30.0)',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      window.open(user.html_url, '_blank');
    }
  }

  nextPage() {
    this.search(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.search(this.currentPage - 1);
    }
  }

  get queryControl() {
    return this.searchForm.get('query');
  }
}
