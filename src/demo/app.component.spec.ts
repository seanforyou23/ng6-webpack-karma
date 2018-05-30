import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('App Component - ', () => {

  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [],
      providers: []
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      appComponent = fixture.componentInstance;
    });

  }));

  afterEach(() => {
    appComponent = null;
    fixture = null;
  });

  it('should have a valid fixture', () => {
    expect(fixture).toBeTruthy();
  });

});
