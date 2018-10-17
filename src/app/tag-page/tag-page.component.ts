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

  constructor(private tagService: TagService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tagString'];
      this.tagService.getArticles(this.tag).subscribe(data => { this.articles = data; })
    });
  }

}
