import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ArticleService } from '../shared/services/article.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get body() { return this.form.get('body'); }

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder,  private router : Router) { }
  form: FormGroup;
  responseError: string;
  addArticle(){
    let tags = this.form.value.tags.split(',');
    this.form.value.tags = tags.toString();
    this.articleService.add(this.form.value).subscribe(articleReturned => {
      this.router.navigateByUrl('article/'+articleReturned.slug);        
    },
      error => {
        Object.keys(JSON.parse(error._body).errors).forEach((k) => this.responseError = k + ' ' + JSON.parse(error._body).errors[k])
      }
    )

  }
  ngOnInit() { 
    this.responseError = '';
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      body: [null, Validators.required,],
      tags:null
    });
  }

}
