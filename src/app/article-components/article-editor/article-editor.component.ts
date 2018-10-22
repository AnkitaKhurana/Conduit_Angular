import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../shared/models/article';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {

  get title() { return this.form.get('title'); }
  get description() { return this.form.get('description'); }
  get body() { return this.form.get('body'); }

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService, private formBuilder: FormBuilder, private router: Router) {
    this.article = new Article();
    this.article.title = '';
    this.article.description = '';
    this.article.body = '';
    this.article.tagList = [];
    this.form = this.formBuilder.group({
      title: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      description: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      body: [null, Validators.required],
      tagList: null
    });
  }
  form: FormGroup;
  responseError: string;
  article: Article;
  publishArticle() {
    let tags = this.form.value.tagList.split(',');
    this.form.value.tagList = tags;

    if (this.activatedRoute.snapshot.queryParams['slug']) {
      this.articleService.edit(this.form.value, this.article.slug).subscribe(articleReturned => {
        this.router.navigateByUrl('article/' + articleReturned.slug);
      },
        error => {
          Object.keys(JSON.parse(error._body).errors).forEach((k) => this.responseError = k + ' ' + JSON.parse(error._body).errors[k])
        }
      )
    }
    else {
      this.articleService.add(this.form.value).subscribe(articleReturned => {
        this.router.navigateByUrl('article/' + articleReturned.slug);
      },
        error => {
          Object.keys(JSON.parse(error._body).errors).forEach((k) => this.responseError = k + ' ' + JSON.parse(error._body).errors[k])
        }
      )
    }

  }
  ngOnInit() {
    this.responseError = '';

    if (this.activatedRoute.snapshot.queryParams['slug']) {
      this.articleService.getArticle(this.activatedRoute.snapshot.queryParams['slug']).subscribe(data => {
        this.article = data;
        this.form.reset({
          title: [this.article.title],
          description: [this.article.description],
          body: [this.article.body],
          tagList: this.article.tagList
        });
      });
    }
  }
}
