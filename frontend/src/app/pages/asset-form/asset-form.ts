import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AssetService } from '../../services/asset.service';
import { Asset } from '../../services/asset';

@Component({
  selector: 'app-asset-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './asset-form.html',
  styleUrl: './asset-form.scss'
})
export class AssetFormComponent implements OnInit {
  id: string | null = null;
  form;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AssetService
  ) {
    this.form = this.fb.group({
      serialNumber: ['', [Validators.required, Validators.minLength(3)]],
      site: ['', [Validators.required]],
      type: ['', [Validators.required]],
      manufacturer: [''],
      note: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.service.getById(this.id).subscribe((a: any) => this.form.patchValue(a));
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value as Asset;

    if (this.id) {
      this.service.update(this.id, { ...payload, id: this.id }).subscribe(() => {
        this.router.navigate(['/assets']);
      });
    } else {
      this.service.create(payload).subscribe(() => {
        this.router.navigate(['/assets']);
      });
    }
  }
}