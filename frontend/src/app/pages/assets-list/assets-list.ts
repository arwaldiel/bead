import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AssetService } from '../../services/asset.service';
import { Asset } from '../../services/asset';

@Component({
  selector: 'app-assets-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './assets-list.html',
  styleUrl: './assets-list.scss'
})
export class AssetsListComponent implements OnInit {
  displayedColumns = ['serialNumber', 'site', 'type', 'actions'];
  data: Asset[] = [];

  total = 0;
  pageSize = 5;
  pageIndex = 0;

  search = new FormControl<string>('', { nonNullable: true });

  constructor(private service: AssetService, private cdr: ChangeDetectorRef) {}

ngOnInit() {
  this.load();

  this.search.valueChanges
    .pipe(
      skip(1),                // az első (initial) változást kihagyjuk
      debounceTime(300),      // ne lőjön minden leütésre
      distinctUntilChanged()
    )
    .subscribe(() => {
      this.pageIndex = 0;
      this.load();
    });
}

  load() {
    this.service.get(this.pageIndex + 1, this.pageSize, this.search.value)
      .subscribe(res => {
        this.data = res.items;
        this.total = res.totalItems;
        this.cdr.markForCheck();
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load();
  }

  delete(id?: string) {
    if (!id) return;
    this.service.delete(id).subscribe(() => this.load());
  }
}