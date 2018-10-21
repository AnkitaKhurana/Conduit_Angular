import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../shared/models/article';
import { TagService } from '../shared/services/tag.service';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css']
})
export class TagPageComponent implements OnInit {

  tag: string;
  articles: Array<Article>;
  pageNumber: number;
  totalPages: Array<number>;

  constructor(private tagService: TagService, private route: ActivatedRoute) {this.pageNumber = 0; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tagString'];
      this.tagService.getArticles(this.tag,this.pageNumber).subscribe(data => { 
        this.articles = data.articles;
        this.totalPages = Array(Math.ceil(data.articlesCount / 20)).fill(0).map((x, i) => i);
      })
    });
  }

  updateFeed(page: number, event) {
    let list = document.getElementsByClassName('page-link');
    for (let i = 0; i < list.length; i++) {
     list[i].classList.remove('active');
    }
    this.pageNumber = page;
    event.target.classList.add('active');
    this.tagService.getArticles(this.tag,this.pageNumber).subscribe(data => { 
        this.articles = data.articles;
        this.totalPages = Array(Math.ceil(data.articlesCount / 20)).fill(0).map((x, i) => i);
      })
  }
  
}
