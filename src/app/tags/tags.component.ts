import { Component, OnInit } from '@angular/core';
import {TagService} from '../shared/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(private tagService: TagService) { }
  tags: Array<string>;
  ngOnInit() {
    this.tagService.getTags().subscribe(data => this.tags = data);
  }

}
